import React, { PureComponent } from 'react';
import {
  groupHeaderItems,
  groupTableData,
  orgAdminsHeaderItems,
  orgAdminsTableData,
  groupAdminsHeaderItems,
  groupAdminsTableData,
} from './data';
import { bemlds } from 'utils';
import TableWrapper from './table.style';

const b = bemlds('table');

const switchHeaderTemplate = type => {
  switch (type) {
    case 'GroupsImport':
      return groupHeaderItems;
    case '' +
    'GroupAdminsImport':
      return groupAdminsHeaderItems;
    case 'OrgAdminsImport':
      return orgAdminsHeaderItems;
    default:
      return null;
  }
};

const switchRowTemplate = type => {
  switch (type) {
    case 'GroupsImport':
      return groupTableData;
    case 'GroupAdminsImport':
      return groupAdminsTableData;
    case 'OrgAdminsImport':
      return orgAdminsTableData;
    default:
      return null;
  }
};

class Table extends PureComponent {
  render() {
    const { type } = this.props;

    return (
      <TableWrapper>
        <div className={b()}>
          <div className={b('row', { 'header': true })}>
            {switchHeaderTemplate(type).map((item, index) =>
              <div key={index} className={b('row-item')}>{item}</div>
            )}
          </div>
          {switchRowTemplate(type).map((item, index) =>
            <div key={index} className={b('row')}>
              {item.map( (row, index) => <div key={index} className={b('row-item')}>{row}</div>)}
            </div>
          )}
        </div>
      </TableWrapper>
    );
  }
}

export default Table;
