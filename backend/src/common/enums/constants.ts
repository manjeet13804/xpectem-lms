export const CONSTANTS = {
  EXAM_MAX_POINTS: 1000,
  ASSIGNMENT_MAX_POINTS: 1000,
}

export const REPORT_TYPE = {
  total_report: '2',
  course_report: '3'
}

export enum PERMISSION_STATUS {
  'No access' = 1,
  'Access' = 2,
  'Access & Edit' = 3,
}

export const LANGUAGE_IDS = {
  'eng': 1,
  'swe': 2,
  'nor': 3
}

export const ROLES_WEIGHT = {
  xpectum: 6,
  course_creator: 5,
  super_admin: 4,
  admin: 3,
  tutor: 2,
  editor: 1,
  user: 0,
};

export const CERTIFICATION_EXAM_RESULT_MESSAGES_EN = {
  passed: (
    courseName,
    date,
    results
  ) => `Congratulations! You have passed the certification exam for ${courseName}, ${date}. Your results is ${results}.`,
  failed: (
    courseName,
    date,
    results
  ) => `Unfortunately you did not pass the certification exam for ${courseName}, ${date}.
  Your results is ${results}.
  Book a new date if you want to make another try. Contact a tutor if you have any questions.`
}

export const MULTI_LANGUAGE_CERTIFICATION_EXAM_RESULT_MESSAGES = {
  EN_PASSED: (
    {
      courseName,
      date,
      results,
    },
  ) => (
    {
      "blocks":[{
        "key":"3b4uv",
        "text":CERTIFICATION_EXAM_RESULT_MESSAGES_EN.passed(courseName, date, results),
        "type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}
      }],"entityMap":{}}),
  EN_FAILED: (
    {
      courseName,
      date,
      results,
    },
  ) => (
    {"blocks":[{
        "key":"3b4uv",
        "text":CERTIFICATION_EXAM_RESULT_MESSAGES_EN.failed(courseName, date, results),
        "type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}})
}

export const PERMISSION_LEVELS = {
  lms: 'lms',
  organisation: 'organisation',
  group: 'group'
};

export const DEFAULT_STRATEGY = {
  jwt:'jwt',
};
