import React, { Component } from 'react';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';

import DragAndDropImagesWrapper from './DragAndDropImagesWrapper.style';

const title = bemlds('title');
const b = bemlds('drag-and-drop');

class DragAndDropImages extends Component {
  constructor(props) {
    super(props);
    this.dropRef = React.createRef();
    this.state = {
      dragging: false,
      file: null,
      path: null,
      error: false,
    };
  }

  componentDidMount() {
    const { error } = this.props;
    this.setState({ error });
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

  setFilePath = (elem) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({ path: e.target.result });
    };
    reader.readAsDataURL(elem);
  };

  static getDerivedStateFromProps(props, state) {
    const { img, error } = props;
    const {
      file,
      path,
      error: currentError,
    } = state;

    if (typeof img === 'string') {
      return {
        file: img,
        path: img,
        dragging: true,
      };
    }

    return {
      file: img && img !== file ? img : file,
      path: img && file ? path : null,
      error: error !== currentError ? error : currentError,
    };
  }

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    const { dataTransfer: { items } } = e;
    e.preventDefault();
    e.stopPropagation();
    if (items && items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: true });
  };

  handleDrop = (e) => {
    const { dataTransfer, dataTransfer: { files } } = e;
    e.preventDefault();
    e.stopPropagation();
    const {
      handleDrop,
      setFieldValue,
      name,
    } = this.props;
    this.setState({ dragging: true });

    if (files && files.length > 0) {
      const file = files[0];
      this.setFilePath(file);
      this.setState({ file });
      handleDrop(
        file,
        setFieldValue,
        name,
      );
      dataTransfer.clearData();
    }
  };

  handleAddFile = (e) => {
    const { target: { files } } = e;
    const {
      handleAddFile,
      setFieldValue,
      name,
    } = this.props;
    const file = files[0];
    if (file) {
      this.setState({ file, dragging: true });
      this.setFilePath(file);
      handleAddFile(
        file,
        setFieldValue,
        name,
      );
    }
  };


  render() {
    const {
      file,
      path,
      error,
      dragging,
    } = this.state;
    return (
      <DragAndDropImagesWrapper>
        <div className={title()}>
          <div className={title('number')}>
            <IntlMessages id="dragAndDrop.maxFiles" />
          </div>
          <div className={title('size')}>
            <IntlMessages id="dragAndDrop.maxSize" />
          </div>
          <div className={title('format')}>
            <IntlMessages id="crop.formatImage" />
          </div>
          {file && file.name && (
            <div className={title('format')}>
              {<IntlMessages id="dragAndDrop.attached" />}
              {file.name}
            </div>
          )}
        </div>
        <div
          className={b({
            file: path && !error,
            error,
            dashed: dragging && !error,
          })}
          ref={this.dropRef}
        >
          {path && !error && (
          <img
            src={path}
            alt="downloadImg"
            className={b('img')}
          />
          )}
          <div className={b('main', { file: path && !error })}>
            <div className={b('text')}>
              <IntlMessages id="dragAndDrop.dragText" />
            </div>
            <div className={b('or', { file: path && !error })}>
              <IntlMessages id="dragAndDrop.dragOrText" />
            </div>
            <div className={b('select', { file: path && !error })}>
              <label htmlFor="files" className={b('btn')}>
                <IntlMessages id="dragAndDrop.selectBtn" />
              </label>
              <input
                id="files"
                type="file"
                className={b('input')}
                onChange={this.handleAddFile}
              />
            </div>
          </div>
        </div>
      </DragAndDropImagesWrapper>
    );
  }
}

DragAndDropImages.defaultProps = {
  handleAddFile: null,
  setFieldValue: null,
  handleDrop: null,
  error: false,
  name: null,
};

DragAndDropImages.propTypes = {
  handleAddFile: PropTypes.func,
  setFieldValue: PropTypes.func,
  handleDrop: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.any,
};

export default DragAndDropImages;
