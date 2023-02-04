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


const WarningIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M0.5 16H17.5L9 1L0.5 16ZM10 14H8V12H10V14ZM10 11H8V7H10V11Z" />
    </svg>
  );
};

WarningIcon.defaultProps = DefaultProps;

export default WarningIcon;
