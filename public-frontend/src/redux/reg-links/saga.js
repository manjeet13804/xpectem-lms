// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  REG_LINK,
  REG_LINK_STUD,
  REG_LINK_LOGO,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import {
  POST_REGISTRATION_STUDENT,
  POST_REGISTRATION_STUDENT_START,
  POST_REGISTRATION_STUDENT_SUCCESS,
  POST_REGISTRATION_STUDENT_FAIL,
  GET_REGISTRATION_DATA,
  GET_REGISTRATION_DATA_START,
  GET_REGISTRATION_DATA_SUCCESS,
  GET_REGISTRATION_DATA_FAIL,
  GET_LMS_GROUP_LOGO,
  GET_LMS_GROUP_LOGO_START,
  GET_LMS_GROUP_LOGO_SUCCESS,
  GET_LMS_GROUP_LOGO_FAIL,
  CLEAN_UP_STUDENT_DATA,
} from './types';

function* postRegistrationStudent({payload}: object): Saga<void> {
  try {
    yield put({ type: POST_REGISTRATION_STUDENT_START });
    const { data, uid, callBack } = payload;

    const parseData = (studentData: object): object => {
      const existPhones = studentData.phones.filter((el): string => el);
      const existEmails = studentData.emails.filter((el): string => el);
      return {
        ...studentData,
        phones: existPhones,
        emails: existEmails,
      };
    };

    yield apiCall({
      type: 'POST',
      url: `${REG_LINK}/${uid}/${REG_LINK_STUD}`,
      body: parseData(data),
    });

    yield put({
      type: CLEAN_UP_STUDENT_DATA,
    });
    yield put({
      type: POST_REGISTRATION_STUDENT_SUCCESS,
    });
    callBack();
  } catch (error) {
    const { callBack } = payload;
    callBack(getError(error));
    yield put({
      type: POST_REGISTRATION_STUDENT_FAIL,
      payload: getError(error),
    });
  }
}

function* getRegistrationData({payload}: object): Saga<void> {
  try {
    const { uid } = payload;
    yield put({ type: GET_REGISTRATION_DATA_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${REG_LINK}/${uid}`,
    });

    yield put({
      type: GET_REGISTRATION_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_REGISTRATION_DATA_FAIL,
      payload: getError(error),
    });
  }
}

function* getLmsGroupLogo({payload}: object): Saga<void> {
  try {
    yield put({
      type: GET_LMS_GROUP_LOGO_START,
    });
    const { groupId } = payload;

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${REG_LINK_LOGO}/${groupId}`,
    });

    yield put({
      type: GET_LMS_GROUP_LOGO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_LMS_GROUP_LOGO_FAIL,
      payload: getError(error),
    });
  }
}

function* regLinkSaga(): Saga<void> {
  yield all([
    takeLatest(POST_REGISTRATION_STUDENT, postRegistrationStudent),
    takeLatest(GET_REGISTRATION_DATA, getRegistrationData),
    takeLatest(GET_LMS_GROUP_LOGO, getLmsGroupLogo),
  ]);
}

export default regLinkSaga;
