const CONTACTS = {
  email: 'info@joinmycourse.com',
  tel: '+46 647 501 11',
};

const TWENTY_HOURS = 43200000; // 12*60*60*1000
const ONE_MB = 1048576;

const DATE_FORMATS = {
  dayMonth: 'DD MMMM',
  dayMonthTime: 'DD MMMM [at] h:mm a',
  year: 'YYYY',
  dayMonthYear: 'D MMMM YYYY',
  courseEnded: 'YYYY-MM-DD',
  passedAssignmentDate: 'YYYY-MM-DD HH:mm:ss',
  simpleDate: 'YYYY/MM/DD',
};

const STUDY_PLAN = {
  labels: [8, 16, 24, 32, 40],
  min: 8,
  max: 40,
  step: 8,
};

const LANGUAGES = [
  {
    id: 1,
    value: 'english',
    label: 'English',
  },
  {
    id: 2,
    value: 'svenska',
    label: 'Svenska',
  },
  {
    id: 3,
    value: 'norsk',
    label: 'Norsk',
  },
];

const IMAGE_TYPES = {
  jpg: 'image/jpeg',
  png: 'image/png',
};

const COMMUNICATION_TYPE = 'image/jpg,image/jpeg,image/gif,image/png,application/rtf,application/x-rtf,text/richtext,text/plain,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-iwork-keynote-sffkey,application/x-iwork-pages-sffpages,application/x-iwork-numbers-sffnumbers,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/pdf,application/vnd.apple.numbers,application/vnd.apple.pages,application/octet-stream';

const MB_SIZE = 1024;

const COMMUNICATION_MAX_SIZE = 5;

const ERRORS = {
  courseNoAccessTime: 'Time is up. You can no longer access the course.',
};

const CERTIFICATES_DICTIONARY = {
  certificateWord: 'Certificate',
  courseAccess: access => `You have access to your course for a period of ${access} days`,
};

const COMMUNICATION_MESSAGE_HASH_PREFIX = '#communication-message-';

export {
  DATE_FORMATS,
  CONTACTS,
  STUDY_PLAN,
  TWENTY_HOURS,
  ONE_MB,
  LANGUAGES,
  IMAGE_TYPES,
  ERRORS,
  CERTIFICATES_DICTIONARY,
  COMMUNICATION_MESSAGE_HASH_PREFIX,
  COMMUNICATION_TYPE,
  MB_SIZE,
  COMMUNICATION_MAX_SIZE,
};
