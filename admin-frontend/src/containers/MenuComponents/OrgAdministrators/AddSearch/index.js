import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { ROLES } from '../../../../constants/constants';

const AddSearchOrgAdmins = ({ history, user, ...rest }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  useEffect(() => {
    if (!isXpectrumAdmin && user.roles) {
      history.push(URLS.orgAdminAdd);
    }
  }, [isXpectrumAdmin, user]);

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='organisationsAdd.findTitle' />}
      title={<IntlMessages id='orgAdmins.addBanner' />}
      isOrganisation
      isSelectedOrganisationsBlock
      onClickNextSelectedOrganisations={() => {
        history.push(URLS.orgAdminAdd);
      }}
      history={history}
      {...rest}
    />
  );
};

export default connect(
  ({ user }) => ({
    user: user.user,
  }),
  {}
)(AddSearchOrgAdmins);
