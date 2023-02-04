// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { FaqQuestionType } from 'models';
import { getQuestions } from '../questions/selectors';
import { StateType } from './flowTypes';

const getSearchRoot = fp.get('faq.search');

const getSearchQuestions = createSelector(
  [getSearchRoot, getQuestions],
  (
    {
      questions: questionIds,
    }: StateType,
    questions: FaqQuestionType[],
  ): FaqQuestionType[] => questions.filter(
    ({ id }: FaqQuestionType): boolean => questionIds.includes(id),
  ),
);

export {
  // eslint-disable-next-line import/prefer-default-export
  getSearchQuestions,
};
