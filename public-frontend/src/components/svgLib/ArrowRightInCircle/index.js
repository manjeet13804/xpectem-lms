// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#666666',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ArrowRightInCircle = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
        fill="black"
        fillOpacity="0.2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8L14.6 9.4L20.2 15H8V17H20.2L14.6 22.6L16 24L24 16L16 8Z"
        fill="black"
        fillOpacity="0.87"
      />
    </svg>


  );
};

ArrowRightInCircle.defaultProps = DefaultProps;

export default ArrowRightInCircle;
