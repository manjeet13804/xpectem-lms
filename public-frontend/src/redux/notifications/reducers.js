// @flow
import merge from 'lodash/merge';
import immutable from 'object-path-immutable';
import { combineReducers } from 'redux';
import createHelpReducers from 'redux/@utils/createHelpReducers';
import union from 'lodash/union';
import {
  StateType,
  SuccessType,
} from './flowTypes';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION,
} from './types';

type ActionType = SuccessType;

const byId = (notifications: StateType = {}, action: ActionType): StateType => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS: {
      return merge({}, notifications, action.payload.notifications);
    }

    case REMOVE_NOTIFICATION_SUCCESS: {
      return immutable.del(
        notifications,
        action.payload.notificationId,
      );
    }

    case ADD_NOTIFICATION: {
      const { id } = action.payload.notification;
      const withId = {
        [id]: action.payload.notification,
      };
      return merge({}, notifications, withId);
    }

    default:
      return notifications;
  }
};

const ids = (allIds: number[] = [], action: ActionType): number[] => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS: {
      return union(
        allIds,
        Object.keys(action.payload.notifications)
          .map(Number),
      );
    }

    case REMOVE_NOTIFICATION_SUCCESS: {
      return allIds.filter(
        (id: number): boolean => id !== action.payload.notificationId,
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
      GET_NOTIFICATIONS,
      REMOVE_NOTIFICATION,
    ],
  ),
});
