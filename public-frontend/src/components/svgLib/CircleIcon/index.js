// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: null,
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const CirlceIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 8.55117C6.20914 8.55117 8 6.71059 8 4.44013C8 2.16967 6.20914 0.329102 4 0.329102C1.79086 0.329102 0 2.16967 0 4.44013C0 6.71059 1.79086 8.55117 4 8.55117Z"
        fill={fill}
      />
    </svg>

  );
};

CirlceIcon.defaultProps = DefaultProps;

export default CirlceIcon;
