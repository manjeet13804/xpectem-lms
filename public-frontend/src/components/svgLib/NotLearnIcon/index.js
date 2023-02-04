// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#e0e0e0',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const NotLearnIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="19"
      height="26"
      viewBox="0 0 19 26"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path
        d="M12 19.6505C15.6025 19.6505 18.5 16.654 18.5 12.9862C18.5 9.31835 15.6025 6.32178 12 6.32178C8.3975 6.32178 5.5 9.31835 5.5 12.9862C5.5 16.654 8.3975 19.6505 12 19.6505Z"
        stroke="black"
        strokeOpacity="0.12"
      />
    </svg>
  );
};

NotLearnIcon.defaultProps = DefaultProps;

export default NotLearnIcon;
