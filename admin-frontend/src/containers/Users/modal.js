import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/feedback/modal';
import SingleUser from './singleUser';

class UserModal extends Component {
  constructor(props){
    super(props);
    this.ref = null;
  }

  createRef = (ref) => {
    this.ref = ref.current;
  }

  onOk = () => {
    const Form = this.ref;
    Form.submit();
  }

  onCancel = () => {
    const { onCancel } = this.props;
    const Form = this.ref;
    Form.reset();
    onCancel()
  }

  render() {
    const {
      visible,
      currentUser,
      userCreate,
      updateUser,
    } = this.props;
    const isNew = !currentUser;
    return (
      <Modal
        title={isNew ? 'Add user' : 'Edit User'}
        visible={visible}
        onOk={this.onOk}
        onCancel={this.onCancel}
        okText="Submit"
        cancelText="Cancel"
      >
        <SingleUser
          createRef={this.createRef}
          currentUser={currentUser}
          userCreate={userCreate}
          updateUser={updateUser}
        /> 
      </Modal>
    );
  }
}

UserModal.defaultProps = {
  currentUser: null,
  visible: false,
  onSubmit: null,
  onCancel: null,
};

UserModal.propTypes = {
  currentUser: PropTypes.shape({}),
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default UserModal;
