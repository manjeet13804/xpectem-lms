import React from 'react';
import ReactSelect from 'react-select';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';

const b = bemlds('custom-select');

const defaultProps = {
  className: '',
  placeholder: 'Select...',
  instanceId: '',
  options: [],
  value: null,
  onChange: () => {},
};

const propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  instanceId: PropTypes.string,
  options: PropTypes.arr,
  value: PropTypes.obj,
  onChange: PropTypes.func,
};

const CustomSelect = (props) => {
  const {
    options,
    className,
    onChange,
    placeholder,
    instanceId,
    value,
  } = props;

  const components = {
    IndicatorSeparator: null,
  };

  return (
    <div className={b({ mix: className })}>
      <ReactSelect
        options={options}
        className={b('select')}
        classNamePrefix={b('select')}
        onChange={onChange}
        components={components}
        placeholder={placeholder}
        instanceId={instanceId}
        value={value}
      />
    </div>
  );
};

CustomSelect.defaultProps = defaultProps;
CustomSelect.propTypes = propTypes;


export default CustomSelect;
