// @flow
import {
  GET_MY_COURSE,
  GET_MY_COURSES,
  GET_WELCOME_LETTER_URL,
  GET_WELCOME_LETTER_RICH_TEXT,
} from './types';
import {
  GetMyCourseType,
  GetMyCoursesType,
  GetWelcomeLetterUrlType,
  GetWelcomeLetterRichTextType,
} from './flowTypes';

const getMyCourse = (courseId: number): GetMyCourseType => ({
  type: GET_MY_COURSE,
  payload: {
    courseId,
  },
});

const getMyCourses = (): GetMyCoursesType => ({
  type: GET_MY_COURSES,
});

const getWelcomeLetterUrl = (courseId: number, welcomeLetterURL: string): GetWelcomeLetterUrlType => ({
  type: GET_WELCOME_LETTER_URL,
  payload: {
    courseId,
    welcomeLetterURL,
  },
});

const getWelcomeLetterRichText = (courseId: number, welcomeLetterRichText: string): GetWelcomeLetterRichTextType => ({
  type: GET_WELCOME_LETTER_RICH_TEXT,
  payload: {
    courseId,
    welcomeLetterRichText,
  },
});

export {
  getMyCourse,
  getMyCourses,
  getWelcomeLetterUrl,
  getWelcomeLetterRichText,
};
