// @flow
import {OrganisationType} from 'models';
import types from './types';

const {
  GET_ALL_ORGANISATION_REQUEST,
  ADD_ORGANISATION,
  DELETE_ORGANISATION,
  GET_ALL_ORGANISATION_START,
  GET_ALL_ORGANISATION_FAIL,
  GET_ALL_ORGANISATION_SUCCESS,
  SET_ORGANISATION_ID,
  GET_ORGANISATION_INITIALIZATION,
} = types;

type SetOrganisationIdType = {
  type: SET_ORGANISATION_ID,
  payload: string | number
};

type GetAllOrganisationType = {
    type: GET_ALL_ORGANISATION_REQUEST
};

type AddOrganisationType = {
    type: ADD_ORGANISATION,
    payload: string
};

type DeleteOrganisationType = {
    type: DELETE_ORGANISATION,
    payload: string | number
};

type StartType = {
    type: GET_ALL_ORGANISATION_START,
    payload: mixed
};
type SuccessType = {
    type: GET_ALL_ORGANISATION_SUCCESS,
    payload: Array<OrganisationType>
};
type FailType = {
    type: GET_ALL_ORGANISATION_FAIL,
    payload: string | null
};

type StateType = {
    error: boolean,
    isLoading: true,
    data: Array<OrganisationType>
};

type GetOrganisationsAndGroupsType = {
  type: GET_ORGANISATION_INITIALIZATION
};

export {
  SetOrganisationIdType,
  GetAllOrganisationType,
  AddOrganisationType,
  DeleteOrganisationType,
  StartType,
  SuccessType,
  FailType,
  StateType,
  GetOrganisationsAndGroupsType,
};
