import request from 'components/restApi';
import URLS from 'redux/urls';
import { errorMessage, getError } from 'helpers/utility';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  ADD_CROP_FILE_ORG: 'ADD_CROP_FILE_ORG',
  ADD_INPUT_ORG: 'ADD_INPUT_ORG',
  SEARCH_ORG: 'SEARCH_ORG',
  SEARCH_LMS_GROUP_ORG: 'SEARCH_LMS_GROUP_ORG',
  SET_CURRENT_ID_LMS_GROUP_ORG: 'SET_CURRENT_ID_LMS_GROUP_ORG',
  SET_CURRENT_NAME_LMS_GROUP_ORG: 'SET_CURRENT_NAME_LMS_GROUP_ORG',
  SET_CURRENT_ORG_ID: 'SET_CURRENT_ORG_ID',
  SET_INITIAL_PROPS_ORG: 'SET_INITIAL_PROPS_ORG',
  CHANGE_DESCRIPTION_ORG: 'CHANGE_DESCRIPTION_ORG',
  CHANGE_CHECKBOX_ORG: 'CHANGE_CHECKBOX_ORG',
  ADD_ORG_START: 'ADD_ORG_START',
  ADD_ORG_SUCCESS: 'ADD_ORG_SUCCESS',
  ADD_ORG_FAILURE: 'ADD_ORG_FAILURE',
  GET_LMS_GROUP_BY_ID_ORG: 'GET_LMS_GROUP_BY_ID_ORG',
  GET_CURRENT_ORG_START: 'GET_CURRENT_ORG_START',
  GET_CURRENT_ORG_SUCCESS: 'GET_CURRENT_ORG_SUCCESS',
  GET_CURRENT_ORG_FAILURE: 'GET_CURRENT_ORG_FAILURE',
  EDIT_ORG_START: 'EDIT_ORG_START',
  EDIT_ORG_SUCCESS: 'EDIT_ORG_SUCCESS',
  EDIT_ORG_FAILURE: 'EDIT_ORG_FAILURE',
  DELETE_ORG_SUCCESS: 'DELETE_ORG_SUCCESS',
  DELETE_ORG_FAILURE: 'DELETE_ORG_FAILURE',
  REMOVE_DOWNLOAD_LINK_IMG: 'REMOVE_DOWNLOAD_LINK_IMG_ORG',
  SET_INIT_STATE_ORGANISATION_AFTER_ADD: 'SET_INIT_STATE_ORGANISATION_AFTER_ADD',
  SET_INIT_STATE_ORGANISATION: 'SET_INIT_STATE_ORGANISATION',
  CLEAR_RESULT_STATUS_OPERATION_ORGANISATIONS: 'CLEAR_RESULT_STATUS_OPERATION_ORGANISATIONS',


  setInitialProps: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_ORG });
  },

  removeDownloadLink: () => (dispatch) => {
    dispatch({ type: actions.REMOVE_DOWNLOAD_LINK_IMG });
  },

  editOrg: (formData, id) => async (dispatch) => {
    if (id) {
      try {
        dispatch({ type: actions.EDIT_ORG_START });
        const { data: { data } } = await request.put(`${URLS.organisationsGet}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_ORG_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = data && data.error;
        errorMessage(data && data.message);
        dispatch({ type: actions.EDIT_ORG_FAILURE, error });
      }
    }
  },

  getCurrentOrg: id => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_CURRENT_ORG_START });
      const { data: { data } } = await request.get(`${URLS.organisationsGet}/${id}`);
      dispatch({ type: actions.GET_CURRENT_ORG_SUCCESS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.GET_CURRENT_ORG_FAILURE, error });
    }
  },

  getCurrentLmsGroupById: id => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupsGet}/${id}`);
      dispatch({ type: actions.GET_LMS_GROUP_BY_ID_ORG, payload: data });
    } catch ({ response: { data } }) {
      errorMessage(getError(data).message);
    }
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_ORG, payload: file });
  },

  addInputOrgName: value => (dispatch) => {
    dispatch({ type: actions.ADD_INPUT_ORG, payload: value });
  },

  addOrganisation: (formData, action) => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_ORG_START });
      const { data: { data } } = await request.post(URLS.organisationsAdd, formData, config);
      dispatch({ type: actions.ADD_ORG_SUCCESS, payload: data });
      action();
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.ADD_ORG_FAILURE, error });
    }
  },

  searchLmsGroups: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupAdminsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_LMS_GROUP_ORG, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  searchOrg: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_ORG, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentLmsGroupIdOrg: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP_ORG, payload: id }); }
  },

  setCurrentNameLmsGroupOrg: name => (dispatch) => {
    if (name.length) { dispatch({ type: actions.SET_CURRENT_NAME_LMS_GROUP_ORG, payload: name }); }
  },

  setCurrentOrgId: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ORG_ID, payload: id }); }
  },

  changeDescription: (value, name, lang) => (dispatch) => {
    dispatch({ type: actions.CHANGE_DESCRIPTION_ORG, payload: { value, name, lang } });
  },

  changeCheckbox: (value, name) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_ORG, payload: { value, name } });
  },

  deleteOrg: id => async (dispatch) => {
    if (id) {
      try {
        const { data: { data } } = await request.delete(`${URLS.organisationsDelete}/${id}`);
        dispatch({ type: actions.DELETE_ORG_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.DELETE_ORG_FAILURE, error });
      }
    }
  },

  setInitStateOrganisations: () => dispatch => dispatch({
    type: actions.SET_INIT_STATE_ORGANISATION,
  }),

  setInitStateOrganisationsAfterAdd: () => dispatch => dispatch({
    type: actions.SET_INIT_STATE_ORGANISATION_AFTER_ADD,
  }),

  clearSuccessResultOrganisations: () => dispatch => dispatch({
    type: actions.CLEAR_RESULT_STATUS_OPERATION_ORGANISATIONS,
  }),
};

export default actions;
