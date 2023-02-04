import React, { Component } from 'react';
import { Select, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import constants from 'helpers/constants';
import { boolToString, getInputConfig } from 'helpers/utility';
import classNames from 'classnames';
import Form from 'components/uielements/form';

const FormItem = Form.Item;

const { Option } = Select;

class RenderSelect extends Component {
  renderOptions = (type) => {
    const searchebleConst = constants[type];

    return searchebleConst.map(value => (
      <Option key={value.text} value={boolToString(value.value)}>
        {value.text}
      </Option>
    ));
  };

  input = () => {
    const {
      itemName,
      onChange,
      optionName,
      mode,
      options,
      onSearch,
      showSearch,
      placeholder,
      disabled,
    } = this.props;

    return (
      <Select
        name={itemName}
        className="formInput"
        onChange={event => onChange(event, itemName)}
        mode={mode}
        onSearch={onSearch}
        placeholder={placeholder}
        filterOption={false}
        showSearch={showSearch}
        disabled={disabled}
      >
        {options || this.renderOptions(optionName)}
      </Select>
    );
  };

  render() {
    const {
      title,
      itemName,
      getFieldDecorator,
      onlyPlaceholder,
      itemClass,
      validateStatus,
      help,
      onClear,
      disabled,
    } = this.props;

    const validationMessage = { validateStatus, help };
    const style = classNames({
      [itemClass]: itemClass,
      wideContent: true,
      withButton: typeof onClear === 'function',
    });

    return (
      <FormItem label={!onlyPlaceholder && title} className={style} {...validationMessage}>
        { getFieldDecorator(itemName, getInputConfig(this.props))(this.input()) }
        { onClear ? <Button className={disabled ? 'disabledButton' : null} onClick={() => (!disabled ? onClear(itemName) : null)}><Icon type="close" /></Button> : null}
      </FormItem>
    );
  }
}

RenderSelect.defaultProps = {
  title: '',
  itemName: '',
  getFieldDecorator: null,
  onlyPlaceholder: false,
  optionName: '',
  onChange: null,
  mode: 'default',
  options: null,
  onSearch: null,
  showSearch: false,
  placeholder: null,
  disabled: false,
  onClear: null,
};

RenderSelect.propTypes = {
  title: PropTypes.string,
  getFieldDecorator: PropTypes.func,
  onlyPlaceholder: PropTypes.bool,
  optionName: PropTypes.string,
  itemName: PropTypes.string,
  onChange: PropTypes.func,
  mode: PropTypes.string,
  options: PropTypes.array,
  onSearch: PropTypes.func,
  showSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  onClear: PropTypes.func,
};

export default RenderSelect;
