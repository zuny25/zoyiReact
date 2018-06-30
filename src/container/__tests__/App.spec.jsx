import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createMockStore } from 'redux-test-utils';


import App from 'container/App';
import { initialState } from 'reducers/country';

import Loader from 'components/Loader';

Enzyme.configure({ adapter: new Adapter() });

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

const data = [
  { code: 'A', name: 'A' },
  { code: 'AA', name: 'AA' },
  { code: 'B', name: 'B' },
  { code: 'C', name: 'C' },
];

describe('<App />', () => {
  it('should render Loader when isFetching is true', () => {
    const store = createMockStore({
      country: {
        ...initialState,
        isFetching: true,
      },
    });
    const app = shallowWithStore(<App />, store);
    expect(app.dive().find(Loader).exists()).toEqual(true);
  });

  it('should render app when isFetching is false', () => {
    const store = createMockStore({
      country: {
        ...initialState,
        isFetching: false,
      },
    });
    const app = shallowWithStore(<App />, store);
    expect(app.dive().find(Loader).exists()).toEqual(false);
  });

  it('should filter data propery', () => {
    const store = createMockStore({
      country: {
        ...initialState,
        data,
        query: 'A',
      },
    });
    const app = shallowWithStore(<App />, store);
    expect(app.prop('data').length).toEqual(2);
  });

  it('should sort data propery', () => {
    const store = createMockStore({
      country: {
        ...initialState,
        data,
        sort: {
          type: 'code',
          desc: true,
        },
      },
    });
    const app = shallowWithStore(<App />, store);
    expect(app.prop('data')).toEqual([
      { code: 'C', name: 'C' },
      { code: 'B', name: 'B' },
      { code: 'AA', name: 'AA' },
      { code: 'A', name: 'A' },
    ]);
  });

  it('should manipulate data propery when query and sort is set', () => {
    const store = createMockStore({
      country: {
        ...initialState,
        data,
        sort: {
          type: 'code',
          desc: true,
        },
        query: 'A',
      },
    });
    const app = shallowWithStore(<App />, store);
    expect(app.prop('data')).toEqual([
      { code: 'AA', name: 'AA' },
      { code: 'A', name: 'A' },
    ]);
  });
});
