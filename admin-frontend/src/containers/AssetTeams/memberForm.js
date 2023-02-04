import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Form, List } from 'antd';
import _ from 'lodash';
import assetActions from 'redux/assets/actions';
import assetTeamActions from 'redux/assetTeam/actions';
import { stringToBool, generateRequest } from 'helpers/utility';
import { RenderInput, RenderSelect } from 'components/formElements';
import CreateModal from 'containers/AssetTeams/createModal';
import IntlMessages from 'components/utility/intlMessages';
import Loader from 'components/utility/loader';
import Button from 'components/uielements/button';
import emptyImg from 'assets/images/avatar.jpg';
import { ContactCardWrapper } from 'components/contacts/contactCard.style';

const { Option } = Select;

class MembersForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 300,
      },
      createModalVisible: false,
    };
  }

  componentDidMount() {
    const { form } = this.props;
    this.getDirectory('team_roles');
    this.resetForm();
    form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    const { isUpdated } = nextProps;

    if (isUpdated) {
      this.setState({ createModalVisible: false });
    }
  }

  componentDidUpdate(prevProps) {
    const { selected, form } = this.props;
    const { selected: prevSelected } = prevProps;

    if (selected && selected !== prevSelected) {
      this.resetForm();
      form.validateFields();
    }
  }

  resetForm = () => {
    const { form } = this.props;
    const { resetFields } = form;

    resetFields();
  };

  getDirectory = (selected, searchValue) => {
    const { fetchDirectories } = this.props;
    const { pagination } = this.state;
    const searchText = { role: searchValue };
    const request = generateRequest({ searchText, paginationInfo: pagination });
    fetchDirectories(request, selected);
  };

  onChange = (event, itemName) => {
    if (event) {
      const value = event.target ? event.target.value : event;
      const editableItem = this.getValues();
      const {
        form: { setFieldsValue, getFieldsValue },
        changeMember,
      } = this.props;

      setFieldsValue({
        [itemName]: stringToBool(value),
      });

      const memberValues = getFieldsValue();

      changeMember({ memberValues, id: editableItem.id });
    }
  };

  getValues = (nextProps) => {
    const { team, selected } = nextProps || this.props;

    return _.find(team, item => item.id === selected);
  };

  renderDirectory = (type) => {
    const { directories } = this.props;

    if (directories[type]) {
      return directories[type].map(item => <Option key={item.id} value={item.id}>{item.role}</Option>);
    }

    return [];
  };

  renderLinks = links => (
    <List
      itemLayout="horizontal"
      dataSource={links}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={item.title}
            description={item.uri}
          />
        </List.Item>
      )}
    />
  );

  changeModalVisible = (value) => {
    this.memberForm.props.form.resetFields();
    this.setState({ createModalVisible: value });
  };

  render() {
    const { form, updateTeamMember } = this.props;
    const { createModalVisible } = this.state;
    const { getFieldDecorator } = form;
    const editableItem = this.getValues();

    if (!editableItem) {
      return <Loader />;
    }

    const { avatarUri, links } = editableItem;

    const editProps = {
      editableItem,
      onChange: this.onChange,
      getFieldDecorator,
    };

    return (
      <ContactCardWrapper className="isoContactCard">
        <Form className="isoContactCardHead">
          <div className="isoPersonImage">
            <img alt="#" src={avatarUri || emptyImg} />
            <Button onClick={() => this.changeModalVisible(true)} className="editMemberBtn">
              <span>Edit member</span>
            </Button>
          </div>
        </Form>
        <div className="isoContactInfoWrapper">
          <RenderInput title="Full Name" inputClass="textInput" itemName="name" disabled required={false} {...editProps} />
          {
            links && links.length
            && (
              <div>
                <div className="links-label">
                  <IntlMessages id="contactlist.linksLabel" />
                </div>
                { this.renderLinks(links) }
              </div>
            )
          }
          <RenderInput title="Position" itemName="position" {...editProps} />
          <RenderSelect
            title="Team role"
            placeholder="Select role"
            itemName="roleId"
            onSearch={value => this.getDirectory('team_roles', value)}
            options={this.renderDirectory('team_roles')}
            showSearch
            {...editProps}
          />
        </div>
        <CreateModal
          onRef={ref => (this.memberForm = ref)}
          editableItem={editableItem}
          visible={createModalVisible}
          onSubmit={updateTeamMember}
          onCancel={() => this.changeModalVisible(false)}
        />
      </ContactCardWrapper>
    );
  }
}
function mapStateToProps({ assets, assetTeam }) {
  const { isUpdated } = assetTeam;

  return {
    ...assets,
    ...assetTeam,
    isUpdated,
  };
}

const WrappedMembersForm = Form.create()(MembersForm);
export default connect(mapStateToProps, { ...assetActions, ...assetTeamActions })(WrappedMembersForm);
