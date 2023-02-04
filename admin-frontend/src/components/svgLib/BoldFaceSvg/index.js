import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.black,
  className: '',
};

const BoldFaceSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.14242 4.69478C6.55257 4.19766 6.8 3.55629 6.8 2.85714C6.8 1.2817 5.54389 0 4 0H2.6H1.2H0.5V10H1.2H2.6H4.7C6.24389 10 7.5 8.71828 7.5 7.14286C7.5 6.10538 6.95536 5.19536 6.14242 4.69478ZM2.6 1.42857H3.71016C4.32231 1.42857 4.82031 2.06942 4.82031 2.85714C4.82031 3.64487 4.32231 4.28571 3.71016 4.28571H2.6V1.42857ZM2.6 8.57143H4.33906C4.97836 8.57143 5.49844 7.93058 5.49844 7.14286C5.49844 6.35513 4.97836 5.71429 4.33906 5.71429H2.6V8.57143Z"
        fill={COLORS.black}
      />
    </svg>
  );
};

BoldFaceSvg.defaultProps = DefaultProps;

export default BoldFaceSvg;