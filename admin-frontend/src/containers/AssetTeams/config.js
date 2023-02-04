import moment from 'moment';
import { Link } from 'react-router-dom';
import React from 'react';
import _ from 'lodash';
import { dateFormat } from 'helpers/utility';
import constants from 'helpers/constants';
import SelectCell from 'components/tables/selectCell';
import Button from 'components/uielements/button';
import notification from 'components/notification';

const fakeDate = moment();

const columns = ({
  filterDropdown,
  onCellChange,
  filterIcon,
  assetPath,
}) => (
  [
    {
      title: 'Symbol',
      dataIndex: 'tickerSymbol',
      rowKey: 'tickerSymbol',
      filterDropdown: filterDropdown('tickerSymbol'),
      filterIcon: filterIcon('tickerSymbol'),
      render: text => <span>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'title',
      rowKey: 'title',
      filterDropdown: filterDropdown('title'),
      filterIcon: filterIcon('title'),
      render: text => <span>{text}</span>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      rowKey: 'type',
      filters: constants.assets,
      filterMultiple: false,
      render: id => <span>{ _.find(constants.assets, { value: id }).text }</span>,
    },
    {
      title: 'External update',
      dataIndex: 'isUpdate',
      rowKey: 'isUpdate',
      filters: constants.statuses,
      filterMultiple: false,
      render: status => <span>{status ? 'Update' : 'Not update'}</span>,
    },
    {
      title: 'Update date',
      dataIndex: 'updateDate',
      rowKey: 'updateDate',
      render: date => (dateFormat(date)),
    },
    {
      title: 'Active',
      dataIndex: 'deleted',
      rowKey: 'deleted',
      width: '10%',
      filters: constants.statusesReverse,
      filterMultiple: false,
      render: (status, record, index) => (
        <SelectCell
          index={index}
          columnsKey="deleted"
          value={!status}
          onChange={onCellChange}
          data={constants.statuses}
          useBoolView
        />
      ),
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      render: (text, asset) => (
        <div className="isoAssetBtnView">
          <Link to={`${assetPath}/${asset.id}`}>
            <Button color="primary" className="assetViewBtn">
              Edit team
            </Button>
          </Link>
        </div>
      ),
    },
  ]
);

const rowSelection = ({
  onSetState, activateAssetTeam, deactivateAssetTeam, selected,
}) => ({
  hideDefaultSelections: true,
  selectedRowKeys: selected,
  onChange: (select) => {
    onSetState({ selected: select });
  },
  selections: [
    {
      key: 'activateAssetTeam',
      text: 'Activate assetTeam',
      onSelect: () => {
        if (selected.length > 0) {
          activateAssetTeam(selected);
          onSetState({ selected: [] });
          notification('success', `${selected.length} assetTeam activated`);
        }
      },
    },
    {
      key: 'deactivateAssetTeam',
      text: 'Deactivate assetTeam',
      onSelect: () => {
        if (selected.length > 0) {
          deactivateAssetTeam(selected);
          onSetState({ selected: [] });
          notification('error', `${selected.length} assetTeam deactivated`);
        }
      },
    },
  ],
  onSelection: select => onSetState({ selected: select }),
});

const fakeData = [
  {
    key: 1,
    id: 1,
    name: 'Alex',
    avatarUri: 'http://i.pravatar.cc/300?img=1',
    roleId: 1,
    position: 'Owner',
  },
  {
    key: 2,
    id: 2,
    name: 'Anna',
    avatarUri: 'http://i.pravatar.cc/300?img=2',
    roleId: 3,
    position: 'Manager',
  },
  {
    key: 3,
    id: 3,
    name: 'Dmitriy',
    avatarUri: 'http://i.pravatar.cc/300?img=3',
    roleId: 2,
    position: 'Manager',
  },
  {
    key: 4,
    id: 4,
    name: 'Stan',
    avatarUri: 'http://i.pravatar.cc/300?img=4',
    roleId: 5,
    position: 'Admin',
  },
  {
    key: 5,
    id: 5,
    name: 'Homer',
    avatarUri: 'http://i.pravatar.cc/300?img=5',
    roleId: 4,
    position: 'Owner',
  },
];
const newAssetTeam = {
  assetTeamName: '',
  role: 'assetTeam',
  isActive: true,
  isEmailConfirmed: false,
  registrationDate: fakeDate,
  email: '',
};

export {
  fakeData,
  newAssetTeam,
  columns,
  rowSelection,
};
