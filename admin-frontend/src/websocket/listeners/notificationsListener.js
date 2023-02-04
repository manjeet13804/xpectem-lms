import { getSocket } from 'websocket';
import { NOTIFICATIONS_EVENT } from '../types';
import { storeLink } from '../../containers/App/App';

export default {
  subscribe: () => {
    getSocket().on(NOTIFICATIONS_EVENT, (data: any): void => {
      storeLink(data);

      return null;
    });
  },

  unsubscribe: () => {
    if (getSocket().removeListener) {
      getSocket().removeListener(NOTIFICATIONS_EVENT);
    }
  },
};
