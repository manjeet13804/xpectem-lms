import { defaultEndpoint } from 'constants/routes';

const base = process.env.REACT_APP_API_BASE_URL;
const api = `${base}/api`;
const URLS = {
  lmsGroupsAdd: `${api}/admin/lms-group`,
  lmsGroupsPermission: `${defaultEndpoint.lmsGroups}/permissions/table`,
  lmsGroupsPermissionSearch: `${defaultEndpoint.lmsGroups}/permissions`,
  lmsGroupsGet: `${api}/admin/lms-group`,
  lmsGroupsPut: `${api}/admin/lms-group`,
  lmsGroupDelete: `${api}/admin/lms-group`,
  lmsGroupAdminsGet: `${api}/admin/lms-group`,
  lmsGroupAdminsGetAdmins: `${api}/admin/admin-lms/search`,
  lmsGroupAdminGetAdminById: `${api}/admin/admin-lms`,
  lmsGroupAdminAdd: `${api}/admin/admin-lms`,
  lmsGroupAdminAddExsisting: `${api}/admin/admin-lms/add-existing-admin`,
  lmsGroupAdminPut: `${api}/admin/admin-lms`,
  lmsGroupAdminDelete: `${api}/admin/admin-lms`,
  organisationsAdd: `${api}/admin/organisation`,
  organisationsGet: `${api}/admin/organisation`,
  organisationsDelete: `${api}/admin/organisation`,
  orgAdmins: `${api}/admin/admin-organisation`,
  orgAdminsSearchAdmin: `${api}/admin/admin-organisation/search`,
  orgAdminsGetAdminById: `${api}/admin/admin-organisation`,
  orgAdminsChangeAdmins: `${api}/admin/admin-organisation`,
  orgAdminsDeleteAdmin: `${api}/admin/admin-organisation`,
  orgAdminsImport: `${api}/admin/admin-organisation/import`,
  orgAdminsGetTemplate: `${api}/admin/admin-organisation/template/download`,
  groupsAddGroup: `${api}/admin/group`,
  groupsFindGroup: `${api}/admin/group`,
  groupsGet: `${api}/admin/group`,
  groupsPut: `${api}/admin/group`,
  groupsDeleteApi: `${api}/admin/group`,
  groupsImportApi: `${api}/admin/group/import`,
  groupsGetTemplate: `${api}/admin/group/template/download`,
  groupAdminsGetTemplate: `${api}/admin/admin-group/template/download`,
  groupAdmins: `${api}/admin/admin-group`,
  groupAdminsSearch: `${api}/admin/admin-group/search`,
  groupsAdminsImport: `${api}/admin/admin-group/import`,
  studentsSearchCourse: `${api}/admin/course`,
  studentsAddStudents: `${api}/admin/students`,
  studentsGetStudents: `${api}/admin/students`,
  studentsGetStudent: `${api}/admin/student`,
  studentsGetTemplate: `${api}/admin/students/template/download`,
  studentsImport: `${api}/admin/students/import`,
  checkFileForImport: `${api}/admin/students/import/check-file`,
  deleteStudentFromCourse: (id, courseId) => `${api}/admin/student/${id}/${courseId}`,
  welcomeLetter: courseId => `${api}/my-course/welcome-letter/${courseId}`,
  welcomeLetterRichText: courseId => `${api}/my-course/welcome-letter-richText/${courseId}`,
  editAutomaticReminders: id => `${defaultEndpoint.notifications}/create-reminders/edit/${id}`,
  studentsEditStudent: `${api}/admin/student`,
  studentsGeneratePassword: `${api}/admin/user/reset-password`,
  studentsNote: `${api}/admin/student`,
  studentCourse: (id, courseId) => `${api}/admin/student/${id}/course/${courseId}`,
  studentsCertification: `${api}/admin-certification/students`,
  studentsEditExams: `${api}/admin-exam/exams`,
  studentsEditExamsStudentLogs: `${api}/admin-exam/exam-logs`,
  studentsEditAssignmentsStudentLogs: `${api}/admin-assignment/assignment-logs`,
  studentsEditDateCourseContent: `${api}/admin/course/time`,
  studentsGetQA: (studentId, courseId) => `${api}/admin-faq/students/${studentId}/courses/${courseId}/questions`,
  getStudentQA: `${api}/faq`,
  getAdminQA: `${api}/admin-faq`,
  getCourseQA: courseId => `${api}/admin-faq/${courseId}`,
  studentsPutQA: questionId => `${api}/admin-faq/questions/${questionId}`,
  studentsDeleteQA: questionId => `${api}/admin-faq/questions/${questionId}`,
  studentsDeleteTopicQA: topicId => `${api}/admin-faq/topics/${topicId}`,
  studentsSearchTopic: title => `${api}/admin-faq/topics/search?title${title}`,
  studentsPostQA: `${api}/admin-faq/questions`,
  studentsPostTopic: `${api}/admin-faq/topics`,
  getAdminCommunication: `${api}/admin-communications`,
  markDialogCompleted: dialogId => `${api}/admin-communications/dialogs/${dialogId}/mark-complete`,
  markMessageAsReaded: messageId => `${api}/admin-communications/messages/${messageId}`,
  studentsGetCommunications: (studentId, courseId) => `${api}/admin-communications/students/${studentId}/courses/${courseId}/dialogs/search`,
  studentsReadMassages: dialogId => `${api}/admin-communications/dialogs/read/${dialogId}`,
  studentsAddCommunication: (studentId, courseId) => `${api}/admin-communications/students/${studentId}/courses/${courseId}/dialogs`,
  studentsAddMessageCommunication: (studentId, courseId, dialogId) => `${api}/admin-communications/students/${studentId}/courses/${courseId}/dialogs/${dialogId}/messages`,
  studentAbortDialogAdmin: (studentId, courseId, dialogId) => `${api}/admin-communications/students/${studentId}/courses/${courseId}/dialogs/${dialogId}/abort-dialog`,
  studentsEditHeaderDialog: (studentId, courseId, dialogId) => `${api}/admin-communications/students/${studentId}/courses/${courseId}/dialogs/${dialogId}`,
  studentsSearchAdminsCommunication: `${api}/admin-communications/admins/search`,
  studentsReasignAdminCommunication: dialogId => `${api}/admin-communications/students/courses/dialogs/${dialogId}/reassign`,
  coursesHeaders: `${api}/admin/files/topics/search`,
  coursesCertificates: `${api}/admin/course/certificates`,
  coursesTopics: `${api}/admin/course/topics`,
  coursesGroup: `${api}/admin/course-student`,
  coursesPermission: `${api}/admin/course-permission`,
  coursesOrganisationPermission: `${api}/admin/course-organisation-permission`,
  coursesLmsGroupsPermission: `${api}/admin/course-lms-group-permission`,
  downloadReport: `${api}/admin/courses/reports/download`,
  coursesTutors: `${api}/admin-communications/admins/search`,
  searchFilesByHeader: `${api}/admin/files/search`,
  coursesUploadFileToCourse: `${api}/admin/files/upload`,
  coursesGetFilesOfCourse: `${api}/admin/files/search`,
  coursesChangeFileOfCourse: fileId => `${api}/admin/files/upload/${fileId}`,
  createTutor: `${api}/admin/tutors`,
  createCourse: `${api}/admin/course`,
  publishCourse: `${api}/admin/course/status`,
  coursesGetCourses: `${api}/admin/course`,
  coursesGetTopics: `${api}/admin/course/topics/search`,
  coursesGetPostLessons: `${api}/admin/lessons`,
  coursesGetPutLessons: id => `${api}/admin/lessons/${id}`,
  coursesGetPostExams: `${api}/admin/exams`,
  coursesPutExams: id => `${api}/admin/exams/${id}`,
  coursesGetPostAssignments: `${api}/admin/assignments`,
  coursesPutAssignments: id => `${api}/admin/assignments/${id}`,
  coursesGetTopicById: topicId => `${api}/admin/course/topics/${topicId}`,
  coursesChangeLessonsOrder: topicId => `${api}/admin/lessons/orders/${topicId}`,
  coursesChangeExamsOrder: topicId => `${api}/admin/exams/orders/${topicId}`,
  coursesChangeAssignmentsOrder: topicId => `${api}/admin/assignments/orders/${topicId}`,
  coursesGetCourseById: courseId => `${api}/admin/course/${courseId}`,
  coursesUpdateTopicsOfCourse: courseId => `${api}/admin/course/${courseId}/topics`,
  coursesUpdateTutorsOfCourse: courseId => `${api}/admin/course/${courseId}/tutors`,
  coursesUpdateFilesOfCourse: courseId => `${api}/admin/course/${courseId}/files`,
  coursesUpdateCourse: `${api}/admin/course`,
  tutorsGetCourses: `${api}/admin/course`,
  tutorsGetTutor: tutorId => `${api}/admin/tutors/${tutorId}`,
  tutorsGetPostTutor: `${api}/admin/tutors`,
  tutorsEditTutor: tutorId => `${api}/admin/tutors/${tutorId}`,
  tutorsRemoveTutor: tutorId => `${api}/admin/tutors/${tutorId}`,
  coursesUpdateTopicInfo: topicId => `${api}/admin/course/topics/${topicId}`,
  coursesDeleteTopic: topicId => `${api}/admin/course/topics/${topicId}`,
  userUrl: `${api}/user`,
  notificationsGetList: `${api}/admin-notifications/normal`,
  notificationsTriggers: `${api}/admin-notifications/triggers`,
  notificationsSendTo: `${api}/admin-notifications/send-to`,
  sendNotifications: `${api}/admin-notifications/create`,
  automaticReminders: `${api}/admin-notifications/automatic-reminders`,
  deleteAutomaticReminders: id => `${api}/admin-notifications/automatic-reminders/${id}`,
  enableAutomaticReminders: `${api}/admin-notifications/automatic-reminders/enable`,
  automaticReminderById: id => `${api}/admin-notifications/automatic-reminder/${id}`,
  tutorsEditTutorFindCourses: tutorId => `${defaultEndpoint.tutors}/edit/${tutorId}/find-courses`,
  tutorsFindCourses: `${defaultEndpoint.tutors}/find-courses`,
  tutorsEdit: `${defaultEndpoint.tutors}/edit`,
  tutorsAdd: `${defaultEndpoint.tutors}/add`,
  tutorsDelete: `${defaultEndpoint.tutors}/delete`,
  coursesEditTopic: topicId => `${defaultEndpoint.courses}/edit/topic/${topicId}`,
  coursesCreateTopic: topicId => `${defaultEndpoint.courses}/create/topic/${topicId}`,
  coursesEditEditTopic: (courseId, topicId) => `${defaultEndpoint.courses}/edit/${courseId}/topic/${topicId}`,
  coursesEdit: `${defaultEndpoint.courses}/edit`,
  coursesCreateAddFiles: `${defaultEndpoint.courses}/create/add-files`,
  coursesEditAddFiles: courseId => `${defaultEndpoint.courses}/edit/${courseId}/add-files`,
  coursesAddFiles: `${defaultEndpoint.courses}/add-files`,
  coursesCreateCourse: 'create',
  lmsGroupsEditUrl: `${defaultEndpoint.lmsGroups}/edit`,
  lmsGroupsDeleteUrl: `${defaultEndpoint.lmsGroups}/delete`,
  lmsGroupAdminDeleteUrl: `${defaultEndpoint.lmsGroupsAdministrators}/delete`,
  lmsGroupAdminEditUrl: `${defaultEndpoint.lmsGroupsAdministrators}/edit`,
  lmsGroupAdminAddUrl: `${defaultEndpoint.lmsGroupsAdministrators}/add`,
  orgDeleteUrl: `${defaultEndpoint.organisations}/delete`,
  orgEditUrl: `${defaultEndpoint.organisations}/edit`,
  orgAddUrl: `${defaultEndpoint.organisations}/add`,
  orgAdminAdd: `${defaultEndpoint.organisationAdministrators}/add/form`,
  orgAdminSearch: `${defaultEndpoint.organisationAdministrators}/add/search`,
  orgAdminDelete: `${defaultEndpoint.organisationAdministrators}/delete`,
  orgAdminEdit: `${defaultEndpoint.organisationAdministrators}/edit`,
  orgAdminImport: `${defaultEndpoint.organisationAdministrators}/import`,
  orgAdminImportForm: `${defaultEndpoint.organisationAdministrators}/import/form`,
  groupsAdd: `${defaultEndpoint.groups}/add`,
  groupsEdit: `${defaultEndpoint.groups}/edit`,
  groupsDelete: `${defaultEndpoint.groups}/delete`,
  groupsImport: `${defaultEndpoint.groups}/import`,
  groupAdminsAddUrl: `${defaultEndpoint.groupAdministrators}/add/form`,
  groupAdminsEditUrl: `${defaultEndpoint.groupAdministrators}/edit`,
  groupsAdminsDeleteUrl: `${defaultEndpoint.groupAdministrators}/delete`,
  groupsAdminsImportUrl: `${defaultEndpoint.groupAdministrators}/import`,
  groupsAdminsImportFormUrl: `${defaultEndpoint.groupAdministrators}/import/form`,
  studentsAddUrl: `${defaultEndpoint.students}/add`,
  studentsImportUrl: `${defaultEndpoint.students}/import`,
  studentsInfoUrl: `${defaultEndpoint.students}/info`,
  studentsInfoDeleteUrl: `${defaultEndpoint.students}/info/delete`,
  studentsToCourseDetailUrl: '/detail-course',
  communicationHandle: dialogId => `${defaultEndpoint.communication}/handle/${dialogId}`,
  communicationChoose: `${defaultEndpoint.communication}`,
  signin: `${api}/admin/auth/signin`,
  users: '/api/admin/user',
  resetPassword: '/api/reset_password',
  forgotPassword: '/api/forgot-password',
  report: `${defaultEndpoint.reports}/create/form`,
  groupPermissionSearch: `${defaultEndpoint.groups}/permissions`,
  groupPermission: `${defaultEndpoint.groups}/permissions/table`,
  organisationPermissionSearch: `${defaultEndpoint.organisations}/permissions`,
  organisationPermission: `${defaultEndpoint.organisations}/permissions/table`,
  reportStart: `${defaultEndpoint.reports}/create`,
  product: '/api/admin/product',
  productAddOption: id => `/api/admin/product/${id}/option/easy_ship_kit`,
  productGift: '/api/admin/product/gift_card',
  productMediaTransfer: '/api/admin/product/media_transfer',
  productGiftImg: '/api/admin/gift_card_image',
  materials: '/api/admin/frame_material',
  sizes: 'api/admin/frame_size',
  backgrounds: 'api/admin/frame_background',
  colors: 'api/admin/frame_color',
  categoriesArticle: 'api/admin/article_category',
  article: 'api/admin/article',
  fileUpload: 'api/admin/file/upload',
  coupon: 'api/admin/coupon',
  zipCodes: 'api/admin/zip_code',
  createTopic: `${api}/admin/course/topics`,
  adminCertifications: `${api}/admin-certification`,
  reserveCertification: (studentId, courseId, certificationId) => `${api}/admin-certification/students/${studentId}/courses/${courseId}/certificate/${certificationId}/booking`,
  cancelCertification: (studentId, courseId) => `${api}/admin-certification/students/${studentId}/courses/${courseId}/`,
  courseCreator: `${api}/admin/course-creator`,
  tutorsFolders: `${api}/admin/tutor/folders`,
  getFullInfoUser: `${api}/admin/user/information`,
  getCategoriesList: `${api}/admin/course/categories`,
  updateProfile: `${api}/admin/user`,
  taxonomy: `${api}/admin-taxonomies/taxonomies`,
  techSupport: `${api}/contact-us`,
  addExistingStudentsToCourses: `${api}/admin/student/add-existing`,
  certificationExamLog: `${api}/certification-exam-logs`,
  certificationExamLogId: id => `${api}/certification-exam-logs/${id}`,
  registrationLinks: `${api}/registration-links/`,
  registrationLinksId: id => `${api}/registration-links/${id}`,
  deleteMessage: (dialogId, messageId) => `${api}/admin-communications/dialogs/${dialogId}/messages/${messageId}`,
  deleteDialog: dialogId => `${api}/admin-communications/dialogs/${dialogId}`,
  allUsers: `${api}/admin-notifications/users`,
  allNotifications: `${api}/admin-notifications`,
  notifications: `${api}/notification`,
};

export default URLS;
