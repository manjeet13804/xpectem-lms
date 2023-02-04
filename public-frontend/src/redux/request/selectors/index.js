// @flow
const getRequestStatus = (state: object): mixed => (state.request.success);
const getRequestError = (state: object): mixed => (state.request.error);
const getRequestLoading = (state: object): mixed => (state.request.isLoading);

export {
  getRequestError,
  getRequestLoading,
  getRequestStatus,
};
