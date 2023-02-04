// @flow
import React, {Node, SyntheticEvent} from 'react';
import { bemlds } from 'utils';
import './styles.scss';

const b = bemlds('custom-checkbox');

const DefaultProps = {
  className: '',
  checked: false,
};

type PropsType = {
  id: string,
  checked?: boolean,
  className?: string,
  handleChange: (string) => void,
  text: string
};

const CustomCheckbox = (props: PropsType): Node => {
  const {
    id,
    text,
    className,
    checked,
    handleChange,
  } = props;

  const onChange = (e: SyntheticEvent) => {
    handleChange(e);
  };

  return (
    <label htmlFor={id} className={b({mix: className})}>
      <input
        id={id}
        className={b('input')}
        name={id}
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      <span className={b('custom-element')} />
      <span className={b('text')}>{text}</span>
    </label>
  );
};

CustomCheckbox.defaultProps = DefaultProps;

export default CustomCheckbox;
