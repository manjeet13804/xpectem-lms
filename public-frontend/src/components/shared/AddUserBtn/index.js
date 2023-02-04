// @flow
import React, { Node } from 'react';
import classNames from 'classnames/bind';
import block from 'utils/bem';

import { AddIcon } from 'components';

import './add-user.scss';

const bem = block('add-user');

type PropType = {
  clickHandler: () => void,
  text: string
};

const AddUserBtn = (props: PropType): Node => {
  const { text, clickHandler } = props;
  const btnClass = classNames([
    `${bem()}`,
    'btn',
    'btn--text',
    'btn--add',
  ]);
  return (
    <button
      className={btnClass}
      type="button"
      onClick={clickHandler}
    >
      <span className={bem('text')}>{text}</span>
      <AddIcon />
    </button>
  );
};
export default AddUserBtn;
