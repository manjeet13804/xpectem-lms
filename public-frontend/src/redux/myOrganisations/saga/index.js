// @flow
import {
  put,
  takeLatest,
  select,
  all,
  call,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import { MYORGANISATION } from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { actionGetOrganisationGroup } from 'redux/actions';
import { getCurrentMyOrganisationId } from 'redux/selectors';
import types from '../types';

const {
  GET_ALL_MY_ORGANISATION_REQUEST,
  GET_ALL_MY_ORGANISATION_START,
  GET_ALL_MY_ORGANISATION_FAIL,
  GET_ALL_MY_ORGANISATION_SUCCESS,
  GET_MY_ORGANISATION_INITIALIZATION,
  GET_MY_ORGANISATION_INFORMATION_FAIL,
  GET_MY_ORGANISATION_INFORMATION_SUCCESS,
  GET_MY_ORGANISATION_INFORMATION_REQUEST,
  GET_MY_ORGANISATION_INFORMATION_START,
} = types;

function* getAllMyOrganisation(): Saga<Array> {
  try {
    yield put({ type: GET_ALL_MY_ORGANISATION_START});
    const {data: {data}} = yield apiCall({type: 'GET', url: MYORGANISATION, isToken: true});
    yield put({
      type: GET_ALL_MY_ORGANISATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_ALL_MY_ORGANISATION_FAIL, payload: getError(error) });
  }
}

function* initializeMyOrganisation(): Saga<void> {
  try {
    yield call(getAllMyOrganisation);
    const id = yield select(getCurrentMyOrganisationId);
    yield put(actionGetOrganisationGroup(id));
  } catch (error) {
    yield put({ type: GET_ALL_MY_ORGANISATION_FAIL, payload: getError(error) });
  }
}

function* getMyOrganisationInfo({payload}): Saga<void> {
  try {
    yield put({ type: GET_MY_ORGANISATION_INFORMATION_START});
    const { data } = yield apiCall(
      {
        type: 'GET',
        url: `${MYORGANISATION}/${payload}/welcome`,
        isToken: true,
      },
    );
    yield put({ type: GET_MY_ORGANISATION_INFORMATION_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: GET_MY_ORGANISATION_INFORMATION_FAIL, payload: getError(e) });
  }
}

function* myOrganisationSaga(): Saga<void> {
  yield all([
    takeLatest(GET_MY_ORGANISATION_INFORMATION_REQUEST, getMyOrganisationInfo),
    takeLatest(GET_ALL_MY_ORGANISATION_REQUEST, getAllMyOrganisation),
    takeLatest(GET_MY_ORGANISATION_INITIALIZATION, initializeMyOrganisation),
  ]);
}
export default myOrganisationSaga;
