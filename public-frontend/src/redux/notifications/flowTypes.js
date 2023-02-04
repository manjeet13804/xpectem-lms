// @flow
import { ByIdType, NotificationType } from 'models';
import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  REMOVE_NOTIFICATION,
  REMOVE_NOTIFICATION_START,
  REMOVE_NOTIFICATION_SUCCESS,
  REMOVE_NOTIFICATION_FAIL,
  ADD_NOTIFICATION,
} from './types';

type GetNotificationsType = {
    type: GET_NOTIFICATIONS
};

type GetNotificationsSuccessType = {
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: {
        notifications: ByIdType<NotificationType>
    }
};

type RemoveNotificationType = {
    type: REMOVE_NOTIFICATION,
    payload: {
        notificationId: number
    }
};

type RemoveNotificationSuccessType = {
    type: REMOVE_NOTIFICATION_SUCCESS,
    payload: {
        notificationId: number
    }
};

type AddNotificationType = {
    type: ADD_NOTIFICATION,
    payload: {
        notification: NotificationType
    }
};

type StartType = {
    type: GET_NOTIFICATIONS_START | REMOVE_NOTIFICATION_START
};

type SuccessType = GetNotificationsSuccessType | RemoveNotificationSuccessType;

type FailType = {
    type: GET_NOTIFICATIONS_FAIL | REMOVE_NOTIFICATION_FAIL,
    payload: string | null
};

type StateType = ByIdType<NotificationType>;

export {
  GetNotificationsType,
  RemoveNotificationType,
  StartType,
  SuccessType,
  FailType,
  StateType,
  AddNotificationType,
};
