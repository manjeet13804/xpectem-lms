// @flow

import types from '../types';

const {
  ASYNC_START,
  ASYNC_SUCCESS,
  ASYNC_FAIL,
  ASYNC_DEFAULT,
} = types;

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  success: false,
  path: '',
};


type StateType = {
  error: string,
  isLoading: boolean,
  success: boolean,
  path: string
};

type AuthStartActionType = { type: ASYNC_START, payload: mixed };
type AuthSuccessActionType = { type: ASYNC_SUCCESS, payload: mixed };
type AuthFailActionType = { type: ASYNC_FAIL, payload: mixed };
type AuthDefaultType = { type: ASYNC_DEFAULT, payload: mixed };


type ActionType =
  AuthStartActionType |
  AuthSuccessActionType |
  AuthFailActionType |
  AuthDefaultType;

export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case ASYNC_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case ASYNC_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
        path: payload,
      };
    }

    case ASYNC_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: payload || true,
      };
    }

    case ASYNC_DEFAULT:
      return INITIAL_STATE;

    default:
      return state;
  }
};
