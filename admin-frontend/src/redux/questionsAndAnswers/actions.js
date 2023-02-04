
import request from 'components/restApi';
import URLS from 'redux/urls';
import { errorMessage } from 'helpers/utility';
import { FAQ_TYPES } from '../../constants/constants';

const actions = {
  GET_STUDENT_QA: 'GET_STUDENT_QA',
  GET_ADMIN_QA: 'GET_ADMIN_QA',
  GET_COURSE_QA: 'GET_COURSE_QA',
  ADD_NEW_QA: 'ADD_NEW_QA',
  ADD_NEW_ADMIN_QA: 'ADD_NEW_ADMIN_QA',
  ADD_NEW_COURSE_QA: 'ADD_NEW_COURSE_QA',
  DELETE_QA: 'DELETE_QA',
  CHANGE_QA: 'CHANGE_QA',
  CHANGE_ADMIN_QA: 'CHANGE_ADMIN_QA',
  SET_CURRENT_QUESTION_ID_QA: 'SET_CURRENT_QUESTION_ID_QA',
  SEARCH_TOPIC_QA: 'SEARCH_TOPIC_QA',
  ADD_NEW_TOPIC_QA: 'ADD_NEW_TOPIC_QA',
  TOGGLE_ADD_NEW_QUESTION: 'TOGGLE_ADD_NEW_QUESTION',
  SELECT_FAQ_TYPE: 'SELECT_FAQ_TYPE',
  CHANGE_QUESTION_DESCRIPTION: 'CHANGE_QUESTION_DESCRIPTION',
  SAVE_TOPIC_IDS: 'SAVE_TOPIC_IDS',
  CHANGE_TOPIC_TITLE: 'CHANGE_TOPIC_TITLE',
  SELECT_COURSE: 'SELECT_COURSE',

  getStudentQA: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getStudentQA);
      dispatch({ type: actions.GET_STUDENT_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getAdminQA: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getAdminQA);
      dispatch({ type: actions.GET_ADMIN_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  getCourseQA: courseId => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getCourseQA(courseId));
      dispatch({ type: actions.GET_COURSE_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addNewQA: body => async (dispatch) => {
    try {
      const {
        faqType, answer, question, topics,
      } = body;
      const reqBody = faqType === FAQ_TYPES.ADMIN || faqType === FAQ_TYPES.STUDENT
        ? {
          faqType,
          answer,
          question,
          topics,
        } : body;

      const { data: { data } } = await request.post(URLS.studentsPostQA, reqBody);
      if (FAQ_TYPES.STUDENT === faqType) {
        dispatch({ type: actions.ADD_NEW_QA, payload: data });
        return;
      }
      if (FAQ_TYPES.ADMIN === faqType) {
        dispatch({ type: actions.ADD_NEW_ADMIN_QA, payload: data });
        return;
      }
      dispatch({ type: actions.ADD_NEW_COURSE_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  deleteQA: (questionId, type, courseId) => async (dispatch) => {
    try {
      await request.delete(URLS.studentsDeleteQA(questionId));
      if (FAQ_TYPES.ADMIN === type) {
        const { data: { data } } = await request.get(URLS.getAdminQA);
        dispatch({ type: actions.GET_ADMIN_QA, payload: data });
        return;
      }
      if (FAQ_TYPES.STUDENT === type) {
        const { data: { data } } = await request.get(URLS.getStudentQA);
        dispatch({ type: actions.GET_STUDENT_QA, payload: data });
        return;
      }
      const { data: { data } } = await request.get(URLS.getCourseQA(courseId));
      dispatch({ type: actions.GET_COURSE_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  deleteTopic: (topicId, type, courseId) => async (dispatch) => {
    try {
      await request.delete(URLS.studentsDeleteTopicQA(topicId));
      if (FAQ_TYPES.ADMIN === type) {
        const { data: { data } } = await request.get(URLS.getAdminQA);
        dispatch({ type: actions.GET_ADMIN_QA, payload: data });
        return;
      }
      if (FAQ_TYPES.STUDENT === type) {
        const { data: { data } } = await request.get(URLS.getStudentQA);
        dispatch({ type: actions.GET_STUDENT_QA, payload: data });
        return;
      }
      const { data: { data } } = await request.get(URLS.getCourseQA(courseId));
      dispatch({ type: actions.GET_COURSE_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editQA: (body, questionId) => async (dispatch) => {
    try {
      await request.put(URLS.studentsPutQA(questionId), body);
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  changeDescriptionAdminQA: (topicId, questionId, value, name) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_ADMIN_QA,
      payload: {
        topicId, questionId, value, name,
      },
    });
  },

  changeDescriptionQA: (topicId, questionId, value, name) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_QA,
      payload: {
        topicId, questionId, value, name,
      },
    });
  },

  setCurrentQuestionId: (topicId, questionId) => (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_QUESTION_ID_QA,
      payload: { topicId, questionId },
    });
  },

  addTopic: body => async (dispatch) => {
    try {
      const { faqType, title, courseId } = body;
      const reqBody = faqType === FAQ_TYPES.ADMIN || faqType === FAQ_TYPES.STUDENT
        ? {
          faqType,
          title,
        } : body;

      await request.post(URLS.studentsPostTopic, reqBody);
      dispatch({ type: actions.ADD_NEW_TOPIC_QA });
      if (FAQ_TYPES.ADMIN === faqType) {
        const { data: { data: topics } } = await request.get(URLS.getAdminQA);
        dispatch({ type: actions.GET_ADMIN_QA, payload: topics });
        return;
      }
      if (FAQ_TYPES.STUDENT === faqType) {
        const { data: { data: topics } } = await request.get(URLS.getStudentQA);
        dispatch({ type: actions.GET_STUDENT_QA, payload: topics });
        return;
      }
      const { data: { data } } = await request.get(URLS.getCourseQA(courseId));
      dispatch({ type: actions.GET_COURSE_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  searchTopics: title => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.studentsSearchTopic(title));
      dispatch({ type: actions.SEARCH_TOPIC_QA, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  toggleAddNewQuestions: () => (dispatch) => {
    dispatch({ type: actions.TOGGLE_ADD_NEW_QUESTION });
  },

  selectFaqType: faqType => (dispatch) => {
    dispatch({
      type: actions.SELECT_FAQ_TYPE,
      payload: {
        faqType,
      },
    });
  },

  changeDescription: (value, name) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_QUESTION_DESCRIPTION,
      payload: {
        value,
        name,
      },
    });
  },

  saveTopicsIds: value => (dispatch) => {
    dispatch({
      type: actions.SAVE_TOPIC_IDS,
      payload: {
        value,
      },
    });
  },

  changeTopic: value => (dispatch) => {
    dispatch({
      type: actions.CHANGE_TOPIC_TITLE,
      payload: {
        value,
      },
    });
  },

  selectCourse: value => (dispatch) => {
    dispatch({
      type: actions.SELECT_COURSE,
      payload: {
        value,
      },
    });
  },
};

export default actions;
