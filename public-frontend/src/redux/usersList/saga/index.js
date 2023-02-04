// @flow
import type {Saga} from 'redux-saga';
import {put, takeLatest, all} from 'redux-saga/effects';
import {getError, apiCall} from 'redux/@utils/apiCall';
import {SEARCH_USER, ADMIN_USER} from 'constants/apiUrls';
import types from '../types';

const {
  SEARCH_USERS,
  GET_USERS_LIST_START,
  GET_USERS_LIST_SUCCESS,
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST,
} = types;

function* searchUsers({payload}: {payload: string}): Saga<void> {
  try {
    yield put({ type: GET_USERS_LIST_START});
    const {data: {data}} = yield apiCall({
      type: 'GET',
      url: SEARCH_USER + payload,
      isToken: true,
    });
    yield put({
      type: GET_USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_USERS_LIST_FAIL, payload: getError(error) });
  }
}


function* getAllUsers(): Saga<void> {
  try {
    yield put({ type: GET_USERS_LIST_START});
    const {data: {data}} = yield apiCall({
      type: 'GET',
      url: ADMIN_USER,
      isToken: true,
    });
    yield put({
      type: GET_USERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_USERS_LIST_FAIL, payload: getError(error) });
  }
}


function* usersListSaga(): Saga<void> {
  yield all([
    takeLatest(SEARCH_USERS, searchUsers),
    takeLatest(GET_USERS_LIST, getAllUsers),
  ]);
}

export default usersListSaga;
