// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';

const getQuestionRoot = fp.get('faq.questions');

const getQuestions = createSelector(
  [getQuestionRoot],
  fp.get('data'),
);

export {
  // eslint-disable-next-line import/prefer-default-export
  getQuestions,
};
