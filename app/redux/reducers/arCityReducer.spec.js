import reducer, { setNav, setThis } from './arCityReducer';

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
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('setNav should change the navigator', () => {
      expect(reducer(initialState, setNav('ARHOME'))).toEqual({
        navigator: 'ARHOME',
        thisIs: ''
      });
    });

    it('setThis chould change thisIs', () => {
      expect(reducer(initialState, setThis('this'))).toEqual({
        navigator: 'LOCATION_SAMPLE',
        thisIs: 'this'
      });
    });
  });
});
