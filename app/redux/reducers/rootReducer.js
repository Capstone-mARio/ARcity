import { combineReducers } from 'redux';

import authReducer from './authReducer'
import arCityReducer from './arCityReducer'
import locationReducer from './locationReducer'
// import { reducer as homeReducer } from "../modules/home"

// Combine all the reducers
const rootReducer = combineReducers({ authReducer, arCityReducer, locationReducer });

export default rootReducer;
