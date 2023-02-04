
import io from 'socket.io-client';
import { WS_BASE_URL } from './config';

const socketInitObject = {
  /* eslint-disable */
    on: () => console.log('sockets are not connected'),
    emit: () => console.log('sockets are not connected'),
    /* eslint-enable */
};

let socket = socketInitObject;

const socketInit = () => {
  if (socket === socketInitObject) {
    socket = io(WS_BASE_URL);
  }
};

const socketClose = () => {
  if (socket.close) {
    socket.close();
  }

  socket = socketInitObject;
};

/* eslint-disable flowtype/no-weak-types */
const getSocket = (): Object => socket;
/* eslint-enable flowtype/no-weak-types */

export { socketInit, getSocket, socketClose };
