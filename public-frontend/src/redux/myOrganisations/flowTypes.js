// @flow
import {MyOrganisationType} from 'models';
import types from './types';

const {
  GET_ALL_MY_ORGANISATION_REQUEST,
  ADD_MY_ORGANISATION,
  GET_ALL_MY_ORGANISATION_START,
  GET_ALL_MY_ORGANISATION_FAIL,
  GET_ALL_MY_ORGANISATION_SUCCESS,
  SET_MY_ORGANISATION,
  GET_MY_ORGANISATION_INITIALIZATION,
} = types;

type SetMyOrganisationIdType = {
  type: SET_MY_ORGANISATION,
  payload: string | number
};

type GetAllMyOrganisationType = {
  type: GET_ALL_MY_ORGANISATION_REQUEST
};

type AddMyOrganisationType = {
  type: ADD_MY_ORGANISATION,
  payload: string
};

type StartType = {
  type: GET_ALL_MY_ORGANISATION_START,
  payload: mixed
};
type SuccessType = {
  type: GET_ALL_MY_ORGANISATION_SUCCESS,
  payload: Array<MyOrganisationType>
};
type FailType = {
  type: GET_ALL_MY_ORGANISATION_FAIL,
  payload: string | null
};

type StateType = {
  error: boolean,
  isLoading: true,
  data: Array<MyOrganisationType>
};

type GetMyOrganisationsAndGroupsType = {
  type: GET_MY_ORGANISATION_INITIALIZATION
};

export {
  SetMyOrganisationIdType,
  GetAllMyOrganisationType,
  AddMyOrganisationType,
  StartType,
  SuccessType,
  FailType,
  StateType,
  GetMyOrganisationsAndGroupsType,
};
