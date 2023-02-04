import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const texts = {
  single: {
    title: 'Deleting news source',
    strongText: 'Do you really want to mark this news source as deleted?',
    normalText: 'Marking news source as deleted will mark all related news as deleted.',
  },
  many: {
    title: 'Deleting news sources',
    strongText: 'Do you really want to mark these news sources as deleted?',
    normalText: 'Marking news sources as deleted will mark all related news as deleted.',
  },
};

function DeleteModal({
  show, onOk, onCancel, type, okText,
}) {
  const { title, strongText, normalText } = texts[type];

  return (
    <Modal
      title={title}
      visible={show}
      okText={okText}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div style={{ textAlign: 'center' }}>
        { strongText ? <p><strong>{strongText}</strong></p> : null }
        { normalText ? <p style={{ marginTop: '10px' }}>{normalText}</p> : null }
      </div>
    </Modal>
  );
}

DeleteModal.defaultProps = {
  okText: 'Delete',
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['single', 'many']).isRequired,
  okText: PropTypes.string,
};

export default DeleteModal;
