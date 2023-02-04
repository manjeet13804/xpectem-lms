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

const ArrowRight = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0.277344L4.95 1.35649L9.15 5.67307H0V7.21471H9.15L4.95 11.5313L6 12.6104L12 6.44389L6 0.277344Z"
        fill="black"
        fillOpacity="0.87"
      />
    </svg>

  );
};

ArrowRight.defaultProps = DefaultProps;

export default ArrowRight;
