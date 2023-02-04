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

const ArrowIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M16 8L14.6 9.4L20.2 15H8V17H20.2L14.6 22.6L16 24L24 16L16 8Z" />
    </svg>
  );
};

ArrowIcon.defaultProps = DefaultProps;

export default ArrowIcon;
