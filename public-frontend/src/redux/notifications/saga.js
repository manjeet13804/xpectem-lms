// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  NOTIFICATION,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
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
} from './types';
import { RemoveNotificationType } from './flowTypes';

function* getNotifications(): Saga<void> {
  try {
    yield put({ type: GET_NOTIFICATIONS_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${NOTIFICATION}`,
      isToken: true,
    });

    const notifications = data.reduce(
      (
        byId: ByIdType<NotificationType>,
        notification: NotificationType,
      ): ByIdType<NotificationType> => ({
        ...byId,
        [notification.id]: notification,
      }),
      {},
    );

    yield put({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications,
      },
    });
  } catch (error) {
    yield put({
      type: GET_NOTIFICATIONS_FAIL,
      payload: getError(error),
    });
  }
}

function* removeNotification(
  {
    payload: {
      notificationId,
    },
  }: RemoveNotificationType,
): Saga<void> {
  try {
    yield put({ type: REMOVE_NOTIFICATION_START });

    yield apiCall({
      type: 'DELETE',
      url: `${NOTIFICATION}/${notificationId}`,
      isToken: true,
    });

    yield put({
      type: REMOVE_NOTIFICATION_SUCCESS,
      payload: {
        notificationId,
      },
    });
  } catch (error) {
    yield put({
      type: REMOVE_NOTIFICATION_FAIL,
      payload: getError(error),
    });
  }
}

function* notificationsSaga(): Saga<void> {
  yield all([
    takeLatest(GET_NOTIFICATIONS, getNotifications),
    takeLatest(REMOVE_NOTIFICATION, removeNotification),
  ]);
}

export default notificationsSaga;
