import request from 'components/restApi';
import URLS from 'redux/urls';
import cropActions from 'redux/cropImageState/actions';
import { errorMessage, getError } from 'helpers/utility';
import _ from 'lodash';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SET_INITIAL_PROPS_LMS_GROUP_ADMINS: 'SET_INITIAL_PROPS_LMS_GROUP_ADMINS',
  CHANGE_CHECKBOX_LMS_GROUP_ADMINS: 'CHANGE_CHECKBOX_LMS_GROUP_ADMINS',
  ADD_FIRSTNAME_LMS_GROUP_ADMINS: 'ADD_FIRSTNAME_LMS_GROUP_ADMINS',
  ADD_LASTNAME_LMS_GROUP_ADMINS: 'ADD_LASTNAME_LMS_GROUP_ADMINS',
  ADD_EMAIL_LMS_GROUP_ADMINS: 'ADD_EMAIL_LMS_GROUP_ADMINS',
  ADD_PHONE_LMS_GROUP_ADMINS: 'ADD_PHONE_LMS_GROUP_ADMINS',
  ADD_LANGUAGE_LMS_GROUP_ADMINS: 'ADD_LANGUAGE_LMS_GROUP_ADMINS',
  EDIT_ADMIN_LMS_GROUP_ADMINS_SUCCESS: 'EDIT_ADMIN_LMS_GROUP_ADMINS_SUCCESS',
  EDIT_ADMIN_LMS_GROUP_ADMINS_FAILURE: 'EDIT_ADMIN_LMS_GROUP_ADMINS_FAILURE',
  GET_CURRENT_ADMIN_LMS_GROUP_ADMIN: 'GET_CURRENT_ADMIN_LMS_GROUP_ADMIN',
  SEARCH_LMS_GROUP_ADMINS: 'SEARCH_LMS_GROUP_ADMINS',
  SEARCH_ADMINS_LMS_GROUP_ADMINS: 'SEARCH_ADMINS_LMS_GROUP_ADMINS',
  SET_CURRENT_ID_LMS_GROUP_ADMINS: 'SET_CURRENT_ID_LMS_GROUP_ADMINS',
  SET_CURRENT_ADMIN_ID_LMS_GROUP_ADMIN: 'SET_CURRENT_ADMIN_ID_LMS_GROUP_ADMIN',
  ADD_LMS_GROUP_ADMINISTRATOR_SUCCESS: 'ADD_LMS_GROUP_ADMINISTRATOR_SUCCESS',
  ADD_LMS_GROUP_ADMINISTRATOR_FAILURE: 'ADD_LMS_GROUP_ADMINISTRATOR_FAILURE',
  ADD_CROP_FILE_LMS_GROUP_ADMINS: 'ADD_CROP_FILE_LMS_GROUP_ADMINS',
  DELETE_ADMIN_LMS_GROUP_SUCCESS: 'DELETE_ADMIN_LMS_GROUP_SUCCESS',
  DELETE_ADMIN_LMS_GROUP_FAILURE: 'DELETE_ADMIN_LMS_GROUP_FAILURE',
  SET_INITIAL_FULL_PROPS_LMS_ADMINS: 'SET_INITIAL_FULL_PROPS_LMS_ADMINS',
  CHANGE_LMS_ADMINS_STATE: 'CHANGE_LMS_ADMINS_STATE',
  CLEAR_SUCCESS_RESULT_LMS_ADMIN: 'CLEAR_SUCCESS_RESULT_LMS_ADMIN',
  CLEAR_ERROR_LMS_GROUP_ADMIN: 'CLEAR_ERROR_LMS_GROUP_ADMIN',
  REMOVE_DOWNLOAD_LINK_LMS_GROUP_ADMIN: 'REMOVE_DOWNLOAD_LINK_LMS_GROUP_ADMIN',
  ADD_LMS_ADMIN_START: 'ADD_LMS_ADMIN_START',
  EDIT_LMS_ADMIN_START: 'EDIT_LMS_ADMIN_START',
  SET_INITIAL_PROPS_LMS_ADMINS: 'SET_INITIAL_PROPS_LMS_ADMINS',
  CLEAR_ADMINS: 'CLEAR_ADMINS',
  RESET_LMS_ADMIN_PASSWORD: 'RESET_LMS_ADMIN_PASSWORD',
  CLOSE_LMS_GROUP_ADMIN_PASSWORD: 'CLOSE_LMS_GROUP_ADMIN_PASSWORD',

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_LMS_ADMIN_PASSWORD });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  closeResetPasswordLmsGroupAdmin: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_LMS_GROUP_ADMIN_PASSWORD });
  },

  clearAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ADMINS,
    });
  },

  removeDownloadLinkLmsAdmin: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_DOWNLOAD_LINK_LMS_GROUP_ADMIN,
    });
  },

  clearErrorLmsAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERROR_LMS_GROUP_ADMIN,
    });
  },

  clearSuccessResultLmsAdmin: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_RESULT_LMS_ADMIN,
    });
  },

  changeLmsAdminsState: ({ name, value }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_LMS_ADMINS_STATE,
      payload: { name, value },
    });
  },

  setInitialProps: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_LMS_GROUP_ADMINS });
  },

  setInitialPropsFullLmsAdmins: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_FULL_PROPS_LMS_ADMINS });
  },

  editAdmin: (formData, id) => async (dispatch) => {
    if (id) {
      try {
        dispatch({ type: actions.EDIT_LMS_ADMIN_START });
        const { data: { data } } = await request.put(`${URLS.lmsGroupAdminPut}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_ADMIN_LMS_GROUP_ADMINS_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.EDIT_ADMIN_LMS_GROUP_ADMINS_FAILURE, error });
      }
    }
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_LMS_GROUP_ADMINS, payload: file });
  },

  addInputFirstName: value => (dispatch) => {
    dispatch({ type: actions.ADD_FIRSTNAME_LMS_GROUP_ADMINS, payload: value });
  },

  addInputLastName: value => (dispatch) => {
    dispatch({ type: actions.ADD_LASTNAME_LMS_GROUP_ADMINS, payload: value });
  },

  addInputEmail: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_EMAIL_LMS_GROUP_ADMINS, payload: [value1, value2] });
  },

  addInputPhone: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_PHONE_LMS_GROUP_ADMINS, payload: [value1, value2] });
  },

  addInputLang: value => (dispatch) => {
    dispatch({ type: actions.ADD_LANGUAGE_LMS_GROUP_ADMINS, payload: value });
  },

  changeCheckbox: (value, name) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_LMS_GROUP_ADMINS, payload: { value, name } });
  },

  searchLmsGroups: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_LMS_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchAdmins: params => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.lmsGroupAdminsGetAdmins, { params });
      dispatch({ type: actions.SEARCH_ADMINS_LMS_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentLmsGroupId: id => (dispatch) => {
    dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP_ADMINS, payload: id });
  },

  getCurrentAdminById: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminGetAdminById}/${id}`);
      dispatch({ type: actions.GET_CURRENT_ADMIN_LMS_GROUP_ADMIN, payload: data });
    } catch (e) {
      const response = _.get(e, 'response', {});
      const data = _.get(response, 'data', {});
      const error = getError(data);
      errorMessage(error.message);
    }
  },

  setCurrentAdminId: id => (dispatch) => {
    if (id >= 0) dispatch({ type: actions.SET_CURRENT_ADMIN_ID_LMS_GROUP_ADMIN, payload: id });
  },

  addAdministrator: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_LMS_ADMIN_START });
      const { data: { data } } = await request.post(URLS.lmsGroupAdminAdd, formData, config);
      dispatch({ type: actions.ADD_LMS_GROUP_ADMINISTRATOR_SUCCESS, payload: data });
      dispatch({ type: actions.SET_INITIAL_PROPS_LMS_ADMINS });
      dispatch(cropActions.setInitStateCropImage());
    } catch ({ response: { data } }) {
      const error = data && data.error;
      const isAlreadyExistError = !error.includes('email already exist')
      dispatch({ type: actions.ADD_LMS_GROUP_ADMINISTRATOR_FAILURE, payload: error });
      if (isAlreadyExistError) {
        errorMessage(data && data.message);
      }
    }
  },

  addAdministratorExist: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_LMS_ADMIN_START });
      const { data: { data } } = await request.put(URLS.lmsGroupAdminAddExsisting, formData, config);
      dispatch({ type: actions.ADD_LMS_GROUP_ADMINISTRATOR_SUCCESS, payload: data });
      dispatch({ type: actions.SET_INITIAL_PROPS_LMS_ADMINS });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.ADD_LMS_GROUP_ADMINISTRATOR_FAILURE, payload: error });
    }
  },

  deleteAdminLmsGroup: id => async (dispatch) => {
    if (id >= 0) {
      try {
        const { data: { data } } = await request.put(`${URLS.lmsGroupAdminDelete}/${id}/close`);
        dispatch({ type: actions.DELETE_ADMIN_LMS_GROUP_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.DELETE_ADMIN_LMS_GROUP_FAILURE, error });
      }
    }
  },
};

export default actions;
