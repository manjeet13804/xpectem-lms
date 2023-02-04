import factoryActionTypes from 'utils/factoryActionType';

const SEARCH_USERS = 'SEARCH_USERS_BY_EMAIL';
const USERS_LIST_DEFAULT = 'USERS_LIST_DEFAULT';
const GET_USERS_LIST = 'GET_USERS_LIST';
const types = factoryActionTypes(
  ['GET_USERS_LIST'],
);

export default {
  GET_USERS_LIST,
  USERS_LIST_DEFAULT,
  SEARCH_USERS,
  ...types,
};
