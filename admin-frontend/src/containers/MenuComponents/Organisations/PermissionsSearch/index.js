import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import courseActions from 'redux/courses/actions';
import courseCreatorActions from 'redux/courseCreator/actions';
import { Banner, BannerNotification } from 'components';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { ROLES } from 'constants/constants';
import GlobalSearch from 'containers/_search/GlobalSearch';

const {
  selectStudentReportID,
  selectCourseReportID,
  closeCoursePermissions,
} = courseActions;

const PermissionSearch = (props) => {
  const {
    selectCourseReportID,
    selectStudentReportID,
    history,
    isPermissionsSaved,
    closeCoursePermissions,
    user,
  } = props;

  const [currStudent, setCurrStudent] = useState();
  const handleSelectUser = ({ id }) => {
    selectStudentReportID(id);
    selectCourseReportID(2);
    history.push(URLS.organisationPermission);
  };

  const isOrganisation = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  return (
    <LayoutContent>
      <Banner title={<IntlMessages id='organisation.permissions' />} />
      {isPermissionsSaved && (
        <BannerNotification
          error={false}
          title={<IntlMessages id='courses.permissionsSaved' />}
          close={closeCoursePermissions}
          isScrollMount
        />
      )}
      <IntlMessages id='organisation.permissionsTitle' />
      <GlobalSearch
        searchCourses
        isShowLmsGroup
        isOrganisation={isOrganisation}
        permission
        setCurrStudent={setCurrStudent}
        permissionOrganisation={isOrganisation}
        isSelectedGroupsBlock
        isSelectCheckboxItemResult
        onClickResultStudent={handleSelectUser}
        currStudent={currStudent}
        onClickNextSelectedGroups={() => {
          history.push(URLS.organisationPermission);
        }}
        history={history}
        searchType={isOrganisation ? 'organisation' : 'course'}
      />
    </LayoutContent>
  );
};
const mapStateToProps = ({
  searchGroup: { selectedGroups },
  courses: { isPermissionsSaved },
  user: { user },
}) => ({
  selectedGroups,
  isPermissionsSaved,
  user,
});

export default connect(mapStateToProps, {
  ...courseCreatorActions,
  selectStudentReportID,
  selectCourseReportID,
  closeCoursePermissions,
})(PermissionSearch);
