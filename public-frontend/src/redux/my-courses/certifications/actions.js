// @flow
import {
  GET_CERTIFICATIONS,
  GET_CERTIFICATIONS_LOGS,
  MAKE_BOOKING,
  CANCEL_BOOKING,
} from './types';
import {
  GetCertificationsType,
  GetCertificationsLogsType,
  MakeBookingType,
  CancelBookingType,
} from './flowTypes';

const getCertifications = (courseId: number): GetCertificationsType => ({
  type: GET_CERTIFICATIONS,
  payload: {
    courseId,
  },
});

const getCertificationsLogs = (courseId: number): GetCertificationsLogsType => ({
  type: GET_CERTIFICATIONS_LOGS,
  payload: {
    courseId,
  },
});

const makeBooking = (
  courseId: number,
  certificationId: number,
): MakeBookingType => ({
  type: MAKE_BOOKING,
  payload: {
    courseId,
    certificationId,
  },
});

const cancelBooking = (
  courseId: number,
  certificationId: number,
): CancelBookingType => ({
  type: CANCEL_BOOKING,
  payload: {
    courseId,
    certificationId,
  },
});

export {
  getCertifications,
  getCertificationsLogs,
  makeBooking,
  cancelBooking,
};
