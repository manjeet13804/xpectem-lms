import { Link } from 'react-router-dom';
import { timeFormat, dateFormat } from 'helpers/utility';
import React from 'react';
import constants from 'helpers/constants';
import Button from 'components/uielements/button';
import EditSelectField from 'components/editSelectField';

const columns = ({
  filterDropdown,
  filterTypeahead,
  filterIcon,
  checkStatus,
  path,
  filterAssetIcon,
}) => ([
  {
    title: 'Title',
    dataIndex: 'title',
    rowKey: 'title',
    filterDropdown: filterDropdown('title'),
    filterIcon: filterIcon('title'),
    width: '15%',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Source link',
    dataIndex: 'uri',
    rowKey: 'uri',
    width: '15%',
    render: text => <a href={text} target="_blank" rel="noopener noreferrer" className="news__link">{text}</a>,
  },
  {
    title: 'Related assets',
    dataIndex: 'assets',
    rowKey: 'assets',
    filterDropdown: filterTypeahead('assets'),
    filterIcon: filterAssetIcon,
    width: '20%',
    render: (assets) => {
      if (!assets || assets.length === 0) return null;
      const AssetsList = assets.map(asset => <li className="news-assets__item" key={asset.id}><span>{asset.title}</span></li>);

      // eslint-disable-next-line consistent-return
      return (
        <ul className="news-assets">
          {AssetsList}
        </ul>
      );
    },
  },
  {
    title: 'Moonhub link',
    dataIndex: 'moonhubUri',
    rowKey: 'moonhubUri',
    width: '15%',
    render: text => <a href={text} target="_blank" rel="noopener noreferrer" className="news__link">{text}</a>,
  },
  {
    title: 'Publication date',
    dataIndex: 'sourcePublicationDate',
    rowKey: 'sourcePublicationDate',
    render: text => (
      <div>
        <p>{dateFormat(text)}</p>
        <p>{timeFormat(text)}</p>
      </div>
    ),
  },
  {
    title: 'Moonhub publication date',
    dataIndex: 'addedAt',
    rowKey: 'addedAt',
    render: text => (
      <div>
        <p>{dateFormat(text)}</p>
        <p>{timeFormat(text)}</p>
      </div>
    ),
  },
  {
    title: 'News source',
    dataIndex: 'sourceName',
    rowKey: 'sourceName',
    filterDropdown: filterDropdown('sourceName'),
    filterIcon: filterIcon('sourceName'),
    render: text => <span>{text}</span>,
  },
  {
    title: 'Active',
    dataIndex: 'isDeleted',
    rowKey: 'isDeleted',
    width: '10%',
    filters: constants.activeStatusesReverse,
    filterMultiple: false,
    render: EditSelectField(
      'isDeleted',
      'activeStatuses',
      checkStatus,
      true,
      true,
    ),
  },
  {
    title: '',
    dataIndex: 'view',
    rowKey: 'view',
    render: (text, news) => (
      <div className="isoNewsBtnView">
        <Link to={`${path}/edit/${news.id}`}>
          <Button color="primary" className="newsViewBtn">
            Edit
          </Button>
        </Link>
      </div>
    ),
  },
]);

const makeIfSelected = select => foo => (...args) => {
  if (select.length > 0) {
    foo(...args);
  }
};

const rowSelection = ({
  onSetState,
  selected,
  changeModalVisible,
  onActiveChangeMultiple,
}) => {
  const ifSelected = makeIfSelected(selected);

  return (
    {
      hideDefaultSelections: true,
      selectedRowKeys: selected,
      onChange: (select) => {
        onSetState({ selected: select });
      },
      selections: [
        {
          key: 'activateNews',
          text: 'Activate items',
          onSelect: ifSelected(() => {
            onActiveChangeMultiple(true);
          }),
        },
        {
          key: 'deactivateNews',
          text: 'Delete items',
          onSelect: ifSelected(() => {
            changeModalVisible(true);
          }),
        },
      ],
      onSelection: select => onSetState({ selected: select }),
    });
};

export {
  columns,
  rowSelection,
};
