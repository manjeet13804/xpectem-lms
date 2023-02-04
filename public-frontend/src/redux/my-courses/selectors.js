// @flow
import fp from 'lodash/fp';
import isEmpty from 'lodash/isEmpty';
import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';
import {
  ByIdType,
  MyCourseIdentifiersType,
  MyCourseType,
  MyCourseFullType,
  MyCoursesFullByGroupType,
  GroupType,
} from 'models';
import { coursesByGroup } from './schema';
import { getGroups } from '../groups/selectors';
import { getMyGroupIds } from '../userProfile/selectors';

const getMyCoursesRoot = fp.get('myCourses');

const getMyCoursesIds = createSelector(
  [getMyCoursesRoot],
  fp.get('ids'),
);

const getCurrentCourseId = createSelector(
  [getMyCoursesRoot],
  fp.get('currentId'),
);

const getMyCourses = createSelector(
  [getMyCoursesRoot],
  fp.get('byId'),
);

const getMyCoursesAsArray = createSelector(
  [getMyCourses],
  (
    courses: ByIdType<MyCourseType>,
  ): MyCourseType[] => Object.values(courses),
);

const getMyCoursesByGroup = createSelector(
  [
    getMyGroupIds,
    getMyCourses,
    getGroups,
  ],
  (
    ids: number[],
    courses: ByIdType<MyCourseType>,
    groups: ByIdType<GroupType>,
  ): MyCoursesFullByGroupType[] => (
    !isEmpty(groups)
      ? denormalize(
      ids,
      [coursesByGroup],
      {
        courses,
        groups,
        topics: {},
        lessons: {},
        assignments: {},
        exams: {},
      },
      )
      : []
  ),
);

const getMyCoursesIsLoading = createSelector(
  [getMyCoursesRoot],
  fp.get('isLoading'),
);

const getMyCoursesError = createSelector(
  [getMyCoursesRoot],
  fp.get('error'),
);

const getMyCourseId = (
  _: object,
  { id }: MyCourseIdentifiersType,
): number => id;

const getCurrentMyCourse = createSelector(
  [getMyCourses, getMyCourseId],
  (courses: MyCourseType[], courseId: number): MyCourseFullType => courses[courseId],
);

export {
  getMyCourses,
  getMyCoursesAsArray,
  getMyCoursesIds,
  getMyCoursesByGroup,
  getMyCoursesIsLoading,
  getMyCoursesError,
  getCurrentMyCourse,
  getCurrentCourseId,
};
