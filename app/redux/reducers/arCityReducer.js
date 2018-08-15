//Navigator Scenes
const UNSET = 'UNSET';
const AR_NAVIGATOR_TYPE = 'AR';
const CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';
const SHOOTING_GAME = 'SHOOTING_GAME';

<<<<<<< HEAD
//Initial State
=======
//Initial State 
>>>>>>> 85beacc6740ebecd2b5c8cf681b325676b4b486d
const initialState = {
  navigator: UNSET,
};

//Action Types
<<<<<<< HEAD
const SET_NAV = 'SET_NAV';

//Actions
export const setNav = navScene => ({
  type: SET_NAV,
  navScene,
});
=======
const SET_NAV = 'SET_NAV'

//Actions
export const setNav = (navScene) => ({
  type: SET_NAV,
  navScene,
})
>>>>>>> 85beacc6740ebecd2b5c8cf681b325676b4b486d

//Reducer
const arCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV:
<<<<<<< HEAD
      return { ...state, navigator: action.navScene };
    default:
      return state;
  }
};

export default arCityReducer;
=======
      return {...state, navigator: action.navScene};
    default:
      return state;
  }
}

export default arCityReducer;

>>>>>>> 85beacc6740ebecd2b5c8cf681b325676b4b486d
