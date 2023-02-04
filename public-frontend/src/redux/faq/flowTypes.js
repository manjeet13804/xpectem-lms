// @flow
import { FaqSectionType, FaqType, FaqTopicType } from 'models';
import {
  GET_FAQ,
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
} from './types';

type GetFaqType = {
  type: GET_FAQ,
  payload: {
      section: FaqSectionType,
      courseId?: number
  }
};

type GetFaqStartType = {
  type: GET_FAQ_START
};

type GetFaqSuccessType = {
  type: GET_FAQ_SUCCESS,
  payload: {
    faq: FaqType,
    topics: Array<FaqTopicType>
  }
};

type StartType = GetFaqStartType;

type SuccessType = GetFaqSuccessType;

type FailType = {
  type: GET_FAQ_FAIL,
  payload: string | null
};

type StateType = {
  error: boolean,
  isLoading: boolean,
  data: Array<FaqType>
};

export {
  GetFaqType,
  GetFaqStartType,
  GetFaqSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
