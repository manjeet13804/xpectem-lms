import request from 'components/restApi';
import URLS from 'redux/urls';
import cropImageActions from 'redux/cropImageState/actions';
import { errorMessage, getError } from 'helpers/utility';
import { getServerError, getErrorMessage } from '../../utils';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  ADD_INPUT_LMS_GROUP: 'ADD_INPUT_LMS_GROUP',
  ADD_INPUT_MAX_VALUES_LMS_GROUP: 'ADD_INPUT_MAX_VALUES_LMS_GROUP',
  CHANGE_CHECKBOX_LMS_GROUP: 'CHANGE_CHECKBOX_LMS_GROUP',
  ADD_CROP_FILE_LMS_GROUP: 'ADD_CROP_FILE_LMS_GROUP',
  CHANGE_DESCRIPTION_LMS_GROUP: 'CHANGE_DESCRIPTION_LMS_GROUP',
  ADD_DATE_LMS_GROUP: 'ADD_DATE_LMS_GROUP',
  SET_INITIAL_PROPS_LMS_GROUP: 'SET_INITIAL_PROPS_LMS_GROUP',
  SET_INITIAL_PROPS_CURRENT_LMS_GROUP: 'SET_INITIAL_PROPS_CURRENT_LMS_GROUP',
  ADD_LMS_GROUP_SUCCESS: 'ADD_LMS_GROUP_SUCCESS',
  ADD_LMS_GROUP_FAILURE: 'ADD_LMS_GROUP_FAILURE',
  EDIT_LMS_GROUP_START: 'EDIT_LMS_GROUP_START',
  EDIT_LMS_GROUP_SUCCESS: 'EDIT_LMS_GROUP_SUCCESS',
  EDIT_LMS_GROUP_FAILURE: 'EDIT_LMS_GROUP_FAILURE',
  DELETE_LMS_GROUP_SUCCESS: 'DELETE_LMS_GROUP_SUCCESS',
  DELETE_LMS_GROUP_FAILURE: 'DELETE_LMS_GROUP_FAILURE',
  SEARCH_LMS_GROUP: 'SEARCH_LMS_GROUP',
  SET_CURRENT_ID_LMS_GROUP: 'SET_CURRENT_ID_LMS_GROUP',
  GET_LMS_GROUP_BY_ID_START: 'GET_LMS_GROUP_BY_ID_START',
  GET_LMS_GROUP_BY_ID_FAIL: 'GET_LMS_GROUP_BY_ID_FAIL',
  GET_LMS_GROUP_BY_ID_SUCCESS: 'GET_LMS_GROUP_BY_ID_SUCCESS',
  ADD_LMS_GROUP_START: 'ADD_LMS_GROUP_START',
  REMOVE_DOWNLOAD_LINK_IMG: 'REMOVE_DOWNLOAD_LINK_IMG',
  SET_SUCCESS_RESULT: 'SET_SUCCESS_RESULT',
  CHANGE_FIELD: 'CHANGE_FIELD',

  changeField: (name, value) => (dispatch) => {
    dispatch({ type: actions.CHANGE_FIELD, payload: { name, value } });
  },

  removeDownloadLink: () => (dispatch) => {
    dispatch({ type: actions.REMOVE_DOWNLOAD_LINK_IMG });
  },

  setInitialProps: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_LMS_GROUP });
  },

  setInitialPropsLmsGroup: () => (dispatch) => {
    dispatch({ type: actions.SET_INITIAL_PROPS_CURRENT_LMS_GROUP });
  },

  addInputLmsGroupName: value => (dispatch) => {
    dispatch({ type: actions.ADD_INPUT_LMS_GROUP, payload: value });
  },

  addInputMaxValues: (value, name) => (dispatch) => {
    dispatch({ type: actions.ADD_INPUT_MAX_VALUES_LMS_GROUP, payload: { value, name } });
  },

  changeCheckbox: (value, name) => (dispatch) => {
    dispatch({ type: actions.CHANGE_CHECKBOX_LMS_GROUP, payload: { value, name } });
  },

  addCropFile: file => (dispatch) => {
    dispatch({ type: actions.ADD_CROP_FILE_LMS_GROUP, payload: file });
  },

  changeDescription: (value, name, lang) => (dispatch) => {
    dispatch({ type: actions.CHANGE_DESCRIPTION_LMS_GROUP, payload: { value, name, lang } });
  },

  addDate: date => (dispatch) => {
    dispatch({ type: actions.ADD_DATE_LMS_GROUP, payload: date });
  },

  addLmsGroup: (formData, action) => async (dispatch) => {
    try {
      dispatch({ type: actions.ADD_LMS_GROUP_START });
      const { data: { data } } = await request.post(URLS.lmsGroupsAdd, formData, config);
      dispatch({ type: actions.ADD_LMS_GROUP_SUCCESS, payload: data });
      action();
      dispatch(cropImageActions.setInitStateCropImage());
    } catch (e) {
      const error = getServerError(e);
      errorMessage(error);
      dispatch({ type: actions.ADD_LMS_GROUP_FAILURE });
    }
  },

  searchLmsGroups: queryString => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupsGet}?${queryString}`);
      dispatch({ type: actions.SEARCH_LMS_GROUP, payload: data });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error.message);
    }
  },

  setCurrentLmsGroupId: id => async (dispatch) => {
    if (id >= 0) dispatch({ type: actions.SET_CURRENT_ID_LMS_GROUP, payload: id });
  },

  getCurrentLmsGroup: id => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_LMS_GROUP_BY_ID_START });
      const { data: { data } } = await request.get(`${URLS.lmsGroupsGet}/${id}`);

      dispatch({ type: actions.GET_LMS_GROUP_BY_ID_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.GET_LMS_GROUP_BY_ID_FAIL });
      const error = getErrorMessage(e);
      errorMessage(error);
    }
  },

  editLmsGroup: (formData, id) => async (dispatch) => {
    if (id >= 0) {
      try {
        dispatch({ type: actions.EDIT_LMS_GROUP_START });
        const { data: { data } } = await request.put(`${URLS.lmsGroupsPut}/${id}`, formData, config);
        dispatch({ type: actions.EDIT_LMS_GROUP_SUCCESS, payload: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.EDIT_LMS_GROUP_FAILURE, error });
      }
    }
  },

  deleteLmsGroup: (id, history) => async (dispatch) => {
    if (id >= 0) {
      try {
        const urlCurrentGroup = `${URLS.lmsGroupsDeleteUrl}/${id}/confirm`;
        const { data: { data } } = await request.delete(`${URLS.lmsGroupDelete}/${id}`);
        dispatch({ type: actions.DELETE_LMS_GROUP_SUCCESS, payload: data });
        history.push(urlCurrentGroup);
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error.message);
        dispatch({ type: actions.DELETE_LMS_GROUP_FAILURE, error });
      }
    }
  },
  setResult: payload => dispatch => dispatch({
    type: actions.SET_SUCCESS_RESULT,
    payload,
  }),
};

export default actions;
