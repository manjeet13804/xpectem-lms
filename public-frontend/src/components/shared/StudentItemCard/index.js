// @flow
import React, { Node, Component } from 'react';
import block from 'utils/bem';
import { btnIcon, sharedClass } from 'utils/className';
import {
  MoreIcon,
  StatsContent,
  Avatar,
  Checkbox,
} from 'components';
import getRenderData from './utils';

import './student-item-card.scss';

const bem = block('student-item');

const DefaultProps = {
  data: {
    title: '',
    students: 0,
    courses: 0,
    active: 0,
  },
  className: '',
};

type PropType = {
  data?: object,
  className?: string,
  checked: boolean,
  toggleItem: (boolean, string) => void
};

type StateType = {
  isPopupOpen: boolean
};

class StudentItemCard extends Component <PropType, StateType> {
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
    const {
      data,
      className,
      toggleItem,
      checked,
    } = this.props;
    const {
      student,
      id,
      days,
      study,
      result,
    } = data;
    const {
      img,
      firstName,
      lastName,
    } = student;
    const name = (firstName && lastName)
      ? `${firstName} ${lastName}`
      : (firstName || lastName);
    const statsData = getRenderData(days, study, result);
    const mainClass = sharedClass(bem, className);

    return (
      <section className={mainClass} key={id}>
        <div className={bem('wrap')}>
          <Checkbox
            bem={bem}
            id={id}
            handleChange={toggleItem}
            checked={checked}
          />
          <Avatar
            img={img}
            lastName={lastName}
            firstName={firstName}
            className={bem('avatar')}
          />
          <p className={bem('name')}>{name}</p>
        </div>
        <StatsContent
          statsData={statsData}
          bem={bem}
        />
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
StudentItemCard.defaultProps = DefaultProps;
export default StudentItemCard;
