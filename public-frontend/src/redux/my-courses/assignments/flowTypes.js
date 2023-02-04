// @flow
import { ByIdType, AssignmentType } from 'models';
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

type StartAssignmentType = {
  type: START_ASSIGNMENT,
  payload: {
    assignmentId: number
  }
};

type StartAssignmentSuccessType = {
  type: START_ASSIGNMENT_SUCCESS,
  payload: {
    assignment: AssignmentType
  }
};

type CompleteAssignmentType = {
  type: COMPLETE_ASSIGNMENT,
  payload: {
    assignmentId: number
  }
};

type CompleteAssignmentSuccessType = {
  type: COMPLETE_ASSIGNMENT_SUCCESS,
  payload: {
    assignment: AssignmentType
  }
};

type StartType = {
  type: START_ASSIGNMENT_START | COMPLETE_ASSIGNMENT_START
};

type SuccessType = StartAssignmentSuccessType | CompleteAssignmentSuccessType;

type FailType = {
  type: START_ASSIGNMENT_FAIL | COMPLETE_ASSIGNMENT_FAIL,
  payload: string | null
};

type StateType = ByIdType<AssignmentType>;

export {
  StartAssignmentType,
  StartAssignmentSuccessType,
  CompleteAssignmentType,
  CompleteAssignmentSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
