import React, { Component } from 'react';
import { MainNavigator } from './config/router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import appReducer from './reducers';
import { logger } from 'redux-logger'
import ReduxThunk from 'redux-thunk';

/*
firebase.initializeApp({
  apiKey: "AIzaSyAW_UBKG_Lq-71-0_bCeWDnMX-JGtb1gfU",
  authDomain: "taskapp-cd87e.firebaseapp.com",
  databaseURL: "https://taskapp-cd87e.firebaseio.com",
  storageBucket: "taskapp-cd87e.appspot.com",
})
*/

const initialState = {};

class App extends Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyAW_UBKG_Lq-71-0_bCeWDnMX-JGtb1gfU",
      authDomain: "taskapp-cd87e.firebaseapp.com",
      databaseURL: "https://taskapp-cd87e.firebaseio.com",
      storageBucket: "taskapp-cd87e.appspot.com",
    };
    firebase.initializeApp(config);
  }

  render() {

    const store = createStore(
      appReducer,
      initialState,
      applyMiddleware(logger, ReduxThunk)
    );

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;