// @flow
import {
  StateType,
  StartType,
  FailType,
  SuccessType,
  AddMyOrganisationType,
  SetMyOrganisationIdType,
} from '../flowTypes';
import types from '../types';


const {
  GET_ALL_MY_ORGANISATION_START,
  GET_ALL_MY_ORGANISATION_FAIL,
  GET_ALL_MY_ORGANISATION_SUCCESS,
  SET_MY_ORGANISATION_ID,
  ADD_MY_ORGANISATION,
  GET_MY_ORGANISATION_INFORMATION_SUCCESS,
} = types;

const INITIAL_STATE = {
  error: null,
  data: [],
  isLoading: false,
  currentId: null,
  organisationId: null,
  logoImageUri: '',
  userWelcomeText: null,
};

type ActionType = StartType
  | FailType
  | SuccessType
  | AddMyOrganisationType
  | SetMyOrganisationIdType;


export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case GET_ALL_MY_ORGANISATION_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
        currentId: payload.length ? payload[0].id : null,
      };
    }

    case GET_ALL_MY_ORGANISATION_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case GET_ALL_MY_ORGANISATION_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    case SET_MY_ORGANISATION_ID: {
      return {
        ...state,
        currentId: payload,
      };
    }

    case ADD_MY_ORGANISATION: {
      const {data} = state;
      return {
        ...state,
        data: [
          payload,
          ...data,
        ],
      };
    }

    case GET_MY_ORGANISATION_INFORMATION_SUCCESS: {
      const {
        data: {
          id,
          logoImageUri,
          userWelcomeText,
        },
      } = payload;

      return {
        ...state,
        organisationId: id,
        logoImageUri,
        userWelcomeText,
      };
    }

    default:
      return state;
  }
};
