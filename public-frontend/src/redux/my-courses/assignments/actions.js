// @flow
import {
  START_ASSIGNMENT,
  COMPLETE_ASSIGNMENT,
} from './types';
import {
  StartAssignmentType,
  CompleteAssignmentType,
} from './flowTypes';

const startAssignment = (assignmentId: number): StartAssignmentType => ({
  type: START_ASSIGNMENT,
  payload: {
    assignmentId,
  },
});

const completeAssignment = (assignmentId: number): CompleteAssignmentType => ({
  type: COMPLETE_ASSIGNMENT,
  payload: {
    assignmentId,
  },
});

export {
  startAssignment,
  completeAssignment,
};
