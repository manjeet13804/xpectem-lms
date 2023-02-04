import React, { Component } from 'react';
import Form from 'components/uielements/form';
import { stringToBool, validateUrl } from 'helpers/utility';
import ImageUploader from 'components/ImageUploader';
import constants from 'helpers/constants';
import { Select } from 'antd';
import { RenderInput, RenderSelect } from 'components/formElements/index';
import propTypes from './propTypes';
import defaultProps from './defaultProps';

class LinkForm extends Component {
  componentDidMount() {
    const { onRef } = this.props;
    onRef(this);
  }

  componentWillUnmount() {
    const { onRef } = this.props;
    onRef(null);
  }

  onSave = () => {
    const {
      form: { validateFields, getFieldsValue },
      editableLink,
      match,
      isNew,
    } = this.props;

    validateFields((err) => {
      if (!err) {
        const {
          imageUri,
          groupId,
          id,
          title,
          uri,
        } = editableLink;

        const values = {
          imageUri,
          groupId,
          title,
          uri,
          ...getFieldsValue(),
        };

        if (isNew()) {
          const { id: ownerId } = match.params;
          this.createLink(values, ownerId);
        } else {
          this.updateLink(values, id);
        }
      }
    });
  };

  createLink = (values, ownerId) => {
    const { actions: { createLink, createLinkNew }, isNewOwner } = this.props;

    if (isNewOwner) { createLinkNew(values); } else { createLink(values, ownerId); }
  };

  updateLink = (values, id) => {
    const {
      actions: { updateLink, updateLinkNew },
      isNewOwner,
    } = this.props;

    if (isNewOwner) {
      updateLinkNew(values, id);
    } else {
      updateLink({ links: [{ ...values, id }] });
    }
  };

  onChange = (event, itemName) => {
    const { form, onStatusChange } = this.props;
    const { setFieldsValue, getFieldsValue } = form;
    const value = event.target ? event.target.value : event;

    setFieldsValue({
      [itemName]: itemName === 'isDeleted' ? !stringToBool(value) : stringToBool(value),
    });

    const params = {
      ...getFieldsValue(),
    };

    if (params.isActive && typeof params.isActive === 'string') {
      params.isActive = params.isActive === 'true';
    }

    if (params.isOfficial && typeof params.isOfficial === 'string') {
      params.isOfficial = params.isOfficial === 'true';
    }

    if (itemName === 'isDeleted') {
      onStatusChange(true);
    }
  };

  onChangeImage = (url, field) => {
    const { actions: { editLink } } = this.props;
    editLink({ [field]: url });
  };

  renderOptions = () => {
    const { linkGroups } = this.props;
    const groups = linkGroups || linkGroups.length ? linkGroups : [];
    const formattedGroups = groups.map(group => ({ text: group.name, value: group.id }));

    return formattedGroups.map(({ text, value }) => (
      <Select.Option key={value} value={value}>
        {text}
      </Select.Option>
    ));
  };

  onDeleteImage = () => {
    const { actions: { editLink } } = this.props;
    editLink({ imageUri: '' });
  };

  render() {
    const {
      form: { getFieldDecorator },
      changeLoading,
      editableLink,
      isNew,
    } = this.props;

    const { linkErrors, linkPlaceholders } = constants;

    const editProps = {
      editableItem: isNew() ? {} : editableLink,
      onChange: this.onChange,
      getFieldDecorator,
    };

    return (
      <Form onSubmit={this.onSave} className="linkForm">
        <div className="Information">
          <div className="LeftSideContent">
            <div className="FormContainer">
              <RenderInput
                title="Source text"
                required
                itemName="title"
                {...editProps}
              />
            </div>
            <div className="FormContainer">
              <RenderInput
                title="Source link"
                required
                validator={validateUrl}
                max={255}
                placeholder={linkPlaceholders.sourcePlaceholder}
                itemName="uri"
                message={linkErrors.source}
                {...editProps}
              />
            </div>
            <div className="FormContainer">
              <RenderSelect
                required
                title="Link group"
                itemName="groupId"
                options={this.renderOptions()}
                {...editProps}
              />
            </div>
          </div>
          <div className="RightSideContent">
            <div className="FormContainer">
              <Form.Item label="Icon" className="wideContent">
                <ImageUploader
                  src={editProps.editableItem.imageUri}
                  folder="link"
                  sizeValidation={1000000}
                  onChange={url => this.onChangeImage(url, 'imageUri')}
                  changeUploadStatus={changeLoading}
                  onDelete={this.onDeleteImage}
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

LinkForm.defaultProps = defaultProps;
LinkForm.propTypes = propTypes;

const WrappedLinkForm = Form.create()(LinkForm);
export default WrappedLinkForm;
