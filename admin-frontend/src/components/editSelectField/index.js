import React from 'react';
import SelectCell from 'components/tables/selectCell';
import Tooltip from 'components/uielements/tooltip';
import constants from 'helpers/constants';
import { EditSelectWrapper } from './editSelectedField.style';

const EditSelectField = (
  field,
  data,
  onInputChange,
  useBoolView,
  turnOver = false,
  rightSideAction,
) => (status, record, index) => {
  const { tickerSymbol } = record;
  const disabled = tickerSymbol === 'BTC' || tickerSymbol === 'USD';

  return (
    <EditSelectWrapper>
      <SelectCell
        index={index}
        columnsKey={field}
        value={!turnOver ? status : !status}
        onChange={onInputChange}
        data={constants[data]}
        useBoolView={useBoolView}
        disabled={disabled}
      />
      {rightSideAction && !status && (
        <Tooltip title="Resend confirmation">
          <i onClick={() => rightSideAction(record.id)} className="ion-android-mail rightSideIcon" />
        </Tooltip>
      )}
    </EditSelectWrapper>
  );
};

export default EditSelectField;
