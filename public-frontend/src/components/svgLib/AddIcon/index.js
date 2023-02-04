// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#33A0CC',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const AddIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill={fill}
      fillRule="evenodd"
      clipRule="evenodd"
      className={`${className} svg`}
      {...props}
    >
      <path d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z" />
      <path fill="#fff" d="M17 8H15V15H8V17H15V24H17V17H24V15H17V8Z" />
    </svg>
  );
};

AddIcon.defaultProps = DefaultProps;

export default AddIcon;
