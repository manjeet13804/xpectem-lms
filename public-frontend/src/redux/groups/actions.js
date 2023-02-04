// @flow
import {
  GET_GROUPS,
  GET_ORGANISATION_GROUP,
  ADD_GROUP,
  DELETE_GROUP,
  RENAME_GROUP,
} from './types';

import {
  RenameGroupType,
  DeleteGroupType,
  AddGroupType,
  GetAlGroupType,
  GetOrganisationGroupType,
} from './flowTypes';

const actionAddGroup = (name: string): AddGroupType => ({
  type: ADD_GROUP,
  payload: {
    name,
  },
});

const actionGetGroups = (): GetAlGroupType => ({
  type: GET_GROUPS,
});

const actionDeleteGroup = (id: number | string): DeleteGroupType => ({
  type: DELETE_GROUP,
  payload: {
    id,
  },
});

const actionRenameGroup = (id: number | string, name: string): RenameGroupType => ({
  type: RENAME_GROUP,
  payload: {
    id,
    name,
  },
});

const actionGetOrganisationGroup = (organisationId: number | string): GetOrganisationGroupType => ({
  type: GET_ORGANISATION_GROUP,
  payload: {
    organisationId,
  },
});

export {
  actionGetOrganisationGroup,
  actionDeleteGroup,
  actionRenameGroup,
  actionGetGroups,
  actionAddGroup,
};
