/* global describe beforeEach afterEach it */

import arCityReducer, {
  setNav,
  setThis
} from '../../redux/reducers/arCityReducer';
import configureMockStore from 'redux-mock-store';
import { createStore } from 'redux';

const mockStore = configureMockStore();

const SET_NAV = 'SET_NAV';
const SET_THIS = 'SET_THIS';
const TEST_LOCATION = 'TEST_LOCATION';
const TEST_THIS = this;

const initialState = {
  navigator: 'DEFAULT_LOCATION',
  thisIs: ''
};

let actionCreatorTest = mockStore(initialState);
let storeTest = createStore(arCityReducer);

afterEach(() => {
  actionCreatorTest.clearActions();
});

// testing that action creators properly create actions

test('setNav action creator', () => {
  actionCreatorTest.dispatch(setNav(TEST_LOCATION));
  const actions = actionCreatorTest.getActions();
  expect(actions[0].type).toBe(SET_NAV);
  expect(actions[0].navScene).toBe(TEST_LOCATION);
});

test('setThis action creator', () => {
  actionCreatorTest.dispatch(setThis(TEST_THIS));
  const actions = actionCreatorTest.getActions();
  expect(actions[0].type).toBe(SET_THIS);
  expect(actions[0].thisIs).toEqual(TEST_THIS);
});

// testing that action creators properly change state

test('setNav reaches state', () => {
  storeTest.dispatch(setNav(TEST_LOCATION));
  expect(storeTest.getState().navigator).toBe(TEST_LOCATION);
});

test('setThis reaches state', () => {
  storeTest.dispatch(setThis(TEST_THIS));
  expect(storeTest.getState().thisIs).toEqual(TEST_THIS);
});

describe('arCityReducer', () => {
  describe('actions', () => {
    it('setNav returns properly formatted object', () => {
      const navScene = 'ARHOME';
      const expectedOutput = { type: 'SET_NAV', navScene };

      expect(setNav(navScene)).toEqual(expectedOutput);
    });
    it('setThis returns properly formatted object', () => {
      const thisIs = 'this';
      const expectedOutput = { type: 'SET_THIS', thisIs };

      expect(setThis(thisIs)).toEqual(expectedOutput);
    });
  });
  describe('reducer', () => {
    const initialState = {
      navigator: 'LOCATION_SAMPLE',
      thisIs: ''
    };
    it('returns initial state', () => {
      expect(arCityReducer(undefined, {})).toEqual(initialState);
    });

    it('setNav should change the navigator', () => {
      expect(arCityReducer(initialState, setNav('ARHOME'))).toEqual({
        navigator: 'ARHOME',
        thisIs: ''
      });
    });

    it('setThis chould change thisIs', () => {
      expect(arCityReducer(initialState, setThis('this'))).toEqual({
        navigator: 'LOCATION_SAMPLE',
        thisIs: 'this'
      });
    });
  });
});
