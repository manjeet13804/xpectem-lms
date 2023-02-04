import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  PLACEHOLDER,
  NOTIFICATION_TARGET,
} from 'constants/constants';
import { Select } from 'antd';
import { DefaultButton, Banner, LayoutContent } from 'components';
import { SearchInput } from 'components/formElements';
import _ from 'lodash';
import notificationActions from 'redux/notifications/actions';
import searchLmsGroupActions from 'redux/searchLmsGroup/actions';
import searchOrganisationsActions from 'redux/searchOrganisations/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import PropTypes from 'prop-types';
import SearchResult from './components/SearchResult';
import SelectTargetWrapper from './selectNotificationTarget.style';
import { ROLES } from '../../../../constants/constants';
import { checkRolePermission } from '../../../../helpers/utility';

const { XPECTUM_ADMIN, ADMIN_LMS, ADMIN_ORGANISATION } = ROLES;

const { Option } = Select;
const b = bemlds('page');

// TODO
// Add new props to SearchInput for title
const SelectNotificationTarget = memo((props) => {
  const {
    history,
    clear,

    selectTargetType,
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

    targetType,

    clearSearch,
    user,
    selectedLmsGroup,
    selectedOrg,
    selectedGroup,
  } = props;

  const {
    searchLms,
    organisationsName,
    groupName,
    selectNotificationTarget,
  } = PLACEHOLDER;

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

  const handleNext = () => history.push('/notifications/create');

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
    return [];
  };

  const getFindMessage = () => {
    if (!_.isEmpty(lmsGroupSearch.lmsGroupsTotal)) {
      return `Found ${lmsGroupSearch.lmsGroupsTotal.length} LMS groups`;
    }
    if (!_.isEmpty(organisationsSearch.organisationsTotal)) {
      return `Found ${organisationsSearch.organisationsTotal.length} Organisations`;
    }
    if (!_.isEmpty(groupSearch.groupsTota)) {
      return `Found ${groupSearch.groupsTotal.length} Groups`;
    }
    return null;
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
    return () => null;
  };

  useEffect(() => () => clearSearch(), []);

  const roles = _.get(user, 'role', []);

  const isAdminXpectum = checkRolePermission(roles, XPECTUM_ADMIN);
  const isAdminLms = checkRolePermission(roles, ADMIN_LMS);
  const isAdminOrg = checkRolePermission(roles, ADMIN_ORGANISATION);

  return (
    <LayoutContent>
      <SelectTargetWrapper>
        <Banner title={<IntlMessages id="notifications.sendNotifications" />} />
        <sections className={b()}>
          <div className={b('select-target')}>
            <div className={b('find')}>
              <div className={b('select-title')}>
                <IntlMessages id="notifications.selectTitle" />
              </div>
              <Select
                value={targetType}
                allowClear
                showSearch
                className={b('search-select')}
                onChange={selectTargetType}
                placeholder={selectNotificationTarget}
                optionFilterProp="children"
                filterOption={(input, { props: { children } }) => children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
                }
              >
                {NOTIFICATION_TARGET.map(({ title, value }) => (
                  <Option
                    key={value}
                    value={value}
                  >
                    {title}
                  </Option>
                ))}
              </Select>
              {isAdminXpectum
              && (
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
              )
              }
              {isAdminLms
              && (
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
              )
              }
              {isAdminOrg
              && (
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
              )
              }
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
          <div className={b('next')}>
            <DefaultButton
              onClick={handleNext}
              textId="notifications.next"
              disabled={!targetType || (!selectedLmsGroup && !selectedOrg && !selectedGroup)}
            />
          </div>
        </sections>
      </SelectTargetWrapper>
    </LayoutContent>
  );
});

const mapStateToProps = state => ({
  lmsGroupSearch: state.searchLmsGroup,
  organisationsSearch: state.searchOrganisations,
  groupSearch: state.searchGroup,
  selectedLmsGroup: state.searchLmsGroup.selectedLmsGroupName,
  selectedOrg: state.searchOrganisations.selectedOrganisationName,
  selectedGroup: state.searchGroup.selectedGroupName,
  targetType: state.notifications.targetType,
  user: state.Auth,
});

const mapDispatchToProps = dispatch => ({
  selectTargetType: type => dispatch(notificationActions.setNotificationTargetType(type)),
  changeLmsGroupSearch: text => dispatch(searchLmsGroupActions.setSearchValueLmsGroup(text)),
  changeOrganisationSearch: text => dispatch(searchOrganisationsActions.setSearchValueOrganisations(text)),
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
  searchOrganisations: params => dispatch(searchOrganisationsActions.getOrganisations(params, true)),
  searchGroup: params => dispatch(searchGroupActions.getGroups(params, true)),
  clearSearch: () => {
    dispatch(searchLmsGroupActions.clearSearchLmsAdmins());
    dispatch(searchOrganisationsActions.clearSearchOrg());
    dispatch(searchGroupActions.clearSearchDataGroups());
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
});

SelectNotificationTarget.defaultProps = {
  history: {},
  clear: () => null,
  selectTargetType: () => null,
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
  targetType: '',
  user: {},
  selectedLmsGroup: '',
  selectedOrg: '',
  selectedGroup: '',
};

SelectNotificationTarget.propTypes = {
  history: PropTypes.object,
  clear: PropTypes.func,
  selectTargetType: PropTypes.func,
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
  targetType: PropTypes.string,
  user: PropTypes.object,
  selectedLmsGroup: PropTypes.string,
  selectedOrg: PropTypes.string,
  selectedGroup: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNotificationTarget);
