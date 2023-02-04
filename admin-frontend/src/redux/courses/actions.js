import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';
import constants from 'helpers/constants';
import { getBodyForPut, getBodyForPost } from '../../utils';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  GET_SEARCH_COURSES_START: 'GET_SEARCH_COURSES_START',
  SET_INITIAL_PROPS_COURSES: 'SET_INITIAL_PROPS_COURSES',
  CREATE_LANGUAGE_COURSES: 'CREATE_LANGUAGE_COURSES',
  CREATE_DESCRIPTION_COURSES: 'CREATE_DESCRIPTION_COURSES',
  CREATE_WELCOME_EMAIL_COURSES: 'CREATE_WELCOME_EMAIL_COURSES',
  CREATE_WELCOME_LETTER_COURSES: 'CREATE_WELCOME_LETTER_COURSES',
  SEARCH_CERT_COURSES: 'SEARCH_CERT_COURSES',
  SEARCH_TUTORS_COURSES: 'SEARCH_TUTORS_COURSES',
  SEARCH_HEADER_COURSES: 'SEARCH_HEADER_COURSES',
  SEARCH_FILES_BY_HEADER_COURSES: 'SEARCH_FILES_BY_HEADER_COURSES',
  SET_CURRENT_CERT_ID_COURSES: 'SET_CURRENT_CERT_ID_COURSES',
  SET_CURRENT_TUTOR_ID_COURSES: 'SET_CURRENT_TUTOR_ID_COURSES',
  SET_CURRENT_HEADER_ID_COURSES: 'SET_CURRENT_HEADER_ID_COURSES',
  CREATE_COURSE_SUCCESS: 'CREATE_COURSE_SUCCESS',
  CREATE_COURSE_FAILURE: 'CREATE_COURSE_FAILURE',
  SAVE_INPUT_CREATE_COURSES: 'SAVE_INPUT_CREATE_COURSES',
  SEARCH_FILES_COURSES: 'SEARCH_FILES_COURSES',
  SET_CURRENT_FILE_ID_COURSES: 'SET_CURRENT_FILE_ID_COURSES',
  ATTACH_FILE_COURSES: 'ATTACH_FILE_COURSES',
  REMOVE_ATTACHED_FILE_COURSES: 'REMOVE_ATTACHED_FILE_COURSES',
  SAVE_INPUT_ADD_FILES_COURSES: 'SAVE_INPUT_ADD_FILES_COURSES',
  REMOVE_UPLOADED_FILE_COURSES: 'REMOVE_UPLOADED_FILE_COURSES',
  FILTER_CERTIFICATES_COURSES: 'FILTER_CERTIFICATES_COURSES',
  ATTACH_TUTOR_COURSES: 'ATTACH_TUTOR_COURSES',
  REMOVE_ATTACHED_TUTOR_COURSES: 'REMOVE_ATTACHED_TUTOR_COURSES',
  SET_INITIAL_PROPS_ADD_FILES: 'SET_INITIAL_PROPS_ADD_FILES',
  UPLOAD_FILE_TO_COURSES: 'UPLOAD_FILE_TO_COURSES',
  SEARCH_FILES_OF_COURSE: 'SEARCH_FILES_OF_COURSE',
  DOWNLOAD_CURRENT_FILE_COURSE: 'DOWNLOAD_CURRENT_FILE_COURSE',
  DELETE_FILE_COURSE: 'DELETE_FILE_COURSE',
  EDIT_FILE_COURSE: 'EDIT_FILE_COURSE',
  UPLOAD_TEMPLATE_FILE_TO_COURSE: 'UPLOAD_TEMPLATE_FILE_TO_COURSE',
  REMOVE_ATTACHED_FILE_TO_COURSE: 'REMOVE_ATTACHED_FILE_TO_COURSE',
  SET_CURRENT_LMS_GROUP_COURSES: 'SET_CURRENT_ID_LMS_GROUP_COURSES',
  SET_CURRENT_ORG_COURSES: 'SET_CURRENT_ORG_COURSES',
  SET_CURRENT_GROUP_COURSES: 'SET_CURRENT_GROUP_COURSES',
  SET_CURRENT_FIND_COURSE_COURSES: 'SET_CURRENT_FIND_COURSE_COURSES',
  SEARCH_LMS_GROUP_COURSES: 'SEARCH_LMS_GROUP_COURSES',
  SEARCH_ORG_COURSES: 'SEARCH_ORG_COURSES',
  SEARCH_GROUP_COURSES: 'SEARCH_GROUP_COURSES',
  SEARCH_COURSES_COURSES: 'SEARCH_COURSES_COURSES',
  SEARCH_COURSES_TOTAL_COURSES: 'SEARCH_COURSES_TOTAL_COURSES',
  ADD_DATE_COURSES: 'ADD_DATE_COURSES',
  SEARCH_TOPICS_COURSES: 'SEARCH_TOPICS_COURSES',
  SET_SEARCH_COURSES_DEFAULT: 'SET_SEARCH_COURSES_DEFAULT',
  SET_CURRENT_EXIST_TOPIC_COURSES: 'SET_CURRENT_EXIST_TOPIC_COURSES',
  SET_CURRENT_NEW_TOPIC_COURSES: 'SET_CURRENT_NEW_TOPIC_COURSES',
  SET_CURRENT_NEW_TOPIC_ERROR_COURSES: 'SET_CURRENT_NEW_TOPIC_ERROR_COURSES',
  DELETE_TOPIC_FROM_SELECTED_COURSES: 'DELETE_TOPIC_FROM_SELECTED_COURSES',
  SEARCH_LESSONS_COURSES: 'SEARCH_LESSONS_COURSES',
  SEARCH_EXAMS_COURSES: 'SEARCH_EXAMS_COURSES',
  SEARCH_ASSIGNMENTS_COURSES: 'SEARCH_ASSIGNMENTS_COURSES',
  SET_CURRENT_LESSON_COURSES: 'SET_CURRENT_LESSON_COURSES',
  SET_CURRENT_EXAM_COURSES: 'SET_CURRENT_EXAM_COURSES',
  ADD_LESSON_TO_TOPIC_COURSES: 'ADD_LESSON_TO_TOPIC_COURSES',
  ADD_EXAM_TO_TOPIC_COURSES: 'ADD_EXAM_TO_TOPIC_COURSES',
  ADD_ASSIGNMENT_TO_TOPIC_COURSES: 'ADD_ASSIGNMENT_TO_TOPIC_COURSES',
  SET_CURRENT_ASSIGNMENT_COURSES: 'SET_CURRENT_ASSIGNMENT_COURSES',
  REORDER_ARRAY_COURSES: 'REORDER_ARRAY_COURSES',
  GET_TOPIC_BY_ID_COURSES: 'GET_TOPIC_BY_ID_COURSES',
  DELETE_ITEM_FROM_SELECTED_COURSES: 'DELETE_ITEM_FROM_SELECTED_COURSES',
  CHANGE_LESSONS_ORDER_COURSES: 'CHANGE_LESSONS_ORDER_COURSES',
  CHANGE_EXAMS_ORDER_COURSES: 'CHANGE_EXAMS_ORDER_COURSES',
  CHANGE_ASSIGNMENTS_ORDER_COURSES: 'CHANGE_ASSIGNMENTS_ORDER_COURSES',
  GET_COURSE_BY_ID_COURSES: 'GET_COURSE_BY_ID_COURSES',
  TOOGLE_STATUS_SET_INITIAL_PROPS_COURSES: 'TOOGLE_STATUS_SET_INITIAL_PROPS_COURSES',
  CLEAR_SEARCH_DATA_FROM_INPUT_COURSES: 'CLEAR_SEARCH_DATA_FROM_INPUT_COURSES',
  UPDATE_TOPICS_OF_COURSES: 'UPDATE_TOPICS_OF_COURSES',
  UPDATE_TUTORS_OF_COURSES: 'UPDATE_TUTORS_OF_COURSES',
  UPDATE_FILES_OF_COURSES: 'UPDATE_FILES_OF_COURSES',
  CLEAR_TRANSLATAION_INPUT_BY_NAME: 'CLEAR_TRANSLATAION_INPUT_BY_NAME',
  CREATE_TOPIC_SUCCESS: 'CREATE_TOPIC_SUCCESS',
  CREATE_TOPIC_FAILURE: 'CREATE_TOPIC_FAILURE',
  UPDATE_LESSON_SUCCESS: 'UPDATE_LESSON_SUCCESS',
  UPDATE_EXAM_SUCCES: 'UPDATE_EXAM_SUCCES',
  UPDATE_ASSIGNMENT_SUCCESS: 'UPDATE_ASSIGNMENT_SUCCESS',
  CLEAR_CURRENT_LESSON_FILES: 'CLEAR_CURRENT_LESSON_FILES',
  SET_CURRENT_LESSON_FILES: 'SET_CURRENT_LESSON_FILES',
  CLEAR_NOTIFICATION_STATUS: 'CLEAR_NOTIFICATION_STATUS',
  PUBLISH_COURSE: 'PUBLISH_COURSE',
  COURSE_UPDATED: 'COURSE_UPDATED',
  UPDATE_COURSE_FAILURE: 'UPDATE_COURSE_FAILURE',
  COURSE_SWITCH_HAS_PHYSICAL: 'COURSE_SWITCH_HAS_PHYSICAL',
  COURSE_TOPIC_NAME_UPDATED: 'COURSE_TOPIC_NAME_UPDATED',
  ADD_FILES_TO_COURSE_FROM_UPLOADED: 'ADD_FILES_TO_COURSE_FROM_UPLOADED',
  CLEAR_FILES: 'CLEAR_FILES',
  DELETE_UPLOADED_FILE: 'DELETE_UPLOADED_FILE',
  CHANGE_INFO_COURSE: 'CHANGE_INFO_COURSE',
  TOGGLE_TUTORS: 'TOGGLE_TUTORS',
  SET_CATEGORIES_LIST: 'SET_CATEGORIES_LIST',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  SELECT_COURSE_GROUP_LIST: 'SELECT_COURSE_GROUP_LIST',
  SELECT_COURSE_PERMISSION_START: 'SELECT_COURSE_PERMISSION_START',
  SELECT_COURSE_PERMISSION: 'SELECT_COURSE_PERMISSION',
  SELECT_COURSE_PERMISSION_POST: 'SELECT_COURSE_PERMISSION_POST',
  SELECT_COURSE_REPORT_ID: 'SELECT_COURSE_REPORT_ID',
  SELECT_STUDENT_REPORT_ID: 'SELECT_STUDENT_REPORT_ID',
  GET_REPORT_FILE: 'GET_REPORT_FILE',
  SET_SEARCH_VALUE_SEARCH: 'SET_SEARCH_VALUE_SEARCH',
  SET_SEARCH_COURSE_NAME: 'SET_SEARCH_COURSE_NAME',
  SET_SEARCH_COURSE_ID: 'SET_SEARCH_COURSE_ID',
  ADD_TO_SELECTED_COURSE: 'ADD_TO_SELECTED_COURSE',
  REMOVE_ITEM_FROM_SELECTED_COURSE: 'REMOVE_ITEM_FROM_SELECTED_COURSE',
  CLEAR_SEARCH_DATA_COURSE: 'CLEAR_SEARCH_DATA_COURSE',
  SELECT_ALL: 'SELECT_ALL',
  CLEAR_ALL_COURSE: 'CLEAR_ALL_COURSE',
  CHANGE_GROUP_PERMISSION: 'CHANGE_GROUP_PERMISSION',
  CLEAR_LMS_GROUP_COURSE: 'CLEAR_LMS_GROUP_COURSE',
  CLEAR_ORG_COURSE: 'CLEAR_ORG_COURSE',
  CLEAR_LESSON_SEARCH: 'CLEAR_LESSON_SEARCH',
  REMOVE_COURSES_IMAGE: 'REMOVE_COURSES_IMAGE',
  CHANGE_FIELD: 'CHANGE_FIELD',
  CLEAR_SEARCH_TOPIC_DATA: 'CLEAR_SEARCH_TOPIC_DATA',
  LESSON_UPDATED: 'LESSON_UPDATED',
  CLOSE_COURSE_PERMISSIONS: 'CLOSE_COURSE_PERMISSIONS',
  CLEAR_CURRENT_TOPIC_OBJECT: 'CLEAR_CURRENT_TOPIC_OBJECT',
  GET_TOPIC_BY_ID_COURSES_START: 'GET_TOPIC_BY_ID_COURSES_START',

  clearCurrentTopicObject: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_CURRENT_TOPIC_OBJECT });
  },

  closeCoursePermissions: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_COURSE_PERMISSIONS });
  },

  clearSearchTopicData: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_TOPIC_DATA });
  },

  changeField: (name, value) => (dispatch) => {
    dispatch({ type: actions.CHANGE_FIELD, payload: { name, value } });
  },

  clearLessonSearch: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_LESSON_SEARCH });
  },

  changeGropPermission: (newRow, index) => (dispatch) => {
    dispatch({ type: actions.CHANGE_GROUP_PERMISSION, payload: { newRow, index } });
  },
  setNameSearchCourse: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_COURSE_NAME, payload: id });
  },

  setIdSearchCourse: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_COURSE_ID, payload: id });
  },

  selectAllCourse: () => (dispatch) => {
    dispatch({ type: actions.SELECT_ALL });
  },
  clearAllCourse: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ALL_COURSE });
  },

  clearLmsGroupCourse: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_LMS_GROUP_COURSE });
  },

  clearOrgCourse: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ORG_COURSE });
  },

  addToSelectedCourse: id => (dispatch) => {
    dispatch({ type: actions.ADD_TO_SELECTED_COURSE, payload: id });
  },

  removeItemFromSelectedCourse: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_ITEM_FROM_SELECTED_COURSE, payload: id });
  },
  clearSearchDataCourses: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_DATA_COURSE });
  },

  selectCategory: id => (dispatch) => {
    dispatch({
      type: actions.SELECT_CATEGORY,
      payload: id,
    });
  },

  setSearchValueCourses: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_VALUE_SEARCH, payload });
  },

  selectStudentReportID: id => (dispatch) => {
    dispatch({
      type: actions.SELECT_STUDENT_REPORT_ID,
      payload: id,
    });
  },
  selectCourseReportID: id => (dispatch) => {
    dispatch({
      type: actions.SELECT_COURSE_REPORT_ID,
      payload: id,
    });
  },

  getCoureseReportFile: params => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_REPORT_FILE });
      const { data } = await request.get(
        URLS.downloadReport,
        { params },
      );
      const blob = new Blob([data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `${constants.reportFileNme[params.type]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getCoursesGroupList: params => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(
        URLS.coursesGroup,
        { params },
      );
      dispatch({
        type: actions.SELECT_COURSE_GROUP_LIST,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getCoursesPermission: params => async (dispatch) => {
    try {
      dispatch({
        type: actions.SELECT_COURSE_PERMISSION_START,
      });

      const { data: { data } } = await request.get(
        URLS.coursesPermission,
        { params },
      );

      dispatch({
        type: actions.SELECT_COURSE_PERMISSION,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCoursesPermission: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(
        URLS.coursesPermission,
        body,
      );

      dispatch({
        type: actions.SELECT_COURSE_PERMISSION_POST,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },
  getCategoriesList: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(
        URLS.getCategoriesList,
      );
      dispatch({
        type: actions.SET_CATEGORIES_LIST,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  toggleTutors: value => (dispatch) => {
    dispatch({
      type: actions.TOGGLE_TUTORS,
      payload: value,
    });
  },

  changeInfoCourse: (name, value) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_INFO_COURSE,
      payload: {
        name,
        value,
      },
    });
  },

  deleteFile: fileId => async (dispatch) => {
    try {
      await request.delete(URLS.coursesChangeFileOfCourse(fileId));
      dispatch({
        type: actions.DELETE_UPLOADED_FILE,
        payload: fileId,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  clearFiles: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_FILES,
    });
  },

  addFilesForCourse: () => (dispatch) => {
    dispatch({
      type: actions.ADD_FILES_TO_COURSE_FROM_UPLOADED,
    });
  },

  updateTopicInfo: (topicId, topicName, topicDescription) => async (dispatch) => {
    const body = {
      topicName,
      topicDescription,
    };
    try {
      await request.put(
        URLS.coursesUpdateTopicInfo(topicId),
        body,
      );
      dispatch({
        type: actions.COURSE_TOPIC_NAME_UPDATED,
        payload: { topicId, topicName },
      });
      dispatch({
        type: actions.LESSON_UPDATED,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  toggleCoursePhysicalMaterials: value => (dispatch) => {
    dispatch({
      type: actions.COURSE_SWITCH_HAS_PHYSICAL,
      payload: value,
    });
  },

  clearNotificationsStatus: notificationName => (dispatch) => {
    dispatch({
      type: actions.CLEAR_NOTIFICATION_STATUS,
      payload: notificationName,
    });
  },

  publishCourse: (status, courseId) => async (dispatch) => {
    const body = {
      status,
      courseId,
    };
    try {
      const { data: { data } } = await request.put(
        URLS.publishCourse,
        body,
      );
      dispatch({
        type: actions.PUBLISH_COURSE,
        payload: { data, status },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentLessonFiles: files => (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_LESSON_FILES,
      payload: files,
    });
  },

  clearCurrentLessonFiles: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_CURRENT_LESSON_FILES,
    });
  },

  updateCourse: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.coursesUpdateCourse,
        body,
        config,
      );
      dispatch({
        type: actions.COURSE_UPDATED,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      dispatch({ type: actions.UPDATE_COURSE_FAILURE, payload: message });
      errorMessage(message);
    }
  },

  updateFilesOfCourse: (body, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.coursesUpdateFilesOfCourse(courseId),
        body,
      );
      dispatch({
        type: actions.UPDATE_FILES_OF_COURSES,
        payload: { data, courseId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  updateTutorsOfCourse: (body, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.coursesUpdateTutorsOfCourse(courseId),
        body,
      );
      dispatch({
        type: actions.UPDATE_TUTORS_OF_COURSES,
        payload: { data, courseId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  updateTopicsOfCourse: (body, courseId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.coursesUpdateTopicsOfCourse(courseId),
        body,
      );
      dispatch({
        type: actions.UPDATE_TOPICS_OF_COURSES,
        payload: { data, courseId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getCourseById: courseId => async (dispatch) => {
    try {
      await dispatch(actions.getCategoriesList());
      const { data: { data } } = await request.get(URLS.coursesGetCourseById(courseId));
      dispatch({
        type: actions.GET_COURSE_BY_ID_COURSES,
        payload: data,
      });
    } catch (e) {
      const { response: { data } = {} } = e;
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeAssignmentsOrder: (body, topicId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(
        URLS.coursesChangeAssignmentsOrder(topicId),
        body,
      );
      dispatch({
        type: actions.CHANGE_ASSIGNMENTS_ORDER_COURSES,
        payload: { data, topicId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeExamsOrder: (body, topicId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.coursesChangeExamsOrder(topicId), body);
      dispatch({
        type: actions.CHANGE_EXAMS_ORDER_COURSES,
        payload: { data, topicId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeLessonsOrder: (body, topicId) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.coursesChangeLessonsOrder(topicId), body);
      dispatch({
        type: actions.CHANGE_LESSONS_ORDER_COURSES,
        payload: { data, topicId },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  deleteItemFromSelected: (id, name, type) => async (dispatch) => {
    try {
      switch (type) {
        case 'lessons':
          await request.delete(`${URLS.coursesGetPostLessons}/${id}`);
          break;
        case 'exams':
          await request.delete(`${URLS.coursesGetPostExams}/${id}`);
          break;
        case 'assignments':
          await request.delete(`${URLS.coursesGetPostAssignments}/${id}`);
          break;
        default:
          break;
      }

      dispatch({
        type: actions.DELETE_ITEM_FROM_SELECTED_COURSES,
        payload: {
          id,
          name,
          type,
        },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getTopicByIdCourse: id => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_TOPIC_BY_ID_COURSES_START });
      const { data: { data } } = await request.get(URLS.coursesGetTopicById(id));
      dispatch({ type: actions.GET_TOPIC_BY_ID_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeOrder: (result, type) => (dispatch) => {
    dispatch({ type: actions.REORDER_ARRAY_COURSES, payload: { result, type } });
  },

  searchAssignmentCourse: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesGetPostAssignments}?${query}`);
      dispatch({ type: actions.SEARCH_ASSIGNMENTS_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchExamCourse: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesGetPostExams}?${query}`);
      dispatch({ type: actions.SEARCH_EXAMS_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  createNewAssignment: body => async (dispatch) => {
    try {
      const { id } = body;
      const bodyForPost = getBodyForPost(body);
      const bodyForPut = getBodyForPut(body);
      if (id) {
        const { data: { data } } = await request.put(URLS.coursesPutAssignments(id), bodyForPut);
        dispatch({ type: actions.UPDATE_ASSIGNMENT_SUCCESS, payload: data });
      } else {
        const { data: { data } } = await request.post(URLS.coursesGetPostAssignments, bodyForPost);
        dispatch({ type: actions.ADD_ASSIGNMENT_TO_TOPIC_COURSES, payload: data });
      }
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  createNewExam: body => async (dispatch) => {
    try {
      const { id } = body;
      const bodyForPost = getBodyForPost(body);
      const bodyForPut = getBodyForPut(body);
      if (id) {
        const { data: { data } } = await request.put(URLS.coursesPutExams(id), bodyForPut);
        dispatch({ type: actions.UPDATE_EXAM_SUCCES, payload: data });
      } else {
        const { data: { data } } = await request.post(URLS.coursesGetPostExams, bodyForPost);
        dispatch({ type: actions.ADD_EXAM_TO_TOPIC_COURSES, payload: data });
      }
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  createNewLesson: body => async (dispatch) => {
    try {
      const { id } = body;
      const bodyForPost = getBodyForPost(body);
      const bodyForPut = getBodyForPut(body);
      if (id) {
        const { data: { data } } = await request.put(URLS.coursesGetPutLessons(id), bodyForPut);
        dispatch({ type: actions.UPDATE_LESSON_SUCCESS, payload: data });
      } else {
        const { data: { data } } = await request.post(URLS.coursesGetPostLessons, bodyForPost);
        dispatch({ type: actions.ADD_LESSON_TO_TOPIC_COURSES, payload: data });
      }
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  setCurrentLesson: lesson => async (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_LESSON_COURSES, payload: lesson });
  },

  setCurrentExam: exam => async (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_EXAM_COURSES, payload: exam });
  },

  setCurrentAssignment: assignment => async (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_ASSIGNMENT_COURSES, payload: assignment });
  },

  searchLessonCourses: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesGetPostLessons}?${query}`);
      dispatch({ type: actions.SEARCH_LESSONS_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  deleteTopicFromSelected: id => async (dispatch) => {
    try {
      await request.delete(URLS.coursesDeleteTopic(id));
      dispatch({ type: actions.DELETE_TOPIC_FROM_SELECTED_COURSES, payload: id });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentExistTopic: (id, name, rowId) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_EXIST_TOPIC_COURSES, payload: { id, name, rowId } });
  },

  setCurrentNewTopic: name => async (dispatch) => {
    try {
      const query = name ? `name=${name}` : '';
      const { data: { data } } = await request.get(`${URLS.coursesGetTopics}?${query}`);

      if (data.length === 0) {
        dispatch({ type: actions.SET_CURRENT_NEW_TOPIC_COURSES, payload: { name } });
      } else {
        dispatch({ type: actions.SET_CURRENT_NEW_TOPIC_ERROR_COURSES, payload: 'This topic is exists' });
        errorMessage('This topic is exists');
      }
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addDate: (id, date, name) => (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_DATE_COURSES,
        payload: { id, date, name },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchTopicCourses: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesGetTopics}?${query}`);
      dispatch({ type: actions.SEARCH_TOPICS_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCourseSearchDefault: id => async (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_COURSES_DEFAULT, payload: id });
  },

  searchCourseCourses: payload => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.coursesGetCourses, { params: { ...payload } });
      dispatch({ type: actions.SEARCH_COURSES_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchCourseForReport: (params, isFinish) => async (dispatch) => {
    try {
      dispatch({
        type: actions.GET_SEARCH_COURSES_START,
        payload: isFinish,
      });
      const { data: { data } } = await request.get(
        URLS.coursesGetCourses,
        { params },
      );
      if (isFinish) {
        dispatch({
          type: actions.SEARCH_COURSES_TOTAL_COURSES,
          payload: data,
        });
        return;
      }
      dispatch({
        type: actions.SEARCH_COURSES_COURSES,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchLmsGroupsCourses: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${query}`);
      dispatch({ type: actions.SEARCH_LMS_GROUP_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchOrgsCourses: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${query}`);
      dispatch({ type: actions.SEARCH_ORG_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchGroupsCourses: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupsFindGroup}?${query}`);
      dispatch({ type: actions.SEARCH_GROUP_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentLmsGroupCourses: (id, name) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_LMS_GROUP_COURSES, payload: { id, name } });
  },

  setCurrentOrgCourses: (id, name) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_ORG_COURSES, payload: { id, name } });
  },

  setCurrentGroupCourses: (id, name) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_GROUP_COURSES, payload: { id, name } });
  },

  deleteFileOfCourse: (fileId, isLessonFiles) => async (dispatch) => {
    try {
      const { data: { data } } = await request.delete(URLS.coursesChangeFileOfCourse(fileId));
      dispatch({
        type: actions.DELETE_FILE_COURSE,
        payload: { data, fileId, isLessonFiles },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeFileOfCourse: (fileId, body, isLessonFiles) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(URLS.coursesChangeFileOfCourse(fileId), body);
      dispatch({
        type: actions.EDIT_FILE_COURSE,
        payload: { data, fileId, isLessonFiles },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  downloadCurrentFile: (url, name) => (dispatch) => {
    fetch(url).then(t => t.blob().then((b) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.setAttribute('download', name);
      a.click();
    }));
    dispatch({ type: actions.DOWNLOAD_CURRENT_FILE_COURSE });
  },

  getUploadedFilesOfCourse: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.coursesGetFilesOfCourse);
      dispatch({ type: actions.SEARCH_FILES_OF_COURSE, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  uploadFileToCourse: (formData, isLessonFiles) => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(
        URLS.coursesUploadFileToCourse,
        formData,
        config,
      );
      dispatch({ type: actions.UPLOAD_FILE_TO_COURSES, payload: { data, isLessonFiles } });
    } catch (e) {
      const { response: { data } = {} } = e;
      const message = data && data.message;
      errorMessage(message);
    }
  },

  uploadTemplateFileToCourse: file => (dispatch) => {
    dispatch({
      type: actions.UPLOAD_TEMPLATE_FILE_TO_COURSE,
      payload: file,
    });
  },

  setInitialPropsCourses: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_COURSES });
  },

  toggleStatusSetInitialProps: status => (dispatch) => {
    dispatch({
      type: actions.TOOGLE_STATUS_SET_INITIAL_PROPS_COURSES,
      payload: status,
    });
  },

  clearSearchData: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_DATA_FROM_INPUT_COURSES });
  },

  setInitialPropsAddFiles: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_ADD_FILES });
  },

  saveInputValueCourse: payload => (dispatch) => {
    dispatch({ type: actions.SAVE_INPUT_CREATE_COURSES, payload });
  },

  saveInputValueAddFiles: target => (dispatch) => {
    dispatch({ type: actions.SAVE_INPUT_ADD_FILES_COURSES, payload: target });
  },

  createInputLang: value => (dispatch) => {
    dispatch({ type: actions.CREATE_LANGUAGE_COURSES, payload: value });
  },

  createDescriptionCourses: (value, name, lang) => (dispatch) => {
    dispatch({ type: actions.CREATE_DESCRIPTION_COURSES, payload: { value, name, lang } });
  },

  createWelcomeEmailCourses: value => (dispatch) => {
    dispatch({ type: actions.CREATE_WELCOME_EMAIL_COURSES, payload: value });
  },

  createWelcomeLetterCourses: value => (dispatch) => {
    dispatch({ type: actions.CREATE_WELCOME_LETTER_COURSES, payload: value });
  },

  searchCertCourses: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.coursesCertificates);
      dispatch({ type: actions.SEARCH_CERT_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  filterCertificatesCourses: payload => (dispatch) => {
    dispatch({ type: actions.FILTER_CERTIFICATES_COURSES, payload });
  },

  filterTopicsCourses: payload => (dispatch) => {
    dispatch({ type: actions.FILTER_TOPICS_COURSES, payload });
  },

  searchTutorCourses: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesTutors}?${queryString}`);
      dispatch({ type: actions.SEARCH_TUTORS_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchHeaderCourses: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.coursesHeaders}?${queryString}`);
      dispatch({ type: actions.SEARCH_HEADER_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentCertIdCourses: id => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_CERT_ID_COURSES, payload: id });
  },

  setCurrentTutorIdCourses: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_TUTOR_ID_COURSES, payload: id }); }
  },

  setCurrentHeaderIdCourses: ({ id, header }) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_HEADER_ID_COURSES, payload: { id, header } });
  },

  createCourse: formData => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.createCourse, formData, config);
      dispatch({ type: actions.CREATE_COURSE_SUCCESS, payload: data });
    } catch (e) {
      const { response: { data } = {} } = e;
      const error = data && data.error;
      errorMessage(error);
      dispatch({ type: actions.CREATE_COURSE_FAILURE, payload: error });
    }
  },

  createTopic: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.createTopic, body);
      dispatch({ type: actions.CREATE_TOPIC_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
      dispatch({ type: actions.CREATE_TOPIC_FAILURE, payload: error });
    }
  },

  searchFilesByHeaderCourses: params => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(
        URLS.searchFilesByHeader, { params },
      );
      dispatch({ type: actions.SEARCH_FILES_BY_HEADER_COURSES, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchFilesCourses: (queryString = '', daterange = '') => async (dispatch) => {
    const payload = { queryString, daterange };
    dispatch({ type: actions.SEARCH_FILES_COURSES, payload });
  },

  setCurrentFileIdCourses: id => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_FILE_ID_COURSES, payload: id });
  },

  attachFileCourses: id => (dispatch) => {
    dispatch({ type: actions.ATTACH_FILE_COURSES, payload: id });
  },

  removeAttachedFileCourses: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_ATTACHED_FILE_COURSES, payload: id });
  },

  removeUploadedFileCourses: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_UPLOADED_FILE_COURSES, payload: id });
  },

  setCurrentFindCourseCourses: (id, title) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_FIND_COURSE_COURSES, payload: { id, title } });
  },

  attachTutorCourses: id => (dispatch) => {
    dispatch({ type: actions.ATTACH_TUTOR_COURSES, payload: id });
  },

  removeAttachedTutorCourses: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_ATTACHED_TUTOR_COURSES, payload: id });
  },

  removeAttachedFileToCourse: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_ATTACHED_FILE_TO_COURSE, payload: id });
  },

  clearTranslationInputByName: name => (dispatch) => {
    dispatch({ type: actions.CLEAR_TRANSLATAION_INPUT_BY_NAME, payload: name });
  },
};
export default actions;
