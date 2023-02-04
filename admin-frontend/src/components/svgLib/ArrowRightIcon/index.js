import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const ArrowRightIcon = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L6.6 1.4L12.2 7H0V9H12.2L6.6 14.6L8 16L16 8L8 0Z"
        fill={COLORS.black}
        fillOpacity="0.54"
      />
    </svg>
  );
};

ArrowRightIcon.defaultProps = DefaultProps;

export default ArrowRightIcon;
