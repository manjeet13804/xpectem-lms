// @flow
const getMyOrganisations = (state: object): Array<object> => state.myOrganisations.data;
const getLoadingMyOrganisations = (state: object): boolean => state.myOrganisations.isLoading;
const getErrorMyOrganisations = (state: object): mixed => state.myOrganisations.error;
const getCurrentMyOrganisationId = (state: object): string
  | number => state.myorganisations.currentId;
const getMyOrganisationInformation = (state: ojbect): object => {
  const {
    organisationId,
    logoImageUri,
    userWelcomeText,
  } = state.myOrganisations;

  return {
    organisationId,
    logoImageUri,
    userWelcomeText,
  };
};

export {
  getCurrentMyOrganisationId,
  getErrorMyOrganisations,
  getLoadingMyOrganisations,
  getMyOrganisations,
  getMyOrganisationInformation,
};
