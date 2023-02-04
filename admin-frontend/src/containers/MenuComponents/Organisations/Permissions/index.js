import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
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
import searchOrgActions from 'redux/searchOrganisations/actions';
import { PERMISSIONS_TABLE } from 'constants/constants';
import OrganisationsPermissions from './OrganisationsPermissions.style';

const PermissionsOrganisation = (props) => {
  const {
    setCoursesPermission,
    selectedOrganisation,
    selectedCourses,
    history,
    getCoursesPermission,
    coursePermission,
    isLoadingPermission,
    user
  } = props;

  const [courseTable, setCourseTable] = useState([]);
  const [isRewrite, setIsRewrite] = useState(false);

  useEffect(() => {
    const ids = user.user.groups.reduce(
      (acc, rec) => {
        if (acc.includes(rec.organisation.id)) {
          return acc
        }
        return [...acc, rec.organisation.id]
      },
      []
    )
    getCoursesPermission({
      permissionLevel: 'organisation',
      courseIds: selectedCourses.map(item => item.id),
      ids,
    });
    if (_.isEmpty(ids) || _.isEmpty(selectedCourses)) {
      history.push(URLS.organisationPermissionSearch);
    }
  }, []);

  useEffect(() => {
    setCourseTable(coursePermission);
  }, [coursePermission]);

  const handleSave = () => {
    setCoursesPermission({ permissionLevel: 'organisation', courses: courseTable, isRewrite });
    history.push(URLS.organisationPermissionSearch);
  };

  return (
    <LayoutContent>
      <OrganisationsPermissions>
        <Banner
          title={<IntlMessages id="organisations.permissions" />}
        />
        <p className="permissions-title"><IntlMessages id="organisations.permissionsTitle" /></p>
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
                collTitle={selectedOrganisation}
                tableData={courseTable}
                changeTableData={setCourseTable}
                buttonTypes={['No Access', 'Access']}
                collName="Organisations"

              />
            ) }
            <div>
              <Radio.Group
                onChange={({ target: { value } }) => setIsRewrite(value)}
                value={isRewrite}
                className="radio-button"
              >
                <Radio value>
                  <p className="permissions-overwrite"><IntlMessages id="organisations.permissionsOverwrite" /></p>
                </Radio>
                <Radio value={false}>
                  <p className="permissions-retain"><IntlMessages id="organisations.permissionsRetain" /></p>
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
      </OrganisationsPermissions>
    </LayoutContent>
  );
};

const mapStateToProps = ({ courses, searchOrganisations, user }) => ({ ...courses, ...searchOrganisations, user });

export default connect(mapStateToProps, { ...searchOrgActions, ...courseActions })(PermissionsOrganisation);
