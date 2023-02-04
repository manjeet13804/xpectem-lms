import React from 'react';
import { COLORS } from 'constants/constants';

const DefaultProps = {
  fill: COLORS.greyInput,
  className: '',
};

const SearchSvg = (props) => {
  const { fill, className } = props;
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill={fill}
      className={`${className} svg`}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.502 11H11.708L11.432 10.726C12.407 9.58897 13 8.11497 13 6.49997C13 2.90997 10.09 -3.24249e-05 6.5 -3.24249e-05C2.91 -3.24249e-05 0 2.90997 0 6.49997C0 10.09 2.91 13 6.5 13C8.115 13 9.588 12.408 10.725 11.434L11.001 11.708V12.5L15.999 17.491L17.49 16L12.502 11ZM6.5 11C4.014 11 2 8.98597 2 6.49997C2 4.01497 4.014 1.99997 6.5 1.99997C8.985 1.99997 11 4.01497 11 6.49997C11 8.98597 8.985 11 6.5 11Z"
        fill={fill}
      />
    </svg>
  );
};

SearchSvg.defaultProps = DefaultProps;

export default SearchSvg;
