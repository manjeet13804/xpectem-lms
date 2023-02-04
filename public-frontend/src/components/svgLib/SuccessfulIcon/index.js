// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#8bc34a',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const SuccessfulIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="76"
      height="76"
      viewBox="0 0 24 24"
      fill={fill}
      className={`${className} svg`}
    >
      <circle cx="12" cy="12" r="12" fill="#8bc34a" />
      <svg width="25" height="18" viewBox="0 0 14 13" fill="none">
        <path d="M1 6.78564L5.94975 11.7354L12.6994 4.98574" stroke="white" strokeWidth="2" />
      </svg>
    </svg>
  );
};

SuccessfulIcon.defaultProps = DefaultProps;

export default SuccessfulIcon;
