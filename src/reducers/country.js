import {
  COUNTRY,
  SORT_COUNTRY,
  SEARCH_COUNTRY,
} from 'actions/types';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'actions/utils';

const initialState = {
  isFetching: false,
  sort: {
    type: '',
    desc: false,
  },
  query: '',
  data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY[REQUEST]: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case COUNTRY[SUCCESS]: {
      try {
        const { response } = action;
        const data = Object.keys(response).map((key) => (
          { code: key, name: response[key] }
        ));
        return {
          ...state,
          isFetching: false,
          data,
        };
      } catch (e) {
        return {
          ...state,
          isFetching: false,
        };
      }
    }
    case COUNTRY[FAILURE]: {
      return {
        ...state,
        isFetching: false,
      };
    }
    case SORT_COUNTRY: {
      const { sort } = action;
      const oldSort = state.sort;
      const newSort = {
        type: (sort === oldSort.type && oldSort.desc) ? '' : sort,
        desc: (sort !== oldSort.type) ? false : !oldSort.desc,
      };
      return {
        ...state,
        sort: newSort,
      };
    }
    case SEARCH_COUNTRY: {
      const { query } = action;
      return {
        ...state,
        query,
      };
    }
    default:
      return state;
  }
};
