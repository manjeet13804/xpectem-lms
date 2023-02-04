import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const DateSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 11H9V16H14V11ZM13 2H5V0H3V2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2H15V0H13V2ZM2 18V7H16V18H2Z"
        fill={COLORS.black}
      />
    </svg>
  );
};

DateSvg.defaultProps = DefaultProps;

export default DateSvg;