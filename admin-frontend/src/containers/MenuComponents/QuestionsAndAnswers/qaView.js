import React, { useEffect } from 'react';
import { Collapse, Icon } from 'antd';
import { connect } from 'react-redux';
import qaActions from 'redux/questionsAndAnswers/actions';
import {
  IntlMessages,
} from 'components';
import { bemlds } from 'utils';
import {
  getAdminQuestionsAndAnswers,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw } from 'draft-js';
import PropTypes from 'prop-types';
import CollapseQAWrapper from './collapseStyles/collapseQA.style';
import CollapseQuestionsWrapper from './collapseStyles/collapseQuestions.style';
import QuestionsAnswersWrapper from './questionsAnswers.style';

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

const { Panel } = Collapse;

const icon = bemlds('icon');
const b = bemlds('questions-answers');
const qa = bemlds('qa-view');

const Collapses = (props) => {
  const { children } = props;
  return (
    <CollapseQAWrapper>
      <Collapse {...props}>{children}</Collapse>
    </CollapseQAWrapper>
  );
};

const CollapseQuestions = (props) => {
  const { children } = props;
  return (
    <CollapseQuestionsWrapper>
      <Collapse {...props}>{children}</Collapse>
    </CollapseQuestionsWrapper>
  );
};

const getIconAndText = (topicId, title) => (
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
    </div>
  </div>
);

const QuestionsAnswersView = (props) => {
  const { getAdminQA, adminQuestionsAndAnswers } = props;

  useEffect(() => {
    getAdminQA();
  }, []);

  return (
    <LayoutContent>
      <QuestionsAnswersWrapper>
        <div className={b('title')}>
          <IntlMessages id="students.qaTitle" />
        </div>
        <Collapses>
          {adminQuestionsAndAnswers
           && adminQuestionsAndAnswers.map(({ id: idTopic, title, questions }) => (
             <Panel
               header={getIconAndText(idTopic, title)}
               key={idTopic}
             >
               <CollapseQuestions>
                 {questions && questions.map(({ id: idQuestion, question, answer }) => (
                   <div className={qa('wrapper')} key={idQuestion}>
                     <Editor
                       editorState={getMessageFromEditor(question)}
                       editorClassName={qa('question')}
                       readOnly
                       toolbarHidden
                     />
                     <Editor
                       editorState={getMessageFromEditor(answer)}
                       readOnly
                       toolbarHidden
                     />
                   </div>
                 ))}
               </CollapseQuestions>
             </Panel>
           ))}
        </Collapses>
      </QuestionsAnswersWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = state => ({
  adminQuestionsAndAnswers: getAdminQuestionsAndAnswers(state),
});

const propTypes = {
  getAdminQA: PropTypes.func,
  adminQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.any),
};

const defaultProps = {
  getAdminQA: () => null,
  adminQuestionsAndAnswers: [],
};

QuestionsAnswersView.propTypes = propTypes;
QuestionsAnswersView.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...qaActions,
  },
)(QuestionsAnswersView);
