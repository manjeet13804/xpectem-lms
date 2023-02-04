import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Highlighter from 'react-highlight-words';
import _ from 'lodash';
import { bemlds } from 'utils';
import { Search } from 'semantic-ui-react';
import { IntlMessages } from 'components';
import searchCourseActions from 'redux/courses/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import { ROLES } from 'constants/constants';
import './styles.scss';

const b = bemlds('search-group');

const rerenderResult = (value) => ({ title }) => (
  <Highlighter
    highlightClassName={b('title-highlighter')}
    searchWords={[_.escapeRegExp(value)]}
    textToHighlight={title}
  />
);

const SearchCourse = (props) => {
  const {
    isLoadingCourse,
    searchCourseForReport,
    searchCourseData,
    className,
    onSearchClickButton,
    classNameSearchBlock,
    disabled,
    onSearch,
    selectedOrganisation,
    lmsGroupId,
    user,
    isSearchByGroup
  } = props;

  const search = _.debounce((payload) => {
    searchCourseForReport(payload);
  }, 500);
  const [searchValue, setSearchValue] = useState({
    title: '',
  });
  const handleChangeSearch = (e, { value }) => {
    setSearchValue({ ...searchValue, title: value, lmsGroupId });
    onSearch(e, { value });
    if (value) {
      search({
        title: value,
      });
    }
  };

  const handleResultSelect = (e, { result }) => {
    search({
      title: searchValue.title,
    });
    setSearchValue({ ...searchValue, title: result.title, lmsGroupId });
  };

  const searchTotalResults = () => {
    searchCourseForReport(
      {
        title: searchValue.title,
      },
      true
    );
  };
  const selectedOrganisationWithRole = useMemo(
    () =>
      ((user.user && user.user.roles) || []).includes(ROLES.XPECTUM_ADMIN) || isSearchByGroup
        ? selectedOrganisation
        : (user.user.organisations || []).map((organisation) => ({
            text: organisation.name,
          })),
    [selectedOrganisation, user]
  );

  return (
    <div className={b({ mix: className })}>
      <div className={b('search-block', { mix: classNameSearchBlock })}>
        <div className={b('title-input')}>
          <IntlMessages id='courses.searchTitle' />
          {!_.isEmpty(selectedOrganisationWithRole) && (
            <span className={b('organisation-name')}>
              {selectedOrganisationWithRole.reduce(
                (acc, el) => (acc ? `${acc}, ${el.text}` : el.text),
                ''
              )}
            </span>
          )}
        </div>
        <p className={b('title-input')}>
          <IntlMessages id='courses.searchAllCourses' />
        </p>
        <Search
          loading={isLoadingCourse}
          onResultSelect={handleResultSelect}
          onSearchChange={handleChangeSearch}
          value={searchValue.title}
          results={searchCourseData}
          resultRenderer={rerenderResult(searchValue.title)}
          className={b('search')}
          placeholder='Course name'
        />
        <div className={b('button-wrapper')}>
          <button
            type='button'
            onClick={() => {
              searchTotalResults();
              onSearchClickButton();
            }}
            disabled={disabled}
            className={b('button', { disabled })}
          >
            <IntlMessages id='courses.findBy' />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  courses,
  searchGroup,
  searchLmsGroup,
  searchOrganisations,
  user,
}) => ({
  ...courses,
  ...searchGroup,
  selectedLmsGroup: searchLmsGroup,
  isLoadingCourse: courses.isLoading,
  selectedOrganisation: searchOrganisations.selectedOrganisation,
  user,
});

export default connect(mapStateToProps, {
  ...searchCourseActions,
  ...searchGroupActions,
})(SearchCourse);
