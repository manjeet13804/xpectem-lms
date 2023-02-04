import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getRegistrationLinksFp,
  getLoadingDeleteRegistrationLinks,
  getLoadingUpadateRegistrationLinks,
  getRegSelectedGroups,
  getRegSelectedCourses,
  getRegIsActive,
  getRegLinkTab,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
} from 'components';
import PropTypes from 'prop-types';
import { REG_LINKS_TABS } from 'constants/constants';
import RegLinksWrapper from './AddRegLinks.style';
import GlobalSearch from '../../../../_search/GlobalSearch';
import SearchCourse from '../components/SearchCourse';
import ConfirmCreateReglink from '../components/ConfirmCreateReglink';

const wrapper = bemlds('wrapper');

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  createRegistrationLink: PropTypes.func,
  addRegSelectedGroups: PropTypes.func,
  deleteRegSelectedGroup: PropTypes.func,
  addRegSelectedCourses: PropTypes.func,
  deleteRegSelectedCourse: PropTypes.func,
  switchRegLinkStatus: PropTypes.func,
  changeRegLinkTab: PropTypes.func,
  cleanUpCreateRegLinkState: PropTypes.func,
  selectedGroups: PropTypes.arr,
  selectedCourses: PropTypes.arr,
  isActive: PropTypes.bool,
  tab: PropTypes.string,
};

const defaultProps = {
  history: {
    push: () => null,
  },
  createRegistrationLink: () => null,
  addRegSelectedGroups: () => null,
  deleteRegSelectedGroup: () => null,
  addRegSelectedCourses: () => null,
  deleteRegSelectedCourse: () => null,
  switchRegLinkStatus: () => null,
  changeRegLinkTab: () => null,
  cleanUpCreateRegLinkState: () => null,
  selectedGroups: [],
  selectedCourses: [],
  isActive: false,
  tab: REG_LINKS_TABS.SELECT_GROUPS,
};

const RegLinks = (props) => {
  const {
    history,
    createRegistrationLink,
    addRegSelectedGroups,
    deleteRegSelectedGroup,
    addRegSelectedCourses,
    deleteRegSelectedCourse,
    switchRegLinkStatus,
    changeRegLinkTab,
    cleanUpCreateRegLinkState,
    selectedGroups,
    selectedCourses,
    isActive,
    tab,
  } = props;

  const handleRemoveSelectedGroup = (id) => {
    deleteRegSelectedGroup(id);
  };

  const handleRemoveSelectedCourse = (id) => {
    deleteRegSelectedCourse(id);
  };

  const handleChangeRegLinkStatus = () => {
    switchRegLinkStatus();
  };

  const selectedData = {
    selectedGroups,
    selectedCourses,
    isActive,
  };

  useEffect(() => () => {
    changeRegLinkTab(REG_LINKS_TABS.SELECT_GROUPS);
    cleanUpCreateRegLinkState();
  }, []);

  return (
    <LayoutContent>
      <RegLinksWrapper>
        <Banner title={<IntlMessages id="students.createLinksBanner" />} />
        <section className={wrapper()}>
          {tab === REG_LINKS_TABS.SELECT_GROUPS && (
          <GlobalSearch
            withoutDeactivated
            isOrganisation
            isGroup
            isSelectedGroupsBlock
            onClickNextSelectedGroups={(groups) => {
              addRegSelectedGroups(groups);
              changeRegLinkTab(REG_LINKS_TABS.SELECT_COURSES);
            }}
            history={history}
          />
          )}
          {tab === REG_LINKS_TABS.SELECT_COURSES && (
            <SearchCourse
              handleAddCourse={(courses) => {
                addRegSelectedCourses(courses);
                changeRegLinkTab(REG_LINKS_TABS.CONFIRM_DATA);
              }}
            />
          )}
          {tab === REG_LINKS_TABS.CONFIRM_DATA && (
          <ConfirmCreateReglink
            selectedData={selectedData}
            handleRemoveSelectedGroup={handleRemoveSelectedGroup}
            handleRemoveSelectedCourse={handleRemoveSelectedCourse}
            handleChangeRegLinkStatus={handleChangeRegLinkStatus}
            handleSaveRegLink={(data) => {
              const body = {
                groups: data.selectedGroups,
                courses: data.selectedCourses,
                active: data.isActive,
              };
              createRegistrationLink(body, history);
            }}
          />
          )}
        </section>
      </RegLinksWrapper>
    </LayoutContent>
  );
};

RegLinks.propTypes = propTypes;
RegLinks.defaultProps = defaultProps;

const mapStateToProps = state => ({
  registrationLinks: getRegistrationLinksFp(state),
  loadingDeleteRegistrationLinks: getLoadingDeleteRegistrationLinks(state),
  loadingUpadateRegistrationLinks: getLoadingUpadateRegistrationLinks(state),
  selectedGroups: getRegSelectedGroups(state),
  selectedCourses: getRegSelectedCourses(state),
  isActive: getRegIsActive(state),
  tab: getRegLinkTab(state),
});

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(RegLinks);
