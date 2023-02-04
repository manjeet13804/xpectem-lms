import React from 'react';
import PropTypes from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import Modal from 'components/feedback/modal';

const deleteModal = ({
  multiple,
  visible,
  onSubmit,
  onCancel,
}) => (
  <Modal
    title={<IntlMessages id="news.titleDeactivate" />}
    visible={visible}
    onOk={onSubmit}
    onCancel={onCancel}
    okText="Delete"
    cancelText="Cancel"
  >
    <strong><IntlMessages id={multiple ? 'news.questionMany' : 'news.questionOne'} /></strong>
    <p><IntlMessages id="news.descDeactivate" /></p>
  </Modal>
);

deleteModal.defaultProps = {
  multiple: false,
  visible: false,
  onSubmit: null,
  onCancel: null,
};

deleteModal.propTypes = {
  multiple: PropTypes.bool,
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default deleteModal;
