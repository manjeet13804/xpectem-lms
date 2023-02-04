// @flow
import { CommunicationType } from 'models';
import types from './types';

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
  GET_COMMUNICATION_DIALOG_REQUEST,
  GET_COMMUNICATION_DIALOG_START,
  GET_COMMUNICATION_DIALOG_SUCCESS,
  GET_COMMUNICATION_DIALOG_FAIL,
  ADD_COMMUNICATION_DIALOG_REQUEST,
  ADD_COMMUNICATION_DIALOG_START,
  ADD_COMMUNICATION_DIALOG_SUCCESS,
  ADD_COMMUNICATION_DIALOG_FAIL,
  SET_COURSE_COMMUNICATION_ID,
  SET_COMMUNICATION_ID,
  SET_COMMUNICATION_DIALOG_ID,
  PUT_COMMUNICATION_SEARCH_REQUEST,
  PUT_COMMUNICATION_SEARCH_START,
  PUT_COMMUNICATION_SEARCH_SUCCESS,
  PUT_COMMUNICATION_SEARCH_FAIL,
  PUT_COMMUNICATION_IS_READ_REQUEST,
  PUT_COMMUNICATION_IS_READ_START,
  PUT_COMMUNICATION_IS_READ_SUCCESS,
  PUT_COMMUNICATION_IS_READ_FAIL,
} = types;

type PayloadType = {
  currentCommunicationCourseId: number | string,
  currentCommunicationId: number | string
};

type GetAllCommunicationType = {
  type: GET_ALL_COMMUNICATION_REQUEST
};

type GetCourseCommunicationType = {
  type: GET_COURSE_COMMUNICATION_REQUEST,
  payload: number | string
};

type AddCommunicationType = {
  type: ADD_COMMUNICATION_REQUEST,
  payload: {
    currentCommunicationCourseId: number,
    heading: string,
    message: string
  }
};

type GetCommunicationDialogType = {
  type: GET_COMMUNICATION_DIALOG_REQUEST,
  payload: PayloadType
};

type AddCommunicationDialogType = {
  type: ADD_COMMUNICATION_DIALOG_REQUEST,
  payload: {
    currentCommunicationCourseId: number,
    currentCommunicationId: number,
    message: string
  }
};

type SetCourseCommunicationIdType = {
  type: SET_COURSE_COMMUNICATION_ID,
  payload: number | string
};

type SetCommunicationIdType = {
  type: SET_COMMUNICATION_ID,
  payload: number | string
};

type SetCommunicationDialogIdType = {
  type: SET_COMMUNICATION_DIALOG_ID,
  payload: number | string
};

type PutCommunicationSearchType = {
  type: PUT_COMMUNICATION_SEARCH_REQUEST,
  payload: {
    search: string
  }
};

type PutCommunicationIsReadType = {
  type: PUT_COMMUNICATION_IS_READ_REQUEST,
  payload: {
    currentCommunicationCourseId: number,
    currentCommunicationId: number
  }
};


type StartType = {
  type: GET_ALL_COMMUNICATION_START
    | GET_COURSE_COMMUNICATION_START
    | GET_COMMUNICATION_DIALOG_START
    | ADD_COMMUNICATION_START
    | PUT_COMMUNICATION_SEARCH_START
    | ADD_COMMUNICATION_DIALOG_START
    | PUT_COMMUNICATION_IS_READ_START,
  payload: mixed
};

type SuccessType = {
  type: GET_ALL_COMMUNICATION_SUCCESS
    | GET_COURSE_COMMUNICATION_SUCCESS
    | GET_COMMUNICATION_DIALOG_SUCCESS
    | ADD_COMMUNICATION_SUCCESS
    | PUT_COMMUNICATION_SEARCH_SUCCESS
    | ADD_COMMUNICATION_DIALOG_SUCCESS
    | PUT_COMMUNICATION_IS_READ_SUCCESS,
  payload: Array<CommunicationType>
};

type FailType = {
  type: GET_ALL_COMMUNICATION_FAIL
    | GET_COURSE_COMMUNICATION_FAIL
    | GET_COMMUNICATION_DIALOG_FAIL
    | ADD_COMMUNICATION_FAIL
    | PUT_COMMUNICATION_SEARCH_FAIL
    | ADD_COMMUNICATION_DIALOG_FAIL
    | PUT_COMMUNICATION_IS_READ_FAIL,
  payload: string | null
};

type StateType = {
  error: boolean,
  isLoading: true,
  data: Array<CommunicationType>
};

export {
  GetAllCommunicationType,
  GetCourseCommunicationType,
  AddCommunicationType,
  GetCommunicationDialogType,
  AddCommunicationDialogType,
  SetCommunicationIdType,
  SetCourseCommunicationIdType,
  SetCommunicationDialogIdType,
  PutCommunicationSearchType,
  PutCommunicationIsReadType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
