// @flow
import { Action, Reducer } from 'redux';
import {
  START,
  SUCCESS,
  FAIL,
} from 'redux/@utils/actionSuffixes';

export default (requests: Array<string>): Reducer<boolean> => (
  isLoading: boolean = false,
  action: Action,
): boolean => {
  const { type } = action;
  const matches = new RegExp(`(.*)_(${START}|${SUCCESS}|${FAIL})`).exec(type);

  if (!matches) return isLoading;

  const [, request, state] = matches;

  if (requests.indexOf(request) === -1) return isLoading;

  return state === START;
};
