// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { ExamType } from 'models';
import { StateType } from './flowTypes';

const getExamsRoot = fp.get('myCourses.exams');

const getExamsIdsProp = (
  _: object,
  { exams }: object,
): Array<number> => exams;

const getExamIds = createSelector(
  [getExamsRoot],
  fp.get('ids'),
);

const getExams = createSelector(
  [getExamsRoot],
  fp.get('byId'),
);

const getExamsById = createSelector(
  [getExams, getExamsIdsProp],
  (
    exams: StateType,
    ids: Array<number>,
  ): ExamType[] => Object
    .values(exams)
    .filter(
      ({ id }: ExamType): boolean => ids.includes(id),
    ),
);

export {
  getExamIds,
  getExams,
  getExamsById,
};
