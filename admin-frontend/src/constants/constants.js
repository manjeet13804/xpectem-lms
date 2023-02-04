
const CONTACTS = {
  email: 'info@joinmycourse.com',
  tel: '+46 647 501 11',
};

const MINI_FOOTER_DICTIONARY = {
  address: 'Kurortsvägen 20, 837 51 ÅRE, Sweden',
};

const MAIN_CONTAINER_ID = 'main_container_id';

const ADMIN_WELCOME_TEX =  "As an administarator, you can register employees for the course. You can also change personal data and follow up on the employees' learning outcomes."

const HBS_FILE_TYPE = 'hbs';

const COURSE_STATUSES = {
  published: 'published',
  unpublished: 'unpublished',
};

const acceptedFileTypes = [
  'jpg',
  'jpeg',
  'png',
  'rtf',
  'txt',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'pages',
  'numbers',
  'ppt',
  'pptx',
  'key',
  'pdf',
  'csv',
];

const COLORS = {
  white: '#ffffff',
  black: '#000000',
  silver: '#cccccc',
  greyOrg: '#f4f4f4',
  greyBack: '#EEEEEE',
  mercuryBlack: '#6B6B6B',
  green: '#8BC34A',
  greenLight: '#eaffe7',
  greenMercury: '#3F7910',
  gray: '#808080',
  greyOrgBorder: '#d7d7d7',
  greyButton: '#dddddd',
  grayDove: '#666666',
  grayWild: '#f5f5f5',
  grayTitle: '#bfbfbf',
  greyAlto: '#E0E0E0',
  greyMercury: '#F0F0F0',
  blue: '#3493ba',
  grayMineShaft: '#212121',
  greyInput: '#9C9C9C',
  grayAlto: '#d8d8d8',
  greyBGElement: '#FAFAFA',
  grayCod: '#1A1A1A',
  grayBoulder: '#757575',
  grayDusty: '#959595',
  grayMercury: '#e8e8e8',
  greyContrast: '#848484',
  guardsmanRed: '#D40000',
  redFlamingo: '#f44d41',
  redPomegranate: '#F44336',
  grayBorder: '#d9d9d9',
  yellow: '#FFD100',
  blueIcon: '#2AA6C3',
  greyLight: '#dfdfdf',
  greyBtnColor: '#929292',
  greyBtnTitle: '#e5e5e5',
  blueHeader: '#33A0CC',
  blueMercury: '#0566AB',
  darkBlue: '#072253',
  grayDashed: '#979797',
  inputPlaceholder: '#bdbdbd',
  popupBackGround: '#808080',
  seashell: '#F1F1F1',
  colorBackGround: '#efefef',
  silverLighter: '#bfbfbf',
  defaultButtonColor: '#D4D4D4',
  checkRed: '#E0314B',
  checkBlue: '#0090d3',
  checkGreen: '#69d300',
  blueNumber: '#2E90B8'
};

const TABLE_BUTTON_TYPE = {
  noCheck: 1,
  check: 2,
  dobleCheck: 3,
};

const DATE_FORMATS = {
  dayMonth: 'DD MMMM',
  dayMonthTime: 'DD MMMM [at] HH:mm',
  year: 'YYYY',
  dayMonthYear: 'DD-MM-YYYY',
  yearMonthDay: 'YYYY-MM-DD',
  tableYearMonthDay: 'YYYY.MM.DD',
  dayMonthYearTime: 'DD MMMM YYYY [,] HH:mm',
  yearMonthDayHoursMinutesSeconds: 'YYYY-MM-DD HH:mm:ss',
  certificationDate: 'DD MMMM YYYY, HH:mm',
  certificationDateForModal: 'dd MMMM yyyy, HH:mm',
  certificateDateForSave: 'YYYY-MM-DD HH:mm:ss',
  certificationTimeForModal: 'HH.mm',
};

const SCREENS = {
  mini: '480px',
  minMobile: '360px',
  mobile: '768px',
  md: '1024px',
  lg: '1366px',
};

const FONTS = {
  regular: '400',
  fontSize: '12px',
  fontFamily: "'Roboto', sans-serif",
};

const ONE_MB = 1048576;

const BANNER_TITLE = {
  lmsGroupsAdd: 'Add LMS group',
  lmsGroupsEdit: 'Edit LMS group',
  lmsGroupFind: 'Find LMS group',
  changeSave: 'Changes saved',
  lmsGroupsDelete: 'Delete LMS group',
  lmsAdministratorAdd: 'Add LMS group administrator',
  editGroupAdministrator: 'Edit LMS group administrator',
  deleteAdminTitle: 'Delete LMS group administrator',
};

const BUTTON = {
  deleteBtn: 'DELETE',
  addLmsBtn: 'ADD LMS GROUP',
  saveBtn: 'SAVE',
  searchBtn: 'SEARCH',
  cancelBtn: 'CANCEL',
  adminAddBtn: 'ADD LMS ADMINISTRATOR',
};

const TITLE = {
  textFormat: 'Text formatting',
  lang: 'Language',
  dateTitle: 'Access to the LMS (in days) *'
    + ' Set number of days or choose an end date.',
  currentDateTitle: 'Current end date',
  selectFinalDate: 'Select final date',
  createdTitle: ' - Created ',
  belongTitle: ' - Belongs to ',
  languageTitle: 'Language: ',
  categoriesTitle: 'Categories: ',
  createdAtTitle: 'Created: ',
  courseIntroductionTitle: ' Course introduction',
  certificateTitle: 'Certificate',
  courseLengthTitle: ' Course length',
};

const PLACEHOLDER = {
  senerEmailPlaceholder: 'Enter sender email',
  senderNamePlaceholder: 'Enter sender name',
  coursePricePlaceholder: 'Course price',
  confirmDelete: 'Type delete here to confirm',
  firstNameTitle: 'First name',
  lastNameTitle: 'Last name',
  emailTitle: 'E-mail address',
  telephoneTitle: 'Telephone',
  searchLms: 'Search LMS group',
  lmsGroupName: 'LMS group name',
  organisationsName: 'Organisations name',
  groupName: 'Group name',
  lmsGroupDescription: 'LMS group description',
  lmsGroupsDelete: ' Type delete here to confirm',
  datePlaceholder: 'YYYY-MM-DD',
  personNumberTitle: 'yymmdd-nn',
  employeeNumberTitle: 'Employee number',
  courseSearchTitle: 'Search for course in the list',
  personTitle: ' Person number',
  employeeTitle: ' Employee number',
  qaSubject: ' Subject ',
  courseNamePlaceholder: ' Enter course name',
  accessTimePlaceholder: ' Enter access time in days',
  timeToCompletePlaceholder: ' Enter time to complete in days',
  searchCertPlaceholder: 'Search certificate by name',
  searchLessonPlaceholder: 'Find Lesson',
  addNewLessonPlaceholder: 'Add new Lesson',
  searchTutorPlaceholder: 'Enter tutor name',
  searchDocPlaceholder: 'Enter header',
  headerNamePlaceholder: 'Documentations',
  fileNamePlaceholder: 'Enter file name',
  LMSGroupPlaceholder: 'Search lms group',
  searchCoursePlaceholder: 'Enter course name',
  courseTopicPlaceholder: 'Lesson name',
  coursesLessonNamePlaceholder: 'Course link name',
  coursesLessonLinkPlaceholder: 'https://www.xpectum.se/make_my_course/themes/xpectum_course/',
  coursesExamNamePlaceholder: 'Exam name',
  coursesAssignmentNamePlaceholder: 'Assignment name',
  coursesValuePlaceholder: 'Value',
  tutorsSearchCourses: 'Search course',
  placeholderText: 'Placeholder / Text',
  communicationSearchBlock: 'To',
  communicationAddTopic: 'enter a new topic',
  lmsGroupWelcomeMessageForAdmin: 'Welcome text on the start page for administrators',
  lmsGroupWelcomeMessageForStudents: 'Welcome text on the start page for students',
  days: 'Days',
  streetAddressPlaceholder: 'Enter student address',
  enterFolderName: 'Enter folder name',
  enterFirstName: 'Enter first name',
  enterLastName: 'Enter last name',
  enterEmail: 'Enter email',
  enterPhone: 'Enter phone number',
  searchPlaceholder: 'Search',
  searchStudent: 'Search student',
  typeHeader: 'Type notification header',
  selectNotificationType: 'Select notification type',
  selectSendTo: 'Select send to',
  dateTitle: 'Date',
  resultsTitle: 'Results',
  enterNote: 'Enter note',
  selectNotificationTarget: 'Select send to',
};

const LMS_GROUPS = {
  currentEndDate: 'Current end date',
};

const PERMISSIONS_TABLE = {
  tableWorkDescriptionStart: 'Set a whole column or row by checking the checkbox and cycle throgh each settings',
  tableWorkDescriptionEnd: ', at the top or far left. \nSet everything by clicking "Set all".',
};

const ERRORS_DICTIONARY = {
  UNKNOWN_ERROR: 'Unknown error',
};

const IMAGE_TYPES = {
  jpg: 'image/jpeg',
  png: 'image/png',
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
  notificationsInfo: 'Check if and how you want to receive a summary for your notifications once a day.',
  email: 'Email',
  sms: 'SMS',
  closeYourAccount: 'Do you want to close your account?',
  closeAccountInfo: 'Your account will be completely deleted in a month from now if you don’t activate/login to your account within that time.\nClick the ”close account” button to continue.',
  closeAccount: 'Close account',
  exportMyData: 'Export my data',
  exportText: 'Export',
  password: 'Password',
  passwordInfo: 'Click ”Reset password” to receive a new password to your registered mail.',
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
  resetPasswordText: 'A new password has been sent yo your registered e-mail address!',
  exportMyDocumentText: 'Here is a zip-file with your data:',
  closeAccountInfoText: 'Do want to close your account? Click the ”close account” button below.',
  closeAccountWarning: 'Your account will be completely deleted a month from now if you don’t activate/login to your account within that time.',
  accountHasBeenClosed: 'Your account has been closed!',
  uploadSuccessStatus: 'Upload is success!',
  uploadLoadingStatus: 'Loading ...',
  welcomeTitleAttache: 'Is shown on the welcome page for all users in this LMS group',
};

const SIMPLE_DICTIONARY = {
  startDate: 'Start date',
  enterDate: 'Enter the date',
  deleteTitle: (firstName, lastName) => `The Course Creator - ${firstName} ${lastName} is deleted!`,
  enterWord: 'Enter',
  lmsGroupCreated: createdLmsGroup => `The LMS group - ${createdLmsGroup} is added!`,
};

const LANGUAGES = {
  english: 'English',
  sve: 'Svenska',
  norsk: 'Norsk',
};

const EVENT_NOTIFICATION_TYPE = [
  { title: 'New Message in the communication from a tutor', value: 'new_message_tutor' },
  { title: 'Approved on an exam', value: 'approved_exam' },
  { title: 'Approved on an assignment', value: 'approved_assignment' },
  { title: 'Approved on a course', value: 'approved_course' },
  { title: 'When you are assigned to a new course', value: 'assignment_new_course' },
];

const SEND_NOTIFICATION_TYPE = [
  { title: 'System information', value: 'system_information' },
  { title: 'News', value: 'news' },
  { title: 'Information', value: 'information' },
  { title: 'Important information', value: 'important_information' },
  { title: 'Reminder', value: 'reminder' },
];

const EVENT_NOTIFICATION_TARGET = [
  { title: 'Anyone who has not started the course', value: 'dont_start_course' },
  { title: 'Anyone who has started the course and finished some percent of it', value: 'progress_course' },
  { title: 'Anyone who has completed the course', value: 'completed_course' },
];

const NOTIFICATION_TYPES = {
  SystemNotification: 'system_information',
  News: 'news',
  Event: 'event',
  Information: 'information',
  ImportInformation: 'important_information',
  Reminder: 'reminder',
};

const NOTIFICATION_TARGET = [
  { title: 'Students', value: 'students' },
  { title: 'Tutors', value: 'tutors' },
  { title: 'Course creators', value: 'course_creators' },
  { title: 'Administrators', value: 'administrators' },
  { title: 'All users', value: 'all' },
];

const REMINDER_NOTIFICATIONS = [
  { title: 'Send to all', value: 'all' },
  { title: 'Send to anyone who has not started the courses', value: 'not_started' },
  { title: 'Send to anyone who has started the courses', value: 'started' },
  { title: 'Send to everyone who has completed the courses', value: 'completed' },
];

const SEND_NOTIFICATIONS = {
  STUDENTS: 'students',
  TUTORS: 'tutors',
  COURSE_CREATORS: 'course_creators',
  ADMINISTRATORS: 'administrators',
  ALL_USERS: 'all',
};

const ROLES = {
  XPECTUM_ADMIN: 'xpectum',
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  ADMIN_LMS: 'admin_lms',
  ADMIN_ORGANISATION: 'admin_organisation',
  ADMIN_GROUP: 'admin_group',
  COURSE_CREATOR: 'course_creator',
  TUTOR: 'tutor',
  EDITOR: 'editor',
  USER: 'user',
  OUTER_API: 'outer_api',
};

const ROLES_NAME = {
  [ROLES.XPECTUM_ADMIN]: 'Xpectum admin',
  [ROLES.SUPER_ADMIN]: 'Super admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.ADMIN_LMS]: 'Admin lms',
  [ROLES.ADMIN_ORGANISATION]: 'Admin organisation',
  [ROLES.ADMIN_GROUP]: 'Admin group',
  [ROLES.COURSE_CREATOR]: 'Course creator',
  [ROLES.TUTOR]: 'Tutor',
  [ROLES.EDITOR]: 'Editor',
  [ROLES.USER]: 'User',
  [ROLES.OUTER_API]: 'Outer api',
}

const MENU_TO_ROLE = {
  organisations: [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS],
  'organisation-administrators': [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION],
  groups: [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION],
  'group-administrators': [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION],
  students: [
    ROLES.XPECTUM_ADMIN,
    ROLES.ADMIN_LMS,
    ROLES.ADMIN_ORGANISATION,
    ROLES.ADMIN_GROUP,
    ROLES.TUTOR,
  ],
  courses: [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.COURSE_CREATOR],
  tutors: [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.TUTOR, ROLES.ADMIN_ORGANISATION],
  'course-creators': [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS],
  reports: [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION, ROLES.ADMIN_GROUP],
  certification: [ROLES.XPECTUM_ADMIN],
  communication: [
    ROLES.XPECTUM_ADMIN,
  ],
  notifications: [
    ROLES.XPECTUM_ADMIN,
    ROLES.ADMIN_LMS,
    ROLES.ADMIN_ORGANISATION,
    ROLES.ADMIN_GROUP,
    ROLES.TUTOR,
    ROLES.COURSE_CREATOR,
  ],
  'questions-answers': [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION, ROLES.ADMIN_GROUP, ROLES.TUTOR, ROLES.COURSE_CREATOR],
  'questions-answers/edit': [ROLES.XPECTUM_ADMIN],
  'technical-support': [ROLES.XPECTUM_ADMIN, ROLES.ADMIN_LMS, ROLES.ADMIN_ORGANISATION, ROLES.ADMIN_GROUP, ROLES.TUTOR, ROLES.COURSE_CREATOR],
  signin: [
    ROLES.XPECTUM_ADMIN,
    ROLES.ADMIN_LMS,
    ROLES.ADMIN_ORGANISATION,
    ROLES.ADMIN_GROUP,
    ROLES.TUTOR,
    ROLES.COURSE_CREATOR,
  ],
};

const INPUT_MASKS = {
  courseDate: '9999-99-99',
};

const DEFAULT_SYSTEM_REQUIREMENTS = {
  1: '{"blocks":[{"key":"51uph","text":"Computer","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":8,"style":"color-rgb(51,51,51)"},{"offset":0,"length":8,"style":"fontsize-16pt"},{"offset":0,"length":8,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"52kff","text":"PC with Windows or Mac with macOS. Internet access at least 0.5 Mbit/s is recommended. A screen\\nresolution on computer of at least 1024 x 768 pixels is recommended.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":164,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":164,"style":"color-rgb(51,51,51)"},{"offset":0,"length":164,"style":"fontsize-11pt"},{"offset":0,"length":164,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"clvq8","text":"Cell phone and tablet ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":21,"style":"color-rgb(51,51,51)"},{"offset":0,"length":21,"style":"fontsize-16pt"},{"offset":0,"length":21,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":21,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"13v4v","text":"iPad (fourth generation) or later with iOS 6 or higher\\niPhone 6 or later with iOS 6 or higher.\\nAndroid on mobile or tablet with KitKat or later.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":144,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":144,"style":"color-rgb(51,51,51)"},{"offset":0,"length":144,"style":"fontsize-11pt"},{"offset":0,"length":144,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"7h5g1","text":"Supported web browsers: ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":23,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":23,"style":"color-rgb(51,51,51)"},{"offset":0,"length":23,"style":"fontsize-16pt"},{"offset":0,"length":23,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":23,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"e3hn","text":"Google Chrome 25 or higher on Windows, macOS or Android.\\nMozilla Firefox 24 or higher on Windows or macOS.\\nSafari 6 or higher on Windows or macOS and iOS Safari on iPad.\\nMicrosoft Edge 79 (Blink) or higher on Windows 7 and 8.1 or higher, and macOS.\\nMicrosoft Edge 25 (EdgeHTML) or higher on Windows 10.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":56,"style":"bgcolor-rgb(255,255,255)"},{"offset":57,"length":49,"style":"bgcolor-rgb(255,255,255)"},{"offset":107,"length":62,"style":"bgcolor-rgb(255,255,255)"},{"offset":170,"length":132,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":27,"style":"color-rgb(64,120,192)"},{"offset":57,"length":29,"style":"color-rgb(64,120,192)"},{"offset":107,"length":19,"style":"color-rgb(64,120,192)"},{"offset":170,"length":26,"style":"color-rgb(64,120,192)"},{"offset":0,"length":56,"style":"fontsize-11pt"},{"offset":57,"length":49,"style":"fontsize-11pt"},{"offset":107,"length":62,"style":"fontsize-11pt"},{"offset":170,"length":132,"style":"fontsize-11pt"},{"offset":0,"length":56,"style":"fontfamily-.SFNSText"},{"offset":57,"length":49,"style":"fontfamily-.SFNSText"},{"offset":107,"length":62,"style":"fontfamily-.SFNSText"},{"offset":170,"length":132,"style":"fontfamily-.SFNSText"},{"offset":27,"length":29,"style":"color-rgb(51,51,51)"},{"offset":86,"length":20,"style":"color-rgb(51,51,51)"},{"offset":126,"length":43,"style":"color-rgb(51,51,51)"},{"offset":196,"length":106,"style":"color-rgb(51,51,51)"}],"entityRanges":[],"data":{}},{"key":"btjmh","text":"Internet Explorer 11 or higher on Windows Vista, Windows 7, Windows 8.\\nThe course may work on other systems and web browsers but there are no quarantees or warranties given.\\n ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":21,"style":"color-rgb(64,120,192)"},{"offset":0,"length":174,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":70,"style":"fontsize-14"},{"offset":0,"length":70,"style":"fontfamily-Roboto, sans-serif"},{"offset":21,"length":153,"style":"color-rgb(51,51,51)"},{"offset":70,"length":104,"style":"fontsize-11pt"},{"offset":70,"length":104,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
  2: '{"blocks":[{"key":"bvd00","text":"Dator","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":5,"style":"color-rgb(51,51,51)"},{"offset":0,"length":5,"style":"fontsize-16pt"},{"offset":0,"length":5,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"f2p92","text":"PC med Windows eller Mac med macOS. Bredband, minst 0,5 Mbit/s rekommenderas. Rekommenderad\\nskärmupplösning på dator är minst 1024 x 768 bildpunkter.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":153,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":153,"style":"color-rgb(51,51,51)"},{"offset":0,"length":153,"style":"fontsize-11pt"},{"offset":0,"length":153,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"9ect1","text":"Mobiltelefon och läsplatta ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":27,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":27,"style":"color-rgb(51,51,51)"},{"offset":0,"length":27,"style":"fontsize-16pt"},{"offset":0,"length":27,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":27,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8kst5","text":"iPad (fjärde generationen) eller senare med iOS 6 eller högre.\\niPhone 6 eller senare med iOS 6 eller högre.\\nAndroid på mobil eller läsplatta med KitKat eller senare.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":170,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":170,"style":"color-rgb(51,51,51)"},{"offset":0,"length":170,"style":"fontsize-11pt"},{"offset":0,"length":170,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"ba86v","text":"Webläsare som stöds: ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":22,"style":"color-rgb(51,51,51)"},{"offset":0,"length":22,"style":"fontsize-16pt"},{"offset":0,"length":22,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"8925t","text":"Google Chrome 25 eller högre på Windows, macOS och Android.\\nMozilla Firefox 24 eller högre på Windows eller macOS.\\nSafari 6 eller högre på Windows eller macOS samt iOS Safari på iPhone/iPad.\\nMicrosoft Edge 79 (Blink) eller högre på Windows 7 and 8.1 eller högre, samt macOS.\\nMicrosoft Edge 25 (EdgeHTML) eller högre på Windows 10 eller högre.\\nInternet Explorer 11 eller högre på Windows Vista, Windows 7, Windows 8 eller högre.\\n ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":61,"style":"bgcolor-rgb(255,255,255)"},{"offset":62,"length":56,"style":"bgcolor-rgb(255,255,255)"},{"offset":119,"length":236,"style":"bgcolor-rgb(255,255,255)"},{"offset":356,"length":88,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":30,"style":"color-rgb(64,120,192)"},{"offset":62,"length":32,"style":"color-rgb(64,120,192)"},{"offset":119,"length":22,"style":"color-rgb(64,120,192)"},{"offset":198,"length":39,"style":"color-rgb(64,120,192)"},{"offset":356,"length":21,"style":"color-rgb(64,120,192)"},{"offset":0,"length":61,"style":"fontsize-11pt"},{"offset":62,"length":56,"style":"fontsize-11pt"},{"offset":119,"length":236,"style":"fontsize-11pt"},{"offset":356,"length":88,"style":"fontsize-11pt"},{"offset":0,"length":61,"style":"fontfamily-.SFNSText"},{"offset":62,"length":56,"style":"fontfamily-.SFNSText"},{"offset":119,"length":236,"style":"fontfamily-.SFNSText"},{"offset":356,"length":88,"style":"fontfamily-.SFNSText"},{"offset":30,"length":31,"style":"color-rgb(51,51,51)"},{"offset":94,"length":24,"style":"color-rgb(51,51,51)"},{"offset":141,"length":57,"style":"color-rgb(51,51,51)"},{"offset":237,"length":118,"style":"color-rgb(51,51,51)"},{"offset":377,"length":67,"style":"color-rgb(51,51,51)"}],"entityRanges":[],"data":{}},{"key":"3j3qk","text":"Utbildningen fungerar troligtvis på andra system och webbläsare men för detta lämnas inga garantier.\\n ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":105,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":105,"style":"color-rgb(51,51,51)"},{"offset":0,"length":105,"style":"fontsize-11pt"},{"offset":0,"length":105,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
  3: '{"blocks":[{"key":"10cku","text":"Dator","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":5,"style":"color-rgb(51,51,51)"},{"offset":0,"length":5,"style":"fontsize-16pt"},{"offset":0,"length":5,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"2sfgs","text":"PC med Windows eller Mac med macOS. Bredbånd, minst 0,5 Mbit/s anbefales. Den anbefalte\\nskjermoppløsningen på en datamaskin er minst 1024 x 768 piksler.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":154,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":154,"style":"color-rgb(51,51,51)"},{"offset":0,"length":154,"style":"fontsize-11pt"},{"offset":0,"length":154,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"7o9ur","text":"Mobil og nettbrett","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":18,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":18,"style":"color-rgb(51,51,51)"},{"offset":0,"length":18,"style":"fontsize-16pt"},{"offset":0,"length":18,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5c2fu","text":"iPad (fjerde generasjon) eller nyere med iOS 6 eller nyere.\\niPhone 6 eller senere med iOS 6 eller høyere.\\nAndroid på mobil eller lesplatte med KitKat eller senere.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":164,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":164,"style":"color-rgb(51,51,51)"},{"offset":0,"length":164,"style":"fontsize-11pt"},{"offset":0,"length":164,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}},{"key":"c0ugl","text":"Weblesere som støttes: ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":22,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":22,"style":"color-rgb(51,51,51)"},{"offset":0,"length":22,"style":"fontsize-16pt"},{"offset":0,"length":22,"style":"fontfamily-.SFNSDisplay"},{"offset":0,"length":22,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"atjh2","text":"Google Chrome 25 eller høyere på Windows, macOS eller Android.\\nMozilla Firefox 24 eller høyere på Windows eller macOS.\\nSafari 6 eller høyere på Windows eller macOS eller macOS samt iOS Safari på iPad.\\nMicrosoft Edge 79 (Blink) eller høyere på Windows 7 og 8.1 eller høyere, samt macOS.\\nMicrosoft Edge 25 (EdgeHTML) eller høyere på Windows 10 eller høyere.\\nInternet Explorer 11 eller høyere på Windows Vista, Windows 24, Windows 8 eller høyere.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":63,"style":"bgcolor-rgb(255,255,255)"},{"offset":64,"length":56,"style":"bgcolor-rgb(255,255,255)"},{"offset":121,"length":240,"style":"bgcolor-rgb(255,255,255)"},{"offset":362,"length":88,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":30,"style":"color-rgb(64,120,192)"},{"offset":64,"length":32,"style":"color-rgb(64,120,192)"},{"offset":121,"length":22,"style":"color-rgb(64,120,192)"},{"offset":205,"length":26,"style":"color-rgb(64,120,192)"},{"offset":362,"length":21,"style":"color-rgb(64,120,192)"},{"offset":0,"length":63,"style":"fontsize-11pt"},{"offset":64,"length":56,"style":"fontsize-11pt"},{"offset":121,"length":240,"style":"fontsize-11pt"},{"offset":362,"length":88,"style":"fontsize-11pt"},{"offset":0,"length":63,"style":"fontfamily-.SFNSText"},{"offset":64,"length":56,"style":"fontfamily-.SFNSText"},{"offset":121,"length":240,"style":"fontfamily-.SFNSText"},{"offset":362,"length":88,"style":"fontfamily-.SFNSText"},{"offset":30,"length":33,"style":"color-rgb(51,51,51)"},{"offset":96,"length":24,"style":"color-rgb(51,51,51)"},{"offset":143,"length":62,"style":"color-rgb(51,51,51)"},{"offset":231,"length":130,"style":"color-rgb(51,51,51)"},{"offset":383,"length":67,"style":"color-rgb(51,51,51)"}],"entityRanges":[],"data":{}},{"key":"69hum","text":"Systemet fungerer sannsynligvis på andra systemer og weblesere, men det gis ingen garantier for dette.\\n ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":104,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":104,"style":"color-rgb(51,51,51)"},{"offset":0,"length":104,"style":"fontsize-11pt"},{"offset":0,"length":104,"style":"fontfamily-.SFNSText"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
};

const REG_LINKS_TABS = {
  SELECT_GROUPS: 'SELECT_GROUPS',
  SELECT_COURSES: 'SELECT_COURSES',
  CONFIRM_DATA: 'CONFIRM_DATA',
};

const REG_LINK_BASE_URL = 'https://start.joinmycourse.com/registration-links/';

const FAQ_TYPES = {
  ADMIN: 'admin',
  STUDENT: 'student',
  COURSE: 'course',
};

const REPORT_TYPE = {
  default: 1,
  totalReport: 2,
  perCourse: 3,
};

const COMMUNICATION_TYPE = 'image/jpg,image/jpeg,image/gif,image/png,application/rtf,application/x-rtf,text/richtext,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-iwork-keynote-sffkey,application/x-iwork-pages-sffpages,application/x-iwork-numbers-sffnumbers,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/vnd.apple.numbers,application/vnd.apple.pages,application/octet-stream';

const TYPE_PASSED = {
  failed : 'F',
  passed:'P',
  passedDistinction :'PD'
}

const MAX_THREE_DIGIT_NUMBER = 999

const EXAM_FIELDS = {
  maxPoints: 'maxPoints'
}

const studentAssignmentLogStatus = {
  created: 'created',
  started: 'started',
  completed: 'completed',
  passed: 'passed',
  failed: 'failed',
}

export {
  MAIN_CONTAINER_ID,
  ERRORS_DICTIONARY,
  CONTACTS,
  MINI_FOOTER_DICTIONARY,
  COLORS,
  SCREENS,
  FONTS,
  BANNER_TITLE,
  TITLE,
  DATE_FORMATS,
  ONE_MB,
  IMAGE_TYPES,
  EDIT_PROFILE,
  BUTTON,
  PLACEHOLDER,
  acceptedFileTypes,
  LMS_GROUPS,
  HBS_FILE_TYPE,
  COURSE_STATUSES,
  SIMPLE_DICTIONARY,
  LANGUAGES,
  ROLES,
  ROLES_NAME,
  MENU_TO_ROLE,
  INPUT_MASKS,
  DEFAULT_SYSTEM_REQUIREMENTS,
  PERMISSIONS_TABLE,
  TABLE_BUTTON_TYPE,
  REG_LINKS_TABS,
  REG_LINK_BASE_URL,
  FAQ_TYPES,
  REPORT_TYPE,
  COMMUNICATION_TYPE,
  EVENT_NOTIFICATION_TYPE,
  EVENT_NOTIFICATION_TARGET,
  NOTIFICATION_TARGET,
  SEND_NOTIFICATIONS,
  SEND_NOTIFICATION_TYPE,
  REMINDER_NOTIFICATIONS,
  NOTIFICATION_TYPES,
  ADMIN_WELCOME_TEX,
  TYPE_PASSED,
  MAX_THREE_DIGIT_NUMBER,
  EXAM_FIELDS,
  studentAssignmentLogStatus,
};
