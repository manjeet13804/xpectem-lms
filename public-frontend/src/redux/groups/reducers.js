// @flow
import merge from 'lodash/merge';
import union from 'lodash/union';
import immutable from 'object-path-immutable';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import { GroupType } from 'models';
import type {
  StartType,
  FailType,
  SuccessType,
  StateType,
  AddGroupType,
  RenameGroupType,
  DeleteGroupType,
} from './flowTypes';
import { GetMyCoursesSuccessType } from '../my-courses/flowTypes';
import {
  GET_GROUPS,
  GET_GROUPS_SUCCESS,
  DELETE_GROUP,
  RENAME_GROUP,
} from './types';
import { GET_MY_COURSES_SUCCESS } from '../my-courses/types';

type ActionType = FailType
    | SuccessType
    | StartType
    | AddGroupType
    | RenameGroupType
    | DeleteGroupType
    | GetMyCoursesSuccessType;

const byId = (groups: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
    case GET_MY_COURSES_SUCCESS: {
      return merge({}, groups, action.payload.groups);
    }

    case DELETE_GROUP: {
      return immutable.del(
        groups,
        action.payload.id,
      );
    }

    case RENAME_GROUP: {
      return immutable.update(
        groups,
        action.payload.id,
        (group: GroupType): GroupType => ({
          ...group,
          name: action.payload.name,
        }),
      );
    }

    default:
      return groups;
  }
};

const ids = (allIds: number[] = [], action: ActionType): number[] => {
  switch (action.type) {
    case GET_GROUPS_SUCCESS:
    case GET_MY_COURSES_SUCCESS: {
      return union(
        allIds,
        Object.keys(action.payload.groups)
          .map(Number),
      );
    }

    case DELETE_GROUP: {
      return allIds.filter(
        (id: number): boolean => id !== action.payload.id,
      );
    }

    default:
      return allIds;
  }
};

export default combineReducers({
  byId,
  ids,
  ...createHelpReducers(
    [
      GET_GROUPS,
    ],
  ),
});
