// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#000',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ArrowDown = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.43144L12.3667 0.876465L7 5.98568L1.63333 0.876465L0 2.43144L7 9.09564L14 2.43144Z"
        fill="black"
        fillOpacity="0.54"
      />
    </svg>
  );
};

ArrowDown.defaultProps = DefaultProps;

export default ArrowDown;
