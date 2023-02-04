import React from 'react';
import IntlMessages from 'components/utility/intlMessages';
import {
  bemlds,
} from 'utils';
import StyledComponent from './style';

const btn = bemlds('button');

const DefaultButton = ({
  disabled,
  onClick,
  textId,
  isDelete,
  isSubmit,
}) => (
  <StyledComponent>
    <button
      onClick={onClick}
      className={btn('add', { delete: isDelete })}
      disabled={disabled}
      type={isSubmit ? 'submit' : 'button'}
    >
      <IntlMessages id={textId} />
    </button>
  </StyledComponent>
);

export default DefaultButton;
