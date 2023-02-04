// @flow
import React, { Node, Component } from 'react';
import block from 'utils/bem';
import { btnIcon, sharedClass } from 'utils/className';
import parseUserRole from 'utils/parseUserRole';
import {
  Avatar,
  MoreIcon,
} from 'components';

import './admin-item-card.scss';


const bem = block('admin-item');

type AvatarType = {
  img: string,
  role: string,
  firstName?: string | null,
  lastName?: string | null
};

const DefaultProps = {
  data: {
    img: null,
    role: '',
    firstName: null,
    lastName: null,
  },
  className: '',
};

type PropType = {
  data?: AvatarType,
  className?: string
};

type StateType = {
  isPopupOpen: boolean
};

class AdminItemCard extends Component <PropType, StateType> {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
    };
  }

  openPopup = () => {
    const { isPopupOpen } = this.state;
    this.setState({
      isPopupOpen: true,
    });
    console.log('Popup is open:', isPopupOpen);
  }

  render(): Node {
    const { data, className } = this.props;
    const {
      img,
      firstName,
      lastName,
      roles,
    } = data;

    const mainClass = sharedClass(bem, className);
    const name = (firstName && lastName)
      ? `${firstName} ${lastName}`
      : (firstName || lastName);
    return (
      <section className={mainClass}>
        <Avatar
          className={bem('avatar')}
          img={img}
          firstName={firstName}
          lastName={lastName}
        />
        <p className={bem('name')}>{ name && name }</p>
        <p className={bem('text')}>{roles && parseUserRole(roles)}</p>
        <button
          type="button"
          className={btnIcon(bem)}
          onClick={this.openPopup}
        >
          <MoreIcon />
        </button>
      </section>
    );
  }
}
AdminItemCard.defaultProps = DefaultProps;
export default AdminItemCard;
