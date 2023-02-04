// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#8cced8',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const DocumentIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 0C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6L10 0H2ZM9 7V1.5L14.5 7H9Z" fill={fill} />
    </svg>
  );
};

DocumentIcon.defaultProps = DefaultProps;

export default DocumentIcon;
