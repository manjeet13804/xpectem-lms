import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';

const config = {
  headers: { 'content-type': 'multipart/form-data' },
};

const actions = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  EDIT_USER_PROFILE_INFO: 'EDIT_USER_PROFILE_INFO',
  GET_USER_INFO: 'GET_FULL_USER_INFO',
  USER_UPDATED: 'USER_UPDATED',
  FAIL_UPDATE: 'FAIL_UPDATE',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
  REMOVE_AVATAR: 'REMOVE_AVATAR',
  ADD_USER_NOTIFICATION: 'ADD_USER_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',

  removeDownloadLinkLmsAdmin: () => (dispatch) => {
    dispatch({ type: actions.REMOVE_AVATAR });
  },

  changeUserInfo: (name, value) => (dispatch) => {
    dispatch({
      type: actions.EDIT_USER_PROFILE_INFO,
      payload: { name, value },
    });
  },

  setCurrentUser: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.userUrl);
      dispatch({
        type: actions.SET_CURRENT_USER,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },

  editProfile: formdata => async (dispatch) => {
    try {
      await request.put(URLS.updateProfile, formdata, config);
      dispatch({
        type: actions.USER_UPDATED,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      dispatch({
        type: actions.FAIL_UPDATE,
        payload: message,
      });
      errorMessage(message);
    }
  },

  clearNotification: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_NOTIFICATION });
  },

  addUserNotification: notification => async (dispatch) => {
    dispatch({ type: actions.ADD_USER_NOTIFICATION, payload: notification });
  },

  removeNotification: id => async (dispatch) => {
    try {
      await request.delete(`${URLS.notifications}/${id}`);
      dispatch({
        type: actions.REMOVE_NOTIFICATION,
        payload: id,
      });
    } catch ({ response: { data } = {} }) {
      const message = data && data.message;
      errorMessage(message);
    }
  },
};
export default actions;
