import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.redPomegranate,
  className: '',
};

const DeleteAttentionSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="77"
      height="77"
      viewBox="0 0 77 77"
      fill={fill}
      className={className}
      {...props}
    >
      <path
        fillRule="evenOdd"
        clipRule="evenOdd"
        d="M34.65 19.25V42.35H42.35V19.25H34.65ZM0 38.5C0 59.675 17.325 77 38.5 77C59.675 77 77 59.675 77 38.5C77 17.325 59.675 0 38.5 0C17.325 0 0 17.325 0 38.5ZM7.7 38.5C7.7 21.56 21.56 7.7 38.5 7.7C55.44 7.7 69.3 21.56 69.3 38.5C69.3 55.44 55.44 69.3 38.5 69.3C21.56 69.3 7.7 55.44 7.7 38.5ZM34.65 50.05V57.75H42.35V50.05H34.65Z"
        fill={fill}
      />
    </svg>
  );
};

DeleteAttentionSvg.defaultProps = DefaultProps;

export default DeleteAttentionSvg;
