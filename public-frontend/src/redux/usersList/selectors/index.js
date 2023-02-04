// @flow

const getUsersList = (state: object): mixed => (state.usersList.data);
const getLoadingUsersList = (state: object): mixed => (state.usersList.isLoading);
const getErrorUsersList = (state: object): mixed => (state.usersList.error);

export {
  getErrorUsersList,
  getLoadingUsersList,
  getUsersList,
};
