import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  height: 32,
  width: 32,
  className: '',
};

const TrashIcon = ({ fill, className, height, width, ...props }) => {
  return (
    <svg className={className} width={width} height={height} fill={fill} {...props}>
      <path d='M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z' />
    </svg>
  );
};

TrashIcon.defaultProps = DefaultProps;

export default TrashIcon;
