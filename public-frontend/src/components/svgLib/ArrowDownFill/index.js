// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#e8e8e8',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ArrowDownFill = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill={fill}
      className={`${className} svg`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0.5L5 5.5L10 0.5H0Z"
        fill={fill}
      />
    </svg>

  );
};

ArrowDownFill.defaultProps = DefaultProps;

export default ArrowDownFill;
