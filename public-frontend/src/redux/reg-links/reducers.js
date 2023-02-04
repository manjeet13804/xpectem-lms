// @flow
import {
  StateType,
} from './flowTypes';
import {
  POST_REGISTRATION_STUDENT_START,
  POST_REGISTRATION_STUDENT_SUCCESS,
  POST_REGISTRATION_STUDENT_FAIL,
  GET_REGISTRATION_DATA_SUCCESS,
  GET_LMS_GROUP_LOGO_SUCCESS,
  CHANGE_STUDENT_NAME,
  CHANGE_CONTACT_DATA,
  CHANGE_NOTIFY_DATA,
  CHANGE_TAXONOMY_DATA,
  CLEAN_UP_STUDENT_DATA,
  GET_REGISTRATION_DATA_START,
  GET_REGISTRATION_DATA_FAIL,
  ADD_CONTACT_DATA,
  DELETE_CONTACT_DATA,
} from './types';

const INITIAL_STATE = {
  registrationStudentLoading: false,
  getRegLinkDataLoading: false,
  regData: {},
  logo: null,
  error: null,
  studentData: {
    firstName: null,
    lastName: null,
    emails: [null],
    phones: [null],
    language: 1,
    notifyEmail: true,
    notifySms: false,
    studentTaxonomy: [],
  },
};


export default (state: StateType = INITIAL_STATE, {type, payload}: ActionType): StateType => {
  switch (type) {
    case POST_REGISTRATION_STUDENT_START: {
      return {
        ...state,
        registrationStudentLoading: true,
      };
    }

    case POST_REGISTRATION_STUDENT_SUCCESS: {
      return {
        ...state,
        registrationStudentLoading: false,
      };
    }

    case POST_REGISTRATION_STUDENT_FAIL: {
      return {
        ...state,
        registrationStudentLoading: false,
        error: payload,
      };
    }

    case GET_REGISTRATION_DATA_START: {
      return {
        ...state,
        getRegLinkDataLoading: true,
      };
    }

    case GET_REGISTRATION_DATA_SUCCESS: {
      return {
        ...state,
        regData: payload,
        getRegLinkDataLoading: false,
      };
    }

    case GET_REGISTRATION_DATA_FAIL: {
      return {
        ...state,
        getRegLinkDataLoading: false,
      };
    }

    case GET_LMS_GROUP_LOGO_SUCCESS: {
      return {
        ...state,
        logo: payload,
      };
    }

    case CHANGE_STUDENT_NAME: {
      const { studentData } = state;
      const { key, value } = payload;
      return {
        ...state,
        studentData: {
          ...studentData,
          [key]: value,
        },
      };
    }

    case CHANGE_CONTACT_DATA: {
      const { studentData } = state;
      const { key, value, index } = payload;
      return {
        ...state,
        studentData: {
          ...studentData,
          [key]: studentData.[key].map((item, itemIndex) => {
            if (itemIndex === index) {
              return value;
            }
            return item;
          }),
        },
      };
    }

    case ADD_CONTACT_DATA: {
      const { studentData } = state;
      const { key } = payload;
      return {
        ...state,
        studentData: {
          ...studentData,
          [key]: [...studentData[key], null],
        },
      };
    }

    case DELETE_CONTACT_DATA: {
      const { studentData } = state;
      const { key, index } = payload;
      return {
        ...state,
        studentData: {
          ...studentData,
          [key]: studentData[key].filter((el: string, elIndex: number): Array<string> => elIndex !== index),
        },
      };
    }

    case CHANGE_NOTIFY_DATA: {
      const { studentData } = state;
      const { key } = payload;

      return {
        ...state,
        studentData: {
          ...studentData,
          [key]: !studentData.[key],
        },
      };
    }

    case CHANGE_TAXONOMY_DATA: {
      const { studentData } = state;
      const { key, value } = payload;
      if (studentData.studentTaxonomy
         && studentData.studentTaxonomy.length
          && studentData.studentTaxonomy.find(item => item.taxonomy.id === key)) {
        return {
          ...state,
          studentData: {
            ...studentData,
            studentTaxonomy: studentData.studentTaxonomy.map((item) => {
              if (item.taxonomy.id === key) {
                return {
                  taxonomy: {
                    id: key,
                  },
                  value,
                };
              }
              return item;
            }),
          },
        };
      }
      return {
        ...state,
        studentData: {
          ...studentData,
          studentTaxonomy: [...studentData.studentTaxonomy, {
            taxonomy: {id: key},
            value,
          }],
        },
      };
    }

    case CLEAN_UP_STUDENT_DATA: {
      return {
        ...state,
        studentData: {
          firstName: null,
          lastName: null,
          emails: [null],
          phones: [null],
          language: 1,
          notifyEmail: false,
          notifySms: false,
          studentTaxonomy: [],
        },
      };
    }

    default:
      return state;
  }
};
