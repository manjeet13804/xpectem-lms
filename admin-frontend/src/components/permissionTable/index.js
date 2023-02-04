import React from 'react';
import { ButtonGroup } from 'components';
import { bemlds } from 'utils';
import { TABLE_BUTTON_TYPE } from 'constants/constants';
import TableWrapper from './table.style';
import Check from './components/Check';
import DobleCheck from './components/DobleCheck';
import NoCheck from './components/NoCheck';

const b = bemlds('table');
const customcheck = bemlds('customcheck');

const createButton = (onClick, status, text) => {
  const selectButtonImage = () => {
    switch (status) {
      case TABLE_BUTTON_TYPE.noCheck:
        return (
          <div className={customcheck('container', { red: true })} role="button" onClick={onClick} tabIndex={0}>
            <NoCheck />
          </div>
        );
      case TABLE_BUTTON_TYPE.check:
        return (
          <div className={customcheck('container', { green: true })} role="button" onClick={onClick} tabIndex={0}>
            <Check />
          </div>
        );
      case TABLE_BUTTON_TYPE.dobleCheck:
        return (
          <div className={customcheck('container', { blue: true })} role="button" onClick={onClick} tabIndex={0}>
            <DobleCheck />
          </div>
        );
      default:
        return (
          <div className={customcheck('container', { none: true })} role="button" onClick={onClick} tabIndex={0} />
        );
    }
  };
  return (
    <div className={customcheck('', { all: text })}>
      { text && <p className={customcheck('text')}>{text}</p> }
      {selectButtonImage()}
    </div>
  );
};

const PermissionTable = (props) => {
  const {
    rowTitle,
    collTitle,
    tableData,
    changeTableData,
    collName,
    buttonTypes,
  } = props;

  const maxPermission = buttonTypes.length;

  const checkAllStatus = () => tableData.reduce((permissionId, row) => {
    if (row.permissionItems.every(coll => coll.permissionId === permissionId)) {
      return permissionId;
    }
    return 0;
  }, tableData[0].permissionItems[0].permissionId);

  const checkRowStatus = rowIndex => tableData[rowIndex].permissionItems.reduce((permissionId, coll) => {
    if (coll.permissionId === permissionId) {
      return permissionId;
    }
    return 0;
  }, tableData[rowIndex].permissionItems[0].permissionId);

  const checkCollStatus = collIndex => tableData.reduce((permissionId, row) => {
    if (row.permissionItems[collIndex].permissionId === permissionId) {
      return permissionId;
    }
    return 0;
  }, tableData[0].permissionItems[collIndex].permissionId);

  const handleChangeAll = () => {
    const statusNow = checkAllStatus();
    const newStatus = statusNow + 1 > maxPermission ? 1 : statusNow + 1;
    const newTableData = tableData.map(row => ({
      ...row,
      permissionItems: row.permissionItems.map(coll => ({ ...coll, permissionId: newStatus })),
    }));
    changeTableData(newTableData);
  };

  const handleChangeRow = (rowIndex) => {
    const statusNow = checkRowStatus(rowIndex);
    const newStatus = statusNow + 1 > maxPermission ? 1 : statusNow + 1;
    const newTableData = tableData.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          permissionItems: row.permissionItems.map(coll => ({ ...coll, permissionId: newStatus })),
        };
      }
      return row;
    });
    changeTableData(newTableData);
  };

  const handleChangeColl = (collIndex) => {
    const statusNow = checkCollStatus(collIndex);
    const newStatus = statusNow + 1 > maxPermission ? 1 : statusNow + 1;
    const newTableData = tableData.map(row => ({
      ...row,
      permissionItems: row.permissionItems.map((coll, index) => {
        if (index === collIndex) {
          return { ...coll, permissionId: newStatus };
        }
        return coll;
      }),
    }));
    changeTableData(newTableData);
  };

  const handleChangeElement = (buttonLabel, clickRowIndex, clickCollIndex) => {
    const changeType = (buttonLabel) => {
      if (buttonLabel === 'No Access') {
        return TABLE_BUTTON_TYPE.noCheck;
      }
      if (buttonLabel === 'Access') {
        return TABLE_BUTTON_TYPE.check;
      }
      if (buttonLabel === 'Access & Edit') {
        return TABLE_BUTTON_TYPE.dobleCheck;
      }
      return 1;
    };

    const newTableData = tableData.map((row, rowIndex) => {
      if (rowIndex === clickRowIndex) {
        return {
          ...row,
          permissionItems: row.permissionItems.map((coll, collIndex) => {
            if (collIndex === clickCollIndex) {
              return { ...coll, permissionId: changeType(buttonLabel) };
            }
            return coll;
          }),
        };
      }
      return row;
    });

    changeTableData(newTableData);
  };

  const createTopButtonRow = () => [
    <td className="row-button_fixed" />,
    <td className="all-button_fixed">
      {createButton(handleChangeAll, checkAllStatus(), 'Set all: ')}
    </td>,
    ...collTitle.map((coll, index) => <td>{createButton(() => handleChangeColl(index), checkCollStatus(index))}</td>),
  ];

  const createSecondRow = () => (
    <tr className="fixed-row__second">
      <td className="row-button_fixed" />
      <td className={b('title-combine', { mix: 'title_fixed' })}>
        <div className="title-combine">
          <span className="row-title">Courses</span>
          <span className="coll-title">{collName}</span>
        </div>
        <div className="title-combine-separator" />
      </td>
      {collTitle.map(el => <td className={b('title-coll')}>{el.text}</td>)}
    </tr>
  );

  const createRow = (row, rowIndex) => (
    <tr>
      <td className="row-button_fixed">{createButton(() => handleChangeRow(rowIndex), checkRowStatus(rowIndex))}</td>
      <td className={b('title-row', { mix: 'title_fixed' })}>
        {rowTitle[rowIndex].text}
      </td>
      {row.permissionItems.map((coll, collIndex) => (
        <td className={b('row-element', { gray: rowIndex % 2 })}>
          <ButtonGroup
            buttons={buttonTypes}
            permission={coll.permissionId}
            id={coll.id}
            doSomethingAfterClick={buttonLabel => handleChangeElement(buttonLabel, rowIndex, collIndex)}
          />
        </td>
      ))}
    </tr>
  );

  return (
    <TableWrapper>
      <table className={b()}>
        <tbody className={b('body')}>
          <tr className="fixed-row__top">{createTopButtonRow()}</tr>
          {createSecondRow()}
          {tableData.map((row, i) => createRow(row, i))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default PermissionTable;
