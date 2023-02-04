import request from 'components/restApi';
import URLS from 'redux/urls';
import _ from 'lodash';
import {
  errorMessage,
  getError,
} from 'helpers/utility';
import cropActions from 'redux/cropImageState/actions';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SEARCH_LMS_GROUPS_GROUP_ADMINS: 'SEARCH_LMS_GROUPS_GROUP_ADMINS',
  SEARCH_ORG_GROUP_ADMINS: 'SEARCH_ORG_GROUP_ADMINS',
  SEARCH_GROUPS_GROUP_ADMINS: 'SEARCH_GROUPS_GROUPS',
  SEARCH_ADMINS_GROUP_ADMINS: 'SEARCH_ADMINS_GROUP_ADMINS',
  SET_CURRENT_NAME_ORG_GROUP_ADMINS: 'SET_CURRENT_NAME_ORG_GROUP_ADMINS',
  SET_CURRENT_NAME_LMS_GROUP_GROUP_ADMINS: 'SET_CURRENT_NAME_LMS_GROUP_GROUP_ADMINS',
  SET_CURRENT_ID_LMS_GROUP_GROUP_ADMINS: 'SET_CURRENT_ID_LMS_GROUP_GROUP_ADMINS',
  SET_CURRENT_ORG_ID_GROUP_ADMINS: 'SET_CURRENT_ORG_ID_GROUP_ADMINS',
  SET_CURRENT_GROUP_ID_GROUP_ADMINS: 'SET_CURRENT_GROUP_ID_GROUP_ADMINS',
  ADD_FIRSTNAME_GROUP_ADMINS: 'ADD_FIRSTNAME_GROUP_ADMINS',
  ADD_LASTNAME_GROUP_ADMINS: 'ADD_LASTNAME_GROUP_ADMINS',
  ADD_EMAIL_GROUP_ADMINS: 'ADD_EMAIL_GROUP_ADMINS',
  ADD_PHONE_GROUP_ADMINS: 'ADD_PHONE_GROUP_ADMINS',
  ADD_LANGUAGE_GROUP_ADMINS: 'ADD_LANGUAGE_GROUP_ADMINS',
  ADD_CROP_FILE_GROUP_ADMINS: 'ADD_CROP_FILE_GROUP_ADMINS',
  CHANGE_CHECKBOX_GROUP_ADMINS: 'CHANGE_CHECKBOX_GROUP_ADMINS',
  ADD_GROUP_ADMIN_SUCCESS: 'ADD_GROUP_ADMIN_SUCCESS',
  ADD_GROUP_ADMIN_FAILURE: 'ADD_GROUP_ADMIN_FAILURE',
  SET_CURRENT_ADMIN_ID_GROUP_ADMINS: 'SET_CURRENT_ADMIN_ID_GROUP_ADMINS',
  GET_CURRENT_ADMIN_GROUP_ADMIN: 'GET_CURRENT_ADMIN_GROUP_ADMIN',
  EDIT_ADMIN_GROUP_ADMINS_SUCCESS: 'EDIT_ADMIN_GROUP_ADMINS_SUCCESS',
  EDIT_ADMIN_GROUP_ADMINS_FAILURE: 'EDIT_ADMIN_GROUP_ADMINS_FAILURE',
  DELETE_ADMIN_GROUP_ADMINS_SUCCESS: 'DELETE_ADMIN_GROUP_ADMINS_SUCCESS',
  DELETE_ADMIN_GROUP_ADMINS_FAILURE: 'DELETE_ADMIN_GROUP_ADMINS_FAILURE',
  SET_INITIAL_PROPS_ADMIN_GROUP_ADMINS: 'SET_INITIAL_PROPS_ADMIN_GROUP_ADMINS',
  IMPORT_CSV_GROUP_ADMINS_START: 'IMPORT_CSV_GROUP_ADMINS_START',
  IMPORT_CSV_GROUP_ADMINS_SUCCESS: 'IMPORT_CSV_GROUP_ADMINS_SUCCESS',
  IMPORT_CSV_GROUP_ADMINS_FAILURE: 'IMPORT_CSV_GROUP_ADMINS_FAILURE',
  TOGGLE_GROUPS_SWITCH: 'TOGGLE_GROUPS_SWITCH',
  GET_TEMPLATE_GROUP_ADMINISTRATORS: 'GET_TEMPLATE_GROUP_ADMINISTRATORS',
  CHANGE_GROUP_ADMIN_STATE: 'CHANGE_GROUP_ADMIN_STATE',
  SET_INIT_FULL_GROUP_ADMIN_STATE: 'SET_INIT_FULL_GROUP_ADMIN_STATE',
  REMOVE_DOWNLOAD_LINK_GROUP_ADMINS: 'REMOVE_DOWNLOAD_LINK_GROUP_ADMINS',
  ADD_GROUP_ADMIN_START: 'ADD_GROUP_ADMIN_START',
  EDIT_ADMIN_GROUP_ADMINS_START: 'EDIT_ADMIN_GROUP_ADMINS_START',
  SET_INIT_STATE_GROUP_ADMIN: 'SET_INIT_STATE_GROUP_ADMIN',
  CLEAR_SUCCESS_RESULT_GROUP_ADMIN: 'CLEAR_SUCCESS_RESULT_GROUP_ADMIN',
  SET_INIT_STATE_FULL_GROUP_ADMIN: 'SET_INIT_STATE_FULL_GROUP_ADMIN',
  CLEAR_ERROR_GROUP_ADMIN: 'CLEAR_ERROR_GROUP_ADMIN',
  CLEAR_ERROR_IMPORT: 'CLEAR_ERROR_IMPORT',
  RESET_GROUP_ADMIN_PASSWORD: 'RESET_GROUP_ADMIN_PASSWORD',
  CLOSE_GROUP_ADMIN_PASSWORD: 'CLOSE_GROUP_ADMIN_PASSWORD',

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_GROUP_ADMIN_PASSWORD });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  closeResetPasswordGroupAdmin: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_GROUP_ADMIN_PASSWORD });
  },

  clearErrorImport: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ERROR_IMPORT });
  },

  setInitialPropsAdmin: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_ADMIN_GROUP_ADMINS });
  },

  importCsvFile: formData => async (dispatch) => {
    dispatch({ type: actions.IMPORT_CSV_GROUP_ADMINS_START });
    try {
      await request.post(`${URLS.groupsAdminsImport}`, formData);
      dispatch({ type: actions.IMPORT_CSV_GROUP_ADMINS_SUCCESS });
    } catch ({ response: { data } = {} }) {
      const error = data && data.errors;

      dispatch({ type: actions.IMPORT_CSV_GROUP_ADMINS_FAILURE, payload: error });
    }
  },

  deleteAdminGroupAdmins: id => async (dispatch) => {
    if (id) {
      try {
        const { data: { data } } = await request.put(`${URLS.groupAdmins}/${id}/close`);
        dispatch({ type: actions.DELETE_ADMIN_GROUP_ADMINS_SUCCESS, payload: data });
      } catch ({ response: { data } = {} }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.DELETE_ADMIN_GROUP_ADMINS_FAILURE, error });
      }
    }
  },

  editGroupAdmin: (formData, id) => async (dispatch) => {
    if (id) {
      try {
        dispatch({ type: actions.EDIT_ADMIN_GROUP_ADMINS_START });
        const { data: { data } } = await request.put(`${URLS.groupAdmins}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_ADMIN_GROUP_ADMINS_SUCCESS, payload: data });
      } catch (e) {
        const data = _.get(e, 'e.response.data', {});
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.EDIT_ADMIN_GROUP_ADMINS_FAILURE, error });
      }
    }
  },

  getCurrentAdminById: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupAdmins}/${id}`);
      dispatch({ type: actions.GET_CURRENT_ADMIN_GROUP_ADMIN, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentAdminId: id => (dispatch) => {
    if (id) {
      dispatch({ type: actions.SET_CURRENT_ADMIN_ID_GROUP_ADMINS, payload: id });
    }
  },

  searchAdminsGroupAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupAdminsSearch}?${queryString}`);
      dispatch({ type: actions.SEARCH_ADMINS_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  addGroupAdmin: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_GROUP_ADMIN_START });
      const { data: { data } } = await request.post(URLS.groupAdmins, formData, config);
      dispatch({ type: actions.ADD_GROUP_ADMIN_SUCCESS, payload: data });
      dispatch(actions.setInitStateGroupAdministrators());
      dispatch(cropActions.setInitStateCropImage());
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.ADD_GROUP_ADMIN_FAILURE, payload: error });
    }
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_GROUP_ADMINS, payload: file });
  },

  addInputFirstName: value => (dispatch) => {
    dispatch({ type: actions.ADD_FIRSTNAME_GROUP_ADMINS, payload: value });
  },

  addInputLastName: value => (dispatch) => {
    dispatch({ type: actions.ADD_LASTNAME_GROUP_ADMINS, payload: value });
  },

  addInputEmail: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_EMAIL_GROUP_ADMINS, payload: [`${value1}`, `${value2}`] });
  },

  addInputPhone: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_PHONE_GROUP_ADMINS, payload: [`${value1}`, `${value2}`] });
  },

  addInputLang: value => (dispatch) => {
    dispatch({ type: actions.ADD_LANGUAGE_GROUP_ADMINS, payload: value });
  },

  changeCheckbox: (value, name) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_GROUP_ADMINS, payload: { value, name } });
  },

  setCurrentNameLmsGroupGroupAdmins: name => (dispatch) => {
    if (name.length) {
      dispatch({ type: actions.SET_CURRENT_NAME_LMS_GROUP_GROUP_ADMINS, payload: name });
    }
  },

  setCurrentNameOrgGroupAdmins: name => (dispatch) => {
    if (name.length) {
      dispatch({ type: actions.SET_CURRENT_NAME_ORG_GROUP_ADMINS, payload: name });
    }
  },

  setCurrentLmsGroupIdGroupAdmins: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP_GROUP_ADMINS, payload: id }); }
  },

  setCurrentOrgIdGroupAdmins: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ORG_ID_GROUP_ADMINS, payload: id }); }
  },

  setCurrentGroupGroupAdmins: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_GROUP_ID_GROUP_ADMINS, payload: id }); }
  },

  searchLmsGroupsGroupAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_LMS_GROUPS_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchOrgGroupAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_ORG_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchGroupsGroupAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupsFindGroup}?${queryString}`);
      dispatch({ type: actions.SEARCH_GROUPS_GROUP_ADMINS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  toggleGroupsSwitch: id => (dispatch) => {
    if (id) {
      dispatch({ type: actions.TOGGLE_GROUPS_SWITCH, id });
    }
  },

  getTemplateFile: () => async (dispatch) => {
    dispatch({ type: actions.GET_TEMPLATE_GROUP_ADMINISTRATORS });
    const { data } = await request.get(URLS.groupAdminsGetTemplate);

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

  changeGroupAdminsState: payload => (dispatch) => {
    dispatch({ type: actions.CHANGE_GROUP_ADMIN_STATE, payload });
  },

  setInitialPropsFull: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_FULL_GROUP_ADMIN_STATE });
  },

  removeDownloadLink: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_DOWNLOAD_LINK_GROUP_ADMINS,
    });
  },

  setInitStateGroupAdministrators: () => (dispatch) => {
    dispatch({
      type: actions.SET_INIT_STATE_GROUP_ADMIN,
    });
  },

  setInitStateFullGroupAdministrators: () => (dispatch) => {
    dispatch({
      type: actions.SET_INIT_STATE_FULL_GROUP_ADMIN,
    });
  },

  clearSuccessResultGroupAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_RESULT_GROUP_ADMIN,
    });
  },

  clearErrorGroupAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERROR_GROUP_ADMIN,
    });
  },
};

export default actions;
