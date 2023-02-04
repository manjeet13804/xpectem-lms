// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  ASSIGNMENT,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import {
  START_ASSIGNMENT,
  START_ASSIGNMENT_START,
  START_ASSIGNMENT_SUCCESS,
  START_ASSIGNMENT_FAIL,
  COMPLETE_ASSIGNMENT,
  COMPLETE_ASSIGNMENT_START,
  COMPLETE_ASSIGNMENT_SUCCESS,
  COMPLETE_ASSIGNMENT_FAIL,
} from './types';
import {
  StartAssignmentType,
  CompleteAssignmentType,
} from './flowTypes';

function* startAssignment(
  {
    payload: {
      assignmentId,
    },
  }: StartAssignmentType,
): Saga<void> {
  try {
    yield put({ type: START_ASSIGNMENT_START });

    const {
      data: {
        data: assignment,
      },
    } = yield apiCall({
      type: 'POST',
      url: `${ASSIGNMENT}/${assignmentId}/start`,
      isToken: true,
    });

    yield put({
      type: START_ASSIGNMENT_SUCCESS,
      payload: {
        assignment,
      },
    });
  } catch (error) {
    yield put({
      type: START_ASSIGNMENT_FAIL,
      payload: getError(error),
    });
  }
}

function* completeAssignment(
  {
    payload: {
      assignmentId,
    },
  }: CompleteAssignmentType,
): Saga<void> {
  try {
    yield put({ type: COMPLETE_ASSIGNMENT_START });

    const {
      data: {
        data: assignment,
      },
    } = yield apiCall({
      type: 'POST',
      url: `${ASSIGNMENT}/${assignmentId}/complete`,
      isToken: true,
    });

    yield put({
      type: COMPLETE_ASSIGNMENT_SUCCESS,
      payload: {
        assignment,
      },
    });
  } catch (error) {
    yield put({
      type: COMPLETE_ASSIGNMENT_FAIL,
      payload: getError(error),
    });
  }
}

function* assignmentsSaga(): Saga<void> {
  yield all([
    takeLatest(START_ASSIGNMENT, startAssignment),
    takeLatest(COMPLETE_ASSIGNMENT, completeAssignment),
  ]);
}

export default assignmentsSaga;
