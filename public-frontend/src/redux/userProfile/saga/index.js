// @flow
import type { Saga } from 'redux-saga';
import { put, takeLatest, all } from 'redux-saga/effects';

import { apiCall, getError, apiDownload } from 'redux/@utils/apiCall';
import {
  SIGN_IN,
  CURRENT_USER,
  CURRENT_PROFILE,
  PASSWORD_RESET,
  ACCOUNT_CLOSE,
  EXPORT,
  USER_AVATAR,
  NEW_EMAIL,
} from 'constants/apiUrls';
import { PATHS } from 'constants/paths';
import {USER_ROLES_ENUM} from 'constants/enums';
import { actionAppCanRender } from 'redux/actions';
import { socketInit, getSocket } from 'websocket';
import types from '../types';
import {PayloadType} from '../flowTypes';
import { VERIFY_EVENT } from '../../../websocket/types';

const {
  LOGIN_IN_REQUEST,
  LOGIN_IN_SUCCESS,
  LOGIN_IN_START,
  LOGIN_IN_FAIL,
  GET_CURRENT_USER_REQUEST,
  UPLOAD_USER_AVATAR,
  UPLOAD_USER_AVATAR_START,
  UPLOAD_USER_AVATAR_SUCCESS,
  UPLOAD_USER_AVATAR_FAIL,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_START,
  GET_CURRENT_PROFILE_SUCCESS,
  GET_CURRENT_PROFILE_FAIL,
  PUT_CURRENT_PROFILE,
  PUT_CURRENT_PROFILE_START,
  PUT_CURRENT_PROFILE_SUCCESS,
  PUT_CURRENT_PROFILE_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLOSE_ACCOUNT,
  CLOSE_ACCOUNT_START,
  CLOSE_ACCOUNT_SUCCESS,
  CLOSE_ACCOUNT_FAIL,
  EXPORT_DATA,
  EXPORT_DATA_FAIL,
  ADD_NEW_EMAIL,
  ADD_NEW_EMAIL_START,
  ADD_NEW_EMAIL_SUCCESS,
  ADD_NEW_EMAIL_FAIL,
} = types;

function* loginIn({
  payload: {
    email,
    password,
    history,
    isRemember,
  },
}: PayloadType): Saga<void> {
  try {
    yield put({ type: LOGIN_IN_START });
    const {
      data: {
        data: {
          token,
          roles,
          firstName,
          lastName,
          avatar,
        },
      },
    } = yield apiCall({type: 'POST', body: {email, password}, url: SIGN_IN});
    yield put({
      type: LOGIN_IN_SUCCESS,
      payload: {
        token,
        isRemember,
        firstName,
        lastName,
        email,
        avatar,
        roles,
      },
    });

    socketInit();

    const socket = getSocket();

    // eslint-disable-next-line flowtype/no-primitive-constructor-types
    socket.emit(VERIFY_EVENT, token, (data: String): void => console.log(data));

    const redirectPath = roles === USER_ROLES_ENUM.xpectum
      ? PATHS.dashboard : PATHS.organisationsSwitch;
    history.push(redirectPath);
  } catch (error) {
    yield put({ type: LOGIN_IN_FAIL, payload: getError(error) });
  }
}

function* getCurrentUser(): Saga<void> {
  try {
    yield put({ type: LOGIN_IN_START});
    const {
      data: {
        data: {
          id,
          roles = 'user',
          avatar,
          firstName,
          lastName,
          userEmail: [
            { email },
          ],
        },
      },
    } = yield apiCall({
      type: 'GET',
      isToken: true,
      url: CURRENT_USER,
    });
    socketInit();
    const socket = getSocket();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    socket.emit(VERIFY_EVENT, token, (data: String): void => console.log(data));

    yield put({
      type: LOGIN_IN_SUCCESS,
      payload: {
        id,
        firstName,
        lastName,
        avatar,
        email,
        roles,
      },
    });
    yield put(actionAppCanRender());
  } catch (error) {
    yield put({ type: LOGIN_IN_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* uploadUserAvatar({formData}: object): Saga<void> {
  try {
    yield put({ type: UPLOAD_USER_AVATAR_START});
    const { data: {data} } = yield apiCall({
      type: 'PUT',
      isToken: true,
      url: USER_AVATAR,
      body: formData,
    });
    yield put({
      type: UPLOAD_USER_AVATAR_SUCCESS,
      payload: data,
    });
    yield put(actionAppCanRender());
  } catch (error) {
    yield put({ type: UPLOAD_USER_AVATAR_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* getCurrentProfile(): Saga<void> {
  try {
    yield put({ type: GET_CURRENT_PROFILE_START});
    const { data: {data} } = yield apiCall({
      type: 'GET',
      isToken: true,
      url: CURRENT_PROFILE,
    });
    yield put({
      type: GET_CURRENT_PROFILE_SUCCESS,
      payload: data,
    });
    yield put(actionAppCanRender());
  } catch (error) {
    yield put({ type: GET_CURRENT_PROFILE_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* putCurrentProfile({formData}: object): Saga<void> {
  try {
    yield put({ type: PUT_CURRENT_PROFILE_START});
    const { data: {data} } = yield apiCall({
      type: 'PUT',
      isToken: true,
      url: CURRENT_PROFILE,
      body: formData,
    });
    yield put({
      type: PUT_CURRENT_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: PUT_CURRENT_PROFILE_FAIL, payload: getError(error)});
  }
}

function* resetUserPassword(): Saga<void> {
  try {
    yield put({ type: RESET_PASSWORD_START});
    const { data: {data} } = yield apiCall({
      type: 'POST',
      isToken: true,
      url: PASSWORD_RESET,
    });
    yield put({
      type: RESET_PASSWORD_SUCCESS,
      payload: data,
    });
    yield put(actionAppCanRender());
  } catch (error) {
    yield put({ type: RESET_PASSWORD_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* closeUserAccount(): Saga<void> {
  try {
    yield put({ type: CLOSE_ACCOUNT_START});
    const { data: {data} } = yield apiCall({
      type: 'PUT',
      isToken: true,
      url: ACCOUNT_CLOSE,
    });
    yield put({
      type: CLOSE_ACCOUNT_SUCCESS,
      payload: data,
    });
    yield put(actionAppCanRender());
  } catch (error) {
    yield put({ type: CLOSE_ACCOUNT_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* exportUserData({name}: object): Saga<void> {
  try {
    yield apiDownload({
      type: 'POST',
      url: `${EXPORT}`,
      fileName: name,
      isToken: true,
    });
  } catch (error) {
    yield put({ type: EXPORT_DATA_FAIL, payload: getError(error) });
  }
}

function* addNewEmail({
  payload: {
    token,
    history,
  },
}: object): Saga<void> {
  try {
    yield put({ type: ADD_NEW_EMAIL_START});

    const { data: {data} } = yield apiCall({
      type: 'GET',
      url: NEW_EMAIL + token,
    });

    yield put({
      type: ADD_NEW_EMAIL_SUCCESS,
      payload: data,
    });

    yield put(actionAppCanRender());

    history.push('/profile');
    window.location.reload();
  } catch (error) {
    yield put({ type: ADD_NEW_EMAIL_FAIL, payload: getError(error)});
    yield put(actionAppCanRender());
  }
}

function* userProfileSaga(): Saga<void> {
  yield all([
    takeLatest(LOGIN_IN_REQUEST, loginIn),
    takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser),
    takeLatest(UPLOAD_USER_AVATAR, uploadUserAvatar),
    takeLatest(GET_CURRENT_PROFILE, getCurrentProfile),
    takeLatest(PUT_CURRENT_PROFILE, putCurrentProfile),
    takeLatest(RESET_PASSWORD, resetUserPassword),
    takeLatest(CLOSE_ACCOUNT, closeUserAccount),
    takeLatest(EXPORT_DATA, exportUserData),
    takeLatest(ADD_NEW_EMAIL, addNewEmail),
  ]);
}

export default userProfileSaga;
