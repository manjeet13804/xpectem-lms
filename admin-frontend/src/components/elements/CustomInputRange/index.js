import React from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import { bemlds } from 'utils';
import 'react-input-range/lib/css/index.css';
import './styles.scss';

const propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

const defaultProps = {
  minValue: 1,
  maxValue: 11,
  value: 1,
  onChange: () => null,
  name: '',
  disabled: false,
  className: '',
};

const b = bemlds('custom-input-range');

const CustomInputRange = ({
  minValue,
  maxValue,
  value,
  onChange,
  name,
  disabled,
  className,
 }) => (
   <div className={b({mix: className})}>
      <InputRange
        maxValue={maxValue}
        minValue={minValue}
        value={value}
        name={name}
        onChange={value => onChange({ target: { value, name }})}
        disabled={disabled}
      />
   </div>
);

CustomInputRange.propTypes = propTypes;
CustomInputRange.defaultProps = defaultProps;
export default CustomInputRange;