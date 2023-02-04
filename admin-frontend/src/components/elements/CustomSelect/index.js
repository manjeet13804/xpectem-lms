import React from 'react';
import { Select } from 'antd';
import { bemlds } from 'utils';
import { PropTypes } from 'prop-types';

const { Option } = Select;
const elements = bemlds('elements');

const defaultProps = {
  options: [],
  value: '',
  isDisable: false,
  width: 160,
  handleChange: () => null,
};

const propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  isDisable: PropTypes.boolean,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
};

const CustomSelect = ({
  options,
  handleChange,
  value,
  isDisable,
  width,
}) => (
  <div className={elements('selects')}>
    <div className={elements('wrap-select')}>
      <Select
        id="accesCourse"
        className={elements('select-language')}
        style={{ width }}
        defaultValue={value}
        value={value}
        onChange={handleChange}
        disabled={isDisable}
      >
        {options.map(item => <Option key={item.name} value={item.value}>{item.name}</Option>)}
      </Select>
    </div>
  </div>
);

CustomSelect.propTypes = propTypes;
CustomSelect.defaultProps = defaultProps;

export default CustomSelect;
