import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const RightAlignSvg = (props) => {
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
        d="M1 0.5C0.447715 0.5 0 0.947715 0 1.5C0 2.05228 0.447716 2.5 1 2.5H13C13.5523 2.5 14 2.05228 14 1.5C14 0.947715 13.5523 0.5 13 0.5H1ZM3 3.5C2.44772 3.5 2 3.94772 2 4.5C2 5.05228 2.44772 5.5 3 5.5H13C13.5523 5.5 14 5.05228 14 4.5C14 3.94772 13.5523 3.5 13 3.5H3ZM5 7.5C5 6.94772 5.44772 6.5 6 6.5H13C13.5523 6.5 14 6.94772 14 7.5C14 8.05228 13.5523 8.5 13 8.5H6C5.44772 8.5 5 8.05228 5 7.5ZM4 9.5C3.44772 9.5 3 9.94771 3 10.5C3 11.0523 3.44772 11.5 4 11.5H13C13.5523 11.5 14 11.0523 14 10.5C14 9.94771 13.5523 9.5 13 9.5H4Z"
        fill={COLORS.black}
      />
    </svg>
  );
};

RightAlignSvg.defaultProps = DefaultProps;

export default RightAlignSvg;
