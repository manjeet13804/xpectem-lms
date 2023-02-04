import React, { Component } from 'react';
import { Collapse, Icon } from 'antd';
import { bemlds } from 'utils';
import LayoutContent from 'components/utility/layoutContent';
import Modal from 'components/feedback/modal';
import {
  QADeleteCard,
  DefaultButton,
  TrashIcon,
  TextFormat,
} from 'components';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';

import CollapseQAWrapper from './collapseQA.style';
import CollapseQuestionsWrapper from './collapseQuestions.style';

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

const icon = bemlds('icon');
const item = bemlds('item');
const btn = bemlds('button');

const { Panel } = Collapse;

const Collapses = props => (
  <CollapseQAWrapper>
    <Collapse {...props}>{props.children}</Collapse>
  </CollapseQAWrapper>
);

const CollapseQuestions = props => (
  <CollapseQuestionsWrapper>
    <Collapse {...props}>{props.children}</Collapse>
  </CollapseQuestionsWrapper>
);

const getIconAndText = (topicId, title, handleOpenTopicModal, handleSetCurrentQuestionId) => {
  const handleDeleteTopic = (e) => {
    e.stopPropagation();
    handleSetCurrentQuestionId(topicId);
    handleOpenTopicModal();
  };

  return (
    <div className={icon()}>
      <div className={icon('text')}>{title}</div>
      <div className={icon('container')}>
        <Icon
          className={icon('plus')}
          type="plus"
        />
        <Icon
          className={icon('minus')}
          type="minus"
        />
        {handleOpenTopicModal && (
        <button
          className={icon('delete_button')}
          onClick={(e) => {
            handleDeleteTopic(e);
          }}
        >
          <TrashIcon width={18} height={18} />
        </button>
        )}
      </div>
    </div>
  );
};

const getQuestionItem = ({
  title,
  func,
  modalFunc,
  setFunc,
}) => (
  <div className={item()}>
    <div className={item('title')}>
      <Editor
        editorState={getMessageFromEditor(title)}
        toolbarHidden
        editorClassName={item()}
      />
    </div>
    <div className={item('actions')}>
      <div
        className={item('actions-button', { edit: true })}
      >
        <DefaultButton
          textId="students.qaButtonEdit"
        />
      </div>
      <div
        onClick={func}
        className={item('actions-button', { save: true })}
      >
        <DefaultButton
          textId="students.qaButtonSave"
        />
      </div>
      <div
        onClick={(e) => {
          setFunc();
          modalFunc();
          e.stopPropagation();
        }}
        className={item('actions-button')}
      >
        <DefaultButton
          textId="students.qaButtonDelete"
          isDelete
        />
      </div>
    </div>
  </div>
);


class CollapseQA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      isShowDeleteTopicModal: false,
    };
  }

  openModal = () => {
    this.setState({
      isShowModal: true,
    });
  };

  openTopicModal = () => {
    this.setState({
      isShowDeleteTopicModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      isShowModal: false,
    });
    this.setState({
      isShowDeleteTopicModal: false,
    });
  }

  handleSaveDescription = (value, name, topicId, questionId) => {
    const { changeDescriptionQA } = this.props;
    changeDescriptionQA(topicId, questionId, value, name);
  };

  handleSaveQA = (question, answer, id) => {
    const { editQuestionsAndAnswers } = this.props;
    editQuestionsAndAnswers({ question, answer }, id);
  };

  handleSetCurrentQuestionId = (topicId, questionId) => {
    const { setCurrentQuestionId } = this.props;
    setCurrentQuestionId(topicId, questionId);
  };

  render() {
    const {
      isShowModal,
      isShowDeleteTopicModal,
    } = this.state;
    const {
      qa = [],
      currentQuestionId,
      currentTopicId,
      deleteQA,
      handleDelete,
      clickAdd,
      faqType,
    } = this.props;

    return (
      <LayoutContent>
        <Collapses>
          {qa && qa.map(({ id: idTopic, title, questions }) => (
            <Panel
              header={getIconAndText(idTopic, title, this.openTopicModal, this.handleSetCurrentQuestionId)}
              key={idTopic}
            >
              <CollapseQuestions>
                {questions && questions.map(({ id: idQuestion, question, answer }) => (
                  <Panel
                    header={
                          getQuestionItem({
                            title: question,
                            func: () => this.handleSaveQA(question, answer, idQuestion),
                            modalFunc: () => this.openModal(),
                            setFunc: () => this.handleSetCurrentQuestionId(idTopic, idQuestion),
                          })
                        }
                    key={idQuestion}
                  >
                    <TextFormat
                      saveDescription={(value, name) => this.handleSaveDescription(value, name, idTopic, idQuestion)}
                      name="question"
                      value={question}
                      isShow
                      isDisableLanguage
                    />
                    <TextFormat
                      saveDescription={(value, name) => this.handleSaveDescription(value, name, idTopic, idQuestion)}
                      name="answer"
                      value={answer}
                      isShow
                      isDisableLanguage
                    />
                  </Panel>
                ))}
              </CollapseQuestions>
            </Panel>
          ))}
        </Collapses>
        <CollapseQAWrapper>
          <div className={btn()}>
            <DefaultButton
              textId="students.addQAButton"
              onClick={clickAdd}
            />
          </div>
        </CollapseQAWrapper>
        <Modal
          visible={isShowModal || isShowDeleteTopicModal}
          onCancel={this.handleCloseModal}
          footer={null}
        >
          {isShowModal && (
          <QADeleteCard
            text="students.modalDeleteQuestion"
            closeModal={this.handleCloseModal}
            currentQuestionId={currentQuestionId}
            deleteQA={deleteQA}
            faqType={faqType}
          />
          )}
          {isShowDeleteTopicModal && (
          <QADeleteCard
            text="students.modalDeleteTopic"
            closeModal={this.handleCloseModal}
            currentQuestionId={currentTopicId}
            deleteQA={handleDelete}
            faqType={faqType}
          />
          )}
        </Modal>
      </LayoutContent>
    );
  }
}


export default CollapseQA;
