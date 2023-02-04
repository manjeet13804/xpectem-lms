// @flow

const FOOTER_DICTIONARY = {
  titles: {
    moreCourse: 'more from join my course',
    support: 'support',
    contact: 'contact join my course',
  },
  links: {
    courseProspectus: 'Course prospectus Courses for businesses About',
    joinMyCourse: 'Join My Course',
    faq: 'FAQ',
    support: 'Technical support',
    contactTutor: 'Contact your tutor',
  },
  copyright: 'Powered By MakeMyCourse',
};


const HEADER_DICTIONARY = {
  links: {
    dashboard: 'Dashboard',
    coursePropspectus: 'Course prospectus',
    myCourses: 'My courses',
    organisations: 'Organisations',
    administrators: 'Administrators',
    students: 'Student(s)',
    communication: 'Communication',
    support: 'Technical support',
    certificates: 'Certificates',
    profile: 'Profile',
  },
};

const COURSE_HEADER_DICTIONARY = {
  courseNavTitle: 'Certified financial controller & accountant',
  courseSimpleNavTitle: 'Swedish Lapland',
  links: {
    courseContent: 'Course content',
    studyPlan: 'Studyplan',
    communication: 'Communication',
    information: 'Information',
    certification: 'Certification',
    questionsAndAnswers: 'Questions and answers',
  },
};

const HOME_DICTIONARY = {
  coursePropspectus: 'Course prospectus',
  recentPublished: 'Most recent published',
};

const DASHBOARD_DICTIONARY = {
  latestPublishedCourses: 'Latest published courses',
  topCourses: 'Top 5 Courses 30 days',
  newCourseAdministrators: 'New course administrators',
  topCourseDesigners: 'Top 5 course designers',
};

const STUDENTS_DICTIONARY = {
  courseAccsessDescending: 'Course accsess descending',
  resultAscending: 'Study results ascending',
  resultDescending: 'Study results descending',
  alphabet: 'Alphabetical order A-Z',
};

const COMMUNICATION_DICTIONARY = {
  message: 'Message',
  new: 'New',
  reply: 'Reply',
  heading: 'Heading',
  attachFiles: 'Attach files',
  openAll: 'OPEN ALL',
  closeAll: 'CLOSE ALL',
  searchPlaceholder: 'Search',
  communicationGroupText: 'Here is where you pose questions and communicate with your tutor.\n'
    + '          If you are having technical problems, please contact our support.\n'
    + '          We will reply to your questions as soon as possible;\n'
    + '          depending on the nature of your questions the reply may not arrive\n'
    + '          by return but within a couple of weekdays.',
  questionMessage: 'New question or message to your tutor',
  closedDialog: 'Closed',
  deleteMessage: 'Delete message',
  maxFileSizeText: 'Max file size:',
  maxFileSize: '5MB.',
  allowFormatText: 'Allowed file types:',
  allowFormat: 'jpg, jpeg, gif, png, rtf, txt, doc, docx, xls, xlsx, pages, numbers, ppt, pptx, key, pdf.',
};

const TERM_SHARED = {
  email: 'E-mail',
  emailRestore: 'Please enter the email address registered on your account',
  tel: 'Tel',
  login: 'Sign in',
  signin: 'Sign in',
  logout: 'Sign out',
  abort: 'Abort',
  readMore: 'Read more',
  readMoreAboutCoure: 'Read more about the course',
  sort: 'Sort',
  show: 'Show',
  username: 'Username',
  password: 'Password',
  firstName: 'First Name',
  lastName: 'Last Name',
  emailAddress: 'E-mail address',
  name: 'Name',
  telephone: 'Telephone',
  group: 'Group',
  optional: 'Optional',
  add: 'Add',
  version: 'Version',
  published: 'Published',
  unpublished: 'Unpublished',
  active: 'Active',
  total: 'Total',
  new: 'New',
  communication: 'communication',
  students: 'student(s)',
  courseAdmin: 'course Admin',
  addOrganizations: 'Add organizations',
  addAdministrators: 'Add administrators',
  addOrganisation: 'Add organisations',
  addAdministrator: 'Add administrator',
  addStudent: 'Add student',
  courses: 'Courses',
  addGroup: 'Add group',
  markAll: 'Mark all',
  allOrganisations: 'All organisations',
  showOrganisations: 'Show organisations',
  hideOrganisations: 'Hide organisations',
  daysLeft: 'Days left',
  leftToStudy: 'Progress',
  toStudy: 'To study',
  result: 'Result',
  ok: 'Ok',
  renameGroup: 'Rename group',
  rename: 'Rename',
  organisation: 'Organisation',
  postalCode: 'Postal code',
  postalAddress: 'Postal address',
  streetAddress: 'Street address',
  upload: 'Upload',
  toTheCourse: 'To the course',
  viewAsList: 'View as list',
  viewAsGrid: 'View as grid',
  yes: 'Yes',
  no: 'No',
  save: 'SAVE',
  menu: 'Menu',
  searchKnowledgeDatabase: 'Search the knowledge database',
  frequentlyAskedQuestions: 'Frequently asked questions',
  abortButton: 'CANCEL',
  sendButton: 'SEND',
};

const NEW_COURSE_DICTIONARY = {
  newCourse: 'New course',
  createNewCourse: 'Open the MakeMyCourse tool to create a new course',
};

const ALT_IMG = {
  logo: 'Signature Join My Course',
};

const TITLE_IMG = {
  goHome: 'back home page',
};

const AUTH_DICTIONARY = {
  starsOfPassword: '********',
  forgottenPassword: 'I have forgotten my password',
  registerAccount: 'Register account',
  rememberMe: 'Remember me',
  repeatPassword: 'Repeat your password',
  acceptedTerms: 'I have read and accepted the terms and conditions',
  termsAndConditions: 'Terms and conditions - Join My Course',
  messageSendToEmail: 'Password reset email sent!',
  placeholderUsername: 'Use your e-mail address',
  placeholderFirstName: 'Type your first name',
  placeholderLastName: 'Type your last name',
  placeholderPassword: 'Minimum 8 characters',
  placeholderRepeatPassword: 'Type exactly the content of the field above',
  placeholderUsernameForRestore: 'Use your e-mail address',
  restoreButton: 'Restore',
  sendButton: 'SEND',
  backToLogin: 'Back to login',
};


const ERRORS = {
  field_shold_filled: 'This field should be filled',
  required: 'Required',
  minCharacters: (count: number): string => `Minimum ${count} characters`,
  maxCharacters: (count: number): string => `Maximum ${count} characters`,
  invalidEmail: 'Invalid email',
  passwordsDoNotMatch: 'Passwords do not match',
  telephone: 'Invalid phone number',
  nameAndMailMatch: 'The user with this email has a different name',
  invalidEmailOrPassword: 'User doesn\'t exist or password is invalid',
  pageNotFound: 'Page Not Found',
};


const FORMS = {
  placeholderFirstName: 'Typing first name',
  placeholderLastName: 'Typing last name',
  placeholderEmail: 'Typing e-mail address',
  placeholderTelephone: 'Add telephone number',
  placeholderGroup: 'Select group',
  addedAdmin: 'Add administrator',
  selectAdminRole: 'Select admin role',
  importStudentList: 'Import student list',
  placeholderSearch: 'Typing name or email to search',
  placeholderAddOrganisation: 'Typing organization name',
  placeholderAddGroup: 'Enter group name',
  placeholderRenameOrganisation: 'Enter new name for group',
  file: 'Select a file',
  fileNoSelected: 'No file selected',
  descriptionUpload: 'Import the file in the format csv, .xls, .xlsx',
};

const ROLES = {
  editor: 'Editor',
  tutor: 'Tutor',
  administrator: 'Administrator',
  superAdministrator: 'Super administrator',
  xpectum: 'Xpectum Admin',
  designer: 'Course Designer',
  student: 'Student',
  none: 'Guest',
};


const SERTIFICATION_EXAM = {
  title: 'Certification exam -',
  subTitle: 'Planned dates for certification exams',
  description: 'To obtain the certification the course you will need to pass an exam taken formally on site in Stockholm.\n'
      + 'The fee for each exam is 1 800 SEK exclusive of VAT (moms).\n'
      + 'Once you have completed all the items and received a course certificate you should book a time for the certification exam here below. '
      + 'You can only book one date at the time. Cancellations must be made no later than 12 hours before the certification. '
      + 'If cancellation is made later, the entire fee will be charged.',
  cancelBtn: 'CANCEL',
  reservePlace: 'Reserve place',
  reserveText: 'Are you sure you want to reserve certification',
  cancelText: 'Are you sure you want to cancel certification',
  cancelErrorText: 'You can no longer cancel this certification. '
    + 'Cancellations must be made no later than 12 hours before the certification. '
    + 'If cancellation is made later, the entire fee will be charged.',
  reserveErrorText: 'Cancel your reservation first!',
  logsTitle: 'Certification exam attempts log',
  totalLogs: 'Total nr of tries: ',
};

const STUDYPLAN = {
  title: 'You have access to your course for a period of 365 days',
  startDate: 'Start date',
  finalDate: 'Final date',
  welcomeLetter: 'Welcome letter',
  numberDaysLeft: 'Number of days left',
  accordingDaysLeft: 'Days left according to studyplan',
  needMoreTime: 'Do you need more time? Contact your tutor/course administrator.',
  studyplanToolTitle: 'The studyplan tool',
  studyplanReadYourCourse: 'Read this before you start your course!',
  studyplanToolDescription: '10-week full-time studies, calculated on a 40-hour work week. Select pace of study or enter final date.',
  studyplanToolInfo: 'The way you study and to what extent is an individual choice and dependant on your ambition and previous knowledge. '
    + 'If you unable to study on a full time basis you should bear in mind that it is better to study continuously than sporadically with too much at a time. '
    + 'To keep up with the study pace it is essential that you set up your own studyplan. One tip is to mark every study session in your calendar.',
  hoursPerWeek: 'Hours of study per week',
  leftToStudy: 'Left to study',
  selectFinalDate: 'CHANGE FINAL DATE',
  selectPaceStudy: 'CHANGE PACE OF STUDIES',
  FinalDateAccordingSyllabus: 'Final date according to your syllabus',
  studyPlan: 'Study plan',
};

const COURSE_INFORMATION = {
  description: 'Course description',
  contentList: 'Course contents',
  length: 'Study scope',
  examination: 'Assignments',
  certifiedInfo: 'Certification',
  isCertified: 'The course is a certified',
};

const EDIT_PROFILE = {
  name: 'Name',
  nameInfo: 'Contact Technical support to change name.',
  emails: 'E-mail address *',
  addEmail: '+ Add and e-mail address (max two).',
  phone: 'Telephone – Optional',
  addPhone: '+ Add and telephone (max two).',
  address: 'Street address *',
  postCode: 'ZIP Code *',
  city: 'City *',
  identifierId: 'Identifier ID - Optional',
  identifierIdInfo: 'For example: Personal Identity number, Social Security Number, Employer Identification Number.',
  languageText: 'Language',
  notifications: 'Notifications',
  notificationsInfo: 'Check if and how you want to recive a summary for your notications once a day.',
  email: 'Email',
  sms: 'SMS',
  closeYourAccount: 'Do you want to close your account?',
  closeAccountInfo: 'Your account will be completely deleted a month from now if you don’t activate/login to your account within that time.\nClick the ”close account” button to continue.',
  closeAccount: 'Close account',
  exportMyData: 'Export my data',
  exportText: 'Export',
  password: 'Password',
  passwordInfo: 'Click ”Reset password” to recieve a new password to your registered mail.',
  resetPassword: 'Reset password',
  subtitle: 'Edit profile/account info',
  title: 'Profile',
  fileRequirements: 'Max number of files: 1\n'
    + 'Max file size: 1 MB\n'
    + 'Format: jpg, jpeg or png',
  inputFileText: 'Drag a file here',
  or: 'or',
  selectFile: 'Select file',
  cropText: 'Crop',
  uploadText: 'Upload',
  somethingWrong: 'Something went wrong, please try again.',
  typeError: 'It\'s not image',
  sizeError: 'File size must not exceed 1 MB',
  resetPasswordText: 'A new password has been sent yo your registrered e-mailadress!',
  exportMyDocumentText: 'Here is a pdf file with your data:',
  closeAccountInfoText: 'Do want to close your account? Click the ”close account” button below.',
  closeAccountWarning: 'Your account will be completely deleted a month from now if you don’t activate/login to your account within that time.',
  accountHasBeenClosed: 'Your account has been closed!',
  uploadSuccessStatus: 'Upload is success!',
  uploadLoadingStatus: 'Loading ...',
};

const SUPPORT = {
  faq: 'General and technical questions',
  contactUs: 'Contact us',
};

const CONTACT_US = {
  title: 'Technical support / Contact us',
  description: 'Here is where you contact our technical support for help or error messages. If your question is related to the course content, contact your tutor.',
  topicTip: 'The query is related to – Choose course if the problem occurs when you are studying your course material.',
  message: 'Message',
  messagePlaceholder: 'Please describe as detailed as possible what happened and when the error occurred. If you have questions regarding your course material, contact your tutor.',
  attach: 'Attach files',
  send: 'SEND',
};

const MINI_FOOTER_DICTIONARY = {
  address: 'Kurortsvägen 20, 837 51 ÅRE, Sweden',
};

const CERTIFICATES_DICTIONARY = {
  title: 'Certificates',
  description: 'Click on the link/attachment to open the certificate in a new printable window.\n'
      + 'You can log in at any time to print the certificate.',
  certificate: 'Certificates',
};

const ASSIGNMENT_DICTIONARY = {
  title: 'Assignments',
  helpText: 'Select an assignment below for more information about the nature of the task and what is required to pass.',
  descriptionForAuto: (maxTries: number): string => 'There is no limit to how many times you can do an assignment.'
        + ' If you are approved, you cannot redo the assignment.'
        + ' If one fails, one can make changes and submit the assignment again.'
        + ` Note, however, that you have a maximum of ${maxTries} attempts per day on each task (between 00:00 and 23:59).`,
  descriptionForManual: 'The assignment can be found in the welcome letter in your study package.'
      + ' The welcome letter with the assignment is also available as a downloadable PDF under the heading "Welcome letter".'
      + ' When you are done you submit it to a tutor who will correct it.'
      + ' Click on "Submit the task" to go to "Communcation". There you attach the file with the assignment and send it to at tutor.',
  success: 'Congratulations! Your assignment passed.',
  failed: 'Failed. Review the assignment and submit a new solution.',
  approvedAt: (approvedAt: string): string => `Submitted and passed ${approvedAt}`,
  failedAt: (approvedAt: string): string => `Submitted and failed ${approvedAt}`,
  attemptsLimitReached: (
    dayOfTheWeek: string,
    date: string,
    maxTries: number,
  ): string => `You have made ${maxTries} failed attempts in one day.`
      + 'You cannot make any changes or submit the assignment.'
      + `Tomorrow ${dayOfTheWeek} (${date}) from 00:00 you have ${maxTries} new attempts.`,
  todayTries: (
    todayTries: number,
    maxTries: number,
  ): string => `Tries today: ${todayTries}/${maxTries}`,
  totalTries: (totalTries: number): string => `Total number of tries: ${totalTries}`,
  showResults: 'See your answers',
  start: 'Start the assignment',
  submit: 'Submit the assignment',
  goToCommunication: 'Go to communication',
  complete: 'Complete assignment',
};

const EXAM_DICTIOANARY = {
  title: (name: string): string => `Exam - ${name}`,
  descriptionFirst: 'You are allowed 1 hour 30 minutes to complete the exam from the moment you click forward to the first task. In case the exam is aborted you can continue where you left off by restarting the exam. The clock will continue ticking.',
  descriptionSecond: (maxTries: number): string => `An exam can be activated up to a maximum of ${maxTries} times. If you have passed you are not allowed to retake an exam. Should you fail you have another last attempts to pass.`,
  descriptionThird: 'NB! The exam is activated when you click ‘Start the exam’.',
  start: 'Start the exam',
  atempts: (todayTries, maxTries) => (maxTries ? `Atempt ${todayTries}/${maxTries}` : `Atempt ${todayTries}`),
  maxScore: score => `Max score ${score}`,
  passReq: 'A pass requires a score of',
  passMax: 'A pass with distinction requires a score of',
  passedTitle: (scores, maxScores) => `Congratulations! You have passed with scoring ${scores} out of ${maxScores}.`,
  failedTitle: 'Failed. Start the exam again when you feel ready for a new attempt.',
  scoresLimit: maxTries => `You have have made ${maxTries} failed attempts and cannot do the exam any more times. Contact your tutor if you have any questions about this.`,
  scoreWord: 'Your score',
  goodPass: points => `To pass with distinction ${points}`,
  minPass: points => `To pass ${points}`,
  maxScoreWord: 'Max score',
};

const NOTIFICATIONS_DICTIOANARY = {
  title: 'Notifications',
  removeNotification: 'Remove notification',
  emptyTitle: 'No notifications',
  emptyDescription: 'There are currently no unread notifications.',
};

const REGISTRATION_LINK_DICTIOANARY = {
  selectLanguageTitle: 'Language:',
  header: 'Register for courses',
  firstDescription: 'Here you register yourself to the courses. Fill in all required information and click "Register".',
  secondDescription: 'You will then recive emails with information and login credentiels.',
  userInformation: 'User information',
  courses: 'Course(s)',
  mandatoryInputs: 'Fields with * are mandatory.',
  firstName: 'First name',
  firstNamePlaceholder: 'First name',
  lastName: 'Last name',
  lastNamePlaceholder: 'Last name',
  email: 'E-mail address',
  emailPlaceholder: 'E-mail address',
  emailValidError: 'email validation error',
  telephone: 'Telephone',
  telephonePlaceholder: 'Telephone',
  registerButton: 'REGISTER',
  notifyHeader: 'Notifications',
  notifyDescription: 'Check if and how you want to receive a summary for your notifications once a day.',
  notifyEmail: 'E-mail',
  notifySms: 'SMS',
  addNewEmail: 'Add and e-mail address (max two)',
  addNewTelephone: 'Add telephone (max two)',
  registerSuccessful: 'User registered successfully!',
};

export {
  FOOTER_DICTIONARY,
  HEADER_DICTIONARY,
  COURSE_HEADER_DICTIONARY,
  HOME_DICTIONARY,
  NEW_COURSE_DICTIONARY,
  DASHBOARD_DICTIONARY,
  STUDENTS_DICTIONARY,
  TERM_SHARED,
  ALT_IMG,
  TITLE_IMG,
  AUTH_DICTIONARY,
  ERRORS,
  ROLES,
  FORMS,
  SERTIFICATION_EXAM,
  STUDYPLAN,
  COURSE_INFORMATION,
  EDIT_PROFILE,
  SUPPORT,
  CONTACT_US,
  MINI_FOOTER_DICTIONARY,
  CERTIFICATES_DICTIONARY,
  COMMUNICATION_DICTIONARY,
  ASSIGNMENT_DICTIONARY,
  NOTIFICATIONS_DICTIOANARY,
  EXAM_DICTIOANARY,
  REGISTRATION_LINK_DICTIOANARY,
};
