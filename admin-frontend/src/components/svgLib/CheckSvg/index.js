import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const CheckSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM7 14L2 9.19231L3.4 7.84615L7 11.3077L14.6 4L16 5.34615L7 14Z"
        fill={COLORS.black}
        fillOpacity="0.87"
      />
    </svg>
  );
};

CheckSvg.defaultProps = DefaultProps;

export default CheckSvg;