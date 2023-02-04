import React from 'react';
import PropType from 'prop-types';
import _ from 'lodash';
import { Route } from 'react-router-dom';
import asyncComponent from 'helpers/AsyncFunc';
import {
  MAIN_ROUTE,
  COURSES,
  ORGANISATIONS,
  ORGANISATION_ADMINISTRATORS,
  GROUPS,
  GROUPS_ADMINISTRATORS,
  STUDENTS,
  LMS_STUDENTS,
  COURSE_CREATORS,
  TUTORS,
  NOTIFICATIONS,
  DETAIL_COURSE,
  REPORTS,
} from '../../constants/routes';

const {
  home,
  start,
  profileEdit,
  profileDelete,
  profileDeleteConfirm,
  lmsGroupsAdd,
  lmsGroupsEdit,
  lmsGroupsPermissionsSearch,
  lmsGroupsPermissions,
  lmsGroupsFind,
  lmsGroupsDelete,
  lmsGroupsDeleteConfirm,
  lmsGroupsAdministratorsFindGroups,
  lmsGroupsAdministratorsEdit,
  lmsGroupsAdministratorsFindAdministrators,
  lmsGroupsAdministratorsAdd,
  lmsGroupsAdministratorsDelete,
  lmsGroupsAdministratorsDeleteConfirm,
  organisationsFindGroups,
  organisationsAdd,
  organisationsFindOrg,
  organisationsEdit,
  organisationsDelete,
  organisationsDeleteConfirm,
  orgAdminsFindOrg,
  orgAdminsEditOrg,
  orgAdminsAdd,
  orgAdminsFindAdmins,
  orgAdminsEdit,
  orgAdminsDelete,
  orgAdminsDeleteConfirm,
  orgAdminsImport,
  orgAdminsImportFind,
  orgAdminsImportStatus,
  groupsAdd,
  groupsFindOrganisations,
  groupsFindGroups,
  groupsEdit,
  groupsDelete,
  groupsDeleteConfirm,
  groupsImport,
  groupsImportStatus,
  groupsImportFindOrganisations,
  groupAdminsAdd,
  groupAdminsFindGroups,
  groupAdminsFindAdministrators,
  groupAdminsEdit,
  groupAdminsDelete,
  groupAdminsDeleteConfirm,
  groupAdminsFindGroupsForImport,
  groupAdminsImport,
  groupAdminsImportStatus,
  studentsFindGroups,
  studentsAdd,
  studentRegistrationLinks,
  studentAddRegistrationLinks,
  studentsFindGroupsForImport,
  studentsImport,
  studentsImportStatus,
  studentsFindStudents,
  studentsEditStudents,
  studentsDeleteStudent,
  studentsDeleteConfirmStudent,
  studentsTaxonomyDetails,
  coursesCreateCourse,
  coursesCreateAddFiles,
  coursesEditAddFiles,
  tutorsAdd,
  coursesEdit,
  coursesFindCourses,
  coursesCreateMMC,
  detailCourse,
  coursesEditTopic,
  coursesCreateTopic,
  coursesEditEditTopic,
  tutorsFindCourses,
  tutorsFindTutor,
  tutorsEditTutor,
  tutorsDelete,
  tutorsDeleteConfirm,
  users,
  tutorsEditTutorCourses,
  chooseCommunication,
  handleCommunication,
  sendNotifications,
  selectNotificationsTarget,
  automaticReminders,
  addAutomaticReminders,
  editAutomaticReminders,
  eventNotifications,
  notificationReport,
  groupAdminAddGroup,
  notificationReportList,
  tutorFiles,
  certification,
  courseCreatorsFindGroups,
  createCourseCreators,
  editCourseCreators,
  editCourseCreatorById,
  deleteCourseCreatorById,
  deleteCourseCreatorConfirm,
  reportsCreate,
  reportsCreateForm,
  organisationsPermissions,
  organisationsPermissionsSearch,
  groupsPermissions,
  groupsPermissionsTable,
  questionsAanswers,
  questionsAanswersEdit,
  techSupport,
} = MAIN_ROUTE;

const commonRoutes = {
  home,
  start,
  profileEdit,
  profileDelete,
  profileDeleteConfirm,
};

const ROLES_TO_ROUTES = {
  xpectum: {
    ...MAIN_ROUTE,
  },
  course_creator: {
    ...commonRoutes,
    ...COURSES,
    questionsAanswers,
  },
  admin_lms: {
    ...commonRoutes,
    ...ORGANISATIONS,
    ...ORGANISATION_ADMINISTRATORS,
    ...GROUPS,
    ...GROUPS_ADMINISTRATORS,
    ...LMS_STUDENTS,
    ...COURSES,
    ...TUTORS,
    ...COURSE_CREATORS,
    ...REPORTS,
    ...NOTIFICATIONS,
    ...DETAIL_COURSE,
    lmsGroupsEdit,
    lmsGroupsPermissionsSearch,
    lmsGroupsPermissions,
    questionsAanswers,
    studentAddRegistrationLinks,
  },
  admin_organisation: {
    ...commonRoutes,
    ...GROUPS,
    ...REPORTS,
    ...GROUPS_ADMINISTRATORS,
    ...STUDENTS,
    ...COURSES,
    ...TUTORS,
    ...NOTIFICATIONS,
    organisationsPermissionsSearch,
    organisationsPermissions,
    ...ORGANISATION_ADMINISTRATORS,
    ...DETAIL_COURSE,
    questionsAanswers,
  },
  admin_group: {
    ...commonRoutes,
    ...REPORTS,
    ...STUDENTS,
    ...NOTIFICATIONS,
    ...DETAIL_COURSE,
    questionsAanswers,
  },
  tutor: {
    ...commonRoutes,
    ...STUDENTS,
    ...DETAIL_COURSE,
    tutorFiles,
    questionsAanswers,
  },
};

const routes = [
  {
    path: home,
    component: asyncComponent(() => import('containers/MenuComponents/Start')),
  },
  {
    path: start,
    component: asyncComponent(() => import('containers/MenuComponents/Start')),
  },
  {
    path: profileEdit,
    component: asyncComponent(() => import('containers/MenuComponents/Profile/Edit')),
  },
  {
    path: profileDelete,
    component: asyncComponent(() => import('containers/MenuComponents/Profile/Delete')),
  },
  {
    path: profileDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/Profile/DeleteConfirm')),
  },
  {
    path: lmsGroupsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/AddAndEdit')),
  },
  {
    path: lmsGroupsPermissionsSearch,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/PermissionsSearch')),
  },
  {
    path: lmsGroupsPermissions,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/Permissions')),
  },
  {
    path: lmsGroupsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/AddAndEdit')),
  },
  {
    path: lmsGroupsFind,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/EditSearch')),
  },
  {
    path: lmsGroupsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/Delete')),
  },
  {
    path: lmsGroupsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroups/DeleteConfirm')),
  },
  {
    path: lmsGroupsAdministratorsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/FindGroups')),
  },
  {
    path: lmsGroupsAdministratorsFindAdministrators,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/FindAdministrators')),
  },
  {
    path: lmsGroupsAdministratorsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/Add')),
  },
  {
    path: lmsGroupsAdministratorsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/Add')),
  },
  {
    path: lmsGroupsAdministratorsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/Delete')),
  },
  {
    path: lmsGroupsAdministratorsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/LmsGroupsAdministrators/DeleteConfirm')),
  },
  {
    path: organisationsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/AddSearch')),
  },
  {
    path: organisationsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/AddAndEdit')),
  },
  {
    path: organisationsFindOrg,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/EditSearch')),
  },
  {
    path: organisationsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/AddAndEdit')),
  },
  {
    path: organisationsPermissionsSearch,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/PermissionsSearch')),
  },
  {
    path: organisationsPermissions,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/Permissions')),
  },
  {
    path: organisationsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/Delete')),
  },
  {
    path: organisationsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/Organisations/DeleteConfirm')),
  },
  {
    path: orgAdminsFindOrg,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/AddSearch')),
  },
  {
    path: orgAdminsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/AddAndEdit')),
  },
  {
    path: orgAdminsFindAdmins,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/EditSearch')),
  },
  {
    path: orgAdminsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/AddAndEdit')),
  },
  {
    path: orgAdminsEditOrg,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/AddOrganisations')),
  },
  {
    path: orgAdminsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/Delete')),
  },
  {
    path: orgAdminsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/DeleteConfirm')),
  },
  {
    path: orgAdminsImport,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/Import')),
  },
  {
    path: orgAdminsImportFind,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/ImportSearch')),
  },
  {
    path: orgAdminsImportStatus,
    component: asyncComponent(() => import('containers/MenuComponents/OrgAdministrators/ImportStatus')),
  },
  {
    path: groupsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/AddAndEdit')),
  },
  {
    path: groupsFindOrganisations,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/AddSearch')),
  },
  {
    path: groupsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/EditSearch')),
  },
  {
    path: groupsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/AddAndEdit')),
  },
  {
    path: groupsPermissions,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/PermissionsSearch')),
  },
  {
    path: groupsPermissionsTable,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/Permissions')),
  },
  {
    path: groupsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/Delete')),
  },
  {
    path: groupsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/DeleteConfirm')),
  },
  {
    path: groupsImportFindOrganisations,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/ImportSearch')),
  },
  {
    path: groupsImport,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/Import')),
  },
  {
    path: groupsImportStatus,
    component: asyncComponent(() => import('containers/MenuComponents/Groups/ImportStatus')),
  },
  {
    path: groupAdminsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/AddAndEdit')),
  },
  {
    path: groupAdminsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/AddSearch')),
  },
  {
    path: groupAdminsFindAdministrators,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/EditSearch')),
  },
  {
    path: groupAdminsEdit,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/AddAndEdit')),
  },
  {
    path: groupAdminsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/Delete')),
  },
  {
    path: groupAdminsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/DeleteConfirm')),
  },
  {
    path: groupAdminsFindGroupsForImport,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/ImportSearch')),
  },
  {
    path: groupAdminsImport,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/Import')),
  },
  {
    path: groupAdminsImportStatus,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/ImportStatus')),
  },
  {
    path: groupAdminAddGroup,
    component: asyncComponent(() => import('containers/MenuComponents/GroupAdministrators/AddRemoveGroup')),
  },
  {
    path: studentsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/Students/FindGroups')),
  },
  {
    path: studentsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/Students/Add')),
  },
  {
    path: studentRegistrationLinks,
    component: asyncComponent(() => import('containers/MenuComponents/Students/RegLinks')),
  },
  {
    path: studentAddRegistrationLinks,
    component: asyncComponent(() => import('containers/MenuComponents/Students/RegLinks/AddRegLinks')),
  },
  {
    path: studentsFindGroupsForImport,
    component: asyncComponent(() => import('containers/MenuComponents/Students/FindGroupsForImport')),
  },
  {
    path: studentsImport,
    component: asyncComponent(() => import('containers/MenuComponents/Students/Import')),
  },
  {
    path: studentsImportStatus,
    component: asyncComponent(() => import('containers/MenuComponents/Students/ImportStatus')),
  },
  {
    path: studentsFindStudents,
    component: asyncComponent(() => import('containers/MenuComponents/Students/FindStudents')),
  },
  {
    path: studentsEditStudents,
    component: asyncComponent(() => import('containers/MenuComponents/Students/Info')),
  },
  {
    path: studentsDeleteStudent,
    component: asyncComponent(() => import('containers/MenuComponents/Students/Delete')),
  },
  {
    path: studentsDeleteConfirmStudent,
    component: asyncComponent(() => import('containers/MenuComponents/Students/DeleteConfirm')),
  },
  {
    path: studentsTaxonomyDetails,
    component: asyncComponent(() => import('containers/MenuComponents/Students/TaxonomyDetails')),
  },
  {
    path: coursesCreateCourse,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/Create')),
  },
  {
    path: coursesEditAddFiles,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/AddFiles')),
  },
  {
    path: coursesCreateAddFiles,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/AddFiles')),
  },
  {
    path: tutorsAdd,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/Add')),
  },
  {
    path: coursesEdit,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/Create')),
  },
  {
    path: coursesFindCourses,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/FindCourses')),
  },
  {
    path: coursesCreateMMC,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/CreateMMC')),
  },
  {
    path: coursesCreateTopic,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/EditTopic')),
  },
  {
    path: coursesEditTopic,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/EditTopic')),
  },
  {
    path: coursesEditEditTopic,
    component: asyncComponent(() => import('containers/MenuComponents/Courses/EditTopic')),
  },
  {
    path: detailCourse,
    component: asyncComponent(() => import('containers/MenuComponents/DetailCourse')),
  },
  {
    path: tutorsFindCourses,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/FindCourses')),
  },
  {
    path: tutorsFindTutor,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/FindTutors')),
  },
  {
    path: tutorFiles,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/Files')),
  },
  {
    path: tutorsEditTutorCourses,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/FindCoursesEdit')),
  },
  {
    path: tutorsEditTutor,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/Add')),
  },
  {
    path: tutorsDelete,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/Delete')),
  },
  {
    path: tutorsDeleteConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/Tutors/DeleteConfirm')),
  },
  {
    path: chooseCommunication,
    component: asyncComponent(() => import('containers/MenuComponents/Communication/ChooseCommunication')),
  },
  {
    path: handleCommunication,
    component: asyncComponent(() => import('containers/MenuComponents/Communication/HandleCommunication')),
  },
  {
    path: sendNotifications,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/SendNotifications')),
  },
  {
    path: selectNotificationsTarget,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/SelectNotificationTarget')),
  },
  {
    path: eventNotifications,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/EventNotifications')),
  },
  {
    path: automaticReminders,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/AutomaticReminders')),
  },
  {
    path: addAutomaticReminders,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/AddAutomaticReminders')),
  },
  {
    path: editAutomaticReminders,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/AddAutomaticReminders')),
  },
  {
    path: notificationReport,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/SelectReportTarget')),
  },
  {
    path: notificationReportList,
    component: asyncComponent(() => import('containers/MenuComponents/Notifications/Report')),
  },
  {
    path: users,
    component: asyncComponent(() => import('containers/Users')),
  },
  {
    path: certification,
    component: asyncComponent(() => import('containers/MenuComponents/Certifications')),
  },
  {
    path: courseCreatorsFindGroups,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/FindGroups')),
  },
  {
    path: createCourseCreators,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/AddOrEdit')),
  },
  {
    path: editCourseCreators,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/EditSearch')),
  },
  {
    path: editCourseCreatorById,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/AddOrEdit')),
  },
  {
    path: deleteCourseCreatorById,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/Delete')),
  },
  {
    path: deleteCourseCreatorConfirm,
    component: asyncComponent(() => import('containers/MenuComponents/CourseCreator/DeleteConfirm')),
  },
  {
    path: reportsCreate,
    component: asyncComponent(() => import('containers/MenuComponents/Reports/CreateReport')),
  },
  {
    path: reportsCreateForm,
    component: asyncComponent(() => import('containers/MenuComponents/Reports/ReportsCreateForm')),
  },
  {
    path: questionsAanswers,
    component: asyncComponent(() => import('containers/MenuComponents/QuestionsAndAnswers/qaView')),
  },
  {
    path: questionsAanswersEdit,
    component: asyncComponent(() => import('containers/MenuComponents/QuestionsAndAnswers')),
  },
  {
    path: techSupport,
    component: asyncComponent(() => import('containers/MenuComponents/Support')),
  },
];

const propTypes = {
  url: PropType.string,
  style: PropType.shape({}),
  role: PropType.string,
  className: PropType.string,
};

const defaultProps = {
  url: '',
  style: {},
  role: '',
  className: '',
};

const AppRouter = ({ style, role, className }) => {
  const roles = role || [];
  const accessRoutesByRole = roles
    .reduce((acc, item) => [...acc, ...Object.values(_.get(ROLES_TO_ROUTES, item, {}))], []);
  const accessRoutes = routes.reduce((acc, { path, ...item }) => {
    const isHaveAccess = accessRoutesByRole.some(route => route === path);
    if (isHaveAccess) {
      return [
        ...acc,
        {
          ...item,
          path,
        },
      ];
    }

    return acc;
  }, []);

  return (
    <div style={style} className={className}>
      {accessRoutes.map(({ path, ...otherProps }, index) => (
        <Route
          exact
          key={index}
          path={path}
          {...otherProps}
        />
      ))}
    </div>
  );
};

AppRouter.propTypes = propTypes;
AppRouter.defaultProps = defaultProps;

export default AppRouter;
