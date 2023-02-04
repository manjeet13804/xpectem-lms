import './styles.scss';

import { TitleAndInput } from 'components';
import PropTypes from 'prop-types';
import React from 'react';
import { bemlds } from 'utils';

const b = bemlds('custom-input-range-max-value-set');

const propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  nameInput: PropTypes.string,
  onChangeInput: PropTypes.func,
  onChangeRangeInput: PropTypes.func,
  valueInput: PropTypes.number,
  valueRangeInput: PropTypes.number,
  nameRangeInput: PropTypes.string,
  disabledInput: PropTypes.bool,
  onBlurInput: PropTypes.func,
  onFocusInput: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  className: '',
  title: '',
  nameInput: '',
  onChangeInput: () => null,
  onChangeRangeInput: () => null,
  onBlurInput: () => null,
  valueInput: 1,
  valueRangeInput: 1,
  nameRangeInput: '',
  disabledInput: false,
  onFocusInput: () => null,
  disabled: false,
};

const CustomInputRangeMaxValueSet = ({
  className,
  title,
  nameInput,
  onChangeInput,
  onChangeRangeInput,
  valueInput,
  valueRangeInput,
  nameRangeInput,
  disabledInput,
  onBlurInput,
  onFocusInput,
  disabled,
}) => (
  <div className={b({ mix: className })}>
    {title && <p className={b('title')}>{title}</p>}
    <div className={b('content')}>
      <div className={b('input-wrapper')}>
        <TitleAndInput
          wrapperClassName={b('input')}
          handleChangeValue={onChangeInput}
          name={nameInput}
          value={valueInput}
          disabled={disabled}
          onBlur={onBlurInput}
          onFocus={onFocusInput}
        />
      </div>
    </div>
  </div>
);
CustomInputRangeMaxValueSet.defaultProps = defaultProps;
CustomInputRangeMaxValueSet.propTypes = propTypes;
export default CustomInputRangeMaxValueSet;
