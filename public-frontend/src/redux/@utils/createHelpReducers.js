// @flow
import createIdsReducer from './idsReducer';
import createIsLoadingReducer from './isLoadingReducer';
import createErrorReducer from './errorReducer';

export default (
  requests: Array<string>,
  entitiesKey?: string,
): object => ({
  ...(entitiesKey && { ids: createIdsReducer(requests, entitiesKey) }),
  isLoading: createIsLoadingReducer(requests),
  error: createErrorReducer(requests),
});
