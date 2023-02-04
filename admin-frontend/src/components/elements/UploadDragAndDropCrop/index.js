import React, { PureComponent, Fragment } from 'react';
import ReactCrop from 'react-image-crop';
import './custom-image-crop.scss';
import IntlMessages from 'components/utility/intlMessages';
import cropImageActions from 'redux/cropImageState/actions';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import UploadDragAndDropCropWrapper from './UploadDragAndDropCrop.style';

const title = bemlds('title');
const b = bemlds('drag-and-drop');
const cropStyle = bemlds('crop');

const imageMaxSize = 5242880;
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => item.trim());

class UploadDragAndDropCrop extends PureComponent {
  verifyFile = (files) => {
    const { setStateCropImage } = this.props;

    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        setStateCropImage({ errors: `This file is not allowed ${currentFileSize} bytes is large ` });
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        setStateCropImage({ errors: 'This file is not allowed. Only images are allowed' });
        return false;
      }
      return true;
    }
  };

  dropRef = React.createRef();

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    const { setStateCropImage } = this.props;

    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setStateCropImage({ dragging: true });
    }
  };

  clearError = () => {
    const { setStateCropImage } = this.props;
    setStateCropImage({
      errors: [],
    });
  };

  handleDragOut = (e) => {
    const { setStateCropImage } = this.props;
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
    if (this.dragCounter > 0) return;
    setStateCropImage({ dragging: false });
  };

  handleDrop = (e) => {
    const { handleCropFile, setStateCropImage } = this.props;

    e.preventDefault();
    e.stopPropagation();

    this.clearError();
    setStateCropImage({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const isVerified = this.verifyFile(e.dataTransfer.files);
      if (isVerified) {
        const currentFile = e.dataTransfer.files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener('load', () => {
          setStateCropImage({
            imageSrc: myFileItemReader.result,
            crop: {
              x: 0, y: 0, width: myFileItemReader.result.width, height: myFileItemReader.result.height,
            },
          });
        }, false);
        myFileItemReader.readAsDataURL(currentFile);

        handleCropFile(currentFile);
        this.props.handleDrop(currentFile);
        e.dataTransfer.clearData();
        this.dragCounter = 0;
      }
    }
  };

  handleAddFile = (e) => {
    const { handleCropFile, setStateCropImage } = this.props;
    this.clearError();
    if (e.target.files) {
      const isVerified = this.verifyFile(e.target.files);
      if (isVerified) {
        const currentFile = e.target.files[0];
        handleCropFile(currentFile);
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener('load', () => {
          setStateCropImage({
            imageSrc: myFileItemReader.result,
            crop: {
              x: 0, y: 0, width: myFileItemReader.result.width, height: myFileItemReader.result.height,
            },
          });
        }, false);
        myFileItemReader.readAsDataURL(currentFile);

        this.props.handleAddFile(currentFile);
      }
    }
  };

  componentDidMount() {
    const { setInitStateCropImage, isManualInitial } = this.props;
    if (!isManualInitial) {
      setInitStateCropImage();
    }
    const div = this.dropRef.current;
    this.dragCounter = 0;
    if (div) {
      div.addEventListener('dragenter', this.handleDragIn);
      div.addEventListener('dragleave', this.handleDragOut);
      div.addEventListener('dragover', this.handleDrag);
      div.addEventListener('drop', this.handleDrop);
    }
  }

  componentWillUnmount() {
    const div = this.dropRef.current;
    if (div) {
      div.removeEventListener('dragenter', this.handleDragIn);
      div.removeEventListener('dragleave', this.handleDragOut);
      div.removeEventListener('dragover', this.handleDrag);
      div.removeEventListener('drop', this.handleDrop);
    }
  }

  handleOnCropChange = (crop) => {
    const { setStateCropImage } = this.props;
    setStateCropImage({ crop });
  };

  onCropComplete = (crop, pixelCrop) => {
    const { setStateCropImage } = this.props;
    setStateCropImage({ disableBtn: false, crop, pixelCrop });
  };

  handleImageLoaded = (image) => {
    this.imageRef = image;
  };

  handleDeleteImg = () => {
    const {
      handleCropFile,
      removeDownloadLink,
      setStateCropImage,
      setInitStateCropImage,
    } = this.props;
    handleCropFile(null);
    removeDownloadLink();
    setInitStateCropImage();
    setStateCropImage({ ...this.initState });
  }

  makeClientCrop = (crop) => {
    const { handleCropFile, setStateCropImage } = this.props;
    const { width, height } = crop;
    if (this.imageRef && width && height) {
      this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      ).then((blob) => {
        setStateCropImage({ blobFile: blob[0], croppedImageUrl: blob[1] });
        handleCropFile(new File([blob[0]], 'cropFile.jpeg', { type: 'image/jpeg' }));
      });
    }
  };

  onClickCrop = () => {
    const { setStateCropImage, pixelCrop } = this.props;
    setStateCropImage({ crop: pixelCrop });
    this.makeClientCrop(pixelCrop);
  };

  getCroppedImg = (image, crop, fileName) => {
    const { setStateCropImage } = this.props;
    const {
      naturalWidth,
      naturalHeight,
      width,
      height,
    } = image;

    const {
      x,
      y,
      width: cropWidth,
      height: cropHeight,
    } = crop;

    const canvas = document.createElement('canvas');
    const scaleX = naturalWidth / width;
    const scaleY = naturalHeight / height;
    const cropNaturalWidth = cropWidth * scaleX;
    const cropNaturalHeight = cropHeight * scaleY;
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      x,
      y,
      cropNaturalWidth,
      cropNaturalHeight,
      0,
      0,
      cropNaturalWidth,
      cropNaturalHeight,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          setStateCropImage({ errors: 'Error in create blob file' });
          return;
        }
        const data = blob;
        data.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(data);
        resolve([blob, this.fileUrl]);
      }, 'image/jpeg');
    });
  };

  addPhoto = () => {
    const { uploadUserPhoto, croppedImageUrl } = this.props;
    const data = new FormData();
    data.append('file', croppedImageUrl);
    uploadUserPhoto(data);
  };

  renderRemoveBtn = (
    <button
      className={cropStyle('btn-delete')}
      onClick={this.handleDeleteImg}
    >
      <IntlMessages id="crop.deleteImg" />
    </button>
  )

  renderReadyCrop = (url) => {
    const { isUpload } = this.props;

    return (
      <React.Fragment>
        {url && (
          <div className={b('main')}>
            <img className={cropStyle('cropped')} src={url} alt="crop" />
            <div className={cropStyle('btn')}>
              <button
                className={cropStyle('btn-upload', { 'display-none': isUpload })}
                onClick={this.addPhoto}
              >
                <IntlMessages id="crop.uploadBtn" />
              </button>
              {this.renderRemoveBtn}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      imageUrl,
      file,
      imageSrc,
      crop,
      croppedImageUrl,
      disableBtn,
      errors,
    } = this.props;

    const imgCropUpl = croppedImageUrl || imageUrl;

    return (
      <UploadDragAndDropCropWrapper>
        <div className={title()}>
          <div className={title('number')}>
            <IntlMessages id="dragAndDrop.maxFiles" />
          </div>
          <div className={title('size')}>
            <IntlMessages id="dragAndDrop.maxSize" />
          </div>
          <div className={title('type')}>
            <IntlMessages id="crop.formatImage" />
          </div>
          {file && file.name && (
            <div className={title('format')}>
              {<IntlMessages id="dragAndDrop.attached" />}
              {file.name}
            </div>
          )}
        </div>
        {imageSrc || imgCropUpl
          ? (
            <Fragment>
              <div className={cropStyle()}>
                {!imgCropUpl && (
                <Fragment>
                  <div className={cropStyle('image')}>
                    <ReactCrop
                      src={imageSrc}
                      crop={crop}
                      onImageLoaded={this.handleImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.handleOnCropChange}
                    />
                  </div>
                  <div className={cropStyle('btn')}>
                    <button
                      className={cropStyle('btn-crop')}
                      onClick={this.onClickCrop}
                      disabled={disableBtn}
                    >
                      <IntlMessages id="crop.cropBtn" />
                    </button>
                    {this.renderRemoveBtn}
                  </div>
                </Fragment>
                )}
                {this.renderReadyCrop(imgCropUpl)}
                {
                errors
                && errors.length > 0
                && (
                  <div className={b('errors-wrap')}>
                    {
                      errors.map(err => <p className={b('error')} key={`${err}01`}>{err}</p>)
                    }
                  </div>
                )
              }
              </div>
            </Fragment>
          )
          : (
            <div
              className={b()}
              ref={this.dropRef}
            >
              <div className={b('main')}>
                {!imgCropUpl && (
                <React.Fragment>
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
                      accept=".png, .jpg, .jpeg"
                    />
                  </div>
                </React.Fragment>
                )}
              </div>
            </div>
          )
        }
        {
          errors
          && (
            <div className={b('errors-wrap')}>
              <p className={b('error')}>{errors}</p>
            </div>
          )
        }
      </UploadDragAndDropCropWrapper>
    );
  }
}
export default connect(({ cropImageState }) => ({ ...cropImageState }), { ...cropImageActions })(UploadDragAndDropCrop);
