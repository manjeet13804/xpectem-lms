import React from 'react';
import { bemlds } from 'utils';
import { sharedClass } from 'utils/className';
import PropTypes from 'prop-types';

const block = bemlds('avatar-with-name');

const DefaultProps = {
  img: '',
  firstName: 'avatar',
  lastName: '',
  className: '',
  size: 'small',
};

const propTypes = {
  img: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
};

const getInitials = (firstName, lastName) => (
  (firstName && lastName)
    ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
    : `${firstName.charAt(0).toUpperCase()}${firstName.charAt(1).toUpperCase()}`
);

const Avatar = (props) => {
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
Avatar.propTypes = propTypes;


export default Avatar;
