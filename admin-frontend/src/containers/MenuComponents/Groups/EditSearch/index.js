import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { IntlMessages } from 'components';
import URLS from 'redux/urls';
import { ROLES } from 'constants/constants';

const EditSearchGroup = ({ history, user }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='groups.findToEdit' />}
      title={<IntlMessages id='groups.editTitle' />}
      onClickResultGroup={(id) => history.push(`${URLS.groupsEdit}/${id}`)}
      isOrganisation={isXpectrumAdmin}
      isGroup
    />
  );
};

export default connect(({ user }) => user, {})(EditSearchGroup);
