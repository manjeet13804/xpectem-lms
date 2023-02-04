// @flow
import React, { Node, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DEFAULT_USER_AVATAR } from 'constants/mock';
import { getUserProfile } from 'redux/selectors';
import { EDIT_PROFILE } from 'localise';
import { bemlds } from 'utils';
import { AddProfilePhoto } from 'components';
import editProfile from 'assets/images/editProfile.png';
import './syles.scss';

const { subtitle } = EDIT_PROFILE;

const b = bemlds('edit-profile-subheader');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  profileData: object
};

const EditProfileSubheader = ({className, profileData}: PropType): Node => {
  const [isShoePopup, shoePopup] = useState(false);

  const openPopup = () => {
    shoePopup(true);
  };

  const closePopup = () => {
    shoePopup(false);
  };

  const { avatar } = profileData;

  return (
    <section className={b({mix: className})}>
      <img className={b('background-image')} src={editProfile} alt="background" />
      <div className={b('user-block')}>
        <div className={b('photo-wrap')} role="button" tabIndex="0" onClick={openPopup}>
          <img className={b('user-photo')} src={avatar || DEFAULT_USER_AVATAR} alt="user" />
        </div>
        <span className={b('user-block-title')}>{subtitle}</span>
      </div>
      {isShoePopup && <AddProfilePhoto close={closePopup} />}
    </section>
  );
};

EditProfileSubheader.defaultProps = DefaultProps;

const mapStateToProps = (state: object): object => ({
  profileData: getUserProfile(state),
});


export default withRouter(
  connect(mapStateToProps, null)(EditProfileSubheader),
);
