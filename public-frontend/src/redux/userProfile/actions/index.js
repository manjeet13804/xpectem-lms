// @flow
import {LoginInDataType} from 'models';
import types from '../types';
import {
  LoginOffType,
  LoginDefaultType,
  CurrentUserType,
  LoginInType,
  CurrentProfileType,
  PutCurrentProfileType,
  ResetPasswordType,
  CloseAccountType,
  AddNewEmailType,
} from '../flowTypes';

const {
  LOGIN_IN_REQUEST,
  LOGIN_OFF,
  LOGIN_DEFAULT,
  GET_CURRENT_USER_REQUEST,
  UPLOAD_USER_AVATAR,
  GET_CURRENT_PROFILE,
  PUT_CURRENT_PROFILE,
  RESET_PASSWORD,
  CLOSE_ACCOUNT,
  EXPORT_DATA,
  ADD_NEW_EMAIL,
} = types;


const actionLoginIn = (
  {email, password}: LoginInDataType,
  history: mixed,
  isRemember: boolean,
  redirectPath: string,
): LoginInType => ({
  type: LOGIN_IN_REQUEST,
  payload: {
    email,
    password,
    history,
    isRemember,
    redirectPath,
  },
});

const actionLoginOff = (): LoginOffType => ({
  type: LOGIN_OFF,
});

const actionLoginDefault = (): LoginDefaultType => ({
  type: LOGIN_DEFAULT,
});

const actionCurrentUser = (): CurrentUserType => ({
  type: GET_CURRENT_USER_REQUEST,
});

const actionUploadUserAvatar = (formData: object): object => ({
  type: UPLOAD_USER_AVATAR,
  formData,
});

const actionCurrentProfile = (): CurrentProfileType => ({
  type: GET_CURRENT_PROFILE,
});

const actionPutCurrentProfile = (formData: object): PutCurrentProfileType => ({
  type: PUT_CURRENT_PROFILE,
  formData,
});

const actionResetPassword = (): ResetPasswordType => ({
  type: RESET_PASSWORD,
});

const actionCloseAccount = (): CloseAccountType => ({
  type: CLOSE_ACCOUNT,
});

const actionExportData = (name: string): object => ({
  type: EXPORT_DATA,
  name,
});

const actionAddNewEmail = (token: string, history: object): AddNewEmailType => ({
  type: ADD_NEW_EMAIL,
  payload: {
    token,
    history,
  },
});


export {
  actionCurrentUser,
  actionLoginIn,
  actionLoginOff,
  actionLoginDefault,
  actionUploadUserAvatar,
  actionCurrentProfile,
  actionPutCurrentProfile,
  actionResetPassword,
  actionCloseAccount,
  actionExportData,
  actionAddNewEmail,
};
