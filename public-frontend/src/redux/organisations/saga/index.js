// @flow
import {
  put,
  takeLatest,
  select,
  all,
  call,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { ORGANISATION } from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { actionGetOrganisationGroup } from 'redux/actions';
import { getCurrentOrganisationId } from 'redux/selectors';
import types from '../types';

const {
  GET_ALL_ORGANISATION_REQUEST,
  GET_ALL_ORGANISATION_START,
  GET_ALL_ORGANISATION_FAIL,
  GET_ALL_ORGANISATION_SUCCESS,
  GET_ORGANISATION_INITIALIZATION,
} = types;

function* getAllOrganisation(): Saga<Array> {
  try {
    yield put({ type: GET_ALL_ORGANISATION_START});
    const {data: {data}} = yield apiCall({type: 'GET', url: ORGANISATION, isToken: true});
    yield put({
      type: GET_ALL_ORGANISATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_ALL_ORGANISATION_FAIL, payload: getError(error) });
  }
}

function* initializeOrganisation(): Saga<void> {
  try {
    yield call(getAllOrganisation);
    const id = yield select(getCurrentOrganisationId);
    yield put(actionGetOrganisationGroup(id));
  } catch (error) {
    yield put({ type: GET_ALL_ORGANISATION_FAIL, payload: getError(error) });
  }
}

function* organisationSaga(): Saga<void> {
  yield all([
    takeLatest(GET_ALL_ORGANISATION_REQUEST, getAllOrganisation),
    takeLatest(GET_ORGANISATION_INITIALIZATION, initializeOrganisation),
  ]);
}
export default organisationSaga;
