import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';
import cropActions from 'redux/cropImageState/actions';
import { getErrorMessage } from '../../utils';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SET_INITIAL_PROPS_TUTORS: 'SET_INITIAL_PROPS_TUTORS',
  CREATE_TUTOR_SUCCESS: 'CREATE_TUTOR_SUCCESS',
  CREATE_TUTOR_FAILURE: 'CREATE_TUTOR_FAILURE',
  SET_VALUE_OF_CURRENT_TUTOR: 'SET_VALUE_OF_CURRENT_TUTOR',
  SEARCH_COURSES_TUTORS: 'SEARCH_COURSES_TUTORS',
  SET_CURRENT_FIND_COURSE_TUTORS: 'SET_CURRENT_FIND_COURSE_TUTORS',
  SET_CURRENT_TUTOR: 'SET_CURRENT_TUTOR',
  EDIT_TUTOR_SUCCESS: 'EDIT_TUTOR_SUCCESS',
  SET_EDIT_TUTOR_ERROR: 'SET_EDIT_TUTOR_ERROR:',
  ADD_DATE_TUTORS: 'ADD_DATE_TUTORS',
  GET_TUTORS_TUTORS: 'GET_TUTORS_TUTORS',
  SEARCH_COURSES_TUTORS_EDIT: 'SEARCH_COURSES_TUTORS_EDIT',
  SET_CURRENT_FIND_COURSE_TUTORS_EDIT: 'SET_CURRENT_FIND_COURSE_TUTORS_EDIT',
  SET_INITIAL_PROPS_TUTOR_EDIT: 'SET_INITIAL_PROPS_TUTOR_EDIT',
  EDIT_TUTOR_START: 'EDIT_TUTOR_START',
  CREATE_TUTOR_START: 'CREATE_TUTOR_START',
  CLEAR_SUCCESS_RESULT_TUTOR: 'CLEAR_SUCCESS_RESULT_TUTOR',
  CLEAR_ERROR_TUTOR: 'CLEAR_ERROR_TUTOR',
  CHANGE_TUTOR_INFO: 'CHANGE_TUTOR_INFO',
  REMOVE_TUTOR_DOWNLOAD_LINK: 'REMOVE_TUTOR_DOWNLOAD_LINK',
  SET_INITIAL_PROPS: 'SET_INITIAL_PROPS',
  GET_TUTOR_FOLDERS: 'GET_TUTOR_FOLDERS',
  CLEAR_TUTOR_FOLDERS: 'CLEAR_TUTOR_FOLDERS',
  CLEAR_SEARCH_TUTORS: 'CLEAR_SEARCH_TUTORS',
  CLEAR_SEARCH_DATA_COURSE: 'CLEAR_SEARCH_DATA_COURSE',
  RESET_TUTOR_PASSWORD: 'RESET_TUTOR_PASSWORD',
  CLOSE_TUTOR_PASSWORD: 'CLOSE_TUTOR_PASSWORD',

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_TUTOR_PASSWORD });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  closeResetPasswordOrgAdmin: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_TUTOR_PASSWORD });
  },

  clearSearchTutors: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SEARCH_TUTORS,
    });
  },

  clearSearchDataCourses: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SEARCH_DATA_COURSE,
    });
  },

  deleteFile: fileId => async (dispatch) => {
    try {
      await request.delete(`${URLS.tutorsFolders}/files/${fileId}`);
      dispatch(actions.getTutorFolders());
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  updateFile: (body, fileId) => async (dispatch) => {
    try {
      await request.put(`${URLS.tutorsFolders}/files/${fileId}`, body);
      dispatch(actions.getTutorFolders());
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },

  createFile: formData => async (dispatch) => {
    try {
      await request.post(`${URLS.tutorsFolders}/files`, formData, config);
      dispatch(actions.getTutorFolders());
    } catch (e) {
      const message = getErrorMessage(e);
      errorMessage(message);
    }
  },

  clearTutorFolders: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_TUTOR_FOLDERS,
    });
  },

  getTutorFolders: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.tutorsFolders);
      dispatch({ type: actions.GET_TUTOR_FOLDERS, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  creatTutorFolder: folderName => async (dispatch) => {
    try {
      await request.post(URLS.tutorsFolders, {
        folderName,
      });
      dispatch(actions.getTutorFolders());
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setInitialProps: () => (dispatch) => {
    dispatch({
      type: actions.SET_INITIAL_PROPS,
    });
  },

  removeDownloadLinkTutor: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_TUTOR_DOWNLOAD_LINK,
    });
  },

  changeTutorInfo: (name, value) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_TUTOR_INFO,
      payload: {
        name,
        value,
      },
    });
  },

  clearErrorTutor: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERROR_TUTOR,
    });
  },

  clearSuccessResultTutor: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_RESULT_TUTOR,
    });
  },

  getTutorsByParameters: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.tutorsGetPostTutor}?${query}`);
      dispatch({ type: actions.GET_TUTORS_TUTORS, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchCourseTutors: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.tutorsGetCourses}?${query}`);
      dispatch({ type: actions.SEARCH_COURSES_TUTORS, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  searchCourseTutorsEdit: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.tutorsGetCourses}?${query}`);
      dispatch({ type: actions.SEARCH_COURSES_TUTORS_EDIT, payload: data });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  setCurrentFindCourseTutors: (id, title) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_FIND_COURSE_TUTORS, payload: { id, title } });
  },

  setCurrentFindCourseTutorsEdit: (id, title) => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_FIND_COURSE_TUTORS_EDIT, payload: { id, title } });
  },

  addDateCourseTutors: (id, date, name) => (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_DATE_TUTORS,
        payload: { id, date, name },
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },


  setInitialPropsTutorEdit: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_TUTOR_EDIT });
  },

  createTutor: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.CREATE_TUTOR_START });
      const { data: { data } } = await request.post(URLS.createTutor, formData, config);
      dispatch({ type: actions.CREATE_TUTOR_SUCCESS, payload: data });
      dispatch(cropActions.setInitStateCropImage());
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
      dispatch({ type: actions.CREATE_TUTOR_FAILURE, payload: message });
    }
  },

  setValuesOfCurrentTutor: ({ name, value }) => (dispatch) => {
    dispatch({ type: actions.SET_VALUE_OF_CURRENT_TUTOR, payload: { name, value } });
  },

  setCurrentTutor: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.tutorsGetTutor(id)}`);
      dispatch({
        type: actions.SET_CURRENT_TUTOR,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = (data && data.message) || true;
      dispatch({
        type: actions.SET_EDIT_TUTOR_ERROR,
        payload: message,
      });
      errorMessage(message);
    }
  },

  changeCurrentTutor: (tutorId, formData) => async (dispatch) => {
    try {
      dispatch({ type: actions.EDIT_TUTOR_START });
      const { data: { data } } = await request.put(URLS.tutorsEditTutor(tutorId), formData);
      dispatch({ type: actions.EDIT_TUTOR_SUCCESS });
      dispatch({
        type: actions.SET_CURRENT_TUTOR,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      dispatch({
        type: actions.SET_EDIT_TUTOR_ERROR,
        payload: message,
      });
      errorMessage(message);
    }
  },

  deleteCurrentTutor: (tutorId, cb) => async (dispatch) => {
    try {
      await request.delete(URLS.tutorsRemoveTutor(tutorId));
      dispatch({ type: actions.EDIT_TUTOR_SUCCESS });
      cb();
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      dispatch({
        type: actions.SET_EDIT_TUTOR_ERROR,
        payload: message,
      });
      errorMessage(message);
    }
  },
};
export default actions;
