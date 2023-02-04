// @flow
import React, {Node} from 'react';

const DefaultProps = {
  fill: '#fff',
  className: '',
};

type PropType = {
  fill?: string,
  className?: string
};

const CameraIcon = (props: PropType): Node => {
  const { fill, className } = props;
  return (
    <svg className={className} width="24" height="26" viewBox="0 0 24 26" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 9.8765C10.675 9.8765 9.6 10.9618 9.6 12.2996C9.6 13.6373 10.675 14.7227 12 14.7227C13.325 14.7227 14.4 13.6373 14.4 12.2996C14.4 10.9618 13.325 9.8765 12 9.8765ZM17.8667 6.3765H16L15.575 5.23227C15.3667 4.67698 14.7167 4.22266 14.1333 4.22266H9.86667C9.28333 4.22266 8.63333 4.67698 8.425 5.23227L8 6.3765H6.13333C4.95833 6.3765 4 7.34405 4 8.53035V16.0688C4 17.2551 4.95833 18.2227 6.13333 18.2227H17.8667C19.0417 18.2227 20 17.2551 20 16.0688V8.53035C20 7.34405 19.0417 6.3765 17.8667 6.3765ZM12 16.0688C9.94167 16.0688 8.26667 14.3777 8.26667 12.2996C8.26667 10.2215 9.94167 8.53035 12 8.53035C14.0583 8.53035 15.7333 10.2215 15.7333 12.2996C15.7333 14.3777 14.0583 16.0688 12 16.0688Z"
        fill={fill}
        fillOpacity="0.6"
      />
    </svg>
  );
};

CameraIcon.defaultProps = DefaultProps;

export default CameraIcon;
