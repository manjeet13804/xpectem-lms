import React, {useEffect, useMemo, useState} from 'react';
import { connect } from 'react-redux';
import { LayoutContent, Banner, IntlMessages } from 'components';
import { SearchInput } from 'components/formElements';
import { bemlds } from 'utils';
import notificationActions from 'redux/notifications/actions';
import searchLmsGroupActions from 'redux/searchLmsGroup/actions';
import searchOrganisationsActions from 'redux/searchOrganisations/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import searchNotificationActions from 'redux/searchNotification/actions';
import { PLACEHOLDER, ROLES } from 'constants/constants';
import { NOTIFICATIONS } from 'constants/routes';
import { DefaultButton } from 'components';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SelectReportTargetWrapper from './selectReportTarget.style';
import SearchResult from '../SelectNotificationTarget/components/SearchResult';
import { SearchPersonForm } from '../../../../components';
import { Radio } from 'antd';

const b = bemlds('page');

const SelectReportTarget = (props) => {
  const {
    history,
    clear,

    selectLmsGroup,
    selectOrganisation,
    selectGroup,

    changeLmsGroupSearch,
    changeOrganisationSearch,
    changeGroupSearch,

    lmsGroupSearch,
    organisationsSearch,
    groupSearch,

    searchLmsGroup,
    searchOrganisations,
    searchGroup,


    clearSearch,
    selectedLmsGroup,
    selectedOrg,
    selectedGroup,

    searchUser,
    changePerson,
    person,
    users,
    user
  } = props;

  const {
    searchLms,
    organisationsName,
    groupName,
  } = PLACEHOLDER;

  const [isAutomaticReminders, setIsAutomaticReminders] = useState(false);

  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  useEffect(() => {
    clear();
  }, []);

  const handleSearchLmsGroup = () => {
    clearSearch();
    searchLmsGroup({
      name: lmsGroupSearch.value.trim() || undefined,
      onlyActive: true,
    });
  };

  const handleSearchOrganisation = () => {
    clearSearch();
    searchOrganisations({
      name: organisationsSearch.value.trim() || undefined,
      lmsGroup: lmsGroupSearch.selectedLmsGroupId,
      onlyActive: true,
    });
  };

  const handleSearchGroup = () => {
    clearSearch();
    searchGroup({
      name: groupSearch.value.trim() || undefined,
      lmsGroup: lmsGroupSearch.selectedLmsGroupId,
      organisation: organisationsSearch.selectedOrganisationId,
      onlyActive: true,
    });
  };

  const getSearchList = () => {
    if (!_.isEmpty(lmsGroupSearch.lmsGroupsTotal)) {
      return lmsGroupSearch.lmsGroupsTotal;
    }
    if (!_.isEmpty(organisationsSearch.organisationsTotal)) {
      return organisationsSearch.organisationsTotal;
    }
    if (!_.isEmpty(groupSearch.groupsTotal)) {
      return groupSearch.groupsTotal;
    }
    if (!_.isEmpty(users)) {
      return users;
    }
    return [];
  };

  const getResultHandleClick = () => {
    if (!_.isEmpty(lmsGroupSearch.lmsGroupsTotal)) {
      return selectLmsGroup;
    }
    if (!_.isEmpty(organisationsSearch.organisationsTotal)) {
      return selectOrganisation;
    }
    if (!_.isEmpty(groupSearch.groupsTotal)) {
      return selectGroup;
    }
    if (!_.isEmpty(users)) {
      return (name, id) => history.push(`${NOTIFICATIONS.notificationReportList}`, { userId: id });
    }
    return () => null;
  };

  const getFindMessage = () => {
    if (!_.isEmpty(lmsGroupSearch.lmsGroupsTotal)) {
      return `Found ${lmsGroupSearch.lmsGroupsTotal.length} LMS groups`;
    }
    if (!_.isEmpty(organisationsSearch.organisationsTotal)) {
      return `Found ${organisationsSearch.organisationsTotal.length} Organisations`;
    }
    if (!_.isEmpty(groupSearch.groupsTotal)) {
      return `Found ${groupSearch.groupsTotal.length} Groups`;
    }
    if (!_.isEmpty(users)) {
      return `Found ${users.length} Users`;
    }
    return null;
  };

  const getReport = () => {
    if (isAutomaticReminders) {
      history.push(`${NOTIFICATIONS.notificationReportList}`, { lmsGroupId: selectedLmsGroup, isAutomaticReminders });
      return null;
    }
    if (selectedGroup) {
      history.push(`${NOTIFICATIONS.notificationReportList}`, { groupId: selectedGroup });
      return null;
    }
    if (selectedOrg) {
      history.push(`${NOTIFICATIONS.notificationReportList}`, { organisationId: selectedOrg });
      return null;
    }
    if (selectedLmsGroup) {
      history.push(`${NOTIFICATIONS.notificationReportList}`, { lmsGroupId: selectedLmsGroup });
      return null;
    }
    return null;
  };

  const handleChange = ({ target: { name, value } }) => {
    changePerson({ ...person, [name]: value });
  };

  const handleSearch = () => {
    clearSearch();
    const params = {
      selectedLmsGroup,
      selectedOrg,
      selectedGroup,
      person,
    };
    searchUser(params);
  };

  return (
    <LayoutContent>
      <SelectReportTargetWrapper>
        <Banner title={<IntlMessages id="notifications.report" />} />
        <sections>
          <div className={b('select-target')}>
            <div className={b('find')}>
              <SearchInput
                type="text"
                searchTitle="lmsGroups.searchTitle"
                title="students.searchAllLms"
                value={lmsGroupSearch.value}
                name="searchLmsGroupValue"
                placeholder={searchLms}
                onChange={changeLmsGroupSearch}
                onSearch={handleSearchLmsGroup}
              />
              {selectedLmsGroup && (
                <Radio.Group
                  onChange={e => setIsAutomaticReminders(e.target.value)}
                  value={isAutomaticReminders}
                >
                  <Radio value><IntlMessages id="notifications.isAutomaticReminders" /></Radio>
                  <Radio value={false}><IntlMessages id="notifications.allNotifications" /></Radio>
                </Radio.Group>
              )}
              {!isAutomaticReminders && (
                <div>
                  {isXpectrumAdmin && (
                    <SearchInput
                      type="text"
                      searchTitle="organisations.searchInputClear"
                      searchTitleValue={lmsGroupSearch.selectedLmsGroupName}
                      title="students.searchAllOrganisations"
                      value={organisationsSearch.value}
                      name="searchOrganisationValue"
                      placeholder={organisationsName}
                      onChange={changeOrganisationSearch}
                      onSearch={handleSearchOrganisation}
                    />
                  )}

                  <SearchInput
                    type="text"
                    searchTitle="groups.searchInput"
                    searchTitleValue={organisationsSearch.selectedOrganisationName}
                    title="students.searchAllGroups"
                    value={groupSearch.value}
                    name="searchGroupValue"
                    placeholder={groupName}
                    onChange={changeGroupSearch}
                    onSearch={handleSearchGroup}
                  />
                </div>
              )}
            </div>
            <div className={b('result')}>
              <SearchResult
                isLoading={false}
                searchList={getSearchList()}
                onClick={getResultHandleClick()}
                title={getFindMessage()}
                clearSearch={clearSearch}
              />
            </div>
          </div>
          {(selectedLmsGroup || selectedOrg || selectedGroup) && (
            <DefaultButton
              onClick={getReport}
              textId="notifications.search"
              disabled={!selectedLmsGroup && !selectedOrg && !selectedGroup}
            />
          )}
          {!isAutomaticReminders && (
            <SearchPersonForm
              {...person}
              onChange={handleChange}
              onSearch={handleSearch}
              checkboxLabel={<IntlMessages id="groupAdmins.includeDeactivated" />}
              findButtonTextId="groupAdmins.findBy"
            />
          )}
        </sections>
      </SelectReportTargetWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = state => ({
  lmsGroupSearch: state.searchLmsGroup,
  organisationsSearch: state.searchOrganisations,
  groupSearch: state.searchGroup,
  selectedLmsGroup: state.searchLmsGroup.selectedLmsGroupId,
  selectedOrg: state.searchOrganisations.selectedOrganisationId,
  selectedGroup: state.searchGroup.selectedGroupId,
  users: state.searchNotification.users,
  person: state.searchNotification.person,
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  changeLmsGroupSearch: text => dispatch(searchLmsGroupActions.setSearchValueLmsGroup(text)),
  changeOrganisationSearch: (text) => {
    dispatch(searchOrganisationsActions.setSearchValueOrganisations(text));
  },
  changeGroupSearch: text => dispatch(searchGroupActions.setSearchValueGroup(text)),
  selectLmsGroup: (name, id) => {
    dispatch(searchLmsGroupActions.setNameLmsGroupName(name));
    dispatch(searchLmsGroupActions.setNameLmsGroupId(id));
  },
  selectOrganisation: (name, id) => {
    dispatch(searchOrganisationsActions.setNameOrganisationName(name));
    dispatch(searchOrganisationsActions.setNameOrganisationId(id));
  },
  selectGroup: (name, id) => {
    dispatch(searchGroupActions.setNameSearchGroup(name));
    dispatch(searchGroupActions.setIdSearchGroup(id));
  },
  searchLmsGroup: params => dispatch(searchLmsGroupActions.getLmsGroups(params, true)),
  searchOrganisations: (params) => {
    dispatch(searchOrganisationsActions.getOrganisations(params, true));
  },
  searchGroup: params => dispatch(searchGroupActions.getGroups(params, true)),
  clearSearch: () => {
    dispatch(searchLmsGroupActions.clearSearchLmsAdmins());
    dispatch(searchOrganisationsActions.clearSearchOrg());
    dispatch(searchGroupActions.clearSearchDataGroups());
    dispatch(searchNotificationActions.clearSearchDataUsers());
  },
  clear: () => {
    dispatch(searchLmsGroupActions.clearAllLmsGroup());
    dispatch(searchLmsGroupActions.setInitStateSearchLmsGroup());
    dispatch(searchOrganisationsActions.clearAllOrganisation());
    dispatch(searchOrganisationsActions.setInitStateOrg());
    dispatch(searchGroupActions.clearAllGroups());
    dispatch(searchGroupActions.setInitStateSearchGroup());
    dispatch(notificationActions.clearNotificationTargetType());
  },
  searchUser: params => dispatch(searchNotificationActions.searchUsers(params)),
  changePerson: params => dispatch(searchNotificationActions.changePerson(params)),
  getNotifications: params => dispatch(searchNotificationActions.getNotifications(params)),
});

SelectReportTarget.defaultProps = {
  history: {},
  clear: () => null,
  selectLmsGroup: () => null,
  selectOrganisation: () => null,
  selectGroup: () => null,
  changeLmsGroupSearch: () => null,
  changeOrganisationSearch: () => null,
  changeGroupSearch: () => null,
  lmsGroupSearch: () => null,
  organisationsSearch: () => null,
  groupSearch: () => null,
  searchLmsGroup: () => null,
  searchOrganisations: () => null,
  searchGroup: () => null,
  clearSearch: () => null,
  selectedLmsGroup: '',
  selectedOrg: '',
  selectedGroup: '',
  getUsers: () => null,
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isDeactivated: false,
  },
  users: [],
};

SelectReportTarget.propTypes = {
  history: PropTypes.object,
  clear: PropTypes.func,
  selectLmsGroup: PropTypes.func,
  selectOrganisation: PropTypes.func,
  selectGroup: PropTypes.func,
  changeLmsGroupSearch: PropTypes.func,
  changeOrganisationSearch: PropTypes.func,
  changeGroupSearch: PropTypes.func,
  lmsGroupSearch: PropTypes.func,
  organisationsSearch: PropTypes.func,
  groupSearch: PropTypes.func,
  searchLmsGroup: PropTypes.func,
  searchOrganisations: PropTypes.func,
  searchGroup: PropTypes.func,
  clearSearch: PropTypes.func,
  selectedLmsGroup: PropTypes.string,
  selectedOrg: PropTypes.string,
  selectedGroup: PropTypes.string,
  getUsers: PropTypes.func,
  person: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectReportTarget);
