import { combineReducers } from 'redux';
import authLoginReducer from './AuthLoginReducer';
import authRegisterReducer from './AuthRegisterReducer';
import authForgotReducer from './AuthForgotReducer';
import taskReducer from './TaskReducer';
import taskListReducer from './TaskListReducer';
import filterReducer from './FilterReducer';
import profileReducer from './ProfileReducer';

const appReducer = combineReducers({
  authLogin: authLoginReducer,
  authRegister: authRegisterReducer,
  authForgot: authForgotReducer,
  task: taskReducer,
  taskList: taskListReducer,
  filter: filterReducer,
  profile: profileReducer,
});

export default appReducer;