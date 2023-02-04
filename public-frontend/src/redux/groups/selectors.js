// @flow
import { GroupType } from 'models';

const getGroups = (state: object): Array<GroupType> => state.groups.byId;
const getGroupsAsArray = (state: object): Array<GroupType> => Object.values(state.groups.byId);
const getLoadingGroups = (state: object): boolean => state.groups.isLoading;
const getErrorGroups = (state: object): mixed => state.groups.error;

export {
  getGroups,
  getGroupsAsArray,
  getLoadingGroups,
  getErrorGroups,
};
