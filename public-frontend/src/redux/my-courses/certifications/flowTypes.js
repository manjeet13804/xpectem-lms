// @flow
import { CertificationType, CertificationLogsType } from 'models';
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

type MakeBookingType = {
    type: MAKE_BOOKING,
    payload: {
        courseId: number,
        certificationId: number
    }
};

type MakeBookingSuccessType = {
    type: MAKE_BOOKING_SUCCESS,
    payload: {
        courseId: number,
        certificationId: number
    }
};

type CancelBookingType = {
    type: CANCEL_BOOKING,
    payload: {
        courseId: number,
        certificationId: number
    }
};

type CancelBookingSuccessType = {
    type: CANCEL_BOOKING_SUCCESS,
    payload: {
        courseId: number,
        certificationId: number
    }
};

type GetCertificationsType = {
    type: GET_CERTIFICATIONS,
    payload: {
        courseId: number
    }
};

type GetCertificationsLogsType = {
    type: GET_CERTIFICATIONS_LOGS,
    payload: {
        studentId: number,
        courseId: number
    }
};

type GetCertificationsSuccessType = {
    type: GET_CERTIFICATIONS_SUCCESS,
    payload: {
        certifications: Array<CertificationType>
    }
};

type GetCertificationsLogsSuccessType = {
    type: GET_CERTIFICATIONS_LOGS_SUCCESS,
    payload: {
        certificationExamLogs: Array<CertificationLogsType>
    }
};

type StartType = {
    type: GET_CERTIFICATIONS_START
        | GET_CERTIFICATIONS_LOGS_START
        | MAKE_BOOKING_START
        | CANCEL_BOOKING_START
};

type SuccessType = GetCertificationsSuccessType
     | MakeBookingSuccessType
     | CancelBookingSuccessType
     | GetCertificationsLogsSuccessType;

type FailType = {
    type: GET_CERTIFICATIONS_FAIL
        | GET_CERTIFICATIONS_LOGS_FAIL
        | MAKE_BOOKING_FAIL
        | CANCEL_BOOKING_FAIL,
    payload: string | null
};

type StateType = {
    [key: string]: CertificationType | CertificationLogsType
};

export {
  GetCertificationsType,
  GetCertificationsLogsType,
  GetCertificationsSuccessType,
  GetCertificationsLogsSuccessType,
  MakeBookingType,
  MakeBookingSuccessType,
  CancelBookingType,
  CancelBookingSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
