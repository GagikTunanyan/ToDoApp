
  
import toDoState from '../states/to-do';
import { StateToDoTypes } from "../../types/toDo";

const toDoReducer = (state: StateToDoTypes  = toDoState, action: any) => {
    let stateCopy = { ...state };
    if(action.type === "SUCCESS_GET_TASKS") {
        stateCopy = action.payload;
    }
    
    if(action.type === "SUCCESS_ADD_TASK") {
        stateCopy = action.payload;
    }

    if(action.type === "SUCCESS_UPDATE_TASK") {
        stateCopy = action.payload;
    }
    return stateCopy;
};

export default toDoReducer