import React from 'react';
import block from 'utils/bem';
import {
  InputField,
  CloseIcon,
  PlusIcon,
} from 'components';

const bem = block('reg-link');

const MultipleInput = (props): React.FC => {
  const {
    items,
    title,
    id,
    placeholder,
    handleChange,
    handleDelete,
    handleAdd,
    addTitle,
    required,
    errorMessage,
  } = props;

  return (
    <div>
      {items.map((value: string, index: number): React.FC => (
        <div key={id} className={bem('content-inputs-container')}>
          <InputField
            id={id}
            type="input"
            className={block('input-wrapper')}
            inputClassName={bem('input')}
            title={title}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.SyntheticEvent): void => handleChange(e, index)}
            required={required && index === 0}
            error={errorMessage}
            errorMessage={errorMessage}
          />
          {index > 0 && (
          <button
            className={bem('content-inputs-button-delete')}
            onClick={() => handleDelete(id, index)}
          >
            <CloseIcon />
          </button>
          )}
        </div>
      ))}
      {items.length === 1 && (
      <button
        className={bem('content-inputs-button')}
        onClick={() => handleAdd(id)}
      >
        <div
          className={bem('content-inputs-button-add')}
        >
          <PlusIcon />
        </div>
        <div>{addTitle}</div>
      </button>
      )}
    </div>
  );
};

export default MultipleInput;
