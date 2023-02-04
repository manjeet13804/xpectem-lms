import React, { Component } from 'react';
import Papa from 'papaparse';
import IntlMessages from 'components/utility/intlMessages';
import { PropTypes } from 'prop-types';
import { bemlds } from 'utils';
import DragAndDropWrapper from './DragAndDrop.style';

const title = bemlds('title');
const b = bemlds('drag-and-drop');

const defaultProps = {
  handleDelete: () => null,
};

const propTypes = {
  handleDelete: PropTypes.func,
};

class DragAndDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      dataParse: [],
      file: null,
    };
  }

  dropRef = React.createRef();

  inputRef = React.createRef();

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    this.setState({ dragging: false });
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];

      this.setState({ file });

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        const csvData = event.target.result;
        this.props.handleDrop(
          file,
          Papa.parse(csvData, {
            delimitersToGuess: [';', ':', ','],
            header: false,
            skipEmptyLines: true,
          }),
        );
      };
      e.dataTransfer.clearData();
      this.dragCounter = 0;
    }
  };

  handleAddFile = (e) => {
    if (e.target.files) {
      const file = e.target.files[0];

      this.setState({ file });

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        const csvData = event.target.result;
        this.props.handleAddFile(
          file,
          Papa.parse(csvData, {
            delimitersToGuess: [';', ':', ','],
            header: false,
            skipEmptyLines: true,
          }),
        );
      };
    }
  };

  handleDeleteFile = () => {
    const { handleDelete } = this.props;
    this.setState({ file: null });
    handleDelete();
    this.inputRef.current.value = null;
  }

  componentDidMount() {
    const div = this.dropRef.current;
    this.dragCounter = 0;
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

  render() {
    const { file } = this.state;
    const { fileFormats } = this.props;
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
            {' '}
            {fileFormats}
          </div>
          {file && file.name && (
            <div className={title('format')}>
              <IntlMessages id="dragAndDrop.attached" />
              <span className={title('file-name')}>{file.name}</span>
            </div>
          )}
          {
            file && (
              <div className={title('format')}>
                <button
                  className={b('main-select')}
                  type="button"
                  onClick={this.handleDeleteFile}
                >
                  <IntlMessages id="students.deleteFileImport" />
                </button>
              </div>
            )
          }
        </div>
        <div
          className={b()}
          ref={this.dropRef}
        >
          <div className={b('main')}>
            <div className={b('main-text')}>
              <IntlMessages id="dragAndDrop.dragText" />
            </div>
            <div className={b('main-or')}>
              <IntlMessages id="dragAndDrop.dragOrText" />
            </div>
            <div className={b('main-select')}>
              <label htmlFor="files" className={b('main-btn')}>
                <IntlMessages id="dragAndDrop.selectBtn" />
              </label>
              <input
                id="files"
                type="file"
                className={b('main-input')}
                onChange={this.handleAddFile}
                accept={fileFormats}
                ref={this.inputRef}
              />
            </div>
          </div>
        </div>
      </DragAndDropWrapper>
    );
  }
}

DragAndDrop.propTypes = propTypes;
DragAndDrop.defaultProps = defaultProps;

export default DragAndDrop;
