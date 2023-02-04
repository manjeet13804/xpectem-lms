import React from 'react';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';

const TERM_SHARED = {
  optional: 'Optional',
};

const inputField = bemlds('text-area');


const DefaultProps = {
  title: '',
  value: '',
  id: '',
  placeholder: '',
  onChange: () => {},
  onBlur: () => {},
  error: false,
  errorMessage: '',
  type: 'text',
  required: false,
  inputClassName: '',
};

const propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  inputClassName: PropTypes.string,
};


const InputField = (props) => {
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
    inputClassName,
  } = props;

  const Input = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id}>
        <div className={inputField('title')}>
          <span className={inputField('text')}>
            {title}
          </span>
          {required ? <span className={inputField('blue-star')}>*</span>
            : <p className={inputField('optional')}>{`- ${TERM_SHARED.optional}`}</p>}
        </div>
        <Input
          id={id}
          className={inputClassName}
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
InputField.propTypes = propTypes;

export default InputField;
