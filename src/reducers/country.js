import { COUNTRY } from 'actions/types';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'actions/utils';

const initialState = {
  isFetching: false,
  data: {},
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
          {
            code: key,
            name: response[key],
          }
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
    default:
      return state;
  }
};
