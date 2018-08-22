//Navigator Scenes
const LOCATION_SAMPLE = 'LOCATION_SAMPLE';

const initialState = {
  navigator: LOCATION_SAMPLE,
  thisIs: '',
  list: [],
};

const SET_NAV = 'SET_NAV'
const SET_THIS = 'SET_THIS'
const SET_OBJ_LIST = 'SET_OBJ_LIST'

//Actions
export const setNav = (navScene) => ({
  type: SET_NAV,
  navScene,
})

export const setThis = (thisIs) => ({
  type: SET_THIS,
  thisIs,
})

export const setObjList = (list) => ({
  type: SET_OBJ_LIST,
  list,
})

//Reducer
const arCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAV:
      return { ...state, navigator: action.navScene };
    case SET_THIS:
      return { ...state, thisIs: action.thisIs };
    case SET_OBJ_LIST:
      if(state.list.length < 3) {
        return { ...state, list: [...state.list, action.list]};
      } else {
        return {...state, list: [...state.list.slice(1), action.list]}
      }
    default:
      return state;
  }
};

export default arCityReducer;

