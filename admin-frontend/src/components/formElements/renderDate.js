import React, { Component } from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';
import constants from 'helpers/constants';
import { inputWrap } from './decorator';

const { dateAndTimeFormat } = constants;

class RenderDate extends Component {
  constructor(props) {
    super(props);
    this.inputWrap = inputWrap('date');
  }

  input = () => {
    const {
      itemName,
      onChange,
      showTime,
      disabled,
      allowClear,
      format,
      showToday,
    } = this.props;

    return (
      <DatePicker
        allowClear={allowClear}
        showTime={showTime ? showTime : true}
        onChange={date => onChange(date, itemName)}
        format={format || dateAndTimeFormat}
        className="formInput"
        disabled={disabled}
        showToday={showToday}
      />
    );
  };

  render() {
    const InputWrap = this.inputWrap;

    return <InputWrap {...this.props} input={this.input()} />;
  }
}

RenderDate.defaultProps = {
  itemName: '',
  onChange: null,
  allowClear: true,
  format: dateAndTimeFormat,
  showToday: false,
};

RenderDate.propTypes = {
  itemName: PropTypes.string,
  onChange: PropTypes.func,
  allowClear: PropTypes.bool,
  format: PropTypes.string,
  showToday: PropTypes.bool,
};

export default RenderDate;
