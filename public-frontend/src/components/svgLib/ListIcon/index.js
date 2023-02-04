// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#fafafa',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ListIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M13 24H24V20H13V24ZM8 24H12V20H8V24ZM13 18H24V14H13V18ZM8 18H12V14H8V18ZM13 8V12H24V8H13ZM8 12H12V8H8V12Z" />
    </svg>
  );
};

ListIcon.defaultProps = DefaultProps;

export default ListIcon;
