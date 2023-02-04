// @flow
import React from 'react';
import type { Node } from 'react';
import block from 'utils/bem';
import { sharedClass, labelCheckbox } from 'utils/className';

const bemMain = block('checkbox');

const DefaultProps = {
  bem: () => {},
};

type PropsType = {
  id: string,
  checked: boolean,
  bem?: (string | null) => string,
  handleChange: (string) => void,
  text: string
};

const Checkbox = (props: PropsType): Node => {
  const {
    id,
    bem,
    text,
    checked,
    handleChange,
  } = props;

  const mainClass = sharedClass(bemMain(), bem('checkbox'));
  const textClass = sharedClass(bemMain('text'), bem('text'));
  const customCheckClass = sharedClass('checkbox', 'checkbox--custom');
  const labelClass = labelCheckbox(bem);

  return (
    <label htmlFor={id} className={labelClass}>
      <input
        id={id}
        className={mainClass}
        name={id}
        type="checkbox"
        onChange={(): void => handleChange(id)}
        checked={checked}
      />
      <span className={customCheckClass} />
      <span className={textClass}>{text}</span>
    </label>
  );
};

Checkbox.defaultProps = DefaultProps;

export default Checkbox;
