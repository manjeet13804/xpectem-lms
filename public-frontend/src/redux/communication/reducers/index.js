// @flow
import types from '../types';

import {
  GetAllCommunicationType,
  GetCourseCommunicationType,
  AddCommunicationType,
  GetCommunicationDialogType,
  AddCommunicationDialogType,
  SetCommunicationIdType,
  SetCommunicationDialogIdType,
  PutCommunicationSearchType,
  PutCommunicationIsReadType,
  StartType,
  SuccessType,
  FailType,
  StateType,
} from '../flowTypes';

const {
  GET_ALL_COMMUNICATION_START,
  GET_ALL_COMMUNICATION_SUCCESS,
  GET_ALL_COMMUNICATION_FAIL,
  GET_COURSE_COMMUNICATION_START,
  GET_COURSE_COMMUNICATION_SUCCESS,
  GET_COURSE_COMMUNICATION_FAIL,
  ADD_COMMUNICATION_START,
  ADD_COMMUNICATION_SUCCESS,
  ADD_COMMUNICATION_FAIL,
  GET_COMMUNICATION_DIALOG_START,
  GET_COMMUNICATION_DIALOG_SUCCESS,
  GET_COMMUNICATION_DIALOG_FAIL,
  ADD_COMMUNICATION_DIALOG_START,
  ADD_COMMUNICATION_DIALOG_SUCCESS,
  ADD_COMMUNICATION_DIALOG_FAIL,
  SET_COURSE_COMMUNICATION_ID,
  SET_COMMUNICATION_ID,
  PUT_COMMUNICATION_SEARCH_START,
  PUT_COMMUNICATION_SEARCH_SUCCESS,
  PUT_COMMUNICATION_SEARCH_FAIL,
  PUT_COMMUNICATION_IS_READ_START,
  PUT_COMMUNICATION_IS_READ_SUCCESS,
  PUT_COMMUNICATION_IS_READ_FAIL,
  DELETE_LAST_MESSAGE_SUCCESS,
  CLOSE_ALL_DIALOG,
  CLEAR_COMMUNICATION,
} = types;

const INITIAL_STATE = {
  error: null,
  data: [],
  search: [],
  isLoading: false,
  currentCommunicationCourseId: null,
  currentCommunicationId: null,
  currentDialogId: null,
};

type ActionType = StartType
  | FailType
  | SuccessType
  | GetAllCommunicationType
  | GetCourseCommunicationType
  | AddCommunicationType
  | GetCommunicationDialogType
  | AddCommunicationDialogType
  | SetCommunicationIdType
  | SetCommunicationDialogIdType
  | PutCommunicationSearchType
  | PutCommunicationIsReadType;

export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case GET_ALL_COMMUNICATION_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
      };
    }
    case GET_ALL_COMMUNICATION_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case GET_ALL_COMMUNICATION_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case GET_COURSE_COMMUNICATION_SUCCESS: {
      return {
        ...state,
        error: null,
        communicationList: payload,
        isLoading: false,
      };
    }
    case GET_COURSE_COMMUNICATION_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case CLEAR_COMMUNICATION: {
      return {
        ...INITIAL_STATE,
      };
    }
    case GET_COURSE_COMMUNICATION_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case CLOSE_ALL_DIALOG: {
      const { communicationList } = state;
      return {
        ...state,
        communicationList: communicationList.map(item => ({ ...item, openQuest: false })),
      };
    }

    case GET_COMMUNICATION_DIALOG_SUCCESS: {
      const { communicationList } = state;
      const { dialogList, currentCommunicationId, isOpenAll } = payload;
      const idx = communicationList.findIndex(
        ({ id }: number): object => id === currentCommunicationId,
      );
      const item = {
        ...communicationList[idx],
        dialogList,
        openQuest: isOpenAll || !communicationList[idx].openQuest,
        newMessageCount: 0,
      };

      return {
        ...state,
        error: null,
        communicationList: communicationList.map(
          (clistItem: object): object => (clistItem.id === currentCommunicationId
            ? item
            : clistItem),
        ),
        isLoading: false,
      };
    }
    case GET_COMMUNICATION_DIALOG_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case GET_COMMUNICATION_DIALOG_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case ADD_COMMUNICATION_SUCCESS: {
      const { communicationList } = state;
      const { data } = payload;
      const rebuildedData = {
        ...data,
        title: data.heading,
        firstName: data.author.firstName,
        lastName: data.author.lastName,
        newMessageCount: 0,
        messages: 0,
        isClosed: false,
      };
      return {
        ...state,
        isLoading: false,
        communicationList: [
          rebuildedData,
          ...communicationList,
        ],
      };
    }
    case ADD_COMMUNICATION_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case ADD_COMMUNICATION_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case ADD_COMMUNICATION_DIALOG_SUCCESS: {
      const { communicationList } = state;
      const { currentCommunicationId, messageData: {data} } = payload;

      const communicationListNew = communicationList.map((el) => {
        if (el.id === currentCommunicationId) {
          return { ...el, messages: Number(el.messages) + 1, dialogList: [...el.dialogList, data]};
        }
        return el;
      });

      return {
        ...state,
        communicationList: communicationListNew,
        isLoading: false,
      };
    }

    case ADD_COMMUNICATION_DIALOG_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case ADD_COMMUNICATION_DIALOG_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }
    case SET_COURSE_COMMUNICATION_ID: {
      return {
        ...state,
        currentCommunicationCourseId: payload,
      };
    }
    case SET_COMMUNICATION_ID: {
      return {
        ...state,
        currentCommunicationId: payload,
      };
    }
    case PUT_COMMUNICATION_SEARCH_START: {
      return {
        ...state,
        search: [],
        isLoading: true,
      };
    }
    case PUT_COMMUNICATION_SEARCH_SUCCESS: {
      return {
        ...state,
        search: payload.data,
        isLoading: false,
      };
    }
    case PUT_COMMUNICATION_SEARCH_FAIL: {
      return {
        ...state,
        search: [],
        isLoading: false,
      };
    }
    case PUT_COMMUNICATION_IS_READ_START: {
      return {
        ...state,
        search: [],
        isLoading: true,
      };
    }
    case PUT_COMMUNICATION_IS_READ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case PUT_COMMUNICATION_IS_READ_FAIL: {
      return {
        ...state,
        search: [],
        isLoading: false,
      };
    }

    case DELETE_LAST_MESSAGE_SUCCESS: {
      const { dialogId, messageId } = payload;
      const { communicationList } = state;

      const newCommunicationList = communicationList.map((item) => {
        if (item.id === dialogId) {
          return {...item, dialogList: item.dialogList.filter(el => el.id !== messageId) };
        }

        return item;
      });

      return {
        ...state,
        communicationList: newCommunicationList,
      };
    }
    default:
      return state;
  }
};
