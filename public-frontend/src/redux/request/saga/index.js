// @flow
import { put, takeLatest, all } from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { getError, apiCall } from 'redux/@utils/apiCall';
import types from '../types';

const {
  ASYNC_REQUEST,
  ASYNC_START,
  ASYNC_SUCCESS,
  ASYNC_FAIL,
} = types;

function* asyncRequest({
  payload,
  url,
  method,
  callback,
  isToken,
  file,
}: object): Saga<void> {
  try {
    yield put({ type: ASYNC_START});
    yield apiCall({
      type: method,
      body: payload,
      url,
      isToken,
      file,
    });

    yield put({type: ASYNC_SUCCESS, payload: url});
    if (callback) callback();
  } catch (error) {
    yield put({ type: ASYNC_FAIL, payload: getError(error) });
  }
}


function* asyncRequestSaga(): Saga<void> {
  yield all([
    takeLatest(ASYNC_REQUEST, asyncRequest),
  ]);
}
export default asyncRequestSaga;
