import { combineReducers } from 'redux';

import authReducer from './authReducer'
import arCityReducer from './arCityReducer'
// import { reducer as homeReducer } from "../modules/home"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, arCityReducer });

export default rootReducer;
