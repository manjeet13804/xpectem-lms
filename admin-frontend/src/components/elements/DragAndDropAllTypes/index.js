import React, { Component } from 'react';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import _ from 'lodash';
import { HBS_FILE_TYPE } from 'constants/constants';
import { PropTypes } from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import DragAndDropWrapper from './DragAndDropAllTypes.style';

const defaultProps = {
  handleAddFile: null,
  fileTypes: [],
  numberUpload: null,
  isClosePreview: false,
  disabled: false,
  isCourseCreating: false,
  uploadedFileURL: false,
};

const propTypes = {
  handleAddFile: PropTypes.func,
  fileTypes: PropTypes.arrayOf(PropTypes.string),
  numberUpload: PropTypes.string,
  isClosePreview: PropTypes.bool,
  disabled: PropTypes.bool,
  isCourseCreating: PropTypes.bool,
  uploadedFileURL: PropTypes.bool,
};

const title = bemlds('title');
const b = bemlds('drag-and-drop');
const btn = bemlds('button');

const maxFileSize = 5242880;

class DragAndDropAllTypes extends Component {
  constructor(props) {
    super(props);
    const { files } = this.props;
    this.dragCounter = 0;
    this.dropRef = React.createRef();
    this.addRef = React.createRef();
    this.state = {
      file: files || null,
      previewString: files ? this.readHbsFile([files]) : '',
      isShow: false,
    };
  }

  componentDidMount() {
    const div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    const div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter += 1;
    if ((e.dataTransfer.items || []).length) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter -= 1;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    const { dataTransfer: { files } } = e;
    if (files && files.length) {
      this.handleAddFile({ target: { files } });
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  readerOnload = ({ result }) => {
    this.setState({ previewString: result });
  }

  readHbsFile = (files) => {
    const reader = new FileReader();
    reader.onload = () => this.readerOnload(reader);
    reader.readAsText(files[0]);
  }

  handleAddFile = ({ target: { files } }) => {
    const { handleAddFile, isCourseCreating, disabled } = this.props;
    if (disabled) {
      return;
    }
    if (files && files.length) {
      const file = files[0];
      if (isCourseCreating) {
        const verified = this.courseCreatingVerify(file.name);
        if (verified && file.size < maxFileSize) {
          this.readHbsFile(files);
          this.setState({ file });
          handleAddFile(file);
          this.setState({ isShow: false });
        } else this.setState({ isShow: true });
        return;
      }
      this.setState({ file });
      handleAddFile(file);
    }
  };

  courseCreatingVerify = (name) => {
    const fileExternal = _.last(name.split('.'));

    return fileExternal === HBS_FILE_TYPE;
  }

  verifyFile = ({ type }) => {
    const { fileTypes } = this.props;
    const typeShort = type.split('/')[1];
    return fileTypes.includes(typeShort);
  };

  getFileName = (file, uploadedFileURL) => {
    const fileName = (file && file.name) ? (file.name) : (uploadedFileURL);
    return fileName;
  }

  handleDeleteFile = () => {
    const { handleAddFile } = this.props;
    handleAddFile(null);
    this.setState({ file: null });
  }

  transformHTMLParser = (node) => {
    if (node.type === 'tag' && node.name === 'head') {
      return null;
    }
  }

  render() {
    const { file, previewString, isShow } = this.state;
    const {
      fileTypes,
      numberUpload,
      isClosePreview,
      disabled,
      uploadedFileURL,
    } = this.props;
    const acceptedFileTypesToDisplay = fileTypes.join(', ');
    const fileTypesForInput = fileTypes.map(item => `.${item}`).join(',');

    const options = {
      decodeEntities: true,
      transform: this.transformHTMLParser,
    };

    return (
      <DragAndDropWrapper>
        <div className={title()}>
          <div className={title('number')}>
            <IntlMessages id="dragAndDrop.maxFiles" />
          </div>
          <div className={title('size')}>
            <IntlMessages id="dragAndDrop.maxSize" />
          </div>
          <div className={title('format')}>
            <IntlMessages id="dragAndDrop.format" />
            {acceptedFileTypesToDisplay}
          </div>
          {(uploadedFileURL || (file && file.name)) && (
            <div className={title('format')}>
              <IntlMessages id="dragAndDrop.attached" />
              <a href={uploadedFileURL} target="_blank" rel="noopener noreferrer">
                {this.getFileName(file, uploadedFileURL)}
              </a>
            </div>
          )}
        </div>
        <div
          className={b({ 'is-close-preview': isClosePreview })}
          ref={this.dropRef}
        >
          <div className={b('main', { 'is-close-preview': isClosePreview })}>
            <div className={b('main-text')}>
              <IntlMessages id="dragAndDrop.dragText" />
            </div>
            <div className={b('main-or', { 'is-close-preview': isClosePreview })}>
              <IntlMessages id="dragAndDrop.dragOrText" />
            </div>
            <div className={b('main-select', { 'is-close-preview': isClosePreview })}>
              <label
                htmlFor={`files${numberUpload}`}
                className={b('main-btn')}
              >
                <IntlMessages id="dragAndDrop.selectBtn" />
              </label>
              <input
                id={`files${numberUpload}`}
                ref={this.addRef}
                type="file"
                className={b('main-input')}
                onChange={this.handleAddFile}
                accept={fileTypesForInput}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        {!isShow
          ? file && (
          <div className="hbs-preview">
            {ReactHtmlParser(previewString, options)}
          </div>
          )
          : <div className="error"><IntlMessages id="dragAndDrop.maxSize" /></div>
        }
        <section className={btn()}>
          <button className={btn('delete')} onClick={this.handleDeleteFile}>
            <IntlMessages id="organisations.deleteBtn" />
          </button>
        </section>
      </DragAndDropWrapper>
    );
  }
}

DragAndDropAllTypes.propTypes = propTypes;
DragAndDropAllTypes.defaultProps = defaultProps;

export default DragAndDropAllTypes;
