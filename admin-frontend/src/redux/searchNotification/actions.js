import request from 'components/restApi';
import URLS from 'redux/urls';

const actions = {
  SEARCH_USER_SUCCESS: 'SEARCH_USER_SUCCESS',
  SEARCH_USER_START: 'SEARCH_USER_START',
  CHENGE_PERSON: 'CHENGE_PERSON',
  SET_ALL_NOTIFICATIONS_START: 'SET_ALL_NOTIFICATIONS_START',
  GET_ALL_NOTIFICATIONS_SUCCESS: 'GET_ALL_NOTIFICATIONS_SUCCESS',
  NOTIFICATIONS_FAIL: 'NOTIFICATIONS_FAIL',
  CLEAR_DATA_USER: 'CLEAR_DATA_USER',
  SET_LIST_NOTIFICATIONS: 'SET_LIST_NOTIFICATIONS',

  searchUsers: body => async (dispatch) => {
    try {
      dispatch({ type: actions.SEARCH_USER_START });
      const { data: { data } } = await request.get(`${URLS.allUsers}`, { params: body });
      dispatch({ type: actions.SEARCH_USER_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.NOTIFICATIONS_FAIL });
    }
  },

  changePerson: body => async (dispatch) => {
    dispatch({ type: actions.CHENGE_PERSON, payload: body });
  },

  clearSearchDataUsers: () => async (dispatch) => {
    dispatch({ type: actions.CLEAR_DATA_USER });
  },

  getNotifications: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.allNotifications}`, { params: body });
      dispatch({ type: actions.GET_ALL_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.NOTIFICATIONS_FAIL, payload: e.massage });
    }
  },

  setNotifications: body => async (dispatch) => {
    try {
      dispatch({ type: actions.SET_ALL_NOTIFICATIONS_START });
      const { data: { data } } = await request.get(`${URLS.allNotifications}`, { params: body });

      dispatch({ type: actions.SET_LIST_NOTIFICATIONS, payload: data });
    } catch (e) {
      dispatch({ type: actions.NOTIFICATIONS_FAIL, payload: e.massage });
    }
  },
};
export default actions;
