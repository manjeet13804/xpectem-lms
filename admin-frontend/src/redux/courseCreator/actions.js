import request from 'components/restApi';
import URLS from 'redux/urls';
import cropActions from 'redux/cropImageState/actions';
import { errorMessage } from 'helpers/utility';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SET_INITIAL_STATE_COURSE_CREATOR: 'SET_INITIAL_STATE_COURSE_CREATOR',
  CHANGE_INFO_CURRENT_COURSE_CREATOR: 'CHANGE_INFO_CURRENT_COURSE_CREATOR',
  ADD_CROP_FILE_COURSE_CREATOR: 'ADD_CROP_FILE_COURSE_CREATOR',
  SAVE_COURSE_CREATOR_START: 'SAVE_COURSE_CREATOR_START',
  SAVE_COURSE_CREATOR_SUCCESS: 'SAVE_COURSE_CREATOR_SUCCESS',
  SAVE_COURSE_CREATOR_FAIL: 'SAVE_COURSE_CREATOR_FAIL',
  EDIT_COURSE_CREATOR_SUCCESS: 'EDIT_COURSE_CREATOR_SUCCESS',
  EDIT_COURSE_CREATOR_START: 'EDIT_COURSE_CREATOR_START',
  EDIT_COURSE_CREATOR_FAIL: 'EDIT_COURSE_CREATOR_FAIL',
  CLEAR_SUCCESS_RESULT_COURSE_CREATOR: 'CLEAR_SUCCESS_RESULT_COURSE_CREATOR',
  CLEAR_ERROR_COURSE_CREATOR: 'CLEAR_ERROR_COURSE_CREATOR',
  REMOVE_DOWNLOAD_LINK_COURSE_CREATOR: 'REMOVE_DOWNLOAD_LINK_COURSE_CREATOR',
  SEARCH_COURSE_CREATORS_SUCCESS: 'SEARCH_COURSE_CREATORS_SUCCESS',
  SEARCH_COURSE_CREATORS_START: 'SEARCH_COURSE_CREATORS_START',
  SEARCH_COURSE_CREATORS_FAIL: 'SEARCH_COURSE_CREATORS_FAIL',
  GET_COURSE_CREATOR_INFO: 'GET_COURSE_CREATOR_INFO',
  DELETE_COURSE_FROM_CREATOR: 'DELETE_COURSE_FROM_CREATOR',
  RESET_COURSE_CREATOR_PASSWORD: 'RESET_COURSE_CREATOR_PASSWORD',
  CLOSE_COURSE_CREATOR_PASSWORD: 'CLOSE_COURSE_CREATOR_PASSWORD',
  CHANGE_STATE_PERSON_COURSE_CREATOR: 'CHANGE_STATE_PERSON_COURSE_CREATOR',
  CLEAR_COURSE_CREATOR_SEARCH_DATA: 'CLEAR_COURSE_CREATOR_SEARCH_DATA',

  clearCourseCreatorSearchData: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_COURSE_CREATOR_SEARCH_DATA,
    });
  },

  changeStatePersonCourseCreator: ({ name, value }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_STATE_PERSON_COURSE_CREATOR,
      payload: { name, value },
    });
  },

  deleteCourseFromCreator: (creatorId, courseId) => async (dispatch) => {
    try {
      await request.delete(`${URLS.courseCreator}/${creatorId}/${courseId}`);
      dispatch({ type: actions.DELETE_COURSE_FROM_CREATOR, payload: courseId });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  deleteCourseCreator: id => async () => {
    try {
      await request.delete(`${URLS.courseCreator}/${id}`);
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  closeResetPasswordCourseCreator: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_COURSE_CREATOR_PASSWORD });
  },

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_COURSE_CREATOR_PASSWORD });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  updateCourseCreator: (formData, id) => async (dispatch) => {
    try {
      dispatch({ type: actions.EDIT_COURSE_CREATOR_START });
      const { data: { data } } = await request.put(`${URLS.courseCreator}/${id}`, formData, config);
      dispatch({ type: actions.EDIT_COURSE_CREATOR_SUCCESS });
      dispatch({ type: actions.GET_COURSE_CREATOR_INFO, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
      dispatch({ type: actions.EDIT_COURSE_CREATOR_FAIL, error: message });
    }
  },

  getCurrentCourseCreator: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.courseCreator}/${id}`);
      dispatch({ type: actions.GET_COURSE_CREATOR_INFO, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchCourseCreators: params => async (dispatch) => {
    try {
      dispatch({ type: actions.SEARCH_COURSE_CREATORS_START });
      const { data: { data } } = await request.get(URLS.courseCreator, { params });
      dispatch({ type: actions.SEARCH_COURSE_CREATORS_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      dispatch({ type: actions.SEARCH_COURSE_CREATORS_FAIL });
      const message = data && data.message;
      errorMessage(message);
    }
  },

  removeDownloadLinkCourseCreator: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_DOWNLOAD_LINK_COURSE_CREATOR,
    });
  },

  clearErrorCourseCreator: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERROR_COURSE_CREATOR,
    });
  },

  clearSuccessResultCourseCreator: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SUCCESS_RESULT_COURSE_CREATOR });
  },

  setInitialState: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_STATE_COURSE_CREATOR });
  },

  changeInfo: (name, value) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_INFO_CURRENT_COURSE_CREATOR,
      payload: { name, value },
    });
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_COURSE_CREATOR, payload: file });
  },

  saveCourseCreator: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.SAVE_COURSE_CREATOR_START });
      await request.post(URLS.courseCreator, formData, config);
      dispatch({ type: actions.SAVE_COURSE_CREATOR_SUCCESS });
      dispatch(cropActions.setInitStateCropImage());
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
      dispatch({ type: actions.SAVE_COURSE_CREATOR_FAIL, error: message });
    }
  },
};

export default actions;
