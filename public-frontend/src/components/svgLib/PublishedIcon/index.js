// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#8BC34A',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const PublishedIcon = (props: PropType): Node => {
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
        d="M27.4 18C26.7 14.6 23.7 12 20 12C17.1 12 14.6 13.6 13.4 16C10.3 16.4 8 18.9 8 22C8 25.3 10.7 28 14 28H27C29.8 28 32 25.8 32 23C32 20.4 29.9 18.2 27.4 18ZM18 25L14.5 21.5L15.9 20.1L18 22.2L23.2 17L24.6 18.4L18 25Z"
      />
    </svg>
  );
};

PublishedIcon.defaultProps = DefaultProps;

export default PublishedIcon;
