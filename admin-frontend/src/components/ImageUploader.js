import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageUploaderWrapper from './ImageUploader.style';

class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.src,
      dragOver: false,
      error: null,
      isUploading: false,
    };
  }

  componentDidMount() {
    const { setInputRef } = this.props;

    if (setInputRef) {
      setInputRef(this.fileInput);
    }
  }

  componentDidUpdate(prevProps) {
    const { src } = this.props;

    if (prevProps.src !== src) {
      this.updateState({ src });
    }
  }

  onUpload = async (file) => {
    const {
      onChange,
      changeUploadStatus,
    } = this.props;

    const formData = new FormData();

    if (changeUploadStatus) await changeUploadStatus(true);

    formData.append('file', file, file.name);

    await onChange(formData);
  };

  setError(message) {
    this.setState(prevState => ({ ...prevState, error: message }));
  }

  // eslint-disable-next-line
  aspectRatioCheck = (val, file) => new Promise((resolve) => {
    if (!val.length) {
      return resolve(true);
    }

    const valueParts = val.split(':').map(item => parseInt(item, 10));
    const aspectRatio = Math.round((valueParts[0] / valueParts[1]) * 10) / 10;
    const img = new Image();

    img.onload = () => {
      const valid = Math.round((img.width / img.height) * 10) / 10 === aspectRatio;

      if (!valid) {
        this.setError(`Aspect ratio should be ${val}.`);
      }

      resolve(valid);
    };

    img.onerror = () => {
      this.setError('It isn\'t image');
    };

    img.src = file;
  });

  sizeCheck = (maxSize, file, sizeErrorMessage) => {
    const valid = file.size <= maxSize;

    if (!valid) {
      this.setError(sizeErrorMessage || `Maximum file size ${maxSize}`);
    }

    return valid;
  };

  onFileChange = (newFile) => {
    this.setError(null);

    const { aspectRatioValidation, sizeValidation, sizeErrorMessage, isFileLink } = this.props;

    if (isFileLink) {
      const { onChange } = this.props;
      onChange(newFile);
    }

    const file = newFile;
    const reader = new FileReader();

    reader.onload = async () => {
      const { onImageSelected, isFileLink } = this.props;

      if (onImageSelected) {
        onImageSelected(reader.result, file);
        return;
      }

      const aspectValid = await this.aspectRatioCheck(aspectRatioValidation, reader.result);
      const sizeValid = this.sizeCheck(sizeValidation, file, sizeErrorMessage);

      if (!aspectValid || !sizeValid) {
        return;
      }
      if (!isFileLink) this.onUpload(file);
      this.setState(prevState => ({ ...prevState, src: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }

  };

  onDragOver = (e) => {
    e.preventDefault();
    this.updateState({ dragOver: true });
  };

  onDragLeave = (e) => {
    e.preventDefault();
    this.updateState({ dragOver: false });
  };

  onDrop = (e) => {
    e.preventDefault();

    if (!e.dataTransfer.items.length) {
      return;
    }

    const newFile = e.dataTransfer.items[0].getAsFile();
    this.onFileChange(newFile);
  };

  getOverlayClassName = () => {
    const { src, dragOver } = this.state;
    const hasImage = src ? ' has-image' : '';
    const drag = dragOver ? ' drag-over' : '';

    return `overlay${hasImage}${drag}`;
  };

  getClickOptions = isClicked => (isClicked && {
    onClick: () => this.fileInput.click(),
    role: 'button',
    tabIndex: '0',
  });

  onDeleteFile = () => {
    const { onDelete } = this.props;
    onDelete();
    this.setState({ src: null });
  };

  updateState(obj) {
    this.setState(prevState => ({ ...prevState, ...obj }));
  }

  render() {
    const { src, error } = this.state;

    const {
      width,
      height,
      error: externalError,
      type,
      onDelete,
    } = this.props;
    const uploaderClass = classNames({
      ImageUploader: true,
      circle: type === 'circle',
    });

    return (
      <ImageUploaderWrapper
        className={uploaderClass}
        onDragLeave={e => this.onDragLeave(e)}
        onDragOver={e => this.onDragOver(e)}
        onDrop={e => this.onDrop(e)}
        width={width}
        height={height}
      >
        <div
          className="preview"
          style={src ? { backgroundImage: `url(${src})` } : {}}
          {...this.getClickOptions(!(onDelete && src))}
        >
          <div className={this.getOverlayClassName()}>
            <div
              className="image-button"
              {...this.getClickOptions(onDelete && src)}
            >
              <i className="anticon anticon-plus" />
              <span>Upload</span>
            </div>
            {
              onDelete && src && (
                <div
                  onClick={this.onDeleteFile}
                  role="button"
                  tabIndex="0"
                  className="image-button image-delete-button"
                >
                  <i className="anticon anticon-delete" />
                  <span>Delete</span>
                </div>
              )
            }
          </div>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            ref={(ref) => { this.fileInput = ref; }}
            onChange={e => this.onFileChange(e.target.files[0])}
          />
        </div>
        { error || externalError
          ? <span className="error">{error || externalError}</span>
          : null
        }
      </ImageUploaderWrapper>
    );
  }
}

ImageUploader.defaultProps = {
  aspectRatioValidation: '',
  sizeErrorMessage: '',
  sizeValidation: 1000000,
  src: null,
  folder: 'default',
  width: 150,
  height: 150,
  error: null,
  setInputRef: null,
  onImageSelected: null,
  onChange: null,
  type: '',
  changeUploadStatus: null,
  onDelete: null,
  isFileLink: false,
};

ImageUploader.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  folder: PropTypes.string,
  sizeErrorMessage: PropTypes.string,
  aspectRatioValidation: PropTypes.string,
  sizeValidation: PropTypes.number,
  onChange: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  error: PropTypes.any,
  setInputRef: PropTypes.func,
  onImageSelected: PropTypes.func,
  type: PropTypes.string,
  changeUploadStatus: PropTypes.func,
  onDelete: PropTypes.func,
  isFileLink: PropTypes.bool,
};

export default ImageUploader;
