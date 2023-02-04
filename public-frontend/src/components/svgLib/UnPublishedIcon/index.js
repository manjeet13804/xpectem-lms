// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#c7c7c7',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const UnPublishedIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={fill}
      className={`${className} svg`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.4 18C26.7 14.6 23.7 12 20 12C18.5 12 17.1 12.4 16 13.2L17.5 14.7C18.2 14.2 19.1 14 20 14C23 14 25.5 16.5 25.5 19.5V20H27C28.7 20 30 21.3 30 23C30 24.1 29.4 25.1 28.4 25.6L29.9 27.1C31.2 26.2 32 24.7 32 23C32 20.4 29.9 18.2 27.4 18ZM11 13.3L13.8 16C10.6 16.2 8 18.8 8 22C8 25.3 10.7 28 14 28H25.7L27.7 30L29 28.7L12.3 12L11 13.3ZM15.7 18L23.7 26H14C11.8 26 10 24.2 10 22C10 19.8 11.8 18 14 18H15.7Z"
      />
    </svg>
  );
};

UnPublishedIcon.defaultProps = DefaultProps;

export default UnPublishedIcon;
