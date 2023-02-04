// @flow
import React, { Node } from 'react';

const defaultProps = {
  fill: '#000',
  className: '',
};

type PropType = {
    fill?: string,
    className?: string
};

const LockIcon = (props: PropType): Node => {
  const { fill, className, ...rest } = props;

  return (
    <svg
      width="17"
      height="22"
      viewBox="0 0 17 22"
      fill={fill}
      className={`${className} svg`}
      {...rest}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M13.7082 7.33317H14.7498C15.9009 7.33317 16.8332 8.26546 16.8332 9.4165V19.8332C16.8332 20.9842 15.9009 21.9165 14.7498 21.9165H2.24984C1.0988 21.9165 0.166504 20.9842 0.166504 19.8332V9.4165C0.166504 8.26546 1.0988 7.33317 2.24984 7.33317H3.2915V5.24984C3.2915 2.37484 5.62484 0.0415039 8.49984 0.0415039C11.3748 0.0415039 13.7082 2.37484 13.7082 5.24984V7.33317ZM11.729 5.24984C11.729 3.46859 10.2811 2.02067 8.49984 2.02067C6.71859 2.02067 5.27067 3.46859 5.27067 5.24984H5.37484V7.33317H11.729V5.24984ZM2.24984 19.8332V9.4165H14.7498V19.8332H2.24984ZM10.5832 14.6248C10.5832 15.7759 9.65088 16.7082 8.49984 16.7082C7.3488 16.7082 6.4165 15.7759 6.4165 14.6248C6.4165 13.4738 7.3488 12.5415 8.49984 12.5415C9.65088 12.5415 10.5832 13.4738 10.5832 14.6248Z" fill="#424242" />
    </svg>
  );
};

LockIcon.defaultProps = defaultProps;

export default LockIcon;
