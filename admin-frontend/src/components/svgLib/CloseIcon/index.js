import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  height: 32,
  width: 32,
  className: '',
};

const CloseIcon = (props) => {
  const {
    fill,
    className,
    height,
    width,
  } = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill={fill}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 10.4192L17.4192 16L23 21.5808L21.5808 23L16 17.4192L10.4192 23L9 21.5808L14.5808 16L9 10.4192L10.4192 9L16 14.5808L21.5808 9L23 10.4192Z"
        fill={fill}
      />
    </svg>
  );
};

CloseIcon.defaultProps = DefaultProps;

export default CloseIcon;
