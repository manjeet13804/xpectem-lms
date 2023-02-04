export const defaultEndpoint = {
  lmsGroups: '/lms-groups',
  lmsGroupsAdministrators: '/lms-groups-administrators',
  profile: '/profile',
  organisations: '/organisations',
  organisationAdministrators: '/organisation-administrators',
  groups: '/groups',
  groupAdministrators: '/group-administrators',
  students: '/students',
  courses: '/courses',
  tutors: '/tutors',
  notifications: '/notifications',
  communication: '/communication',
  courseCreators: '/course-creators',
  reports: '/reports',
};


const START = {
  start: '/start',
};

export const LMS_GROUPS = {
  lmsGroupsAdd: `${defaultEndpoint.lmsGroups}/add`,
  lmsGroupsPermissionsSearch: `${defaultEndpoint.lmsGroups}/permissions`,
  lmsGroupsPermissions: `${defaultEndpoint.lmsGroups}/permissions/table`,
  lmsGroupsEdit: `${defaultEndpoint.lmsGroups}/edit/:groupId`,
  lmsGroupsFind: `${defaultEndpoint.lmsGroups}/edit`,
  lmsGroupsDelete: `${defaultEndpoint.lmsGroups}/delete/:groupId`,
  lmsGroupsDeleteConfirm: `${defaultEndpoint.lmsGroups}/delete/:groupId/confirm`,
};

export const LMS_GROUPS_ADMINISTRATORS = {
  lmsGroupsAdministratorsFindGroups: `${defaultEndpoint.lmsGroupsAdministrators}/add`,
  lmsGroupsAdministratorsEdit: `${defaultEndpoint.lmsGroupsAdministrators}/edit/:administratorId`,
  lmsGroupsAdministratorsFindAdministrators: `${defaultEndpoint.lmsGroupsAdministrators}/edit`,
  lmsGroupsAdministratorsAdd: `${defaultEndpoint.lmsGroupsAdministrators}/add/:groupId`,
  lmsGroupsAdministratorsDelete: `${defaultEndpoint.lmsGroupsAdministrators}/delete/:administratorId`,
  lmsGroupsAdministratorsDeleteConfirm: `${defaultEndpoint.lmsGroupsAdministrators}/delete/:administratorId/confirm`,
};

export const PROFILE = {
  profileEdit: `${defaultEndpoint.profile}/edit`,
  profileDelete: `${defaultEndpoint.profile}/delete`,
  profileDeleteConfirm: `${defaultEndpoint.profile}/delete/confirm`,
};

export const ORGANISATIONS = {
  organisationsAdd: `${defaultEndpoint.organisations}/add/:groupsId`,
  organisationsEdit: `${defaultEndpoint.organisations}/edit/:organisationId`,
  organisationsFindGroups: `${defaultEndpoint.organisations}/add`,
  organisationsFindOrg: `${defaultEndpoint.organisations}/edit`,
  organisationsPermissionsSearch: `${defaultEndpoint.organisations}/permissions`,
  organisationsPermissions: `${defaultEndpoint.organisations}/permissions/table`,
  organisationsDelete: `${defaultEndpoint.organisations}/delete/:organisationsId`,
  organisationsDeleteConfirm: `${defaultEndpoint.organisations}/delete/:organisationsId/confirm`,
};

export const ORGANISATION_ADMINISTRATORS = {
  orgAdminsAdd: `${defaultEndpoint.organisationAdministrators}/add/form`,
  orgAdminsEdit: `${defaultEndpoint.organisationAdministrators}/edit/:administratorId`,
  orgAdminsEditOrg: `${defaultEndpoint.organisationAdministrators}/edit/:administratorId/organisations`,
  orgAdminsFindOrg: `${defaultEndpoint.organisationAdministrators}/add`,
  orgAdminsFindAdmins: `${defaultEndpoint.organisationAdministrators}/edit`,
  orgAdminsDelete: `${defaultEndpoint.organisationAdministrators}/delete/:administratorId`,
  orgAdminsDeleteConfirm: `${defaultEndpoint.organisationAdministrators}/delete/:administratorId/confirm`,
  orgAdminsImport: `${defaultEndpoint.organisationAdministrators}/import/form`,
  orgAdminsImportFind: `${defaultEndpoint.organisationAdministrators}/import`,
  orgAdminsImportStatus: `${defaultEndpoint.organisationAdministrators}/import/:lmsGroupId/status`,
};

export const GROUPS = {
  groupsAdd: `${defaultEndpoint.groups}/add/:organisationId`,
  groupsFindOrganisations: `${defaultEndpoint.groups}/add`,
  groupsFindGroups: `${defaultEndpoint.groups}/edit`,
  groupsPermissions: `${defaultEndpoint.groups}/permissions`,
  groupsPermissionsTable: `${defaultEndpoint.groups}/permissions/table`,
  groupsEdit: `${defaultEndpoint.groups}/edit/:groupsId`,
  groupsDelete: `${defaultEndpoint.groups}/delete/:groupId`,
  groupsDeleteConfirm: `${defaultEndpoint.groups}/delete/:groupId/confirm`,
  groupsImportFindOrganisations: `${defaultEndpoint.groups}/import`,
  groupsImport: `${defaultEndpoint.groups}/import/:organisationId`,
  groupsImportStatus: `${defaultEndpoint.groups}/import/:organisationId/status`,
};

export const GROUPS_ADMINISTRATORS = {
  groupAdminsAdd: `${defaultEndpoint.groupAdministrators}/add/form`,
  groupAdminsFindGroups: `${defaultEndpoint.groupAdministrators}/add`,
  groupAdminsFindAdministrators: `${defaultEndpoint.groupAdministrators}/edit`,
  groupAdminsEdit: `${defaultEndpoint.groupAdministrators}/edit/:administratorId`,
  groupAdminAddGroup: `${defaultEndpoint.groupAdministrators}/edit/:administratorId/group`,
  groupAdminsDelete: `${defaultEndpoint.groupAdministrators}/delete/:administratorId`,
  groupAdminsDeleteConfirm: `${defaultEndpoint.groupAdministrators}/delete/:administratorId/confirm`,
  groupAdminsFindGroupsForImport: `${defaultEndpoint.groupAdministrators}/import`,
  groupAdminsImport: `${defaultEndpoint.groupAdministrators}/import/form`,
  groupAdminsImportStatus: `${defaultEndpoint.groupAdministrators}/import/form/status`,
  groupAdminDeleteShort: `${defaultEndpoint.groupAdministrators}/delete/`,
};

export const LMS_STUDENTS = {
  studentsFindGroups: `${defaultEndpoint.students}/add`,
  studentsAdd: `${defaultEndpoint.students}/add/:lmsGroupId`,
  studentRegistrationLinks: `${defaultEndpoint.students}/registration-links`,
  studentsFindGroupsForImport: `${defaultEndpoint.students}/import`,
  studentsImport: `${defaultEndpoint.students}/import/:groupId`,
  studentsImportStatus: `${defaultEndpoint.students}/import/:groupId/status`,
  studentsFindStudents: `${defaultEndpoint.students}/info`,
  studentsEditStudents: `${defaultEndpoint.students}/info/:studentId`,
  studentsDeleteStudent: `${defaultEndpoint.students}/info/delete/:studentInfo`,
  studentsDeleteConfirmStudent: `${defaultEndpoint.students}/info/delete/:studentInfo/confirm`,
  studentsTaxonomyDetails: `${defaultEndpoint.students}/taxonomy`,
};

export const STUDENTS = {
  studentsFindGroups: `${defaultEndpoint.students}/add`,
  studentsAdd: `${defaultEndpoint.students}/add/:lmsGroupId`,
  studentRegistrationLinks: `${defaultEndpoint.students}/registration-links`,
  studentAddRegistrationLinks: `${defaultEndpoint.students}/registration-links/add`,
  studentsFindGroupsForImport: `${defaultEndpoint.students}/import`,
  studentsImport: `${defaultEndpoint.students}/import/:groupId`,
  studentsImportStatus: `${defaultEndpoint.students}/import/:groupId/status`,
  studentsFindStudents: `${defaultEndpoint.students}/info`,
  studentsEditStudents: `${defaultEndpoint.students}/info/:studentId`,
  studentsDeleteStudent: `${defaultEndpoint.students}/info/delete/:studentInfo`,
  studentsDeleteConfirmStudent: `${defaultEndpoint.students}/info/delete/:studentInfo/confirm`,
};

export const COURSES = {
  coursesCreateCourse: `${defaultEndpoint.courses}/create`,
  coursesCreateAddFiles: `${defaultEndpoint.courses}/create/add-files`,
  coursesEditAddFiles: `${defaultEndpoint.courses}/edit/:courseId/add-files`,
  coursesEdit: `${defaultEndpoint.courses}/edit/:courseId`,
  coursesCreateMMC: `${defaultEndpoint.courses}/mmc`,
  coursesFindCourses: `${defaultEndpoint.courses}/edit`,
  coursesCreateTopic: `${defaultEndpoint.courses}/create/topic/:topicId`,
  coursesEditTopic: `${defaultEndpoint.courses}/edit/topic/:topicId`,
  coursesEditEditTopic: `${defaultEndpoint.courses}/edit/:courseId/topic/:topicId`,
};

export const TUTORS = {
  tutorsFindCourses: `${defaultEndpoint.tutors}/find-courses`,
  tutorsFindTutor: `${defaultEndpoint.tutors}/edit`,
  tutorsEditTutor: `${defaultEndpoint.tutors}/edit/:tutorId`,
  tutorsDelete: `${defaultEndpoint.tutors}/delete/:tutorId`,
  tutorsDeleteConfirm: `${defaultEndpoint.tutors}/delete/:tutorId/confirm`,
  tutorsEditTutorCourses: `${defaultEndpoint.tutors}/edit/:tutorId/find-courses`,
  tutorsAdd: `${defaultEndpoint.tutors}/add`,
  tutorFiles: `${defaultEndpoint.tutors}/files`,
};

export const NOTIFICATIONS = {
  sendNotifications: `${defaultEndpoint.notifications}/create`,
  selectNotificationsTarget: `${defaultEndpoint.notifications}/select`,
  automaticReminders: `${defaultEndpoint.notifications}/create-reminders`,
  addAutomaticReminders: `${defaultEndpoint.notifications}/create-reminders/add`,
  editAutomaticReminders: `${defaultEndpoint.notifications}/create-reminders/edit/:id`,
  eventNotifications: `${defaultEndpoint.notifications}/create-event`,
  notificationReport: `${defaultEndpoint.notifications}/report`,
  notificationReportList: `${defaultEndpoint.notifications}/report/list`,
};

export const COMMUNICATION = {
  chooseCommunication: `${defaultEndpoint.communication}`,
  handleCommunication: `${defaultEndpoint.communication}/handle/:dialogId`,
};


export const DETAIL_COURSE = {
  detailCourse: '/detail-course/:studentId',
};

export const USERS = {
  users: '/users',
};

export const COURSE_CREATORS = {
  courseCreatorsFindGroups: `${defaultEndpoint.courseCreators}/add`,
  createCourseCreators: `${defaultEndpoint.courseCreators}/create`,
  editCourseCreators: `${defaultEndpoint.courseCreators}/edit`,
  editCourseCreatorById: `${defaultEndpoint.courseCreators}/edit/:creatorId`,
  deleteCourseCreatorById: `${defaultEndpoint.courseCreators}/delete/:creatorId`,
  deleteCourseCreator: `${defaultEndpoint.courseCreators}/delete`,
  deleteCourseCreatorConfirm: `${defaultEndpoint.courseCreators}/delete/:creatorId/confirm`,
};
export const REPORTS = {
  reportsCreate: `${defaultEndpoint.reports}/create`,
  reportsCreateForm: `${defaultEndpoint.reports}/create/form`,
};

export const MAIN_ROUTE = {
  home: '/',
  signin: '/signin',
  signup: '/signup',
  forgotpassword: '/forgotpassword',
  resetpassword: '/resetpassword',
  notFound: '/404',
  serverError: '/500',
  certification: '/certification',
  techSupport: '/technical-support',
  questionsAanswers: '/questions-answers',
  questionsAanswersEdit: '/questions-answers/edit',
  ...START,
  ...PROFILE,
  ...LMS_GROUPS,
  ...LMS_GROUPS_ADMINISTRATORS,
  ...ORGANISATIONS,
  ...ORGANISATION_ADMINISTRATORS,
  ...GROUPS,
  ...GROUPS_ADMINISTRATORS,
  ...STUDENTS,
  ...LMS_STUDENTS,
  ...COURSES,
  ...TUTORS,
  ...NOTIFICATIONS,
  ...COMMUNICATION,
  ...DETAIL_COURSE,
  ...USERS,
  ...COURSE_CREATORS,
  ...REPORTS,
};

export const HELPER_ROUTE = {
  edit: '/edit',
  article: '/blog/article',
  optionsCreate: '/options/create',
};
