import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const DotListSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 1C4 0.447715 4.44772 0 5 0H15C15.5523 0 16 0.447715 16 1C16 1.55228 15.5523 2 15 2H5C4.44772 2 4 1.55228 4 1ZM4 5C4 4.44772 4.44772 4 5 4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H5C4.44772 6 4 5.55228 4 5ZM5 8C4.44772 8 4 8.44771 4 9C4 9.55229 4.44772 10 5 10H15C15.5523 10 16 9.55229 16 9C16 8.44771 15.5523 8 15 8H5Z"
        fill={COLORS.black}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 2C1.55228 2 2 1.55228 2 1C2 0.447715 1.55228 0 1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2Z"
        fill={COLORS.black}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 6C1.55228 6 2 5.55228 2 5C2 4.44772 1.55228 4 1 4C0.447715 4 0 4.44772 0 5C0 5.55228 0.447715 6 1 6Z"
        fill={COLORS.black}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 10C1.55228 10 2 9.55228 2 9C2 8.44772 1.55228 8 1 8C0.447715 8 0 8.44772 0 9C0 9.55228 0.447715 10 1 10Z"
        fill={COLORS.black}
      />
    </svg>

  );
};

DotListSvg.defaultProps = DefaultProps;

export default DotListSvg;
