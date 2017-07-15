import {
  DOWNLOAD_LIST_START,
  DOWNLOAD_LIST_SUCCESS,
  DOWNLOAD_LIST_FAIL,
} from '../actions/types';

const initialState = {
  isLoading:false,
  data:''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DOWNLOAD_LIST_START:
      return {...state, isLoading: true}
    case DOWNLOAD_LIST_SUCCESS:
      return {...state, isLoading: false,  data: action.payload}
    case DOWNLOAD_LIST_FAIL:
      return {...state, isLoading: false}
    default:
      return state;
  }
}
