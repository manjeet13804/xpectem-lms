import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { ROLES } from 'constants/constants';

const ImportSearch = ({ history, user, ...rest }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  useEffect(() => {
    if (!isXpectrumAdmin && user.roles) {
      history.push(URLS.orgAdminImportForm);
    }
  }, [isXpectrumAdmin, user]);

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='organisations.findToEditAdmin' />}
      title={<IntlMessages id='organisations.findOrganisations' />}
      isOrganisation
      isSelectedOrganisationsBlock
      onClickNextSelectedOrganisations={() => {
        history.push(URLS.orgAdminImportForm);
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
)(ImportSearch);
