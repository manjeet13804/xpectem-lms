// @flow
import merge from 'lodash/merge';
import _ from 'lodash';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import { COMPLETE_ASSIGNMENT_SUCCESS, START_ASSIGNMENT_SUCCESS } from './types';
import { GET_MY_COURSE, GET_MY_COURSE_SUCCESS } from '../types';
import {
  StateType,
  SuccessType,
} from './flowTypes';
import { GetMyCourseSuccessType } from '../flowTypes';

type ActionType = SuccessType | GetMyCourseSuccessType;

const byId = (assignments: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case START_ASSIGNMENT_SUCCESS:
    case COMPLETE_ASSIGNMENT_SUCCESS:
      return merge(
        {},
        assignments,
        { [action.payload.assignment.id]: action.payload.assignment },
      );

    case GET_MY_COURSE_SUCCESS: {
      const newAssignments = _.get(action, 'payload.assignments', {});
      return merge({}, assignments, newAssignments);
    }

    default:
      return assignments;
  }
};

export default combineReducers({
  byId,
  ...createHelpReducers(
    [
      GET_MY_COURSE,
    ],
    'assignments',
  ),
});
