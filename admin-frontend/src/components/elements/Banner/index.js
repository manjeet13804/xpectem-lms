import React from 'react';
import bannerBackground from 'assets/images/banner.png';
import BannerWrapper from './banner.style';
const defaultProps = {
  title: '',
};

const Banner = ({title}) => (
  <BannerWrapper>
    <img className="image-layout" src={bannerBackground} alt="banner" />
    <div className="title">
      {title}
    </div>
  </BannerWrapper>
);

Banner.defaultProps = defaultProps;

export default Banner;
