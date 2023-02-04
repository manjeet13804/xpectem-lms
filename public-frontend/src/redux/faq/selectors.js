// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import {
  FaqSectionType,
  FaqType,
  FaqIdentifiersType,
  FaqTopicType,
  FaqTopicFullType,
  FaqQuestionType,
} from 'models';

import { getTopics } from './topics/selectors';
import { getQuestions } from './questions/selectors';

import {
  compareFaqs,
} from './utils';

const getFaqRoot = fp.get('faq.faq');

const getFaqSection = (
  _: object,
  { section }: FaqIdentifiersType,
): FaqSectionType => section;

const getFaqCourseId = (
  _: object,
  { courseId }: FaqIdentifiersType,
): number => courseId;

const getFaqs = createSelector(
  [getFaqRoot],
  fp.get('data'),
);

const getFaq = createSelector(
  [getFaqs, getFaqSection, getFaqCourseId],
  (
    faqs: FaqType[],
    section: FaqSectionType,
    courseId: string,
  ): FaqType => faqs.find(
    (faq: FaqType): boolean => compareFaqs(
      faq,
      { section, courseId },
    ),
  ),
);

const getTopicsForFaq = createSelector(
  [getFaq, getTopics, getQuestions],
  (
    {
      topics: topicIds = [],
    }: FaqType = {},
    topics: FaqTopicType[] = [],
    questions: FaqQuestionType[],
  ): FaqTopicFullType[] => (
    topics
      .filter(
        ({ id }: FaqTopicType): boolean => topicIds.includes(id),
      )
      .map(
        (
          {
            questions: questionIds = [],
            ...topic
          }: FaqTopicType,
        ): FaqTopicType => ({
          ...topic,
          questions: questions.filter(
            ({ id }: FaqQuestionType): boolean => questionIds.includes(id),
          ),
        }),
      )
  ),
);

const getQuestionsIsLoading = state => state.faq.faq.isLoading;


export {
  getTopicsForFaq,
  getQuestionsIsLoading,
};
