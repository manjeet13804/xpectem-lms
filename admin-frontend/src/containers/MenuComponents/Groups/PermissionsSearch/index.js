import React, { useMemo, useState } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import courseCreatorActions from 'redux/courseCreator/actions';
import courseActions from 'redux/courses/actions';
import { connect } from 'react-redux';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { Banner, BannerNotification } from '../../../../components';
import { ROLES } from 'constants/constants';

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

  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  const handleSelectUser = ({ id }) => {
    selectStudentReportID(id);
    selectCourseReportID(2);
    history.push(URLS.groupPermission);
  };

  return (
    <LayoutContent>
      <Banner title={<IntlMessages id='groups.permissions' />} />
      {isPermissionsSaved && (
        <BannerNotification
          error={false}
          title={<IntlMessages id='courses.permissionsSaved' />}
          close={closeCoursePermissions}
          isScrollMount
        />
      )}
      <IntlMessages id='lmsGroups.permissionsTitle' />
      <GlobalSearch
        searchCourses
        isShowLmsGroup
        isStudentGroup
        permission
        isSelectedGroupsBlock
        isSearchByGroup
        isOrganisation={isXpectrumAdmin}
        setCurrStudent={setCurrStudent}
        onClickResultStudent={handleSelectUser}
        currStudent={currStudent}
        onClickNextSelectedGroups={() => {
          history.push(URLS.groupPermission);
        }}
        history={history}
        searchType='group'
      />
    </LayoutContent>
  );
};
const mapStateToProps = ({
  searchGroup: { selectedGroups },
  courses: { isPermissionsSaved },
  user,
}) => ({
  selectedGroups,
  isPermissionsSaved,
  user: user.user,
});

export default connect(mapStateToProps, {
  ...courseCreatorActions,
  selectStudentReportID,
  selectCourseReportID,
  closeCoursePermissions,
})(PermissionSearch);
