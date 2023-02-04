// @flow
import {UserType} from 'models';
import types from './types';

const {
  SEARCH_USERS,
  USERS_LIST_DEFAULT,
  GET_USERS_LIST,
  GET_USERS_LIST_START,
  GET_USERS_LIST_FAIL,
  GET_USERS_LIST_SUCCESS,
} = types;

type SearchType = {
    type: SEARCH_USERS,
    payload: string
};

type StartType = {
    type: GET_USERS_LIST_START
};
type SuccessType = {
    type: GET_USERS_LIST_FAIL,
    payload: string | null | boolean
};
type FailType = {
    type: GET_USERS_LIST_SUCCESS,
    payload: Array<UserType>
};

type StateType = {
    error: boolean,
    data: Array<object>,
    isLoading: true
};

type SearchDefaultType = {
  type: USERS_LIST_DEFAULT
};

type AllUsersType = {
  type: GET_USERS_LIST
};

export {
  SearchDefaultType,
  SearchType,
  StartType,
  SuccessType,
  FailType,
  StateType,
  AllUsersType,
};
