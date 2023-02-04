import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const ArrowDown = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="8"
      height="5"
      viewBox="0 0 14 10"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.43144L12.3667 0.876465L7 5.98568L1.63333 0.876465L0 2.43144L7 9.09564L14 2.43144Z"
        fill={fill}
      />
    </svg>
  );
};

ArrowDown.defaultProps = DefaultProps;

export default ArrowDown;
