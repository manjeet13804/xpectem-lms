// @flow
import { Action, Reducer } from 'redux';
import {
  START,
  FAIL,
} from 'redux/@utils/actionSuffixes';

export type ErrorType = {
    message: string,
    meta?: object
};

const initialState = {
  message: null,
  meta: null,
};

export default (requests: Array<string>): Reducer<ErrorType> => (
  error: ErrorType = initialState, action: Action,
): ErrorType => {
  const { type, payload } = action;
  const matches = new RegExp(`(.*)_(${START}|${FAIL})`).exec(type);

  if (!matches) return error;

  const [, request, state] = matches;

  if (requests.indexOf(request) === -1) return error;

  return state === FAIL
    ? {
      message: typeof payload === 'object'
        ? payload.message
        : payload,
      meta: payload && payload.meta,
    }
    : initialState;
};
