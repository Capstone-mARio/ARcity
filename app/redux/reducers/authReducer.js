import { AsyncStorage } from 'react-native';

// ACTION TYPES
export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOGGED_OUT = 'auth/LOGGED_OUT';

// ACTION CREATORS
import * as api from '../../firebase/api/auth';
import { auth } from "../../firebase/firebase";

export function register(data, successCB, errorCB) {
    return (dispatch) => {
        api.register(data, function (success, data, error) {
          if (success) {
                dispatch({type: LOGGED_IN, data});
                successCB(data);
          }else if (error) errorCB(error)
        });
    };
}

export function createUser(user, successCB, errorCB) {
    return (dispatch) => {
        api.createUser(user, function (success, data, error) {
            if (success) {
                dispatch({type: LOGGED_IN, data: user});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function login(data, successCB, errorCB) {
    return (dispatch) => {
        api.login(data, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

export function resetPassword(data, successCB, errorCB) {
    return (dispatch) => {
        api.resetPassword(data, function (success, data, error) {
            if (success) successCB();
            else if (error) errorCB(error)
        });
    };
}

export function signOut(successCB, errorCB) {
    return (dispatch) => {
        api.signOut(function (success, data, error) {
            if (success) {
                dispatch({type: LOGGED_OUT});
                successCB();
            }else if (error) errorCB(error)
        });
    };
}

export function checkLoginStatus(callback) {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null);
            try {
              if (isLoggedIn){
                  api.getUser(user, function (success, { exists, user }, error) {
                      if (success) {
                          if (exists) dispatch({type: LOGGED_IN, data: user});
                          callback(exists, isLoggedIn);
                      }else if (error) {
                          //unable to get user
                          dispatch({type: LOGGED_OUT});
                          callback(false, false);
                      }
                  });
              }else {
                  dispatch({type: LOGGED_OUT});
                  callback(false, isLoggedIn)
              }
            } catch (err) {
              console.error(err);
            }
        });
    };
}

export function signInWithFacebook(facebookToken, successCB, errorCB) {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, function (success, data, error) {
            if (success) {
                if (data.exists) dispatch({type: LOGGED_IN, data: data.user});
                successCB(data);
            }else if (error) errorCB(error)
        });
    };
}

// REDUCER
let initialState = {
  isLoggedIn: false,
};

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            const user = action.data;

            // Save token and  data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ]);

            return {...state, isLoggedIn: true, user: user };

        case LOGGED_OUT:
            let keys = ['user'];
            AsyncStorage.multiRemove(keys);

            return {...state, isLoggedIn: false, user: null};

        default:
            return state;
    }
};

