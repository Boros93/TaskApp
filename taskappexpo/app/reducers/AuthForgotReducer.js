import {
  FORGOT_USER_START,
  FORGOT_USER_SUCCESS,
  FORGOT_USER_FAIL,
} from '../actions/types';

const initialState = {
    email: '',
    password: '',
    user: null,
    loading: false
}

export default(state = initialState, action) => {
  switch (action.type) {
    case FORGOT_USER_START:
      return {...state, loading: true}
    case FORGOT_USER_SUCCESS:
      return {...state, loading: false}
    case FORGOT_USER_FAIL:
      return {...state, loading: false}
    default:
      return state;
  }
}

