// @flow
import types from '../types';

const {
  GET_STUDY_PLAN_START,
  GET_STUDY_PLAN_SUCCESS,
  GET_STUDY_PLAN_FAIL,
  SET_STUDY_PLAN_PARAM_START,
  SET_STUDY_PLAN_PARAM_SUCCESS,
  SET_STUDY_PLAN_PARAM_FAIL,
} = types;


const INITIAL_STATE = {
  error: null,
  data: {},
  isLoading: false,
};

export default (state: StateType = INITIAL_STATE, {type, payload}: object): StateType => {
  switch (type) {
    case GET_STUDY_PLAN_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case GET_STUDY_PLAN_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
      };
    }

    case GET_STUDY_PLAN_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    case SET_STUDY_PLAN_PARAM_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case SET_STUDY_PLAN_PARAM_SUCCESS: {
      return {
        ...state,
        error: null,
        data: payload,
        isLoading: false,
      };
    }

    case SET_STUDY_PLAN_PARAM_FAIL: {
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
