import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  errorMessage,
} from 'helpers/utility';

const actions = {
  SET_SEARCH_ORGANISATIONS_SUCCESS:'SET_SEARCH_ORGANISATIONS_SUCCESS',
  GET_SEARCH_ORGANISATIONS_START: 'GET_SEARCH_ORGANISATIONS_START',
  GET_SEARCH_ORGANISATIONS_FAIL: 'GET_SEARCH_ORGANISATIONS_FAIL',
  GET_SEARCH_ORGANISATIONS_SUCCESS: 'GET_SEARCH_ORGANISATIONS_SUCCESS',
  SET_SEARCH_ORGANISATIONS_VALUE_SEARCH: 'SET_SEARCH_ORGANISATIONS_VALUE_SEARCH',
  SET_SEARCH_DATE_END_ORGANISATIONS: 'SET_SEARCH_DATE_END_ORGANISATIONS',
  SET_IS_DEACTIVATED_SEARCH_ORGANISATIONS: 'SET_IS_DEACTIVATED_SEARCH_ORGANISATIONS',
  GET_SEARCH_ORGANISATIONS_TOTAL_SUCCESS: 'GET_SEARCH_ORGANISATIONS_TOTAL_SUCCESS',
  SET_INIT_STATE_SEARCH_ORGANISATIONS: 'SET_INIT_STATE_SEARCH_ORGANISATIONS',
  SET_ORGANISATION_NAME_FIND: 'SET_ORGANISATION_NAME_FIND',
  SET_ORGANISATION_ID_FIND: 'SET_ORGANISATION_ID_FIND',
  SET_INIT_STATE_ORG: 'SET_INIT_STATE_ORG',
  ADD_TO_SELECTED_ARRAY_ORG: 'ADD_TO_SELECTED_ARRAY_ORG',
  CLEAR_SELECTED_ARRAY_ORG: 'CLEAR_SELECTED_ARRAY_ORG',
  REMOVE_ITEM_FROM_ORG_ARRAY: 'REMOVE_ITEM_FROM_ORG_ARRAY',
  SET_INIT_STATE_FULL_ORG: 'SET_INIT_STATE_FULL_ORG',
  CHANGE_STATE_PERSON_SEARCH_ORG: 'CHANGE_STATE_PERSON_SEARCH_ORG',
  SEARCH_ADMINS_ORG_ADMINS: 'SEARCH_ADMINS_ORG_ADMINS',
  SEARCH_ORG_ADMINS_SUCCESS: 'SEARCH_ORG_ADMINS_SUCCESS',
  SEARCH_ORG_ADMINS_START: 'SEARCH_ORG_ADMINS_START',
  SEARCH_ORG_ADMINS_FAIL: 'SEARCH_ORG_ADMINS_FAIL',
  SET_SELECTED_ARRAY_ORG: 'SET_SELECTED_ARRAY_ORG',
  CLEAR_SEARCH_ORGS: 'CLEAR_SEARCH_ORGS',
  SET_SEARCH_ORGANISATION_NAME: 'SET_SEARCH_ORGANISATION_NAME',
  SET_SEARCH_ORGANISATION_ID: 'SET_SEARCH_ORGANISATION_ID',
  ADD_TO_SELECTED_ORGANISATION: 'ADD_TO_SELECTED_ORGANISATION',
  CLEAR_SEARCH_DATA_ORGANISATION: 'CLEAR_SEARCH_DATA_ORGANISATION',
  SELECT_COURSE_ORGANISATION_PERMISSION: 'SELECT_COURSE_ORGANISATION_PERMISSION',
  CHANGE_ORGANISATION_PERMISSION: 'CHANGE_ORGANISATION_PERMISSION',
  SELECT_ALL_ORGANISATION: 'SELECT_ALL_ORGANISATION',
  CLEAR_ALL_ORGANISATION: 'CLEAR_ALL_ORGANISATION',

  selectAllOrganisation: () => (dispatch) => {
    dispatch({ type: actions.SELECT_ALL_ORGANISATION });
  },

  clearAllOrganisation: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ALL_ORGANISATION });
  },

  changeOrganisationPermission: (newRow, index) => (dispatch) => {
    dispatch({ type: actions.CHANGE_ORGANISATION_PERMISSION, payload: { newRow, index } });
  },
  getOrganisationPermission: params => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(
        URLS.coursesOrganisationPermission,
        { params },
      );
      dispatch({
        type: actions.SELECT_COURSE_ORGANISATION_PERMISSION,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },
  setIdSearchOrganisation: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_ORGANISATION_ID, payload: id });
  },
  setNameSearchOrganisation: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_ORGANISATION_NAME, payload: id });
  },
  addToSelectedOrganisation: id => (dispatch) => {
    dispatch({ type: actions.ADD_TO_SELECTED_ORGANISATION, payload: id });
  },
  clearSearchDataOrganisation: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_DATA_ORGANISATION });
  },

  clearSearchOrg: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_ORGS });
  },

  getOrganisations: (payload, isFinish) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_SEARCH_ORGANISATIONS_START, payload: isFinish });
      const { data: { data } } = await request.get(URLS.organisationsGet, { params: { ...payload } });

      if (isFinish) {
        dispatch({ type: actions.GET_SEARCH_ORGANISATIONS_TOTAL_SUCCESS, payload: data });

        return;
      }

      const rebuildData = data.map(item => ({ title: item.name }));
      dispatch({ type: actions.GET_SEARCH_ORGANISATIONS_SUCCESS, payload: rebuildData });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.GET_SEARCH_ORGANISATIONS_FAIL, payload: err });
    }
  },

  setOrganisationsFromOrgAdmin: (payload) => async (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_ORGANISATIONS_SUCCESS, payload });
    dispatch({ type: actions.ADD_TO_SELECTED_ORGANISATION, payload: payload[0].id });
  },

  setSearchValueOrganisations: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_ORGANISATIONS_VALUE_SEARCH, payload });
  },

  setSearchDate: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_DATE_END_ORGANISATIONS, payload });
  },

  setIsDeactivated: payload => (dispatch) => {
    dispatch({ type: actions.SET_IS_DEACTIVATED_SEARCH_ORGANISATIONS, payload });
  },

  setNameOrganisationName: name => (dispatch) => {
    dispatch({ type: actions.SET_ORGANISATION_NAME_FIND, payload: name });
  },

  setNameOrganisationId: id => (dispatch) => {
    dispatch({ type: actions.SET_ORGANISATION_ID_FIND, payload: id });
  },

  addToSelectedOrg: org => (dispatch) => {
    dispatch({
      type: actions.ADD_TO_SELECTED_ARRAY_ORG,
      payload: org,
    });
  },

  clearSelectedArrayOrg: () => (dispatch) => {
    dispatch({
      type: actions.CLEAR_SELECTED_ARRAY_ORG,
    });
  },

  removeItemFromOrg: id => (dispatch) => {
    dispatch({
      type: actions.REMOVE_ITEM_FROM_ORG_ARRAY,
      payload: id,
    });
  },

  setInitStateOrg: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_ORG });
  },

  setInitStateFullOrg: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_FULL_ORG });
  },

  changeStatePersonSearchOrg: ({ name, value }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_STATE_PERSON_SEARCH_ORG,
      payload: { name, value },
    });
  },

  searchOrgAdmins: body => async (dispatch) => {
    try {
      dispatch({ type: actions.SEARCH_ORG_ADMINS_START });
      const { data: { data } } = await request.get(`${URLS.orgAdminsSearchAdmin}`, { params: body });
      dispatch({ type: actions.SEARCH_ORG_ADMINS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.SEARCH_ORG_ADMINS_FAIL });
    }
  },
};
export default actions;
