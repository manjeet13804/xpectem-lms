// @flow

type TopicType = {
    id: number,
    name: string,
    version: string,
    isCompleted: boolean,
    lessons: Array<number>,
    assignments: Array<number>,
    exams: Array<number>,
    course: number
};

export {
  // eslint-disable-next-line import/prefer-default-export
  TopicType,
};
