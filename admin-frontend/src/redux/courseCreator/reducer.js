import actions from './actions';

const initState = {
  currentCourseCreator: {
    firstName: '',
    lastName: '',
    language: 1,
    notifyEmail: false,
    notifySms: false,
    file: '',
    firstEmail: '',
    secondEmail: '',
    firstTelephone: '',
    secondTelephone: '',
    personNumber: '',
    employeeNumber: '',
    isDeactivated: false,
  },
  isSuccessCourseCreator: false,
  isResetPasswordCourseCreator: false,
  error: '',
  isLoadingAddCourseCreator: false,
  isLoadingEdiCourseCreator: false,
  isLoadingCourseCreators: false,
  courseCreatorsSearchData: [],
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isDeactivated: false,
  },
};

export default function courseCreator(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CLEAR_COURSE_CREATOR_SEARCH_DATA: {
      return {
        ...state,
        courseCreatorsSearchData: [],
        person: {},
      };
    }

    case actions.CHANGE_STATE_PERSON_COURSE_CREATOR: {
      const { payload } = action;
      return {
        ...state,
        person: {
          ...state.person,
          [payload.name]: payload.value,
        },
      };
    }

    case actions.DELETE_COURSE_FROM_CREATOR: {
      const { payload } = action;
      const { currentCourseCreator } = state;
      const { courses } = currentCourseCreator;

      return {
        ...state,
        currentCourseCreator: {
          ...currentCourseCreator,
          courses: courses.filter(item => item.course.id !== payload),
        },
      };
    }

    case actions.GET_COURSE_CREATOR_INFO: {
      const { payload } = action;
      const { courseCreatedBy } = payload;

      const emails = payload.userEmail.map(({ email }) => email);
      const phones = payload.userPhone.map(({ phone }) => phone);
      return {
        ...state,
        currentCourseCreator: {
          ...payload,
          groupsList: payload.groups.map(item => item.name).join(', '),
          language: payload.language.id,
          firstEmail: emails[0],
          secondEmail: emails[1] || '',
          firstTelephone: phones[0] || '',
          secondTelephone: phones[1] || '',
          notifyEmail: Boolean(payload.notifyEmail),
          notifySms: Boolean(payload.notifySms),
          courses: courseCreatedBy,
        },
      };
    }

    case actions.SEARCH_COURSE_CREATORS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        isLoadingCourseCreators: false,
        courseCreatorsSearchData: payload,
      };
    }

    case actions.SEARCH_COURSE_CREATORS_START: {
      return {
        ...state,
        isLoadingCourseCreators: true,
      };
    }

    case action.SEARCH_COURSE_CREATORS_FAIL: {
      return {
        ...state,
        isLoadingCourseCreators: false,
      };
    }

    case actions.RESET_COURSE_CREATOR_PASSWORD: {
      return {
        ...state,
        isResetPasswordCourseCreator: true,
      };
    }

    case actions.CLOSE_COURSE_CREATOR_PASSWORD: {
      return {
        ...state,
        isResetPasswordCourseCreator: false,
      };
    }

    case actions.EDIT_COURSE_CREATOR_FAIL: {
      return {
        ...state,
        isLoadingEdiCourseCreator: false,
      };
    }

    case actions.EDIT_COURSE_CREATOR_START: {
      return {
        ...state,
        isLoadingEdiCourseCreator: true,
      };
    }

    case actions.SAVE_COURSE_CREATOR_START: {
      return {
        ...state,
        isLoadingAddCourseCreator: true,
      };
    }
    case actions.REMOVE_DOWNLOAD_LINK_COURSE_CREATOR: {
      const { currentCourseCreator } = state;
      return {
        ...state,
        currentCourseCreator: {
          ...currentCourseCreator,
          avatar: '',
        },
      };
    }

    case actions.CLEAR_ERROR_COURSE_CREATOR: {
      return {
        ...state,
        error: null,
      };
    }

    case actions.EDIT_COURSE_CREATOR_SUCCESS: {
      return {
        ...state,
        isSuccessCourseCreator: true,
        isLoadingEdiCourseCreator: false,
      };
    }

    case actions.SAVE_COURSE_CREATOR_FAIL: {
      const { payload } = action;
      return {
        ...state,
        isSuccessCourseCreator: false,
        isLoadingAddCourseCreator: false,
        error: payload,
      };
    }

    case actions.SAVE_COURSE_CREATOR_SUCCESS: {
      return {
        ...state,
        isSuccessCourseCreator: true,
        isLoadingAddCourseCreator: false,
        currentCourseCreator: {
          ...initState.currentCourseCreator,
        },
      };
    }

    case actions.CLEAR_SUCCESS_RESULT_COURSE_CREATOR: {
      return {
        ...state,
        isSuccessCourseCreator: false,
      };
    }

    case actions.SET_INITIAL_STATE_COURSE_CREATOR: {
      return {
        ...initState,
      };
    }

    case actions.CHANGE_INFO_CURRENT_COURSE_CREATOR: {
      const { payload } = action;
      const { name, value } = payload;
      const { currentCourseCreator } = state;

      return {
        ...state,
        currentCourseCreator: {
          ...currentCourseCreator,
          [name]: value,
        },
      };
    }

    case actions.ADD_CROP_FILE_COURSE_CREATOR: {
      const { payload } = action;
      const { currentCourseCreator } = state;

      return {
        ...state,
        currentCourseCreator: {
          ...currentCourseCreator,
          file: payload,
        },
      };
    }

    default:
      return state;
  }
}
