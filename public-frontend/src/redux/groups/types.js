import factoryActionTypes from 'utils/factoryActionType';

const GET_GROUPS = 'GET_GROUPS';
const ADD_GROUP = 'ADD_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';
const RENAME_GROUP = 'RENAME_GROUP';
const GET_ORGANISATION_GROUP = 'GET_ORGANISATION_GROUP';

const {
  GET_GROUPS_START,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
} = factoryActionTypes(
  [GET_GROUPS],
);

export {
  GET_GROUPS,
  GET_GROUPS_START,
  GET_GROUPS_SUCCESS,
  GET_GROUPS_FAIL,
  GET_ORGANISATION_GROUP,
  RENAME_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
};
