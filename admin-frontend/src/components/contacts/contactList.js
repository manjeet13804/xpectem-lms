import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Popover } from 'antd';
import Button from 'components/uielements/button';
import IntlMessages from 'components/utility/intlMessages';
import { InputSearch } from 'components/uielements/input';
import Tags from 'components/uielements/tag';
import Scrollbar from 'components/utility/customScrollBar';
import CreateModal from 'containers/AssetTeams/createModal';
import MemberSearchModal from 'containers/AssetTeams/memberSearchModal';
import DeleteButton from './deleteButton';
import avatarPlaceholder from 'assets/images/avatar.jpg';
import assetTeamActions from 'redux/assetTeam/actions';
import { connect } from 'react-redux';
import { ContactListWrapper } from './contactList.style';
import TagWrapper from './tag.style';

const Tag = props => (
  <TagWrapper>
    <Tags {...props}>{props.children}</Tags>
  </TagWrapper>
);

function filterContacts(contacts, search) {
  search = search.toUpperCase();

  return search
    ? contacts.filter(contact => contact.name.toUpperCase().includes(search.trim()))
    : contacts;
}

class ContactList extends Component {
  creationModalVisible = (value) => {
    this.memberForm.props.form.resetFields();
    this.setState({
      createModalVisible: value,
      popoverVisible: false,
    });
  };

  memberSearchModalVisible = (value) => {
    const { onSearchMember } = this.props;

    onSearchMember(null, true);
    this.setState({
      memberSearchModalVisible: value,
      popoverVisible: false,
    });
  };

  addMemberContent = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button onClick={() => this.creationModalVisible(true)}>Create member</Button>
      <Button onClick={() => this.memberSearchModalVisible(true)} style={{ marginTop: '10px' }}>Add existing member</Button>
    </div>
  );

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      createModalVisible: false,
      memberSearchModalVisible: false,
      popoverVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isUpdated } = nextProps;

    if (isUpdated) {
      this.setState({ createModalVisible: false });
      this.setState({ memberSearchModalVisible: false });
    }
  }

  changePopoverVisible = (value) => {
    this.setState({ popoverVisible: value });
  };

  onChange = (event) => {
    this.setState({ search: event.target.value });
  };

  singleContact = (contact) => {
    const {
      selectedId,
      changeContact,
      deleteMember,
      validationErrors,
    } = this.props;
    const activeClass = selectedId === contact.id ? 'active' : '';
    const onChange = () => changeContact(contact.id);
    const errors = validationErrors && validationErrors.find(member => member.memberId === contact.id);

    return (
      <div
        key={contact.id}
        className={`${activeClass} isoSingleContact`}
        onClick={onChange}
      >
        <div className="isoAvatar">
          <img alt="avatar" src={contact.avatarUri || avatarPlaceholder} />
        </div>
        <div className="isoContactName">
          <h3>{contact.name ? contact.name : 'No Name'}</h3>
          {
            (errors && !!errors.count)
            && <Tag color="#f50">{errors.count}</Tag>
          }
        </div>
        <DeleteButton deleteMember={deleteMember} member={contact} />
      </div>
    );
  };

  handleVisibleChange = (visible) => {
    this.setState({ popoverVisible: visible });
  };

  render() {
    const {
      createTeamMember,
      onSearchMember,
      searchMembers,
      selectTeamMember,
      memberAlreadyExist,
    } = this.props;

    const {
      search,
      createModalVisible,
      memberSearchModalVisible,
      popoverVisible,
    } = this.state;

    const contacts = filterContacts(this.props.contacts, search);

    return (
      <ContactListWrapper className="isoContactListWrapper">
        <InputSearch
          placeholder={this.context.intl.formatMessage({
            id: 'contactlist.searchContacts',
          })}
          value={search}
          onChange={this.onChange}
          className="isoSearchBar"
        />
        <Popover
          placement="bottom"
          title="Add member"
          content={this.addMemberContent}
          trigger="click"
          visible={popoverVisible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button onClick={() => this.changePopoverVisible(true)} className="addMembersButton">
            Add member
          </Button>
        </Popover>
        {contacts && contacts.length > 0 ? (
          <div className="isoContactList">
            <Scrollbar className="contactListScrollbar">
              {contacts.map(contact => this.singleContact(contact))}
            </Scrollbar>
          </div>
        ) : (
          <span className="isoNoResultMsg">
            {<IntlMessages id="Component.contacts.noOption" />}
          </span>
        )}
        <CreateModal
          onRef={ref => (this.memberForm = ref)}
          visible={createModalVisible}
          onSubmit={createTeamMember}
          onCancel={() => this.creationModalVisible(false)}
        />
        <MemberSearchModal
          visible={memberSearchModalVisible}
          onSearch={onSearchMember}
          searchResult={searchMembers}
          onSubmit={selectTeamMember}
          alreadyExist={memberAlreadyExist}
          onCancel={() => this.memberSearchModalVisible(false)}
        />
      </ContactListWrapper>
    );
  }
}

ContactList.defaultProps = {
  selectedId: null,
  changeContact: null,
  createTeamMember: null,
  isUpdated: false,
  onSearchMember: null,
  selectTeamMember: null,
  deleteMember: null,
  searchMembers: [],
  validationErrors: [],
};

ContactList.propTypes = {
  selectedId: PropTypes.number,
  changeContact: PropTypes.func,
  createTeamMember: PropTypes.func,
  isUpdated: PropTypes.bool,
  onSearchMember: PropTypes.func,
  selectTeamMember: PropTypes.func,
  deleteMember: PropTypes.func,
  searchMembers: PropTypes.arrayOf(PropTypes.object),
  validationErrors: PropTypes.arrayOf(PropTypes.object),
};

ContactList.contextTypes = {
  intl: PropTypes.object.isRequired,
};

function mapStateToProps({ assetTeam }) {
  const { validationErrors } = assetTeam;

  return { validationErrors };
}

export default connect(mapStateToProps, { ...assetTeamActions })(ContactList);
