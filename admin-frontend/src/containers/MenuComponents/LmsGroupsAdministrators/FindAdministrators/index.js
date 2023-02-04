import React from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import {
  getCurrentAdminFp,
  getSearchDataLmsGroupFp,
  getCurrentLmsGroupIdFp,
  getSearchAdminsDataLmsGroupFp,
} from 'selectors';
import IntlMessages from 'components/utility/intlMessages';
import GlobalSearch from 'containers/_search/GlobalSearch';

const urlCurrentAdmin = id => `${URLS.lmsGroupAdminEditUrl}/${id}`;

const AdministratorsFind = ({ history }) => (
  <GlobalSearch
    titleForm={<IntlMessages id="groupAdmin.findAdmin" />}
    title={<IntlMessages id="groupAdmin.editBanner" />}
    isAdminLms
    onClickResultAdminLmsGroups={id => history.push(urlCurrentAdmin(id))}
  />
);
const mapStateToProps = (state) => {
  const currentAdmin = getCurrentAdminFp(state);
  const searchData = getSearchDataLmsGroupFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdFp(state);
  const searchAdminsData = getSearchAdminsDataLmsGroupFp(state);

  return {
    searchData,
    currentAdmin,
    currentLmsGroupId,
    searchAdminsData,
  };
};

export default connect(mapStateToProps, { ...lmsGroupAdminsActions })(AdministratorsFind);
