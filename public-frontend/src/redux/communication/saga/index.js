import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  getError,
  apiCall,
} from 'redux/@utils/apiCall';
import {
  COMMUNICATION,
  COMMUNICATION_READ_MESSAGES,
  COMMUNICATION_DIALOG,
  COMMUNICATION_MESSAGE,
} from 'constants/apiUrls';
import { generateAttachedFormData } from 'utils';
import types from '../types';
import {
  AddCommunicationType,
  AddCommunicationDialogType,
  PutCommunicationSearchType,
  PutCommunicationIsReadType,
} from '../flowTypes';

const {
  GET_ALL_COMMUNICATION_REQUEST,
  GET_ALL_COMMUNICATION_START,
  GET_ALL_COMMUNICATION_SUCCESS,
  GET_ALL_COMMUNICATION_FAIL,
  GET_COURSE_COMMUNICATION_REQUEST,
  GET_COURSE_COMMUNICATION_START,
  GET_COURSE_COMMUNICATION_SUCCESS,
  GET_COURSE_COMMUNICATION_FAIL,
  ADD_COMMUNICATION_REQUEST,
  ADD_COMMUNICATION_START,
  ADD_COMMUNICATION_SUCCESS,
  ADD_COMMUNICATION_FAIL,
  ADD_COMMUNICATION_DIALOG_REQUEST,
  ADD_COMMUNICATION_DIALOG_START,
  ADD_COMMUNICATION_DIALOG_SUCCESS,
  ADD_COMMUNICATION_DIALOG_FAIL,
  GET_COMMUNICATION_DIALOG_REQUEST,
  GET_COMMUNICATION_DIALOG_START,
  GET_COMMUNICATION_DIALOG_SUCCESS,
  GET_COMMUNICATION_DIALOG_FAIL,
  PUT_COMMUNICATION_SEARCH_REQUEST,
  PUT_COMMUNICATION_SEARCH_START,
  PUT_COMMUNICATION_SEARCH_SUCCESS,
  PUT_COMMUNICATION_SEARCH_FAIL,
  PUT_COMMUNICATION_IS_READ_REQUEST,
  PUT_COMMUNICATION_IS_READ_START,
  PUT_COMMUNICATION_IS_READ_SUCCESS,
  PUT_COMMUNICATION_IS_READ_FAIL,
  OPEN_ALL_QUESTS,
  CLICK_QUEST_REQUEST,
  DELETE_LAST_MESSAGE,
  DELETE_LAST_MESSAGE_START,
  DELETE_LAST_MESSAGE_SUCCESS,
  DELETE_LAST_MESSAGE_ERROR,
  CLOSE_ALL_DIALOG,
} = types;


function* getALLCommunications(): Saga<void> {
  try {
    yield put({ type: GET_ALL_COMMUNICATION_START});
    const {data: {data}} = yield apiCall({
      type: 'GET',
      url: `${COMMUNICATION}`,
      isToken: true,
    });

    yield put({
      type: GET_ALL_COMMUNICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({ type: GET_ALL_COMMUNICATION_FAIL, payload: getError(error) });
  }
}

function* getCourseCommunications({ payload }) {
  const { courseId, dialogId } = payload;
  try {
    yield put({ type: GET_COURSE_COMMUNICATION_START});
    const {data: { data } } = yield apiCall({
      type: 'GET',
      url: `${COMMUNICATION}/${courseId}`,
      isToken: true,
    });
    yield put({
      type: GET_COURSE_COMMUNICATION_SUCCESS,
      payload: data.reverse(),
    });

    if (dialogId) {
      yield all([
        getCommunicationDialog({
          payload: {
            currentCommunicationCourseId: courseId,
            currentCommunicationId: dialogId,
          },
        }),
        putCommunicationIsRead({ payload: { currentCommunicationId: dialogId } }),
      ]);
    }
  } catch (error) {
    yield put({ type: GET_COURSE_COMMUNICATION_FAIL, payload: getError(error) });
  }
}

function* getCommunicationDialog({
  payload: {
    currentCommunicationCourseId,
    currentCommunicationId,
    isOpenAll,
  },
}: {payload: number | string}): Saga<void> {
  try {
    yield put({ type: GET_COMMUNICATION_DIALOG_START});
    const {data: {data}} = yield apiCall({
      type: 'GET',
      url: `${COMMUNICATION}/${currentCommunicationCourseId}/${currentCommunicationId}`,
      isToken: true,
    });
    yield put({
      type: GET_COMMUNICATION_DIALOG_SUCCESS,
      payload: { dialogList: data, currentCommunicationId, isOpenAll },
    });
  } catch (error) {
    yield put({ type: GET_COMMUNICATION_DIALOG_FAIL, payload: getError(error) });
  }
}

function* addCommunication({payload}: AddCommunicationType): Saga<void> {
  try {
    yield put({ type: ADD_COMMUNICATION_START});
    const {
      currentCommunicationCourseId,
      heading,
      message,
      files,
    } = payload;
    const rebuildedFiles = files ? files.map(({ originFileObj }) => originFileObj) : null;
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('message', message);
    rebuildedFiles && generateAttachedFormData(formData, rebuildedFiles);
    const { data } = yield apiCall({
      type: 'POST',
      url: `${COMMUNICATION}/${currentCommunicationCourseId}`,
      isToken: true,
      body: formData,
    });
    yield put({ type: ADD_COMMUNICATION_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: ADD_COMMUNICATION_FAIL, payload: getError(error) });
  }
}

function* addCommunicationDialog({payload}: AddCommunicationDialogType): Saga<void> {
  try {
    yield put({ type: ADD_COMMUNICATION_DIALOG_START});
    const {
      currentCommunicationCourseId,
      currentCommunicationId,
      message,
      fileList,
    } = payload;
    const files = fileList.map(({ originFileObj }) => originFileObj);

    const formData = new FormData();
    formData.append('message', message);
    files && generateAttachedFormData(formData, files);
    const { data } = yield apiCall({
      type: 'POST',
      url: `${COMMUNICATION}/${currentCommunicationCourseId}/${currentCommunicationId}`,
      isToken: true,
      body: formData,
    });
    const newMessageData = { currentCommunicationId, messageData: data };
    yield put({ type: ADD_COMMUNICATION_DIALOG_SUCCESS, payload: newMessageData});
  } catch (error) {
    yield put({ type: ADD_COMMUNICATION_DIALOG_FAIL, payload: getError(error) });
  }
}

function* putCommunicationSearch({payload}: PutCommunicationSearchType): Saga<void> {
  try {
    yield put({type: PUT_COMMUNICATION_SEARCH_START});
    const { search, currentCommunicationCourseId } = payload;
    const { data } = yield apiCall({
      type: 'PUT',
      url: `${COMMUNICATION}/${currentCommunicationCourseId}`,
      isToken: true,
      body: {
        search,
      },
    });
    yield put({type: PUT_COMMUNICATION_SEARCH_SUCCESS, payload: data});
  } catch (error) {
    yield put({type: PUT_COMMUNICATION_SEARCH_FAIL, payload: getError(error)});
  }
}

function* putCommunicationIsRead({payload}: PutCommunicationIsReadType): Saga<void> {
  try {
    yield put({type: PUT_COMMUNICATION_IS_READ_START});
    const { currentCommunicationId } = payload;
    const { data } = yield apiCall({
      type: 'PUT',
      url: `${COMMUNICATION}/${COMMUNICATION_READ_MESSAGES}/${currentCommunicationId}`,
      isToken: true,
    });
    yield put({type: PUT_COMMUNICATION_IS_READ_SUCCESS, payload: data});
  } catch (error) {
    yield put({type: PUT_COMMUNICATION_IS_READ_FAIL, payload: getError(error)});
  }
}

function* deleteLastMessage({payload}: PutCommunicationIsReadType): Saga<void> {
  try {
    yield put({type: DELETE_LAST_MESSAGE_START});
    const { dialogId, messageId } = payload;
    yield apiCall({
      type: 'DELETE',
      url: `${COMMUNICATION}/${COMMUNICATION_DIALOG}/${dialogId}/${COMMUNICATION_MESSAGE}/${messageId}`,
      isToken: true,
    });
    yield put({type: DELETE_LAST_MESSAGE_SUCCESS, payload: { dialogId, messageId }});
  } catch (error) {
    yield put({type: DELETE_LAST_MESSAGE_ERROR, payload: getError(error)});
  }
}

function* openAllDialogs({ payload }) {
  const { communicationList, currentCourseId, isOpenAll } = payload;
  if (isOpenAll) {
    const getDialogs = communicationList.map(item => getCommunicationDialog({
      payload: {
        currentCommunicationCourseId: currentCourseId,
        currentCommunicationId: item.id,
        isOpenAll,
      },
    }));
    yield all([
      ...getDialogs,
    ]);
  } else {
    yield put({ type: CLOSE_ALL_DIALOG });
  }
}

function* clickOnQuest({ payload }) {
  const { currentCourseId, id, cb } = payload;
  yield all([
    getCommunicationDialog({
      payload: {
        currentCommunicationCourseId: currentCourseId,
        currentCommunicationId: id,
      },
    }),
    putCommunicationIsRead({ payload: { currentCommunicationId: id }}),
  ]);
  if (cb) {
    cb();
  }
}

function* getCommunicationSaga(): Saga<void> {
  yield all([
    takeLatest(GET_ALL_COMMUNICATION_REQUEST, getALLCommunications),
    takeLatest(GET_COURSE_COMMUNICATION_REQUEST, getCourseCommunications),
    takeLatest(GET_COMMUNICATION_DIALOG_REQUEST, getCommunicationDialog),
    takeLatest(ADD_COMMUNICATION_REQUEST, addCommunication),
    takeLatest(PUT_COMMUNICATION_SEARCH_REQUEST, putCommunicationSearch),
    takeLatest(ADD_COMMUNICATION_DIALOG_REQUEST, addCommunicationDialog),
    takeLatest(PUT_COMMUNICATION_IS_READ_REQUEST, putCommunicationIsRead),
    takeLatest(OPEN_ALL_QUESTS, openAllDialogs),
    takeLatest(CLICK_QUEST_REQUEST, clickOnQuest),
    takeLatest(DELETE_LAST_MESSAGE, deleteLastMessage),
  ]);
}

export default getCommunicationSaga;
