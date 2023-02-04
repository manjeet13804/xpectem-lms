// @flow
import React from 'react';
import type { Node, SyntheticEvent} from 'react';
import block from 'utils/bem';
import { sharedClass, labelCheckbox } from 'utils/className';

const bemMain = block('checkbox');

const DefaultProps = {
  bem: () => {},
};

type PropsType = {
  id: string,
  bem?: (string | null) => string,
  handleChange: (string, boolean) => void,
  text: string
};

const RadioButton = (props: PropsType): Node => {
  const {
    id,
    bem,
    text,
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
        name="radio"
        type="radio"
        onChange={(e: SyntheticEvent): object => handleChange(e.target.id)}
      />
      <span className={customCheckClass} />
      <span className={textClass}>{text}</span>
    </label>
  );
};

RadioButton.defaultProps = DefaultProps;

export default RadioButton;
