import { combineReducers } from 'redux';

import authReducer from "./authReducer"
// import { reducer as homeReducer } from "../modules/home"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer });

export default rootReducer;
