// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  getError,
  apiCall,
} from 'redux/@utils/apiCall';
import { CONTACT_US } from 'constants/apiUrls';
import {
  SEND_SUPPORT_MESSAGE_REQUEST,
  SEND_SUPPORT_MESSAGE_FAIL,
  SEND_SUPPORT_MESSAGE_START,
  SEND_SUPPORT_MESSAGE_SUCCESS,
} from '../types';


function* sendMessageToSupport({ payload }): Saga<void> {
  try {
    const { body, cb } = payload;
    yield put({ type: SEND_SUPPORT_MESSAGE_START});
    yield apiCall({
      type: 'POST',
      url: `${CONTACT_US}`,
      isToken: true,
      body,
    });

    yield put({
      type: SEND_SUPPORT_MESSAGE_SUCCESS,
    });
    cb();
  } catch (error) {
    yield put({ type: SEND_SUPPORT_MESSAGE_FAIL, payload: getError(error) });
  }
}

function* getSendMessageSaga(): Saga<void> {
  yield all([
    takeLatest(SEND_SUPPORT_MESSAGE_REQUEST, sendMessageToSupport),
  ]);
}

export default getSendMessageSaga;
