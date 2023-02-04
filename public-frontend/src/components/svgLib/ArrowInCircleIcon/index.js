// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#e8e8e8',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const ArrowInCircleIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} svg`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
        fill="#212121"
        fillOpacity="0.87"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5L10.775 6.225L15.675 11.125H5V12.875H15.675L10.775 17.775L12 19L19 12L12 5Z"
        fill={fill}
        fillOpacity="0.87"
      />
    </svg>
  );
};

ArrowInCircleIcon.defaultProps = DefaultProps;

export default ArrowInCircleIcon;
