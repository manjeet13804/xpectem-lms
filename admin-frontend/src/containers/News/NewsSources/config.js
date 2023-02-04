import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/uielements/button';
import constants from 'helpers/constants';
import EditSelectField from 'components/editSelectField';
import notification from 'components/notification';

const columns = ({
  onCellChange,
  filterDropdown,
  filterIcon,
  path,
}) => (
  [
    {
      title: 'Name',
      dataIndex: 'name',
      rowKey: 'name',
      sorter: true,
      width: '20%',
      filterDropdown: filterDropdown('name'),
      filterIcon: filterIcon('name'),
      render: text => <span className="news__item">{text}</span>,
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      rowKey: 'domain',
      width: '20%',
      filterDropdown: filterDropdown('domain'),
      filterIcon: filterIcon('domain'),
      render: text => <a href={text} target="_blank" rel="noopener noreferrer" className="news-sources__link">{text}</a>,
    },
    {
      title: 'Source link',
      dataIndex: 'websiteUri',
      rowKey: 'websiteUri',
      width: '20%',
      render: text => <a href={text} target="_blank" rel="noopener noreferrer" className="news-sources__link">{text}</a>,
    },
    {
      title: 'Prioritization',
      dataIndex: 'isPrioritized',
      rowKey: 'isPrioritized',
      width: '10%',
      filters: constants.statuses,
      filterMultiple: false,
      render: EditSelectField(
        'isPrioritized',
        'statuses',
        onCellChange,
        true,
      ),
    },
    {
      title: 'Update',
      dataIndex: 'isActive',
      rowKey: 'isActive',
      width: '10%',
      filters: constants.updateStatuses,
      filterMultiple: false,
      render: EditSelectField(
        'isActive',
        'statuses',
        onCellChange,
        true,
      ),
    },
    {
      title: 'Active',
      dataIndex: 'isDeleted',
      rowKey: 'isDeleted',
      width: '10%',
      filters: constants.statusesReverse,
      filterMultiple: false,
      render: EditSelectField(
        'isDeleted',
        'deletedStatuses',
        onCellChange,
        true,
        true,
      ),
    },
    {
      title: '',
      dataIndex: 'edit',
      rowKey: 'edit',
      width: '10%',
      render: (text, source) => (
        <div className="isoSourceBtnView">
          <Link to={`${path}/edit/${source.id}`}>
            <Button color="primary" className="sourceViewBtn">
                Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ]
);

const rowSelection = ({
  selected,
  onSetState,
  toggleUpdateSource,
  toggleDeleteSource,
}) => ({
  hideDefaultSelections: true,
  selectedRowKeys: selected,
  onChange: (select) => {
    onSetState({ selected: select });
  },
  selections: [
    {
      key: 'activate',
      text: 'Enable update',
      onSelect: () => {
        if (selected.length > 0) {
          toggleUpdateSource({ update: true });
          onSetState({ selected: [] });
          notification('success', `${selected.length} sources activated`);
        }
      },
    },
    {
      key: 'deactivate',
      text: 'Disable update',
      onSelect: () => {
        if (selected.length > 0) {
          toggleUpdateSource({ update: false });
          onSetState({ selected: [] });
          notification('success', `${selected.length} sources deactivated`);
        }
      },
    },
    {
      key: 'restore',
      text: 'Activate items',
      onSelect: () => {
        if (selected.length > 0) {
          toggleDeleteSource({ isDeleted: false });
          onSetState({ selected: [] });
        }
      },
    },
    {
      key: 'delete',
      text: 'Delete items',
      onSelect: () => {
        if (selected.length > 0) {
          toggleDeleteSource({ isDeleted: true });
        }
      },
    },
  ],
});

export {
  columns,
  rowSelection,
};
