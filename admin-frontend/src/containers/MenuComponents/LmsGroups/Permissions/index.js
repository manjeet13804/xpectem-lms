import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import searchLmsGroup from 'redux/searchLmsGroup/actions';
import courseActions from 'redux/courses/actions';
import PermissionTable from 'components/permissionTable';
import {
  Banner,
  IntlMessages,
  LayoutContent,
  DefaultButton,
} from 'components';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import _ from 'lodash';
import { PERMISSIONS_TABLE } from 'constants/constants';
import LmsGroupsPermissions from './LmsGroupsPermissions.style';

const LmsGroupPermissions = (props) => {
  const {
    setCoursesPermission,
    selectedLmsGroups,
    selectedCourses,
    history,
    getCoursesPermission,
    coursePermission,
    isLoadingPermission,
  } = props;

  const [courseTable, setCourseTable] = useState([]);
  const [isRewrite, setIsRewrite] = useState(false);

  useEffect(() => {
    getCoursesPermission({
      permissionLevel: 'lms',
      courseIds: selectedCourses.map(item => item.id),
      ids: selectedLmsGroups.map(item => item.id),
    });
    if (_.isEmpty(selectedLmsGroups) || _.isEmpty(selectedCourses)) {
      history.push(URLS.lmsGroupsPermissionSearch);
    }
  }, []);

  useEffect(() => {
    setCourseTable(coursePermission);
  }, [coursePermission]);

  const handleSave = () => {
    setCoursesPermission({ permissionLevel: 'lms', courses: courseTable, isRewrite });
    history.push(URLS.lmsGroupsPermissionSearch);
  };

  return (
    <LayoutContent>
      <LmsGroupsPermissions>
        <Banner
          title={<IntlMessages id="lmsGroups.permissions" />}
        />
        <p className="permissions-title"><IntlMessages id="lmsGroups.permissionsTitle" /></p>
        {isLoadingPermission ? <Loader active={isLoadingPermission} /> : (
          <div>
            <div className="work-description">
              <p>
                {PERMISSIONS_TABLE.tableWorkDescriptionStart}
                {' '}
                (
                <b>"No access"</b>
                ,
                {' '}
                <b>"Access"</b>
                {' '}
                or
                {' '}
                <b>"Access & Edit"</b>
                )
                {' '}
                {PERMISSIONS_TABLE.tableWorkDescriptionEnd}
              </p>
            </div>
            { _.isEmpty(courseTable) ? null : (
              <PermissionTable
                rowTitle={selectedCourses}
                collTitle={selectedLmsGroups}
                tableData={courseTable}
                changeTableData={setCourseTable}
                buttonTypes={['No Access', 'Access', 'Access & Edit']}
                collName="LMS groups"
              />
            ) }
            <div>
              <Radio.Group
                onChange={({ target: { value } }) => setIsRewrite(value)}
                value={isRewrite}
                className="radio-button"
              >
                <Radio value>
                  <p className="permissions-overwrite"><IntlMessages id="lmsGroups.permissionsOverwrite" /></p>
                </Radio>
                <Radio value={false}>
                  <p className="permissions-retain"><IntlMessages id="lmsGroups.permissionsRetain" /></p>
                </Radio>
              </Radio.Group>
            </div>
            <div className="button-wrapper">
              <DefaultButton
                textId="tutors.saveBtn"
                onClick={handleSave}
              />
            </div>
          </div>
        )}
      </LmsGroupsPermissions>
    </LayoutContent>
  );
};

const mapStateToProps = ({ courses, searchLmsGroup }) => ({ ...courses, ...searchLmsGroup });

export default connect(mapStateToProps, { ...searchLmsGroup, ...courseActions })(LmsGroupPermissions);
