import {
  FILTER_LIST_START,
  FILTER_LIST_SUCCESS,
  FILTER_LIST_FAIL,
  FILTER_TODOLIST_START,
  FILTER_TODOLIST_FAIL,
  FILTER_TODOLIST_SUCCESS,
} from '../actions/types';

const initialState = {
  isLoading:false,
  isLoadingToDo:false,
  userList:'',
  toDoList:'',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_LIST_START:
      return {...state, isLoading: true}
    case FILTER_LIST_SUCCESS:
      return {...state, isLoading: false,  userList: action.payload}
    case FILTER_LIST_FAIL:
      return {...state, isLoading: false}
    case FILTER_TODOLIST_START:
      return {...state, isLoadingToDo: true}
    case FILTER_TODOLIST_SUCCESS:
      return {...state, isLoadingToDo: false,  toDoList: action.list}
    case FILTER_TODOLIST_FAIL:
      return {...state, isLoadingToDo: false}
    default:
      return state;
  }
}
