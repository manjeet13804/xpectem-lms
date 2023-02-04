import React, { useEffect, useMemo } from 'react';
import URLS from 'redux/urls';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import IntlMessages from 'components/utility/intlMessages';
import { ROLES } from '../../../../constants/constants';

const urlImportStudents = (id) => `${URLS.studentsImportUrl}/${id}`;

const FindGroupsForImport = ({ history, clearStudentsStore, ...rest }) => {
  const { user } = rest;

  useEffect(() => {
    clearStudentsStore();
  }, []);

  const isOrganisation = useMemo(() =>
    (user.roles || []).includes(ROLES.XPECTUM_ADMIN)
  );

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='students.findToAdd' />}
      title={<IntlMessages id='students.addBanner' />}
      isOrganisation={isOrganisation}
      isGroup
      isSelectedGroupsBlock
      onClickNextSelectedGroups={(e, selectedLmsGroupId) => {
        if (selectedLmsGroupId) {
          const path = urlImportStudents(selectedLmsGroupId);
          history.push(path);
        }

        if (e && !selectedLmsGroupId) {
          const ids = JSON.stringify(e.map((item) => item.id));
          const path = urlImportStudents(ids);
          history.push(path);
        }
      }}
      history={history}
      {...rest}
    />
  );
};

export default connect((state) => state.user, {
  ...studentsActions,
})(FindGroupsForImport);
