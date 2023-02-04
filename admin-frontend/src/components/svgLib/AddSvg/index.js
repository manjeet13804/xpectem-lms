import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.grayBoulder,
  className: '',
};

const AddSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 0V6H0V8H6V14H8V8H14V6H8V0H6Z"
        fill={fill}
      />
    </svg>
  );
};

AddSvg.defaultProps = DefaultProps;

export default AddSvg;
