import React from 'react';
import {
  DefaultButton,
  TextFormat,
} from 'components';
import SubjectSelect from 'containers/Uielements/SubjectSelect';
import { PLACEHOLDER, FAQ_TYPES } from 'constants/constants';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';

const { qaSubject } = PLACEHOLDER;

const add = bemlds('add-question');

const AddNewQuestion = (props) => {
  const {
    topicsQA,
    topicsAdminQA,
    topicsCoursesQA,
    question,
    answer,
    topicsArray,
    topic,
    handleAddQuestion,
    saveTopicsId,
    handleChangeTopic,
    handleAddNewTopic,
    handleSaveDescription,
    handleSaveNewQuestion,
    faqType,
  } = props;

  const getCurrentTopics = (type) => {
    switch (type) {
      case FAQ_TYPES.ADMIN: {
        return topicsAdminQA;
      }
      case FAQ_TYPES.COURSE: {
        return topicsCoursesQA;
      }
      default:
        return topicsQA;
    }
  };

  const currentTopics = getCurrentTopics(faqType);
  const isDisabledSave = !question || !answer || !topicsArray.length;
  const isDisabledAdd = !(topic && topic.trim());

  return (
    <div>
      <section className={add()}>
        <div className={add('title')}>
          <IntlMessages id="students.addQATitle" />
        </div>
        <div className={add('select')}>
          <SubjectSelect
            topics={currentTopics}
            saveTopicsId={saveTopicsId}
          />
          <div className={add('input')}>
            <div className={add('input-title')}>
              <IntlMessages id="students.addInputTitle" />
            </div>
            <div className={add('input-text')}>
              <input
                className={add('input-text-add')}
                type="text"
                name="topic"
                placeholder={qaSubject}
                value={topic}
                onChange={handleChangeTopic}
              />
            </div>
            <div className={add('input-button')}>
              <DefaultButton
                textId="students.addSubjectButton"
                onClick={handleAddNewTopic}
                disabled={isDisabledAdd}
              />
            </div>
          </div>
        </div>
        <div className={add('question')}>
          <div className={add('question-title')}>
            <IntlMessages id="students.questionTitle" />
          </div>
          <TextFormat
            saveDescription={handleSaveDescription}
            name="question"
            value={question}
            isShow
            isDisableLanguage
          />
        </div>
        <div className={add('answer')}>
          <div className={add('answer-title')}>
            <IntlMessages id="students.answerTitle" />
          </div>
          <TextFormat
            saveDescription={handleSaveDescription}
            name="answer"
            value={answer}
            isShow
            isDisableLanguage
          />
        </div>
        <div className={add('button')}>
          <DefaultButton
            textId="students.qaButtonBack"
            onClick={handleAddQuestion}
          />
          <DefaultButton
            textId="students.qaButtonSave"
            onClick={handleSaveNewQuestion}
            disabled={isDisabledSave}
          />
        </div>
      </section>
    </div>
  );
};

const propTypes = {
  topicsQA: PropTypes.arrayOf(PropTypes.any),
  topicsAdminQA: PropTypes.arrayOf(PropTypes.any),
  question: PropTypes.string,
  answer: PropTypes.string,
  topicsCoursesQA: PropTypes.arrayOf(PropTypes.any),
  topicsArray: PropTypes.arrayOf(PropTypes.any),
  topic: PropTypes.string,
  faqType: PropTypes.string,
  handleAddQuestion: PropTypes.func,
  saveTopicsId: PropTypes.func,
  handleChangeTopic: PropTypes.func,
  handleAddNewTopic: PropTypes.func,
  handleSaveDescription: PropTypes.func,
  handleSaveNewQuestion: PropTypes.func,
};

const defaultProps = {
  topicsAdminQA: [],
  topicsQA: [],
  question: '',
  answer: '',
  topicsCoursesQA: [],
  topicsArray: [],
  topic: '',
  faqType: '',
  handleAddQuestion: () => null,
  saveTopicsId: () => null,
  handleChangeTopic: () => null,
  handleAddNewTopic: () => null,
  handleSaveDescription: () => null,
  handleSaveNewQuestion: () => null,
};

AddNewQuestion.propTypes = propTypes;
AddNewQuestion.defaultProps = defaultProps;

export default AddNewQuestion;
