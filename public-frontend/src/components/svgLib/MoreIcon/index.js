// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#666666',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const MoreIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14 18C12.9 18 12 18.9 12 20C12 21.1 12.9 22 14 22C15.1 22 16 21.1 16 20C16 18.9 15.1 18 14 18ZM26 18C24.9 18 24 18.9 24 20C24 21.1 24.9 22 26 22C27.1 22 28 21.1 28 20C28 18.9 27.1 18 26 18ZM20 18C18.9 18 18 18.9 18 20C18 21.1 18.9 22 20 22C21.1 22 22 21.1 22 20C22 18.9 21.1 18 20 18Z" />
    </svg>
  );
};

MoreIcon.defaultProps = DefaultProps;

export default MoreIcon;
