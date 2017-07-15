import{
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
} from '../actions/types';

const initialState = {
    loading:false,
    activeTaskData:'',
    message:'',
    usernameTasker:'',
    idTasker:'',
}


export default(state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK_START:
      return {...state, loading: true}
    case ADD_TASK_SUCCESS:{
      return {...state, loading: false}
    }
    case ADD_TASK_FAIL:{
      return {...state, loading: false}
    }
    case DOWNLOAD_TASK_DATA_START:{
      return{...state, loading: true}
    }
    case DOWNLOAD_TASK_DATA_SUCCESS:{
      return{...state, activeTaskData: action.payload, loading:false}
    }
    case ACCEPT_TASK_START:{
      return{...state, loading:true}
    }
    case ACCEPT_TASK_SUCCESS:{
      return{...state, loading:false}
    }
    case ACCEPT_TASK_FAIL:{
      return{...state,loading:false}
    }
    case SHOW_TASK_START:{
      return{...state,loading:true}
    }
    case SHOW_TASK_SUCCESS:{
      return{...state, message: action.payload, usernameTasker: action.username, idTasker: action.idTasker, loading:false}
    }
    default:
      return state;
  }
}