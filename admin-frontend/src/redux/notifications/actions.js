import URLS from 'redux/urls';
import request from 'components/restApi';
import { errorMessage } from 'helpers/utility';
import { getErrorMessage } from '../../utils';

const config = {
  headers: { 'content-type': 'application/json' },
};

const actions = {
  SET_LIST_NOTIFICATIONS: 'SET_LIST_NOTIFICATIONS',
  SET_FOUND_LIST_LMS_GROUPS: 'SET_FOUND_LIST_LMS_GROUPS',
  SET_FOUND_LIST_STUDENTS: 'SET_FOUND_LIST_STUDENTS',
  SET_CURRENT_LMS_GROUP: 'SET_CURRENT_LMS_GROUP',
  SET_CURRENT_STUDENT: 'SET_CURRENT_STUDENT',
  SET_NOTIFICATIONS_TARGET_TYPE: 'SET_NOTIFICATIONS_TARGET_TYPE',
  CREATE_MESSAGE_SUCCESS: 'CREATE_MESSAGE_SUCCESS',
  CREATE_MESSAGE_FAIL: 'CREATE_MESSAGE_FAIL',
  CREATE_TRIGGER_SUCCESS: 'CREATE_TRIGGER_SUCCESS',
  CREATE_TRIGGER_FAIL: 'CREATE_TRIGGER_FAIL',
  CREATE_SEND_TO_SUCCESS: 'CREATE_SEND_TO_SUCCESS',
  CREATE_SEND_TO_FAIL: 'CREATE_SEND_TO_FAIL',
  GET_NEW_NOTIFICATIONS_START: 'GET_NEW_NOTIFICATIONS_START',
  GET_NEW_NOTIFICATIONS_SUCCESS: 'GET_NEW_NOTIFICATIONS_SUCCESS',
  GET_NEW_NOTIFICATIONS_FAIL: 'GET_NEW_NOTIFICATIONS_FAIL',
  CLEAR_NOTIFICATION_TARGET_TYPE: 'CLEAR_NOTIFICATION_TARGET_TYPE',
  SET_INIT_STATE_NOTIFICATIONS: 'SET_INIT_STATE_NOTIFICATIONS',
  GET_REMINDERS_NOTIFICATIONS_START: 'GET_REMINDERS_NOTIFICATIONS_START',
  GET_REMINDERS_NOTIFICATIONS_SUCCESS: 'GET_REMINDERS_NOTIFICATIONS_SUCCESS',
  GET_REMINDERS_NOTIFICATIONS_FAIL: 'GET_REMINDERS_NOTIFICATIONS_FAIL',
  CREATE_REMINDERS_NOTIFICATIONS_TO_SUCCESS: 'CREATE_REMINDERS_NOTIFICATIONS_TO_SUCCESS:',
  CREATE_REMINDERS_NOTIFICATIONS_TO_FAIL: 'CREATE_REMINDERS_NOTIFICATIONS_TO_FAIL',
  CREATE_SEND_NOTIFICATIONS_TO_SUCCESS: 'CREATE_SEND_NOTIFICATIONS_TO_SUCCESS',
  CREATE_SEND_NOTIFICATIONS_TO_FAIL: 'CREATE_SEND_NOTIFICATIONS_TO_FAIL',
  GET_REMINDERS_NOTIFICATION_BY_ID_START: 'GET_REMINDERS_NOTIFICATION_BY_ID_START',
  GET_REMINDERS_NOTIFICATION_BY_ID_SUCCESS: 'GET_REMINDERS_NOTIFICATION_BY_ID_SUCCESS',
  GET_REMINDERS_NOTIFICATION_BY_ID_FAIL: 'GET_REMINDERS_NOTIFICATION_BY_ID_FAIL',
  DELETE_REMINDERS_NOTIFICATIONS_TO_SUCCESS: 'DELETE_REMINDERS_NOTIFICATIONS_TO_SUCCESS',
  DELETE_REMINDERS_NOTIFICATIONS_TO_FAIL: 'DELETE_REMINDERS_NOTIFICATIONS_TO_FAIL',
  ENABLE_REMINDERS_NOTIFICATIONS_TO_SUCCESS: 'ENABLE_REMINDERS_NOTIFICATIONS_TO_SUCCESS',
  ENABLE_REMINDERS_NOTIFICATIONS_TO_FAIL: 'ENABLE_REMINDERS_NOTIFICATIONS_TO_FAIL',
  GET_EVENT_NOTIFICATION_START: 'GET_EVENT_NOTIFICATION_START',
  GET_EVENT_NOTIFICATION_SUCCESS: 'GET_EVENT_NOTIFICATION_SUCCESS',
  GET_EVENT_NOTIFICATION_FAIL: 'GET_EVENT_NOTIFICATION_FAIL',

  clearNotificationTargetType: () => (dispatch) => {
    dispatch({ type: actions.CLEAR_NOTIFICATION_TARGET_TYPE });
  },

  getNewNotifications: query => async (dispatch) => {
    try {
      dispatch({
        type: actions.GET_NEW_NOTIFICATIONS_START,
      });
      const { data: { data } } = await request.get(`${URLS.notificationsGetList}?${query}`);
      dispatch({
        type: actions.GET_NEW_NOTIFICATIONS_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: actions.GET_NEW_NOTIFICATIONS_FAIL,
      });
      const { response: { data } = {} } = e;
      errorMessage(data);
    }
  },

  setListNotificatons: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.notificationsGetList}?${query}`);
      dispatch({
        type: actions.SET_LIST_NOTIFICATIONS,
        payload: data,
      });
    } catch ({ response: { data } = {} }) {
      errorMessage(data);
    }
  },

  setFoundListLMSGroup: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.lmsGroupsGet}?${query}`);
      dispatch({
        type: actions.SET_FOUND_LIST_LMS_GROUPS,
        payload: data,
      });
    } catch ({ message }) {
      errorMessage(message);
    }
  },

  setFoundListStudent: query => async (dispatch) => {
    try {
      const { data: { data } } = await request.get(`${URLS.studentsGetStudents}?${query}`);
      dispatch({
        type: actions.SET_FOUND_LIST_STUDENTS,
        payload: data,
      });
    } catch (message) {
      errorMessage(message);
    }
  },

  setCurrentStudent: item => (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_STUDENT,
      payload: item,
    });
  },

  setCurrentLMSGroup: item => (dispatch) => {
    dispatch({
      type: actions.SET_CURRENT_LMS_GROUP,
      payload: item,
    });
  },

  createMessageNotification: body => async (dispatch) => {
    try {
      await request.post(URLS.notificationsGetList, body, config);
      dispatch({
        type: actions.CREATE_MESSAGE_SUCCESS,
      });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_MESSAGE_FAIL,
      });
      errorMessage(message);
    }
  },

  createTriggerNotification: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.notificationsTriggers, body, config);
      dispatch({
        type: actions.CREATE_TRIGGER_SUCCESS,
        payload: data,
      });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_TRIGGER_FAIL,
      });
      errorMessage(message);
    }
  },

  createSendToNotification: body => async (dispatch) => {
    try {
      await request.post(URLS.notificationsSendTo, body, config);
      dispatch({
        type: actions.CREATE_SEND_TO_SUCCESS,
      });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_SEND_TO_FAIL,
      });
      errorMessage(message);
    }
  },

  setNotificationTargetType: type => (dispatch) => {
    dispatch({
      type: actions.SET_NOTIFICATIONS_TARGET_TYPE,
      payload: type,
    });
  },
  setInitStateNotifications: () => (dispatch) => {
    dispatch({ type: actions.SET_INIT_STATE_NOTIFICATIONS });
  },

  getAutomaticReminders: query => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATIONS_START });
      const { data: { data } } = await request.get(`${URLS.automaticReminders}?${query}`);
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATIONS_FAIL });
      const error = getErrorMessage(e);
      errorMessage(error);
    }
  },

  getAutomaticReminderById: query => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATION_BY_ID_START });
      const { data: { data } } = await request.get(`${URLS.automaticReminderById(query)}`);
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATION_BY_ID_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: actions.GET_REMINDERS_NOTIFICATION_BY_ID_FAIL });
      const error = getErrorMessage(e);
      errorMessage(error);
    }
  },

  sendAutomaticReminders: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.automaticReminders, body, config);
      dispatch({ type: actions.CREATE_REMINDERS_NOTIFICATIONS_TO_SUCCESS, payload: data });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_REMINDERS_NOTIFICATIONS_TO_FAIL,
      });
      errorMessage(message);
    }
  },

  updateAutomaticReminders: (body, id) => async (dispatch) => {
    try {
      const { data: { data } } = await request.put(`${URLS.automaticReminders}/${id}`, body, config);
      dispatch({ type: actions.CREATE_REMINDERS_NOTIFICATIONS_TO_SUCCESS, payload: data });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_REMINDERS_NOTIFICATIONS_TO_FAIL,
      });
      errorMessage(message);
    }
  },

  deleteAutomaticReminders: body => async (dispatch) => {
    try {
      await request.delete(URLS.deleteAutomaticReminders(body));
      dispatch({ type: actions.DELETE_REMINDERS_NOTIFICATIONS_TO_SUCCESS, payload: body });
    } catch ({ message }) {
      dispatch({
        type: actions.DELETE_REMINDERS_NOTIFICATIONS_TO_FAIL,
      });
      errorMessage(message);
    }
  },

  enableAutomaticReminders: body => async (dispatch) => {
    try {
      dispatch({ type: actions.ENABLE_REMINDERS_NOTIFICATIONS_TO_SUCCESS, payload: body.id });
      await request.put(URLS.enableAutomaticReminders, body);
    } catch ({ message }) {
      dispatch({
        type: actions.ENABLE_REMINDERS_NOTIFICATIONS_TO_FAIL,
        payload: body.id,
      });
      errorMessage(message);
    }
  },

  sendNotifications: body => async (dispatch) => {
    try {
      const { data: { data } } = await request.post(URLS.sendNotifications, body, config);
      dispatch({ type: actions.CREATE_SEND_NOTIFICATIONS_TO_SUCCESS, payload: data });
    } catch ({ message }) {
      dispatch({
        type: actions.CREATE_SEND_NOTIFICATIONS_TO_FAIL,
      });
      errorMessage(message);
    }
  },

  getEventNotifications: () => async (dispatch) => {
    try {
      dispatch({ type: actions.GET_EVENT_NOTIFICATION_START });
      const { data: { data } } = await request.get(URLS.notificationsTriggers);
      dispatch({ type: actions.GET_EVENT_NOTIFICATION_SUCCESS, payload: data });
    } catch ({ message }) {
      dispatch({
        type: actions.GET_EVENT_NOTIFICATION_FAIL,
      });
      errorMessage(message);
    }
  },
};

export default actions;
