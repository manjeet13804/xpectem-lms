// @flow
import {
  put,
  takeLatest,
  all,
} from 'redux-saga/effects';
import { Saga } from 'redux-saga';
import {
  MYCOURSES,
} from 'constants/apiUrls';
import { getError, apiCall, apiDownload } from 'redux/@utils/apiCall';
import { normalize } from 'normalizr';
import {
  GetMyCourseType,
  GetWelcomeLetterUrlType,
} from './flowTypes';
import {
  GET_MY_COURSE,
  GET_MY_COURSE_START,
  GET_MY_COURSE_SUCCESS,
  GET_MY_COURSE_FAIL,
  GET_MY_COURSES,
  GET_MY_COURSES_START,
  GET_MY_COURSES_SUCCESS,
  GET_MY_COURSES_FAIL,
  GET_WELCOME_LETTER_URL,
  GET_WELCOME_LETTER_RICH_TEXT,
} from './types';
import { course, coursesByGroup } from './schema';

function* getMyCourse(
  {
    payload: {
      courseId,
    },
  }: GetMyCourseType,
): Saga<void> {
  try {
    yield put({ type: GET_MY_COURSE_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: `${MYCOURSES}/${courseId}`,
      isToken: true,
    });

    const {
      entities,
    } = normalize(
      data,
      course,
    );

    yield put({
      type: GET_MY_COURSE_SUCCESS,
      payload: {
        courseId,
        assignments: {},
        courses: {},
        lessons: {},
        topics: {},
        exams: {},
        ...entities,
      },
    });
  } catch (error) {
    yield put({
      type: GET_MY_COURSE_FAIL,
      payload: getError(error),
    });
  }
}

function* getWelcomeLetterUrl(
  {
    payload: {
      courseId,
      welcomeLetterURL,
    },
  }: GetWelcomeLetterUrlType,
): Saga<void> {
  try {
    yield put({ type: GET_MY_COURSE_START });
    const {
      data: {
        data,
      },
    } = yield apiDownload({
      type: 'POST',
      url: `${MYCOURSES}/welcome-letter/${courseId}`,
      isToken: true,
      params: { welcomeLetterURL },
      fileName: 'welcome-letter',
    });
    const {
      entities,
    } = normalize(
      data,
      course,
    );

    yield put({
      type: GET_MY_COURSE_SUCCESS,
      payload: {
        courseId,
        assignments: {},
        courses: {},
        lessons: {},
        topics: {},
        exams: {},
        ...entities,
      },
    });
  } catch (error) {
    yield put({
      type: GET_MY_COURSE_FAIL,
      payload: getError(error),
    });
  }
}

function* getWelcomeLetterRichText(
  {
    payload: {
      courseId,
      welcomeLetterRichText,
    },
  }: GetWelcomeLetterUrlType,
): Saga<void> {
  try {
    yield put({ type: GET_MY_COURSE_START });
    const {
      data: {
        data,
      },
    } = yield apiDownload({
      type: 'POST',
      url: `${MYCOURSES}/welcome-letter-richText/${courseId}`,
      isToken: true,
      params: { welcomeLetterRichText },
      fileName: 'welcome-letter',
    });
    const {
      entities,
    } = normalize(
      data,
      course,
    );

    yield put({
      type: GET_MY_COURSE_SUCCESS,
      payload: {
        courseId,
        assignments: {},
        courses: {},
        lessons: {},
        topics: {},
        exams: {},
        ...entities,
      },
    });
  } catch (error) {
    yield put({
      type: GET_MY_COURSE_FAIL,
      payload: getError(error),
    });
  }
}

function* getMyCourses(): Saga<Array> {
  try {
    yield put({ type: GET_MY_COURSES_START });

    const {
      data: {
        data,
      },
    } = yield apiCall({
      type: 'GET',
      url: MYCOURSES,
      isToken: true,
    });

    const {
      entities: {
        groups,
        courses,
      },
    } = normalize(
      data,
      [coursesByGroup],
    );

    yield put({
      type: GET_MY_COURSES_SUCCESS,
      payload: {
        groups,
        courses,
      },
    });
  } catch (error) {
    yield put({
      type: GET_MY_COURSES_FAIL,
      payload: getError(error),
    });
  }
}

function* myCourseSaga(): Saga<void> {
  yield all([
    takeLatest(GET_MY_COURSE, getMyCourse),
    takeLatest(GET_MY_COURSES, getMyCourses),
    takeLatest(GET_WELCOME_LETTER_URL, getWelcomeLetterUrl),
    takeLatest(GET_WELCOME_LETTER_RICH_TEXT, getWelcomeLetterRichText),
  ]);
}
export default myCourseSaga;
