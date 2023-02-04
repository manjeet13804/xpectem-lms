import request from 'components/restApi';
import URLS from 'redux/urls';
import {
  errorMessage,
  getMessage,
} from 'helpers/utility';

const actions = {
  GET_USERS: 'GET_USERS',
  GET_USERS_START: 'GET_USERS_START',
  GET_USERS_FAILURE: 'GET_USERS_FAILURE',

  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',

  CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',

  DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',

  NEED_UPDATE_USERS: 'NEED_UPDATE_USERS',
  REMOVE_IS_UPDATED_STATUS: 'REMOVE_IS_UPDATED_STATUS',

  getUsers: ({limit, offset}) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_USERS_START });
      const { data: { data } } = await request.get(URLS.users, {params: {limit, offset}});
      dispatch({ type: actions.GET_USERS, payload: data });
    } catch (err) {
      errorMessage(err.massage);
      dispatch({ type: actions.GET_USERS_FAILURE });
    }
  },

  updateUser: props => async (dispatch) => {
    const { id, ...rest } = props;
    const {
      email,
      name,
      password,
      role,
      isEmailConfirmed,
    } = rest;
    const params = {
      email,
      name,
      password,
      role,
      isEmailConfirmed,
    }
    if (props) {
      try {
        await request.put(`${URLS.users}/${id}`, params);
        const status = [{ status: 'updated' }];
        getMessage(status, 'userStatuses');
        await dispatch({ type: actions.NEED_UPDATE_USERS});
      } catch (err) {
        errorMessage(err.message);
        dispatch({ type: actions.UPDATE_USER_FAILURE, payload: err });
      }
    }
  },

  userCreate: user => async (dispatch) => {
    if (user) {
      const { name, email } = user;
      try {
        await request.post(URLS.users, { name, email });
        const status = [{ status: 'created' }];
        getMessage(status, 'userStatuses');
        await dispatch({ type: actions.NEED_UPDATE_USERS});
      } catch (err) {
        errorMessage(err.message);
        dispatch({ type: actions.CREATE_USER_FAILURE });
      }
    }
  },

  deleteUser: userId => async (dispatch) => {
    if (userId) {
      try {
        await request.delete(`${URLS.users}/${userId}`);
        dispatch({ type: actions.DELETE_USER_SUCCESS, payload: userId });
      } catch (err) {
        const { message } = err;
        errorMessage(message);
      }
    }
  },

  resetPassword: email => async (dispatch) => {
    if (email) {
      try {
        await request.post(URLS.resetPassword, { email });
        const status = [{ status: 'reset' }];
        getMessage(status, 'userStatuses');
      } catch (err) {
        const { message } = err;
        errorMessage(message);
      }
    }
  },

  removeIsUpdatedStatus: () => ({ type: actions.REMOVE_IS_UPDATED_STATUS }),
};
export default actions;
