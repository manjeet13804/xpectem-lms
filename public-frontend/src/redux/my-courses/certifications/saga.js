// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  COURSE,
  CERTIFICATION,
  BOOKING,
  COURSE_LOG,
  CURRENT_PROFILE,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { normalize } from 'normalizr';
import { CertificationType, CertificationLogType } from 'models';
import {
  GET_CERTIFICATIONS,
  GET_CERTIFICATIONS_START,
  GET_CERTIFICATIONS_SUCCESS,
  GET_CERTIFICATIONS_FAIL,
  GET_CERTIFICATIONS_LOGS,
  GET_CERTIFICATIONS_LOGS_START,
  GET_CERTIFICATIONS_LOGS_SUCCESS,
  GET_CERTIFICATIONS_LOGS_FAIL,
  MAKE_BOOKING,
  MAKE_BOOKING_START,
  MAKE_BOOKING_SUCCESS,
  MAKE_BOOKING_FAIL,
  CANCEL_BOOKING,
  CANCEL_BOOKING_START,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAIL,
} from './types';
import {
  GetCertificationsType,
  MakeBookingType,
  CancelBookingType,
} from './flowTypes';
import { certification } from './schema';

function* getCertifications(
  {
    payload: {
      courseId,
    },
  }: GetCertificationsType,
): Saga<void> {
  try {
    yield put({ type: GET_CERTIFICATIONS_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${COURSE}/${courseId}/${CERTIFICATION}`,
      isToken: true,
    });


    const rawCertifications = data.map(
      (cert: CertificationType): CertificationType => ({
        ...cert,
        ...(cert.isBooked && { course: courseId }),
      }),
    );

    const {
      entities: {
        certifications,
      },
    } = normalize(
      rawCertifications,
      [certification],
    );

    yield put({
      type: GET_CERTIFICATIONS_SUCCESS,
      payload: {
        courseId,
        certifications,
      },
    });
  } catch (error) {
    yield put({
      type: GET_CERTIFICATIONS_FAIL,
      payload: getError(error),
    });
  }
}

function* getCertificationsLogs({ payload: { courseId } }: CertificationLogType): Saga<void> {
  try {
    const {
      data: {
        data: { id },
      },
    } = yield apiCall({
      type: 'GET',
      url: `${CURRENT_PROFILE}`,
      isToken: true,
    });

    yield put({ type: GET_CERTIFICATIONS_LOGS_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${COURSE_LOG}`,
      isToken: true,
      params: {
        courseId,
        studentId: id,
      },
    });
    yield put({
      type: GET_CERTIFICATIONS_LOGS_SUCCESS,
      payload: {
        courseId,
        certificationsLogs: data.certificationExamLogs,
      },
    });
  } catch (error) {
    yield put({
      type: GET_CERTIFICATIONS_LOGS_FAIL,
      payload: getError(error),
    });
  }
}

function* makeBooking(
  {
    payload: {
      courseId,
      certificationId,
    },
  }: MakeBookingType,
): Saga<void> {
  try {
    yield put({ type: MAKE_BOOKING_START });

    yield apiCall({
      type: 'POST',
      url: `${COURSE}/${courseId}/${CERTIFICATION}/${certificationId}/${BOOKING}`,
      isToken: true,
    });

    yield put({
      type: MAKE_BOOKING_SUCCESS,
      payload: {
        courseId,
        certificationId,
      },
    });
  } catch (error) {
    yield put({
      type: MAKE_BOOKING_FAIL,
      payload: getError(error),
    });
  }
}

function* cancelBooking(
  {
    payload: {
      courseId,
      certificationId,
    },
  }: CancelBookingType,
): Saga<void> {
  try {
    yield put({ type: CANCEL_BOOKING_START });

    yield apiCall({
      type: 'DELETE',
      url: `${COURSE}/${courseId}/${CERTIFICATION}/${certificationId}/${BOOKING}`,
      isToken: true,
    });

    yield put({
      type: CANCEL_BOOKING_SUCCESS,
      payload: {
        courseId,
        certificationId,
      },
    });
  } catch (error) {
    yield put({
      type: CANCEL_BOOKING_FAIL,
      payload: getError(error),
    });
  }
}

function* certificationsSaga(): Saga<void> {
  yield all([
    takeLatest(GET_CERTIFICATIONS, getCertifications),
    takeLatest(GET_CERTIFICATIONS_LOGS, getCertificationsLogs),
    takeLatest(MAKE_BOOKING, makeBooking),
    takeLatest(CANCEL_BOOKING, cancelBooking),
  ]);
}

export default certificationsSaga;
