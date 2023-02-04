// @flow
import { combineReducers } from 'redux';
import {
  StartType,
  SuccessType,
  FailType,
  StateType,
} from './flowTypes';
import {
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
} from './types';
import {
  updateOrCreateFaq,
} from './utils';

import searchReducer from './search/reducers';
import topicsReducer from './topics/reducers';
import questionsReducer from './questions/reducers';

const INITIAL_STATE = {
  error: null,
  data: [],
  isLoading: false,
};

type ActionType = StartType | FailType | SuccessType;

const faqReducer = (state: StateType = INITIAL_STATE, action: ActionType): StateType => {
  switch (action.type) {
    case GET_FAQ_START: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }

    case GET_FAQ_SUCCESS: {
      return {
        ...state,
        error: null,
        data: state.data.length > 0
          ? updateOrCreateFaq(state.data, action.payload.faq)
          : [action.payload.faq],
        isLoading: false,
      };
    }

    case GET_FAQ_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  faq: faqReducer,
  search: searchReducer,
  topics: topicsReducer,
  questions: questionsReducer,
});
