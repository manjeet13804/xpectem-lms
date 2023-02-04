import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { ROLES } from 'constants/constants';

const ImportSearchGroupAdmins = ({ history, user, ...rest }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='groupAdmins.descriptionImport' />}
      title={<IntlMessages id='groupAdmins.importTitle' />}
      isOrganisation={isXpectrumAdmin}
      isGroup
      isSelectedGroupsBlock
      onClickNextSelectedGroups={() => {
        history.push(URLS.groupsAdminsImportFormUrl);
      }}
      history={history}
      {...rest}
    />
  );
};

export default connect(({ user }) => user, {})(ImportSearchGroupAdmins);
