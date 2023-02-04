// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  MY_CERTIFICATE,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { normalize } from 'normalizr';
import {
  FETCH_MY_CERTIFICATES,
  FETCH_MY_CERTIFICATES_START,
  FETCH_MY_CERTIFICATES_SUCCESS,
  FETCH_MY_CERTIFICATES_FAIL,
} from './types';
import { certificates as certificatesSchema } from './schema';

function* getMyCertificates(): Saga<Array> {
  try {
    yield put({ type: FETCH_MY_CERTIFICATES_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: MY_CERTIFICATE,
      isToken: true,
    });

    const {
      entities: {
        certificates,
        courses,
      },
    } = normalize(
      data,
      [certificatesSchema],
    );

    yield put({
      type: FETCH_MY_CERTIFICATES_SUCCESS,
      payload: {
        certificates,
        courses,
      },
    });
  } catch (error) {
    yield put({
      type: FETCH_MY_CERTIFICATES_FAIL,
      payload: getError(error),
    });
  }
}

function* myCertificatesSaga(): Saga<void> {
  yield all([
    takeLatest(FETCH_MY_CERTIFICATES, getMyCertificates),
  ]);
}

export default myCertificatesSaga;
