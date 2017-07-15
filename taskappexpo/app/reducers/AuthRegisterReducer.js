import {
  REGISTER_USER_START,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL
} from '../actions/types';

const initialState = {
  loading: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_START:
      return {...state, loading: true}
    case REGISTER_USER_SUCCESS:
      return {...state, loading: false}
    case REGISTER_USER_FAIL:
      return {...state, loading: false}
    default:
      return state;
  }
}
