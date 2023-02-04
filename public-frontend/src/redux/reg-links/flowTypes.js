// @flow
import {
  POST_REGISTRATION_STUDENT,
  GET_REGISTRATION_DATA,
  GET_LMS_GROUP_LOGO,
  CHANGE_STUDENT_NAME,
  CHANGE_CONTACT_DATA,
  CHANGE_NOTIFY_DATA,
  CHANGE_TAXONOMY_DATA,
  CLEAN_UP_STUDENT_DATA,
} from './types';

type PostRegistrationStudentType = {
  type: POST_REGISTRATION_STUDENT,
  payload: {
    data: object,
    uid: string
  }
};

type GetRegistrationStudentDataType = {
  type: GET_REGISTRATION_DATA,
  payload: {
    uid: string
  }
};

type GetLmsGroupLogoType = {
    type: GET_LMS_GROUP_LOGO,
    payload: {
      groupId: number
    }
};

type ChangeStudentNameType = {
    type: CHANGE_STUDENT_NAME,
    payload: {
      key: string,
      value: string
    }
};

type ChangeContactDataType = {
  type: CHANGE_CONTACT_DATA,
  payload: {
    key: string,
    value: string,
    index: number
  }
};

type ChangeNotifyDataType = {
  type: CHANGE_NOTIFY_DATA,
  payload: {
    key: string
  }
};

type ChangeTaxonomyDataType = {
  type: CHANGE_TAXONOMY_DATA,
  payload: {
    key: number,
    value: string
  }
};

type CleanUpStuentsDataType = {
  type: CLEAN_UP_STUDENT_DATA
};

export {
  PostRegistrationStudentType,
  GetRegistrationStudentDataType,
  GetLmsGroupLogoType,
  ChangeStudentNameType,
  ChangeContactDataType,
  ChangeNotifyDataType,
  ChangeTaxonomyDataType,
  CleanUpStuentsDataType,
};
