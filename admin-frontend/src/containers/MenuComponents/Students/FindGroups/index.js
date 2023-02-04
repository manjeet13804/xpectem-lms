import React, { useEffect, useMemo } from 'react';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import studentsActions from 'redux/students/actions';
import IntlMessages from 'components/utility/intlMessages';
import { ROLES } from '../../../../constants/constants';

const urlAddAdmins = (id) => `${URLS.studentsAddUrl}/${id}`;

const FindGroups = ({ history, clearStudentsStore, ...rest }) => {
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
      onClickNextSelectedGroups={() => {
        const path = urlAddAdmins(1);
        history.push(path);
      }}
      history={history}
      {...rest}
    />
  );
};

export default connect((state) => state.user, {
  ...studentsActions,
})(FindGroups);
