import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { inputWrap } from './decorator';

class RenderTextArea extends Component {
  constructor(props) {
    super(props);
    this.inputWrap = inputWrap(this.input());
  }

  input = () => {
    const {
      title,
      itemName,
      size,
      onChange,
      rows,
    } = this.props;

    const { TextArea } = Input;

    return (
      <TextArea
        rows={rows}
        name={itemName}
        placeholder={title}
        onChange={event => onChange(event, itemName)}
        className="formInput"
        size={size}
      />
    );
  };

  render() {
    const InputWrap = this.inputWrap;

    return <InputWrap {...this.props} input={this.input()} />;
  }
}

RenderTextArea.defaultProps = {
  title: '',
  itemName: '',
  size: 'default',
  onChange: null,
  isPass: false,
  rows: 5,
};

RenderTextArea.propTypes = {
  title: PropTypes.string,
  itemName: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isPass: PropTypes.bool,
  rows: PropTypes.number,
};

export default RenderTextArea;
