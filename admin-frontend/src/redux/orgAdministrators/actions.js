import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  getError,
  errorMessage,
} from 'helpers/utility';
import cropActions from 'redux/cropImageState/actions';
import searchOrgActions from 'redux/searchOrganisations/actions';
import { store } from '../store';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SET_INITIAL_PROPS_ORG_ADMINS: 'SET_INITIAL_PROPS_ORG_ADMINS',
  SET_INITIAL_FULL_PROPS_ORG_ADMINS: 'SET_INITIAL_FULL_PROPS_ORG_ADMINS',
  GET_TEMPLATE_ORG_ADMINS: 'GET_TEMPLATE_ORG_ADMINS',
  IMPORT_CSV_ORG_ADMINS_START: 'IMPORT_CSV_ORG_ADMINS_START',
  IMPORT_CSV_ORG_ADMINS_SUCCESS: 'IMPORT_CSV_ORG_ADMINS_SUCCESS',
  IMPORT_CSV_ORG_ADMINS_FAILURE: 'IMPORT_CSV_ORG_ADMINS_FAILURE',
  CHANGE_CHECKBOX_ORG_ADMINS: 'CHANGE_CHECKBOX_ORG_ADMINS',
  ADD_FIRSTNAME_ORG_ADMINS: 'ADD_FIRSTNAME_ORG_ADMINS',
  ADD_LASTNAME_ORG_ADMINS: 'ADD_LASTNAME_ORG_ADMINS',
  ADD_EMAIL_ORG_ADMINS: 'ADD_EMAIL_ORG_ADMINS',
  ADD_PHONE_ORG_ADMINS: 'ADD_PHONE_ORG_ADMINS',
  ADD_LANGUAGE_ORG_ADMINS: 'ADD_LANGUAGE_ORG_ADMINS',
  SEARCH_ORG_ADMINS: 'SEARCH_ORG_ADMINS',
  SEARCH_LMS_GROUP_ORG_ADMINS: 'SEARCH_LMS_GROUP_ORG_ADMINS',
  SET_CURRENT_ID_LMS_GROUP_ORG_ADMINS: 'SET_CURRENT_ID_LMS_GROUP_ORG_ADMINS',
  SET_CURRENT_NAME_LMS_GROUP_ORG_ADMINS: 'SET_CURRENT_NAME_LMS_GROUP_ORG_ADMINS',
  SET_CURRENT_ORG_ID_ORG_ADMINS: 'SET_CURRENT_ORG_ID_ORG_ADMINS',
  SET_CURRENT_ADMIN_ID_ORG_ADMINS: 'SET_CURRENT_ADMIN_ID_ORG_ADMINS',
  ADD_CROP_FILE_ORG_ADMINS: 'ADD_CROP_FILE_ORG_ADMINS',
  ADD_ORG_ADMIN_SUCCESS: 'ADD_ORG_ADMIN_SUCCESS',
  ADD_ORG_ADMIN_FAILURE: 'ADD_ORG_ADMIN_FAILURE',
  ADD_ORG_ADMIN_START: 'ADD_ORG_ADMIN_START',
  SEARCH_ADMINS_ORG_ADMINS: 'SEARCH_ADMINS_ORG_ADMINS',
  GET_CURRENT_ADMIN_ORG_ADMIN: 'GET_CURRENT_ADMIN_ORG_ADMIN',
  EDIT_ADMIN_ORG_ADMINS_START: 'EDIT_ADMIN_ORG_ADMINS_START',
  EDIT_ADMIN_ORG_ADMINS_SUCCESS: 'EDIT_ADMIN_ORG_ADMINS_SUCCESS',
  EDIT_ADMIN_ORG_ADMINS_FAILURE: 'EDIT_ADMIN_ORG_ADMINS_FAILURE',
  DELETE_ADMIN_ORG_ADMINS_SUCCESS: 'DELETE_ADMIN_ORG_ADMINS_SUCCESS',
  DELETE_ADMIN_ORG_ADMINS_FAILURE: 'DELETE_ADMIN_ORG_ADMINS_FAILURE',
  CHANGE_ORG_ADMINISTRATION_STATE: 'CHANGE_ORG_ADMINISTRATION_STATE',
  CLEAR_ERRORS_ORG_ADMINS: 'CLEAR_ERRORS_ORG_ADMINS',
  CLEAR_SUCCESS_RESULT_ORG_ADMIN: 'CLEAR_SUCCESS_RESULT_ORG_ADMIN',
  REMOVE_DOWNLOAD_LINK_ORG_ADMINS: 'REMOVE_DOWNLOAD_LINK_ORG_ADMINS',
  ORG_ADMINS_CLEAR_IMPORT_STATUSES: 'ORG_ADMINS_CLEAR_IMPORT_STATUSES',
  RESET_ORG_ADMIN_PASSWORD: 'RESET_ORG_ADMIN_PASSWORD',
  CLOSE_ORG_ADMIN_PASSWORD: 'CLOSE_ORG_ADMIN_PASSWORD',

  generateNewPassword: id => async (dispatch) => {
    try {
      await request.post(`${URLS.studentsGeneratePassword}/${id}`);
      dispatch({ type: actions.RESET_ORG_ADMIN_PASSWORD });
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  closeResetPasswordOrgAdmin: () => (dispatch) => {
    dispatch({ type: actions.CLOSE_ORG_ADMIN_PASSWORD });
  },

  clearImportStatuses: () => (dispatch) => {
    dispatch({ type: actions.ORG_ADMINS_CLEAR_IMPORT_STATUSES });
  },

  setInitialProps: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_ORG_ADMINS });
  },

  setInitialPropsFull: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_FULL_PROPS_ORG_ADMINS });
  },

  editOrgAdmin: (formData, id) => async (dispatch) => {
    if (id) {
      try {
        dispatch({ type: actions.EDIT_ADMIN_ORG_ADMINS_START });
        const { data: { data } } = await request.put(`${URLS.orgAdminsChangeAdmins}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_ADMIN_ORG_ADMINS_SUCCESS, payload: data });
        dispatch(actions.getCurrentAdminById(id));
      } catch ({ response: { data } = {} }) {
        const error = data && data.message;
        errorMessage(error.message);
        dispatch({ type: actions.EDIT_ADMIN_ORG_ADMINS_FAILURE, error });
      }
    }
  },

  setCurrentAdminId: id => (dispatch) => {
    if (id >= 0) dispatch({ type: actions.SET_CURRENT_ADMIN_ID_ORG_ADMINS, payload: id });
  },

  getCurrentAdminById: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.orgAdminsGetAdminById}/${id}`);
      dispatch({ type: actions.GET_CURRENT_ADMIN_ORG_ADMIN, payload: data });
      dispatch({ type: searchOrgActions.SET_SELECTED_ARRAY_ORG, payload: data.organisations });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  addOrgAdmin: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_ORG_ADMIN_START });
      const { data: { data } } = await request.post(URLS.orgAdmins, formData, config);
      dispatch({ type: actions.ADD_ORG_ADMIN_SUCCESS, payload: data });
      dispatch({ type: actions.SET_INITIAL_PROPS_ORG_ADMINS });
      dispatch(cropActions.setInitStateCropImage());
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(data && data.message);
      dispatch({ type: actions.ADD_ORG_ADMIN_FAILURE, payload: error });
    }
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_ORG_ADMINS, payload: file });
  },

  addInputFirstName: value => (dispatch) => {
    dispatch({ type: actions.ADD_FIRSTNAME_ORG_ADMINS, payload: value });
  },

  addInputLastName: value => (dispatch) => {
    dispatch({ type: actions.ADD_LASTNAME_ORG_ADMINS, payload: value });
  },

  addInputEmail: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_EMAIL_ORG_ADMINS, payload: [`${value1}`, `${value2}`] });
  },

  addInputPhone: (value1, value2) => (dispatch) => {
    dispatch({ type: actions.ADD_PHONE_ORG_ADMINS, payload: [`${value1}`, `${value2}`] });
  },

  addInputLang: value => (dispatch) => {
    dispatch({ type: actions.ADD_LANGUAGE_ORG_ADMINS, payload: value });
  },

  changeCheckbox: (value, name) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_ORG_ADMINS, payload: { value, name } });
  },

  searchOrgOrgAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_ORG_ADMINS, payload: data });
    } catch ({ response: { data } = {} }) {
      const error = data && data.message;
      errorMessage(error);
    }
  },

  searchLmsGroupsOrgAdmins: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_LMS_GROUP_ORG_ADMINS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentLmsGroupIdOrgAdmins: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP_ORG_ADMINS, payload: id }); }
  },

  setCurrentNameLmsGroupOrgAdmins: name => (dispatch) => {
    if (name.length) { dispatch({ type: actions.SET_CURRENT_NAME_LMS_GROUP_ORG_ADMINS, payload: name }); }
  },

  setCurrentOrgIdOrgAdmins: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ORG_ID_ORG_ADMINS, payload: id }); }
  },

  deleteAdminOrgAdmins: id => async (dispatch) => {
    if (id >= 0) {
      try {
        const { data: { data } } = await request.put(`${URLS.orgAdminsDeleteAdmin}/${id}/close`);
        dispatch({ type: actions.DELETE_ADMIN_ORG_ADMINS_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.DELETE_ADMIN_ORG_ADMINS_FAILURE, error });
      }
    }
  },

  getTemplateFile: () => async (dispatch) => {
    const { data } = await request.get(`${URLS.orgAdminsGetTemplate}`);

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'template.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    dispatch({ type: actions.GET_TEMPLATE_ORG_ADMINS });
  },

  importCsvFile: formData => async (dispatch) => {
    try {
      dispatch({ type: actions.IMPORT_CSV_ORG_ADMINS_START });
      const { data } = await request.post(`${URLS.orgAdminsImport}`, formData);
      dispatch({ type: actions.IMPORT_CSV_ORG_ADMINS_SUCCESS, payload: data });
    } catch ({ response: { data } = {} }) {
      const { selectedOrganisations } = store.getState().searchOrganisations;
      const error = data && data.error.includes('limit')
        ? `${data.error}. Current number of organization admins is ${selectedOrganisations[0].currentNumberOfAdmins} but max is ${selectedOrganisations[0].maxOrganisationAdmins}`
        : data.error;
      const errors = data && data.errors;
      errorMessage(error);
      dispatch({ type: actions.IMPORT_CSV_ORG_ADMINS_FAILURE, payload: { error, errors } });
    }
  },

  changeOrgAdminsState: ({ name, value }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_ORG_ADMINISTRATION_STATE,
      payload: { name, value },
    });
  },

  clearErrorOrgAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_ERRORS_ORG_ADMINS,
    });
  },

  clearSuccessResultOrgAdmins: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SUCCESS_RESULT_ORG_ADMIN,
    });
  },

  removeDownloadLink: () => (dispatch) => {
    dispatch({
      type: actions.REMOVE_DOWNLOAD_LINK_ORG_ADMINS,
    });
  },
};

export default actions;
