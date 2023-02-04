import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getStudentsSelector = ({ students }) => students;

const getSearchLmsGroupsStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('searchLmsGroupsData'),
);

const getSearchOrgStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('searchOrgData'),
);

const getSearchGroupStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('searchGroupsData'),
);

const getCurrentLmsGroupIdStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentLmsGroupId'),
);

const getCurrentNameLmsGroupStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentNameLmsGroup'),
);

const getCurrentOrgIdStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentOrgId'),
);

const getCurrentOrgNameStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentNameOrg'),
);

const getCurrentGroupIdStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentGroupId'),
);

const getChosenCoursesStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('chosenCourses'),
);

const getSearchCoursesFp = createSelector(
  getStudentsSelector,
  fp.get('searchCoursesData'),
);

const getCurrentStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('currentStudents'),
);

const getStatusImportFileStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('isImportFile'),
);

const getErrorImportStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('errorImport'),
);

const getSearchStudentsDataFp = createSelector(
  getStudentsSelector,
  fp.get('searchStudentsData'),
);

const getCurrentStudentIdFp = createSelector(
  getStudentsSelector,
  fp.get('currentStudentId'),
);

const getChosenGroupsFp = createSelector(
  getStudentsSelector,
  fp.get('chosenGroup'),
);

const getEditStatusStudentFp = createSelector(
  getStudentsSelector,
  fp.get('isEditStudent'),
);

const getResetPasswordStatusStudentFp = createSelector(
  getStudentsSelector,
  fp.get('isPasswordResetStudent'),
);

const getAddedStatusStudentFp = createSelector(
  getStudentsSelector,
  fp.get('isAddedStudents'),
);

const getCurrentNavTitleFp = createSelector(
  getStudentsSelector,
  fp.get('isCurrentNav'),
);

const getNoteStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('note'),
);

const getNoteValueStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('noteValue'),
);

const getCurrentDetailCourseIdFp = createSelector(
  getStudentsSelector,
  fp.get('currentDetailCourseId'),
);

const getCourseContentStudentsFp = createSelector(
  getStudentsSelector,
  fp.get('courseContent'),
);

const getCertificationFp = createSelector(
  getStudentsSelector,
  fp.get('certification'),
);

const getQuestionsAndAnswersFp = createSelector(
  getStudentsSelector,
  fp.get('questionsAndAnswers'),
);

const getCurrentQuestionIdFp = createSelector(
  getStudentsSelector,
  fp.get('currentQuestionId'),
);

const getCurrentTopicIdFp = createSelector(
  getStudentsSelector,
  fp.get('currentTopicId'),
);

const getTopicsQAFp = createSelector(
  getStudentsSelector,
  fp.get('topicsQA'),
);

const getStatusAddNewQA = createSelector(
  getStudentsSelector,
  fp.get('addNewQA'),
);

const getDialogsCommunicationFp = createSelector(
  getStudentsSelector,
  fp.get('dialogs'),
);

const getSearchAdminsCommunicationFp = createSelector(
  getStudentsSelector,
  fp.get('searchAdmins'),
);

const getCertificationLogsFp = createSelector(
  getStudentsSelector,
  fp.get('certificationExamLogs'),
);

const getRegistrationLinksFp = createSelector(
  getStudentsSelector,
  fp.get('registrationLinks'),
);

const getLoadingDeleteRegistrationLinks = createSelector(
  getStudentsSelector,
  fp.get('loadingDeleteRegistrationLinks'),
);

const getLoadingUpadateRegistrationLinks = createSelector(
  getStudentsSelector,
  fp.get('loadingUpadateRegistrationLinks'),
);

const getRegSelectedGroups = createSelector(
  getStudentsSelector,
  fp.get('regSelectedGroups'),
);

const getRegSelectedCourses = createSelector(
  getStudentsSelector,
  fp.get('regSelectedCourses'),
);

const getRegIsActive = createSelector(
  getStudentsSelector,
  fp.get('regIsActive'),
);

const getRegLinkTab = createSelector(
  getStudentsSelector,
  fp.get('regLinkTab'),
);

const getSearchMessageValue = createSelector(
  getStudentsSelector,
  fp.get('searchMessageValue'),
);

export {
  getSearchLmsGroupsStudentsFp,
  getSearchOrgStudentsFp,
  getSearchGroupStudentsFp,
  getCurrentLmsGroupIdStudentsFp,
  getCurrentOrgIdStudentsFp,
  getCurrentGroupIdStudentsFp,
  getCurrentNameLmsGroupStudentsFp,
  getCurrentOrgNameStudentsFp,
  getChosenCoursesStudentsFp,
  getSearchCoursesFp,
  getCurrentStudentsFp,
  getStatusImportFileStudentsFp,
  getErrorImportStudentsFp,
  getCurrentStudentIdFp,
  getSearchStudentsDataFp,
  getChosenGroupsFp,
  getEditStatusStudentFp,
  getAddedStatusStudentFp,
  getCurrentNavTitleFp,
  getNoteStudentsFp,
  getNoteValueStudentsFp,
  getCurrentDetailCourseIdFp,
  getCourseContentStudentsFp,
  getCertificationFp,
  getQuestionsAndAnswersFp,
  getCurrentQuestionIdFp,
  getCurrentTopicIdFp,
  getTopicsQAFp,
  getStatusAddNewQA,
  getDialogsCommunicationFp,
  getSearchAdminsCommunicationFp,
  getCertificationLogsFp,
  getResetPasswordStatusStudentFp,
  getRegistrationLinksFp,
  getLoadingDeleteRegistrationLinks,
  getLoadingUpadateRegistrationLinks,
  getRegSelectedGroups,
  getRegSelectedCourses,
  getRegIsActive,
  getRegLinkTab,
  getSearchMessageValue,
};
