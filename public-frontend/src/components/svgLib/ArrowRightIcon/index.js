// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#707070',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ArrowRightIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      className={`${className} svg`}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M8 0L6.6 1.4L12.2 7H0V9H12.2L6.6 14.6L8 16L16 8L8 0Z" fill="black" fillOpacity="0.54" />
    </svg>
  );
};

ArrowRightIcon.defaultProps = DefaultProps;

export default ArrowRightIcon;
