// @flow
import {
  FaqSectionType,
} from 'models';
import {
  GET_FAQ,
} from './types';
import {
  GetFaqType,
} from './flowTypes';

const getFaq = (
  section: FaqSectionType,
  courseId?: number,
): GetFaqType => ({
  type: GET_FAQ,
  payload: {
    section,
    courseId,
  },
});

export {
  // eslint-disable-next-line import/prefer-default-export
  getFaq,
};
