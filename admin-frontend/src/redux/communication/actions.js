import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';
import studentActions from 'redux/students/actions';

const actions = {
  SET_CURRENT_LIST_COMMUNICATION: 'SET_CURRENT_LIST_COMMUNICATION',
  SET_TOGGLE: 'SET_TOGGLE',
  SEARCH_COMMUNICATION: 'SEARCH_COMMUNICATION',
  SET_CURRENT_COMMUNICATION: 'SET_CURRENT_COMMUNICATION',
  SEARCH_TUTOR: 'SEARCH_TUTOR',
  SEARCH_TOPIC: 'SEARCH_TOPIC',
  REASIGN_QUESTION: 'REASIGN_QUESTION',
  MOVE_QUESTION_TOPIC: 'MOVE_QUESTION_TOPIC',
  ADD_NEW_TOPIC: 'ADD_NEW_TOPIC',
  SEND_MESSAGE: 'SEND_MESSAGE',
  SET_CURRENT_STUDENT: 'SET_CURRENT_STUDENT',
  SET_REDIRECT_STATUS: 'SET_REDIRECT_STATUS',
  SET_OPENED_DIALOG_ID: 'SET_OPENED_DIALOG_ID',

  setOpenedDialogId: id => (dispatch) => {
    dispatch({
      type: actions.SET_OPENED_DIALOG_ID,
      payload: id,
    });
  },

  setToggle: toggleAll => (dispatch) => {
    dispatch({
      type: actions.SET_TOGGLE,
      payload: toggleAll,
    });
  },

  setRedirectStatus: status => (dispatch) => {
    dispatch({
      type: actions.SET_REDIRECT_STATUS,
      payload: { status },
    });
  },

  markMessageAsReaded: (studentId, courseId, dialogId) => (dispatch) => {
    try {
      dispatch(studentActions.getCurrentStudentById(studentId));
      dispatch(studentActions.setCurrentDetailCourseStudents(courseId));
      dispatch(studentActions.getCourseContent(studentId, courseId));
      dispatch(studentActions.clickNavMenu('courseDetails.communicationTab'));
      dispatch(actions.setOpenedDialogId(dialogId));
      dispatch({
        type: actions.SET_REDIRECT_STATUS,
        payload: { status: true },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentListCommunication: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getAdminCommunication);
      dispatch({
        type: actions.SET_CURRENT_LIST_COMMUNICATION,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchCommunication: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getAdminCommunication, {
        params: {
          search: query,
        },
      });
      dispatch({
        type: actions.SET_CURRENT_LIST_COMMUNICATION,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentCommunication: id => (dispatch) => {
    try {
      dispatch({
        type: actions.SET_CURRENT_COMMUNICATION,
        payload: [],
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchTutor: query => (dispatch) => {
    try {
      dispatch({
        type: actions.SEARCH_TUTOR,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  reasignQuestion: id => (dispatch) => {
    try {
      dispatch({
        type: actions.REASIGN_QUESTION,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchTopic: query => (dispatch) => {
    try {
      dispatch({
        type: actions.SEARCH_TOPIC,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  moveQuestionTopic: id => (dispatch) => {
    try {
      dispatch({
        type: actions.MOVE_QUESTION_TOPIC,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addNewTopic: value => (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_NEW_TOPIC,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  sendMessage: value => (dispatch) => {
    try {
      dispatch({
        type: actions.SEND_MESSAGE,
        payload: {},
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentStudent: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsGetStudent}/${69}`);
      dispatch({
        type: actions.SET_CURRENT_STUDENT,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  readMassages: async (id) => {
    try {
      await request.post(URLS.studentsReadMassages(id));
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },
};
export default actions;
