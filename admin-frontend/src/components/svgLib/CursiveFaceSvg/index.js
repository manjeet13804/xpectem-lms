import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const CursiveFaceSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        d="M9.10999 0V0.71428H7.60998L3.85999 9.28572H5.36V10H0.109985V9.28572H1.60999L5.36 0.71428H3.85999V0H9.10999Z"
        fill={COLORS.black}
      />
    </svg>

  );
};

CursiveFaceSvg.defaultProps = DefaultProps;

export default CursiveFaceSvg;