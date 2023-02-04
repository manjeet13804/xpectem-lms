import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { inputWrap } from './decorator';

class RenderInput extends Component {
  constructor(props) {
    super(props);
    this.inputWrap = inputWrap('text-input');
  }

  getType = () => {
    const { isPass, isNumber } = this.props;
    if(isPass) return 'password'
    if(isNumber) return 'number'
    return 'text'
  }

  input = () => {
    const {
      title,
      itemName,
      size,
      onChange,
      onPressEnter,
      disabled,
      inputClass,
      mappedValue,
      validate,
      onBlur,
      placeholder,
      inputProps,
      notControlled,
    } = this.props;

    const type = this.getType()
    const value = notControlled ? { value: mappedValue } : null;

    return (
      <Input
        name={itemName}
        placeholder={placeholder || title}
        onChange={event => onChange(event, itemName)}
        onPressEnter={onPressEnter}
        className={`formInput ${inputClass}`}
        size={size}
        type={type}
        disabled={disabled}
        validate={validate}
        onBlur={onBlur}
        {...value}
        {...inputProps}
      />
    );
  };

  render() {
    const InputWrap = this.inputWrap;
    return <InputWrap {...this.props} input={this.input()} />;
  }
}

RenderInput.defaultProps = {
  title: '',
  itemName: '',
  size: 'default',
  onChange: null,
  isPass: false,
  isNumber: false,
  notControlled: true,
};

RenderInput.propTypes = {
  title: PropTypes.string,
  itemName: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isPass: PropTypes.bool,
  isNumber: PropTypes.bool,
  notControlled: PropTypes.bool,
};

export default RenderInput;
