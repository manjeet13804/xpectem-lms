import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { getAddedStatusFp } from 'selectors';
import lmsGroupsActions from 'redux/lmsGroups/actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import TextFormatWrapper from './textFormat.style';
import HeaderSelector from './headerSelector';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const area = bemlds('textarea');

const defaultProps = {
  placeholder: '',
  disabled: false,
  value: '',
  handleChange: () => null,
  name: '',
  title: '',
  formik: false,
  isValid: true,
  isMessage: false,
  isReply: false,
  isReinitialize: false,
};

const propTypes = {
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  title: PropTypes.string,
  name: PropTypes.string,
  formik: PropTypes.bool,
  isValid: PropTypes.bool,
  isMessage: PropTypes.bool,
  isReply: PropTypes.bool,
  isReinitialize: PropTypes.bool,
};

const SimpleTextFormat = ({
  handleChange,
  value,
  placeholder,
  disabled,
  name,
  title,
  formik,
  isValid,
  isMessage,
  isReply,
  isReinitialize,
}) => {
  const [textValue, changeTextValue] = useState('');
  const [isRendered, setIsRendered] = useState(false);

  const parseJsonEditorState = () => {
    const emptyJsonData = JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent()));
    if (value) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
    }

    return EditorState.createWithContent(convertFromRaw(JSON.parse(emptyJsonData)));
  };

  useEffect(() => {
    if (value && !isRendered) {
      const text = parseJsonEditorState();
      changeTextValue(text);
      setIsRendered(true);
      return;
    }
    const text = parseJsonEditorState();
    if (!value && isReinitialize && (textValue !== text)) {
      changeTextValue(text);
    }
  }, [value]);

  const onChange = (newState) => {
    changeTextValue(newState);
    const simpleTextArray = newState.getCurrentContent().getBlocksAsArray();
    const text = simpleTextArray.map(textBlock => textBlock.getText()).join(' ');
    const jsonData = JSON.stringify(convertToRaw(newState.getCurrentContent()));
    handleChange(name, jsonData, text);
    if (!isRendered) {
      setIsRendered(true);
    }
  };

  return (
    <TextFormatWrapper>
      <section className={area({ 'is-message': isMessage, 'is-reply': isReply })}>
        {title && (
        <div className={area('header', { 'is-message': isMessage })}>
          <IntlMessages id={title} />
        </div>
        )}
        <Editor
          onEditorStateChange={onChange}
          placeholder={placeholder}
          editorState={textValue}
          readOnly={disabled}
          stripPastedStyles={true}
          editorClassName={area('editor', { error: formik && !isValid, 'is-message': isMessage, 'is-reply': isReply })}
          toolbar={{
            options: ['inline', 'textAlign', 'list', 'blockType'],
            inline: {
              options: ['bold', 'italic'],
            },
            list: {
              options: ['unordered', 'ordered'],
            },
            textAlign: {
              options: ['left', 'center', 'right'],
            },
            blockType: {
              options: ['Normal', 'H1', 'H2'],
              component: HeaderSelector,
            },
          }}
        />
      </section>
    </TextFormatWrapper>
  );
};

const mapStateToProps = (state) => {
  const isAddedLmsGroup = getAddedStatusFp(state);

  return { isAddedLmsGroup };
};

SimpleTextFormat.propTypes = propTypes;
SimpleTextFormat.defaultProps = defaultProps;
export default connect(mapStateToProps, { ...lmsGroupsActions })(SimpleTextFormat);
