import React from 'react';
import Button from 'components/uielements/button';
import _ from 'lodash';

const columns = ({
  filterDropdown,
  filterIcon,
  linkGroups,
  groupOptions,
  onDelete,
  onEdit,
}) => (
  [
    {
      title: 'Image',
      dataIndex: 'imageUri',
      rowKey: 'imageUri',
      width: '10%',
      render: text => <img src={text} alt={text} height="30" />,
    },
    {
      title: 'Text',
      dataIndex: 'title',
      rowKey: 'title',
      filterDropdown: filterDropdown('title'),
      filterIcon: filterIcon('title'),
      sorter: true,
      render: text => <span>{text}</span>,
    },
    {
      title: 'Source link',
      dataIndex: 'uri',
      rowKey: 'uri',
      filterDropdown: filterDropdown('uri'),
      filterIcon: filterIcon('uri'),
      sorter: true,
      render: text => <a href={text} target="_blank" rel="noopener noreferrer" className="links__item">{text}</a>,
    },
    {
      title: 'Group',
      dataIndex: 'groupId',
      rowKey: 'groupId',
      filters: groupOptions(),
      filterMultiple: false,
      sorter: true,
      render: id => (
        <span>
          { id && !_.isEmpty(linkGroups) && linkGroups.find(group => group.id === id).name }
        </span>
      ),
    },
    {
      title: '',
      dataIndex: 'delete',
      rowKey: 'delete',
      width: '10%',
      render: (text, item) => (
        <div className="isoEventBtnView">
          <Button color="primary" onClick={() => onDelete(item.id)}>
            Delete
          </Button>
        </div>
      ),
    },
    {
      title: '',
      dataIndex: 'edit',
      rowKey: 'edit',
      width: '10%',
      render: (text, item) => (
        <div className="isoLinkBtnView">
          <Button onClick={() => onEdit(item.id)} color="primary" className="linkViewBtn">
              Edit
          </Button>
        </div>
      ),
    },
  ]
);

export {
  columns,
};
