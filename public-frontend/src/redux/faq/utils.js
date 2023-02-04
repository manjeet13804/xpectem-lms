// @flow

import merge from 'lodash/merge';
import { FaqSections, FaqType } from 'models';

const compareFaqs = (a: FaqType, b: FaqType): boolean => {
  const isFaqsSameSection = a.section === b.section;

  const isFaqsSameCourseId = (
    a.section !== FaqSections.course
        && b.section !== FaqSections.course
  ) || a.courseId === b.courseId;

  return isFaqsSameSection && isFaqsSameCourseId;
};

const updateOrCreateFaq = (data: FaqType[], newFaq: FaqType): FaqType[] => {
  const sameFaqIndex = data.findIndex(
    (faq: FaqType): boolean => compareFaqs(faq, newFaq),
  );

  return sameFaqIndex > -1
    ? data.map(
      (
        faq: FaqType,
        index: number,
      ): FaqType => (
        sameFaqIndex === index
          ? merge(faq, newFaq)
          : faq
      ),
    )
    : [
      ...data,
      newFaq,
    ];
};

export {
  compareFaqs,
  updateOrCreateFaq,
};
