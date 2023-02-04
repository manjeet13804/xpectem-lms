// @flow
import {
  SupportPage,
  CoursesPage,
  CommunicationPage,
  AdministratorsPage,
  OrganisationsPage,
  StudentsPage,
  DashboardPage,
  CertificatesPage,
  StudentCoursesPage,
  StudentCoursePage,
} from 'pages';
import {
  PATHS,
  COURSE_PATHS,
  SUPPORT_PATHS,
  STUDENT_COURSE_PATHS,
} from 'constants/paths';

type RoutType = {
  path: string,
  component: Node
};

const ROUTES: Array<RoutType> = [
  {
    path: PATHS.administrators,
    component: AdministratorsPage,
  },
  {
    path: PATHS.organisations,
    component: OrganisationsPage,
  },
  {
    path: PATHS.courses,
    component: CoursesPage,
  },
  {
    path: PATHS.dashboard,
    component: DashboardPage,
  },
  {
    path: PATHS.communication,
    component: CommunicationPage,
  },
  {
    path: PATHS.students,
    component: StudentsPage,
  },
  {
    path: SUPPORT_PATHS.support(),
    component: SupportPage,
  },
  {
    path: COURSE_PATHS.course(),
    component: DashboardPage,
  },
  {
    path: STUDENT_COURSE_PATHS.list(),
    component: StudentCoursesPage,
  },
  {
    path: STUDENT_COURSE_PATHS.course(),
    component: StudentCoursePage,
  },
  {
    path: PATHS.certificates,
    component: CertificatesPage,
  },
];

export default ROUTES;
