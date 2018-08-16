//Navigator Scenes
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';

const initialState = {
  navigator: LOCATION_SAMPLE,
  thisIs: '',
};

const SET_NAV = 'SET_NAV'
const SET_THIS = 'SET_THIS'

//Actions
export const setNav = (navScene) => ({
  type: SET_NAV,
  navScene,
})

export const setThis = (thisIs) => ({
  type: SET_THIS,
  thisIs,
})

//Reducer
const arCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV:
      return { ...state, navigator: action.navScene };
    case SET_THIS:
      return { ...state, thisIs: action.thisIs };
    default:
      return state;
  }
};

export default arCityReducer;

