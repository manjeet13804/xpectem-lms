// @flow
import merge from 'lodash/merge';
import immutable from 'object-path-immutable';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import { CertificationType } from 'models';
import {
  StateType,
  SuccessType,
} from './flowTypes';
import {
  GET_CERTIFICATIONS,
  GET_CERTIFICATIONS_SUCCESS,
  MAKE_BOOKING_SUCCESS,
  CANCEL_BOOKING_SUCCESS,
  GET_CERTIFICATIONS_LOGS_SUCCESS,
} from './types';

type ActionType = SuccessType;

const byId = (certifications: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case MAKE_BOOKING_SUCCESS: {
      return immutable.update(
        certifications,
        action.payload.certificationId,
        (
          certification: CertificationType,
        ): CertificationType => ({
          ...certification,
          isBooked: true,
          course: action.payload.courseId,
        }),
      );
    }

    case CANCEL_BOOKING_SUCCESS: {
      return immutable.update(
        certifications,
        action.payload.certificationId,
        (
          certification: CertificationType,
        ): CertificationType => ({
          ...certification,
          isBooked: false,
          course: null,
        }),
      );
    }

    case GET_CERTIFICATIONS_SUCCESS: {
      return merge({}, certifications, action.payload.certifications);
    }

    default:
      return certifications;
  }
};

const certificationsLogs = (state: StateType = [], action: ActionType): StateType => {
  switch (action.type) {
    case GET_CERTIFICATIONS_LOGS_SUCCESS: {
      return [...action.payload.certificationsLogs];
    }
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  certificationsLogs,
  ...createHelpReducers(
    [
      GET_CERTIFICATIONS,
    ],
    'certifications',
  ),
});
