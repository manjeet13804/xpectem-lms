// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import type { Saga } from 'redux-saga';
import {
  COURSE,
  FAQ,
} from 'constants/apiUrls';
import { getError, apiCall } from 'redux/@utils/apiCall';
import {
  FaqSections,
  FaqTopicType,
  FaqTopicFullType,
  FaqQuestionType,
} from 'models';
import {
  GET_FAQ,
  GET_FAQ_START,
  GET_FAQ_SUCCESS,
  GET_FAQ_FAIL,
} from './types';
import {
  GetFaqType,
} from './flowTypes';

function* getFaq(
  {
    payload: {
      section,
      courseId,
    },
  }: GetFaqType,
): Saga<void> {
  try {
    yield put({ type: GET_FAQ_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: section === FaqSections.course && courseId
        ? `${COURSE}/${courseId}/${FAQ}`
        : `${FAQ}`,
      isToken: true,
    });

    const topics = data.map(
      ({ questions, ...topic }: FaqTopicFullType): FaqTopicType => ({
        ...topic,
        questions: questions.map(
          ({ id }: FaqQuestionType): number => id,
        ),
      }),
    );

    const questions = [].concat(
      ...data.map(
        ({ questions: qs }: FaqTopicFullType): FaqQuestionType => qs,
      ),
    );

    yield put({
      type: GET_FAQ_SUCCESS,
      payload: {
        faq: {
          courseId,
          topics: topics.map(
            ({ id }: FaqTopicType): number => id,
          ),
          section,
        },
        topics,
        questions,
      },
    });
  } catch (error) {
    yield put({
      type: GET_FAQ_FAIL,
      payload: getError(error),
    });
  }
}

function* faqSaga(): Saga<void> {
  yield all([
    takeLatest(GET_FAQ, getFaq),
  ]);
}

export default faqSaga;
