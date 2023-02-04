// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';

const getTopicRoot = fp.get('faq.topics');

const getTopics = createSelector(
  [getTopicRoot],
  fp.get('data'),
);

export {
  // eslint-disable-next-line import/prefer-default-export
  getTopics,
};
