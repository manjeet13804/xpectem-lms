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
import { FetchMyCertificatesSuccessType } from '../my-certificates/flowTypes';
import {
  GET_MY_COURSE,
  GET_MY_COURSE_START,
  GET_MY_COURSE_SUCCESS,
  GET_MY_COURSES,
  GET_MY_COURSES_START,
  GET_MY_COURSES_SUCCESS,
} from './types';
import {
  FETCH_MY_CERTIFICATES,
  FETCH_MY_CERTIFICATES_SUCCESS,
} from '../my-certificates/types';

import certifications from './certifications/reducers';
import topics from './topics/reducers';
import lessons from './lessons/reducers';
import assignments from './assignments/reducers';
import exams from './exams/reducers';

type ActionType = StartType
  | FailType
  | SuccessType
  | FetchMyCertificatesSuccessType;

const byId = (courses: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_MY_COURSE_SUCCESS:
    case GET_MY_COURSES_SUCCESS:
    case FETCH_MY_CERTIFICATES_SUCCESS: {
      return merge({}, courses, action.payload.courses);
    }

    default:
      return courses;
  }
};

const currentId = (
  id: number | null = null,
  action: ActionType,
): StateType => {
  switch (action.type) {
    case GET_MY_COURSE_START:
    case GET_MY_COURSES_START: {
      return null;
    }

    case GET_MY_COURSE_SUCCESS: {
      return action.payload.courseId;
    }

    default:
      return id;
  }
};

export default combineReducers({
  byId,
  currentId,
  ...createHelpReducers(
    [
      GET_MY_COURSE,
      GET_MY_COURSES,
      FETCH_MY_CERTIFICATES,
    ],
    'courses',
  ),
  certifications,
  topics,
  lessons,
  assignments,
  exams,
});
