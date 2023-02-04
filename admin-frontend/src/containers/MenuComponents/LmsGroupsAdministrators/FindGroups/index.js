import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import { getSearchDataLmsGroupFp } from 'selectors';
import URLS from 'redux/urls';
import GlobalSearch from 'containers/_search/GlobalSearch';
import IntlMessages from 'components/utility/intlMessages';

const proptypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  setCurrentLmsGroupId: PropTypes.func,
};

const defaultProps = {
  history: {},
  setCurrentLmsGroupId: () => null,
};

const urlCurrentGroup = id => `${URLS.lmsGroupAdminAddUrl}/${id}`;

const AdministratorsFindGroups = ({
  setCurrentLmsGroupId,
  history,
}) => (
  <GlobalSearch
    titleForm={<IntlMessages id="groupAdmin.findToAddAdmin" />}
    title={<IntlMessages id="groupAdmin.addBanner" />}
    isSelectedGroupsBlock
    onClickResultLmsGroup={(id) => {
      setCurrentLmsGroupId(id);
      const path = urlCurrentGroup(id);
      history.push(path);
    }}
    history={history}
  />
);

const mapStateToProps = (state) => {
  const searchData = getSearchDataLmsGroupFp(state);

  return { searchData };
};

AdministratorsFindGroups.defaultProps = defaultProps;
AdministratorsFindGroups.propTypes = proptypes;
export default connect(mapStateToProps, { ...lmsGroupAdminsActions })(AdministratorsFindGroups);
