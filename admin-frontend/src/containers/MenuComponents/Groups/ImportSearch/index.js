import React, { useEffect, useMemo } from 'react';
import URLS from 'redux/urls';
import { connect } from 'react-redux';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { ROLES } from 'constants/constants';

const ImportSearch = ({ history, user }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  useEffect(() => {
    if (!isXpectrumAdmin && user.organisations) {
      const { id } = user.organisations[0];
      history.push(`${URLS.groupsImport}/${id}`);
    }
  }, [isXpectrumAdmin, history, user]);
  
  return (
    <GlobalSearch
      onClickResultOrganisation={(id) =>
        history.push(`${URLS.groupsImport}/${id}`)
      }
      titleForm={<IntlMessages id='groups.findToAdd' />}
      title={<IntlMessages id='groups.importBanner' />}
      isOrganisation
    />
  );
};

export default connect(({ user }) => user, {})(ImportSearch);
