// @flow
import {GroupType} from 'models';
import {
  GET_GROUPS,
  GET_GROUPS_START,
  GET_GROUPS_FAIL,
  GET_GROUPS_SUCCESS,
  GET_ORGANISATION_GROUP,
  DELETE_GROUP,
  RENAME_GROUP,
  ADD_GROUP,
} from './types';

type GetAlGroupType = {
    type: GET_GROUPS
};

type AddGroupType = {
    type: ADD_GROUP,
    payload: {
        name: string
    }
};

type DeleteGroupType = {
    type: DELETE_GROUP,
    payload: {
        id: number
    }
};

type RenameGroupType = {
    type: RENAME_GROUP,
    payload: {
        id: string | number,
        name: string
    }
};

type StartType = {
    type: GET_GROUPS_START
};

type SuccessType = {
    type: GET_GROUPS_SUCCESS,
    payload: {
        groups: Array<GroupType>
    }
};

type GetOrganisationGroupType = {
  type: GET_ORGANISATION_GROUP,
  payload: {
      organisationId: number
  }
};

type FailType = {
    type: GET_GROUPS_FAIL,
    payload: string | null
};

type StateType = {
    [key: string]: GroupType
};

export {
  FailType,
  SuccessType,
  StartType,
  StateType,
  AddGroupType,
  DeleteGroupType,
  RenameGroupType,
  GetAlGroupType,
  GetOrganisationGroupType,
};
