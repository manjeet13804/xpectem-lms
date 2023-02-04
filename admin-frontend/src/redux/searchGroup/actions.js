import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  errorMessage,
} from 'helpers/utility';

const actions = {
  GET_SEARCH_GROUP_START: 'GET_SEARCH_GROUP_START',
  GET_SEARCH_GROUP_FAIL: 'GET_SEARCH_GROUP_FAIL',
  GET_SEARCH_GROUP_SUCCESS: 'GET_SEARCH_GROUP_SUCCESS',
  SET_SEARCH_VALUE_SEARCH: 'SET_SEARCH_GROUP_VALUE_SEARCH',
  SET_SEARCH_DATE_END_GROUP: 'SET_SEARCH_DATE_END_GROUP',
  SET_IS_DEACTIVATED_SEARCH_GROUP: 'SET_IS_DEACTIVATED_SEARCH_GROUP',
  GET_SEARCH_GROUP_TOTAL_SUCCESS: 'GET_SEARCH_GROUP_TOTAL_SUCCESS',
  SET_INIT_STATE_SEARCH_GROUP: 'SET_INIT_STATE_SEARCH_GROUP',
  SET_SEARCH_GROUP_NAME: 'SET_SEARCH_GROUP_NAME',
  SET_SEARCH_GROUP_ID: 'SET_SEARCH_GROUP_ID',
  ADD_TO_SELECTED_GROUPS: 'ADD_TO_SELECTED_GROUPS',
  REMOVE_ITEM_FROM_SELECTED_GROUP: 'REMOVE_ITEM_FROM_SELECTED_GROUP',
  CHANGE_STATE_PERSON_SEARCH_GROUP: 'CHANGE_STATE_PERSON_SEARCH_GROUP',
  SEARCH_GROUP_ADMINS_START: 'SEARCH_GROUP_ADMINS_START',
  SEARCH_GROUP_ADMINS_FAIL: 'SEARCH_GROUP_ADMINS_FAIL',
  SEARCH_GROUP_ADMINS_SUCCESS: 'SEARCH_GROUP_ADMINS_SUCCESS',
  SET_INIT_STATE_WITHOUT_SELECTED_GROUPS: 'SET_INIT_STATE_WITHOUT_SELECTED_GROUPS',
  CLEAR_SEARCH_DATA: 'CLEAR_SEARCH_DATA',
  SET_SELECTED_GROUPS: 'SET_SELECTED_GROUPS',
  SELECT_ALL: 'SELECT_ALL',
  CLEAR_ALL_GROUPS: 'CLEAR_ALL_GROUPS',

  clearSearchDataGroups: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_SEARCH_DATA });
  },
  selectAllGroups: () => (dispatch) => {
    dispatch({ type: actions.SELECT_ALL });
  },
  clearAllGroups: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_ALL_GROUPS });
  },

  getGroups: (payload, isFinish) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_SEARCH_GROUP_START, payload: isFinish });
      const { data: { data } } = await request.get(URLS.groupsFindGroup, { params: { ...payload } });
      if (isFinish) {
        dispatch({ type: actions.GET_SEARCH_GROUP_TOTAL_SUCCESS, payload: data });

        return;
      }

      const rebuildData = data.map(item => ({ title: item.name, id: item.id }));
      dispatch({ type: actions.GET_SEARCH_GROUP_SUCCESS, payload: rebuildData });
    } catch (err) {
      errorMessage(err.message);
      dispatch({ type: actions.GET_SEARCH_GROUP_FAIL, payload: err });
    }
  },

  setSearchValueGroup: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_VALUE_SEARCH, payload });
  },

  setSearchDate: payload => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_DATE_END_GROUP, payload });
  },

  setIsDeactivated: payload => (dispatch) => {
    dispatch({ type: actions.SET_IS_DEACTIVATED_SEARCH_GROUP, payload });
  },

  setInitStateSearchGroup: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_SEARCH_GROUP });
  },

  setInitStateWithoutSelectedGroups: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_WITHOUT_SELECTED_GROUPS });
  },

  setNameSearchGroup: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_GROUP_NAME, payload: id });
  },

  setSelectedGroups: groups => (dispatch) => {
    dispatch({ type: actions.SET_SELECTED_GROUPS, payload: groups });
  },

  setIdSearchGroup: id => (dispatch) => {
    dispatch({ type: actions.SET_SEARCH_GROUP_ID, payload: id });
  },

  addToSelectedGroups: id => (dispatch) => {
    dispatch({ type: actions.ADD_TO_SELECTED_GROUPS, payload: id });
  },

  removeItemFromSelectedGroup: id => (dispatch) => {
    dispatch({ type: actions.REMOVE_ITEM_FROM_SELECTED_GROUP, payload: id });
  },

  changeStatePersonSearchGroup: ({ name, value }) => (dispatch) => {
    dispatch({
      type: actions.CHANGE_STATE_PERSON_SEARCH_GROUP,
      payload: { name, value },
    });
  },

  searchGroupAdmins: params => async (dispatch) => {
    try {
      dispatch({ type: actions.SEARCH_GROUP_ADMINS_START });
      const { data: { data } } = await request.get(URLS.groupAdminsSearch, { params });
      dispatch({ type: actions.SEARCH_GROUP_ADMINS_SUCCESS, payload: data });
    } catch ({ response: { data } }) {
      dispatch({ type: actions.SEARCH_GROUP_ADMINS_FAIL });
      const error = data && data.error;
      errorMessage(error);
    }
  },
};
export default actions;
