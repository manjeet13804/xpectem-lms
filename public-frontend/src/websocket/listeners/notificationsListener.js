// @flow
import { addNotification } from 'redux/notifications/actions';
import { storeLink } from 'index';
import { getSocket } from 'websocket';
import { NotificationType } from 'models';
import { NOTIFICATIONS_EVENT } from '../types';

export default {
  subscribe: () => {
    getSocket().on(NOTIFICATIONS_EVENT, (data: NotificationType): void => {
      storeLink.dispatch(addNotification(data));

      return null;
    });
  },

  unsubscribe: () => {
    if (getSocket().removeListener) {
      getSocket().removeListener(NOTIFICATIONS_EVENT);
    }
  },
};
