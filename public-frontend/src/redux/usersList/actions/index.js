// @flow

import types from '../types';
import type {SearchType, SearchDefaultType, AllUsersType} from '../flowTypes';

const {
  USERS_LIST_DEFAULT,
  SEARCH_USERS,
  GET_USERS_LIST,
} = types;

const actionSearch = (value: string): SearchType => ({
  type: SEARCH_USERS,
  payload: value,
});

const actionGetAllUsers = (): AllUsersType => ({
  type: GET_USERS_LIST,
});

const actionSearchDefault = (): SearchDefaultType => ({
  type: USERS_LIST_DEFAULT,
});

export {
  actionSearchDefault,
  actionSearch,
  actionGetAllUsers,
};
