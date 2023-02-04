// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { TopicType } from 'models';
import { StateType } from './flowTypes';

const getTopicsRoot = fp.get('myCourses.topics');

const getTopicsIdsProp = (
  _: object,
  { topics }: object,
): Array<number> => topics;

const getTopicIds = createSelector(
  [getTopicsRoot],
  fp.get('ids'),
);

const getTopics = createSelector(
  [getTopicsRoot],
  fp.get('byId'),
);

const getTopicsAsArray = createSelector(
  [getTopics],
  (topics: StateType): Array<TopicType> => Object.values(topics),
);

const getTopicsById = createSelector(
  [getTopicsAsArray, getTopicsIdsProp],
  (
    topics: Array<TopicType>,
    ids: Array<number>,
  ): TopicType[] => topics.filter(
    ({ id }: TopicType): boolean => ids.includes(id),
  ),
);

export {
  getTopicIds,
  getTopics,
  getTopicsAsArray,
  getTopicsById,
};
