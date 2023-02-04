import React from 'react';
import { SearchPersonForm, IntlMessages } from 'components';
import { connect } from 'react-redux';
import courseCreatorActions from '../../../redux/courseCreator/actions';

const SearchCourseCreator = ({
  person,
  changeStatePersonCourseCreator,
  searchCourseCreators,
  lmsGroupId,
  organisationId,
  groupId,
  clearGroup,
}) => {

  const handleChange = ({ target }) => {
    changeStatePersonCourseCreator(target);
  };

  const handleSearch = () => {
    clearGroup();
    const params = Object.entries(person).reduce((acc, item) => ({
      ...acc,
      [item[0]]: item[1] || undefined,
    }), {});
    searchCourseCreators({
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
      checkboxLabel={<IntlMessages id="courseCreator.findCheck" />}
      onSearch={handleSearch}
      findButtonTextId="courseCreators.findBy"
    />
  );
};

const mapStateToProps = state => ({
  ...state.courseCreator,
});

export default connect(mapStateToProps, { ...courseCreatorActions })(SearchCourseCreator);
