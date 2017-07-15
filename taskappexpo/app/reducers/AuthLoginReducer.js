import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from '../actions/types';

const initialState = {
  userData: null,
  username: '',
  email:'',
  phone:'',
  feedback:0,
  nFeed:0,
  loading: false
}

export default(state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {...state, loading: true}
    case LOGIN_USER_SUCCESS:{
      return {...state, userData: action.authPayload, username: action.usernamePayload, 
        email:action.emailPayload, phone:action.phonePayload,feedback:action.feedbackPayload, 
        nFeed:action.nFeedPayload,loading: false}
    }
    case LOGIN_USER_FAIL:
      return {...state, loading: false}
    default:
      return state;
  }
}


