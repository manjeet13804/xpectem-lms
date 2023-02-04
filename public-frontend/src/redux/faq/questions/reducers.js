// @flow
import unionBy from 'lodash/unionBy';
import {
  StateType,
} from './flowTypes';
import {
  GetFaqSuccessType,
} from '../flowTypes';
import {
  SearchFaqSuccessType,
} from '../search/flowTypes';
import {
  GET_FAQ_SUCCESS,
} from '../types';
import {
  SEARCH_FAQ_SUCCESS,
} from '../search/types';

const INITIAL_STATE = {
  data: [],
};

type ActionType = GetFaqSuccessType | SearchFaqSuccessType;

export default (state: StateType = INITIAL_STATE, action: ActionType): StateType => {
  switch (action.type) {
    case GET_FAQ_SUCCESS:
    case SEARCH_FAQ_SUCCESS: {
      return {
        data: unionBy(
          state.data.concat(action.payload.questions),
          'id',
        ),
      };
    }

    default:
      return state;
  }
};
