import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import {
  ONE_MB,
  IMAGE_TYPES,
  EDIT_PROFILE,
} from 'constants/constants';
import { checkImg } from 'utils';
import AddPhotoWrapper from './addPhoto.style';

const {jpg} = IMAGE_TYPES;

const defaultProps = {
  className: '',
  isSuccess: false,
  isLoading: false,
};

const {
  fileRequirements,
  inputFileText,
  or,
  cropText,
  uploadText,
  somethingWrong,
  typeError,
  sizeError,
  uploadSuccessStatus,
  uploadLoadingStatus,
} = EDIT_PROFILE;

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.reader = new FileReader();
    this.state = {
      errors: [],
      src: null,
      croppedImageUrl: null,
      disableBtn: true,
      crop: {
        unit: '%',
      },
    };
  }

  onChange = (e) => {
    const {files} = e.target;
    this.clearError();
    if (files && files.length > 0) {
      this.readFiles(files[0]);
    }
  };

  clearError = () => {
    this.setState({
      errors: [],
    });
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.setState({disableBtn: false, crop});
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onClickCrop = () => {
    const { crop } = this.state;
    this.makeClientCrop(crop);
  };

  makeClientCrop = async (crop) => {
    const { width, height } = crop;
    if (this.imageRef && width && height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg',
      );
      this.setState({ croppedImageUrl });
    }
  };

  getCroppedImg = (image, crop, fileName) => {
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
    canvas.width = cropNaturalWidth;
    canvas.height = cropNaturalHeight;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      x * scaleX,
      y * scaleY,
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
          this.setState({errors: [somethingWrong]});
          return;
        }
        const data = blob;
        data.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(data);
        resolve(this.fileUrl);
      }, jpg);
    });
  };

  readFiles = (file) => {
    const isImage = checkImg(file);
    const isBigFile = file.size > ONE_MB;
    this.reader.onload = (e) => {
      const resultFile = e.target.result;
      this.setState({ src: resultFile });
    };

    if (isImage && !isBigFile) {
      this.reader.readAsDataURL(file);
    } else {
      const errors = [];
      if (!isImage) errors.push(typeError);
      if (isBigFile) errors.push(sizeError);
      this.setState({errors});
    }
  };

  addPhoto = () => {
    const { croppedImageUrl } = this.state;
    // const { uploadUserPhoto } = this.props;
    const data = new FormData();
    data.append('file', croppedImageUrl);
    // uploadUserPhoto(data);
  };

  render() {
    const {
      isLoading,
      isSuccess,
    } = this.props;
    const {
      errors,
      src,
      crop,
      croppedImageUrl,
      disableBtn,
    } = this.state;
    const status = isSuccess ? uploadSuccessStatus : uploadLoadingStatus;
    return (
      <AddPhotoWrapper>
        <div className="text-attache">
          <div className="text-attache__requirements">{fileRequirements}</div>
        </div>
        <div className="add-profile-photo">
          <div className="content">
            {(!src && !croppedImageUrl) && (
              <div className="content__upload-zone dashed-gradient">
                <div className="content__input-text-wrap">
                  <span className="content__input-text">{inputFileText}</span>
                  <span className="content__input-text">{or}</span>
                  <div className="content__button">SELECT FILE</div>
                </div>
                <input
                  className="content__input-drop"
                  type="file"
                  onChange={this.onChange}
                  name="img"
                  id="img"
                  accept=".png, .jpg, .jpeg"
                />
              </div>
            )}
            {(src && !croppedImageUrl) && (
              <div className="content__crop-block">
                <ReactCrop
                  src={src}
                  crop={crop}
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
                <button
                  className="content__btn"
                  type="button"
                  onClick={this.onClickCrop}
                  disabled={disableBtn}
                >
                  {cropText}
                </button>
              </div>
            )}
            {croppedImageUrl && (
              <div className="content__photo-wrap">
                <img className="content__cropped-image" alt="Crop" src={croppedImageUrl} />
                {(isLoading || isSuccess) && <span className="content__status">{status}</span>}
                <button className="content__btn" type="button" onClick={this.addPhoto}>{uploadText}</button>
              </div>
            )}
            {
              errors
              && errors.length > 0
              && (
                <div className="content__errors-wrap">
                  {
                    errors.map((err) => <p className="content__error" key={`${err}01`}>{err}</p>)
                  }
                </div>
              )
            }
          </div>
        </div>
      </AddPhotoWrapper>
    );
  }
}

AddPhoto.defaultProps = defaultProps;
export default AddPhoto;