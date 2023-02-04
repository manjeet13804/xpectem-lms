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
      viewBox="0 0 8 5"
      className={className}
      fill={fill}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.933333 5L4 2L7.06667 5L8 4.05405L4 0L0 4.05405L0.933333 5Z"
        fill={fill}
      />
    </svg>
);
};

ArrowDown.defaultProps = DefaultProps;

export default ArrowDown;
