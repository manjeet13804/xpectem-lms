import request from 'components/restApi';
import URLS from 'redux/urls';
import { errorMessage } from 'helpers/utility';
import { getServerError } from 'utils';

const actions = {
  CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
  LOGOUT: 'LOGOUT',
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SET_AUTH_VALUE: 'SET_AUTH_VALUE',
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILURE: 'GET_USER_FAILURE',
  GET_USER_INFO: 'GET_FULL_USER_INFO',
  SEND_RESET_MAIL_START: 'SEND_RESET_MAIL_START',
  SEND_RESET_MAIL_SUCCESS: 'SEND_RESET_MAIL_SUCCESS',
  SEND_RESET_MAIL_FAILURE: 'SEND_RESET_MAIL_FAILURE',
  CLEAR_RESET_MAIL: 'CLEAR_RESET_MAIL',

  checkAuthorization: () => ({ type: actions.CHECK_AUTHORIZATION }),
  setAuthValue: AuthValue => (dispatch) => {
    dispatch({ type: actions.SET_AUTH_VALUE, ...AuthValue });
  },

  getFullInfoUser: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(URLS.getFullInfoUser);
      dispatch({ type: actions.GET_USER_INFO, payload: data });
    } catch (e) {
      const error = getServerError(e);

      errorMessage(error);
    }
  },

  login: ({ email, password }) => async (dispatch) => {
    try {
      if (email && password) {
        const { data: { data } } = await request.post(URLS.signin, { email, password });
        dispatch({ type: actions.LOGIN_SUCCESS, payload: { ...data, email } });
      }
    } catch (e) {
      const error = getServerError(e);

      errorMessage(error);
      dispatch({ type: actions.LOGIN_FAILURE, error });
    }
  },
  logout: () => ({
    type: actions.LOGOUT,
  }),
  sendResetMail: email => async (dispatch) => {
    dispatch({ type: actions.SEND_RESET_MAIL_START });
    try {
      await request.post(URLS.forgotPassword, { email });
      dispatch({ type: actions.SEND_RESET_MAIL_SUCCESS });
    } catch (e) {
      const error = getServerError(e);
      errorMessage(error);
      dispatch({ type: actions.SEND_RESET_MAIL_FAILURE, error });
    }
  },
  clearResetMail: () => async (dispatch) => {
    dispatch({ type: actions.CLEAR_RESET_MAIL });
  },
};
export default actions;
