import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Button, Form } from 'antd';
import Modal from 'components/feedback/modal';
import ImageUploader from 'components/ImageUploader';
import { RenderInput } from 'components/formElements';
import LinkItems from 'containers/AssetTeams/linksInput';
import emptyImg from 'assets/images/avatar.jpg';
import { CreateModalWrapper } from './createModal.style';

const FormItem = Form.Item;
const defaultLinks = [{
  title: '',
  uri: '',
}];

class CreateModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linkErrors: {},
      links: defaultLinks,
    };
  }

  componentWillMount() {
    const { editableItem } = this.props;

    if (editableItem) {
      this.setAdditionalFields(editableItem);
    }
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentDidUpdate(prevProps) {
    const { editableItem } = prevProps;
    const { editableItem: currentEditableItem } = this.props;
    const isEqual = _.isEqual(editableItem, currentEditableItem);

    if (currentEditableItem && !isEqual) {
      this.setAdditionalFields(currentEditableItem);
    }
  }

  componentWillUnmount() {
    this.props.onRef(null);
  }

  setAdditionalFields = (editableItem) => {
    const { links, avatarUri } = editableItem;

    this.setState({
      links: links || defaultLinks,
      avatarUri: avatarUri || null,
    });
  };

  onChange = (event, itemName) => {
    const { form } = this.props;
    const { setFieldsValue } = form;
    const value = event.target ? event.target.value : event;

    setFieldsValue({
      [itemName]: value,
    });
  };

  onChangeImage = (uri) => {
    this.setState({ avatarUri: uri });
  };

  addLink = () => {
    const { links } = this.state;
    const newItem = {
      title: '',
      uri: '',
    };
    this.setState({
      links: [...links, ...[newItem]],
    });
  };

  changeLink = (event, inputIndex, itemType) => {
    const { links } = this.state;
    const { value } = event.target;
    const { id } = event.target;
    const updatedLinks = links.map((link, index) => ({
      ...links[index],
      ...(index === inputIndex && { [itemType]: value }),
      ...((index === inputIndex && id) && { id }),
    }));

    this.setState({ links: updatedLinks });
  };

  removeLink = (inputIndex) => {
    const { links } = this.state;
    _.remove(links, (link, index) => index === inputIndex);
    this.setState({ links });
  };

  filterLinks = links => links.filter(link => link.title && link.uri);

  checkValidation = () => {
    const { linkErrors } = this.state;
    const linkError = _.find(linkErrors, link => link);

    return !linkError;
  };

  onSubmit = async (form, additionalFields) => {
    const { onSubmit } = this.props;

    if (this.checkValidation()) {
      onSubmit(form, additionalFields);
    }
  };

  setValidation = async (error, index) => {
    const { linkErrors: currentErrors } = this.state;
    const isEqual = _.isEqual(currentErrors[index], error);

    if (!isEqual) {
      await this.setState({
        linkErrors: {
          ...currentErrors,
          [index]: error,
        },
      });
    }
  };

  render() {
    const {
      visible,
      onCancel,
      form,
      editableItem,
    } = this.props;

    const { links, avatarUri } = this.state;
    const { getFieldDecorator } = form;
    const editProps = {
      editableItem,
      onChange: this.onChange,
      getFieldDecorator,
    };
    const linkProps = {
      links,
      getFieldDecorator,
      editableItem: {},
      onlyPlaceholder: true,
      onChange: this.changeLink,
      onRemove: this.removeLink,
      required: false,
    };

    const additionalFields = {
      ...((editableItem && editableItem.id) && { id: editableItem.id }),
      ...(links && { links: this.filterLinks(links) }),
      ...(avatarUri && { avatarUri }),
    };

    return (
      <Modal
        title=""
        visible={visible}
        onOk={() => this.onSubmit(form, additionalFields)}
        onCancel={onCancel}
        okText="OK"
        cancelText="Cancel"
      >
        <CreateModalWrapper>
          <div className="membersForm">
            <ImageUploader
              src={avatarUri || emptyImg}
              folder="assetTeam"
              sizeValidation={10000000}
              onChange={url => this.onChangeImage(url)}
            />
            <RenderInput title="Full Name" itemName="name" min={1} {...editProps} />
            <LinkItems {...linkProps} setValidation={this.setValidation} />
            <FormItem>
              <Button type="dashed" onClick={this.addLink}>
                <Icon type="plus" />
                {' '}
                Add field
              </Button>
            </FormItem>
          </div>
        </CreateModalWrapper>
      </Modal>
    );
  }
}

const WrappedDirectoryForm = Form.create()(CreateModal);
export default WrappedDirectoryForm;
