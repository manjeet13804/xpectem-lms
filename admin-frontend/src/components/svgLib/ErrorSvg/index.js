import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.white,
  className: '',
};

const ErrorSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 20 17"
      className={className}
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.4446 16.778L10.0001 0.111328L0.555664 16.778H19.4446ZM11.1112 14.5558H8.889V12.3336H11.1112V14.5558ZM11.1112 11.2224H8.889V6.77799H11.1112V11.2224Z"
        fill={fill}
      />
    </svg>
  );
};

ErrorSvg.defaultProps = DefaultProps;

export default ErrorSvg;
