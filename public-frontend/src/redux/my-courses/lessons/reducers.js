// @flow
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import _ from 'lodash';
import { GET_MY_COURSE, GET_MY_COURSE_SUCCESS } from '../types';
import {
  StateType,
} from './flowTypes';
import { GetMyCourseSuccessType } from '../flowTypes';

type ActionType = GetMyCourseSuccessType;

const byId = (lessons: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_MY_COURSE_SUCCESS: {
      const newLessons = _.get(action, 'payload.lessons', {});
      return merge({}, lessons, newLessons);
    }

    default:
      return lessons;
  }
};

export default combineReducers({
  byId,
  ...createHelpReducers(
    [
      GET_MY_COURSE,
    ],
    'lessons',
  ),
});
