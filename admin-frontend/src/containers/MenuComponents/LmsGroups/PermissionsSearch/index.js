import React, { useState } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import courseCreatorActions from 'redux/courseCreator/actions';
import courseActions from 'redux/courses/actions';
import { connect } from 'react-redux';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { Banner, BannerNotification } from '../../../../components';

const { selectStudentReportID, selectCourseReportID, closeCoursePermissions } = courseActions;

const LmsGroupPermissionsSearch = (props) => {
  const {
    selectCourseReportID,
    selectStudentReportID,
    history,
    isPermissionsSaved,
    closeCoursePermissions,
  } = props;
  const [currStudent, setCurrStudent] = useState();
  const handleSelectUser = ({ id }) => {
    selectStudentReportID(id);
    selectCourseReportID(2);
    history.push(URLS.lmsGroupsPermission);
  };

  return (
    <LayoutContent>
      <Banner title={<IntlMessages id="lmsGroups.permissions" />} />
      {isPermissionsSaved && (
        <BannerNotification
          error={false}
          title={<IntlMessages id="courses.permissionsSaved" />}
          close={closeCoursePermissions}
          isScrollMount
        />
      )}
      <IntlMessages id="lmsGroups.permissionsTitle" />
      <GlobalSearch
        searchCourses
        isShowLmsGroup
        permission
        permissionLmsGroup
        setCurrStudent={setCurrStudent}
        isSelectedGroupsBlock
        onClickResultStudent={handleSelectUser}
        currStudent={currStudent}
        onClickNextSelectedGroups={() => {
          history.push(URLS.lmsGroupsPermission);
        }}
        history={history}
        searchType="lms"
      />
    </LayoutContent>
  );
};

const mapStateToProps = ({
  searchGroup: {
    selectedGroups,
  },
  courses: {
    isPermissionsSaved,
  },
}) => ({
  selectedGroups,
  isPermissionsSaved,
});

export default connect(mapStateToProps,
  {
    ...courseCreatorActions,
    selectStudentReportID,
    selectCourseReportID,
    closeCoursePermissions,
  })(LmsGroupPermissionsSearch);
