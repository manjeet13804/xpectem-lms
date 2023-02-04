import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getTutorsSelector = ({ tutors }) => tutors;

const getCurrentTutorFp = createSelector(
  getTutorsSelector,
  fp.get('currentTutor'),
);

const getTutorCreatedFp = createSelector(
  getTutorsSelector,
  fp.get('isTutorCreated'),
);

const getSearchCourseDataTutorsFp = createSelector(
  getTutorsSelector,
  fp.get('searchCourseData'),
);

const getSearchCourseDataTutorsEditFp = createSelector(
  getTutorsSelector,
  fp.get('searchCourseDataEdit'),
);

const getChosenCoursesTutorsFp = createSelector(
  getTutorsSelector,
  fp.get('chosenCourses'),
);

const getChosenCoursesEditTutorsFp = createSelector(
  getTutorsSelector,
  fp.get('chosenCoursesEdit'),
);

const getCurrentFindCourseTutorsFp = createSelector(
  getTutorsSelector,
  fp.get('currentFindCourse'),
);

const getSearchTutorDataFp = createSelector(
  getTutorsSelector,
  fp.get('searchTutorData'),
);

const getTutorId = createSelector(
  getTutorsSelector,
  fp.get('currentTutorId'),
);

const getTutorEdit = createSelector(
  getTutorsSelector,
  fp.get('isTutorEdit'),
);

const getErrorTutorEdit = createSelector(
  getTutorsSelector,
  fp.get('errorTutorEdit'),
);

export {
  getCurrentTutorFp,
  getTutorCreatedFp,
  getSearchCourseDataTutorsFp,
  getChosenCoursesTutorsFp,
  getCurrentFindCourseTutorsFp,
  getSearchTutorDataFp,
  getChosenCoursesEditTutorsFp,
  getSearchCourseDataTutorsEditFp,
  getTutorId,
  getTutorEdit,
  getErrorTutorEdit,
};
