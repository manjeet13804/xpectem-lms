import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { ROLES } from 'constants/constants';

const AddSearchGroup = ({ history, user }) => {
  const isXpectrumAdmin = useMemo(
    () => (user.roles || []).includes(ROLES.XPECTUM_ADMIN),
    [user]
  );

  useEffect(() => {
    if (!isXpectrumAdmin && user.organisations) {
      const { id } = user.organisations[0];
      history.push(`${URLS.groupsAdd}/${id}`);
    }
  }, [isXpectrumAdmin, history, user]);

  return (
    <GlobalSearch
      onClickResultOrganisation={(id) =>
        history.push(`${URLS.groupsAdd}/${id}`)
      }
      titleForm={<IntlMessages id='groups.findToAdd' />}
      title={<IntlMessages id='groups.titleBanner' />}
      isOrganisation
    />
  );
};

export default connect(({ user }) => user, {})(AddSearchGroup);
