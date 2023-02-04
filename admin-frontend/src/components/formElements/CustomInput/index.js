import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import CustomInputStyles from './styles';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  maxlength: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  isTouched: PropTypes.bool,
  isValid: PropTypes.bool,
};

const defaultProps = {
  className: '',
  type: 'text',
  placeholder: 'test',
  maxlength: '',
  name: null,
  value: null,
  onChange: null,
  error: '',
  isTouched: false,
  isValid: true,
};

const CustomInput = (props) => {
  const {
    name,
    className,
    onChange,
    placeholder,
    value,
    error,
    isTouched,
    isValid,
    type,
    maxlength,
    required,
    ...rest
  } = props;

  const prefix = required ? <span className='prefix'>*</span> : null;
  const showError = !isValid && isTouched;
  return (
    <CustomInputStyles>
      <label className={`label ${className}`}>
        <p className='labelText'>
          {prefix}
          <span>{name}</span>
        </p>
        <Input
          className={showError ? 'inputError': 'input'}
          type={type}
          onChange={onChange}
          name={name}
          placeholder={placeholder || name}
          required
          {...rest}
        />
        { showError && <div className='error'>{error}</div>}
      </label>
    </CustomInputStyles>
  );
};

CustomInput.propTypes = propTypes;
CustomInput.defaultProps = defaultProps;

export default CustomInput;
