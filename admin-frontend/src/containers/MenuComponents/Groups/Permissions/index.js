import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import searchGroupActions from 'redux/searchGroup/actions';
import courseActions from 'redux/courses/actions';
import PermissionTable from 'components/permissionTable';
import { connect } from 'react-redux';
import {
  Banner,
  IntlMessages,
  LayoutContent,
  DefaultButton,
} from 'components';
import { PERMISSIONS_TABLE } from 'constants/constants';
import URLS from 'redux/urls';
import _ from 'lodash';
import GroupsPermissions from './GroupsPermissions.style';

const GroupPermissions = (props) => {
  const {
    setCoursesPermission,
    selectedGroups,
    selectedCourses,
    history,
    getCoursesPermission,
    coursePermission,
    isLoadingPermission,
  } = props;

  const [courseTable, setCourseTable] = useState([]);

  useEffect(() => {
    getCoursesPermission({
      permissionLevel: 'group',
      courseIds: selectedCourses.map(item => item.id),
      ids: selectedGroups.map(item => item.id),
    });
    if (_.isEmpty(selectedGroups) || _.isEmpty(selectedCourses)) {
      history.push(URLS.groupPermissionSearch);
    }
  }, []);

  useEffect(() => {
    if (coursePermission) {
      setCourseTable(coursePermission);
    }
  }, [coursePermission]);

  const handleSave = () => {
    setCoursesPermission({ permissionLevel: 'group', courses: courseTable, isRewrite: false });
    history.push(URLS.groupPermissionSearch);
  };

  return (
    <LayoutContent>
      <GroupsPermissions>
        <Banner
          title={<IntlMessages id="groups.permissions" />}
        />
        <p className="permissions-title"><IntlMessages id="groups.permissionsTitle" /></p>
        {isLoadingPermission ? <Loader active={isLoadingPermission} /> : (
          <div>
            <div className="work-description">
              <p>
                {PERMISSIONS_TABLE.tableWorkDescriptionStart}
                {' '}
                (
                <b>"No access"</b>
                {' '}
                or
                {' '}
                <b>"Access"</b>
                )
                {' '}
                {PERMISSIONS_TABLE.tableWorkDescriptionEnd}
              </p>
            </div>
            { _.isEmpty(courseTable) ? null : (
              <PermissionTable
                rowTitle={selectedCourses}
                collTitle={selectedGroups}
                tableData={courseTable}
                changeTableData={setCourseTable}
                buttonTypes={['No Access', 'Access']}
                collName="Groups"
              />
            )}
            <div className="button-wrapper">
              <DefaultButton
                textId="tutors.saveBtn"
                onClick={handleSave}
              />
            </div>
          </div>
        )}
      </GroupsPermissions>
    </LayoutContent>
  );
};

const mapStateToProps = ({ courses, searchGroup }) => ({ ...courses, ...searchGroup });

export default connect(mapStateToProps, { ...searchGroupActions, ...courseActions })(GroupPermissions);
