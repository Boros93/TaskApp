//Tutte le azioni per l'autentificazione
import {Alert} from 'react-native';
import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  FORGOT_USER_START,
  FORGOT_USER_SUCCESS,
  FORGOT_USER_FAIL
} from './types';
import firebase from 'firebase';

//Metodi Login
export const loginUser = ({email, password, navigateTo}) => {
    return(dispatch) => {
        //mette is loading a true
        dispatch({ type: LOGIN_USER_START });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user, email, navigateTo))  //User: struttura dati firebase.user
        .catch(function(e){
          var errorCode = e.code;
          loginUserFailed(dispatch);
          //Scrivere messaggi migliori
          switch(errorCode)
          {
            case 'auth/invalid-email':
                Alert.alert(
                    title = "Errore",
                    message = "Inserisci un indirizzo email valido")
            break;
            case 'auth/user-not-found':
                Alert.alert(
                    title = "Errore",
                    message = "Indirizzo email non trovato")
            break;
            case 'auth/wrong-password':
                Alert.alert(
                    title = "Errore",
                    message = "Indirizzo email o password errati")
            break;
            case 'auth/user-disabled':
                Alert.alert(
                    title = "Errore",
                    message = "Indirizzo email disabilitato")
          }
        });
    } 
}

const loginUserSuccess = (dispatch, user, email, navigateTo) => {
    alert("Benvenuto");
    var users, username, email;
    firebase.database().ref(`/Users/`).on('value', (snapshot) => {
        var users = snapshot.val();
        var keys = Object.keys(users);
        var username;
        for(var i=0; i<keys.length;i++){
            var k = keys[i];
            if(users[k].uid == user.uid)
            {
                username=users[k].username;
                email=users[k].email;
                phone=users[k].phone;
                feedback=users[k].feedback;
                nFeed = users[k].nFeed;
            }
        }
        dispatch({ type: LOGIN_USER_SUCCESS, usernamePayload: username, authPayload: user, 
            emailPayload: email, phonePayload: phone, feedbackPayload: feedback, nFeedPayload: nFeed })
    })
    // vai a home screen
    navigateTo('MainTabs')
}

const loginUserFailed = (dispatch)  => {
  dispatch({ type: LOGIN_USER_FAIL })
}


//Metodi registrazione
export const registerUser = ({email, password, username, phone, navigateTo}) => {
    return(dispatch) => {
        //mette is loading a true
        dispatch({ type: REGISTER_USER_START });
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => registerUserSuccess(dispatch, user, username, phone, navigateTo))
        .catch(function(e){
          var errorCode = e.code;
          registerUserFailed(dispatch);
          //Scrivere messaggi migliori
          switch(errorCode)
          {
            case 'auth/invalid-email':
                Alert.alert(
                    title = "Errore",
                    message = "Inserisci un indirizzo email valido")
            break;
            case 'auth/email-already-in-use':
                Alert.alert(
                    title = "Errore",
                    message = "Indirizzo email già in uso")
            break;
            case 'auth/operation-not-allowed':
                Alert.alert(
                    title = "Errore",
                    message = "Operazione non consentita")
            break;
            case 'auth/weak-password':
                Alert.alert(
                    title = "Errore",
                    message = "Password troppo debole")
          }
        });
    } 
}

const registerUserSuccess = (dispatch, user, username, phone, navigateTo) => {
  let uid = user.uid;
  let email = user.email;
  let feedback = 0;
  let nFeed = 0;
  let sumOfFeed = 0;
  firebase.database().ref(`/Users/`).push({ username, uid, email, feedback, phone, nFeed, sumOfFeed });
  //mette isloading a false
  dispatch({ type: REGISTER_USER_SUCCESS});
  alert("utente creato");
  // vai a home Root
  navigateTo('Root')
}

const registerUserFailed = (dispatch)  => {
  dispatch({ type: REGISTER_USER_FAIL })
}

//Metodi Forgot Password
export const resetPassword = ({email, password, navigateTo}) => {
    return(dispatch) => {
        //mette is loading a true
        dispatch({ type: REGISTER_USER_START });
        firebase.auth().sendPasswordResetEmail(email)
        .then(user => forgotUserSuccess(dispatch, user, navigateTo))
        .catch(function(e){
          var errorCode = e.code;
          forgotUserFailed(dispatch);
          //Scrivere messaggi migliori
          switch(errorCode)
          {
            case 'auth/invalid-email':
                Alert.alert(
                    title = "Errore",
                    message = "Inserisci un indirizzo email valido")
            break;
            case 'auth/user-not-found':
                Alert.alert(
                    title = "Errore",
                    message = "Indirizzo email non trovato");
          }
        });
    } 
}

const forgotUserSuccess = (dispatch, user, navigateTo) => {
  alert("controlla la tua email");
  //mette isloading a true
  dispatch({ type: FORGOT_USER_SUCCESS })
  // vai a home Root
  navigateTo('Root')
}

const forgotUserFailed = (dispatch)  => {
  dispatch({ type: FORGOT_USER_FAIL })
}