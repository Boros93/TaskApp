import {
  DOWNLOAD_LIST_START,
  DOWNLOAD_LIST_SUCCESS,
  DOWNLOAD_LIST_FAIL,
  FILTER_LIST_START,
  FILTER_LIST_SUCCESS,
  FILTER_LIST_FAIL,
 } from './types';
import firebase from 'firebase';
import {Alert} from 'react-native';

export const downloadList = () => {
    let list;
    
    return(dispatch) =>{
        dispatch({type: DOWNLOAD_LIST_START});
        firebase.database().ref(`/Tasks/`)
            .on('value', snapshot => {
                list = snapshot.val();
                dispatch({ type: DOWNLOAD_LIST_SUCCESS, payload: list});
            })
    }
}

export const filterUserList = (list, userUid) => {
    return(dispatch) =>{
        dispatch({type: FILTER_LIST_START});
        var filteredList = [];
        var keys = Object.keys(list);
        console.log("KEYS", keys);
        for(var i=0; i<keys.length;i++){
            var k = keys[i];
            if(list[k].userUid == userUid){
                filteredList.push(list[k]);
            }
        }
        dispatch({ type: FILTER_LIST_SUCCESS, payload: filteredList});
    }
}