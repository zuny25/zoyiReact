import {
  country,
  searchCountry,
  sortCountry,
} from 'actions';
import reducer, { initialState } from 'reducers/country';

const fetchingState = {
  ...initialState,
  isFetching: true,
};

describe('Country Reducer', () => {
  it('should return same state with wrong action', () => {
    const newState = reducer(initialState, { type: 'WRONG_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('should handle country request properly', () => {
    const newState = reducer(initialState, country.request());
    expect(newState).toEqual(fetchingState);
  });

  it('should handle country success with proper response', () => {
    const newState = reducer(fetchingState, country.success({
      A: 'A',
      B: 'B',
    }));
    expect(newState).toEqual({
      ...fetchingState,
      isFetching: false,
      data: [
        { code: 'A', name: 'A' },
        { code: 'B', name: 'B' },
      ],
    });
  });

  it('should handle country success with wrong response', () => {
    const newState = reducer(fetchingState, country.success(null));
    expect(newState).toEqual({
      ...fetchingState,
      isFetching: false,
    });
  });

  it('should handle country failure', () => {
    const newState = reducer(fetchingState, country.failure());
    expect(newState).toEqual({
      ...fetchingState,
      isFetching: false,
    });
  });

  it('should handle search country', () => {
    const newState = reducer(initialState, searchCountry('query'));
    expect(newState).toEqual({
      ...initialState,
      query: 'query',
    });
  });

  it('should handle sort country when user click same sort button', () => {
    const newState1 = reducer(initialState, sortCountry('code'));
    expect(newState1).toEqual({
      ...initialState,
      sort: { type: 'code', desc: false },
    });

    const newState2 = reducer(newState1, sortCountry('code'));
    expect(newState2).toEqual({
      ...newState1,
      sort: { type: 'code', desc: true },
    });

    const newState3 = reducer(newState2, sortCountry('code'));
    expect(newState3).toEqual({
      ...newState2,
      sort: { type: '', desc: false },
    });
  });

  it('should handle sort country when user click other sort button', () => {
    const newState1 = reducer(initialState, sortCountry('code'));
    expect(newState1).toEqual({
      ...initialState,
      sort: { type: 'code', desc: false },
    });

    const newState2 = reducer(newState1, sortCountry('name'));
    expect(newState2).toEqual({
      ...newState1,
      sort: { type: 'name', desc: false },
    });
  });
});
