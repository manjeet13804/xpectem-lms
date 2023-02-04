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
      titleForm={<IntlMessages id='groupAdmins.editTitle' />}
      title={<IntlMessages id='groupAdmins.editBanner' />}
      isOrganisation={isXpectrumAdmin}
      isGroup
      isAdminGroup
      onClickResultAdminGroup={(id) =>
        history.push(`${URLS.groupAdminsEditUrl}/${id}`)
      }
    />
  );
};

export default connect(({ user }) => user, {})(EditSearchGroup);
