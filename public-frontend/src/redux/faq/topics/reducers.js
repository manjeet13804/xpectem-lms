// @flow
import unionBy from 'lodash/unionBy';
import {
  StateType,
} from './flowTypes';

import {
  GetFaqSuccessType,
} from '../flowTypes';

import {
  GET_FAQ_SUCCESS,
} from '../types';

const INITIAL_STATE = {
  data: [],
};

type ActionType = GetFaqSuccessType;

export default (state: StateType = INITIAL_STATE, action: ActionType): StateType => {
  switch (action.type) {
    case GET_FAQ_SUCCESS: {
      return {
        data: unionBy(
          state.data.concat(action.payload.topics),
          'id',
        ),
      };
    }

    default:
      return state;
  }
};
