import {
  all, takeEvery, put, fork,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getToken, clearToken } from '../../helpers/utility';
import actions from './actions';
import { VERIFY_EVENT } from "../../websocket/types";
import { socketInit, getSocket } from "../../websocket";

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* ({ payload }) {
    const { roles } = payload;
    yield localStorage.setItem('lmsGroup', payload.lmsGroups[0] ? payload.lmsGroups[0].name : '');
    yield localStorage.setItem('id_token', payload.token);
    yield localStorage.setItem('id', payload.id);
    const role = roles.join(',');
    yield localStorage.setItem('role', role);
    yield localStorage.setItem('email', payload.email);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_FAILURE, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    clearToken();
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    yield put(push('/'));
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {

    const token = getToken().get('idToken');
    const id = localStorage.getItem('id');
    const role = localStorage.getItem('role');
    const roles = role && role.split(',');
    const email = localStorage.getItem('email');
    const lmsGroup = localStorage.getItem('lmsGroup');
    if (token && token !== 'undefined') {
      socketInit();

      const socket = getSocket();

      // eslint-disable-next-line flowtype/no-primitive-constructor-types
      socket.emit(VERIFY_EVENT, token, (data: String): void => console.log(data));
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: {
          token,
          id,
          roles,
          email,
          lmsGroups: [{
            name: lmsGroup,
          }],
        },
      });
    } else {
      yield put(push('/'));
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
