import React from 'react';

import PropTypes from 'prop-types';

import { COLORS } from 'constants/constants';

const CheckRead = (props) => {
  const { className, fill } = props;
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill={fill}
      className={className}
      {...props}
    >
      <circle
        cx="8"
        cy="6"
        r="2"
        fill={fill}
      />
      <path
        d="M8.00002 0.542969C4.36364 0.542969 1.25819 2.80477 0 5.99752C1.25819 9.19024 4.36364 11.4521 8.00002 11.4521C11.64 11.4521 14.7418 9.19024 16 5.99752C14.7418 2.80477 11.64 0.542969 8.00002 0.542969ZM8.00002 9.63386C5.99274 9.63386 4.36364 8.00476 4.36364 5.99748C4.36364 3.99021 5.99274 2.36114 8.00002 2.36114C10.0073 2.36114 11.6364 3.99024 11.6364 5.99752C11.6364 8.00479 10.0073 9.63386 8.00002 9.63386Z"
        fill={fill}
      />
    </svg>
  );
};

CheckRead.defaultProps = {
  fill: COLORS.grayDashed,
  className: '',
};

CheckRead.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default CheckRead;
