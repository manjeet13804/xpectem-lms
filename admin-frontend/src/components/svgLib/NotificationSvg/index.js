import React from 'react';
import PropTypes from 'prop-types';

import { COLORS } from 'constants/constants';

const NotificationSvg = (props) => {
  const { className, fill } = props;
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill={fill}
      className={className}
      {...props}
    >
      <circle cx="3" cy="3" r="3" fill="#0566AB" />
    </svg>
  );
};

NotificationSvg.defaultProps = {
  fill: COLORS.black,
  className: '',
};

NotificationSvg.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string,
};

export default NotificationSvg;
