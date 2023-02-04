import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getNotificationsSelector = ({ notifications }) => notifications;

const getListNotificationsFp = createSelector(
  getNotificationsSelector,
  fp.get('listNotifications'),
);

const getFoundListLMSGroupFp = createSelector(
  getNotificationsSelector,
  fp.get('foundListLMSGroup'),
);

const getFoundListStudentFp = createSelector(
  getNotificationsSelector,
  fp.get('foundListStudent'),
);

const getCurrentLMSGroupFp = createSelector(
  getNotificationsSelector,
  fp.get('currentLMSGroup'),
);

const getCurrentStudFp = createSelector(
  getNotificationsSelector,
  fp.get('currentStudent'),
);

export {
  getFoundListLMSGroupFp,
  getListNotificationsFp,
  getFoundListStudentFp,
  getCurrentLMSGroupFp,
  getCurrentStudFp,
};
