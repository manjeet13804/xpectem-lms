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

const ArrowUp = (props: PropType): Node => {
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
        d="M0 7.55483L1.63333 9.11035L7 3.99934L12.3667 9.11035L14 7.55483L7 0.888288L0 7.55483Z"
        fill="black"
        fillOpacity="0.54"
      />
    </svg>
  );
};

ArrowUp.defaultProps = DefaultProps;

export default ArrowUp;
