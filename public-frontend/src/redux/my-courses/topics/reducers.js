// @flow
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import _ from 'lodash';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import { GET_MY_COURSE, GET_MY_COURSE_SUCCESS } from '../types';
import {
  StateType,
} from './flowTypes';
import { GetMyCourseSuccessType } from '../flowTypes';

type ActionType = GetMyCourseSuccessType;

const byId = (topics: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_MY_COURSE_SUCCESS: {
      const newTopics = _.get(action, 'payload.topics', {});
      return merge({}, topics, newTopics);
    }

    default:
      return topics;
  }
};

export default combineReducers({
  byId,
  ...createHelpReducers(
    [
      GET_MY_COURSE,
    ],
    'topics',
  ),
});
