// @flow
import React, { Node } from 'react';

const DefaultProps = {
  fill: '#000',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const CloseIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23 10.4192L17.4192 16L23 21.5808L21.5808 23L16 17.4192L10.4192 23L9 21.5808L14.5808 16L9 10.4192L10.4192 9L16 14.5808L21.5808 9L23 10.4192Z"
        fill={fill}
      />
    </svg>
  );
};

CloseIcon.defaultProps = DefaultProps;

export default CloseIcon;
