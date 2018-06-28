import * as types from 'actions/types';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  action,
} from 'actions/utils';

export const country = {
  request: () => action(types.COUNTRY[REQUEST]),
  success: (response) => action(types.COUNTY[SUCCESS], { response }),
  failure: (error) => action(types.COUNTRY[FAILURE], { error }),
};

export const sortCountry = (sort) => action(types.SORT_COUNTRY, { sort });
export const searchCountry = (query) => action(types.SEARCH_COUNTRY, { query });
