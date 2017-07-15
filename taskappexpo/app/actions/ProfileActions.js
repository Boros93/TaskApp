import {
  DOWNLOAD_USER_DATA_START,
  DOWNLOAD_USER_DATA_SUCCESS,
  FEED_USER_START,
  FEED_USER_SUCCESS,
  FEED_USER_FAIL,
  DOWNLOAD_USERSLIST_START,
  DOWNLOAD_USERSLIST_SUCCESS
} from './types';
import firebase from 'firebase';

export const downloadUserData = ({idUser}) => {
    console.log('ID passato',idUser);
    return(dispatch)=>{
    dispatch({type:DOWNLOAD_USER_DATA_START});
    firebase.database().ref(`/Users/`)
            .on('value', snapshot => {
                list = snapshot.val();
                var username,email,phone,feedback;
                var keys = Object.keys(list);
                for(var i=0; i<keys.length;i++){
                    var k = keys[i];
                    if(list[k].uid == idUser){
                        username = list[k].username;
                        email = list[k].email;
                        phone = list[k].phone;
                        feedback = list[k].feedback;
                        feeder = list[k].feeder;
                        nFeed = list[k].nFeed;
                    }
                }
                dispatch({type:DOWNLOAD_USER_DATA_SUCCESS, usernamePayload: username, emailPayload: email,
                                                phonePayload: phone, feedbackPayload: feedback, feederPayload: feeder,
                                                nFeedPayload: nFeed});
            })
    
    }
}

export const downloadUsersList = () => {
    let list;
    return(dispatch) =>{
        dispatch({type: DOWNLOAD_USERSLIST_START});
        firebase.database().ref(`/Users/`)
            .on('value', snapshot => {
                list = snapshot.val();
                dispatch({ type: DOWNLOAD_USERSLIST_SUCCESS, payload: list});
            })
    }
}

export const feedProfile = ({idUser, star, userList, feeder, listOfFeeder}) =>  {
    return(dispatch)=>
    {
        if(idUser!=feeder){
            error = false;
            if(listOfFeeder instanceof Object){
                var feederKeys = Object.keys(listOfFeeder);
                for(var i=0; i<feederKeys.length;i++)
                {
                    var k = feederKeys[i];
                    if(listOfFeeder[k].iDfeeder == feeder)
                    {
                        error = true;
                        alert("Hai già votato questo utente");
                    }
                }
            }
            if(!error){
                var keys = Object.keys(userList);
                var userKey;
                for(var i=0; i<keys.length;i++){
                    var k = keys[i];
                    if(list[k].uid == idUser){
                        numberOfFeed = userList[k].nFeed;
                        sumOfFeed = userList[k].sumOfFeed+star;
                        numberOfFeed++;
                        feedback = sumOfFeed/numberOfFeed;
                        userKey = k;
                    }
                }
                firebase.database().ref('Users/' + userKey).update({
                    feedback: feedback,
                    nFeed: numberOfFeed,
                    sumOfFeed: sumOfFeed,
                });    
                firebase.database().ref('Users/' + userKey + '/feeder').push({
                    iDfeeder: feeder,
                })         
                dispatch({type:FEED_USER_SUCCESS});  
            }
        }else{
            alert('Non puoi votare te stesso');
            dispatch({type:FEED_USER_FAIL});  
        }
    }
}
