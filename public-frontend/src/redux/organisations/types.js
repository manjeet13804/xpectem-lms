import factoryActionTypes from 'utils/factoryActionType';

const GET_ALL_ORGANISATION_REQUEST = 'GET_ALL_ORGANISATION_REQUEST';
const SET_ORGANISATION_ID = 'SET_ORGANISATION_ID';
const ADD_ORGANISATION = 'ADD_ORGANISATION';
const DELETE_ORGANISATION = 'DELETE_ORGANISATION';
const GET_ORGANISATION_INITIALIZATION = 'GET_ORGANISATION_INITIALIZATION';

const types = factoryActionTypes(
  ['GET_ALL_ORGANISATION'],
);

export default {
  GET_ORGANISATION_INITIALIZATION,
  DELETE_ORGANISATION,
  GET_ALL_ORGANISATION_REQUEST,
  ADD_ORGANISATION,
  SET_ORGANISATION_ID,
  ...types,
};