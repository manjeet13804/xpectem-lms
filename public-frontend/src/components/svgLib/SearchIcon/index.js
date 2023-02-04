// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#000',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const SearchIcon = (props: PropType): Node => {
  const { fill, className, ...svgProps } = props;
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill={fill}
      className={`${className} svg`}
      {...svgProps}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M20.5 19H19.7L19.4 18.7C20.4 17.6 21 16.1 21 14.5C21 10.9 18.1 8 14.5 8C10.9 8 8 10.9 8 14.5C8 18.1 10.9 21 14.5 21C16.1 21 17.6 20.4 18.7 19.4L19 19.7V20.5L24 25.5L25.5 24L20.5 19ZM14.5 19C12 19 10 17 10 14.5C10 12 12 10 14.5 10C17 10 19 12 19 14.5C19 17 17 19 14.5 19Z" />
    </svg>
  );
};

SearchIcon.defaultProps = DefaultProps;

export default SearchIcon;
