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

const FavoriteOutlineIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill={fill}
      className={`${className} svg`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 0C12.8 0 11.1 0.8 10 2.1C8.9 0.8 7.2 0 5.5 0C2.4 0 0 2.4 0 5.5C0 9.3 3.4 12.4 8.6 17L10 18.3L11.4 17C16.5 12.3 20 9.2 20 5.5C20 2.4 17.6 0 14.5 0ZM10.1 15.6H10L9.9 15.5C5.1 11.2 2 8.4 2 5.5C2 3.5 3.5 2 5.5 2C7 2 8.5 3 9.1 4.4H11C11.5 3 13 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.4 14.9 11.2 10.1 15.6Z"
      />
    </svg>
  );
};

FavoriteOutlineIcon.defaultProps = DefaultProps;

export default FavoriteOutlineIcon;
