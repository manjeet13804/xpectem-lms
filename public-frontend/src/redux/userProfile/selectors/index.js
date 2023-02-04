// @flow
import {UserType} from 'models';

const getErrorProfile = (state: mixed): string => state.userProfile.error;
const getLoadingProfile = (state: mixed): string => state.userProfile.loading;
const getUserName = (state: mixed): string => state.userProfile.name;
const getUserEmail = (state: mixed): string => state.userProfile.email;
const getUserRoles = (state: mixed): string => state.userProfile.roles;
const getUserFirstName = (state: mixed): string => state.userProfile.firstName;
const getGeneralUser = ({
  userProfile: {
    firstName,
    lastName,
    email,
    avatar,
    roles,
  },
}: mixed): object => ({
  firstName,
  lastName,
  email,
  avatar,
  roles,
});
const getSuccessAvatar = (state: mixed): string => state.userProfile.avatar && state.userProfile.avatar.success;
const getLoadingAvatar = (state: mixed): string => state.userProfile.avatar && state.userProfile.avatar.loading;
const getErrorAvatar = (state: mixed): string => state.userProfile.avatar && state.userProfile.avatar.error;
const getUserProfile = (state: mixed): UserType => state.userProfile.profile.data;

const getUserAvatar = (state: mixed): string => (
  state.userProfile.img
    ? state.userProfile.img
    : {
      firstName: state.userProfile.firstName,
      lastName: state.userProfile.lastName,
    }
);

const getMyGroupIds = (state: mixed): Array<number> => state.userProfile.groups;

export {
  getGeneralUser,
  getUserProfile,
  getUserAvatar,
  getErrorProfile,
  getLoadingProfile,
  getUserName,
  getUserEmail,
  getUserRoles,
  getSuccessAvatar,
  getLoadingAvatar,
  getErrorAvatar,
  getMyGroupIds,
  getUserFirstName,
};
