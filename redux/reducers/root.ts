import { combineReducers } from "redux";
import toDoReducer from "./toDo";

const rootReducer = combineReducers({ toDo: toDoReducer });

export default rootReducer;