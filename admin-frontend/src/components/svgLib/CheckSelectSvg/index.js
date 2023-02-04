import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const CheckSelectSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="19"
      height="14"
      viewBox="0 0 19 14"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.26162 11.2001L2.06162 7.0001L0.661621 8.4001L6.26162 14.0001L18.2616 2.0001L16.8616 0.600098L6.26162 11.2001Z"
        fill={fill}
      />
    </svg>

  );
};

CheckSelectSvg.defaultProps = DefaultProps;

export default CheckSelectSvg;
