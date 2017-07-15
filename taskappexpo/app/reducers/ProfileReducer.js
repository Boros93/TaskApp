import{
    DOWNLOAD_USER_DATA_START,
    DOWNLOAD_USER_DATA_SUCCESS,
    FEED_USER_START,
    FEED_USER_SUCCESS,
    FEED_USER_FAIL,
    DOWNLOAD_USERSLIST_START,
    DOWNLOAD_USERSLIST_SUCCESS
} from '../actions/types';

const initialState = {
    loading:false,
    username:'',
    email:'',
    phone:'',
    feedback:'',
    nFeed:'',
    usersList:'',
}

export default(state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_USER_DATA_START:{
      return{...state, loading: true}
    }
    case DOWNLOAD_USER_DATA_SUCCESS:{
      return{...state, username:action.usernamePayload, email:action.emailPayload,
                phone:action.phonePayload, feedback:action.feedbackPayload, feeder:action.feederPayload,
                nFeed: action.nFeedPayload, loading:false}
    }
    case FEED_USER_START:{
      return {...state, loading:true};
    }
    case FEED_USER_SUCCESS:{
      return{...state, loading:false};
    }
    case DOWNLOAD_USERSLIST_START:{
      return{...state, loading:true};
    }
    case DOWNLOAD_USERSLIST_SUCCESS:{
      return{...state, loading:false, usersList:action.payload }
    }
    case FEED_USER_FAIL:{
      return{...state, loading:false}
    }
    default:
      return state;
  }
}