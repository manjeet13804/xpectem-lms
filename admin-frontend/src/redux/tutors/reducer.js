import actions from './actions';

const initState = {
  isTutorCreated: false,
  isTutorEdit: false,
  errorTutorEdit: null,
  currentTutor: {
    firstName: '',
    lastName: '',
    firstEmail: '',
    secondEmail: '',
    firstPhoneNumber: '',
    secondPhoneNumber: '',
    language: 1,
    notifyEmail: false,
    notifySms: false,
    isDeactivated: true,
    file: null,
    userLog: {},
    avatar: '',
  },
  searchCourseData: [],
  searchCourseDataEdit: [],
  searchTutorData: [],
  chosenCourses: [],
  chosenCoursesEdit: [],
  currentFindCourse: {},
  currentTutorId: null,
  isSuccessBanner: false,
  isLoadingAddTutor: false,
  error: '',
  folders: [],
  isResetPasswordTutor: false,
};

export default function tutors(state = initState, { type, ...action }) {
  switch (type) {
    case actions.RESET_TUTOR_PASSWORD: {
      return {
        ...state,
        isResetPasswordTutor: true,
      };
    }

    case actions.CLOSE_TUTOR_PASSWORD: {
      return {
        ...state,
        isResetPasswordTutor: false,
      };
    }

    case actions.CLEAR_SEARCH_TUTORS: {
      return {
        ...state,
        searchTutorData: [],
      };
    }

    case actions.CLEAR_SEARCH_DATA_COURSE: {
      return {
        ...state,
        searchCourseData: [],
      };
    }

    case actions.CLEAR_TUTOR_FOLDERS: {
      return {
        ...state,
        folders: [],
      };
    }

    case actions.GET_TUTOR_FOLDERS: {
      const { payload } = action;
      const { folders, files } = payload;
      return {
        ...state,
        folders,
        files,
      };
    }

    case actions.SET_INITIAL_PROPS: {
      return {
        ...initState,
      };
    }

    case actions.REMOVE_TUTOR_DOWNLOAD_LINK: {
      const { currentTutor } = state;
      return {
        ...state,
        currentTutor: {
          ...currentTutor,
          avatar: null,
        },
      };
    }
    case actions.CHANGE_TUTOR_INFO: {
      const { currentTutor } = state;
      const { payload } = action;
      const { name, value } = payload;
      return {
        ...state,
        currentTutor: {
          ...currentTutor,
          [name]: value,
        },
      };
    }
    case actions.CLEAR_ERROR_TUTOR: {
      return {
        ...state,
        error: null,
      };
    }

    case actions.CLEAR_SUCCESS_RESULT_TUTOR: {
      return {
        ...state,
        isSuccessBanner: false,
      };
    }

    case actions.CREATE_TUTOR_START: {
      return {
        ...state,
        isLoadingAddTutor: true,
      };
    }

    case actions.EDIT_TUTOR_START: {
      return {
        ...state,
        isLoadingAddTutor: true,
      };
    }

    case actions.CREATE_TUTOR_SUCCESS: {
      const { currentTutor } = initState;
      return {
        ...state,
        currentTutor,
        isSuccessBanner: true,
        isLoadingAddTutor: false,
      };
    }

    case actions.CREATE_TUTOR_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isSuccessBanner: false,
        isLoadingAddTutor: false,
        error: payload,
      };
    }

    case actions.SET_VALUE_OF_CURRENT_TUTOR: {
      const { payload: { name, value } } = action;
      const { currentTutor } = state;
      const updateCurrentTutor = { ...currentTutor };
      updateCurrentTutor[name] = value;
      return {
        ...state,
        currentTutor: updateCurrentTutor,
      };
    }

    case actions.SET_CURRENT_TUTOR: {
      const {
        currentTutor,
        currentTutor: {
          secondEmail,
          firstPhoneNumber,
          secondPhoneNumber,
        },
      } = initState;

      const {
        payload: {
          firstName,
          lastName,
          id,
          avatar,
          language: { id: numberOfLang },
          userEmail,
          userPhone,
          tutoringCourses,
          notifyEmail,
          notifySms,
          isDeactivated,
          userLog,
          createdAt,
          updatedAt,
        },
      } = action;

      const [
        { email: em1 },
        { email: em2 = secondEmail } = {},
      ] = userEmail;
      const [
        { phone: ph1 = firstPhoneNumber } = {},
        { phone: ph2 = secondPhoneNumber } = {},
      ] = userPhone;

      const newCurrentTutor = {
        ...currentTutor,
        firstName,
        lastName,
        avatar,
        language: numberOfLang,
        firstEmail: em1,
        secondEmail: em2,
        firstPhoneNumber: ph1,
        secondPhoneNumber: ph2,
        notifyEmail,
        notifySms,
        isDeactivated: !isDeactivated,
        userLog,
        userEmail,
        userPhone,
        createdAt,
        updatedAt,
      };

      const newChosenCourses = tutoringCourses.map(course => ({ ...course, check: true }));
      return {
        ...state,
        currentTutor: newCurrentTutor,
        chosenCourses: newChosenCourses,
        currentTutorId: id,
      };
    }

    case actions.GET_TUTORS_TUTORS: {
      const { payload } = action;
      const { isTutorEdit } = initState;

      return {
        ...state,
        isTutorEdit,
        searchTutorData: payload,
      };
    }

    case actions.SET_EDIT_TUTOR_ERROR: {
      const { payload } = action;

      return {
        ...state,
        isSuccessBanner: false,
        isLoadingAddTutor: false,
        error: payload,
      };
    }

    case actions.ADD_DATE_TUTORS: {
      const { payload: { id: courseId, date, name } = {} } = action;
      const { searchCourseData } = state;

      const indexCurrentCourse = searchCourseData.findIndex(
        ({ id }) => id === courseId,
      );

      const searchCourseItem = {
        ...searchCourseData[indexCurrentCourse],
        [name]: date,
      };

      const newSearchCoursesData = [...searchCourseData];
      newSearchCoursesData[indexCurrentCourse] = searchCourseItem;

      return {
        ...state,
        searchCourseData: [
          ...newSearchCoursesData,
        ],
      };
    }

    case actions.SET_CURRENT_FIND_COURSE_TUTORS: {
      const { payload } = action;
      const { searchCourseData, chosenCourses } = state;

      const newSearchCoursesData = searchCourseData.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            check: !item.check,
          };
        }

        return item;
      });

      const newSelected = chosenCourses.filter(item => item.id !== payload.id);

      const selectedCourses = [
        ...newSelected,
        ...newSearchCoursesData.filter(({ check, id }) => check && !newSelected.some(c => c.id === id)),
      ];

      return {
        ...state,
        currentFindCourse: payload,
        searchCourseData: [
          ...newSearchCoursesData,
        ],
        chosenCourses: [
          ...selectedCourses,
        ],
      };
    }

    case actions.SET_CURRENT_FIND_COURSE_TUTORS_EDIT: {
      const { payload } = action;
      const { searchCourseDataEdit } = state;

      const indexCurrentCourse = searchCourseDataEdit.findIndex(
        ({ id }) => id === payload.id,
      );
      const { check } = searchCourseDataEdit[indexCurrentCourse];
      const searchCourseItem = { ...searchCourseDataEdit[indexCurrentCourse], check: !check };
      const newSearchCoursesData = [...searchCourseDataEdit];
      newSearchCoursesData[indexCurrentCourse] = searchCourseItem;

      const chosenCourses = newSearchCoursesData
        .filter(({ check: checkCourse }) => checkCourse === true);

      return {
        ...state,
        currentFindCourse: payload,
        searchCourseDataEdit: [
          ...newSearchCoursesData,
        ],
        chosenCoursesEdit: [
          ...chosenCourses,
        ],
      };
    }

    case actions.SEARCH_COURSES_TUTORS: {
      const { payload } = action;
      const { chosenCourses } = state;

      const newSearchCourseData = payload.map((course) => {
        const { id } = course;
        const identialCourse = chosenCourses.find(({ id: searchId }) => searchId === id);
        if (identialCourse) {
          return identialCourse;
        }
        return course;
      });

      return {
        ...state,
        searchCourseData: newSearchCourseData,
        isTutorCreated: false,
      };
    }

    case actions.SEARCH_COURSES_TUTORS_EDIT: {
      const { payload } = action;
      const { chosenCoursesEdit } = state;

      const newSearchCourseData = payload.map((course) => {
        const { id } = course;
        const identialCourse = chosenCoursesEdit.find(({ id: searchId }) => searchId === id);
        if (identialCourse) {
          return identialCourse;
        }
        return course;
      });

      return {
        ...state,
        searchCourseDataEdit: newSearchCourseData,
        isTutorCreatedEdit: false,
      };
    }

    case actions.EDIT_TUTOR_SUCCESS: {
      return {
        ...state,
        isSuccessBanner: true,
        isLoadingAddTutor: false,
      };
    }

    case actions.SET_INITIAL_PROPS_TUTOR_EDIT: {
      const {
        currentTutorId,
        currentTutor,
        searchTutorData,
        searchCourseDataEdit,
        chosenCoursesEdit,
        errorTutorEdit,
      } = initState;

      return {
        ...state,
        currentTutorId,
        currentTutor,
        searchTutorData,
        searchCourseDataEdit,
        chosenCoursesEdit,
        errorTutorEdit,
      };
    }

    default:
      return state;
  }
}
