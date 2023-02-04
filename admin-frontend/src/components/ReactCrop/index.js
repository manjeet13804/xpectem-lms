import React, { Component } from 'react';
import Crop from 'react-image-crop';
import 'components/ReactCrop/ReactCrop.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  src: PropTypes.string,
  crop: PropTypes.objectOf(PropTypes.any),
  isSquare: PropTypes.bool,
};

const defaultProps = {
  crop: {
    aspect: 1,
    width: 50,
    x: 0,
    y: 0,
  },
  src: null,
  isSquare: false,
};

class ReactCrop extends Component {
  constructor(props) {
    super(props);

    this.imageRef = null;

    this.state = {
      crop: props.crop,
    };
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;

    const { crop } = this.state;

    if ((crop.aspect && crop.height && crop.width) || (crop.aspect === 1 && crop.width)) {
      this.makeClientCrop(crop, pixelCrop);
    }
  };

  getCroppedImg(image, pixelCrop, fileName, type) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, type);
    });
  }

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const { file: { name, type } } = this.props;

      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        name,
        type,
      );

      const { onImageSaved } = this.props;
      onImageSaved(croppedImage);
    }
  }

  render() {
    const { src, isSquare } = this.props;
    const { crop } = this.state;

    const className = classNames({
      square: isSquare,
    });

    return (
      <React.Fragment>
        {src && (
          <Crop
            src={src}
            crop={crop}
            onChange={this.onCropChange}
            keepSelection
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            className={className}
          />
        )}
      </React.Fragment>
    );
  }
}

ReactCrop.propTypes = propTypes;
ReactCrop.defaultProps = defaultProps;

export default ReactCrop;
