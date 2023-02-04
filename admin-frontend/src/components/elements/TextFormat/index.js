import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { getAddedStatusFp } from 'selectors';
import _ from 'lodash';
import lmsGroupsActions from 'redux/lmsGroups/actions';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import TextFormatWrapper from './textFormat.style';
import HeaderSelector from './headerSelector';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const area = bemlds('textarea');
const btn = bemlds('button');

const defaultProps = {
  saveDescription: () => null,
  name: '',
  translations: [],
  placeholder: '',
  disabled: false,
  link: '',
  setRadio: () => null,
  isShow: true,
  isDisableLanguage: false,
  withDeleteFunction: false,
  maxLength: 0,
};

const propTypes = {
  saveDescription: PropTypes.func,
  name: PropTypes.string,
  translations: PropTypes.arrayOf(PropTypes.shape({})),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  link: PropTypes.string,
  setRadio: PropTypes.func,
  isShow: PropTypes.bool,
  isDisableLanguage: PropTypes.bool,
  withDeleteFunction: PropTypes.bool,
  maxLength: PropTypes.number,
};

const TextFormat = (props) => {
  const {
    saveDescription,
    name: descriptionName,
    translations,
    placeholder,
    disabled,
    link,
    setRadio,
    isShow,
    isDisableLanguage,
    withDeleteFunction,
    maxLength,
    languageProvider,
    value,
  } = props;

  const [state, setState] = useState(
    {
      textarea: value ? EditorState.createWithContent(convertFromRaw(JSON.parse(value))) : null,
      langSelect: 'English',
    },
  );
  const { langSelect, textarea } = state;

  useEffect(() => {
    if (languageProvider && languageProvider !== langSelect) {
      setState({
        ...state,
        langSelect: languageProvider,
      });
    }
  }, [languageProvider]);

  const getLanguageId = (lang) => {
    switch (lang) {
      case 'English':
        return 0;
      case 'Svenska':
        return 1;
      case 'Norsk':
        return 2;
      default:
        return null;
    }
  };

  const getText = () => {
    const langId = getLanguageId(langSelect) + 1;
    const translation = props.translations.length ? props.translations.find(item => item.language === langId) : {};
    const text = _.get(translation, `${descriptionName}`, null);

    return text;
  };

  useEffect(() => {
    if (!value) {
      const langId = getLanguageId(langSelect) + 1;
      const translation = props.translations.length ? props.translations.find(item => item.language === langId) : {};
      const text = _.get(translation, `${descriptionName}`, null);
      const emptyJsonData = JSON.stringify(
        convertToRaw(EditorState.createEmpty().getCurrentContent()),
      );
      const valueEditor = text || emptyJsonData;
      const newValue = EditorState.createWithContent(convertFromRaw(JSON.parse(valueEditor)));
      setState({
        ...state,
        textarea: newValue,
      });
    }
  }, [langSelect]);

  const parseJsonEditorState = () => {
    const emptyJsonData = JSON.stringify(
      convertToRaw(EditorState.createEmpty().getCurrentContent()),
    );
    const text = getText();
    const valueEditor = text || emptyJsonData;
    return EditorState.createWithContent(convertFromRaw(JSON.parse(valueEditor)));
  };

  const hardReset = () => {
    setState({
      textarea: EditorState.createEmpty(),
      langSelect: 'English',
    });
  };

  useEffect(() => {
    if (link) {
      link[descriptionName] = {
        hardReset,
      };
    }
  }, [link]);

  useEffect(() => {
    if (!value) {
      const text = parseJsonEditorState(langSelect);
      const newState = {
        langSelect,
        textarea: text,
      };
      const isHaveText = translations.some(item => item[descriptionName]);
      if (isHaveText) {
        setRadio({ target: { value: 'text' } }, descriptionName);
      }
      setState(newState);
    }
  }, [translations]);

  const handleClear = () => {
    saveDescription('', descriptionName, getLanguageId(langSelect));
    setState({
      ...state,
      textarea: '',
    });
  };

  const handleBeforeInput = (input, newState) => {
    const simpleTextArray = newState.getCurrentContent().getBlocksAsArray();
    const text = simpleTextArray.map(textBlock => textBlock.getText()).join(' ');
    if (maxLength && text.length >= maxLength) {
      return 'handled';
    }
  };

  const onChange = (newState) => {
    const simpleTextArray = newState.getCurrentContent().getBlocksAsArray();
    const text = simpleTextArray.map(textBlock => textBlock.getText()).join(' ');
    if (maxLength && text.length > maxLength) {
      return;
    }
    setState({
      ...state,
      textarea: newState,
    });
    const jsonData = JSON.stringify(convertToRaw(newState.getCurrentContent()));
    saveDescription(jsonData, descriptionName, getLanguageId(langSelect));
  };

  const handleLangChange = (value) => {
    setState({
      ...state,
      langSelect: value,
    });
  };

  return isShow ? (
    <TextFormatWrapper>
      <section className={area()}>
        <Editor
          onEditorStateChange={onChange}
          placeholder={placeholder}
          editorState={textarea}
          readOnly={disabled}
          editorClassName={area('text-wrapper')}
          handleBeforeInput={handleBeforeInput}
          stripPastedStyles={true}
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
              component: props => (
                <HeaderSelector
                  {...props}
                  handleChangeLang={handleLangChange}
                  isDisableLanguage={isDisableLanguage}
                />
              ),
            },
          }}
        />
      </section>
      <section className={btn()}>
        {withDeleteFunction && (
        <button className={btn('delete')} onClick={handleClear}>
          <IntlMessages id="organisations.deleteBtn" />
        </button>
        )}
      </section>
    </TextFormatWrapper>
  ) : null;
};

const mapStateToProps = (state) => {
  const isAddedLmsGroup = getAddedStatusFp(state);

  return { isAddedLmsGroup };
};

TextFormat.propTypes = propTypes;
TextFormat.defaultProps = defaultProps;
export default connect(mapStateToProps, { ...lmsGroupsActions })(TextFormat);
