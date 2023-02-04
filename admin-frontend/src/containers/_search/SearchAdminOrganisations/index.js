import React from 'react';
import { SearchPersonForm, IntlMessages } from 'components';
import { connect } from 'react-redux';
import searchOrgActions from 'redux/searchOrganisations/actions';

const SearchAdminOrganisations = ({
  person,
  changeStatePersonSearchOrg,
  searchOrgAdmins,
  lmsGroupId,
  organisationId,
  clearOrg,
}) => {
  const handleChange = ({ target }) => {
    changeStatePersonSearchOrg(target);
  };

  const handleSearch = () => {
    clearOrg();
    const params = Object.entries(person).reduce((acc, item) => ({
      ...acc,
      [item[0]]: item[1] || undefined,
    }), {});
    searchOrgAdmins({
      ...params,
      lmsGroup: lmsGroupId,
      organisation: organisationId,
    });
  };

  return (
    <SearchPersonForm
      {...person}
      onChange={handleChange}
      checkboxLabel={<IntlMessages id="orgAdmins.includeDeactivated" />}
      onSearch={handleSearch}
      findButtonTextId="orgAdmins.findBy"
    />
  );
};

const mapStateToProps = state => ({
  ...state.searchOrganisations,
});

export default connect(mapStateToProps, { ...searchOrgActions })(SearchAdminOrganisations);
