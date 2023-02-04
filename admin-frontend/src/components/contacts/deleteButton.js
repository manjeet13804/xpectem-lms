import React from 'react';
import PropTypes from 'prop-types';
import Popconfirm from 'components/feedback/popconfirm';
import Button from 'components/uielements/button';
import notification from 'components/notification';

const DeleteButton = (props) => {
  const { member: { name, id }, deleteMember } = props;

  return (
    <Popconfirm
      title={`Sure to delete ${name}?`}
      okText="Delete"
      cancelText="No"
      onConfirm={() => {
        notification('success', `${name} has been deleted`, '');
        deleteMember(id);
      }}
    >
      <Button icon="delete" type="button" className="isoDeleteBtn" />
    </Popconfirm>
  );
};

DeleteButton.defaultProps = {
  member: {},
  deleteMember: null,
};

DeleteButton.propTypes = {
  member: PropTypes.object,
  deleteMember: PropTypes.func,
};

export default DeleteButton;
