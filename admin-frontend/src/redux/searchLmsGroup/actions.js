import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  errorMessage,
} from 'helpers/utility';
import lmsGroupAdminsActions from '../lmsGroupAdmins/actions';

const actions = {
  GET_SEARCH_LMS_GROUP_START: 'GET_SEARCH_LMS_GROUP_START',
  GET_SEARCH_LMS_GROUP_FAIL: 'GET_SEARCH_LMS_GROUP_FAIL',
  GET_SEARCH_LMS_GROUP_SUCCESS: 'GET_SEARCH_LMS_GROUP_SUCCESS',
  SET_SEARCH_LMS_VALUE_SEARCH: 'SET_SEARCH_LMS_GROUP_VALUE_SEARCH',
  SET_SEARCH_DATE_END_GROUP_LMS: 'SET_SEARCH_DATE_END_GROUP_LMS',
  SET_IS_DEACTIVATED_SEARCH_LMS_GROUP: 'SET_IS_DEACTIVATED_SEARCH_LMS_GROUP',
  GET_SEARCH_LMS_GROUP_TOTAL_SUCCESS: 'GET_SEARCH_LMS_GROUP_TOTAL_SUCCESS',
  SET_INIT_STATE_SEARCH_LMS_GROUP: 'SET_INIT_STATE_SEARCH_LMS_GROUP',
  SET_LMS_GROUP_NAME_ORGANISATION_FIND: 'SET_LMS_GROUP_NAME_ORGANISATION_FIND',
  SET_LMS_GROUP_ID_ORGANISATION_FIND: 'SET_LMS_GROUP_ID_ORGANISATION_FIND',
  CLEAR_SEARCH_LMS_ADMINS: 'CLEAR_SEARCH_LMS_ADMINS',
  ADD_TO_SELECTED_LMS_GROUPS: 'ADD_TO_SELECTED_LMS_GROUPS',
  SELECT_COURSE_LMS_GROUPS_PERMISSION: 'SELECT_COURSE_LMS_GROUPS_PERMISSION',
  CHANGE_LMS_GROUPS_PERMISSION: 'CHANGE_LMS_GROUPS_PERMISSION',
  SELECT_ALL_LMS_GROUP: 'SELECT_ALL_LMS_GROUP',
  CLEAR_ALL_LMS_GROUP: 'CLEAR_ALL_LMS_GROUP',

  selectAllLmsGroup: () => (dispatch) => {
    dispatch({ type: actions.SELECT_ALL_LMS_GROUP });
  },

  clearAllLmsGroup: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ALL_LMS_GROUP });
  },

  changeLmsGroupsPermission: (newRow, index) => (dispatch) => {
    dispatch({ type: actions.CHANGE_LMS_GROUPS_PERMISSION, payload: { newRow, index } });
  },

  clearSearchLmsAdmins: () => (dispatch) => {
    dispatch(lmsGroupAdminsActions.clearAdmins());
    dispatch({ type: actions.CLEAR_SEARCH_LMS_ADMINS });
  },
  getLmsGroupsPermission: params => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(
        URLS.coursesLmsGroupsPermission,
        { params },
      );
      dispatch({
        type: actions.SELECT_COURSE_LMS_GROUPS_PERMISSION,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  addToSelectedLmsGrops: id => (dispatch) => {
    dispatch({ type: actions.ADD_TO_SELECTED_LMS_GROUPS, payload: id });
  },

  getLmsGroups: (payload, isFinish) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_SEARCH_LMS_GROUP_START, payload: isFinish });
      const { data: { data } } = await request.get(URLS.lmsGroupsGet, { params: { ...payload } });

      if (isFinish) {
        dispatch({ type: actions.GET_SEARCH_LMS_GROUP_TOTAL_SUCCESS, payload: data });

        return;
      }

      const rebuildData = data.map(item => ({ title: item.name }));
      dispatch({ type: actions.GET_SEARCH_LMS_GROUP_SUCCESS, payload: rebuildData });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.GET_SEARCH_LMS_GROUP_FAIL, payload: err });
    }
  },

  setSearchValueLmsGroup: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_LMS_VALUE_SEARCH, payload });
  },

  setSearchDate: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_DATE_END_GROUP_LMS, payload });
  },

  setIsDeactivated: payload => (dispatch) => {
    dispatch({ type: actions.SET_IS_DEACTIVATED_SEARCH_LMS_GROUP, payload });
  },

  setInitStateSearchLmsGroup: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_SEARCH_LMS_GROUP });
  },

  setNameLmsGroupName: name => (dispatch) => {
    dispatch({ type: actions.SET_LMS_GROUP_NAME_ORGANISATION_FIND, payload: name });
  },

  setNameLmsGroupId: id => (dispatch) => {
    dispatch({ type: actions.SET_LMS_GROUP_ID_ORGANISATION_FIND, payload: id });
  },
};
export default actions;
