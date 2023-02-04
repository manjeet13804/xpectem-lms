// @flow
import {
  FaqSectionType,
} from 'models';
import {
  SEARCH_FAQ,
} from './types';
import {
  SearchFaqType,
} from './flowTypes';

const searchFaq = (
  query: string,
  section: FaqSectionType,
  courseId?: number,
): SearchFaqType => ({
  type: SEARCH_FAQ,
  payload: {
    query,
    section,
    courseId,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  searchFaq,
};
