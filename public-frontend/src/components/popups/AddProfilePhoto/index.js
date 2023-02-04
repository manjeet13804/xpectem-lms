// @flow
import React, { Component, Node, SyntheticEvent } from 'react';
import ReactCrop from 'react-image-crop';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionUploadUserAvatar, actionCurrentProfile, actionCurrentUser } from 'redux/actions';
import { getSuccessAvatar, getLoadingAvatar } from 'redux/selectors';
import { ONE_MB, IMAGE_TYPES } from 'constants/constants';
import { EDIT_PROFILE } from 'localise';
import { bemlds, checkImg } from 'utils';
import { CloseIcon } from 'components';

import './styles.scss';

const b = bemlds('add-profile-photo');

type PropType = {
  className?: string,
  close: () => void,
  isSuccess?: boolean,
  isLoading?: boolean,
  uploadUserPhoto: () => void,
  getCurrentProfile: () => void,
  getCurrentUser: () => void

};

const { jpg } = IMAGE_TYPES;

const defaultProp = {
  className: '',
  isSuccess: false,
  isLoading: false,
};

const {
  fileRequirements,
  inputFileText,
  or,
  selectFile,
  cropText,
  uploadText,
  typeError,
  sizeError,
  uploadSuccessStatus,
  uploadLoadingStatus,
} = EDIT_PROFILE;

class AddProfilePhoto extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.veil = React.createRef();
    this.reader = new FileReader();
    this.state = {
      errors: [],
      src: null,
      croppedImageUrl: null,
      disableBtn: true,
      fileName: null,
      crop: {
        unit: '%',
        width: 100,
        height: 100,
      },
    };
  }

  componentWillReceiveProps(nextProps: PropType) {
    const { isSuccess: newIsSuccess } = nextProps;
    const { isSuccess, getCurrentProfile, getCurrentUser } = this.props;

    if (newIsSuccess && !isSuccess) {
      setTimeout(() => {
        getCurrentProfile();
        getCurrentUser();
      }, 2000);
    }
  }

  onChange = (e: SyntheticEvent) => {
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

  onImageLoaded = (image: Node) => {
    this.imageRef = image;
  };

  onCropComplete = (crop: object) => {
    this.setState({disableBtn: false, crop});
  };

  onCropChange = (crop: object) => {
    this.setState({ crop });
  };

  onClickCrop = () => {
    const { crop } = this.state;
    this.makeClientCrop(crop);
  };

  makeClientCrop = async (crop: object): void => {
    const { width, height } = crop;
    if (this.imageRef && width && height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
      );
      this.setState({ croppedImageUrl });
    }
  };

  getCroppedImg = (image: File, crop: object): Promise => {
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

    return canvas.toDataURL(jpg);
  };

  dataURLtoFile = (dataURL: string): File => {
    const blobBin = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < blobBin.length; i += 1) {
      array.push(blobBin.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
  };

  closeHandler = (e: SyntheticEvent) => {
    const { close } = this.props;
    if (e.target === this.veil.current) {
      close();
    }
  };

  readFiles = (file: File) => {
    const isImage = checkImg(file);
    const isBigFile = file.size > ONE_MB;
    this.reader.onload = (e: SyntheticEvent) => {
      const resultFile = e.target.result;
      this.setState({ src: resultFile, fileName: file.name });
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
    const { croppedImageUrl, fileName } = this.state;
    const { uploadUserPhoto } = this.props;
    const file = this.dataURLtoFile(croppedImageUrl, 'newFile.jpeg');
    const data = new FormData();
    data.append('file', file, fileName);
    uploadUserPhoto(data);
  };

  render(): Node {
    const {
      className,
      close,
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
      <div className={b()} onClick={this.closeHandler} role="button" tabIndex="0" ref={this.veil}>
        <div className={b('content', {mix: className})}>
          <button className={b('btn-close')} type="button" onClick={close}>
            <CloseIcon />
          </button>
          <span className={b('text')}>
            <span>{fileRequirements}</span>
          </span>
          {(!src && !croppedImageUrl) && (
            <div className={b('upload-zone dashed-gradient')}>
              <div className={b('input-text-wrap')}>
                <span className={b('input-text')}>{inputFileText}</span>
                <span className={b('input-text')}>{or}</span>
                <div className={b('button')}>{selectFile}</div>
              </div>
              <input
                className={b('input-drop')}
                type="file"
                onChange={this.onChange}
                name="img"
                id="img"
                accept=".png, .jpg, .jpeg"
              />
            </div>
          )}
          {(src && !croppedImageUrl) && (
            <div className={b('crop-block')}>
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
              <button
                className={b('btn')}
                type="button"
                onClick={this.onClickCrop}
                disabled={disableBtn}
              >
                {cropText}
              </button>
            </div>
          )}
          {croppedImageUrl && (
            <div className={b('photo-wrap')}>
              <img className={b('cropped-image')} alt="Crop" src={croppedImageUrl} />
              {(isLoading || isSuccess) && <span className={b('status')}>{status}</span>}
              <button className={b('btn')} type="button" onClick={this.addPhoto}>{uploadText}</button>
            </div>
          )}
          {
            errors
            && errors.length > 0
            && (
              <div className={b('errors-wrap')}>
                {
                  errors.map((err: string): Node => <p className={b('error')} key={`${err}01`}>{err}</p>)
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

AddProfilePhoto.defaultProps = defaultProp;


const mapStateToProps = (state: object): object => ({
  isSuccess: getSuccessAvatar(state),
  isLoading: getLoadingAvatar(state),
});

const mapDispatchToProps = {
  uploadUserPhoto: actionUploadUserAvatar,
  getCurrentProfile: actionCurrentProfile,
  getCurrentUser: actionCurrentUser,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddProfilePhoto),
);
