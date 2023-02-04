import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const CenterAlignSvg = (props) => {
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
        d="M1 0.5C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447716 2.5 1 2.5H13C13.5523 2.5 14 2.05228 14 1.5C14 0.947715 13.5523 0.5 13 0.5H1ZM3 3.5C2.44772 3.5 2 3.94772 2 4.5C2 5.05228 2.44772 5.5 3 5.5H11C11.5523 5.5 12 5.05228 12 4.5C12 3.94772 11.5523 3.5 11 3.5H3ZM0 7.5C0 6.94772 0.447715 6.5 1 6.5H13C13.5523 6.5 14 6.94772 14 7.5C14 8.05228 13.5523 8.5 13 8.5H1C0.447716 8.5 0 8.05228 0 7.5ZM3 9.5C2.44772 9.5 2 9.94771 2 10.5C2 11.0523 2.44772 11.5 3 11.5H11C11.5523 11.5 12 11.0523 12 10.5C12 9.94771 11.5523 9.5 11 9.5H3Z"
        fill={COLORS.black}
      />
    </svg>
  );
};

CenterAlignSvg.defaultProps = DefaultProps;

export default CenterAlignSvg;
