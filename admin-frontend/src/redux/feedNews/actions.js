import request from 'components/restApi';
import {
  getError,
  errorMessage,
  getMessage,
  checkSoftDeleteStatuses,
} from 'helpers/utility';
import constants from 'helpers/constants';

const newsAPI = constants.API.feedNews;

const actions = {
  GET_FEED_NEWS_START: 'GET_FEED_NEWS_START',
  GET_FEED_NEWS: 'GET_FEED_NEWS',
  GET_FEED_NEWS_FAILURE: 'GET_FEED_NEWS_FAILURE',
  UPDATE_FEED_NEWS_SUCCESS: 'UPDATE_FEED_NEWS_SUCCESS',
  UPDATE_FEED_NEWS_FAILURE: 'UPDATE_FEED_NEWS_FAILURE',
  CREATE_FEED_NEWS_SUCCESS: 'CREATE_FEED_NEWS_SUCCESS',
  CREATE_FEED_NEWS_FAILURE: 'CREATE_FEED_NEWS_FAILURE',
  UPDATE_NEWS_SAGA: 'UPDATE_NEWS_SAGA',
  UPDATE_EDIT_FEED_NEWS: 'UPDATE_EDIT_FEED_NEWS',
  REMOVE_NEWS_IS_UPDATED_STATUS: 'REMOVE_NEWS_IS_UPDATED_STATUS',
  DELETE_FEED_NEWS_STATUS_CHANGE_SUCCESS: 'DELETE_FEED_NEWS_STATUS_CHANGE_SUCCESS',
  DELETE_FEED_NEWS_STATUS_CHANGE_FAILURE: 'DELETE_FEED_NEWS_STATUS_CHANGE_FAILURE',

  fetchFeedNews: querystring => async (dispatch) => {
    if (querystring) {
      try {
        dispatch({ type: actions.GET_FEED_NEWS_START });
        const { data: { data } } = await request.get(`${newsAPI}?${querystring}`);
        dispatch({ type: actions.GET_FEED_NEWS, news: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.GET_FEED_NEWS_FAILURE });
      }
    }
  },

  updateFeedNews: (props, withoutFilter, disableMessage) => async (dispatch) => {
    if (props.length) {
      try {
        const { data: { data } } = await request.put(newsAPI, { feed: props });

        if (!disableMessage) {
          getMessage(data, 'newsStatuses');
        }
        dispatch({ type: actions.UPDATE_FEED_NEWS_SUCCESS, data, withoutFilter });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.UPDATE_FEED_NEWS_FAILURE });
      }
    }
  },

  createFeedNews: news => async (dispatch) => {
    if (news) {
      try {
        const { data: { data } } = await request.post(newsAPI, news);
        const status = [{ status: 'created' }];
        getMessage(status, 'newsStatuses');

        dispatch({ type: actions.CREATE_FEED_NEWS_SUCCESS, feed: data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.CREATE_FEED_NEWS_FAILURE });
      }
    }
  },

  deleteFeedNewsOrRestore: (actionList, value, withoutFilter) => async (dispatch) => {
    if (actionList) {
      try {
        const { data: { data } } = await request.patch(newsAPI, { actions: actionList });
        const ids = checkSoftDeleteStatuses(data);
        dispatch({ type: actions.DELETE_FEED_NEWS_STATUS_CHANGE_SUCCESS, ids, value, withoutFilter });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.DELETE_FEED_NEWS_STATUS_CHANGE_FAILURE });
      }
    }
  },

  editFeedNews: () => ({ type: actions.UPDATE_EDIT_FEED_NEWS }),
  removeFeedNewsIsUpdatedStatus: () => ({ type: actions.REMOVE_NEWS_IS_UPDATED_STATUS }),
};
export default actions;
