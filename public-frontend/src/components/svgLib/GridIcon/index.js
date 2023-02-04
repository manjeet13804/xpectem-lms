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

const GridIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M8 12H12V8H8V12ZM14 24H18V20H14V24ZM8 24H12V20H8V24ZM8 18H12V14H8V18ZM14 18H18V14H14V18ZM20 8V12H24V8H20ZM14 12H18V8H14V12ZM20 18H24V14H20V18ZM20 24H24V20H20V24Z" />
    </svg>
  );
};

GridIcon.defaultProps = DefaultProps;

export default GridIcon;
