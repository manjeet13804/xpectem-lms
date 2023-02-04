// @flow
import React, {Node} from 'react';
import ReactSelect from 'react-select';
import { bemlds } from 'utils';
import './style.scss';

const b = bemlds('custom-select');

type PropType = {
  className?: string,
  options?: object[],
  value?: object,
  onChange?: () => void,
  placeholder?: string,
  instanceId: string
};

const defaultProps = {
  className: '',
  placeholder: 'Select...',
  options: [],
  value: null,
  onChange: null,
};

const CustomSelect = (props: PropType): Node => {
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
    <div className={b({mix: className})}>
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

export default CustomSelect;
