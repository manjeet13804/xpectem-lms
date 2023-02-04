// @flow
import {
  FaqQuestionType,
} from 'models';
import {
  StartType as StartSearchType,
  SuccessType,
  FailType,
  StateType,
} from './flowTypes';
import {
  StartType as StartGetType,
} from '../flowTypes';
import {
  SEARCH_FAQ_FAIL,
  SEARCH_FAQ_START,
  SEARCH_FAQ_SUCCESS,
} from './types';
import { GET_FAQ_START } from '../types';

const INITIAL_STATE = {
  questions: [],
  isLoading: false,
};

type ActionType = StartSearchType
    | StartGetType
    | SuccessType
    | FailType;

export default (state: StateType = INITIAL_STATE, action: ActionType): StateType => {
  switch (action.type) {
    case GET_FAQ_START: {
      return INITIAL_STATE;
    }

    case SEARCH_FAQ_START: {
      return {
        questions: [],
        isLoading: true,
      };
    }

    case SEARCH_FAQ_SUCCESS: {
      return {
        questions: action.payload.questions.map(
          ({ id }: FaqQuestionType): number => id,
        ),
        isLoading: false,
      };
    }

    case SEARCH_FAQ_FAIL: {
      return {
        questions: [],
        isLoading: false,
      };
    }

    default:
      return state;
  }
};
