import React from 'react';
import { SearchPersonForm, IntlMessages } from 'components';
import { connect } from 'react-redux';
import searchGroupActions from 'redux/searchGroup/actions';

const SearchAdminGroup = ({
  person,
  changeStatePersonSearchGroup,
  searchGroupAdmins,
  lmsGroupId,
  organisationId,
  groupId,
  clearGroup,
}) => {
  const handleChange = ({ target }) => {
    changeStatePersonSearchGroup(target);
  };

  const handleSearch = () => {
    clearGroup();
    const params = Object.entries(person).reduce((acc, item) => ({
      ...acc,
      [item[0]]: item[1] || undefined,
    }), {});
    searchGroupAdmins({
      ...params,
      lmsGroup: lmsGroupId,
      organisation: organisationId,
      group: groupId,
    });
  };

  return (
    <SearchPersonForm
      {...person}
      onChange={handleChange}
      checkboxLabel={<IntlMessages id="groupAdmins.includeDeactivated" />}
      onSearch={handleSearch}
      findButtonTextId="groupAdmins.findBy"
    />
  );
};

const mapStateToProps = state => ({
  ...state.searchGroup,
});

export default connect(mapStateToProps, { ...searchGroupActions })(SearchAdminGroup);
