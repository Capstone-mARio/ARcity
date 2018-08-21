import { AsyncStorage } from 'react-native';
import store from '../store';

// ACTION TYPES
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const ADD_LOCATION = 'ADD_LOCATION';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const CLEAR_LOCATION_ID = 'CLEAR_LOCATION_ID';

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

export function postLocation(location) {
  return dispatch => {
    api.post(location, function(success, data, error) {
      if (success) {
        dispatch({ type: ADD_LOCATION, data });
      } else if (error) {
        console.error(error);
      }
    });
  };
}

export function watchLocation() {
  return dispatch => {
    const id = navigator.geolocation.watchPosition(onSuccess, onError);
    dispatch({ type: SET_LOCATION_ID, id });
  }
}

export function stopLocationWatch(id) {
  return dispatch => {
    const id = navigator.geolocation.clearWatch(id);
    dispatch({ type: CLEAR_LOCATION_ID });
  }
}

export function onSuccess(pos) {
  var crd = pos.coords;
  store.dispatch({
    type: UPDATE_LOCATION,
    currentLat: crd.latitude,
    currentLong: crd.longitude,
  });
}

export function onError(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}


// REDUCER
let initialState = {
  locations: [],
  currentLat: 0,
  currentLong: 0,
  id: 0,
};

export default (locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      const locations = action.data;
      return { ...state, locations: locations };

    case ADD_LOCATION:
      return {...state, locations: [...state.locations, action.data] };

    case SET_LOCATION_ID:
      return {...state, id: action.id };

    case UPDATE_LOCATION:
      return {...state, currentLat: action.currentLat, currentLong: action.currentLong };

    case CLEAR_LOCATION_ID:
      return {...state, id: 0 };

    default:
      return state;
  }
});
