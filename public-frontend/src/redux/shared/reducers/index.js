// @flow
import { APP_CAN_RENDER } from '../types';
import type ActionAppCanRenderType from '../flowTypes.js';

type StateType = {
  appCanRender: boolean
};

const INITIAL_STATE = {
  appCanRender: false,
};

export default (state: StateType = INITIAL_STATE, {type}: ActionAppCanRenderType): StateType => {
  switch (type) {
    case APP_CAN_RENDER: {
      return {
        ...state,
        appCanRender: true,
      };
    }

    default:
      return state;
  }
};
