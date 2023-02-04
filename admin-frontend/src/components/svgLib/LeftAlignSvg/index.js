import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const LeftAlignSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 0.5C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447716 2.5 1 2.5H13C13.5523 2.5 14 2.05228 14 1.5C14 0.947715 13.5523 0.5 13 0.5H1ZM1 3.5C0.447715 3.5 0 3.94772 0 4.5C0 5.05228 0.447715 5.5 1 5.5H11C11.5523 5.5 12 5.05228 12 4.5C12 3.94772 11.5523 3.5 11 3.5H1ZM0 7.5C0 6.94772 0.447715 6.5 1 6.5H13C13.5523 6.5 14 6.94772 14 7.5C14 8.05228 13.5523 8.5 13 8.5H1C0.447716 8.5 0 8.05228 0 7.5ZM1 9.5C0.447715 9.5 0 9.94771 0 10.5C0 11.0523 0.447715 11.5 1 11.5H8C8.55229 11.5 9 11.0523 9 10.5C9 9.94771 8.55229 9.5 8 9.5H1Z"
        fill={COLORS.black}
      />
    </svg>
  );
};

LeftAlignSvg.defaultProps = DefaultProps;

export default LeftAlignSvg;
