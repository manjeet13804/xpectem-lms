// @flow
import types from '../types';
import {
  AddMyOrganisationType,
  GetAllMyOrganisationType,
  SetMyOrganisationIdType,
  GetMyOrganisationsAndGroupsType,
} from '../flowTypes';

const {
  GET_ALL_MY_ORGANISATION_REQUEST,
  SET_MY_ORGANISATION_ID,
  GET_MY_ORGANISATION_INITIALIZATION,
  ADD_MY_ORGANISATION,
  GET_MY_ORGANISATION_INFORMATION_REQUEST,
} = types;

const actionAddMyOrganisation = (payload: string): AddMyOrganisationType => ({
  type: ADD_MY_ORGANISATION,
  payload,
});

const actionGetAllMyOrganisation = (): GetAllMyOrganisationType => ({
  type: GET_ALL_MY_ORGANISATION_REQUEST,
});

const actionSetMyOrganisation = (payload: string | number): SetMyOrganisationIdType => ({
  type: SET_MY_ORGANISATION_ID,
  payload,
});

const actionGetMyOrganisationsAndGroups = (): GetMyOrganisationsAndGroupsType => ({
  type: GET_MY_ORGANISATION_INITIALIZATION,
});

const getInformationAboutMyOrganization = (id: number | string): any => ({
  type: GET_MY_ORGANISATION_INFORMATION_REQUEST,
  payload: id,
});

export {
  actionSetMyOrganisation,
  actionAddMyOrganisation,
  actionGetAllMyOrganisation,
  actionGetMyOrganisationsAndGroups,
  getInformationAboutMyOrganization,
};
