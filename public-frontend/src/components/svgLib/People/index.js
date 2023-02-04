// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#fafafa',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};


const PeopleIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 6C16.7 6 18 4.7 18 3C18 1.3 16.7 0 15 0C13.3 0 12 1.3 12 3C12 4.7 13.3 6 15 6ZM7 6C8.7 6 10 4.7 10 3C10 1.3 8.7 0 7 0C5.3 0 4 1.3 4 3C4 4.7 5.3 6 7 6ZM7 8C4.7 8 0 9.2 0 11.5V14H14V11.5C14 9.2 9.3 8 7 8ZM15 8C14.7 8 14.4 8 14 8.1C15.2 8.9 16 10.1 16 11.5V14H22V11.5C22 9.2 17.3 8 15 8Z"
      />
    </svg>
  );
};

PeopleIcon.defaultProps = DefaultProps;

export default PeopleIcon;
