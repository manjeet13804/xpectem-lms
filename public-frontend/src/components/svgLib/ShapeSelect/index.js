// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#1a1a1a',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ShapeSelect = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 12 6"
      fill={fill}
      className={`${className} svg`}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0L5.70779 6L11.4156 0H0Z" />
    </svg>
  );
};

ShapeSelect.defaultProps = DefaultProps;

export default ShapeSelect;
