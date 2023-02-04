// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  COURSE,
  FAQ_SEARCH,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import { FaqSections } from 'models';
import {
  SEARCH_FAQ,
  SEARCH_FAQ_START,
  SEARCH_FAQ_SUCCESS,
  SEARCH_FAQ_FAIL,
} from './types';
import {
  SearchFaqType,
} from './flowTypes';

function* searchFaq(
  {
    payload: {
      query,
      section,
      courseId,
    },
  }: SearchFaqType,
): Saga<void> {
  try {
    yield put({ type: SEARCH_FAQ_START });

    const {
      data: {
        data: questions,
      },
    } = yield apiCall({
      type: 'GET',
      url: section === FaqSections.course && courseId
        ? `${COURSE}/${courseId}/${FAQ_SEARCH}?query=${query}`
        : `${FAQ_SEARCH}?query=${query}`,
      isToken: true,
    });

    yield put({
      type: SEARCH_FAQ_SUCCESS,
      payload: {
        questions,
      },
    });
  } catch (error) {
    yield put({
      type: SEARCH_FAQ_FAIL,
      payload: getError(error),
    });
  }
}

function* faqSearchSaga(): Saga<void> {
  yield all([
    takeLatest(SEARCH_FAQ, searchFaq),
  ]);
}

export default faqSearchSaga;
