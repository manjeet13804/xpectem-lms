import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import searchOrgActions from 'redux/searchOrganisations/actions';
import searchLmsGroupActions from 'redux/searchLmsGroup/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import searchCoursesActions from 'redux/courses/actions';
import studentsActions from 'redux/students/actions';
import courseCreatorActions from 'redux/courseCreator/actions';
import { bemlds } from 'utils';
import _ from 'lodash';
import {
  getSearchAdminsDataLmsGroupFp,
  getSearchStudentsDataFp,
} from 'selectors';
import {
  ResultBlock,
  Banner,
  SelectedResultBlock,
  IntlMessages,
} from 'components';
import SelectCourse from 'components/selectCourse';
import SearchGroup from '../SearchGroup';

import SearchCourse from '../SearchCourse';
import SearchStudent from '../SearchStudent';
import SearchStudentGroup from '../SearchStudentGroup';
import SearchOrganisation from '../SearchOrganisations';
import SearchLmsGroup from '../SearchLmsGroup';
import SearchAdminOrganisations from '../SearchAdminOrganisations';
import SearchAdminGroup from '../SearchAdminGroups';
import SearchAdminLmsGroups from '../SearchAdminLmsGroups';
import './styles.scss';
import { ROLES } from '../../../constants/constants';
import SearchCourseCreator from '../SearchCourseCreator';

const b = bemlds('search-lms-group-organisation-group');

const defaultProps = {
  onClickResultOrganisation: () => null,
  onClickResultLmsGroup: () => null,
  onClickResultGroup: () => null,
  onClickResultAdminOrganisation: () => null,
  onClickNextSelectedGroups: () => null,
  onClickResultAdminGroup: () => null,
  onClickResultStudent: () => null,
  isShowLmsGroup: true,
  isOrganisation: false,
  isGroup: false,
  isStudent: false,
  isSelectGroup: false,
  report: false,
  user: {},
};

const GlobalSearch = ({
  setInitStateFullOrg,
  setInitStateSearchLmsGroup,
  setInitStateSearchGroup,
  history,
  report,
  permission,
  permissionOrganisation,
  permissionLmsGroup,
  user,
  setNameLmsGroupId,
  setNameLmsGroupName,
  selectedLmsGroupName,
  selectedLmsGroupId,
  titleForm,
  selectedOrganisationId,
  selectedOrganisationName,
  setInitStateOrg,
  setNameOrganisationName,
  setNameOrganisationId,
  setIdSearchGroup,
  setNameSearchGroup,
  title,
  selectedOrganisations,
  selectedOrganisation,
  removeItemFromOrg,
  onClickNextSelectedOrganisations,
  isSelectedGroupsBlock,
  selectedGroups,
  removeItemFromSelectedGroup,
  removeItemFromSelectedCourse,
  onClickNextSelectedGroups,
  selectedGroupId,
  isGroup,
  isStudentGroup,
  isStudent,
  isSelectGroup,
  isOrganisation,
  isAdminOrganisation,
  isAdminGroup,
  isCourseCreator,
  isReportAdminList,
  isShowLmsGroup,
  isSelectedOrganisationsBlock,
  isLoadingTotalOrganisation,
  isLoadingTotal,
  isLoadingTotalGroup,
  isLoadingOrgAdmins,
  isLoadingGroupAdmins,
  isLoadingCourses,
  isAdminLms,
  groupsTotal,
  searchStudents,
  organisationsTotal,
  lmsGroupsTotal,
  orgAdmins,
  groupAdmins,
  courseCreatorsSearchData,
  searchLmsAdminsData,
  searchStudentsData,
  onClickResultOrganisation,
  onClickResultLmsGroup,
  onClickResultGroup,
  addToSelectedOrg,
  onClickResultAdminOrganisation,
  addToSelectedGroups,
  onClickResultAdminGroup,
  onClickResultCourseCreator,
  onClickResultStudent,
  onClickResultAdminLmsGroups,
  clearSearchDataGroups,
  clearSearchDataCourses,
  clearSearchOrg,
  clearSearchLmsAdmins,
  setInitStateSearchStudent,
  currStudent,
  searchCourses,
  searchTotalCourseData,
  setNameSearchCourse,
  setIdSearchCourse,
  addToSelectedCourse,
  addToSelectedOrganisation,
  addToSelectedLmsGrops,
  selectedCourses,
  setCourseSearchDefault,
  selectAllCourse,
  clearAllCourse,
  selectAllGroups,
  selectAllLmsGroup,
  clearAllLmsGroup,
  selectAllOrganisation,
  clearAllOrganisation,
  clearAllGroups,
  selectedLmsGroups,
  searchType,
  setSearchValueLmsGroup,
  withoutDeactivated,
  clearCourseCreatorSearchData,
  isSearchByGroup
}) => {

  const [resultSelectFlag, setResultSelectFlag] = useState('');
  const roles = _.get(user, 'roles', []);
  useEffect(() => {
    clearAllCourse();
  }, []);

  useEffect(() => {
    const isCache = _.get(history, 'location.state.cache');
    if (!isCache) {
      setInitStateSearchLmsGroup();
      setInitStateFullOrg();
      setInitStateSearchGroup();
      clearCourseCreatorSearchData();
    }

    const organisationByGroup = _.get(user.groups, '0.organisation', {});
    const lmsGroupByOrganisation = _.get(user.organisations, '0.lmsGroup', {});
    const lmsGroup = _.get(user.lmsGroups, '0', lmsGroupByOrganisation);
    if (lmsGroup && !roles.includes(ROLES.XPECTUM_ADMIN)) {
      const lmsGroupId = _.get(lmsGroup, 'id', null);
      const lmsGroupName = _.get(lmsGroup, 'name', null);
      setNameLmsGroupName(lmsGroupName);
      setNameLmsGroupId(lmsGroupId);
    }
    if (roles.includes(ROLES.ADMIN_LMS)) {
      addToSelectedLmsGrops({ id: user.lmsGroups[0].id, text: user.lmsGroups[0].name });
    }
    if (roles.includes(ROLES.ADMIN_GROUP)) {
      setNameOrganisationId(organisationByGroup.id);
      setNameOrganisationName(organisationByGroup.name);
    }
  }, [user]);

  const getConfigByRoles = (config) => {
    const { roles = [] } = user;

    const isXpectum = roles.includes(ROLES.XPECTUM_ADMIN);
    const isGroupAdmin = roles.includes(ROLES.ADMIN_GROUP);

    if (isXpectum) {
      return config;
    }

    return {
      ...config,
      isShowLmsGroup: false,
      isShowGroup: isGroupAdmin ? true : config.isShowGroup,
    };
  };

  const getConfigForm = () => {
    const checkShowSelected = () => {
      switch (searchType) {
        case 'lms':
          if (roles.includes(ROLES.ADMIN_LMS)) {
            return Boolean(selectedCourses.length);
          }
          return Boolean(selectedCourses.length && selectedLmsGroups.length);
        case 'organisation':
          return Boolean(selectedCourses.length && selectedOrganisation.length);
        case 'group':
          return Boolean(selectedGroups.length && selectedCourses.length);
        default:
          return Boolean(
            (selectedOrganisations.length && isSelectedOrganisationsBlock)
            || (selectedGroups.length && isSelectedGroupsBlock)
            || (selectedCourses.length),
          );
      }
    };

    const getCoursesDisabled = () => {
      switch (searchType) {
        case 'lms':
          if (roles.includes(ROLES.ADMIN_LMS)) {
            return false;
          }
          return !selectedLmsGroups.length;
        case 'organisation':
          return !selectedOrganisation.length;
        case 'group':
          return !selectedGroups.length;
        default:
          return false;
      }
    };

    const isShowSelectedBlock = checkShowSelected();

    const isCoursesDisabled = getCoursesDisabled();

    const isSelectCheckboxItemResult = Boolean(
      (organisationsTotal.length && isSelectedOrganisationsBlock)
      || (groupsTotal.length && isSelectedGroupsBlock)
      || (searchTotalCourseData.length)
      || (permissionOrganisation && organisationsTotal && organisationsTotal.length)
      || (permissionLmsGroup && lmsGroupsTotal && lmsGroupsTotal.length),
    );

    const isLoadingResult = isLoadingTotalOrganisation
      || isLoadingTotal
      || isLoadingTotalGroup
      || isLoadingCourses
      || isLoadingOrgAdmins
      || isLoadingGroupAdmins;

    const config = {
      isShowLmsGroup,
      isShowSelectedBlock,
      isCoursesDisabled,
      isSelectCheckboxItemResult,
      isShowOrganisation: isOrganisation,
      isShowGroup: isGroup,
      isShowStudentGroup: isStudentGroup,
      isShowStudent: isStudent,
      isShowSelectGroup: isSelectGroup,
      isShowAdminGroup: isAdminGroup,
      isShowCourseCreator: isCourseCreator,
      isShowReportAdminList: isReportAdminList,
      isShowAdminOrganisation: isAdminOrganisation,
      isLoadingResult,
      isShowAmdLmsGroups: isAdminLms,
      isSearchCourses: searchCourses,
    };

    return getConfigByRoles(config);
  };

  const getDataForResultBlock = () => {
    const config = getConfigForm();

    if (resultSelectFlag && searchTotalCourseData && searchTotalCourseData.length) {
      return searchTotalCourseData;
    }
    if (groupsTotal && groupsTotal.length) {
      return groupsTotal;
    }

    if (organisationsTotal && organisationsTotal.length) {
      return organisationsTotal;
    }

    if (lmsGroupsTotal && lmsGroupsTotal.length) {
      return lmsGroupsTotal;
    }

    if (config.isShowAdminGroup) {
      return groupAdmins;
    }

    if (config.isShowCourseCreator) {
      return courseCreatorsSearchData;
    }

    if (report && searchStudentsData && searchStudentsData.length) {
      return searchStudentsData;
    }
    if (config.isShowReportAdminList) {
      return groupAdmins;
    }

    if (config.isShowAmdLmsGroups) {
      return searchLmsAdminsData;
    }

    if (config.isShowAdminOrganisation) {
      return orgAdmins;
    }
  };
  const removeResultBlockItem = (isSelectedGroupsBlock) => {
    if (resultSelectFlag) {
      return removeItemFromSelectedCourse;
    }
    return isSelectedGroupsBlock ? removeItemFromSelectedGroup : removeItemFromOrg;
  };
  const getResultBlockTitle = (isSelectedGroupsBlock) => {
    if (resultSelectFlag) {
      return <IntlMessages id="courses.select" />;
    }
    return isSelectedGroupsBlock
      ? <IntlMessages id="groupAdmins.select" />
      : <IntlMessages id="orgAdmins.selectedTitle" />;
  };
  const getResultBlockDescription = (isSelectedGroupsBlock) => {
    if (resultSelectFlag) {
      return <IntlMessages id="courses.selectedText" />;
    }
    return isSelectedGroupsBlock
      ? <IntlMessages id="groupAdmins.selectedText" />
      : <IntlMessages id="orgAdmins.selectedText" />;
  };
  const getDataForResultBlockSelect = (isSelectedGroupsBlock) => {
    if (resultSelectFlag) {
      return selectedCourses;
    }
    if (permissionOrganisation) {
      return selectedOrganisation;
    }
    if (permissionLmsGroup) {
      return selectedLmsGroups;
    }
    return isSelectedGroupsBlock ? selectedGroups : selectedOrganisations;
  };

  const getActionsSelectAll = () => {
    if (resultSelectFlag && config.isSearchCourses) {
      return selectAllCourse;
    }
    if (config.isShowStudentGroup) {
      return selectAllGroups;
    }
    if (config.isShowOrganisation) {
      return selectAllOrganisation;
    }
    if (config.isShowLmsGroup) {
      return selectAllLmsGroup;
    }
  };
  const getActionsSelectNone = () => {
    if (resultSelectFlag && config.isSearchCourses) {
      return clearAllCourse;
    }
    if (config.isShowStudentGroup) {
      return clearAllGroups;
    }
    if (config.isShowOrganisation) {
      return clearAllOrganisation;
    }
    if (config.isShowLmsGroup) {
      return clearAllLmsGroup;
    }
  };
  const getActionsSelectItem = (id, name, item) => {
    const config = getConfigForm();
    if (resultSelectFlag && searchTotalCourseData && searchTotalCourseData.length) {
      setIdSearchCourse(id);
      setNameSearchCourse(name);
      onClickResultGroup(id, name);
      addToSelectedCourse({ id, text: name, permission: 2 });

      if (!config.isSelectCheckboxItemResult) {
        clearSearchDataCourses();
      }

      return;
    }
    if (groupsTotal && groupsTotal.length) {
      setIdSearchGroup(id);
      setNameSearchGroup(name);
      onClickResultGroup(id, name);
      addToSelectedGroups({ id, text: name });

      if (!config.isSelectCheckboxItemResult) {
        clearSearchDataGroups();
      }

      return;
    }
    if (permissionOrganisation && organisationsTotal && organisationsTotal.length) {
      addToSelectedOrganisation({
        id,
        text: name,
        lmsGroupName: item.lmsGroup.name,
        maxOrganisationAdmins: item.lmsGroup.maxOrganisationAdmins,
        currentNumberOfAdmins: item.currentNumberOfAdmins,
      });

      return;
    }
    if (permissionLmsGroup && lmsGroupsTotal && lmsGroupsTotal.length) {
      addToSelectedLmsGrops({ id, text: name });
    }

    if (organisationsTotal && organisationsTotal.length) {
      setNameOrganisationName(name);
      setNameOrganisationId(id);
      onClickResultOrganisation(id, name);
      addToSelectedOrg({
        id,
        text: name,
        lmsGroupId: item.lmsGroup.id,
        lmsGroupName: item.lmsGroup.name,
        maxOrganisationAdmins: item.lmsGroup.maxOrganisationAdmins,
        currentNumberOfAdmins: item.currentNumberOfAdmins,
      });

      if (!config.isSelectCheckboxItemResult) {
        clearSearchOrg();
      }

      return;
    }

    if (lmsGroupsTotal && lmsGroupsTotal.length) {
      setNameLmsGroupId(id);
      setNameLmsGroupName(name);
      onClickResultLmsGroup(id, name);

      if (!config.isSelectCheckboxItemResult) {
        clearSearchLmsAdmins();
      }
      return;
    }

    if (config.isShowAdminGroup) {
      onClickResultAdminGroup(id, name);
      return;
    }
    if (config.isShowCourseCreator) {
      onClickResultCourseCreator(id, name);
      return;
    }
    if (config.isShowStudent) {
      onClickResultStudent({ id, name });
      return;
    }
    if (config.isShowReportAdminList) {
      onClickResultAdminGroup(id, name);
      return;
    }

    if (config.isShowAmdLmsGroups) {
      onClickResultAdminLmsGroups(id);
      return;
    }

    if (config.isShowAdminOrganisation) {
      onClickResultAdminOrganisation(id);
    }
  };
  const getFindMessage = () => {
    const config = getConfigForm();
    // TODO add the ability to get parameters for a component IntlMessages and move that to lang constants
    if (resultSelectFlag && searchTotalCourseData && searchTotalCourseData.length) {
      return `Found ${searchTotalCourseData.length} courses`;
    }

    if (groupsTotal && groupsTotal.length) {
      return `Found ${groupsTotal.length} groups`;
    }

    if (organisationsTotal && organisationsTotal.length) {
      return `Found ${organisationsTotal.length} organisations`;
    }

    if (lmsGroupsTotal && lmsGroupsTotal.length) {
      return `Found ${lmsGroupsTotal.length} LMS groups`;
    }
    if (report && searchStudentsData.length) {
      return `Found ${searchStudentsData.length} students`;
    }
    if (config.isShowAdminGroup && groupAdmins.length) {
      return `Found ${groupAdmins.length} administrators group`;
    }
    if (config.isShowCourseCreator && courseCreatorsSearchData.length) {
      return `Found ${courseCreatorsSearchData.length} course creators`;
    }
    if (config.isShowReportAdminList) {
      return `Found ${groupAdmins.length} administrators group`;
    }
    if (config.isShowAmdLmsGroups && searchLmsAdminsData.length) {
      return `Found ${searchLmsAdminsData.length} administrators lms groups`;
    }

    if (config.isShowAdminOrganisation && orgAdmins.length) {
      return `Found ${orgAdmins.length} administrators organisation`;
    }
  };

  const getBelongsMessage = () => {
    const config = getConfigForm();

    if (config.isShowGroup) {
      return selectedOrganisationName;
    }
    if (config.isSearchCourses) {
      return selectedOrganisationName;
    }
    if (config.isShowStudent) {
      return selectedOrganisationName;
    }
    if (config.isShowStudentGroup) {
      return;
    }
    if (config.isShowSelectGroup) {
      return selectedOrganisationName;
    }
    if (config.isShowOrganisation) {
      return selectedLmsGroupName;
    }
  };

  const withinGroup = selectedLmsGroupId ? (
    <p className={b('selected-lms-group')}>
      within LMS group
      <span className={b('selected-title')}>{selectedLmsGroupName}</span>
    </p>
  ) : '';

  const titleInputOrganisations = (
    <div className={b('title-input')}>
      Search for organisation
      {withinGroup}
    </div>
  );

  const titleInputLmsGroups = (
    <div className={b('title-input')}>
      Search for group administrators
      {withinGroup}
    </div>
  );

  const clearSearchAdminOrganization = () => {
    clearSearchLmsAdmins();
    setInitStateSearchGroup();
    clearSearchDataCourses();
    clearSearchOrg();
  };

  const config = getConfigForm();
  return (
    <div className={b()}>
      {title && <Banner title={title} />}
      <div className={b('title')}>
        {titleForm}
      </div>
      <div className={b('content')}>
        <div className={b('left-page')}>
          {config.isShowStudent && (
          <div className={b('organisation-search')}>
            <SearchStudent
              lmsGroupId={selectedLmsGroupId}
              organisationId={selectedOrganisationId}
              clearOrg={clearSearchOrg}
              clearGroups={clearSearchDataGroups}
              clearCourses={clearSearchDataCourses}
              clearLmsAdmins={clearSearchLmsAdmins}
              searchStudents={searchStudents}
              currStudent={currStudent}
              setNameLmsGroupId={setNameLmsGroupId}
              setNameLmsGroupName={setNameLmsGroupId}
              setInitStateOrg={setNameLmsGroupId}
              setInitStateSearchGroup={setNameLmsGroupId}
            />
          </div>
          )}

          {config.isShowLmsGroup && (
            <div className={b('search-group')}>
              <SearchLmsGroup
                withoutDeactivated={withoutDeactivated}
                className={b('search')}
                isShowResult={false}
                onSearch={() => {
                  setNameLmsGroupId(null);
                  setNameLmsGroupName('');
                  setInitStateOrg();
                  setInitStateSearchGroup();
                  clearSearchDataCourses();
                  clearCourseCreatorSearchData();
                }}
                onSearchClickButton={() => {
                  clearSearchLmsAdmins();
                  setNameLmsGroupId(null);
                  setNameLmsGroupName('');
                  setInitStateOrg();
                  setInitStateSearchGroup();
                  setCourseSearchDefault('');
                  setResultSelectFlag('');
                  clearSearchDataCourses();
                  clearCourseCreatorSearchData();
                }}
              />
            </div>
          )}
          {config.isShowOrganisation && (
            <div className={b('organisation-search')}>
              <SearchOrganisation
                withoutDeactivated={withoutDeactivated}
                className={b('search')}
                titleInput={titleInputOrganisations}
                lmsGroupId={selectedLmsGroupId}
                isShowResult={false}
                onSearch={() => {
                  clearSearchLmsAdmins();
                  setNameOrganisationName('');
                  setNameOrganisationId(null);
                  setInitStateSearchGroup();
                  clearSearchDataCourses();
                  clearCourseCreatorSearchData();
                }}
                onSearchClickButton={() => {
                  clearSearchLmsAdmins();
                  setNameOrganisationName('');
                  setNameOrganisationId(null);
                  setInitStateSearchGroup();
                  setCourseSearchDefault('');
                  setResultSelectFlag('');
                  clearSearchDataCourses();
                  clearCourseCreatorSearchData();
                }}
              />
            </div>
          )}
          {config.isShowStudentGroup && (
          <div className={b('organisation-search')}>
            <SearchStudentGroup
              className={b('search')}
              titleInput={titleInputOrganisations}
              lmsGroupId={selectedLmsGroupId}
              organisationId={selectedOrganisationId}
              organisationName={selectedOrganisationName}
              onSearch={() => {
                clearSearchLmsAdmins();
                clearSearchOrg();
                setIdSearchGroup(null);
                setNameSearchGroup('');
                clearSearchDataCourses();
              }}
              onSearchClickButton={() => {
                clearSearchLmsAdmins();
                clearSearchOrg();
                setIdSearchGroup(null);
                setNameSearchGroup('');
                setCourseSearchDefault('');
                setResultSelectFlag('');
                clearSearchDataCourses();
              }}
            />
          </div>
          )}
          {config.isShowAmdLmsGroups && (
            <SearchAdminLmsGroups
              lmsGroupId={selectedLmsGroupId}
              clearLms={clearSearchLmsAdmins}
              titleInput={titleInputLmsGroups}
            />
          )}
          {config.isShowAdminOrganisation && (
            <SearchAdminOrganisations
              lmsGroupId={selectedLmsGroupId}
              organisationId={selectedOrganisationId}
              clearOrg={clearSearchAdminOrganization}
            />
          )}
          {config.isShowGroup && (
            <div className={b('organisation-search')}>
              <SearchGroup
                withoutDeactivated={withoutDeactivated}
                className={b('search')}
                titleInput={titleInputOrganisations}
                lmsGroupId={selectedLmsGroupId}
                organisationId={selectedOrganisationId}
                organisationName={selectedOrganisationName}
                onSearch={() => {
                  clearSearchLmsAdmins();
                  clearSearchOrg();
                  setIdSearchGroup(null);
                  setNameSearchGroup('');
                  clearCourseCreatorSearchData();
                }}
                onSearchClickButton={() => {
                  clearSearchLmsAdmins();
                  clearSearchOrg();
                  setIdSearchGroup(null);
                  setNameSearchGroup('');
                  setResultSelectFlag('');
                  clearSearchDataCourses();
                  clearCourseCreatorSearchData();
                }}
              />
            </div>
          )}

          {config.isSearchCourses && (
            <div className={b('organisation-search')}>
              <SearchCourse
                className={b('search')}
                titleInput={titleInputOrganisations}
                lmsGroupId={selectedLmsGroupId}
                organisationId={selectedOrganisationId}
                organisationName={selectedOrganisationName}
                disabled={config.isCoursesDisabled}
                isSearchByGroup={isSearchByGroup}
                onSearch={() => {
                  clearSearchLmsAdmins();
                  clearSearchOrg();
                  setIdSearchGroup(null);
                  setNameSearchGroup('');
                }}
                onSearchClickButton={() => {
                  clearSearchLmsAdmins();
                  clearSearchOrg();
                  setIdSearchGroup(null);
                  setNameSearchGroup('');
                  setResultSelectFlag('course');
                }}
              />
            </div>
          )}

          {config.isShowAdminGroup && (
            <SearchAdminGroup
              lmsGroupId={selectedLmsGroupId}
              organisationId={selectedOrganisationId}
              groupId={selectedGroupId}
              clearGroup={clearSearchDataGroups}
            />
          )}

          {config.isShowCourseCreator && (
            <SearchCourseCreator
              lmsGroupId={selectedLmsGroupId}
              organisationId={selectedOrganisationId}
              groupId={selectedGroupId}
              clearGroup={clearSearchDataGroups}
            />
          )}

          {report && (
            <div>
              <SelectCourse
                description={<IntlMessages id="report.type" />}
                groups={getDataForResultBlockSelect(isSelectedGroupsBlock)}
              />
            </div>
          )}
        </div>
        <div className={b('right-page')}>
          <ResultBlock
            data={getDataForResultBlock()}
            report={report}
            permission={permission}
            title={getFindMessage()}
            config={config}
            isLoading={config.isLoadingResult}
            onClickResultItem={getActionsSelectItem}
            belongs={getBelongsMessage()}
            selectAll={getActionsSelectAll()}
            selectNone={getActionsSelectNone()}
            isSelectCheckboxItem={config.isSelectCheckboxItemResult}
            selectedData={getDataForResultBlockSelect(isSelectedGroupsBlock)}
          />
          {config.isShowSelectedBlock && (
            // TODO move features in config function
            <SelectedResultBlock
              data={getDataForResultBlockSelect(isSelectedGroupsBlock)}
              title={getResultBlockTitle(isSelectedGroupsBlock)}
              description={getResultBlockDescription(isSelectedGroupsBlock)}
              report={report}
              onRemoveItem={removeResultBlockItem(isSelectedGroupsBlock)}
              isShowSelectedBlock={config.isShowSelectedBlock}
              onClickNext={() => {
                if (isSelectedGroupsBlock) {
                  onClickNextSelectedGroups(selectedGroups, selectedLmsGroupId);
                } else {
                  onClickNextSelectedOrganisations(selectedOrganisations);
                }
                if (history.location.state && history.location.state.cache) {
                  history.goBack();
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const searchLmsAdminsData = getSearchAdminsDataLmsGroupFp(state);
  const { user } = state.Auth;
  const { searchCourseData, searchTotalCourseData } = state.courses;
  const { selectedCourses } = state.courses;
  const { selectedOrganisation } = state.searchOrganisations;
  const searchStudentsData = getSearchStudentsDataFp(state);
  return {
    ...state.searchOrganisations,
    ...state.searchLmsGroup,
    ...state.searchGroup,
    ...state.courseCreator,
    isLoadingTotalOrganisation: state.searchOrganisations.isLoadingTotal,
    isLoadingTotalGroup: state.searchGroup.isLoadingTotal,
    isLoadingCourses: state.courses.isLoading,
    searchLmsAdminsData,
    searchStudentsData,
    user,
    searchCourseData,
    searchTotalCourseData,
    selectedCourses,
    selectedOrganisation,
  };
};


GlobalSearch.defaultProps = defaultProps;
export default connect(mapStateToProps, {
  ...searchLmsGroupActions,
  ...searchOrgActions,
  ...searchGroupActions,
  ...studentsActions,
  ...searchCoursesActions,
  ...courseCreatorActions,
})(GlobalSearch);
