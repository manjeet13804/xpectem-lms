import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getCurrentNavTitleFp,
  getCurrentDetailCourseIdFp,
  getQuestionsAndAnswersFp,
  getCurrentQuestionIdFp,
  getCurrentTopicIdFp,
  getTopicsQAFp,
  getStatusAddNewQA,
} from 'selectors';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import CollapseQA from 'containers/Uielements/CollapseQA';
import URLS from 'redux/urls';
import { bemlds } from 'utils';
import { FAQ_TYPES } from 'constants/constants';
import QuestionsAnswersWrapper from './questionsAnswers.style';
import AddNewQuestion from '../../../QuestionsAndAnswers/components/AddNewQuestion';

const b = bemlds('questions-answers');

class QuestionsAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addQuestion: false,
      searchTopicInput: '',
      question: '',
      answer: '',
      topicsArray: [],
      topic: '',
    };
  }

  handleSaveDescription = (value, name) => {
    this.setState({ [name]: value });
  };

  onChangeTopic = ({ target: { value } }) => {
    this.setState({ topic: value });
  };

  handleAddNewTopic = () => {
    const { topic } = this.state;
    const { addTopic, idCourse } = this.props;

    addTopic({
      title: topic,
      courseId: idCourse,
      faqType: FAQ_TYPES.COURSE,
    });
    this.setState({ topic: '' });
  };

  handleAddQuestion = () => {
    const { addQuestion } = this.state;
    this.setState({ addQuestion: !addQuestion });
  };

  saveTopicsId = (value) => {
    this.setState({ topicsArray: value });
  };

  handleSaveNewQuestion = () => {
    const {
      question,
      answer,
      topicsArray,
    } = this.state;

    const {
      idCourse,
      addNewQA,
      idStudent,
    } = this.props;

    const body = {
      courseId: Number(idCourse),
      topics: topicsArray,
      question,
      answer,
      studentId: Number(idStudent),
      faqType: FAQ_TYPES.COURSE,
    };

    addNewQA(body);
    this.handleAddQuestion();
  };

  componentWillMount() {
    const {
      getQA,
      idStudent,
      idCourse,
      currentDetailCourseId,
      history,
    } = this.props;

    if (!currentDetailCourseId) {
      history.push(`${URLS.communicationChoose}`);
    } else {
      getQA(idStudent, idCourse);
    }
  }

  render() {
    const {
      addQuestion,
      question,
      answer,
      topic,
      topicsArray,
    } = this.state;

    const {
      questionsAndAnswers,
      changeDescriptionQA,
      editQuestionsAndAnswers,
      setCurrentQuestionId,
      currentQuestionId,
      currentTopicId,
      deleteQA,
    } = this.props;

    const topicsQA = questionsAndAnswers.map(({ id, title }) => ({ id, title }));

    return (
      <LayoutContent>
        <QuestionsAnswersWrapper>
          {!addQuestion ? (
            <section className={b()}>
              <div className={b('title')}>
                <IntlMessages id="students.qaTitle" />
              </div>
              <div className={b('block')}>
                <CollapseQA
                  qa={questionsAndAnswers}
                  changeDescriptionQA={changeDescriptionQA}
                  editQuestionsAndAnswers={editQuestionsAndAnswers}
                  setCurrentQuestionId={setCurrentQuestionId}
                  currentQuestionId={currentQuestionId}
                  currentTopicId={currentTopicId}
                  deleteQA={deleteQA}
                  clickAdd={this.handleAddQuestion}
                />
              </div>
            </section>
          )
            : (
              <AddNewQuestion
                topicsQA={topicsQA}
                question={question}
                answer={answer}
                topicsArray={topicsArray}
                topic={topic}
                handleAddQuestion={this.handleAddQuestion}
                saveTopicsId={this.saveTopicsId}
                handleChangeTopic={this.onChangeTopic}
                handleAddNewTopic={this.handleAddNewTopic}
                handleSaveDescription={this.handleSaveDescription}
                handleSaveNewQuestion={this.handleSaveNewQuestion}
              />
            )}
        </QuestionsAnswersWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isCurrentNav = getCurrentNavTitleFp(state);
  const currentDetailCourseId = getCurrentDetailCourseIdFp(state);
  const questionsAndAnswers = getQuestionsAndAnswersFp(state);
  const currentQuestionId = getCurrentQuestionIdFp(state);
  const currentTopicId = getCurrentTopicIdFp(state);
  const topicsQA = getTopicsQAFp(state);
  const isAddedNewQA = getStatusAddNewQA(state);

  return {
    isCurrentNav,
    currentDetailCourseId,
    questionsAndAnswers,
    currentQuestionId,
    currentTopicId,
    topicsQA,
    isAddedNewQA,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(QuestionsAnswers);
