import request from 'components/restApi';
import URLS from 'redux/urls';
import _ from 'lodash';
import { errorMessage } from 'helpers/utility';

const actions = {
  ADD_INPUT_GROUP_GROUPS: 'ADD_INPUT_GROUP_GROUPS',
  CHANGE_DESCRIPTION_GROUPS: 'CHANGE_DESCRIPTION_GROUPS',
  ADD_GROUP_GROUPS_START: 'ADD_GROUP_GROUPS_START',
  ADD_GROUP_GROUPS_SUCCESS: 'ADD_GROUP_GROUPS_SUCCESS',
  ADD_GROUP_GROUPS_FAILURE: 'ADD_GROUP_GROUPS_FAILURE',
  SET_CURRENT_NAME_ORG_GROUPS: 'SET_CURRENT_NAME_ORG_GROUPS',
  SEARCH_GROUPS_GROUPS: 'SEARCH_GROUPS_GROUPS',
  SET_CURRENT_GROUP_ID_GROUPS: 'SET_CURRENT_GROUP_ID_GROUPS',
  GET_CURRENT_GROUP_SUCCESS: 'GET_CURRENT_GROUP_SUCCESS',
  GET_CURRENT_GROUP_FAILURE: 'GET_CURRENT_GROUP_FAILURE',
  EDIT_GROUP_GROUPS_SUCCESS: 'EDIT_GROUP_GROUPS_SUCCESS',
  EDIT_GROUP_GROUPS_FAILURE: 'EDIT_GROUP_GROUPS_FAILURE',
  DELETE_GROUP_GROUPS_SUCCESS: 'DELETE_GROUP_GROUPS_SUCCESS',
  DELETE_GROUP_GROUPS_FAILURE: 'DELETE_GROUP_GROUPS_FAILURE',
  IMPORT_CSV_GROUPS_START: 'IMPORT_CSV_GROUPS_START',
  IMPORT_CSV_GROUPS_SUCCESS: 'IMPORT_CSV_GROUPS_SUCCESS',
  IMPORT_CSV_GROUPS_FAILURE: 'IMPORT_CSV_GROUPS_FAILURE',
  GET_TEMPLATE_GROUPS: 'GET_TEMPLATE_GROUPS',
  SET_CURRENT_ORG_ID_GROUPS: 'SET_CURRENT_ORG_ID_GROUPS',
  SEARCH_ORG_GROUPS: 'SEARCH_ORG_GROUPS',
  CLEAR_SUCCESS_RESULT_GROUPS: 'CLEAR_SUCCESS_RESULT_GROUPS',
  SET_INIT_STATE_GROUPS: 'SET_INIT_STATE_GROUPS',
  GET_CURRENT_GROUP_START: 'GET_CURRENT_GROUP_START',
  EDIT_GROUP_GROUPS_START: 'EDIT_GROUP_GROUPS_START',
  SET_INIT_STATE_FULL_GROUPS: 'SET_INIT_STATE_FULL_GROUPS',
  CHANGE_INFO_GROUP: 'CHANGE_INFO_GROUP',
  CLEAR_RESULTS: 'CLEAR_RESULTS_IMPORT_GROUPS',

  clearResults: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_RESULTS });
  },

  changeInfoGroup: (name, value) => (dispatch) => {
    dispatch({ type: actions.CHANGE_INFO_GROUP, payload: { name, value } });
  },

  importCsvFileGroups: formData => async (dispatch) => {
    dispatch({ type: actions.IMPORT_CSV_GROUPS_START });
    try {
      await request.post(`${URLS.groupsImportApi}`, formData);
      dispatch({ type: actions.IMPORT_CSV_GROUPS_SUCCESS });
    } catch ({ response: { data } = {} }) {
      const error = _.get(data, 'error.error', '');
      const errors = _.get(data, 'error.errors', []);
      errorMessage(error);
      dispatch({ type: actions.IMPORT_CSV_GROUPS_FAILURE, payload: { error, errors } });
    }
  },

  deleteGroup: id => async (dispatch) => {
    if (id) {
      try {
        const { data: { data } } = await request.delete(`${URLS.groupsDeleteApi}/${id}`);
        dispatch({ type: actions.DELETE_GROUP_GROUPS_SUCCESS, payload: data });
      } catch ({ response: { data } = {} }) {
        const error = data && data.error;
        errorMessage(data && data.message);
        dispatch({ type: actions.DELETE_GROUP_GROUPS_FAILURE, error });
      }
    }
  },

  editGroup: (body, id) => async (dispatch) => {
    if (id) {
      try {
        dispatch({ type: actions.EDIT_GROUP_GROUPS_START });
        const { data: { data } } = await request.put(`${URLS.groupsPut}/${id}`, body);
        dispatch({ type: actions.EDIT_GROUP_GROUPS_SUCCESS, payload: data });
        dispatch({ type: actions.GET_CURRENT_GROUP_SUCCESS, payload: data });
      } catch ({ response: { data } = {} }) {
        const error = data && data.error;
        errorMessage(data && data.message);
        dispatch({ type: actions.EDIT_GROUP_GROUPS_FAILURE, error });
      }
    }
  },

  getCurrentGroup: id => async (dispatch) => {
    try {
      if (id) {
        dispatch({ type: actions.GET_CURRENT_GROUP_START });
        const { data: { data } } = await request.get(`${URLS.groupsGet}/${id}`);
        dispatch({ type: actions.GET_CURRENT_GROUP_SUCCESS, payload: data });
      }
    } catch ({ response: { data } = {} }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.GET_CURRENT_GROUP_FAILURE, error });
    }
  },

  addInputGroupNameGroups: value => (dispatch) => {
    dispatch({ type: actions.ADD_INPUT_GROUP_GROUPS, payload: value });
  },

  changeDescriptionGroups: (value, name, lang) => (dispatch) => {
    dispatch({ type: actions.CHANGE_DESCRIPTION_GROUPS, payload: { value, name, lang } });
  },

  addGroupGroups: (body, successCallback) => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_GROUP_GROUPS_START });
      const { data: { data } } = await request.post(URLS.groupsAddGroup, body);
      dispatch({ type: actions.ADD_GROUP_GROUPS_SUCCESS, payload: data });
      dispatch({ type: actions.SET_INIT_STATE_GROUPS });
      successCallback();
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(data && data.message);
      dispatch({ type: actions.ADD_GROUP_GROUPS_FAILURE, error });
    }
  },

  searchGroupsGroups: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.groupsFindGroup}?${queryString}`);
      dispatch({ type: actions.SEARCH_GROUPS_GROUPS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  setCurrentNameOrgGroups: name => (dispatch) => {
    if (name.length) { dispatch({ type: actions.SET_CURRENT_NAME_ORG_GROUPS, payload: name }); }
  },

  setCurrentOrgIdGroups: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_ORG_ID_GROUPS, payload: id }); }
  },

  setCurrentGroupIdGroups: id => (dispatch) => {
    if (id) { dispatch({ type: actions.SET_CURRENT_GROUP_ID_GROUPS, payload: id }); }
  },

  searchOrgGroups: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.organisationsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_ORG_GROUPS, payload: data });
    } catch ({ response: { data } }) {
      const error = data && data.error;
      errorMessage(error);
    }
  },

  getTemplateFile: () => async (dispatch) => {
    dispatch({ type: actions.GET_TEMPLATE_GROUPS });
    const { data } = await request.get(URLS.groupsGetTemplate);

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

  clearSuccessResult: () => dispatch => dispatch({
    type: actions.CLEAR_SUCCESS_RESULT_GROUPS,
  }),

  setInitStateGroups: () => dispatch => dispatch({
    type: actions.SET_INIT_STATE_GROUPS,
  }),

  setInitStateFullGroups: () => dispatch => dispatch({
    type: actions.SET_INIT_STATE_FULL_GROUPS,
  }),
};

export default actions;
