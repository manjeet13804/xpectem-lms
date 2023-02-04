// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import Avatar from '../Avatar';
import './styles.scss';

const block = bemlds('avatar-with-name');

const defaultProps = {
  firstName: 'Zhurin',
  lastName: 'Stas',
  className: '',
};

type PropType = {
    img: string,
    firstName?: string,
    lastName?: string,
    className?: string
};

const AvatarWithName = ({
  className,
  img,
  firstName,
  lastName,
}: PropType): Node => {
  const main = sharedClass(block(), className);

  return (
    <div className={main}>
      <Avatar
        img={img}
        size="medium"
        className={block('avatar')}
        firstName={firstName}
        lastName={lastName}
      />
      <div className={block('name')}>
        {firstName}
        {' '}
        {lastName}
      </div>
    </div>
  );
};

AvatarWithName.defaultProps = defaultProps;

export default AvatarWithName;
