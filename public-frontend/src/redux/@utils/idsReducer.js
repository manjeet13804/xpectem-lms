// @flow
import union from 'lodash/union';
import { Action, Reducer } from 'redux';
import { SUCCESS } from './actionSuffixes';

export default (
  requests: Array<string>,
  entitiesKey: string,
): Reducer<Array<number>> => (
  ids: Array<number> = [], action: Action,
): Array<number> => {
  const { type, payload } = action;
  const matches = new RegExp(`(.*)_(${SUCCESS})`).exec(type);

  if (!matches) return ids;

  const [, request] = matches;

  if (requests.indexOf(request) === -1) return ids;

  return union(
    ids,
    Object.keys(payload[entitiesKey])
      .map(Number),
  );
};
