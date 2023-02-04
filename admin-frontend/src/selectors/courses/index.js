import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getCoursesSelector = ({ courses }) => courses;

const getCurrentCourseFp = createSelector(
  getCoursesSelector,
  fp.get('currentCourse'),
);

const getFilteredCertificatesFp = createSelector(
  getCoursesSelector,
  fp.get('filteredCertificates'),
);

const getSearchTutorsDataFp = createSelector(
  getCoursesSelector,
  fp.get('searchTutorsData'),
);

const getSearchHeaderDataFp = createSelector(
  getCoursesSelector,
  fp.get('searchHeaderData'),
);

const getCurrentCertIdFp = createSelector(
  getCoursesSelector,
  fp.get('currentCertId'),
);

const getCurrentTutorIdFp = createSelector(
  getCoursesSelector,
  fp.get('currentTutorId'),
);

const getCurrentHeaderFp = createSelector(
  getCoursesSelector,
  fp.get('currentHeader'),
);

const getSearchFilesByHeaderDataFp = createSelector(
  getCoursesSelector,
  fp.get('searchFilesByHeaderData'),
);

const getSearchFilesByNameDataFp = createSelector(
  getCoursesSelector,
  fp.get('searchFilesByNameData'),
);

const getCurrentFileIdFp = createSelector(
  getCoursesSelector,
  fp.get('currentFileId'),
);

const getAttachedFilesFp = createSelector(
  getCoursesSelector,
  fp.get('attachedFiles'),
);

const getHeaderNameFp = createSelector(
  getCoursesSelector,
  fp.get('getHeaderNameFp'),
);

const getFileNameFp = createSelector(
  getCoursesSelector,
  fp.get('fileName'),
);

const getUploadedFilesFp = createSelector(
  getCoursesSelector,
  fp.get('uploadedFiles'),
);

const getAttachedTutorsFp = createSelector(
  getCoursesSelector,
  fp.get('attachedTutors'),
);

const getAttachedUploadFilesFp = createSelector(
  getCoursesSelector,
  fp.get('attachedUploadFiles'),
);

const getCertificateTemplateFp = createSelector(
  getCoursesSelector,
  fp.get('certificateTemplate'),
);

const getWelcomeEmailTemplateFp = createSelector(
  getCoursesSelector,
  fp.get('welcomeEmailTemplate'),
);

const getWelcomeLetterTemplateFp = createSelector(
  getCoursesSelector,
  fp.get('welcomeLetterTemplate'),
);

const getSearchLmsGroupCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('searchLmsGroupData'),
);

const getSearchOrgCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('searchOrgData'),
);

const getSearchGroupCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('searchGroupData'),
);

const getCurrentLmsGroupCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('currentLmsGroup'),
);

const getCurrentOrgCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('currentOrg'),
);

const getCurrentGroupCoursesFp = createSelector(
  getCoursesSelector,
  fp.get('currentGroup'),
);

const getSearchCourseDataFp = createSelector(
  getCoursesSelector,
  fp.get('searchCourseData'),
);

const getCurrentFindCourseFp = createSelector(
  getCoursesSelector,
  fp.get('currentFindCourse'),
);

const getStatusCourseCreatedFp = createSelector(
  getCoursesSelector,
  fp.get('isCourseCreated'),
);

const getErrorCourseCreatedFp = createSelector(
  getCoursesSelector,
  fp.get('errorCourseCreated'),
);

const getSearchTopicsFp = createSelector(
  getCoursesSelector,
  fp.get('searchTopicData'),
);

const getTopicErrorFp = createSelector(
  getCoursesSelector,
  fp.get('topicError'),
);

const getselectedExistsTopicFp = createSelector(
  getCoursesSelector,
  fp.get('selectedExistsTopics'),
);

const getselectedNewTopicFp = createSelector(
  getCoursesSelector,
  fp.get('selectedNewTopics'),
);

const getCurrentTopicFp = createSelector(
  getCoursesSelector,
  fp.get('currentTopic'),
);

const getSearchLessonsFp = createSelector(
  getCoursesSelector,
  fp.get('searchLessonData'),
);

const getCurrentLessonFp = createSelector(
  getCoursesSelector,
  fp.get('currentLesson'),
);

const getSelectedLessonsFp = createSelector(
  getCoursesSelector,
  fp.get('selectedLessons'),
);

const getSearchExamsFp = createSelector(
  getCoursesSelector,
  fp.get('searchExamData'),
);

const getSelectedExamsFp = createSelector(
  getCoursesSelector,
  fp.get('selectedExams'),
);

const getCurrentSelectedExamFp = createSelector(
  getCoursesSelector,
  fp.get('currentExam'),
);

const getSearchAssignmentFp = createSelector(
  getCoursesSelector,
  fp.get('searchAssignmentData'),
);

const getSelectedAssignmentsFp = createSelector(
  getCoursesSelector,
  fp.get('selectedAssignments'),
);

const getCurrentAssignmentFp = createSelector(
  getCoursesSelector,
  fp.get('currentAssignment'),
);

const getCurrentTopicObjectFp = createSelector(
  getCoursesSelector,
  fp.get('currentTopicObject'),
);

const getStatusSetInitialPropsFp = createSelector(
  getCoursesSelector,
  fp.get('isSetInitialProps'),
);

export {
  getCurrentCourseFp,
  getFilteredCertificatesFp,
  getSearchTutorsDataFp,
  getSearchHeaderDataFp,
  getCurrentCertIdFp,
  getCurrentTutorIdFp,
  getCurrentHeaderFp,
  getSearchFilesByHeaderDataFp,
  getSearchFilesByNameDataFp,
  getCurrentFileIdFp,
  getAttachedFilesFp,
  getHeaderNameFp,
  getFileNameFp,
  getUploadedFilesFp,
  getAttachedTutorsFp,
  getAttachedUploadFilesFp,
  getCertificateTemplateFp,
  getWelcomeEmailTemplateFp,
  getWelcomeLetterTemplateFp,
  getSearchLmsGroupCoursesFp,
  getSearchOrgCoursesFp,
  getSearchGroupCoursesFp,
  getCurrentLmsGroupCoursesFp,
  getCurrentOrgCoursesFp,
  getCurrentGroupCoursesFp,
  getSearchCourseDataFp,
  getCurrentFindCourseFp,
  getStatusCourseCreatedFp,
  getErrorCourseCreatedFp,
  getSearchTopicsFp,
  getTopicErrorFp,
  getselectedExistsTopicFp,
  getselectedNewTopicFp,
  getCurrentTopicFp,
  getSearchLessonsFp,
  getCurrentLessonFp,
  getSearchExamsFp,
  getCurrentSelectedExamFp,
  getSelectedExamsFp,
  getSearchAssignmentFp,
  getSelectedAssignmentsFp,
  getCurrentAssignmentFp,
  getSelectedLessonsFp,
  getCurrentTopicObjectFp,
  getStatusSetInitialPropsFp,
};
