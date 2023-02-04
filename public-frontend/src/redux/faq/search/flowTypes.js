// @flow
import {
  FaqSectionType,
  FaqQuestionType,
} from 'models';
import {
  SEARCH_FAQ,
  SEARCH_FAQ_START,
  SEARCH_FAQ_SUCCESS,
  SEARCH_FAQ_FAIL,
} from './types';

type SearchFaqType = {
  type: SEARCH_FAQ,
  payload: {
    query: string,
    section: FaqSectionType,
    courseId?: number
  }
};

type SearchFaqStartType = {
  type: SEARCH_FAQ_START
};

type SearchFaqSuccessType = {
  type: SEARCH_FAQ_SUCCESS,
  payload: {
    questions: Array<FaqQuestionType>
  }
};

type StartType = SearchFaqStartType;

type SuccessType = SearchFaqSuccessType;

type FailType = {
  type: SEARCH_FAQ_FAIL,
  payload: string | null
};

type StateType = {
  questions: Array<number>,
  isLoading: boolean
};

export {
  SearchFaqType,
  SearchFaqStartType,
  SearchFaqSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
