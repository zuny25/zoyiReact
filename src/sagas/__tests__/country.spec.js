import { put, call } from 'redux-saga/effects';
import {
  getCountry$,
  fetchUrl,
} from 'sagas/country';
import { country } from 'actions';

describe('Country saga', () => {
  it('Should test country saga', () => {
    const res = {
      test: () => 0,
      json: 'test',
    };
    const gen = getCountry$();
    expect(gen.next().value).toEqual(call(fetchUrl, 'http://localhost:3030/api/country'));
    expect(gen.next(res).value).toEqual(call([res, res.json]));
    expect(gen.next(res.json).value).toEqual(put(country.success(res.json)));
    expect(gen.next().done).toEqual(true);
  });
});
