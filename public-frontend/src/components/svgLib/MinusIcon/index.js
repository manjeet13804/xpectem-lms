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

const MinusIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="14" height="2" viewBox="0 0 14 2" fill="none">
      <rect width="14" height="2" fill={fill} />
    </svg>
  );
};

MinusIcon.defaultProps = DefaultProps;

export default MinusIcon;
