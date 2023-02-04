import moment from 'moment';
import _ from 'lodash';
import { REG_LINKS_TABS } from 'constants/constants';
import actions from './actions';
import { reducerAssignments } from '../../utils';

const initState = {
  currentStudents: [],
  searchLmsGroupsData: [],
  searchOrgData: [],
  searchGroupsData: [],
  searchCoursesData: [],
  searchStudentsData: [],
  currentLmsGroupId: '',
  currentOrgId: '',
  currentGroupId: '',
  currentNameLmsGroup: '',
  currentNameOrg: '',
  currentStudentId: '',
  chosenGroup: [],
  selectedCourses: [],
  isAddedStudents: false,
  isInitial: false,
  isImportFile: false,
  isEditStudent: false,
  isPasswordResetStudent: false,
  isDeleteStudent: false,
  isCurrentNav: 'courseDetails.courseTab',
  errorImport: '',
  error: '',
  note: '',
  noteValue: '',
  currentDetailCourseId: '',
  courseContent: {},
  certification: [],
  questionsAndAnswers: [],
  currentTopicId: '',
  currentQuestionId: '',
  dialogs: [],
  addNewQA: false,
  searchAdmins: [],
  hasPhysicalCourse: false,
  isBlockPreviewButton: true,
  isImporting: false,
  courseDetailsSuccess: false,
  courseDetailsError: null,
  isNeedToUpdateStudents: false,
  studentsToUpdate: [],
  addExistingStudentsStart: false,
  successAddExistingStudents: false,
  addExistingStudentsError: '',
  certificationExamLogs: [],
  registrationLinks: [],
  loadingGetRegistrationLinks: false,
  errorGetRegistrationLinks: null,
  loadingDeleteRegistrationLinks: false,
  loadingUpadateRegistrationLinks: false,
  regSelectedGroups: [],
  regSelectedCourses: [],
  regIsActive: false,
  regLinkTab: REG_LINKS_TABS.SELECT_GROUPS,
  topicsQA: [],
  searchMessageValue: '',
  addMyCourseError: '',
  loadingGetMyCourse: false,
};

export default function students(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_MY_COURSE_START: {
      return {
        ...state,
        loadingGetMyCourse: true,
        addMyCourseError: '',
      };
    }
    case actions.GET_MY_COURSE_SUCCESS: {
      return {
        ...state,
        loadingGetMyCourse: false,
      };
    }
    case actions.GET_MY_COURSE_ERROR: {
      const { payload } = action;
      return {
        ...state,
        addMyCourseError: payload,
      };
    }
    case actions.CLOSE_EXISTING_STUDENTS_MODAL: {
      return {
        ...state,
        isNeedToUpdateStudents: false,
        studentsToUpdate: [],
        addExistingStudentsError: '',
      };
    }

    case actions.ADD_EXISTING_STUDENTS_START: {
      return {
        ...state,
        addExistingStudentsStart: true,
      };
    }

    case actions.ADD_EXISTING_STUDENTS_SUCCESS: {
      return {
        ...state,
        addExistingStudentsStart: false,
        successAddExistingStudents: true,
        studentsToUpdate: [],
      };
    }

    case actions.ADD_EXISTING_STUDENTS_FAIL: {
      const { payload } = action;
      return {
        ...state,
        addExistingStudentsError: payload,
        addExistingStudentsStart: false,
      };
    }

    case actions.DELETE_STUDENT_FROM_LIST: {
      const { currentStudents } = state;
      const studentsFiltered = currentStudents.filter((item, i) => i !== action.payload);

      return {
        ...state,
        currentStudents: studentsFiltered,
      };
    }

    case actions.SAVE_COURSE_CONTENT_FAIL: {
      return {
        ...state,
        courseDetailsSuccess: false,
        courseDetailsError: action.payload,
      };
    }

    case actions.SAVE_COURSE_CONTENT_SUCCESS: {
      return {
        ...state,
        courseDetailsSuccess: true,
        courseDetailsError: null,
      };
    }
    case actions.CLEAR_BANNER_COURSE_DETAILS: {
      return {
        ...state,
        courseDetailsSuccess: false,
        courseDetailsError: null,
      };
    }

    case actions.SELECT_NONE_COURES: {
      const { searchCoursesData, selectedCourses: stateSelectedCourses, currentStudents } = state;

      const newSearchCoursesData = searchCoursesData.map(item => ({
        ...item,
        check: false,
      }));

      const selectedCourses = stateSelectedCourses.filter(item => !(newSearchCoursesData.some(
        course => course.id === item.id,
      )));

      const hasPhysicalCourse = selectedCourses.some(item => item.media && item.media.hasPhysical);

      const rebuildStudentsFields = currentStudents.map(item => ({
        ...item,
        streetAddress: hasPhysicalCourse ? item.streetAddress : '',
      }));

      return {
        ...state,
        hasPhysicalCourse,
        currentStudents: rebuildStudentsFields,
        searchCoursesData: [
          ...newSearchCoursesData,
        ],
        selectedCourses: [
          ...selectedCourses,
        ],
      };
    }

    case actions.SELECT_ALL_COURSES: {
      const { searchCoursesData, selectedCourses: stateSelectedCourses, currentStudents } = state;

      const newSearchCoursesData = searchCoursesData.map(item => ({
        ...item,
        check: true,
      }));

      const selectedCourses = _.uniqBy([...newSearchCoursesData, ...stateSelectedCourses], 'id');

      const hasPhysicalCourse = selectedCourses.some(item => item.media && item.media.hasPhysical);

      const rebuildStudentsFields = currentStudents.map(item => ({
        ...item,
        streetAddress: hasPhysicalCourse ? item.streetAddress : '',
      }));

      return {
        ...state,
        hasPhysicalCourse,
        currentStudents: rebuildStudentsFields,
        searchCoursesData: [
          ...newSearchCoursesData,
        ],
        selectedCourses: [
          ...selectedCourses,
        ],
      };
    }

    case actions.CLOSE_EDIT_STUDENT: {
      return {
        ...state,
        isEditStudent: false,
      };
    }

    case actions.IMPORT_CSV_STUDENTS_START: {
      return {
        ...state,
        isImporting: true,
      };
    }

    case actions.DELETE_STUDENT_FROM_COURSE: {
      const { payload } = action;
      const { currentStudents } = state;

      const [currentStudent] = currentStudents;

      const { userCourseRelation } = currentStudent;

      const newCourses = userCourseRelation.filter(item => item.course.id !== payload);

      return {
        ...state,
        currentStudents: [
          {
            ...currentStudent,
            userCourseRelation: newCourses,
          },
        ],
      };
    }

    case actions.CHECK_FILE_FOR_IMPORT: {
      return {
        ...state,
        isBlockPreviewButton: false,
      };
    }

    case actions.CLEAR_FILE_FOR_IMPORT: {
      return {
        ...state,
        isBlockPreviewButton: true,
      };
    }

    case actions.CLOSE_SUCCES_ADD_STUDENTS: {
      const {
        isNeedToUpdateStudents,
        studentsToUpdate,
      } = state;

      return {
        ...initState,
        isNeedToUpdateStudents,
        studentsToUpdate,
      };
    }

    case actions.ADD_STUDENT_STREET: {
      const { payload } = action;
      const { currentStudents } = state;
      const { value, index } = payload;

      const currentStudent = {
        ...currentStudents[index],
        streetAddress: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[index] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.REMOVE_USER_AVATAR: {
      const { payload } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[payload],
        avatar: '',
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[payload] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_UNFILLED_FIELDS_TO_STUDENT: {
      const { currentStudents } = state;
      const { payload } = action;
      const newCurrentsStudents = currentStudents.map((item, i) => {
        const findStudent = payload.find(student => student.studentIndex === i);
        if (findStudent) {
          return {
            ...item,
            unfilledFields: findStudent.unfilledFields,
          };
        }

        return item;
      });

      return {
        ...state,
        currentStudents: [
          ...newCurrentsStudents,
        ],
      };
    }

    case actions.ADD_ERRORSTATUS_TO_STUDENT: {
      const { payload } = action;
      const { isError, indexStudent } = payload;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        isError,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.REASIGN_ADMIN_COMMUNICATION_STUDENTS: {
      const { payload } = action;
      const {
        data,
        dialogId,
      } = payload;
      const { dialogs } = state;

      if (!data) {
        return null;
      }

      const newDialogs = [...dialogs];
      const filterDialog = newDialogs.filter(({ id }) => (id !== dialogId));

      return {
        ...state,
        dialogs: [
          ...filterDialog,
        ],
      };
    }

    case actions.SEARCH_ADMINS_COMMUNICATION_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        searchAdmins: [
          ...payload,
        ],
      };
    }

    case actions.EDIT_HEADER_COMMUNICATION_STUDENTS: {
      const { payload } = action;
      const { data, dialogId, body: { heading } = {} } = payload;
      const { dialogs } = state;

      if (!data) {
        return null;
      }

      const indexDialog = dialogs.findIndex(
        ({ id }) => id === dialogId,
      );

      const newDialogs = [...dialogs];
      newDialogs[indexDialog] = {
        ...newDialogs[indexDialog],
        heading,
      };

      return {
        ...state,
        dialogs: [
          ...newDialogs,
        ],
      };
    }

    case actions.RESET_PASSWORD_STUDENT_SUCCESS: {
      return {
        ...state,
        isPasswordResetStudent: true,
      };
    }

    case actions.CLOSE_RESET_PASSWORD_STUDENT: {
      return {
        ...state,
        isPasswordResetStudent: false,
      };
    }

    case actions.ADD_MESSAGE_COMMUNICATION_STUDENTS: {
      const { payload: { data, dialogId, isComplete } } = action;
      const { dialogs } = state;

      const indexDialog = dialogs.findIndex(
        ({ id }) => id === dialogId,
      );

      const newDialogs = [...dialogs];
      const { communicationMessage } = newDialogs[indexDialog];

      newDialogs[indexDialog] = {
        ...newDialogs[indexDialog],
        communicationMessage: [
          ...(communicationMessage || ''),
          data,
        ],
        isClosed: isComplete,
      };

      return {
        ...state,
        dialogs: [
          ...newDialogs,
        ],
      };
    }

    case actions.SET_DIALOG_COMPLETED: {
      const { payload: { dialogId } } = action;
      const { dialogs } = state;

      const indexDialog = dialogs.findIndex(
        ({ id }) => id === dialogId,
      );

      const newDialogs = [...dialogs];

      newDialogs[indexDialog] = {
        ...newDialogs[indexDialog],
        isClosed: true,
      };

      return {
        ...state,
        dialogs: [
          ...newDialogs,
        ],
      };
    }

    case actions.ADD_COMMUNICATION_STUDENTS: {
      const { payload } = action;
      const { dialogs } = state;
      const newDialogs = [payload, ...dialogs];

      return {
        ...state,
        dialogs: [
          ...newDialogs,
        ],
      };
    }

    case actions.GET_COMMUNICATIONS_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        dialogs: [
          ...payload,
        ],
      };
    }

    case actions.ADD_NEW_TOPIC_STUDENTS: {
      const { payload } = action;
      const { topicsQA } = state;

      return {
        ...state,
        topicsQA: [
          ...topicsQA,
          payload,
        ],
      };
    }

    case actions.ADD_NEW_QA_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        addNewQA: true,
        questionsAndAnswers: payload,
      };
    }

    case actions.SEARCH_TOPIC_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        topicsQA: payload,
      };
    }

    case actions.DELETE_QA_STUDENTS: {
      const { payload } = action;

      const {
        currentTopicId,
        currentQuestionId,
        questionsAndAnswers,
      } = state;

      const indexTopic = questionsAndAnswers.findIndex(
        ({ id }) => id === currentTopicId,
      );

      const newQuestionsAndAnswers = [...questionsAndAnswers];

      const { questions } = newQuestionsAndAnswers[indexTopic];

      const newQuestions = [...questions];
      const filterQuestions = newQuestions.filter(({ id }) => id !== currentQuestionId);

      if (payload) {
        newQuestionsAndAnswers[indexTopic] = {
          ...newQuestionsAndAnswers[indexTopic],
          questions: [...filterQuestions],
        };
      }

      return {
        ...state,
        questionsAndAnswers: [
          ...newQuestionsAndAnswers,
        ],
      };
    }

    case actions.SET_CURRENT_QUESTION_ID_STUDENTS: {
      const { payload: { topicId, questionId } } = action;

      return {
        ...state,
        currentTopicId: topicId,
        currentQuestionId: questionId,
      };
    }

    case actions.CHANGE_DESCRIPTION_QA_STUDENTS: {
      const { payload } = action;
      const { questionsAndAnswers } = state;
      const {
        topicId,
        questionId,
        value,
        name,
      } = payload;

      const indexTopic = questionsAndAnswers.findIndex(
        ({ id }) => id === topicId,
      );

      const newQuestionsAndAnswers = [...questionsAndAnswers];
      const { questions } = newQuestionsAndAnswers[indexTopic];

      const indexQuestion = questions.findIndex(
        ({ id }) => id === questionId,
      );

      const newQuestions = [...questions];
      newQuestions[indexQuestion] = {
        ...newQuestions[indexQuestion],
        [name]: value,
      };

      newQuestionsAndAnswers[indexTopic] = {
        ...newQuestionsAndAnswers[indexTopic],
        questions: newQuestions,
      };

      return {
        ...state,
        questionsAndAnswers: [
          ...newQuestionsAndAnswers,
        ],
      };
    }

    case actions.GET_QA_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        questionsAndAnswers: [
          ...payload,
        ],
      };
    }

    case actions.RESERVE_CERTIFICATION_STUDENTS: {
      const { payload } = action;
      const { certificationId } = payload;
      const { certification } = state;

      const indexCert = certification.findIndex(
        ({ id }) => id === certificationId,
      );

      const newCertification = [...certification];
      newCertification[indexCert] = {
        ...newCertification[indexCert],
        isBooked: true,
      };

      return {
        ...state,
        certification: [
          ...newCertification,
        ],
      };
    }

    case actions.CANCEL_RESERVE_CERTIFICATION_STUDENTS: {
      const { payload } = action;
      const { certificationId } = payload;
      const { certification } = state;

      const indexCert = certification.findIndex(
        ({ id }) => id === certificationId,
      );

      const newCertification = [...certification];
      newCertification[indexCert] = {
        ...newCertification[indexCert],
        isBooked: false,
      };

      return {
        ...state,
        certification: [
          ...newCertification,
        ],

      };
    }

    case actions.GET_CERTIFICATION_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        certification: payload,
      };
    }

    case actions.ADD_DATE_COURSE_CONTENT_STUDENTS: {
      const { payload: { date, name } = {} } = action;
      const { courseContent } = state;
      const { startAt, studyPlan = {} } = courseContent;
      const { wishedDoneDate } = studyPlan;

      return {
        ...state,
        courseContent: {
          ...courseContent,
          startAt: (name === 'dateBegin') ? date : startAt,
          studyPlan: {
            ...studyPlan,
            wishedDoneDate: (name === 'dateEnd') ? date : wishedDoneDate,
          },
        },
      };
    }

    case actions.ADD_EXAM_STUD_LOG:{
      const {
        payload: { courseTopicId, examId, data },
      } = action;

      const {
        courseContent,
        courseContent: { course = {} },
      } = state;
      const { courseTopics } = course;

      const indexCourseTopic = courseTopics.findIndex(({ topic: { id } }) => id === courseTopicId);

      const {
        topic,
        topic: { exams },
      } = courseTopics[indexCourseTopic];

      const indexExam = exams.findIndex(({ id }) => id === examId);

      const { studentLogs } = exams[indexExam];

      const newStudentLogs = [...studentLogs, data.data];

      const newExams = [...exams];
      newExams[indexExam] = {
        ...newExams[indexExam],
        studentLogs: newStudentLogs,
      };

      const newTopic = {
        ...topic,
        exams: newExams,
      };
      const newCourseTopics = [...courseTopics];
      newCourseTopics[indexCourseTopic] = {
        ...newCourseTopics[indexCourseTopic],
        topic: newTopic,
      };

      return {
        ...state,
        courseContent: {
          ...courseContent,
          course: {
            ...course,
            courseTopics: [...newCourseTopics],
          },
        },
      };
    }

    case actions.DELETE_EXAMS_STUDENT_LOGS_STUDENTS: {
      const {
        payload: { courseTopicId, examId, studLogId },
      } = action;

      const {
        courseContent,
        courseContent: { course = {} },
      } = state;
      const { courseTopics } = course;

      const indexCourseTopic = courseTopics.findIndex(({ topic: { id } }) => id === courseTopicId);

      const {
        topic,
        topic: { exams },
      } = courseTopics[indexCourseTopic];

      const indexExam = exams.findIndex(({ id }) => id === examId);

      const { studentLogs } = exams[indexExam];

      const newStudentLogs = studentLogs.filter((log) => log.id !== studLogId);

      const newExams = [...exams];
      newExams[indexExam] = {
        ...newExams[indexExam],
        studentLogs: newStudentLogs,
      };

      const newTopic = {
        ...topic,
        exams: newExams,
      };
      const newCourseTopics = [...courseTopics];
      newCourseTopics[indexCourseTopic] = {
        ...newCourseTopics[indexCourseTopic],
        topic: newTopic,
      };

      return {
        ...state,
        courseContent: {
          ...courseContent,
          course: {
            ...course,
            courseTopics: [...newCourseTopics],
          },
        },
      };
    }

    case actions.CHANGE_EXAM_STUD_LOG_POINTS_STUDENTS: {
      const {
        payload: {
          value,
          name,
          courseTopicId,
          examId,
          studLogId,
          lessonId,
        },
      } = action;
      const { courseContent, courseContent: { course = {} } } = state;
      const { courseTopics } = course;

      if (lessonId) {
        const newTopics = courseTopics.map((item) => {
          if (item.topic.id === courseTopicId) {
            const { lessons } = item.topic;
            const newLessons = lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                const { exams } = lesson;
                const newExams = exams.map((exam) => {
                  if (exam.id === examId) {
                    const { studentLogs } = exam;
                    const newStudentLogs = studentLogs.map((log) => {
                      if (log.id === studLogId) {
                        return {
                          ...log,
                          [name]: value,
                        };
                      }

                      return log;
                    });
                    return {
                      ...exam,
                      studentLogs: newStudentLogs,
                    };
                  }

                  return exam;
                });
                return {
                  ...lesson,
                  exams: newExams,
                };
              }

              return lesson;
            });

            return {
              ...item,
              topic: {
                ...item.topic,
                lesson: newLessons,
              },
            };
          }

          return item;
        });

        return {
          ...state,
          courseContent: {
            ...courseContent,
            course: {
              ...course,
              courseTopics: newTopics,
            },
          },
        };
      }

      const indexCourseTopic = courseTopics.findIndex(
        ({ topic: { id } }) => id === courseTopicId,
      );

      const { topic, topic: { exams } } = courseTopics[indexCourseTopic];

      const indexExam = exams.findIndex(
        ({ id }) => id === examId,
      );

      const { studentLogs } = exams[indexExam];

      const indexStudentLog = studentLogs.findIndex(
        ({ id }) => id === studLogId,
      );

      const newStudentLogs = [...studentLogs];
      newStudentLogs[indexStudentLog] = {
        ...newStudentLogs[indexStudentLog],
        [name]: value,
      };

      const newExams = [...exams];
      newExams[indexExam] = {
        ...newExams[indexExam],
        studentLogs: newStudentLogs,
      };

      const newTopic = {
        ...topic,
        exams: newExams,
      };
      const newCourseTopics = [...courseTopics];
      newCourseTopics[indexCourseTopic] = {
        ...newCourseTopics[indexCourseTopic],
        topic: newTopic,
      };

      return {
        ...state,
        courseContent: {
          ...courseContent,
          course: {
            ...course,
            courseTopics: [
              ...newCourseTopics,
            ],
          },
        },
      };
    }

    case actions.GET_CERTIFICATION_EXAM_STUDENTS: {
      const {
        payload,
      } = action;
      return {
        ...state,
        ...payload,
      };
    }

    case actions.SET_CERTIFICATION_EXAM_STUDENTS: {
      const {
        payload,
      } = action;
      return {
        ...state,
        ...payload,
      };
    }

    case actions.DELETE_CERTIFICATION_EXAM_STUDENTS: {
      const {
        payload,
      } = action;
      return {
        ...state,
        certificationExamLogs: state.certificationExamLogs.filter(el => el.id !== payload),
      };
    }

    case actions.CHANGE_EXAM_POINTS_STUDENTS: {
      const {
        payload: {
          value,
          name,
          courseTopicId,
          examId,
          lessonId,
        },
      } = action;
      const { courseContent, courseContent: { course = {} } } = state;
      const { courseTopics } = course;

      if (lessonId) {
        const newTopics = courseTopics.map((item) => {
          if (item.topic.id === courseTopicId) {
            const { lessons } = item.topic;
            const newLessons = lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                const { exams } = lesson;
                const newExams = exams.map((exam) => {
                  if (exam.id === examId) {
                    const newExam = {
                      ...exam,
                      [name]: value,
                    };
                    return newExam;
                  }

                  return exam;
                });
                return {
                  ...lesson,
                  exams: newExams,
                };
              }

              return lesson;
            });

            return {
              ...item,
              topic: {
                ...item.topic,
                lessons: newLessons,
              },
            };
          }

          return item;
        });

        return {
          ...state,
          courseContent: {
            ...courseContent,
            course: {
              ...course,
              courseTopics: newTopics,
            },
          },
        };
      }
      const indexCourseTopic = courseTopics.findIndex(
        ({ topic: { id } }) => id === courseTopicId,
      );

      const { topic, topic: { exams } } = courseTopics[indexCourseTopic];

      const indexExam = exams.findIndex(
        ({ id }) => id === examId,
      );

      const newExams = [...exams];

      newExams[indexExam] = {
        ...newExams[indexExam],
        [name]: value,
      };

      const newTopic = {
        ...topic,
        exams: newExams,
      };

      const newCourseTopics = [...courseTopics];
      newCourseTopics[indexCourseTopic] = {
        ...newCourseTopics[indexCourseTopic],
        topic: newTopic,
      };

      return {
        ...state,
        courseContent: {
          ...courseContent,
          course: {
            ...course,
            courseTopics: [
              ...newCourseTopics,
            ],
          },
        },
      };
    }

    case actions.DELETE_ASSIGNMENT_STUD_LOG: {
      const { payload } = action;
    
      const transformStudentLogs = ({studentLogs, studLogId})=>{
        return studentLogs.filter((studentLog) => studentLog.id !== studLogId)
      }

      return reducerAssignments({payload, state, transformStudentLogs})
    }

    case actions.ADD_ASSIGNMENT_STUD_LOG: {
      const { payload } = action;
    
      const transformStudentLogs = ({studentLogs, data})=>{
        return [...studentLogs, data.data]
      }

      return reducerAssignments({payload, state, transformStudentLogs})
    }

    case actions.CHANGE_ASSIGNMENT_STATUS_STUDENTS: {
      const { payload } = action;
    
      const transformStudentLogs = ({studentLogs, status, studLogId, completedAt})=>{
        return studentLogs.map((studLog) => {
            if (studLog.id === studLogId) {
              return {
                ...studLog,
                status,
                completedAt,
              };
            }

            return studLog;
          })
      }

      return reducerAssignments({payload, state, transformStudentLogs})
    }

    case actions.GET_COURSE_CONTENT_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        courseContent: payload,
      };
    }

    case actions.ADD_VALUE_TO_NOTE_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        note: payload,
      };
    }

    case actions.CHANGE_DESCRIPTION_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        noteValue: payload,
      };
    }

    case actions.GET_STUDENT_NOTES_STUDENTS: {
      const { payload: { note } } = action;

      return {
        ...state,
        note,
      };
    }

    case actions.CHANGE_NAV_MENU_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        isCurrentNav: payload,
      };
    }

    case actions.DELETE_STUDENT_SUCCESS: {
      return {
        ...state,
        isDeleteStudent: true,
      };
    }

    case actions.DELETE_STUDENT_FAILURE: {
      return {
        ...state,
        isDeleteStudent: false,
      };
    }

    case actions.ADD_CROP_FILE_STUDENTS: {
      const { payload } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[0],
        file: payload,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[0] = currentStudent;
      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.EDIT_STUDENT_STUDENT_SUCCESS: {
      return {
        ...state,
        isEditStudent: true,
        selectedCourses: [],
        searchCoursesData: [],
      };
    }

    case actions.EDIT_STUDENT_STUDENT_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isEditStudent: false,
        error: payload,
      };
    }

    case actions.TOGGLE_COURSE_PASSED_STUDENTS: {
      const { payload } = action;
      const { currentStudents } = state;
      const [currentStudent] = currentStudents || [];
      const { userCourseRelation } = currentStudent;

      const indexCurrentCourse = userCourseRelation.findIndex(
        ({ id }) => id === payload,
      );

      const { coursePassed } = userCourseRelation[indexCurrentCourse];

      const userCourseRelationItem = {
        ...userCourseRelation[indexCurrentCourse],
        coursePassed: !coursePassed,
      };

      const newUserCourseRelation = [...userCourseRelation];
      newUserCourseRelation[indexCurrentCourse] = userCourseRelationItem;

      return {
        ...state,
        currentStudents: [
          {
            ...currentStudent,
            userCourseRelation: [
              ...newUserCourseRelation,
            ],
          },
        ],
      };
    }

    case actions.PUT_DATE_STUDENTS: {
      const { payload } = action;
      const {
        id: courseId,
        date,
        name,
        id
      } = payload;
      const { currentStudents } = state;
      const [currentStudent] = currentStudents || [];
      const { userCourseRelation } = currentStudent;
      const { selectedCourses } = state;

      const indexCurrentCourse = userCourseRelation.findIndex(
        ({ id }) => id === courseId,
      );

      const userCourseRelationItem = {
        ...userCourseRelation[indexCurrentCourse],
        [name]: date,
      };

      const newUserCourseRelation = [...userCourseRelation];
      newUserCourseRelation[indexCurrentCourse] = userCourseRelationItem;

      const newCoursDataBegin = selectedCourses.map(item => {
        if(item.id === id) {
        return { ...item, dateBegin: date}
        }
        return item;
        })

      return {
        ...state,
        currentStudents: [
          {
            ...currentStudent,
            userCourseRelation: [
              ...newUserCourseRelation,
            ],
          },
        ],
        selectedCourses: newCoursDataBegin,
      };
    }

    case actions.GET_CURRENT_STUDENT_STUDENTS: {
      const { payload } = action;
      const {
        userEmail,
        userPhone,
        avatar,
        streetAddress,
      } = payload;

      const emails = userEmail.map(({ email }) => email);
      const phones = userPhone.map(({ phone }) => phone);

      if (emails.length === 1) emails.push('');
      if (phones.length === 1) phones.push('');

      return {
        ...state,
        hasPhysicalCourse: Boolean(streetAddress),
        currentStudents: [
          {
            ...payload,
            emails,
            phones,
            avatar: avatar === null ? '' : avatar,
          },
        ],
      };
    }

    case actions.SEARCH_STUDENTS_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        searchStudentsData: payload,
      };
    }

    case actions.SET_CURRENT_STUDENT_ID_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentStudentId: payload,
        searchStudentsData: [],
      };
    }

    case actions.IMPORT_CSV_STUDENTS_SUCCESS: {
      const { payload } = action;
      const { studentsToUpdate } = payload;
      const isNeedToUpdateStudents = Boolean(studentsToUpdate.length);

      return {
        ...state,
        isImportFile: true,
        isImporting: false,
        isNeedToUpdateStudents,
        studentsToUpdate,
      };
    }

    case actions.IMPORT_CSV_STUDENTS_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isImportFile: false,
        errorImport: payload,
        isImporting: false,
      };
    }

    case actions.ADD_STUDENTS_START: {
      const { currentStudents } = state;
      const newCurrentStudents = currentStudents
        .map((item) => {
          if (!item.notifyEmail) {
            return {
              ...item,
              notifyEmail: false,
            };
          }
          return item;
        })
        .map((item) => {
          if (!item.notifySms) {
            return {
              ...item,
              notifySms: false,
            };
          }
          return item;
        });

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
        isInitial: true,
      };
    }

    case actions.ADD_STUDENTS_SUCCESS: {
      const { payload } = action;
      const { studentsToUpdate } = payload;
      const isNeedToUpdateStudents = Boolean(studentsToUpdate.length);

      return {
        ...state,
        isAddedStudents: true,
        isNeedToUpdateStudents,
        studentsToUpdate,
      };
    }

    case actions.ADD_STUDENTS_FAILURE: {
      const { payload } = action;

      return {
        ...state,
        isAddedStudents: false,
        error: payload,
      };
    }


    case actions.ADD_DATE_STUDENTS: {
      const { payload: { id: courseId, date, name } = {} } = action;
      const { searchCoursesData, selectedCourses } = state;

      const indexCurrentCourse = searchCoursesData.findIndex(
        ({ id }) => id === courseId,
      );

      const searchCourseItem = {
        ...searchCoursesData[indexCurrentCourse],
        [name]: date,
      };

      const newSearchCoursesData = [...searchCoursesData];
      newSearchCoursesData[indexCurrentCourse] = searchCourseItem;
      const newSelectedCourses = selectedCourses.map((item) => {
        if (item.id === courseId) {
          return {
            ...item,
            dateBegin: date,
          };
        }

        return item;
      });

      return {
        ...state,
        searchCoursesData: [
          ...newSearchCoursesData,
        ],
        selectedCourses: newSelectedCourses,
      };
    }

    case actions.SET_CURRENT_COURSE_ID_DETAIL_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentDetailCourseId: payload,
      };
    }

    case actions.SET_CURRENT_COURSE_ID_STUDENTS: {
      const { payload } = action;
      const { searchCoursesData, selectedCourses: stateSelectedCourses, currentStudents } = state;

      const newSearchCoursesData = searchCoursesData.map((item) => {
        if (item.id === payload) {
          return {
            ...item,
            check: !item.check,
          };
        }

        return item;
      });

      const newSelected = stateSelectedCourses.filter(item => item.id !== payload);

      const selectedCourses = [
        ...newSelected,
        ...newSearchCoursesData.filter(({ check, id }) => check && !newSelected.some(c => c.id === id)),
      ];

      const hasPhysicalCourse = selectedCourses.some(item => item.media && item.media.hasPhysical);

      const rebuildStudentsFields = currentStudents.map(item => ({
        ...item,
        streetAddress: hasPhysicalCourse ? item.streetAddress : '',
      }));

      return {
        ...state,
        hasPhysicalCourse,
        currentStudents: rebuildStudentsFields,
        currentCourseId: payload,
        searchCoursesData: [
          ...newSearchCoursesData,
        ],
        selectedCourses: [
          ...selectedCourses,
        ],
      };
    }

    case actions.CHANGE_CHECKBOX_STUDENTS: {
      const { payload: { value, name, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        [name]: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_LANGUAGE_STUDENTS: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents = {} } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        language: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_EMAIL_STUDENTS: {
      const { payload: { name, value, indexStudent } = {} } = action;
      const { currentStudents } = state;
      const newStudents = currentStudents.map((item, i) => {
        if (i === indexStudent) {
          const { emails } = item;
          if (!emails) {
            if (name === 'firstEmail') {
              return {
                ...item,
                emails: [value],
              };
            }

            return {
              ...item,
              emails: ['', value],
            };
          }
          if (name === 'firstEmail') {
            return {
              ...item,
              emails: emails.map((email, index) => {
                if (index === 0) {
                  return value;
                }

                return email;
              }),
            };
          }

          return {
            ...item,
            emails: [emails[0], value],
          };
        }

        return item;
      });
      return {
        ...state,
        currentStudents: newStudents,
      };
    }

    case actions.ADD_PHONE_STUDENTS: {
      const { payload: { name, value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const newStudents = currentStudents.map((item, i) => {
        if (i === indexStudent) {
          const { phones } = item;
          if (!phones) {
            if (name === 'firstPhone') {
              return {
                ...item,
                phones: [value],
              };
            }

            return {
              ...item,
              phones: ['', value],
            };
          }
          if (name === 'firstPhone') {
            return {
              ...item,
              phones: phones[1] ? [value, phones[1]] : [value],
            };
          }

          return {
            ...item,
            phones: [phones[0] || '', value],
          };
        }

        return item;
      });

      return {
        ...state,
        currentStudents: newStudents,
      };
    }

    case actions.ADD_EMPLOYEENUMBER_STUDENTS: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        employeeNumber: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_PERSONNUMBER_STUDENTS: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        personNumber: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_FIRSTNAME_STUDENTS: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        firstName: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_LASTNAME_STUDENTS: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        lastName: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.ADD_TAXONOMY_TO_STUDENT: {
      const { payload: { value, indexStudent } = {} } = action;
      const { currentStudents } = state;

      const currentStudent = {
        ...currentStudents[indexStudent],
        studentTaxonomy: value,
      };
      const newCurrentStudents = [...currentStudents];
      newCurrentStudents[indexStudent] = currentStudent;

      return {
        ...state,
        currentStudents: [
          ...newCurrentStudents,
        ],
      };
    }

    case actions.SET_CURRENT_ID_LMS_GROUP_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentLmsGroupId: payload,
      };
    }

    case actions.SET_CURRENT_NAME_ORG_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentNameOrg: payload,
      };
    }

    case actions.SET_CURRENT_NAME_LMS_GROUP_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentNameLmsGroup: payload,
      };
    }

    case actions.SET_CURRENT_ORG_ID_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        currentOrgId: payload,
      };
    }

    case actions.SET_CURRENT_GROUP_ID_STUDENTS: {
      const { payload } = action;
      const { searchGroupsData } = state;

      const indexCurrentGroup = searchGroupsData.findIndex(
        ({ id }) => id === payload,
      );
      const { check } = searchGroupsData[indexCurrentGroup];
      const searchGroupItem = {
        ...searchGroupsData[indexCurrentGroup],
        check: !check,
      };
      const newSearchGroupsData = [...searchGroupsData];
      newSearchGroupsData[indexCurrentGroup] = searchGroupItem;

      const chosenGroup = newSearchGroupsData.filter(({ check }) => check === true);

      return {
        ...state,
        currentGroupId: payload,
        searchGroupsData: [
          ...newSearchGroupsData,
        ],
        chosenGroup: [
          ...chosenGroup,
        ],
      };
    }

    case actions.SET_INITIAL_PROPS_STUDENTS: {
      const {
        currentStudents,
        searchLmsGroupsData,
        searchOrgData,
        searchStudentsData,
      } = initState;

      return {
        ...state,
        currentStudents: {
          ...currentStudents,
        },
        searchLmsGroupsData: [
          ...searchLmsGroupsData,
        ],
        searchOrgData: [
          ...searchOrgData,
        ],
        searchStudentsData: [
          ...searchStudentsData,
        ],
      };
    }

    case actions.SEARCH_GROUPS_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        searchGroupsData: payload,
      };
    }

    case actions.SEARCH_ORG_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        searchOrgData: payload,
      };
    }

    case actions.SEARCH_LMS_GROUPS_STUDENTS: {
      const { payload } = action;

      return {
        ...state,
        searchLmsGroupsData: payload,
      };
    }

    case actions.SEARCH_COURSES_STUDENTS: {
      const { payload } = action;
      const { selectedCourses } = state;

      const newSearchData = payload.map((item) => {
        const isAlreadyChecked = selectedCourses.some(course => course.id === item.id);

        return {
          ...item,
          check: isAlreadyChecked,
          dateBegin: moment(new Date())
            .add(1, 'day')
            .toDate(),
        };
      });

      return {
        ...state,
        searchCoursesData: newSearchData,
      };
    }

    case actions.CLEAR_STUDENTS_STORE: {
      return {
        ...initState,
      };
    }

    case actions.CLEAR_IMPORT_STATUSES: {
      const { payload } = action;
      const { isImportFile, errorImport } = payload;
      return {
        ...state,
        isImportFile,
        errorImport,
      };
    }


    case actions.GET_REGISTRATION_LINKS_LOADING: {
      return {
        ...state,
        loadingGetRegistrationLinks: true,
      };
    }

    case actions.GET_REGISTRATION_LINKS_SUCCESS: {
      const { payload } = action;
      return {
        ...state,
        registrationLinks: payload,
        loadingGetRegistrationLinks: false,
      };
    }

    case actions.UPDATE_STATUS_REGISTRATION_LINK_LOADING: {
      return {
        ...state,
        loadingUpadateRegistrationLinks: true,
      };
    }

    case actions.UPDATE_STATUS_REGISTRATION_LINK_SUCCESS: {
      return {
        ...state,
        loadingUpadateRegistrationLinks: false,
      };
    }

    case actions.DELETE_REGISTRATION_LINK_LOADING: {
      return {
        ...state,
        loadingDeleteRegistrationLinks: true,
      };
    }

    case actions.DELETE_REGISTRATION_LINK_SUCCESS: {
      return {
        ...state,
        loadingDeleteRegistrationLinks: false,
      };
    }

    case actions.ADD_REG_LINK_SELECTED_GROUPS: {
      const { payload: groups } = action;
      return {
        ...state,
        regSelectedGroups: groups,
      };
    }

    case actions.DELETE_REG_LINK_SELECTED_GROUP: {
      const { payload: id } = action;
      return {
        ...state,
        regSelectedGroups: state.regSelectedGroups.filter(item => item.id !== id),
      };
    }

    case actions.ADD_REG_LINK_SELECTED_COURSES: {
      const { payload: courses } = action;
      return {
        ...state,
        regSelectedCourses: courses,
      };
    }

    case actions.DELETE_REG_LINK_SELECTED_COURSE: {
      const { payload: id } = action;
      return {
        ...state,
        regSelectedCourses: state.regSelectedCourses.filter(item => item.id !== id),
      };
    }

    case actions.SWITCH_REG_LINK_STATUS: {
      return {
        ...state,
        regIsActive: !state.regIsActive,
      };
    }

    case actions.CHANGE_REG_LINK_TAB: {
      const { payload: tab } = action;
      return {
        ...state,
        regLinkTab: tab,
      };
    }

    case actions.CREATE_REGISTRATION_LINK: {
      return {
        ...state,
        regSelectedGroups: [],
        regSelectedCourses: [],
        regIsActive: false,
        regLinkTab: REG_LINKS_TABS.SELECT_GROUPS,
      };
    }

    case actions.CLEAN_UP_REG_LINK_STATE: {
      return {
        ...state,
        regSelectedGroups: [],
        regSelectedCourses: [],
        regIsActive: false,
        regLinkTab: REG_LINKS_TABS.SELECT_GROUPS,
      };
    }

    case actions.DELETE_LAST_MESSAGE: {
      const { dialogs } = state;
      const {
        payload: {
          dialogId,
          messageId,
        },
      } = action;

      const newDialogs = dialogs.map((item) => {
        if (item.id === dialogId) {
          const { communicationMessage } = item;
          const newMessages = communicationMessage.filter(el => el.id !== messageId);

          return { ...item, communicationMessage: newMessages };
        }

        return item;
      });

      return {
        ...state,
        dialogs: newDialogs,
      };
    }

    case actions.DELETE_DIALOG: {
      const { dialogs } = state;
      const { payload: dialogId } = action;

      const newDialogs = dialogs.filter(item => item.id !== dialogId);
      return {
        ...state,
        dialogs: newDialogs,
      };
    }

    case actions.CHANGE_SEARCH_MESSAGE_VALUE: {
      const { payload: search } = action;
      return {
        ...state,
        searchMessageValue: search,
      };
    }

    default:
      return state;
  }
}
