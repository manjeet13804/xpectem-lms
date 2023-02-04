import { errorMessage } from 'helpers/utility';
import actions from './actions';
import { INPUTS_TIME_OPTIONS } from '../../constants/inputs';
import { DEFAULT_SYSTEM_REQUIREMENTS } from '../../constants/constants';

const initTranslations = [
  {
    language: 1,
    welcomeLetter: '',
    description: '',
    welcomeEmail: '',
    descriptionShort: '',
    systemRequirements: DEFAULT_SYSTEM_REQUIREMENTS[1],
  },
  {
    language: 2,
    welcomeLetter: '',
    description: '',
    welcomeEmail: '',
    descriptionShort: '',
    systemRequirements: DEFAULT_SYSTEM_REQUIREMENTS[2],
  },
  {
    language: 3,
    welcomeLetter: '',
    description: '',
    welcomeEmail: '',
    descriptionShort: '',
    systemRequirements: DEFAULT_SYSTEM_REQUIREMENTS[3],
  },
];

const defaultTime = INPUTS_TIME_OPTIONS[0].value;

const initState = {
  currentCourse: {
    title: '',
    language: 1,
    translations: initTranslations,
    welcomeEmail: '',
    accessTime: defaultTime,
    timeToComplete: defaultTime,
    certificateTemplate: null,
    welcomeEmailTemplate: null,
    welcomeLetterTemplate: null,
    hasPhysical: false,
    isStepByStepTopics: false,
    price: '',
    senderName: '',
    senderEmail: '',
    isTutor: true,
    isCertified: false,
    isOrderable: true,
  },
  searchLmsGroupData: [],
  searchOrgData: [],
  searchGroupData: [],
  searchCourseData: [],
  searchTotalCourseData: [],
  searchLessonData: [],
  imageUri: null,
  searchExamData: [],
  searchAssignmentData: [],
  selectedAssignments: [],
  currentLmsGroup: {},
  searchTopicData: [],
  filteredTopics: [],
  currentOrg: {},
  currentGroup: {},
  searchCertData: [],
  filteredCertificates: [],
  searchTutorsData: [],
  searchHeaderData: [],
  searchFilesByHeaderData: [],
  searchFilesByNameData: [],
  currentCertId: null,
  currentTutorId: null,
  currentHeader: {},
  isCourseCreated: false,
  currentFileId: null,
  attachedFiles: [],
  headerName: '',
  getFileNameFp: '',
  currentFindCourse: '',
  attachedTutors: [],
  attachedUploadFiles: [],
  errorCourseCreated: '',
  selectedExistsTopics: [],
  selectedNewTopics: [],
  selectedLessons: [],
  selectedExams: [],
  selectedCourseGroupList: [],
  coursePermission: [],
  selectedReportType: '',
  selectedReportStudent: '',
  topicError: '',
  currentTopicObject: {
    title: '',
    lessons: [],
    exams: [],
    assignments: [],
  },
  isLoadingCurrentTopicObject: false,
  currentTopic: {},
  currentLesson: {},
  currentExam: {},
  currentAssignment: {},
  isSetInitialProps: true,
  formStage: 1,
  currentLessonFiles: [],
  isCoursePublished: false,
  isCourseUpdated: false,
  selectedFiles: [],
  file: null,
  categories: [],
  value: '',
  selectedCourseName: '',
  selectedCourseId: null,
  selectedCourses: [],
  isLoading: false,
  isLoadingPermission: false,
  isLessonUpdated: false,
  isPermissionsSaved: false,
};

export default function courses(state = initState, { type, ...action }) {
  switch (type) {
    case actions.CLEAR_CURRENT_TOPIC_OBJECT: {
      return {
        ...state,
        currentTopicObject: {},
      };
    }

    case actions.CLOSE_COURSE_PERMISSIONS: {
      return {
        ...state,
        isPermissionsSaved: false,
      };
    }

    case actions.LESSON_UPDATED: {
      return {
        ...state,
        isLessonUpdated: true,
      };
    }

    case actions.CLEAR_SEARCH_TOPIC_DATA: {
      return {
        ...state,
        searchTopicData: [],
      };
    }

    case actions.CHANGE_FIELD: {
      const { name, value } = action.payload;
      const { currentTopicObject } = state;
      return {
        ...state,
        currentTopicObject: {
          ...currentTopicObject,
          [name]: value,
        },
      };
    }

    case actions.CLEAR_LESSON_SEARCH: {
      return {
        ...state,
        searchLessonData: [],
        searchExamData: [],
        searchAssignmentData: [],
      };
    }

    case actions.SELECT_CATEGORY: {
      const { payload } = action;
      const { categories } = state;

      const rebuildedCategories = categories.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            selected: !item.selected,
          };
        }

        return item;
      });

      return {
        ...state,
        categories: rebuildedCategories,
      };
    }

    case actions.REMOVE_COURSES_IMAGE: {
      return {
        ...state,
        imageUri: null,
        file: null,
      };
    }

    case actions.GET_SEARCH_COURSES_START: {
      const { payload } = action;
      return {
        ...state,
        isLoading: payload,
        searchCourseData: [],
        // searchTotalCourseData: [],
      };
    }

    case actions.CHANGE_GROUP_PERMISSION: {
      const { payload } = action;
      const { newRow, index } = payload;
      const newCourses = state.coursePermission.newGroup[index].map((item) => {
        if (item.group_id === newRow.group_id && item.course_id === newRow.course_id) {
          item = newRow;
        }
        return item;
      });
      state.coursePermission.newGroup[index] = newCourses;
      return {
        ...state,
        coursePermission: {
          queryGroup: state.coursePermission.queryGroup,
          newGroup: state.coursePermission.newGroup,


        },
      };
    }
    case actions.SET_SEARCH_VALUE_SEARCH:
      const { payload } = action;
      return {
        ...state,
        value: payload,
      };

    case actions.SELECT_STUDENT_REPORT_ID: {
      const { payload } = action;
      return {
        ...state,
        selectedReportStudent: payload,
      };
    }
    case actions.SELECT_COURSE_REPORT_ID: {
      const { payload } = action;
      return {
        ...state,
        selectedReportType: payload,
      };
    }

    case actions.SET_SEARCH_COURSE_NAME: {
      const { payload } = action;
      return {
        ...state,
        selectedCourseName: payload,
      };
    }
    case actions.SET_SEARCH_COURSE_ID: {
      const { payload } = action;
      return {
        ...state,
        selectedCourseId: payload,
      };
    }

    case actions.CLEAR_SEARCH_DATA_COURSE: {
      return {
        ...state,
        selectedCourses: [],
        searchCourseData: [],
        searchTotalCourseData: [],
      };
    }

    case actions.CLEAR_LMS_GROUP_COURSE: {
      return {
        ...state,
        currentLmsGroup: {},
        searchLmsGroupData: [],
        currentOrg: {},
        searchOrgData: [],
        currentGroup: {},
        searchGroupData: [],
        searchCourseData: [],
      };
    }

    case actions.CLEAR_ORG_COURSE: {
      return {
        ...state,
        currentOrg: {},
        searchOrgData: [],
        currentGroup: {},
        searchGroupData: [],
        searchCourseData: [],
      };
    }

    case actions.REMOVE_ITEM_FROM_SELECTED_COURSE: {
      const { payload } = action;
      return {
        ...state,
        selectedCourses: state.selectedCourses.filter(item => item.id !== payload),
      };
    }
    case actions.SELECT_ALL: {
      return {
        ...state,
        selectedCourses: state.searchTotalCourseData.map(el => ({ id: el.id, text: el.title, permission: el.permission })),
      };
    }
    case actions.CLEAR_ALL_COURSE: {
      return {
        ...state,
        selectedCourses: [],
      };
    }
    case actions.ADD_TO_SELECTED_COURSE: {
      const { payload } = action;
      const course = state.selectedCourses.find(item => item.id === payload.id);
      if (course) {
        return {
          ...state,
          selectedCourses: state.selectedCourses.filter(item => item.id !== course.id),
        };
      }

      return {
        ...state,
        selectedCourses: [
          ...state.selectedCourses,
          payload,
        ],
      };
    }
    case actions.SELECT_COURSE_GROUP_LIST: {
      const { payload } = action;

      return {
        ...state,
        selectedCourseGroupList: payload,
      };
    }

    case actions.SELECT_COURSE_PERMISSION_START: {
      return {
        ...state,
        isLoadingPermission: true,
      };
    }

    case actions.SELECT_COURSE_PERMISSION: {
      const { payload } = action;

      return {
        ...state,
        isLoadingPermission: false,
        coursePermission: payload,
      };
    }

    case actions.SELECT_COURSE_PERMISSION_POST: {
      const { payload } = action;

      return {
        ...state,
        isPermissionsSaved: true,
        coursePermission: payload,
      };
    }

    case actions.SET_CATEGORIES_LIST: {
      const { payload } = action;
      const { categories } = payload;

      const rebuildCategories = categories.map(item => ({
        ...item,
        selected: false,
      }));

      return {
        ...state,
        categories: rebuildCategories,
      };
    }

    case actions.TOGGLE_TUTORS: {
      const { payload } = action;
      const { currentCourse } = state;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          isTutor: payload,
        },
      };
    }

    case actions.CHANGE_INFO_COURSE: {
      const { payload } = action;
      const { currentCourse } = state;
      const { name, value } = payload;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          [name]: value,
        },
      };
    }

    case actions.DELETE_UPLOADED_FILE: {
      const { payload } = action;
      const { selectedFiles } = state;

      return {
        ...state,
        selectedFiles: selectedFiles.filter(item => item.id !== payload),
      };
    }

    case actions.CLEAR_FILES: {
      return {
        ...state,
        selectedFiles: [],
      };
    }

    case actions.ADD_FILES_TO_COURSE_FROM_UPLOADED: {
      const { selectedFiles, attachedUploadFiles } = state;

      return {
        ...state,
        attachedUploadFiles: [
          ...attachedUploadFiles,
          ...selectedFiles,
        ],
        selectedFiles: [],
      };
    }

    case actions.COURSE_TOPIC_NAME_UPDATED: {
      const { payload } = action;
      const { topicId, topicName } = payload;
      const { selectedExistsTopics } = state;
      const newSelected = selectedExistsTopics.map((item) => {
        if (item.id === Number(topicId)) {
          return {
            ...item,
            name: topicName,
          };
        }

        return item;
      });

      return {
        ...state,
        selectedExistsTopics: newSelected,
      };
    }

    case actions.COURSE_SWITCH_HAS_PHYSICAL: {
      const { payload } = action;
      const { currentCourse } = state;
      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          hasPhysical: payload,
        },
      };
    }

    case actions.UPDATE_COURSE_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        errorCourseCreated: payload,
      };
    }

    case actions.COURSE_UPDATED: {
      return {
        ...state,
        isCourseUpdated: true,
      };
    }

    case actions.CLEAR_NOTIFICATION_STATUS: {
      const { payload } = action;
      return {
        ...state,
        [payload]: false,
      };
    }

    case actions.PUBLISH_COURSE: {
      const { status } = action.payload;
      const currentCourse = { ...state.currentCourse, status };

      return {
        ...state,
        currentCourse,
        isCoursePublished: true,
      };
    }

    case actions.CLEAR_SEARCH_DATA_FROM_INPUT_COURSES: {
      return {
        ...state,
        searchOrgData: [],
        searchGroupData: [],
        searchCourseData: [],
        searchTotalCourseData: [],
        searchLessonData: [],
        searchExamData: [],
        searchTopicData: [],
        searchAssignmentData: [],
        searchCertData: [],
        searchTutorsData: [],
        searchHeaderData: [],
        searchFilesByHeaderData: [],
        searchFilesByNameData: [],
        filteredCertificates: [],
      };
    }

    case actions.TOOGLE_STATUS_SET_INITIAL_PROPS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        isSetInitialProps: payload,
      };
    }

    case actions.GET_COURSE_BY_ID_COURSES: {
      const { payload } = action;
      const { categories } = state;
      const {
        time: { complete, access },
        language,
        courseTopics,
        courseAttachment,
        tutors,
        translations,
        courseCertificate,
        welcomeLetterTemplate,
        welcomeEmailTemplate,
        categories: courseCategories,
        media: {
          hasPhysical,
        },
      } = payload;

      if (!language) {
        return {
          ...state,
        };
      }

      const courseTranslations = translations.map(item => ({
        ...item,
        language: item.language.id,
      }));

      const newTranslations = initTranslations.map((item) => {
        const findTranslation = courseTranslations
          .find(translation => translation.language === item.language);

        if (findTranslation) {
          const translation = Object.entries(findTranslation).reduce((acc, trans) => {
            if (trans[0] === 'id') {
              return acc;
            }
            return {
              ...acc,
              [trans[0]]: trans[1],
            };
          }, {});

          return translation;
        }

        return item;
      });


      const rebuildedCategories = categories.map(item => ({
        ...item,
        selected: courseCategories.some(category => category.id === item.id),
      }));

      return {
        ...state,
        currentCourse: {
          ...payload,
          language: language.id,
          accessTime: access,
          timeToComplete: complete,
          translations: newTranslations,
          welcomeLetterTemplate: null,
          welcomeLetterTemplateURL: welcomeLetterTemplate,
          welcomeEmailTemplate: null,
          welcomeEmailTemplateURL: welcomeEmailTemplate,
          hasPhysical,
          isTutor: Boolean(tutors.length),
        },
        selectedExistsTopics: [...courseTopics.map(({ topic }) => (topic))],
        attachedTutors: [...tutors],
        attachedUploadFiles: [...courseAttachment],
        currentCertId: courseCertificate ? courseCertificate.id : null,
        categories: rebuildedCategories,
      };
    }

    case actions.ADD_LESSON_TO_TOPIC_COURSES: {
      const { payload } = action;
      const { selectedLessons } = state;

      return {
        ...state,
        selectedLessons: [
          ...selectedLessons,
          ...[payload],
        ],
      };
    }

    case actions.ADD_EXAM_TO_TOPIC_COURSES: {
      const { payload } = action;
      const { selectedExams } = state;
      return {
        ...state,
        selectedExams: [
          ...selectedExams,
          ...[payload],
        ],
      };
    }

    case actions.ADD_ASSIGNMENT_TO_TOPIC_COURSES: {
      const { payload } = action;
      const { selectedAssignments } = state;

      return {
        ...state,
        selectedAssignments: [
          ...selectedAssignments,
          ...[payload],
        ],
      };
    }

    case actions.DELETE_ITEM_FROM_SELECTED_COURSES: {
      const {
        payload: {
          id: currentItemId,
          type: typeList,
        },
      } = action;
      const {
        selectedLessons,
        selectedExams,
        selectedAssignments,
      } = state;

      switch (typeList) {
        case 'lessons':
          return {
            ...state,
            selectedLessons: [
              ...selectedLessons
                .filter(({ id }) => id !== currentItemId)
                .map((item, index) => {
                  item.order = index + 1;
                  return item;
                }),
            ],
          };
        case 'exams':
          return {
            ...state,
            selectedExams: [
              ...selectedExams.filter(({ id }) => id !== currentItemId),
            ],
          };
        case 'assignments':
          return {
            ...state,
            selectedAssignments: [
              ...selectedAssignments.filter(({ id }) => id !== currentItemId),
            ],
          };
        default:
          return {
            ...state,
          };
      }
    }

    case actions.GET_TOPIC_BY_ID_COURSES_START: {
      return {
        ...state,
        isLoadingCurrentTopicObject: true,
      };
    }

    case actions.GET_TOPIC_BY_ID_COURSES: {
      const {
        payload,
        payload: {
          lessons,
          exams,
          assignments,
        },
      } = action;

      return {
        ...state,
        currentTopicObject: payload,
        isLoadingCurrentTopicObject: false,
        selectedLessons: [
          ...lessons,
        ],
        selectedExams: [
          ...exams,
        ],
        selectedAssignments: [
          ...assignments,
        ],
      };
    }

    case actions.REORDER_ARRAY_COURSES: {
      const { payload: { result, type: typeList } } = action;
      const {
        selectedLessons,
        selectedExams,
        selectedAssignments,
      } = state;

      if (result && (!result.source || !result.destination)) { return { ...state }; }

      const reorder = (list, startIndex, endIndex) => {
        const resultArray = [...list];
        const [removed] = resultArray.splice(startIndex, 1);
        resultArray.splice(endIndex, 0, removed);

        return resultArray;
      };

      const reorderArray = array => reorder(
        array,
        result.source.index,
        result.destination.index,
      );

      const newArray = array => [...reorderArray(array)]
        .map((item, index) => { item.order = index + 1; return item; });

      switch (typeList) {
        case 'lessons':
          return {
            ...state,
            selectedLessons: [
              ...newArray(selectedLessons),
            ],
          };
        case 'exams':
          return {
            ...state,
            selectedExams: [
              ...newArray(selectedExams),
            ],
          };
        case 'assignments':
          return {
            ...state,
            selectedAssignments: [
              ...newArray(selectedAssignments),
            ],
          };
        default:
          return {
            ...state,
          };
      }
    }

    case actions.SET_CURRENT_ASSIGNMENT_COURSES: {
      const { payload } = action;
      return {
        ...state,
        currentAssignment: payload,
      };
    }

    case actions.SET_CURRENT_EXAM_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentExam: payload,
      };
    }

    case actions.SET_CURRENT_LESSON_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentLesson: payload,
      };
    }

    case actions.SEARCH_ASSIGNMENTS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchAssignmentData: payload,
      };
    }

    case actions.SEARCH_EXAMS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchExamData: payload,
      };
    }

    case actions.SEARCH_LESSONS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchLessonData: payload,
      };
    }

    case actions.DELETE_TOPIC_FROM_SELECTED_COURSES: {
      const { payload } = action;
      const { selectedExistsTopics } = state;

      const newSelectedExistsTopics = selectedExistsTopics.filter(({ id }) => id !== payload);

      return {
        ...state,
        selectedExistsTopics: [
          ...newSelectedExistsTopics,
        ],
      };
    }

    case actions.SET_CURRENT_EXIST_TOPIC_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentTopic: {
          name: payload.name,
          id: payload.rowId,
        },
      };
    }

    case actions.SET_CURRENT_NEW_TOPIC_COURSES: {
      const { payload } = action;
      const { selectedNewTopics } = state;

      const isAlreadyAdded = selectedNewTopics.some(({ name }) => name === payload.name);
      if (isAlreadyAdded) { return state; }

      return {
        ...state,
        selectedNewTopics: [
          ...selectedNewTopics,
          ...[payload],
        ],
        topicError: '',
        currentTopic: payload.name,
      };
    }

    case actions.SET_CURRENT_NEW_TOPIC_ERROR_COURSES: {
      const { payload } = action;

      return {
        ...state,
        topicError: payload,
      };
    }

    case actions.SEARCH_TOPICS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchTopicData: payload,
      };
    }

    case actions.ADD_DATE_COURSES: {
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

    case actions.SEARCH_COURSES_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchCourseData: payload,
        isLoading: false,
      };
    }

    case actions.SEARCH_COURSES_TOTAL_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchTotalCourseData: payload,
        isLoading: false,
      };
    }

    case actions.SET_SEARCH_COURSES_DEFAULT: {
      const { payload } = action;

      return {
        ...state,
        searchCourseData: payload,
      };
    }

    case actions.SET_CURRENT_GROUP_COURSES: {
      const { payload } = action;
      const { searchGroupData } = state;

      const newSearchGroupData = searchGroupData.map((item) => {
        if (item.id === payload.id) {
          item.check = !item.check;
        } else {
          item.check = false;
        }
        return item;
      });

      return {
        ...state,
        currentGroup: payload,
        searchGroupData: newSearchGroupData,
      };
    }

    case actions.SET_CURRENT_ORG_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentOrg: payload,
      };
    }

    case actions.SET_CURRENT_LMS_GROUP_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroup: payload,
      };
    }

    case actions.SEARCH_LMS_GROUP_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchLmsGroupData: payload,
      };
    }

    case actions.SEARCH_ORG_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchOrgData: payload,
      };
    }

    case actions.SEARCH_GROUP_COURSES: {
      const { payload } = action;
      const newSearchGroupData = payload.map((item) => {
        item.check = false;
        return item;
      });

      return {
        ...state,
        searchGroupData: newSearchGroupData,
      };
    }

    case actions.UPLOAD_TEMPLATE_FILE_TO_COURSE: {
      const fields = ['welcomeEmailTemplate', 'welcomeLetterTemplate'];
      const { payload: { name, file } } = action;
      const { currentCourse } = state;
      const urlFileName = `${name}URL`;

      if (fields.includes(name)) {
        return {
          ...state,
          currentCourse: {
            ...currentCourse,
            [name]: file,
            [urlFileName]: '',
          },
        };
      }
      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          [name]: file,
        },
      };
    }

    case actions.DELETE_FILE_COURSE: {
      const { payload: { data, fileId, isLessonFiles } } = action;
      const {
        searchFilesByNameData,
        attachedFiles,
        attachedUploadFiles,
        currentLessonFiles,
        currentTopicObject,
      } = state;

      if (!data) { return null; }

      if (isLessonFiles) {
        const { files } = currentTopicObject;
        return {
          ...state,
          currentTopicObject: {
            ...currentTopicObject,
            files: files.filter(item => item.id !== fileId),
          },
          currentLessonFiles: currentLessonFiles.filter(item => item.id !== fileId),
        };
      }

      const filterFiles = array => array.filter(({ id }) => id !== fileId);

      return {
        ...state,
        searchFilesByNameData: filterFiles(searchFilesByNameData),
        attachedFiles: filterFiles(attachedFiles),
        attachedUploadFiles: filterFiles(attachedUploadFiles),
      };
    }

    case actions.EDIT_FILE_COURSE: {
      const {
        payload: {
          data,
          fileId,
          isLessonFiles,
        },
      } = action;

      const {
        currentLessonFiles,
        selectedFiles,
        currentTopicObject,
      } = state;

      const newCurrentLessonFiles = currentLessonFiles.map((item) => {
        if (item.id === fileId) {
          return data;
        }

        return item;
      });

      if (isLessonFiles) {
        return {
          ...state,
          currentTopicObject: {
            ...currentTopicObject,
            files: newCurrentLessonFiles,
          },
          currentLessonFiles: newCurrentLessonFiles,
        };
      }

      return {
        ...state,
        selectedFiles: selectedFiles.map((item) => {
          if (item.id === fileId) {
            return {
              ...data,
            };
          }

          return item;
        }),
      };
    }

    case actions.UPLOAD_FILE_TO_COURSES: {
      const { payload } = action;
      const { currentLessonFiles, selectedFiles, currentTopicObject } = state;
      const { data, isLessonFiles } = payload;

      if (isLessonFiles) {
        return {
          ...state,
          currentTopicObject: {
            ...currentTopicObject,
            files: [
              ...currentTopicObject.files,
              ...[data],
            ],
          },
          currentLessonFiles: [
            ...currentLessonFiles,
            ...[data],
          ],
        };
      }

      return {
        ...state,
        searchHeaderData: [],
        selectedFiles: [...selectedFiles, data],
      };
    }

    case actions.SET_INITIAL_PROPS_COURSES: {
      return {
        ...initState,
      };
    }

    case actions.SET_INITIAL_PROPS_ADD_FILES: {
      return {
        ...state,
        searchFilesByHeaderCourses: [],
        searchFilesByNameData: [],
        searchHeaderData: [],
        attachedUploadFiles: [],
        attachedFiles: [],
      };
    }

    case actions.SEARCH_FILES_OF_COURSE: {
      return {
        ...state,
      };
    }

    case actions.SAVE_INPUT_CREATE_COURSES: {
      const { payload: { name, value } } = action;
      const { currentCourse } = state;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          [name]: value,
        },
      };
    }

    case actions.SAVE_INPUT_ADD_FILES_COURSES: {
      const { payload: { name, value } } = action;

      return {
        ...state,
        [name]: value,
      };
    }
    case actions.CREATE_LANGUAGE_COURSES: {
      const { payload } = action;
      const { currentCourse } = state;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          language: payload,
        },
      };
    }

    case actions.CREATE_DESCRIPTION_COURSES: {
      const { payload: { value, name, lang } } = action;
      const { currentCourse } = state;
      const { translations } = currentCourse;

      const newTranslations = translations.map((item, i) => {
        if (i === lang) {
          return {
            ...item,
            [name]: value,
          };
        }

        return item;
      });

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          translations: newTranslations,
        },
      };
    }

    case actions.CREATE_WELCOME_EMAIL_COURSES: {
      const { payload } = action;
      const { currentCourse } = state;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          welcomeEmail: payload,
        },
      };
    }

    case actions.CREATE_WELCOME_LETTER_COURSES: {
      const { payload } = action;
      const { currentCourse } = state;

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          welcomeLetter: payload,
        },
      };
    }

    case actions.SEARCH_CERT_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchCertData: payload,
      };
    }

    case actions.SEARCH_TUTORS_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchTutorsData: payload,
      };
    }

    case actions.SEARCH_HEADER_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchHeaderData: payload,
      };
    }

    case actions.SEARCH_FILES_BY_HEADER_COURSES: {
      const { payload } = action;

      return {
        ...state,
        searchFilesByHeaderData: payload,
        searchFilesByNameData: payload,
      };
    }

    case actions.SET_CURRENT_CERT_ID_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentCertId: payload,
      };
    }

    case actions.SET_CURRENT_TUTOR_ID_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentTutorId: payload,
      };
    }

    case actions.SET_CURRENT_HEADER_ID_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentHeader: payload,
      };
    }

    case actions.CREATE_COURSE_SUCCESS: {
      const { payload } = action;
      const { courseTopics, translations, time } = payload;
      const { access, complete } = time;

      const courseTranslations = translations.map(item => ({
        ...item,
        language: item.language.id,
      }));
      const newTranslations = initTranslations.map((item) => {
        const findTranslation = courseTranslations
          .find(translation => translation.language === item.language);

        if (findTranslation) {
          const translation = Object.entries(findTranslation).reduce((acc, trans) => {
            if (trans[0] === 'id') {
              return acc;
            }
            return {
              ...acc,
              [trans[0]]: trans[1],
            };
          }, {});

          return translation;
        }

        return item;
      });
      const mapsCourseTopics = (courseTopics.length)
        && courseTopics.map(({ topic }) => topic);

      return {
        ...state,
        isCourseCreated: true,
        currentCourse: {
          ...payload,
          translations: newTranslations,
          accessTime: access,
          timeToComplete: complete,
          hasPhysical: payload.media.hasPhysical,
        },
        selectedNewTopics: [
          ...mapsCourseTopics,
        ],
        selectedExistsTopics: [],
        formStage: 2,
      };
    }

    case actions.CREATE_COURSE_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isCourseCreated: false,
        errorCourseCreated: payload,
      };
    }

    case actions.SEARCH_FILES_COURSES: {
      const { searchFilesByHeaderData } = state;
      const { payload: { queryString, daterange } } = action;
      const filteredFiles = searchFilesByHeaderData
        .filter(({ name, time }) => name.includes(queryString)
          && (daterange ? time > daterange : 1));
      return {
        ...state,
        searchFilesByNameData: filteredFiles,
      };
    }

    case actions.SET_CURRENT_FILE_ID_COURSES: {
      const { payload } = action;

      return {
        ...state,
        currentFileId: payload,
      };
    }

    case actions.ATTACH_FILE_COURSES: {
      const { payload } = action;
      const { searchFilesByNameData, attachedFiles } = state;
      const isAlreadyAdded = attachedFiles.some(({ id }) => id === payload);
      if (isAlreadyAdded) return state;
      const fileToAttach = searchFilesByNameData.find(({ id }) => id === payload);

      return {
        ...state,
        attachedFiles: [...attachedFiles, fileToAttach],
      };
    }

    case actions.REMOVE_ATTACHED_FILE_COURSES: {
      const { payload } = action;
      const { attachedFiles } = state;
      const filteredAttached = attachedFiles.filter(({ id }) => id !== payload);

      return {
        ...state,
        attachedFiles: filteredAttached,
      };
    }

    case actions.REMOVE_UPLOADED_FILE_COURSES: {
      const { payload } = action;
      const { attachedUploadFiles } = state;

      const filteredUploaded = attachedUploadFiles.filter(({ id }) => id !== payload);
      return {
        ...state,
        attachedUploadFiles: filteredUploaded,
      };
    }

    case actions.SET_CURRENT_FIND_COURSE_COURSES: {
      const { payload } = action;
      const { searchCourseData } = state;

      const newSearchCourseData = searchCourseData.map((item) => {
        if (item.id === payload.id) {
          item.check = true;
        } else {
          item.check = false;
        }
        return item;
      });

      return {
        ...state,
        currentFindCourse: payload,
        searchCourseData: newSearchCourseData,
      };
    }

    case actions.FILTER_CERTIFICATES_COURSES: {
      const { payload } = action;
      const { searchCertData } = state;
      const searchData = payload ? payload.toLowerCase() : payload;
      const filteredCertificates = searchCertData.filter(
        ({ originalName }) => originalName.toLowerCase().includes(searchData),
      );

      return {
        ...state,
        filteredCertificates,
      };
    }

    case actions.ATTACH_TUTOR_COURSES: {
      const { payload } = action;
      const {
        attachedTutors,
        searchTutorsData,
      } = state;
      const exists = attachedTutors.some(({ id }) => id === payload);
      if (exists) return state;
      const tutorToAdd = searchTutorsData.find(({ id }) => id === payload);

      return {
        ...state,
        attachedTutors: [...attachedTutors, tutorToAdd],
      };
    }

    case actions.REMOVE_ATTACHED_TUTOR_COURSES: {
      const { payload } = action;
      const { attachedTutors } = state;

      const filteredTutors = attachedTutors.filter(({ id }) => id !== payload);

      return {
        ...state,
        attachedTutors: filteredTutors,
      };
    }

    case actions.REMOVE_ATTACHED_FILE_TO_COURSE: {
      const { payload } = action;
      const { attachedFiles, attachedUploadFiles } = state;

      const filterAttachedFiles = attachedFiles.filter(({ id }) => id !== payload);
      const filterAttachedUploadFiles = attachedUploadFiles.filter(({ id }) => id !== payload);

      return {
        ...state,
        attachedFiles: [
          ...filterAttachedFiles,
        ],
        attachedUploadFiles: [
          ...filterAttachedUploadFiles,
        ],
      };
    }

    case actions.CLEAR_TRANSLATAION_INPUT_BY_NAME: {
      const { payload } = action;
      const { currentCourse } = state;
      const { translations } = currentCourse;

      const newTranslations = translations.map(item => ({
        ...item,
        [payload]: '',
      }));

      return {
        ...state,
        currentCourse: {
          ...currentCourse,
          translations: newTranslations,
        },
      };
    }

    case actions.CREATE_TOPIC_SUCCESS: {
      const { payload } = action;
      const { selectedExistsTopics } = state;
      const isAlreadyAdded = selectedExistsTopics.some(({ name }) => name === payload.name);
      if (isAlreadyAdded) {
        errorMessage('Lesson with same name already added to the course lessons');
        return state;
      }

      const topicToAdd = {
        name: payload.name,
        id: payload.id,
      };

      return {
        ...state,
        selectedExistsTopics: [
          ...selectedExistsTopics,
          ...[topicToAdd],
        ],
      };
    }

    case actions.UPDATE_LESSON_SUCCESS: {
      const { payload } = action;
      const { selectedLessons, currentTopicObject } = state;
      const { id } = payload;

      const { lessons } = currentTopicObject;
      const newLessons = selectedLessons.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });
      const newTopicLessons = lessons.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });
      return {
        ...state,
        selectedLessons: newLessons,
        currentTopicObject: {
          ...currentTopicObject,
          lessons: newTopicLessons,
        },
      };
    }

    case actions.UPDATE_EXAM_SUCCES: {
      const { payload } = action;
      const { selectedExams, currentTopicObject } = state;
      const { id } = payload;
      const { exams } = currentTopicObject;

      const newExams = selectedExams.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });

      const newTopicExams = exams.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });
      return {
        ...state,
        selectedExams: newExams,
        currentTopicObject: {
          ...currentTopicObject,
          exams: newTopicExams,
        },
      };
    }

    case actions.UPDATE_ASSIGNMENT_SUCCESS: {
      const { payload } = action;
      const { selectedAssignments, currentTopicObject } = state;
      const { id } = payload;
      const { assignments } = currentTopicObject;

      const newAssignments = selectedAssignments.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });

      const newTopicAssignments = assignments.map((item) => {
        if (item.id === id) {
          return payload;
        }

        return item;
      });
      return {
        ...state,
        selectedAssignments: newAssignments,
        currentTopicObject: {
          ...currentTopicObject,
          assignments: newTopicAssignments,
        },
      };
    }

    case actions.CLEAR_CURRENT_LESSON_FILES: {
      return {
        ...state,
        currentLessonFiles: [],
      };
    }

    case actions.SET_CURRENT_LESSON_FILES: {
      const { payload } = action;
      return {
        ...state,
        currentLessonFiles: payload,
      };
    }

    default:
      return state;
  }
}
