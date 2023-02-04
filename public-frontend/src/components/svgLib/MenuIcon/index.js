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

const MenuIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 9H24V11H8V9ZM8 15H24V17H8V15ZM24 21H8V23H24V21Z" fill={fill} />
    </svg>
  );
};

MenuIcon.defaultProps = DefaultProps;

export default MenuIcon;
