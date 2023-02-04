// @flow
const getOrganisations = (state: object): Array<object> => state.organisations.data;
const getLoadingOrganisations = (state: object): boolean => state.organisations.isLoading;
const getErrorOrganisations = (state: object): mixed => state.organisations.error;
const getCurrentOrganisationId = (state: mixed): string | number => state.organisations.currentId;

export {
  getCurrentOrganisationId,
  getErrorOrganisations,
  getLoadingOrganisations,
  getOrganisations,
};
