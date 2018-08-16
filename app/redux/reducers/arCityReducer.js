//Navigator Scenes
const UNSET = 'UNSET';
const AR_NAVIGATOR_TYPE = 'AR';
const CUBE_LANDING_GAME = 'CUBE_LANDING_GAME';
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';
const SHOOTING_GAME = 'SHOOTING_GAME';


const initialState = {
  navigator: UNSET,
};

const SET_NAV = 'SET_NAV'

//Actions
export const setNav = (navScene) => ({
  type: SET_NAV,
  navScene,
})

//Reducer
const arCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV:
      return { ...state, navigator: action.navScene };
    default:
      return state;
  }
};

export default arCityReducer;

