import React from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

const block = bemlds('avatar-with-name');

const defaultProps = {
  img: '',
  firstName: 'Name',
  lastName: 'Last Name',
  className: '',
};

const propTypes = {
  img: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
};

const AvatarWithName = ({
  className,
  img,
  firstName,
  lastName,
}) => {
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
        {`${firstName} ${lastName}`}
      </div>
    </div>
  );
};

AvatarWithName.defaultProps = defaultProps;
AvatarWithName.propTypes = propTypes;

export default AvatarWithName;
