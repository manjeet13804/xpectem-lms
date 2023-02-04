import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { ROLES } from 'constants/constants';

const EditSearchGroup = ({ history, user }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  return (
    <GlobalSearch
      title={<IntlMessages id='orgAdmins.editBanner' />}
      isAdminOrganisation
      isOrganisation={isXpectrumAdmin}
      onClickResultAdminOrganisation={(id) =>
        history.push(`${URLS.orgAdminEdit}/${id}`)
      }
    />
  );
};

export default connect(({ user }) => user, {})(EditSearchGroup);
