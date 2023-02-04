// @flow

import { COURSE_TABS_ENUM } from './enums';

const PATHS = {
  home: '/',
  communication: '/communication',
  organisations: '/organisations',
  administrators: '/administrators',
  students: '/students',
  support: '/support',
  courses: '/courses',
  signin: '/signin',
  dashboard: '/dashboard',
  studentCourses: '/student-courses',
  studentCourse: '/student-course',
  organisationsSwitch: '/my-organisations',
  profile: '/profile',
  studentCommunication: '/student-communication',
  certificates: '/certificates',
  email: '/email',
  regLink: '/registration-links/:uid',
};

const COURSE_PATHS = {
  course: (id: string): string => `/course/${id}`,
  communication: (id: string): string => `/course/${id}/communication`,
  students: (id: string): string => `/course/${id}/students`,
  administrators: (id: string): string => `/course/${id}/administrators`,
  results: (id: string): string => `/course/${id}/results`,
};

const SUPPORT_PATHS = {
  support: (
    page?: 'faq' | 'contact-us' = ':page(faq|contact-us)?',
  ): string => `${PATHS.support}/${page}`,
};

const STUDENT_COURSE_TABS = Object.values(COURSE_TABS_ENUM);

type StudentCourseTabType = $Values<STUDENT_COURSE_TABS>;

const STUDENT_COURSE_PATHS = {
  list: (): string => PATHS.studentCourses,
  course: (
    id?: number = ':id',
    tab?: StudentCourseTabType = `:tab(${STUDENT_COURSE_TABS.join('|')})?`,
  ): string => `${PATHS.studentCourse}/${id}/${tab}`,
  topics: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.topics,
  ),
  studyPlan: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.studyPlan,
  ),
  communication: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.communication,
  ),
  information: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.information,
  ),
  certification: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.certification,
  ),
  faq: (courseId?: number): string => STUDENT_COURSE_PATHS.course(
    courseId,
    COURSE_TABS_ENUM.faq,
  ),
};

export {
  PATHS,
  COURSE_PATHS,
  SUPPORT_PATHS,
  STUDENT_COURSE_PATHS,
};
