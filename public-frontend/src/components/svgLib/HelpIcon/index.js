// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#999999',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const HelpIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4ZM12.8 17.6H11.2V16H12.8V17.6ZM14.5188 11.54L13.7875 12.26C13.1375 12.82 12.8125 13.3 12.8125 14.5H11.1875V14.1C11.1875 13.22 11.5125 12.42 12.1625 11.86L13.1375 10.82C13.4625 10.58 13.625 10.18 13.625 9.7C13.625 8.82 12.8938 8.1 12 8.1C11.1062 8.1 10.375 8.82 10.375 9.7H8.75C8.75 7.94 10.2125 6.5 12 6.5C13.7875 6.5 15.25 7.94 15.25 9.7C15.25 10.42 14.925 11.06 14.5188 11.54Z" />
    </svg>
  );
};

HelpIcon.defaultProps = DefaultProps;

export default HelpIcon;
