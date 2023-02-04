/* eslint-disable flowtype/require-parameter-type */
// @flow
import types from '../types';

import {
  GetAllCommunicationType,
  AddCommunicationType,
  GetCommunicationDialogType,
  AddCommunicationDialogType,
  SetCourseCommunicationIdType,
  SetCommunicationIdType,
  SetCommunicationDialogIdType,
  PutCommunicationSearchType,
  PutCommunicationIsReadType,
} from '../flowTypes';

const {
  GET_ALL_COMMUNICATION_REQUEST,
  GET_COURSE_COMMUNICATION_REQUEST,
  ADD_COMMUNICATION_REQUEST,
  GET_COMMUNICATION_DIALOG_REQUEST,
  ADD_COMMUNICATION_DIALOG_REQUEST,
  SET_COURSE_COMMUNICATION_ID,
  SET_COMMUNICATION_ID,
  SET_COMMUNICATION_DIALOG_ID,
  PUT_COMMUNICATION_SEARCH_REQUEST,
  PUT_COMMUNICATION_IS_READ_REQUEST,
  OPEN_ALL_QUESTS,
  CLICK_QUEST_REQUEST,
  DELETE_LAST_MESSAGE,
  CLEAR_COMMUNICATION,
} = types;

const openAllQuests = (currentCourseId, communicationList, isOpenAll) => ({
  type: OPEN_ALL_QUESTS,
  payload: { communicationList, currentCourseId, isOpenAll },
});

const actionClickQuest = (currentCourseId, id, cb) => ({
  type: CLICK_QUEST_REQUEST,
  payload: { currentCourseId, id, cb },
});

const clearCommunication = () => ({
  type: CLEAR_COMMUNICATION,
});

const actionGetAllCommunication = (): GetAllCommunicationType => ({
  type: GET_ALL_COMMUNICATION_REQUEST,
});

const actionGetCourseCommunication = (courseId, dialogId) => ({
  type: GET_COURSE_COMMUNICATION_REQUEST,
  payload: { courseId, dialogId },
});

const actionAddCommunication = (
  currentCommunicationCourseId: number,
  heading: string,
  message: string,
  files,
): AddCommunicationType => ({
  type: ADD_COMMUNICATION_REQUEST,
  payload: {
    currentCommunicationCourseId,
    heading,
    message,
    files,
  },
});

const actionGetCommunicationDialog = (
  currentCommunicationCourseId: number,
  currentCommunicationId: number,
): GetCommunicationDialogType => ({
  type: GET_COMMUNICATION_DIALOG_REQUEST,
  payload: {
    currentCommunicationCourseId,
    currentCommunicationId,
  },
});

const deleteLastMessage = (
  dialogId: number,
  messageId: number,
): GetCommunicationDialogType => ({
  type: DELETE_LAST_MESSAGE,
  payload: {
    dialogId,
    messageId,
  },
});

const actionAddCommunicationDialog = (
  currentCommunicationCourseId: number,
  currentCommunicationId: number,
  message: string,
  fileList,
): AddCommunicationDialogType => ({
  type: ADD_COMMUNICATION_DIALOG_REQUEST,
  payload: {
    currentCommunicationCourseId,
    currentCommunicationId,
    message,
    fileList,
  },
});

const actionSetCourseCommunicationId = (payload: number | string): SetCourseCommunicationIdType => (
  {
    type: SET_COURSE_COMMUNICATION_ID,
    payload,
  }
);

const actionSetCommunicationId = (payload: number | string): SetCommunicationIdType => ({
  type: SET_COMMUNICATION_ID,
  payload,
});

const actionSetCommunicationDialogId = (
  payload: number | string,
): SetCommunicationDialogIdType => ({
  type: SET_COMMUNICATION_DIALOG_ID,
  payload,
});

const actionCommunicationSearch = (
  search: string,
  currentCommunicationCourseId: number,
): PutCommunicationSearchType => ({
  type: PUT_COMMUNICATION_SEARCH_REQUEST,
  payload: {
    search,
    currentCommunicationCourseId,
  },
});

const actionCommunicationIsRead = (
  currentCommunicationCourseId: number,
  currentCommunicationId: number,
): PutCommunicationIsReadType => ({
  type: PUT_COMMUNICATION_IS_READ_REQUEST,
  payload: {
    currentCommunicationCourseId,
    currentCommunicationId,
  },
});

export {
  actionGetAllCommunication,
  actionGetCourseCommunication,
  actionAddCommunication,
  actionGetCommunicationDialog,
  actionAddCommunicationDialog,
  actionSetCourseCommunicationId,
  actionSetCommunicationId,
  actionSetCommunicationDialogId,
  actionCommunicationSearch,
  actionCommunicationIsRead,
  actionClickQuest,
  openAllQuests,
  deleteLastMessage,
  clearCommunication,
};
