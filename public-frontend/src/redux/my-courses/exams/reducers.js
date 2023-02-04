// @flow
import merge from 'lodash/merge';
import _ from 'lodash';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import { GET_MY_COURSE, GET_MY_COURSE_SUCCESS } from '../types';
import {
  StateType,
} from './flowTypes';
import { GetMyCourseSuccessType } from '../flowTypes';

type ActionType = GetMyCourseSuccessType;

const byId = (exams: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_MY_COURSE_SUCCESS: {
      const newExams = _.get(action, 'payload.exams', {});
      return merge({}, exams, newExams);
    }

    default:
      return exams;
  }
};

export default combineReducers({
  byId,
  ...createHelpReducers(
    [
      GET_MY_COURSE,
    ],
    'exams',
  ),
});
