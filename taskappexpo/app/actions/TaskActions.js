import {
  ADD_TASK_START,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAIL,
  DOWNLOAD_TASK_DATA_START,
  DOWNLOAD_TASK_DATA_SUCCESS,
  ACCEPT_TASK_START,
  ACCEPT_TASK_FAIL,
  ACCEPT_TASK_SUCCESS,
  SHOW_TASK_START,
  SHOW_TASK_SUCCESS,
} from './types';
import firebase from 'firebase';
import {Alert} from 'react-native';
let taskID = new Date().getTime();
export const createTask = ({ title, description, budget, category, deadline, region, userUid, username, navigateTo}) => {
  let error = "";
  if(title == "")
  {
    console.log("Entro in title");
    error = "Hai dimenticato di inserire un titolo!";
  }
  else if(description=="")
  {
    error =  "Hai dimenticato di inserire una descrizione";
  }
  else if(budget=="")
  {
    error = "Hai dimenticato di inserire un prezzo";
  }
  else if(category == "")
  {
    error =  "Per favore seleziona una categoria";
  }
  else if(deadline == "Seleziona una scadenza")
  {
    error = "Hai dimeticato di scegliere una data di scadenza";
  }else {
    return (dispatch) => {
      taskID++;
      dispatch({ type: ADD_TASK_START });
      firebase.database().ref(`/Tasks/`)
        .push({userUid, username, title, description, budget, category, deadline, region, status: true, taskID})
        .then(() => dispatch({ type: ADD_TASK_SUCCESS}))
        navigateTo('MainTabs')
    }
  }
  return (dispatch) => {
    Alert.alert(title = "Errore",
                message = error);
    dispatch({ type: ADD_TASK_FAIL});
  };
}

export const downloadTask=({idTask, list})=>{
  return(dispatch)=>{
    dispatch({type:DOWNLOAD_TASK_DATA_START});
    var taskData;
    var keys = Object.keys(list);
    for(var i=0; i<keys.length;i++){
        var k = keys[i];
        if(list[k].taskID == idTask){
            taskData=list[k];
        }
    }
    dispatch({type:DOWNLOAD_TASK_DATA_SUCCESS, payload: taskData});
  }
}

export const selectTask=({idTasker, usernameTasker, taskList, idTask, message})=>{
  return(dispatch)=>{
    let error = '';
    dispatch({type: ACCEPT_TASK_START});
    var keys = Object.keys(taskList);
    for(var i=0; i<keys.length;i++){
      var k = keys[i];
      if(taskList[k].taskID == idTask){
        if(taskList[k].userUid != idTasker){
          if(taskList[k].status){
            firebase.database().ref('Tasks/' + k).child('/tasker').set({
              idTasker: idTasker,
              usernameTasker: usernameTasker,
            })
            firebase.database().ref('Tasks/' + k).update({
              status:false,
            })
            firebase.database().ref('Tasks/' + k).child('/inbox/').set({
              message: message,
            })
          }else{
            error=false;
            alert('Task già impegnata');
          }     
        }else{
          error=false;
          alert('Non puoi svolgere le tue stesse task');
        }
      }
    }
    if(error){
      dispatch({type:ACCEPT_TASK_FAIL})
    }
  }
}

export const showOffer = ({idTask, taskList}) => {
  return(dispatch)=>{
    var username, payload;
    dispatch({type:SHOW_TASK_START})
    var keys = Object.keys(taskList);
    for(var i=0; i<keys.length;i++){
      var k = keys[i];
      if(taskList[k].taskID == idTask){
        username = taskList[k].tasker.usernameTasker;
        payload = taskList[k].inbox.message;
        id = taskList[k].tasker.idTasker;
      }
    }
    dispatch({type:SHOW_TASK_SUCCESS, username: username, payload: payload, idTasker: id})
  }
}