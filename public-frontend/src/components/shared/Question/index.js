// @flow
import React, { Node, useState, useEffect } from 'react';
import { bemlds, getSearchTextPart } from 'utils';
import './styles.scss';
import { convertFromRaw, EditorState } from 'draft-js';
import { COMMUNICATION_MESSAGE_HASH_PREFIX } from 'constants/constants';
import { Editor } from 'react-draft-wysiwyg';

const getMessageFromEditor = text => EditorState.createWithContent(convertFromRaw(JSON.parse(text)));

const b = bemlds('question');

const DefaultProps = {
  className: '',
  searchText: null,
};

type PropType = {
  className?: string,
  text: string,
  answer: string,
  searchText?: string
};

const Question = (props: PropType): Node => {
  const {
    className,
    text,
    answer: jsonAnswer,
    searchText,
    dialogId,
    messageId,
    currentCourseId,
    clickQuest,
    isQa,
  } = props;
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (jsonAnswer && isQa) {
      setAnswer(jsonAnswer);
    }
    if (jsonAnswer && !isQa) {
      const newState = EditorState.createWithContent(convertFromRaw(JSON.parse(jsonAnswer)));
      const simpleTextArray = newState.getCurrentContent().getBlocksAsArray();
      const test = simpleTextArray.map(textBlock => textBlock.getText()).join(' ');
      setAnswer(test);
    }
  }, [jsonAnswer]);

  const onClick = () => {
    const el = document.getElementById(`${COMMUNICATION_MESSAGE_HASH_PREFIX}${messageId}`);

    if (el) {
      goToCommunicationMessage();
      return;
    }

    clickQuest(currentCourseId, dialogId, goToCommunicationMessage);
  };

  const goToCommunicationMessage = () => {
    const el = document.getElementById(`${COMMUNICATION_MESSAGE_HASH_PREFIX}${messageId}`);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const createExample = (): Node => {
    if (!searchText) return null;
    const [start, selectedText, end] = getSearchTextPart(answer, searchText);
    return (
      <span
        className={b('example-text')}
        onClick={onClick}
        role="button"
        tabIndex="0"
      >
        ...
        {start}
        <span className={b('yellow-background')}>{selectedText}</span>
        {end}
        ...
      </span>
    );
  };

  if (searchText) {
    getSearchTextPart(answer, searchText);
  }

  return (
    <div className={b({mix: className})}>
      <div className={b('wrapper')}>
        <span
          className={b('text')}
          onClick={onClick}
          role="button"
          tabIndex="0"
        >
          <Editor
            editorState={getMessageFromEditor(text)}
            toolbarHidden
            editorClassName={b('editor')}
          />
        </span>
        <div
          className={b('answer-open')}
        >
          <Editor
            editorState={getMessageFromEditor(jsonAnswer)}
            toolbarHidden
            editorClassName={b('editor')}
          />
        </div>
      </div>
      {searchText && createExample()}
    </div>
  );
};

Question.defaultProps = DefaultProps;

export default Question;
