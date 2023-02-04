import React, { Component } from 'react';
import { Switch } from 'antd';
import PropTypes from 'prop-types';
import { inputWrap } from './decorator';

class RenderSwitch extends Component {
  constructor(props) {
    super(props);
    this.inputWrap = inputWrap('switch');
  }

  input = () => {
    const {
      itemName,
      onChange,
      isPass,
      ...rest,
    } = this.props;
    return (
      <Switch
        name={itemName}
        defaultChecked={isPass}
        onChange={event => onChange(event, itemName)}
        className="formInput getInputConfigSwitchBox"
        {...rest}
      />
    );
  };

  render() {
    const InputWrap = this.inputWrap;
    return <InputWrap {...this.props} input={this.input()} />;
  }
}

RenderSwitch.defaultProps = {
  title: '',
  itemName: '',
  size: 'default',
  onChange: null,
  isPass: false,
};

RenderSwitch.propTypes = {
  title: PropTypes.string,
  itemName: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  isPass: PropTypes.bool,
};

export default RenderSwitch;
