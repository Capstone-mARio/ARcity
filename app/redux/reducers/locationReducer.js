import { AsyncStorage } from 'react-native';

// ACTION TYPES
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';

// ACTION CREATORS
import * as api from '../../firebase/api/locations';
import { auth } from '../../firebase/firebase';

export function fetchLocations(district) {
  return dispatch => {
    api.get(district, function(success, data, error) {
      if (success) {
        dispatch({ type: SET_LOCATIONS, data });
      } else if (error) {
        console.error(error);
      }
    });
  };
}

export function postLocation(district, location) {
  return dispatch => {
    api.post(district, location, function(success, data, error) {
      if (success) {
        dispatch({ type: ADD_LOCATION, data });
      } else if (error) {
        console.error(error);
      }
    });
  };
}


// REDUCER
let initialState = {
  locations: [],
};

export default (locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      const locations = action.data;
      return { ...state, locations };

    case ADD_LOCATION:
      return {...state, locations: [...state.locations, action.data] }

    default:
      return state;
  }
});
