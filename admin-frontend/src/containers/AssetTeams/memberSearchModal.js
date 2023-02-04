import React, { Component } from 'react';
import { Form, Select } from 'antd';
import Modal from 'components/feedback/modal';
import constants from 'helpers/constants';
import { RenderSelect } from 'components/formElements';
import { CreateModalWrapper } from './createModal.style';

const { Option } = Select;

class MemberSearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 50,
      },
    };
  }

  onChange = (event, itemName) => {
    const { form } = this.props;
    const { setFieldsValue } = form;
    const value = event.target ? event.target.value : event;

    setFieldsValue({
      [itemName]: value,
    });
  };

  renderMembers = () => {
    const { searchResult } = this.props;

    if (searchResult) {
      return searchResult.map(value => <Option key={value.id} value={value.id}>{value.name}</Option>);
    }

    return [];
  };

  render() {
    const {
      visible,
      onSubmit,
      onCancel,
      form,
      onSearch,
      alreadyExist,
    } = this.props;

    const { teamMemberErrors } = constants;
    const { getFieldDecorator } = form;
    const editProps = {
      onChange: this.onChange,
      getFieldDecorator,
      ...(alreadyExist && {
        validateStatus: 'error',
        help: teamMemberErrors.memberExist,
      }),
    };

    return (
      <Modal
        title=""
        visible={visible}
        onOk={() => onSubmit(form)}
        onCancel={onCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <CreateModalWrapper>
          <div className="membersForm">
            <RenderSelect
              title="Member search"
              placeholder="Select member"
              itemName="assetMember"
              onSearch={onSearch}
              options={this.renderMembers()}
              showSearch
              {...editProps}
            />
          </div>
        </CreateModalWrapper>
      </Modal>
    );
  }
}

const WrappedDirectoryForm = Form.create()(MemberSearchModal);
export default WrappedDirectoryForm;
