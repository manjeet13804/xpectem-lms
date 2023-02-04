// @flow

import types from '../types';
import {
  StateType,
  SuccessType,
  StartType,
  FailType,
} from '../flowTypes';

const {
  GET_USERS_LIST_START,
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST_SUCCESS,
  USERS_LIST_DEFAULT,
} = types;


const INITIAL_STATE = {
  error: null,
  data: [],
  isLoading: false,
};

type ActionType =
    StartType |
    SuccessType |
    FailType;

export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case GET_USERS_LIST_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
      };
    }

    case GET_USERS_LIST_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case GET_USERS_LIST_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    case USERS_LIST_DEFAULT: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};
