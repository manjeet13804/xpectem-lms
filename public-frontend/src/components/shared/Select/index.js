// @flow

import React from 'react';
import Select from 'react-select';
import block from 'utils/bem';
import CustomArrow from './components';


import './select.scss';

const bem = block('select');

const DefaultProps = {
  placeholder: '',
  styles: '',
  isMulti: false,
};

type PropsType = {
    options: Array<object>,
    handleChange: object,
    selectedOption: object,
    placeholder?: string,
    styles?: string,
    isMulti?: boolean
};

function Selector(props: PropsType): Node {
  const {
    styles,
    options,
    handleChange,
    selectedOption,
    placeholder,
    isMulti,
  } = props;
  return (
    <Select
      components={{DropdownIndicator: CustomArrow}}
      value={selectedOption}
      onChange={handleChange}
      isMulti={isMulti}
      options={options}
      className={styles}
      placeholder={placeholder}
      closeMenuOnSelect
      classNamePrefix={`${bem()}`}
    />
  );
}

Selector.defaultProps = DefaultProps;

export default Selector;
