import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Loader from 'components/utility/loader';
import ContactList from 'components/contacts/contactList';
import Scrollbar from 'components/utility/customScrollBar';
import assetTeamActions from 'redux/assetTeam/actions';
import directoryActions from 'redux/directories/actions';
import IntlMessages from 'components/utility/intlMessages';
import { generateRequest, validateFields, checkEmptyString } from 'helpers/utility';
import { AssetTeamsWrapper } from './editAssetTeam.style';
import MemberForm from './memberForm';

const { Content } = Layout;
class AssetTeam extends Component {
  constructor() {
    super();

    this.state = {
      selectedMember: null,
      pagination: {
        current: 1,
        pageSize: 50,
      },
    };
  }

  componentWillMount() {
    const { assetTeam } = this.props;
    this.getTeam(assetTeam);
  }

  componentWillReceiveProps(nextProps) {
    const { assetTeam } = nextProps;
    const { assetTeam: currentAssetTeam } = this.props;
    this.initSelected(nextProps);
    const isEqual = _.isEqual(assetTeam, currentAssetTeam);

    if (!isEqual) {
      this.getTeam(assetTeam);
    }
  }

  componentWillUnmount() {
    const { resetMembers } = this.props;
    resetMembers();
  }

  initSelected = (nextProps) => {
    const { team, createdMemberId, resetSelected } = nextProps;
    const { selectedMember } = this.state;

    if (createdMemberId) {
      this.setState({ selectedMember: createdMemberId });

      return resetSelected();
    }

    const memberIsExist = team.find(member => member.id === selectedMember);

    if ((!selectedMember || !memberIsExist) && team.length) {
      this.setState({ selectedMember: team[0].id });
    }
  };

  getTeam = (assetTeam) => {
    const { fetchTeam } = this.props;
    const { pagination: paginationInfo } = this.state;
    const teamIds = assetTeam.map(member => (member.memberId));

    if (teamIds.length) {
      const filteredInfo = { id: { $in: teamIds } };
      const request = generateRequest({
        filteredInfo,
        paginationInfo,
      });

      fetchTeam(request, assetTeam);
    }
  };

  changeMember = (selectedMember) => {
    this.setState({ selectedMember });
  };

  createMember = (form, additionalFields) => {
    const { createMember: create } = this.props;
    const { validateFieldsAndScroll } = form;

    validateFields({
      validateFieldsAndScroll,
      additionalFields,
      isNew: true,
      create,
    });
  };

  selectMember = (form) => {
    const { selectMember } = this.props;
    const { pagination } = this.state;
    const { validateFieldsAndScroll } = form;

    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { assetMember } = values;
        const filteredInfo = { id: { $in: [assetMember] } };
        const request = generateRequest({ paginationInfo: pagination, filteredInfo });

        selectMember(request);
      }
    });
  };

  updateMember = (form, additionalFields) => {
    const { updateMember } = this.props;
    const { validateFieldsAndScroll } = form;

    validateFields({
      validateFieldsAndScroll,
      additionalFields,
      id: additionalFields.id,
      isNew: false,
      update: updateMember,
    });
  };

  onSearchMember = (searchValue, isInitial) => {
    const { fetchTeam } = this.props;
    const { pagination } = this.state;
    const searchText = { name: checkEmptyString(searchValue) };
    const request = generateRequest({
      paginationInfo: pagination,
      ...(!isInitial && { searchText }),
    });
    fetchTeam(request, [], true);
  };

  deleteMember = (deletedMember) => {
    const { deleteMember } = this.props;
    deleteMember(deletedMember);
  };

  render() {
    const {
      team,
      searchMembers,
      assetTeam,
    } = this.props;

    const { teamId, selectedMember } = this.state;

    if (assetTeam.length && !team) {
      return <Loader />;
    }

    return (
      <AssetTeamsWrapper className="isomorphicContacts">
        <div className="isoContactListBar">
          <ContactList
            {...this.props}
            contacts={_.sortBy(team, 'name')}
            selectedId={selectedMember}
            changeContact={this.changeMember}
            createTeamMember={this.createMember}
            selectTeamMember={this.selectMember}
            onSearchMember={this.onSearchMember}
            deleteMember={this.deleteMember}
            searchMembers={searchMembers}
          />
        </div>
        <Layout className="isoContactBoxWrapper">
          <Content className="isoContactBox">
            {
                team.length
                  ? (
                    <Scrollbar className="contactBoxScrollbar">
                      <MemberForm
                        {...this.props}
                        selected={selectedMember}
                        updateTeamMember={this.updateMember}
                        teamId={teamId}
                      />
                    </Scrollbar>
                  ) : (
                    <p className="isoNoMailMsg">
                      <IntlMessages id="assetTeam.noTeam" />
                    </p>
                  )
              }
          </Content>
        </Layout>
      </AssetTeamsWrapper>
    );
  }
}

function mapStateToProps({ assetTeam, directories }) {
  return {
    ...directories,
    ...assetTeam,
  };
}

AssetTeam.defaultProps = {
  match: {},
  assets: [],
  assetTeam: [],
  updateAsset: null,
  fetchAssets: null,
  fetchTeam: null,
};

AssetTeam.propTypes = {
  match: PropTypes.object,
  currentAsset: PropTypes.object,
  assets: PropTypes.arrayOf(PropTypes.object),
  assetTeam: PropTypes.arrayOf(PropTypes.object),
  updateAsset: PropTypes.func,
  fetchAssets: PropTypes.func,
  fetchTeam: PropTypes.func,
};

export default connect(mapStateToProps, { ...directoryActions, ...assetTeamActions })(AssetTeam);
