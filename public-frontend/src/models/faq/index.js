// @flow
const FaqSections = {
  general: 'GENERAL',
  course: 'COURSE',
};

type FaqSectionType = $Keys<typeof FaqSections>;

type FaqQuestionType = {
    id: number,
    question: string,
    answer: string
};

type FaqTopicType = {
    id: number,
    title: string,
    // List of FaqTopicType ids
    questions: number[]
};

type FaqTopicFullType = {
    id: number,
    title: string,
    questions: FaqQuestionType[]
};

type FaqType = {
    courseId?: number,
    // List of FaqTopicType ids
    topics: number[],
    section: FaqSectionType
};

type FaqFullType = {
    courseId?: number,
    topics: FaqTopicFullType[],
    section: FaqSectionType
};

type FaqIdentifiersType = {
    section: FaqSectionType,
    courseId: number
};

export {
  FaqSections,
  FaqSectionType,
  FaqType,
  FaqFullType,
  FaqIdentifiersType,
  FaqTopicType,
  FaqTopicFullType,
  FaqQuestionType,
};
