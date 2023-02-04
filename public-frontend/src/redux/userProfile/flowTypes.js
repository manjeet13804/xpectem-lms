// @flow
import types from './types';

const {
  LOGIN_IN_REQUEST,
  LOGIN_OFF,
  LOGIN_DEFAULT,
  GET_CURRENT_USER_REQUEST,
  LOGIN_IN_SUCCESS,
  LOGIN_IN_START,
  LOGIN_IN_FAIL,
  GET_CURRENT_PROFILE,
  PUT_CURRENT_PROFILE,
  RESET_PASSWORD,
  CLOSE_ACCOUNT,
  ADD_NEW_EMAIL,
} = types;

type PayloadType = {
    email: string,
    password: string,
    history: object,
    isRemember: boolean,
    token?: string
};

type LoginOffType = {
    type: LOGIN_OFF
};

type LoginDefaultType = {
    type: LOGIN_DEFAULT
};

type CurrentUserType = {
    type: GET_CURRENT_USER_REQUEST
};

type CurrentProfileType = {
  type: GET_CURRENT_PROFILE
};

type LoginInType = {
    type: LOGIN_IN_REQUEST,
    payload: PayloadType
};

type StateType = {
    error: null,
    loading: null,
    firstName: string,
    lastName: string,
    email: string,
    roles: string,
    groups: number[]
};

type SuccessType = {
    type: LOGIN_IN_SUCCESS,
    payload: PayloadType
};

type FailType = {
    type: LOGIN_IN_FAIL,
    payload: string | boolean
};

type StartType = {
    type: LOGIN_IN_START
};

type PutCurrentProfileType = {
  type: PUT_CURRENT_PROFILE,
  formData: object
};

type ResetPasswordType = {
  type: RESET_PASSWORD
};

type CloseAccountType = {
  type: CLOSE_ACCOUNT
};

type AddNewEmailType = {
  type: ADD_NEW_EMAIL,
  payload: string
};

export {
  LoginOffType,
  LoginDefaultType,
  CurrentUserType,
  LoginInType,
  SuccessType,
  StartType,
  FailType,
  StateType,
  PayloadType,
  CurrentProfileType,
  PutCurrentProfileType,
  ResetPasswordType,
  CloseAccountType,
  AddNewEmailType,
};
