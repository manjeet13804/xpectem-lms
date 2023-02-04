// @flow
import fp from 'lodash/fp';
import { createSelector } from 'reselect';
import { AssignmentType } from 'models';
import { StateType } from './flowTypes';

const getAssignmentsRoot = fp.get('myCourses.assignments');

const getAssignmentsIdsProp = (
  _: object,
  { assignments }: object,
): Array<number> => assignments;

const getAssignmentIds = createSelector(
  [getAssignmentsRoot],
  fp.get('ids'),
);

const getAssignments = createSelector(
  [getAssignmentsRoot],
  fp.get('byId'),
);

const getAssignmentsAsArray = createSelector(
  [getAssignments],
  (assignments: StateType): Array<AssignmentType> => Object.values(assignments),
);

const getAssignmentsById = createSelector(
  [getAssignmentsAsArray, getAssignmentsIdsProp],
  (
    assignments: Array<AssignmentType>,
    ids: Array<number>,
  ): AssignmentType[] => assignments.filter(
    ({id}: AssignmentType): boolean => ids.includes(id),
  ),
);

export {
  getAssignmentIds,
  getAssignments,
  getAssignmentsAsArray,
  getAssignmentsById,
};
