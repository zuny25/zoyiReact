import {
  all,
  takeLatest,
  put,
  call,
} from 'redux-saga/effects';
import {
  REQUEST,
} from 'actions/utils';


import { COUNTRY } from 'actions/types';
import { country } from 'actions';

export function* getCountry$() {
  try {
    const res = yield call(fetch, 'http://localhost:3030/api/country');
    const json = yield call([res, res.json]);

    yield put(country.success(json));
  } catch (e) {
    yield put(country.failure(e));
  }
}

export default function* country$() {
  yield all([
    takeLatest(COUNTRY[REQUEST], getCountry$),
  ]);
}
