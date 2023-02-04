import React from 'react';
import {
  Search,
} from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  IntlMessages,
  Checkbox,
} from 'components';
import {
  PLACEHOLDER,
} from 'constants/constants';
import searchGroupActions from 'redux/searchGroup/actions';
import Highlighter from 'react-highlight-words';
import { bemlds, caseDateInSelect } from 'utils';
import './styles.scss';

const b = bemlds('search-group');
const { groupName } = PLACEHOLDER;
const rerenderResult = value => ({ title }) => (
  <Highlighter
    highlightClassName={b('title-highlighter')}
    searchWords={[_.escapeRegExp(value)]}
    textToHighlight={title}
  />
);

const SearchGroupReport = ({
  isLoading,
  getGroups,
  groups,
  value,
  date,
  className,
  onSearch,
  onSearchClickButton,
  classNameSearchBlock,
  setSearchValueGroup,
  organisationName,
  lmsGroupId,
  organisationId,
  setIsDeactivated,
  isDeactivated,
}) => {
  const search = _.debounce((payload) => {
    getGroups(payload);
  }, 500);

  const handleChangeSearch = (e, { value }) => {
    onSearch(e, { value });
    if (value) {
      search({
        createdAt: date ? caseDateInSelect(date) : undefined,
        name: value.trim() || undefined,
        lmsGroup: lmsGroupId,
        organisation: organisationId,
        onlyActive: !isDeactivated,
      });
    }
    setSearchValueGroup(value);
  };

  const handleResultSelect = (e, { result }) => {
    search({ name: result.title });
    setSearchValueGroup(result.title);
  };

  const searchTotalResults = () => {
    const createdAt = date ? caseDateInSelect(date) : undefined;
    getGroups({
      createdAt,
      name: value.trim() || undefined,
      lmsGroup: lmsGroupId,
      organisation: organisationId,
      onlyActive: !isDeactivated,
    }, true);
  };
  return (
    <div className={b({ mix: className })}>
      <div className={b('search-block', { mix: classNameSearchBlock })}>
        <div className={b('title-input')}>
          <IntlMessages id="groups.searchTitle" />
          <span className={b('organisation-name')}>{organisationName}</span>
        </div>
        <p className={b('title-input')}>
          <IntlMessages id="students.searchAllGroups" />
        </p>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleChangeSearch}
          value={value}
          results={groups}
          resultRenderer={rerenderResult(value)}
          className={b('search')}
          placeholder={groupName}
        />
        <div className={b('checkbox')}>
          <Checkbox
            title={<IntlMessages id="organisations.findCheckGroup" />}
            handleCheck={setIsDeactivated}
            value={isDeactivated}
          />
        </div>
        <div className={b('button-wrapper')}>
          <button
            onClick={() => {
              searchTotalResults();
              onSearchClickButton();
            }}
            className={b('button')}
          >
            <IntlMessages id="groups.findBy" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ SearchGroupReport }) => ({ ...SearchGroupReport });

export default connect(mapStateToProps, { ...searchGroupActions })(SearchGroupReport);
