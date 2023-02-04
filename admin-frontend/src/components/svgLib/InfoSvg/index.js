import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.white,
  className: '',
};

const InfoSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      className={className}
      fill={fill}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.16663 13.1667H9.83329V8.16675H8.16663V13.1667ZM8.99996 0.666748C4.41663 0.666748 0.666626 4.41675 0.666626 9.00008C0.666626 13.5834 4.41663 17.3334 8.99996 17.3334C13.5833 17.3334 17.3333 13.5834 17.3333 9.00008C17.3333 4.41675 13.5833 0.666748 8.99996 0.666748ZM8.99996 15.6667C5.33329 15.6667 2.33329 12.6667 2.33329 9.00008C2.33329 5.33341 5.33329 2.33341 8.99996 2.33341C12.6666 2.33341 15.6666 5.33341 15.6666 9.00008C15.6666 12.6667 12.6666 15.6667 8.99996 15.6667ZM8.16663 6.50008H9.83329V4.83341H8.16663V6.50008Z"
        fill={fill}
      />
    </svg>
  );
};

InfoSvg.defaultProps = DefaultProps;

export default InfoSvg;
