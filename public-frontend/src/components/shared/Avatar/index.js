// @flow
import React, {Node} from 'react';
import {bemlds} from 'utils';
import {sharedClass} from 'utils/className';

import './avatar.scss';

const block = bemlds('avatar');

const DefaultProps = {
  firstName: 'avatar',
  lastName: '',
  className: '',
  size: 'small',
};

type PropType = {
  img: string,
  firstName?: string,
  lastName?: string,
  className?: string,
  size?: 'small' | 'medium'
};

const getInitials = (firstName: string, lastName: string): string => (
  (firstName && lastName)
    ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
    : `${firstName.charAt(0).toUpperCase()}${firstName.charAt(1).toUpperCase()}`
);

const Avatar = (props: PropType): Node => {
  const {
    img,
    firstName,
    lastName,
    className,
    size,
  } = props;

  const mainClass = sharedClass(block({ [size]: true }), className);

  const showInitialsVersion = !img && (firstName || lastName);

  return (
    <div className={mainClass}>
      {
        img && (
        <img
          className={block('img')}
          src={img}
          title={`${firstName} ${lastName}`}
          alt={`${firstName} ${lastName}`}
        />
        )
      }
      {
        showInitialsVersion && (
        <p className={block('text')}>
          {getInitials(firstName, lastName)}
        </p>
        )
      }
    </div>
  );
};

Avatar.defaultProps = DefaultProps;

export default Avatar;
