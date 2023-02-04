// @flow
import {
  PostRegistrationStudentType,
  GetRegistrationStudentDataType,
  GetLmsGroupLogoType,
  ChangeStudentNameType,
  ChangeContactDataType,
  ChangeNotifyDataType,
  ChangeTaxonomyDataType,
  CleanUpStuentsDataType,
} from './flowTypes';
import {
  POST_REGISTRATION_STUDENT,
  GET_REGISTRATION_DATA,
  GET_LMS_GROUP_LOGO,
  CHANGE_STUDENT_NAME,
  CHANGE_CONTACT_DATA,
  CHANGE_NOTIFY_DATA,
  CHANGE_TAXONOMY_DATA,
  CLEAN_UP_STUDENT_DATA,
  ADD_CONTACT_DATA,
  DELETE_CONTACT_DATA,
} from './types';

const postRegistrationStudent = (data: object, uid: string, callBack): PostRegistrationStudentType => ({
  type: POST_REGISTRATION_STUDENT,
  payload: {
    data,
    uid,
    callBack,
  },
});

const getRegistrationData = (uid: string): GetRegistrationStudentDataType => (
  {
    type: GET_REGISTRATION_DATA,
    payload: {
      uid,
    },
  }
);

const getLmsGroupLogo = (groupId: number): GetLmsGroupLogoType => (
  {
    type: GET_LMS_GROUP_LOGO,
    payload: {
      groupId,
    },
  }
);

const changeStudentName = (key: string, value: string): ChangeStudentNameType => (
  {
    type: CHANGE_STUDENT_NAME,
    payload: {
      key,
      value,
    },
  }
);

const changeContactData = (key: string, value: string, index: number): ChangeContactDataType => (
  {
    type: CHANGE_CONTACT_DATA,
    payload: {
      key,
      value,
      index,
    },
  }
);

const addContactData = (key: string): ChangeContactDataType => (
  {
    type: ADD_CONTACT_DATA,
    payload: {
      key,
    },
  }
);

const deleteContactData = (key: string, index: number): ChangeContactDataType => (
  {
    type: DELETE_CONTACT_DATA,
    payload: {
      key,
      index,
    },
  }
);

const changeNotifyData = (key: string): ChangeNotifyDataType => (
  {
    type: CHANGE_NOTIFY_DATA,
    payload: {
      key,
    },
  }
);

const changeTaxonomyData = (key: number, value: string): ChangeTaxonomyDataType => (
  {
    type: CHANGE_TAXONOMY_DATA,
    payload: {
      key,
      value,
    },
  }
);

const cleanUpStuentsData = (): CleanUpStuentsDataType => (
  {
    type: CLEAN_UP_STUDENT_DATA,
  }
);

export {
  postRegistrationStudent,
  getRegistrationData,
  getLmsGroupLogo,
  changeStudentName,
  changeContactData,
  addContactData,
  deleteContactData,
  changeNotifyData,
  changeTaxonomyData,
  cleanUpStuentsData,
};
