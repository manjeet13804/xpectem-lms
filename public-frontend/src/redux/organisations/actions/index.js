// @flow

import types from '../types';
import {
  AddOrganisationType,
  GetAllOrganisationType,
  DeleteOrganisationType,
  SetOrganisationIdType,
  GetOrganisationsAndGroupsType,
} from '../flowTypes';

const {
  GET_ALL_ORGANISATION_REQUEST,
  SET_ORGANISATION_ID,
  ADD_ORGANISATION,
  DELETE_ORGANISATION,
  GET_ORGANISATION_INITIALIZATION,
} = types;

const actionAddOrganisation = (payload: string): AddOrganisationType => ({
  type: ADD_ORGANISATION,
  payload,
});

const actionGetAllOrganisation = (): GetAllOrganisationType => ({
  type: GET_ALL_ORGANISATION_REQUEST,
});

const actionSetOrganisationId = (payload: string | number): SetOrganisationIdType => ({
  type: SET_ORGANISATION_ID,
  payload,
});

const actionDeleteOrganisation = (id: number | string): DeleteOrganisationType => ({
  type: DELETE_ORGANISATION,
  payload: id,
});

const actionGetOrganisationsAndGroups = (): GetOrganisationsAndGroupsType => ({
  type: GET_ORGANISATION_INITIALIZATION,
});

export {
  actionSetOrganisationId,
  actionGetAllOrganisation,
  actionAddOrganisation,
  actionDeleteOrganisation,
  actionGetOrganisationsAndGroups,
};
