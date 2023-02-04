// @flow
const getDataSrudyPlan = (state: object): object => state.studyPlan.data;
const getLoadingSrudyPlan = (state: object): boolean => state.studyPlan.isLoading;
const getErrorSrudyPlan = (state: object): mixed => state.studyPlan.error;

export {
  getDataSrudyPlan,
  getLoadingSrudyPlan,
  getErrorSrudyPlan,
};
