// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { LessonType } from 'models';
import { StateType } from './flowTypes';

const getLessonsRoot = fp.get('myCourses.lessons');

const getLessonIdsProp = (
  _: object,
  { lessons }: object,
): Array<number> => lessons;

const getLessonIds = createSelector(
  [getLessonsRoot],
  fp.get('ids'),
);

const getLessons = createSelector(
  [getLessonsRoot],
  fp.get('byId'),
);

const getLessonsAsArray = createSelector(
  [getLessons],
  (lessons: StateType): Array<LessonType> => Object.values(lessons),
);

const getLessonsById = createSelector(
  [getLessonsAsArray, getLessonIdsProp],
  (
    lessons: LessonType[],
    ids: Array<number>,
  ): LessonType[] => lessons.filter(
    ({ id }: LessonType): boolean => ids.includes(id),
  ),
);

export {
  getLessonIds,
  getLessons,
  getLessonsById,
};
