// @flow
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import {
  StartType,
  SuccessType,
  FailType,
  StateType,
} from './flowTypes';
import {
  FETCH_MY_CERTIFICATES,
  FETCH_MY_CERTIFICATES_SUCCESS,
} from './types';

type ActionType = StartType
  | FailType
  | SuccessType;

const byId = (certificates: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case FETCH_MY_CERTIFICATES_SUCCESS: {
      return merge({}, certificates, action.payload.certificates);
    }

    default:
      return certificates;
  }
};

export default combineReducers({
  byId,
  ...createHelpReducers(
    [
      FETCH_MY_CERTIFICATES,
    ],
    'certificates',
  ),
});
