import React from 'react';
import { EditableCell } from 'components/tables/helperCells';

const EditField = (field, onInputChange, validate, isNumber) => (name, record, index) => {

  if (name) {
    return (
      <EditableCell
        index={index}
        columnsKey={name}
        value={name}
        onChange={value => onInputChange(value, field, index)}
        validate={validate === undefined ? true : validate}
        fieldName={field}
        isNumber={isNumber}
      />
    );
  }
};

export default EditField;
