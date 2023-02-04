import {
  getError,
  errorMessage,
  generateRequest,
  checkSoftDeleteStatuses,
} from 'helpers/utility';
import request from 'components/restApi';
import constants from 'helpers/constants';
import omit from 'lodash/omit';
import moment from 'moment';

const { API } = constants;

const actions = {
  GET_OFFLINE_EVENTS_START: 'GET_OFFLINE_EVENTS_START',
  GET_OFFLINE_EVENTS: 'GET_OFFLINE_EVENTS',
  GET_OFFLINE_EVENTS_FAILURE: 'GET_OFFLINE_EVENTS_FAILURE',
  GET_OFFLINE_EVENT_START: 'GET_OFFLINE_EVENT_START',
  GET_OFFLINE_EVENT: 'GET_OFFLINE_EVENT',
  GET_OFFLINE_EVENT_FAILURE: 'GET_OFFLINE_EVENT_FAILURE',
  REMOVE_EDITABLE_OFFLINE_EVENT: 'REMOVE_EDITABLE_OFFLINE_EVENT',
  EDIT_EDITABLE_OFFLINE_EVENT: 'EDIT_EDITABLE_OFFLINE_EVENT',
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL: 'GET_CATEGORIES_FAIL',

  CREATE_OFFLINE_EVENT_START: 'CREATE_OFFLINE_EVENT_START',
  CREATE_OFFLINE_EVENT_SUCCESS: 'CREATE_OFFLINE_EVENT_SUCCESS',
  CREATE_OFFLINE_EVENT_FAIL: 'CREATE_OFFLINE_EVENT_FAIL',

  UPDATE_OFFLINE_EVENT_START: 'UPDATE_OFFLINE_EVENT_START',
  UPDATE_OFFLINE_EVENT_SUCCESS: 'UPDATE_OFFLINE_EVENT_SUCCESS',
  UPDATE_OFFLINE_EVENT_FAIL: 'UPDATE_OFFLINE_EVENT_FAIL',

  TOGGLE_SOFT_DELETE_OFFLINE_EVENT_START: 'TOGGLE_SOFT_DELETE_OFFLINE_EVENT_START',
  TOGGLE_SOFT_DELETE_OFFLINE_EVENT_SUCCESS: 'TOGGLE_SOFT_DELETE_OFFLINE_EVENT_SUCCESS',
  TOGGLE_SOFT_DELETE_OFFLINE_EVENT_FAIL: 'TOGGLE_SOFT_DELETE_OFFLINE_EVENT_FAIL',

  fetchOfflineEvents: querystring => async (dispatch) => {
    if (querystring) {
      dispatch({ type: actions.GET_OFFLINE_EVENTS_START });
      try {
        const { data: { data } } = await request.get(`${API.offline_event}?${querystring}`);
        dispatch({ type: actions.GET_OFFLINE_EVENTS, data });
      } catch ({ response: { data } }) {
        const error = getError(data);
        errorMessage(error);
        dispatch({ type: actions.GET_OFFLINE_EVENTS_FAILURE });
      }
    }
  },

  fetchOfflineEvent: id => async (dispatch) => {
    dispatch({ type: actions.GET_OFFLINE_EVENT_START });
    try {
      const querystring = generateRequest({
        filteredInfo: { id },
        paginationInfo: {
          current: 1,
          pageSize: 1,
        },
      });
      const { data: { data: { result: [first] } } } = await request.get(`${API.offline_event}?${querystring}`);
      dispatch({
        type: actions.GET_OFFLINE_EVENT,
        data: {
          ...first,
          category: first.category ? first.category.id : null,
        },
      });
    } catch ({ response: { data } }) {
      const error = getError(data);
      errorMessage(error);
      dispatch({ type: actions.GET_OFFLINE_EVENT_FAILURE });
    }
  },

  removeEditableOfflineEvent: () => dispatch => dispatch(
    { type: actions.REMOVE_EDITABLE_OFFLINE_EVENT },
  ),

  editEditableOfflineEvent: data => dispatch => dispatch({
    type: actions.EDIT_EDITABLE_OFFLINE_EVENT,
    data,
  }),

  toggleSoftDeleteOfflineEvents: props => async (dispatch) => {
    dispatch({ type: actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_START });
    try {
      const { data: { data } } = await request.patch(API.offline_event, { actions: props });
      checkSoftDeleteStatuses(data);
      dispatch({ type: actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_SUCCESS, data });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.TOGGLE_SOFT_DELETE_OFFLINE_EVENT_FAIL });
    }
  },

  updateOfflineEvent: events => async (dispatch) => {
    dispatch({ type: actions.UPDATE_OFFLINE_EVENT_START });
    try {
      await request.put(API.offline_event, {
        events: events.map(item => ({
          ...omit(item, ['isDeleted', 'addedAt', 'updatedAt']),
          ...(item.assets && { assets: item.assets.map(({ id }) => id) }),
          ...((item.dateStart && !item.dateFinish) && {
            dateFinish: moment(item.dateStart).endOf('day'),
          }),
        })),
      });
      dispatch({ type: actions.UPDATE_OFFLINE_EVENT_SUCCESS });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_OFFLINE_EVENT_FAIL, payload: error });
    }
  },

  createOfflineEvent: data => async (dispatch) => {
    dispatch({ type: actions.CREATE_OFFLINE_EVENT_START });
    try {
      await request.post(API.offline_event, {
        ...omit(data, ['isDeleted', 'addedAt', 'updatedAt']),
        ...(data.assets && { assets: data.assets.map(({ id }) => id) }),
        ...((data.dateStart && !data.dateFinish) && {
          dateFinish: moment(data.dateStart).endOf('day'),
        }),
      });
      dispatch({ type: actions.CREATE_OFFLINE_EVENT_SUCCESS });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.CREATE_OFFLINE_EVENT_FAIL, payload: error });
    }
  },

  fetchCategories: () => async (dispatch) => {
    try {
      const response = await request.get(`${API.offline_event_category}?pagination=all`);
      const { data: { data: { result: categories } } } = response;
      dispatch({ type: actions.GET_CATEGORIES, categories });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_CATEGORIES_FAIL });
    }
  },
};

export default actions;
