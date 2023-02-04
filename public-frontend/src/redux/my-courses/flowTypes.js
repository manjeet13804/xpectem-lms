// @flow
import {
  MyCourseType,
  ByIdType,
  TopicType,
  LessonType,
  AssignmentType,
  ExamType,
} from 'models';
import {
  GET_MY_COURSE,
  GET_WELCOME_LETTER_URL,
  GET_WELCOME_LETTER_RICH_TEXT,
  GET_MY_COURSE_START,
  GET_MY_COURSE_SUCCESS,
  GET_MY_COURSE_FAIL,
  GET_MY_COURSES,
  GET_MY_COURSES_START,
  GET_MY_COURSES_SUCCESS,
  GET_MY_COURSES_FAIL,
} from './types';

type GetMyCourseType = {
  type: GET_MY_COURSE,
  payload: {
    courseId: number
  }
};

type GetWelcomeLetterUrlType = {
  type: GET_WELCOME_LETTER_URL,
  payload: {
    courseId: number,
    welcomeLetterURL: string
  }
};

type GetWelcomeLetterRichTextType = {
  type: GET_WELCOME_LETTER_RICH_TEXT,
  payload: {
    courseId: number,
    welcomeLetterRichText: string
  }
};

type GetMyCourseSuccessType = {
  type: GET_MY_COURSE_SUCCESS,
  payload: {
    courseId: number,
    courses: ByIdType<MyCourseType>,
    topics: ByIdType<TopicType>,
    lessons: ByIdType<LessonType>,
    assignments: ByIdType<AssignmentType>,
    exams: ByIdType<ExamType>
  }
};

type GetMyCoursesType = {
  type: GET_MY_COURSES
};

type GetMyCoursesSuccessType = {
  type: GET_MY_COURSES_SUCCESS,
  payload: {
    courses: ByIdType<MyCourseType>
  }
};

type StartType = {
  type: GET_MY_COURSE_START | GET_MY_COURSES_START
};

type SuccessType = GetMyCourseSuccessType | GetMyCoursesSuccessType;

type FailType = {
  type: GET_MY_COURSE_FAIL | GET_MY_COURSES_FAIL,
  payload: string | null
};

type StateType = {
  [key: string]: MyCourseType
};

export {
  GetMyCourseType,
  GetWelcomeLetterUrlType,
  GetWelcomeLetterRichTextType,
  GetMyCourseSuccessType,
  GetMyCoursesType,
  GetMyCoursesSuccessType,
  StartType,
  SuccessType,
  FailType,
  StateType,
};
