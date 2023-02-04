import request from 'components/restApi';
import {
  getError,
  errorMessage,
  checkSoftDeleteStatuses,
} from 'helpers/utility';
import constants from 'helpers/constants';

const sourcesAPI = constants.API.news_sources;
const sourceAPI = constants.API.news_source;

const actions = {
  GET_NEWS_SOURCES_START: 'GET_NEWS_SOURCES_START',
  GET_NEWS_SOURCES: 'GET_NEWS_SOURCES',
  GET_NEWS_SOURCES_FAILURE: 'GET_NEWS_SOURCES_FAILURE',
  GET_NEWS_SOURCE_START: 'GET__NEWS_SOURCE_START',
  GET_NEWS_SOURCE_SUCCESS: 'GET_NEWS_SOURCE_SUCCESS',
  GET_NEWS_SOURCE_FAILURE: 'GET_NEWS_SOURCE_FAILURE',
  DELETE_EDITABLE_NEWS_SOURCE: 'DELETE_EDITABLE_NEWS_SOURCE',
  UPDATE_NEWS_SOURCE_START: 'UPDATE_NEWS_SOURCE_START',
  UPDATE_NEWS_SOURCE_SUCCESS: 'UPDATE_NEWS_SOURCE_SUCCESS',
  UPDATE_NEWS_SOURCE_FAIL: 'UPDATE_NEWS_SOURCE_FAIL',
  SOURCE_DELETE_STATUS_CHANGE_START: 'SOURCE_DELETE_STATUS_CHANGE_START',
  SOURCE_DELETE_STATUS_CHANGE_SUCCESS: 'SOURCE_DELETE_STATUS_CHANGE_SUCCESS',
  EDIT_EDITABLE_SOURCE: 'EDIT_EDITABLE_SOURCE',
  CREATE_NEWS_SOURCE: 'CREATE_NEWS_SOURCE',
  RESET_IS_UPDATED_STATUS: 'RESET_IS_UPDATED_STATUS',

  fetchNewsSources: querystring => async (dispatch) => {
    if (querystring) {
      try {
        dispatch({ type: actions.GET_NEWS_SOURCES_START });
        const { data: { data } } = await request.get(`${sourcesAPI}?${querystring}`);
        dispatch({ type: actions.GET_NEWS_SOURCES, newsSources: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.GET_NEWS_SOURCES_FAILURE });
      }
    }
  },

  fetchNewsSource: (id, forSearch) => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_NEWS_SOURCE_START });

      const { data: { data } } = await request.get(`${sourceAPI}/${id}`);

      dispatch({ type: actions.GET_NEWS_SOURCE_SUCCESS, data, forSearch });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error);
      dispatch({ type: actions.GET_NEWS_SOURCE_FAILURE });
    }
  },

  updateNewsSource: (query, updateStatus = true) => async (dispatch) => {
    try {
      if (updateStatus) {
        dispatch({ type: actions.UPDATE_NEWS_SOURCE_START });
      }

      const { data: { data } } = await request.put(sourcesAPI, { items: query });

      dispatch({ type: actions.UPDATE_NEWS_SOURCE_SUCCESS, payload: { data, updateStatus } });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_NEWS_SOURCE_FAIL });
    }
  },

  deleteEditableSource: () => (dispatch) => {
    dispatch({ type: actions.DELETE_EDITABLE_NEWS_SOURCE });
  },

  deleteSourceOrRestore: (selectedsIds, action) => async (dispatch) => {
    try {
      const items = selectedsIds.map(id => ({
        id,
        action,
      }));

      dispatch({ type: actions.SOURCE_DELETE_STATUS_CHANGE_START });

      const { data: { data } } = await request.patch(sourcesAPI, { actions: items });
      const ids = checkSoftDeleteStatuses(data);
      const isDeleted = action === 'soft_delete';
      dispatch({ type: actions.SOURCE_DELETE_STATUS_CHANGE_SUCCESS, payload: { ids, isDeleted } });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_NEWS_SOURCE_FAIL });
    }
  },

  createNewsSource: item => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(sourceAPI, item);

      dispatch({ type: actions.CREATE_NEWS_SOURCE, data });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_NEWS_SOURCE_FAIL });
    }
  },

  editEditableSource: data => dispatch => dispatch({ type: actions.EDIT_EDITABLE_SOURCE, data }),

  resetIsUpdatedOrCreated: () => dispatch => dispatch({ type: actions.RESET_IS_UPDATED_STATUS }),
};

export default actions;
