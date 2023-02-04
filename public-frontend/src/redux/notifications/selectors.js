// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { ByIdType, NotificationType } from 'models';

const getNotificationsRoot = fp.get('notifications');

const getNotificationIds = createSelector(
  [getNotificationsRoot],
  fp.get('ids'),
);

const getNotifications = createSelector(
  [getNotificationsRoot],
  fp.get('byId'),
);

const getNotificationsAsArray = createSelector(
  [getNotifications],
  (
    notifications: ByIdType<NotificationType>,
  ): NotificationType[] => Object.values(notifications),
);

export {
  getNotificationIds,
  getNotifications,
  getNotificationsAsArray,
};
