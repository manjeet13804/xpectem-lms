import { FAQ_TYPES } from 'constants/constants';
import actions from './actions';

const initState = {
  studentQuestionsAndAnswers: [],
  adminQuestionsAndAnswers: [],
  coursesQuestionsAndAnswers: [],
  currentTopicId: '',
  currentQuestionId: '',
  addNewQA: false,
  isAddQuestion: false,
  isAdmin: '',
  question: '',
  answer: '',
  topicsArray: [],
  topic: '',
  faqType: FAQ_TYPES.STUDENT,
  currentCourseId: undefined,
};

export default function questionsAndAnswers(state = initState, { type, ...action }) {
  switch (type) {
    case actions.GET_STUDENT_QA: {
      const { payload } = action;

      return {
        ...state,
        studentQuestionsAndAnswers: [
          ...payload,
        ],
      };
    }

    case actions.GET_ADMIN_QA: {
      const { payload } = action;

      return {
        ...state,
        adminQuestionsAndAnswers: [
          ...payload,
        ],
      };
    }

    case actions.GET_COURSE_QA: {
      const { payload } = action;

      return {
        ...state,
        coursesQuestionsAndAnswers: [
          ...payload,
        ],
      };
    }

    case actions.ADD_NEW_QA: {
      const { payload } = action;

      return {
        ...state,
        addNewQA: true,
        studentQuestionsAndAnswers: payload,
      };
    }

    case actions.ADD_NEW_ADMIN_QA: {
      const { payload } = action;

      return {
        ...state,
        addNewQA: true,
        adminQuestionsAndAnswers: payload,
      };
    }

    case actions.ADD_NEW_COURSE_QA: {
      const { payload } = action;

      return {
        ...state,
        addNewQA: true,
        coursesQuestionsAndAnswers: payload,
      };
    }

    case actions.CHANGE_QA: {
      const { payload } = action;
      const { studentQuestionsAndAnswers } = state;
      const {
        topicId,
        questionId,
        value,
        name,
      } = payload;

      const indexTopic = studentQuestionsAndAnswers.findIndex(
        ({ id }) => id === topicId,
      );

      const newQuestionsAndAnswers = [...studentQuestionsAndAnswers];
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
        studentQuestionsAndAnswers: [
          ...newQuestionsAndAnswers,
        ],
      };
    }

    case actions.CHANGE_ADMIN_QA: {
      const { payload } = action;
      const { adminQuestionsAndAnswers } = state;
      const {
        topicId,
        questionId,
        value,
        name,
      } = payload;

      const indexTopic = adminQuestionsAndAnswers.findIndex(
        ({ id }) => id === topicId,
      );

      const newQuestionsAndAnswers = [...adminQuestionsAndAnswers];
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
        adminQuestionsAndAnswers: [
          ...newQuestionsAndAnswers,
        ],
      };
    }

    case actions.SET_CURRENT_QUESTION_ID_QA: {
      const { payload: { topicId, questionId } } = action;

      return {
        ...state,
        currentTopicId: topicId,
        currentQuestionId: questionId,
      };
    }

    case actions.SEARCH_TOPIC_QA: {
      const { payload } = action;

      return {
        ...state,
        topicsQA: payload,
      };
    }

    case actions.TOGGLE_ADD_NEW_QUESTION: {
      return {
        ...state,
        isAddQuestion: !state.isAddQuestion,
        question: '',
        answer: '',
        topicsArray: [],
      };
    }

    case actions.SELECT_FAQ_TYPE: {
      const { payload: { faqType } } = action;

      return {
        ...state,
        faqType,
      };
    }

    case actions.CHANGE_QUESTION_DESCRIPTION: {
      const {
        payload: {
          name,
          value,
        },
      } = action;

      return {
        ...state,
        [name]: value,
      };
    }

    case actions.SAVE_TOPIC_IDS: {
      const {
        payload: {
          value,
        },
      } = action;

      return {
        ...state,
        topicsArray: value,
      };
    }

    case actions.CHANGE_TOPIC_TITLE: {
      const {
        payload: {
          value,
        },
      } = action;

      return {
        ...state,
        topic: value,
      };
    }

    case actions.SELECT_COURSE: {
      const {
        payload: {
          value,
        },
      } = action;

      return {
        ...state,
        currentCourseId: value,
      };
    }

    default:
      return state;
  }
}
