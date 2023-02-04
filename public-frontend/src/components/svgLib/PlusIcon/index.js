// @flow
import React, { Node } from 'react';

const DefaultProps = {
  fill: '#666',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const PlusIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0H8V6H14V8H8V14H6V8H0V6H6V0Z"
        fill={fill}
      />
    </svg>
  );
};

PlusIcon.defaultProps = DefaultProps;

export default PlusIcon;
