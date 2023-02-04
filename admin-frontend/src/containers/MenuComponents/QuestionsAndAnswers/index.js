import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qaActions from 'redux/questionsAndAnswers/actions';
import {
  getAdminQuestionsAndAnswers,
  getStudentQuestionsAndAnswers,
  getCoursesQuestionsAndAnswers,
  getCurrentQuestionId,
  getCurrentTopicId,
  getTopicsQA,
  getTopicsAdminQA,
  getStatusAddQA,
  getIsAddNewQuestions,
  getQuestionText,
  getAnswerText,
  getTopicsArray,
  getTopic,
  getFaqType,
  getCurrentCourseId,
} from 'selectors';
import { FAQ_TYPES } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import CollapseQA from 'containers/Uielements/CollapseQA';
import { bemlds } from 'utils';
import {
  DefaultButton,
} from 'components';
import QuestionsAnswersWrapper from './questionsAnswers.style';
import AddNewQuestion from './components/AddNewQuestion';
import FindCourses from '../Courses/FindCourses';


const b = bemlds('questions-answers');

class QuestionsAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const {
      getAdminQA,
      getStudentQA,
    } = this.props;

    getAdminQA();
    getStudentQA();
  }

  componentDidUpdate(prevProps) {
    const { currentCourseId, getCourseQA } = this.props;
    const { currentCourseId: prevCurrentCourseId } = prevProps;
    if (currentCourseId && currentCourseId !== prevCurrentCourseId) {
      getCourseQA(currentCourseId);
    }
  }

  handleSaveDescription = (value, name) => {
    const { changeDescription } = this.props;
    changeDescription(value, name);
  };

  handleChangeTopic = ({ target: { value } }) => {
    const { changeTopic } = this.props;
    changeTopic(value);
  };

  handleAddNewTopic = () => {
    const {
      changeTopic,
      addTopic,
      faqType,
      topic,
      currentCourseId,
    } = this.props;

    addTopic({
      title: topic,
      faqType,
      courseId: currentCourseId,
    });
    changeTopic('');
  };

  handleAddQuestion = () => {
    const { toggleAddNewQuestions } = this.props;
    toggleAddNewQuestions();
  };

  saveTopicsId = (value) => {
    const {
      saveTopicsIds,
    } = this.props;
    saveTopicsIds(value);
  };


  handleSaveNewQuestion = () => {
    const {
      addNewQA,
      question,
      answer,
      topicsArray,
      faqType,
      currentCourseId,
    } = this.props;

    const body = {
      topics: topicsArray,
      question,
      answer,
      faqType,
      courseId: currentCourseId,
    };

    addNewQA(body);
    this.handleAddQuestion();
  };

  selectView = () => {
    const {
      adminQuestionsAndAnswers,
      studentQuestionsAndAnswers,
      coursesQuestionsAndAnswers,
      changeDescriptionQA,
      changeDescriptionAdminQA,
      editQA,
      setCurrentQuestionId,
      selectCourse,
      currentQuestionId,
      currentTopicId,
      deleteQA,
      topicsQA,
      topicsAdminQA,
      topicsCoursesQA,
      deleteTopic,
      addQuestion,
      question,
      answer,
      topicsArray,
      topic,
      faqType,
      currentCourseId,
    } = this.props;

    if (addQuestion) {
      return (
        <AddNewQuestion
          topicsQA={topicsQA}
          topicsAdminQA={topicsAdminQA}
          topicsCoursesQA={topicsCoursesQA}
          question={question}
          answer={answer}
          topicsArray={topicsArray}
          topic={topic}
          handleAddQuestion={this.handleAddQuestion}
          saveTopicsId={this.saveTopicsId}
          handleChangeTopic={this.handleChangeTopic}
          handleAddNewTopic={this.handleAddNewTopic}
          handleSaveDescription={this.handleSaveDescription}
          handleSaveNewQuestion={this.handleSaveNewQuestion}
          faqType={faqType}
          currentCourseId={currentCourseId}
        />
      );
    }
    return (
      <section className={b()}>
        <div className={b('title')}>
          <IntlMessages id="students.qaTitle" />
          {currentCourseId && faqType === FAQ_TYPES.COURSE && (
          <DefaultButton
            textId="students.qaButtonSelectCourse"
            onClick={() => selectCourse(undefined)}
          />
          )}
        </div>
        <div className={b('block')}>
          {faqType === FAQ_TYPES.ADMIN && (
          <CollapseQA
            qa={adminQuestionsAndAnswers}
            changeDescriptionQA={changeDescriptionAdminQA}
            editQuestionsAndAnswers={editQA}
            setCurrentQuestionId={setCurrentQuestionId}
            currentQuestionId={currentQuestionId}
            currentTopicId={currentTopicId}
            deleteQA={deleteQA}
            handleDelete={deleteTopic}
            clickAdd={this.handleAddQuestion}
            faqType={faqType}
            withRoles
          />
          )}
          {faqType === FAQ_TYPES.STUDENT && (
          <CollapseQA
            qa={studentQuestionsAndAnswers}
            changeDescriptionQA={changeDescriptionQA}
            editQuestionsAndAnswers={editQA}
            setCurrentQuestionId={setCurrentQuestionId}
            currentQuestionId={currentQuestionId}
            currentTopicId={currentTopicId}
            deleteQA={deleteQA}
            handleDelete={deleteTopic}
            clickAdd={this.handleAddQuestion}
            faqType={faqType}
            withRoles
          />
          )}
          {faqType === FAQ_TYPES.COURSE && (
            <div>
              {!currentCourseId
              && <FindCourses withoutBanner handleCourseClick={id => selectCourse(id)} />}
              {currentCourseId && (
              <CollapseQA
                qa={coursesQuestionsAndAnswers}
                changeDescriptionQA={changeDescriptionQA}
                editQuestionsAndAnswers={editQA}
                setCurrentQuestionId={setCurrentQuestionId}
                currentQuestionId={currentQuestionId}
                currentTopicId={currentTopicId}
                currentCourseId={currentCourseId}
                deleteQA={(questionId, type) => deleteQA(questionId, type, currentCourseId)}
                handleDelete={(topicId, type) => deleteTopic(topicId, type, currentCourseId)}
                clickAdd={this.handleAddQuestion}
                withRoles
              />
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  render() {
    const {
      addQuestion,
      faqType,
      selectFaqType,
    } = this.props;

    return (
      <LayoutContent>
        <QuestionsAnswersWrapper>
          {!addQuestion && (
          <div className={b('access-wrapper')}>
            <div className={b('access')}>
              <div
                role="button"
                tabIndex="0"
                className={b('access-item', { select: faqType === FAQ_TYPES.STUDENT, student: true })}
                onClick={() => selectFaqType(FAQ_TYPES.STUDENT)}
              >
                <IntlMessages id="students.qaStudentsTabLabel" />
              </div>
              <div
                role="button"
                tabIndex="0"
                className={b('access-item', { select: faqType === FAQ_TYPES.ADMIN, admin: true })}
                onClick={() => selectFaqType(FAQ_TYPES.ADMIN)}
              >
                <IntlMessages id="students.qaAdminsTabLabel" />
              </div>
              <div
                role="button"
                tabIndex="0"
                className={b('access-item', { select: faqType === FAQ_TYPES.COURSE, course: true })}
                onClick={() => selectFaqType(FAQ_TYPES.COURSE)}
              >
                <IntlMessages id="students.qaCoursesTabLabel" />
              </div>
            </div>
          </div>
          )}
          {this.selectView()}
        </QuestionsAnswersWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = state => ({
  adminQuestionsAndAnswers: getAdminQuestionsAndAnswers(state),
  studentQuestionsAndAnswers: getStudentQuestionsAndAnswers(state),
  coursesQuestionsAndAnswers: getCoursesQuestionsAndAnswers(state),
  currentQuestionId: getCurrentQuestionId(state),
  currentTopicId: getCurrentTopicId(state),
  topicsQA: getTopicsQA(state).map(el => ({ id: el.id, title: el.title })),
  topicsAdminQA: getTopicsAdminQA(state).map(el => ({ id: el.id, title: el.title })),
  topicsCoursesQA: getCoursesQuestionsAndAnswers(state).map(el => ({ id: el.id, title: el.title })),
  isAddedNewQA: getStatusAddQA(state),
  addQuestion: getIsAddNewQuestions(state),
  question: getQuestionText(state),
  answer: getAnswerText(state),
  topicsArray: getTopicsArray(state),
  topic: getTopic(state),
  faqType: getFaqType(state),
  currentCourseId: getCurrentCourseId(state),
});

const propTypes = {
  adminQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.any),
  studentQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.any),
  coursesQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.any),
  changeDescriptionQA: PropTypes.func,
  setCurrentQuestionId: PropTypes.func,
  currentQuestionId: PropTypes.string,
  currentTopicId: PropTypes.string,
  deleteQA: PropTypes.func,
  topicsQA: PropTypes.arrayOf(PropTypes.any),
  getAdminQA: PropTypes.func,
  getStudentQA: PropTypes.func,
  changeDescriptionAdminQA: PropTypes.func,
  editQA: PropTypes.func,
  topicsAdminQA: PropTypes.arrayOf(PropTypes.any),
  addTopic: PropTypes.func,
  selectCourse: PropTypes.func,
  addNewQA: PropTypes.func,
  deleteTopic: PropTypes.func,
  addQuestion: PropTypes.func,
  question: PropTypes.string,
  answer: PropTypes.string,
  currentCourseId: PropTypes.number,
  topicsCoursesQA: PropTypes.arrayOf(PropTypes.any),
  topicsArray: PropTypes.arrayOf(PropTypes.any),
  topic: PropTypes.string,
  faqType: PropTypes.string,
  selectFaqType: PropTypes.func,
  saveTopicsIds: PropTypes.func,
  changeTopic: PropTypes.func,
  toggleAddNewQuestions: PropTypes.func,
  changeDescription: PropTypes.func,
  getCourseQA: PropTypes.func,
};

const defaultProps = {
  adminQuestionsAndAnswers: [],
  studentQuestionsAndAnswers: [],
  coursesQuestionsAndAnswers: [],
  changeDescriptionQA: () => null,
  setCurrentQuestionId: () => null,
  getAdminQA: () => null,
  getStudentQA: () => null,
  addTopic: () => null,
  changeDescriptionAdminQA: () => null,
  editQA: () => null,
  addNewQA: () => null,
  topicsAdminQA: [],
  currentQuestionId: 0,
  currentTopicId: 0,
  deleteQA: () => null,
  deleteTopic: () => null,
  selectCourse: () => null,
  topicsQA: [],
  addQuestion: () => null,
  question: '',
  answer: '',
  currentCourseId: undefined,
  topicsCoursesQA: [],
  topicsArray: [],
  topic: '',
  faqType: '',
  selectFaqType: () => null,
  saveTopicsIds: () => null,
  changeTopic: () => null,
  toggleAddNewQuestions: () => null,
  changeDescription: () => null,
  getCourseQA: () => null,
};

QuestionsAnswers.propTypes = propTypes;
QuestionsAnswers.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...qaActions,
  },
)(QuestionsAnswers);
