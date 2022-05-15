import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import rootReducer from "./reducers/root";
import thunk from "redux-thunk";

export const myStore = createStore(rootReducer, applyMiddleware(thunk, logger));
