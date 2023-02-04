import React from 'react';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  idLabel: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
};

const defaultProps = {
  id: '',
  value: '',
  placeholder: '',
  name: '',
  onChange: () => null,
  idLabel: '',
  error: '',
  className: '',
  onFocus: () => null,
  onBlur: () => null,
  disabled: false,
};

const b = bemlds('custom-text-input');

const CustomTextInput = ({
  value,
  placeholder,
  name,
  onChange,
  idLabel,
  error,
  className,
  onFocus,
  onBlur,
  disabled,
}) => (
  <div className={`${b()} ${className}`}>
    {idLabel && (
      <div className={b('title')}>
        <IntlMessages id={idLabel} />
      </div>
    )}
    <input
      className={b('input', { error: Boolean(error) })}
      type="text"
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
    />
    <p className={b('input-error')}>{error}</p>
  </div>
);

CustomTextInput.propTypes = propTypes;
CustomTextInput.defaultProps = defaultProps;
export default CustomTextInput;
