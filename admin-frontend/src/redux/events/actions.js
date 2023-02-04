import request from 'components/restApi';
import {
  getError,
  errorMessage,
  getMessage,
  getSingleMessage,
  checkSoftDeleteStatuses,
  createFilterString,
} from 'helpers/utility';

import { omit } from 'lodash';

import constants from 'helpers/constants';

const actions = {
  GET_EVENTS_START: 'GET_EVENTS_START',
  GET_EVENTS: 'GET_EVENTS',
  GET_EVENTS_FAIL: 'GET_EVENTS_FAIL',
  GET_EVENT_START: 'GET_EVENT_START',
  GET_EVENT: 'GET_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  GET_EVENT_FAIL: 'GET_EVENT_FAIL',
  DELETE_EVENTS: 'DELETE_EVENTS',
  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL: 'GET_CATEGORIES_FAIL',
  GET_IMPORTANCE_LEVELS: 'GET_IMPORTANCE_LEVELS',
  GET_IMPORTANCE_LEVELS_FAIL: 'GET_IMPORTANCE_LEVELS_FAIL',
  UPDATE_EVENT: 'UPDATE_EVENT',
  UPDATE_EVENT_FAIL: 'UPDATE_EVENT_FAIL',
  CREATE_EVENT: 'CREATE_EVENT',
  CREATE_EVENT_FAIL: 'CREATE_EVENT_FAIL',
  REMOVE_UPDATED_STATUS: 'REMOVE_UPDATED_STATUS',
  TOGGLE_SOFT_DELETE_EVENT: 'TOGGLE_SOFT_DELETE_EVENT',
  TOGGLE_SOFT_DELETE_EVENT_FAIL: 'TOGGLE_SOFT_DELETE_EVENT_FAIL',

  GET_ASSET_CALENDAR_ITEM_START: 'GET_ASSET_CALENDAR_ITEM_START',
  GET_ASSET_CALENDAR_ITEM_SUCCESS: 'GET_ASSET_CALENDAR_ITEM_SUCCESS',
  GET_ASSET_CALENDAR_ITEM_FAIL: 'GET_ASSET_CALENDAR_ITEM_FAIL',

  CREATE_ASSET_CALENDAR_START: 'CREATE_ASSET_CALENDAR_START',
  CREATE_ASSET_CALENDAR_SUCCESS: 'CREATE_ASSET_CALENDAR_SUCCESS',
  CREATE_ASSET_CALENDAR_FAIL: 'CREATE_ASSET_CALENDAR_FAIL',

  UPDATE_ASSET_CALENDAR_START: 'UPDATE_ASSET_CALENDAR_START',
  UPDATE_ASSET_CALENDAR_SUCCESS: 'UPDATE_ASSET_CALENDAR_SUCCESS',
  UPDATE_ASSET_CALENDAR_FAIL: 'UPDATE_ASSET_CALENDAR_FAIL',

  INIT_ASSET_CALENDAR: 'INIT_ASSET_CALENDAR',
  CHANGE_ASSET_CALENDAR: 'CHANGE_ASSET_CALENDAR',

  initAssetCalendar: () => dispatch => (
    dispatch({ type: actions.INIT_ASSET_CALENDAR })
  ),

  changeAssetCalendar: data => dispatch => (
    dispatch({ type: actions.CHANGE_ASSET_CALENDAR, payload: data })
  ),

  fetchAssetCalendarItem: id => async (dispatch) => {
    try {
      const { API, filterTypes: { EQ } } = constants;
      const query = createFilterString({
        filters: { id: { type: EQ, value: id } },
        pagination: { offset: 0, limit: 1 },
      });
      dispatch({ type: actions.GET_ASSET_CALENDAR_ITEM_START });
      const { data: { data: { data } } } = await request.get(`${API.asset_calendar}${query}`);
      const payload = data.length ? data[0] : {};
      dispatch({
        type: actions.GET_ASSET_CALENDAR_ITEM_SUCCESS,
        payload,
      });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_ASSET_CALENDAR_ITEM_FAIL, payload: error });
    }
  },

  createAssetCalendar: data => async (dispatch) => {
    const { API } = constants;
    const body = {
      ...data,
      assets: data.assets.map(({ id }) => id),
      markets: data.markets.map(({ id }) => id),
    };
    try {
      dispatch({ type: actions.CREATE_ASSET_CALENDAR_START });
      const event = await request.post(API.asset_calendar, omit(body, ['isDeleted']));
      dispatch({ type: actions.CREATE_ASSET_CALENDAR_SUCCESS });
      getSingleMessage({ data: event, status: 'created' }, 'eventsStatuses');
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.CREATE_ASSET_CALENDAR_FAIL, payload: error });
    }
  },

  updateAssetCalendar: data => async (dispatch) => {
    const { API } = constants;
    try {
      dispatch({ type: actions.UPDATE_ASSET_CALENDAR_START });
      const body = {
        ...data,
        assets: data.assets.map(({ id }) => id),
        markets: data.markets.map(({ id }) => id),
      };
      const event = await request.put(API.asset_calendar, omit(body, ['isDeleted', 'category', 'rating']));
      dispatch({ type: actions.UPDATE_ASSET_CALENDAR_SUCCESS });
      getSingleMessage({ data: event, status: 'updated' }, 'eventsStatuses');
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_ASSET_CALENDAR_FAIL });
    }
  },

  fetchEvents: querystring => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_EVENTS_START });
      const response = await request.get(`/asset_calendar?${querystring}`);

      const { data: { data: events } } = response;

      dispatch({ type: actions.GET_EVENTS, events });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_EVENTS_FAIL });
    }
  },
  fetchEvent: querystring => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_EVENT_START });
      const { data: { data } } = await request.get(`/event?${querystring}`);

      dispatch({ type: actions.GET_EVENT, data });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_EVENT_FAIL });
    }
  },
  deleteEditableEvent: () => (dispatch) => {
    dispatch({ type: actions.DELETE_EVENT });
  },
  deleteEvents: () => (dispatch) => {
    dispatch({ type: actions.DELETE_EVENTS });
  },
  fetchCategories: () => async (dispatch) => {
    try {
      const response = await request.get('/catalogs/asset_calendar_category?pagination=all');
      const { data: { data: { result: categories } } } = response;
      dispatch({ type: actions.GET_CATEGORIES, categories });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_CATEGORIES_FAIL });
    }
  },
  fetchImportanceLevels: () => async (dispatch) => {
    try {
      const { data: { data } } = await request.get('/catalogs/event_importances?pagination=all');
      dispatch({ type: actions.GET_IMPORTANCE_LEVELS, data });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.GET_IMPORTANCE_LEVELS_FAIL });
    }
  },
  updateEvent: props => async (dispatch) => {
    try {
      const { data: { data } } = await request.put('/event', { events: props });
      getMessage(data, 'eventsStatuses');
      dispatch({ type: actions.UPDATE_EVENT, data });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.UPDATE_EVENT_FAIL });
    }
  },
  toggleSoftDeleteEvent: (props, withoutFilter) => async (dispatch) => {
    try {
      const { data: { data } } = await request.patch('/asset_calendar', { actions: props });
      checkSoftDeleteStatuses(data);
      dispatch({ type: actions.TOGGLE_SOFT_DELETE_EVENT, data, withoutFilter });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.TOGGLE_SOFT_DELETE_EVENT_FAIL });
    }
  },
  createEvent: props => async (dispatch) => {
    try {
      const { data: { data: event } } = await request.post('/event', props);
      getSingleMessage({ data: event, status: 'created' }, 'eventsStatuses');
      dispatch({ type: actions.CREATE_EVENT });
    } catch (errorObj) {
      const error = getError(errorObj);
      errorMessage(error);
      dispatch({ type: actions.CREATE_EVENT_FAIL });
    }
  },
  removeUpdatedStatus: () => (dispatch) => {
    dispatch({ type: actions.REMOVE_UPDATED_STATUS });
  },
};
export default actions;
