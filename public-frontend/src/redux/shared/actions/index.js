// @flow
import { APP_CAN_RENDER, SEND_SUPPORT_MESSAGE_REQUEST } from '../types';
import type ActionAppCanRenderType from '../flowTypes';

const actionAppCanRender = (): ActionAppCanRenderType => (
  {
    type: APP_CAN_RENDER,
  }
);

const actionSendMessageToSupport = (body, cb): ActionAppCanRenderType => ({
  type: SEND_SUPPORT_MESSAGE_REQUEST,
  payload: { body, cb },
});

export {
  actionAppCanRender,
  actionSendMessageToSupport,
};
