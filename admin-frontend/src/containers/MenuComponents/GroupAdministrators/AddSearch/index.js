import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import URLS from 'redux/urls';
import { ROLES } from 'constants/constants';

const AddSearchGroupAdmins = ({ history, user, ...rest }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  return (
    <GlobalSearch
      titleForm={<IntlMessages id='groupAdmins.FindToAdd' />}
      title={<IntlMessages id='groupAdmins.addBanner' />}
      isOrganisation={isXpectrumAdmin}
      isGroup
      isSelectedGroupsBlock
      onClickNextSelectedGroups={() => {
        history.push(URLS.groupAdminsAddUrl);
      }}
      history={history}
      {...rest}
    />
  );
};

export default connect(({ user }) => user, {})(AddSearchGroupAdmins);
