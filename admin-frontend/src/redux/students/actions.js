import request from 'components/restApi';
import URLS from 'redux/urls';
import { errorMessage, downloadFile } from 'helpers/utility';
import { STUDENTS } from 'constants/routes';
import { store } from '../store';


const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SEARCH_LMS_GROUPS_STUDENTS: 'SEARCH_LMS_GROUPS_STUDENTS',
  SEARCH_ORG_STUDENTS: 'SEARCH_ORG_STUDENTS',
  SEARCH_GROUPS_STUDENTS: 'SEARCH_GROUPS_STUDENTS',
  SEARCH_COURSES_STUDENTS: 'SEARCH_COURSES_STUDENTS',
  SEARCH_STUDENTS_STUDENTS: 'SEARCH_STUDENTS_STUDENTS',
  SET_INITIAL_PROPS_STUDENTS: 'SET_INITIAL_PROPS_STUDENTS',
  SET_CURRENT_NAME_LMS_GROUP_STUDENTS: 'SET_CURRENT_NAME_LMS_GROUP_STUDENTS',
  SET_CURRENT_ID_LMS_GROUP_STUDENTS: 'SET_CURRENT_ID_LMS_GROUP_STUDENTS',
  SET_CURRENT_NAME_ORG_STUDENTS: 'SET_CURRENT_NAME_ORG_STUDENTS',
  SET_CURRENT_ORG_ID_STUDENTS: 'SET_CURRENT_ORG_ID_STUDENTS',
  SET_CURRENT_GROUP_ID_STUDENTS: 'SET_CURRENT_GROUP_ID_STUDENTS',
  SET_CURRENT_COURSE_ID_STUDENTS: 'SET_CURRENT_COURSE_ID_STUDENTS',
  SET_CURRENT_STUDENT_ID_STUDENTS: 'SET_CURRENT_STUDENT_ID_STUDENTS',
  SET_CURRENT_COURSE_ID_DETAIL_STUDENTS: 'SET_CURRENT_COURSE_ID_DETAIL_STUDENTS',
  ADD_FIRSTNAME_STUDENTS: 'ADD_FIRSTNAME_STUDENTS',
  ADD_LASTNAME_STUDENTS: 'ADD_LASTNAME_STUDENTS',
  ADD_EMPLOYEENUMBER_STUDENTS: 'ADD_EMPLOYEENUMBER_STUDENTS',
  ADD_PERSONNUMBER_STUDENTS: 'ADD_PERSONNUMBER_STUDENTS',
  ADD_EMAIL_STUDENTS: 'ADD_EMAIL_STUDENTS',
  ADD_PHONE_STUDENTS: 'ADD_PHONE_STUDENTS',
  ADD_LANGUAGE_STUDENTS: 'ADD_LANGUAGE_STUDENTS',
  ADD_DATE_STUDENTS: 'ADD_DATE_STUDENTS',
  INITIAL_COURSES_STUDENTS: 'INITIAL_COURSES_STUDENTS',
  ADD_STUDENTS_START: 'ADD_STUDENTS_START',
  ADD_STUDENTS_SUCCESS: 'ADD_STUDENTS_SUCCESS',
  ADD_STUDENTS_FAILURE: 'ADD_STUDENTS_FAILURE',
  ADD_CROP_FILE_STUDENTS: 'ADD_CROP_FILE_STUDENTS',
  ADD_EXAM_STUD_LOG: 'ADD_EXAM_STUD_LOG',
  CHANGE_CHECKBOX_STUDENTS: 'CHANGE_CHECKBOX_STUDENTS',
  GET_TEMPLATE_STUDENTS: 'GET_TEMPLATE_STUDENTS',
  GET_CURRENT_STUDENT_STUDENTS: 'GET_CURRENT_STUDENT_STUDENTS',
  IMPORT_CSV_STUDENTS_START: 'IMPORT_CSV_STUDENTS_START',
  IMPORT_CSV_STUDENTS_SUCCESS: 'IMPORT_CSV_STUDENTS_SUCCESS',
  IMPORT_CSV_STUDENTS_FAILURE: 'IMPORT_CSV_STUDENTS_FAILURE',
  PUT_DATE_STUDENTS: 'PUT_DATE_STUDENTS',
  TOGGLE_COURSE_PASSED_STUDENTS: 'TOGGLE_COURSE_PASSED_STUDENTS',
  EDIT_STUDENT_STUDENT_SUCCESS: 'EDIT_STUDENT_STUDENT_SUCCESS',
  EDIT_STUDENT_STUDENT_FAILURE: 'EDIT_STUDENT_STUDENT_FAILURE',
  DELETE_STUDENT_SUCCESS: 'DELETE_STUDENT_SUCCESS',
  DELETE_STUDENT_FAILURE: 'DELETE_STUDENT_FAILURE',
  GENERATE_PASSWORD_STUDENTS: 'GENERATE_PASSWORD_STUDENTS',
  CHANGE_NAV_MENU_STUDENTS: 'CHANGE_NAV_MENU_STUDENTS',
  GET_STUDENT_NOTES_STUDENTS: 'GET_STUDENT_NOTES_STUDENTS',
  CHANGE_DESCRIPTION_STUDENTS: 'CHANGE_DESCRIPTION_STUDENTS',
  ADD_STUDENT_NOTES_STUDENTS: 'ADD_STUDENT_NOTES_STUDENTS',
  ADD_VALUE_TO_NOTE_STUDENTS: 'ADD_VALUE_TO_NOTE_STUDENTS',
  GET_COURSE_CONTENT_STUDENTS: 'GET_COURSE_CONTENT_STUDENTS',
  GET_CERTIFICATION_STUDENTS: 'GET_CERTIFICATION_STUDENTS',
  CHANGE_ASSIGNMENT_STATUS_STUDENTS: 'CHANGE_ASSIGNMENT_STATUS_STUDENTS',
  CHANGE_EXAM_POINTS_STUDENTS: 'CHANGE_EXAM_POINTS_STUDENTS',
  CHANGE_EXAM_STUD_LOG_POINTS_STUDENTS: 'CHANGE_EXAM_STUD_LOG_POINTS_STUDENTS',
  ADD_DATE_COURSE_CONTENT_STUDENTS: 'ADD_DATE_COURSE_CONTENT_STUDENTS',
  RESERVE_CERTIFICATION_STUDENTS: 'RESERVE_CERTIFICATION_STUDENTS',
  CANCEL_RESERVE_CERTIFICATION_STUDENTS: 'CANCEL_RESERVE_CERTIFICATION_STUDENTS',
  EDIT_EXAMS_STUDENTS: 'EDIT_EXAMS_STUDENTS',
  EDIT_EXAMS_STUDENT_LOGS_STUDENTS: 'EDIT_EXAMS_STUDENT_LOGS_STUDENTS',
  EDIT_ASSIGNMENTS_STUDENT_LOGS_STUDENTS: 'EDIT_ASSIGNMENTS_STUDENT_LOGS_STUDENTS',
  ADD_ASSIGNMENT_STUD_LOG: 'ADD_ASSIGNMENT_STUD_LOG',
  DELETE_ASSIGNMENT_STUD_LOG: 'DELETE_ASSIGNMENT_STUD_LOG',
  EDIT_DATE_COURSE_CONTENT_STUDENTS: 'EDIT_DATE_COURSE_CONTENT_STUDENTS',
  GET_QA_STUDENTS: 'GET_QA_STUDENTS',
  SET_CURRENT_TOPIC_ID_STUDENTS: 'SET_CURRENT_TOPIC_ID_STUDENTS',
  CHANGE_DESCRIPTION_QA_STUDENTS: 'CHANGE_DESCRIPTION_QA_STUDENTS',
  SET_CURRENT_QUESTION_ID_STUDENTS: 'SET_CURRENT_QUESTION_ID_STUDENTS',
  EDIT_QA_STUDENTS: 'EDIT_QA_STUDENTS',
  DELETE_QA_STUDENTS: 'DELETE_QA_STUDENTS',
  SEARCH_TOPIC_STUDENTS: 'SEARCH_TOPIC_STUDENTS',
  ADD_NEW_QA_STUDENTS: 'ADD_NEW_QA_STUDENTS',
  ADD_NEW_TOPIC_STUDENTS: 'ADD_NEW_TOPIC_STUDENTS',
  GET_COMMUNICATIONS_STUDENTS: 'GET_COMMUNICATIONS_STUDENTS',
  ADD_COMMUNICATION_STUDENTS: 'ADD_COMMUNICATION_STUDENTS',
  ADD_MESSAGE_COMMUNICATION_STUDENTS: 'ADD_MESSAGE_COMMUNICATION_STUDENTS',
  ADD_TAXONOMY_TO_STUDENT: 'ADD_TAXONOMY_TO_STUDENT',
  UPDATE_TAXONOMY: 'UPDATE_TAXONOMY',
  EDIT_HEADER_COMMUNICATION_STUDENTS: 'EDIT_HEADER_COMMUNICATION_STUDENTS',
  SEARCH_ADMINS_COMMUNICATION_STUDENTS: 'SEARCH_ADMINS_COMMUNICATION_STUDENTS',
  REASIGN_ADMIN_COMMUNICATION_STUDENTS: 'REASIGN_ADMIN_COMMUNICATION_STUDENTS',
  ADD_ERRORSTATUS_TO_STUDENT: 'ADD_ERRORSTATUS_TO_STUDENT',
  ADD_UNFILLED_FIELDS_TO_STUDENT: 'ADD_UNFILLED_FIELDS_TO_STUDENT',
  CLEAR_STUDENTS_STORE: 'CLEAR_STUDENTS_STORE',
  CLEAR_IMPORT_STATUSES: 'CLEAR_IMPORT_STATUSES',
  REMOVE_USER_AVATAR: 'REMOVE_USER_AVATAR',
  ADD_STUDENT_STREET: 'ADD_STUDENT_STREET',
  CLOSE_SUCCES_ADD_STUDENTS: 'CLOSE_SUCCES_ADD_STUDENTS',
  CHECK_FILE_FOR_IMPORT: 'CHECK_FILE_FOR_IMPORT',
  CLEAR_FILE_FOR_IMPORT: 'CLEAR_FILE_FOR_IMPORT',
  CLOSE_RESET_PASSWORD_STUDENT: 'CLOSE_RESET_PASSWORD_STUDENT',
  RESET_PASSWORD_STUDENT_SUCCESS: 'RESET_PASSWORD_STUDENT_SUCCESS',
  DELETE_STUDENT_FROM_COURSE: 'DELETE_STUDENT_FROM_COURSE',
  DELETE_EXAMS_STUDENT_LOGS_STUDENTS:'DELETE_EXAMS_STUDENT_LOGS_STUDENTS',
  CLOSE_EDIT_STUDENT: 'CLOSE_EDIT_STUDENT',
  SELECT_ALL_COURSES: 'SELECT_ALL_COURSES',
  SELECT_NONE_COURES: 'SELECT_NONE_COURSES',
  CLEAR_BANNER_COURSE_DETAILS: 'CLEAR_BANNER_COURSE_DETAILS',
  SAVE_COURSE_CONTENT_SUCCESS: 'SAVE_COURSE_CONTENT_SUCCESS',
  SAVE_COURSE_CONTENT_FAIL: 'SAVE_COURSE_CONTENT_FAIL',
  ABORT_DIALOG_FROM_ADMIN: 'ABORT_DIALOG_FROM_ADMIN',
  ADD_EXISTING_STUDENTS_START: 'ADD_EXISTING_STUDENTS_START',
  ADD_EXISTING_STUDENTS_SUCCESS: 'ADD_EXISTING_STUDENTS_SUCCESS',
  ADD_EXISTING_STUDENTS_FAIL: 'ADD_EXISTING_STUDENTS_FAIL',
  CLOSE_EXISTING_STUDENTS_MODAL: 'CLOSE_EXISTING_STUDENTS_MODAL',
  SET_CERTIFICATION_EXAM_STUDENTS: 'SET_CERTIFICATION_EXAM_STUDENTS',
  GET_CERTIFICATION_EXAM_STUDENTS: 'GET_CERTIFICATION_EXAM_STUDENTS',
  DELETE_CERTIFICATION_EXAM_STUDENTS: 'DELETE_CERTIFICATION_EXAM_STUDENTS',
  DELETE_STUDENT_FROM_LIST: 'DELETE_STUDENT_FROM_LIST',

  GET_REGISTRATION_LINKS_LOADING: 'GET_REGISTRATION_LINKS_LOADING',
  GET_REGISTRATION_LINKS_SUCCESS: 'GET_REGISTRATION_LINKS_SUCCESS',
  GET_REGISTRATION_LINKS_ERROR: 'GET_REGISTRATION_LINKS_ERROR',

  CREATE_REGISTRATION_LINK: 'CREATE_REGISTRATION_LINK',

  UPDATE_STATUS_REGISTRATION_LINK_LOADING: 'UPDATE_STATUS_REGISTRATION_LINK_LOADING',
  UPDATE_STATUS_REGISTRATION_LINK_SUCCESS: 'UPDATE_STATUS_REGISTRATION_LINK_SUCCESS',
  UPDATE_STATUS_REGISTRATION_LINK_ERROR: 'UPDATE_STATUS_REGISTRATION_LINK_ERROR',

  DELETE_REGISTRATION_LINK_LOADING: 'DELETE_REGISTRATION_LINK_LOADING',
  DELETE_REGISTRATION_LINK_SUCCESS: 'DELETE_REGISTRATION_LINK_SUCCESS',
  DELETE_REGISTRATION_LINK_ERROR: 'DELETE_REGISTRATION_LINK_SUCCESS',

  ADD_REG_LINK_SELECTED_GROUPS: 'ADD_REG_LINK_SELECTED_GROUPS',
  DELETE_REG_LINK_SELECTED_GROUP: 'DELETE_REG_LINK_SELECTED_GROUP',
  ADD_REG_LINK_SELECTED_COURSES: 'ADD_REG_LINK_SELECTED_COURSES',
  DELETE_REG_LINK_SELECTED_COURSE: 'DELETE_REG_LINK_SELECTED_COURSE',
  SWITCH_REG_LINK_STATUS: 'SWITCH_REG_LINK_STATUS',
  CHANGE_REG_LINK_TAB: 'CHANGE_REG_LINK_TAB',
  CLEAN_UP_REG_LINK_STATE: 'CLEAN_UP_REG_LINK_STATE',
  SET_DIALOG_COMPLETED: 'SET_DIALOG_COMPLETED',
  DELETE_LAST_MESSAGE: 'DELETE_LAST_MESSAGE',

  CHANGE_SEARCH_MESSAGE_VALUE: 'CHANGE_SEARCH_MESSAGE_VALUE',

  DELETE_DIALOG: 'DELETE_DIALOG',
  GET_MY_COURSE_START: 'GET_MY_COURSE_START',
  GET_MY_COURSE_SUCCESS: 'GET_MY_COURSE_SUCCESS',
  GET_MY_COURSE_ERROR: 'GET_MY_COURSE_ERROR',

  getWelcomeLetterUrl: (courseId, params, fileFame) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_MY_COURSE_START });
      const { data } = await request.post(`${URLS.welcomeLetter(courseId)}?welcomeLetterURL=${params}`);
      downloadFile(fileFame, data);
      dispatch({ type: actions.GET_MY_COURSE_SUCCESS });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data && data.message;
      errorMessage(error);
      dispatch({ type: actions.GET_MY_COURSE_ERROR, payload: error });
    }
  },

  getWelcomeLetterRichText: (courseId, params, fileFame) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_MY_COURSE_START });
      const { data } = await request.post(`${URLS.welcomeLetterRichText(courseId)}?welcomeLetterRichText=${params}`);
      downloadFile(fileFame, data);
      dispatch({ type: actions.GET_MY_COURSE_SUCCESS });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data && data.message;
      errorMessage(error);
      dispatch({ type: actions.GET_MY_COURSE_ERROR, payload: error });
    }
  },

  closeModalExistingStudents: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_EXISTING_STUDENTS_MODAL });
  },

  addExistingStudentsToCourses: () => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_EXISTING_STUDENTS_START });
      const { studentsToUpdate } = store.getState().students;
      const body = {
        studentsToUpdate,
      };
      await request.post(URLS.addExistingStudentsToCourses, body);
      dispatch({ type: actions.ADD_EXISTING_STUDENTS_SUCCESS });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data && data.message;
      errorMessage(error);
      dispatch({ type: actions.ADD_EXISTING_STUDENTS_FAIL, payload: error });
    }
  },

  deleteStudentFromList: index => (dispatch) => {
    dispatch({
      type: actions.DELETE_STUDENT_FROM_LIST,
      payload: index,
    });
  },

  deleteStudentLogById: ({ courseTopicId, examId, studLogId }) => async (dispatch) => {
    try {
      await request.delete(`${URLS.studentsEditExamsStudentLogs}/${studLogId}`);
      dispatch({
        type: actions.DELETE_EXAMS_STUDENT_LOGS_STUDENTS,
        payload: { courseTopicId, examId, studLogId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addExamStudentLog: ({courseTopicId, studentId, examId, points, completedAt}) => async (dispatch) => {
    try {
      const {data} = await request.post(URLS.studentsEditExamsStudentLogs, {studentId, examId, points, completedAt});
      dispatch({
        type: actions.ADD_EXAM_STUD_LOG,
        payload: {courseTopicId ,examId,  data},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addAssignmentStudentLog: ({
    courseTopicId, 
    studentId, 
    assignmentId, 
    status, 
    completedAt,
  }) => async (dispatch) => {
    try {
      const {data} = await request.post(URLS.studentsEditAssignmentsStudentLogs, {studentId, assignmentId, status, completedAt});

      dispatch({
        type: actions.ADD_ASSIGNMENT_STUD_LOG,
        payload: {courseTopicId ,assignmentId,  data},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  deleteAssignmentStudentLogById: ({
    courseTopicId, 
    assignmentId, 
    studLogId
  }) => async (dispatch) => {
    try {
      await request.delete(`${URLS.studentsEditAssignmentsStudentLogs}/${studLogId}`,);

      dispatch({
        type: actions.DELETE_ASSIGNMENT_STUD_LOG,
        payload: {courseTopicId ,assignmentId,  studLogId},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  saveCourseContent: ({
    assignmentsBody,
    examsBody,
    examsStudentLogsBody,
    dateBody,
  }) => async (dispatch) => {
    try {
      await Promise.all(
        [dispatch(actions.editAssignmentsStudentLogsStudents(assignmentsBody)),
          dispatch(actions.editExamsStudents(examsBody)),
          dispatch(actions.editExamsStudentLogsStudents(examsStudentLogsBody)),
          dispatch(actions.editDateCourseContentStudents(dateBody))],
      );

      dispatch({ type: actions.SAVE_COURSE_CONTENT_SUCCESS });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data && data.message;
      errorMessage(error);
      dispatch({ type: actions.SAVE_COURSE_CONTENT_FAIL, payload: error });
    }
  },

  clearBannerCourseDetails: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_BANNER_COURSE_DETAILS });
  },

  selectNoneCourses: () => (dispatch) => {
    dispatch({ type: actions.SELECT_NONE_COURES });
  },

  selectAllCourses: () => (dispatch) => {
    dispatch({ type: actions.SELECT_ALL_COURSES });
  },

  closeEditStudent: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_EDIT_STUDENT });
  },

  closeResetPasswordStudent: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_RESET_PASSWORD_STUDENT });
  },

  deleteStudentFromCourse: (studentId, courseId) => async (dispatch) => {
    try {
      const {
        data: { data },
      } = await request.delete(URLS.deleteStudentFromCourse(studentId, courseId));
      dispatch({ type: actions.DELETE_STUDENT_FROM_COURSE, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  closeSuccessAddStudents: () => (dispatch) => {
    dispatch({
      type: actions.CLOSE_SUCCES_ADD_STUDENTS,
    });
  },

  addStudentStreet: (value, index) => (dispatch) => {
    dispatch({
      type: actions.ADD_STUDENT_STREET,
      payload: { value, index },
    });
  },

  removeUserAvatar: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_USER_AVATAR,
      payload: 0,
    });
  },

  reasignAdmin: (body, dialogId) => async () => {
    try {
      await request.put(
        URLS.studentsReasignAdminCommunication(dialogId),
        body,
      );
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  searchAdmins: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.studentsSearchAdminsCommunication);
      dispatch({ type: actions.SEARCH_ADMINS_COMMUNICATION_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  editHeaderDialog: (studentId, courseId, dialogId, body) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.studentsEditHeaderDialog(studentId, courseId, dialogId),
        body,
      );
      dispatch({
        type: actions.EDIT_HEADER_COMMUNICATION_STUDENTS,
        payload: { data, dialogId, body },
      });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  abortMessage: (studentId, courseId, dialogId) => async () => {
    try {
      await request.put(
        URLS.studentAbortDialogAdmin(studentId, courseId, dialogId),
      );
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  addMessage: (studentId, courseId, dialogId, formData, isComplete) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(
        URLS.studentsAddMessageCommunication(studentId, courseId, dialogId),
        formData,
        config,
      );
      dispatch({ type: actions.ADD_MESSAGE_COMMUNICATION_STUDENTS, payload: { data, dialogId, isComplete } });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  setDialogCompleted: id => async (dispatch) => {
    try {
      await request.post(`${URLS.markDialogCompleted(id)}`);
      dispatch({
        type: actions.SET_DIALOG_COMPLETED,
        payload: { dialogId: id },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addCommunication: (studentId, courseId, formData) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.studentsAddCommunication(studentId, courseId), formData, config);
      dispatch({ type: actions.ADD_COMMUNICATION_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  getCommunications: (studentId, courseId, search) => async (dispatch) => {
    try {
      const params = {
        search: search || undefined,
      };
      const { data: { data } } = await request.get(
        URLS.studentsGetCommunications(studentId, courseId), { params },
      );
      dispatch({ type: actions.GET_COMMUNICATIONS_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },


  addTopic: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.studentsPostTopic, body);
      dispatch({ type: actions.ADD_NEW_TOPIC_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  addNewQA: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.studentsPostQA, body);
      dispatch({ type: actions.ADD_NEW_QA_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  searchTopics: title => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.studentsSearchTopic(title));
      dispatch({ type: actions.SEARCH_TOPIC_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  setCertificationExamLog: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.certificationExamLog, body);
      dispatch({ type: actions.SET_CERTIFICATION_EXAM_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  getCertificationExamLog: sendData => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.certificationExamLog, { params: sendData });
      dispatch({ type: actions.GET_CERTIFICATION_EXAM_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  deleteCertificationExamLog: id => async (dispatch) => {
    try {
      await request.delete(URLS.certificationExamLogId(id));
      dispatch({ type: actions.DELETE_CERTIFICATION_EXAM_STUDENTS, payload: id });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  setCurrentQuestionId: (topicId, questionId) => (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_QUESTION_ID_STUDENTS,
      payload: { topicId, questionId },
    });
  },

  deleteQA: questionId => async (dispatch) => {
    try {
      const { data: { data } } = await request.delete(URLS.studentsDeleteQA(questionId));
      dispatch({
        type: actions.DELETE_QA_STUDENTS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editQuestionsAndAnswers: (body, id) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.studentsPutQA(id), body);
      dispatch({
        type: actions.EDIT_QA_STUDENTS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeDescriptionQA: (topicId, questionId, value, name) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_DESCRIPTION_QA_STUDENTS,
      payload: {
        topicId, questionId, value, name,
      },
    });
  },

  getQA: (studentId, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.studentsGetQA(studentId, courseId));
      dispatch({ type: actions.GET_QA_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editDateCourseContentStudents: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.studentsEditDateCourseContent, body);
      dispatch({
        type: actions.EDIT_DATE_COURSE_CONTENT_STUDENTS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },


  editAssignmentsStudentLogsStudents: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.studentsEditAssignmentsStudentLogs, body);
      dispatch({
        type: actions.EDIT_ASSIGNMENTS_STUDENT_LOGS_STUDENTS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editExamsStudentLogsStudents: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.studentsEditExamsStudentLogs, body);
      dispatch({
        type: actions.EDIT_EXAMS_STUDENT_LOGS_STUDENTS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editExamsStudents: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.studentsEditExams, body);
      dispatch({ type: actions.EDIT_EXAMS_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  reserveCertificate: (studentId, courseId, certificationId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.reserveCertification(studentId, courseId, certificationId));
      dispatch({ type: actions.GET_CERTIFICATION_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  cancelReserveCertificate: (studentId, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.delete(URLS.cancelCertification(studentId, courseId));
      dispatch({ type: actions.GET_CERTIFICATION_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  getCertification: (studentId, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsCertification}/${studentId}/courses/${courseId}`);
      dispatch({ type: actions.GET_CERTIFICATION_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  addDateCourseContent: (id, date, name) => (dispatch) => {
    try {
      dispatch({ type: actions.ADD_DATE_COURSE_CONTENT_STUDENTS, payload: { id, date, name } });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  changeExamStudentLogPoints: ({value, name, courseTopicId, examId, studLogId, lessonId}) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_EXAM_STUD_LOG_POINTS_STUDENTS,
      payload: {
        value,
        name,
        courseTopicId,
        examId,
        studLogId,
        lessonId,
      },
    });
  },

  changeExamPoints: (value, name, courseTopicId, examId, lessonId) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_EXAM_POINTS_STUDENTS,
      payload: {
        value,
        name,
        courseTopicId,
        examId,
        lessonId,
      },
    });
  },

  changeAssigmentStatus: ({
    value, 
    courseTopicId, 
    assignId, 
    studLogId, 
    lessonId, 
    completedAt,
  }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_ASSIGNMENT_STATUS_STUDENTS,
      payload: {
        value,
        courseTopicId,
        assignId,
        studLogId,
        lessonId,
        completedAt,
      },
    });
  },

  getCourseContent: (studentId, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.studentCourse(studentId, courseId));
      dispatch({ type: actions.GET_COURSE_CONTENT_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentDetailCourseStudents: id => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_COURSE_ID_DETAIL_STUDENTS, payload: id });
  },

  changeDescriptionStudents: value => (dispatch) => {
    dispatch({ type: actions.CHANGE_DESCRIPTION_STUDENTS, payload: value });
  },

  addValueToNote: value => (dispatch) => {
    dispatch({ type: actions.ADD_VALUE_TO_NOTE_STUDENTS, payload: value });
  },

  addNotesStudents: (body, id) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(`${URLS.studentsNote}/${id}/note`, body);
      dispatch({ type: actions.ADD_STUDENT_NOTES_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  getNotesStudents: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsNote}/${id}/note`);
      dispatch({ type: actions.GET_STUDENT_NOTES_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  clickNavMenu: type => async (dispatch) => {
    dispatch({ type: actions.CHANGE_NAV_MENU_STUDENTS, payload: type });
  },

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_PASSWORD_STUDENT_SUCCESS });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  deleteStudent: id => async (dispatch) => {
    if (id) {
      try {
        const { data: { data } } = await request.delete(`${URLS.studentsEditStudent}/${id}`);
        dispatch({ type: actions.DELETE_STUDENT_SUCCESS, payload: data });
      } catch ({ response: { data } = {} }) {
        const error = data && data.error;
        errorMessage(error);
        dispatch({ type: actions.DELETE_STUDENT_FAILURE, payload: error });
      }
    }
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_STUDENTS, payload: file });
  },

  editStudent: (formData, id) => async (dispatch) => {
    if (id) {
      try {
        await request.put(`${URLS.studentsEditStudent}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_STUDENT_STUDENT_SUCCESS });
        dispatch(actions.getCurrentStudentById(id));
      } catch (e) {
        const { response: { data } = {} } = e;
        const error = data && data.error;
        errorMessage(error);
        dispatch({ type: actions.EDIT_STUDENT_STUDENT_FAILURE, payload: error });
      }
    }
  },

  changeCoursePassed: id => async (dispatch) => {
    try {
      dispatch({ type: actions.TOGGLE_COURSE_PASSED_STUDENTS, payload: id });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  changeDate: (id, date, name) => async (dispatch) => {
    try {
      dispatch({ type: actions.PUT_DATE_STUDENTS, payload: { id, date, name } });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  getCurrentStudentById: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsGetStudent}/${id}`);
      dispatch({ type: actions.GET_CURRENT_STUDENT_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchStudents: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsGetStudents}?${query}`);
      dispatch({ type: actions.SEARCH_STUDENTS_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentStudentId: id => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_STUDENT_ID_STUDENTS, payload: id });
  },

  checkImportFile: formData => async (dispatch) => {
    try {
      await request.post(`${URLS.checkFileForImport}`, formData);
      dispatch({ type: actions.CHECK_FILE_FOR_IMPORT });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  clearImportFile: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_FILE_FOR_IMPORT });
  },

  importCsvFile: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.IMPORT_CSV_STUDENTS_START });
      const { data: { data } } = await request.post(`${URLS.studentsImport}`, formData);
      dispatch({ type: actions.IMPORT_CSV_STUDENTS_SUCCESS, payload: data });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data.errors || [data.error];
      dispatch({ type: actions.IMPORT_CSV_STUDENTS_FAILURE, payload: error });
    }
  },

  getTemplateFile: ({ groupId }) => async (dispatch) => {
    dispatch({ type: actions.GET_TEMPLATE_STUDENTS });
    const { data } = await request.get(`${URLS.studentsGetTemplate}?groupId=${groupId}`);

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'template.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  addStudents: body => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_STUDENTS_START });
      const { data: { data } } = await request.post(URLS.studentsAddStudents, body);
      dispatch({ type: actions.ADD_STUDENTS_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
      dispatch({ type: actions.ADD_STUDENTS_FAILURE, payload: error });
    }
  },

  addDate: (id, date, name) => (dispatch) => {
    try {
      dispatch({ type: actions.ADD_DATE_STUDENTS, payload: { id, date, name } });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentCourseStudents: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_COURSE_ID_STUDENTS, payload: id }); }
  },

  searchCourseStudents: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsSearchCourse}?${query}`);
      dispatch({ type: actions.SEARCH_COURSES_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  changeCheckbox: (value, name, indexStudent) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_STUDENTS, payload: { value, name, indexStudent } });
  },

  addInputLang: (value, indexStudent) => (dispatch) => {
    dispatch({ type: actions.ADD_LANGUAGE_STUDENTS, payload: { value, indexStudent } });
  },

  addInputEmployeeNumber: (value, indexStudent) => (dispatch) => {
    dispatch({ type: actions.ADD_EMPLOYEENUMBER_STUDENTS, payload: { value, indexStudent } });
  },

  addInputPersonNumber: (value, indexStudent) => (dispatch) => {
    dispatch({ type: actions.ADD_PERSONNUMBER_STUDENTS, payload: { value, indexStudent } });
  },

  addInputFirstName: (value, indexStudent) => (dispatch) => {
    dispatch({ type: actions.ADD_FIRSTNAME_STUDENTS, payload: { value, indexStudent } });
  },

  addInputLastName: (value, indexStudent) => (dispatch) => {
    dispatch({ type: actions.ADD_LASTNAME_STUDENTS, payload: { value, indexStudent } });
  },

  addInputEmail: (name, value, indexStudent) => (dispatch) => {
    dispatch({
      type: actions.ADD_EMAIL_STUDENTS,
      payload: { name, value, indexStudent },
    });
  },

  clearStudentsStore: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_STUDENTS_STORE,
    });
  },

  addErrorStatus: (isError, indexStudent) => (dispatch) => {
    dispatch({
      type: actions.ADD_ERRORSTATUS_TO_STUDENT,
      payload: { isError, indexStudent },
    });
  },

  addUnfilledFields: unFilledArray => (dispatch) => {
    dispatch({
      type: actions.ADD_UNFILLED_FIELDS_TO_STUDENT,
      payload: unFilledArray,
    });
  },

  addInputPhone: (name, value, indexStudent) => (dispatch) => {
    dispatch({
      type: actions.ADD_PHONE_STUDENTS,
      payload: { name, value, indexStudent },
    });
  },

  updateTaxonomyData: (value, indexStudent) => (dispatch) => {
    dispatch({
      type: actions.ADD_TAXONOMY_TO_STUDENT,
      payload: { value, indexStudent },
    });
  },

  setImportStatuses: importStatuses => (dispatch) => {
    dispatch({
      type: actions.CLEAR_IMPORT_STATUSES,
      payload: importStatuses,
    });
  },

  setCurrentGroupStudents: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_GROUP_ID_STUDENTS, payload: id }); }
  },

  setCurrentNameOrgStudents: name => (dispatch) => {
    if (name.length) { dispatch({ type: actions.SET_CURRENT_NAME_ORG_STUDENTS, payload: name }); }
  },

  setCurrentOrgIdStudents: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ORG_ID_STUDENTS, payload: id }); }
  },

  setCurrentNameLmsGroupStudents: name => (dispatch) => {
    if (name.length) { dispatch({ type: actions.SET_CURRENT_NAME_LMS_GROUP_STUDENTS, payload: name }); }
  },

  setCurrentLmsGroupIdStudents: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP_STUDENTS, payload: id }); }
  },

  setInitialPropsStudents: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_STUDENTS });
  },

  searchLmsGroupsStudents: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${query}`);
      dispatch({ type: actions.SEARCH_LMS_GROUPS_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchOrgStudents: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${query}`);
      dispatch({ type: actions.SEARCH_ORG_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchGroupsStudents: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupsFindGroup}?${query}`);
      dispatch({ type: actions.SEARCH_GROUPS_STUDENTS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  getRegistrationLinks: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.registrationLinks}`);
      dispatch({ type: actions.GET_REGISTRATION_LINKS_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  createRegistrationLink: (body, history) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.registrationLinks, body);
      dispatch({ type: actions.CREATE_REGISTRATION_LINK, payload: data });
      history.push(STUDENTS.studentRegistrationLinks);
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  updateStatusRegistrationLink: (id, status) => async (dispatch) => {
    try {
      dispatch({ type: actions.UPDATE_STATUS_REGISTRATION_LINK_LOADING });
      await request.put(URLS.registrationLinksId(id), { active: status });
      dispatch({ type: actions.UPDATE_STATUS_REGISTRATION_LINK_SUCCESS });
      const { data: { data } } = await request.get(`${URLS.registrationLinks}`);
      dispatch({ type: actions.GET_REGISTRATION_LINKS_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  deleteRegistrationLink: id => async (dispatch) => {
    try {
      dispatch({ type: actions.DELETE_REGISTRATION_LINK_LOADING });
      await request.delete(URLS.registrationLinksId(id));
      const { data: { data } } = await request.get(`${URLS.registrationLinks}`);
      dispatch({ type: actions.GET_REGISTRATION_LINKS_SUCCESS, payload: data });
      dispatch({ type: actions.DELETE_REGISTRATION_LINK_SUCCESS });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  addRegSelectedGroups: groups => async (dispatch) => {
    dispatch({
      type: actions.ADD_REG_LINK_SELECTED_GROUPS,
      payload: groups,
    });
  },

  deleteRegSelectedGroup: id => async (dispatch) => {
    dispatch({
      type: actions.DELETE_REG_LINK_SELECTED_GROUP,
      payload: id,
    });
  },

  addRegSelectedCourses: courses => async (dispatch) => {
    dispatch({
      type: actions.ADD_REG_LINK_SELECTED_COURSES,
      payload: courses,
    });
  },

  deleteRegSelectedCourse: id => async (dispatch) => {
    dispatch({
      type: actions.DELETE_REG_LINK_SELECTED_COURSE,
      payload: id,
    });
  },

  switchRegLinkStatus: () => async (dispatch) => {
    dispatch({
      type: actions.SWITCH_REG_LINK_STATUS,
    });
  },

  changeRegLinkTab: tab => async (dispatch) => {
    dispatch({
      type: actions.CHANGE_REG_LINK_TAB,
      payload: tab,
    });
  },

  cleanUpCreateRegLinkState: () => async (dispatch) => {
    dispatch({
      type: actions.CLEAN_UP_REG_LINK_STATE,
    });
  },

  deleteLastMessage: (dialogId, messageId) => async (dispatch) => {
    try {
      await request.delete(URLS.deleteMessage(dialogId, messageId));
      dispatch({
        type: actions.DELETE_LAST_MESSAGE,
        payload: {
          dialogId,
          messageId,
        },
      });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  deleteDialog: dialogId => async (dispatch) => {
    try {
      await request.delete(`${URLS.deleteDialog(dialogId)}`);
      dispatch({ type: actions.DELETE_DIALOG, payload: dialogId });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  changeSearchMessageValue: search => async (dispatch) => {
    dispatch({
      type: actions.CHANGE_SEARCH_MESSAGE_VALUE,
      payload: search,
    });
  },

};

export default actions;
