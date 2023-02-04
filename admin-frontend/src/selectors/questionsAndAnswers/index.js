import { createSelector } from 'reselect';
import fp from 'lodash/fp';

const getQuestionsAndAnswersSelector = ({ questionsAndAnswers }) => questionsAndAnswers;

const getStatusAddQA = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('addNewQA'),
);

const getTopicsQA = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('studentQuestionsAndAnswers'),
);

const getTopicsAdminQA = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('adminQuestionsAndAnswers'),
);

const getCurrentTopicId = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('currentTopicId'),
);

const getCurrentQuestionId = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('currentQuestionId'),
);

const getStudentQuestionsAndAnswers = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('studentQuestionsAndAnswers'),
);

const getAdminQuestionsAndAnswers = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('adminQuestionsAndAnswers'),
);

const getCoursesQuestionsAndAnswers = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('coursesQuestionsAndAnswers'),
);

const getIsAddNewQuestions = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('isAddQuestion'),
);

const getIsAdmin = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('isAdmin'),
);

const getQuestionText = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('question'),
);

const getAnswerText = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('answer'),
);

const getTopicsArray = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('topicsArray'),
);

const getTopic = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('topic'),
);

const getFaqType = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('faqType'),
);

const getCurrentCourseId = createSelector(
  getQuestionsAndAnswersSelector,
  fp.get('currentCourseId'),
);


export {
  getStatusAddQA,
  getTopicsQA,
  getTopicsAdminQA,
  getCurrentTopicId,
  getCurrentQuestionId,
  getStudentQuestionsAndAnswers,
  getCoursesQuestionsAndAnswers,
  getAdminQuestionsAndAnswers,
  getIsAddNewQuestions,
  getIsAdmin,
  getQuestionText,
  getAnswerText,
  getTopicsArray,
  getTopic,
  getFaqType,
  getCurrentCourseId,
};
