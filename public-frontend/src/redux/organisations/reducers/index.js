// @flow
import {
  StateType,
  StartType,
  FailType,
  SuccessType,
  AddOrganisationType,
  DeleteOrganisationType,
  SetOrganisationIdType,
} from '../flowTypes';
import types from '../types';


const {
  GET_ALL_ORGANISATION_START,
  GET_ALL_ORGANISATION_FAIL,
  GET_ALL_ORGANISATION_SUCCESS,
  SET_ORGANISATION_ID,
  ADD_ORGANISATION,
  DELETE_ORGANISATION,
} = types;

const INITIAL_STATE = {
  error: null,
  data: [],
  isLoading: false,
  currentId: null,
};

type ActionType = StartType
    | FailType
    | SuccessType
    | AddOrganisationType
    | DeleteOrganisationType
    | SetOrganisationIdType;


export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case GET_ALL_ORGANISATION_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
        currentId: payload.length ? payload[0].id : null,
      };
    }

    case GET_ALL_ORGANISATION_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case GET_ALL_ORGANISATION_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    case SET_ORGANISATION_ID: {
      return {
        ...state,
        currentId: payload,
      };
    }

    case ADD_ORGANISATION: {
      const {data} = state;
      return {
        ...state,
        data: [
          payload,
          ...data,
        ],
      };
    }

    case DELETE_ORGANISATION: {
      const {data} = state;
      return {
        ...state,
        data: data.filter((organisation: object): boolean => organisation.id !== payload),
      };
    }

    default:
      return state;
  }
};
