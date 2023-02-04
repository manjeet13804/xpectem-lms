// @flow
import { NotificationType } from 'models';
import {
  GET_NOTIFICATIONS,
  REMOVE_NOTIFICATION,
  ADD_NOTIFICATION,
} from './types';
import {
  GetNotificationsType,
  RemoveNotificationType,
} from './flowTypes';

const getNotifications = (): GetNotificationsType => ({
  type: GET_NOTIFICATIONS,
});

const removeNotification = (notificationId: number): RemoveNotificationType => ({
  type: REMOVE_NOTIFICATION,
  payload: {
    notificationId,
  },
});

const addNotification = (notification: NotificationType): AddNotificationType => ({
  type: ADD_NOTIFICATION,
  payload: {
    notification,
  },
});


export {
  getNotifications,
  removeNotification,
  addNotification,
};
