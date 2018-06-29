import { all, fork } from 'redux-saga/effects';

import country from './country';

export default function* root() {
  yield all([
    fork(country),
  ]);
}
