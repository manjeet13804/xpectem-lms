// @flow

type ExamType = {
    id: number,
    name: string,
    description: string | null,
    maxTries: number,
    gradeA: number,
    gradeB: number,
    gradeC: number,
    maxPoints: number,
    timeToComplete: number,
    isCompleted: boolean,
    completedAt: Date | null
};

export {
  // eslint-disable-next-line import/prefer-default-export
  ExamType,
};
