import { AsyncStorage } from 'react-native';

// ACTION TYPES
export const SET_LOCATIONS = 'SET_LOCATIONS';

// ACTION CREATORS
import * as api from '../../firebase/api/locations';
import { auth } from '../../firebase/firebase';

export function fetchLocations() {
  return dispatch => {
    api.get(function(success, data, error) {
      if (success) {
        dispatch({ type: SET_LOCATIONS, data });
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

    default:
      return state;
  }
});
