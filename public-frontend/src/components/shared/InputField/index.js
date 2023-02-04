// @flow
import React from 'react';
import block from 'utils/bem';
import './input-field.scss';
import {
  TERM_SHARED,
} from 'localise';
import {sharedClass} from 'utils/className';

const input = block('input');
const inputField = block('input-field');

const DefaultProps = {
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  error: false,
  errorMessage: '',
  type: 'text',
  required: false,
  className: '',
  inputClassName: '',
};

type PropsType = {
    title: string,
    id: number,
    placeholder?: string,
    onChange?: object,
    onBlur?: object,
    value: string,
    error?: boolean,
    errorMessage?: string,
    type?: string,
    required?: boolean,
    className?: string,
    inputClassName?: string
};


const InputField = (props: PropsType): Node => {
  const {
    title,
    id,
    placeholder,
    onChange,
    onBlur,
    value,
    error,
    errorMessage,
    type,
    required,
    className,
    inputClassName,
  } = props;

  const fieldClass = sharedClass(inputField(), className);
  const inputClass = sharedClass(
    inputField('input'),
    input(error ? {error: true} : null),
    inputClassName,
  );

  const Input = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={fieldClass}>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <label htmlFor={id}>
        <div className={inputField('title')}>
          <p className={inputField('text')}>
            {title}
          </p>
          {required ? <p className={inputField('blue-star')}>*</p>
            : <p className={inputField('optional')}>{`- ${TERM_SHARED.optional}`}</p>}
        </div>

        <Input
          id={id}
          className={inputClass}
          type={type}
          placeholder={placeholder}
          name={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        />

        {error ? (<p className={inputField('error')}>{errorMessage}</p>) : null}
      </label>
    </div>
  );
};


InputField.defaultProps = DefaultProps;

export default InputField;
