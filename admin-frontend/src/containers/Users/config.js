import React from 'react';
import { timeFormat, dateFormat } from 'helpers/utility';
import Button from 'components/uielements/button';
import DeleteButton from 'components/contacts/deleteButton';
import EditSelectField from 'components/editSelectField';

const localDataName = 'mateUser';

const columns = ({
  changeRole,
  onDelete,
  onReset,
  getUsers,
  editUser,
}) => ([
  {
    title: 'Username',
    dataIndex: 'name',
    rowKey: 'username',
    width: '8%',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    rowKey: 'email',
    width: '8%',
    render: text => <span>{text}</span>,
  },
  {
    title: 'Registration date',
    dataIndex: 'addedAt',
    rowKey: 'addedAt',
    width: '8%',
    render: text => (
      <div>
        <p>{dateFormat(text)}</p>
        <p>{timeFormat(text)}</p>
      </div>
    ),
  },
  {
    title: 'Update date',
    dataIndex: 'updatedAt',
    rowKey: 'updatedAt',
    width: '8%',
    render: text => (
      <div>
        <p>{dateFormat(text)}</p>
        <p>{timeFormat(text)}</p>
      </div>
    ),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    rowKey: 'role',
    width: '10%',
    render: EditSelectField('role', 'roles', changeRole),
  },
  {
    title: 'Email confirmed',
    dataIndex: 'isEmailConfirmed',
    rowKey: 'isEmailConfirmed',
    width: '10%',
    render: EditSelectField(
      'isEmailConfirmed',
      'emailConfirmed',
      changeRole,
      true,
      null,
    ),
  },
  {
    title: 'Reset password',
    dataIndex: '',
    rowKey: 'reset',
    width: '10%',
    render: user => (
      <div className="isoEventBtnView">
        <Button color="primary"
          onClick={() => {
            onReset(user.email);
            getUsers();
          }}>
          Reset
        </Button>
      </div>
    )
  },
  {
    title: 'Actions',
    dataIndex: '',
    rowKey: 'actions',
    width: '16%',
    render: user => (
      <div className="isoEventBtnView">
        <Button icon="edit" color="primary" className="editBtn" onClick={editUser(user.id)}/>
        <DeleteButton color="primary"
          member={{ name: 'user', id: user.id }}
          deleteMember={onDelete}
        >
        </DeleteButton>
      </div>
    ),
  },
]);

export {
  localDataName,
  columns,
};
