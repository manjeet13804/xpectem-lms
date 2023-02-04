// @flow
const getCommunications = (state: object): Array<object> => (state.communication.data);
const getCurrentCommunicationCourseId = (state: object): Array<object> => (
  state.communication.currentCommunicationCourseId);
const getCommunicationList = (state: object): Array<object> => (
  state.communication.communicationList);
const getDialogList = (state: object): Array<object> => (
  state.communication.currentDialogList);
const getLoadingCommunications = (state: object): boolean => (state.communication.isLoading);
const getErrorCommunications = (state: object): mixed => (state.communication.error);
const getSearchCommunication = (state: object): Array<object> => (
  state.communication.search);
const getCurrentCommunicationId = (state: object): Array<object> => (
  state.communication.currentCommunicationId);

export {
  getCommunications,
  getLoadingCommunications,
  getErrorCommunications,
  getCurrentCommunicationCourseId,
  getCommunicationList,
  getDialogList,
  getSearchCommunication,
  getCurrentCommunicationId,
};
