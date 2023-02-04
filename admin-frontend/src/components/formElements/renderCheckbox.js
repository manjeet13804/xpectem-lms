import React, { Component } from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { inputWrap } from './decorator';

class renderCheckbox extends Component {
  constructor(props) {
    super(props);
    this.inputWrap = inputWrap('checkBox');
  }

  input = () => {
    const {
      itemName,
      onChange,
      defaultValue,
      checkboxTitle,
    } = this.props;

    return (
      <Checkbox
        name={itemName}
        defaultChecked={defaultValue}
        onChange={event => onChange(event, itemName)}
        className="formInput"
      >
        {checkboxTitle}
      </Checkbox>
    );
  };

  render() {
    const InputWrap = this.inputWrap;

    return <InputWrap {...this.props} input={this.input()} />;
  }
}

renderCheckbox.defaultProps = {
  title: '',
  itemName: '',
  size: 'default',
  onChange: null,
  isPass: false,
};

renderCheckbox.propTypes = {
  title: PropTypes.string,
  itemName: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isPass: PropTypes.bool,
};

export default renderCheckbox;
