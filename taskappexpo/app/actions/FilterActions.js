import {
  DOWNLOAD_LIST_START,
  DOWNLOAD_LIST_SUCCESS,
  DOWNLOAD_LIST_FAIL,
  FILTER_TODOLIST_START,
  FILTER_TODOLIST_FAIL,
  FILTER_TODOLIST_SUCCESS,
 } from './types';

export const filterUserList = (list, user) => {
    return(dispatch) =>{
        dispatch({ type: DOWNLOAD_LIST_START, payload: output});
        var keys = Object.keys(list);
        var output = [];
        for(var i=0; i<keys.length;i++){
            var k = keys[i];
            if(list[k].userUid==user){
                output.push(list[k]);
            }
        }
        dispatch({ type: DOWNLOAD_LIST_SUCCESS, payload: output});
    }
}

export const filterToDoList = (list, user) => {
    return(dispatch) =>{
        dispatch({ type: FILTER_TODOLIST_START});
        var keys = Object.keys(list);
        var output = [];
        for(var i=0; i<keys.length;i++){
            var k = keys[i];
            if(list[k].tasker instanceof Object){
                if(list[k].tasker.idTasker==user){
                    output.push(list[k]);
                }
            }
        }
        dispatch({ type: FILTER_TODOLIST_SUCCESS, list: output});
    }
}