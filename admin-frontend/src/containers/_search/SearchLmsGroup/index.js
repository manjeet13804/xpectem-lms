import React from 'react';
import {
  Search,
} from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  IntlMessages,
  SelectAnyTime,
  Checkbox,
} from 'components';
import lmsGroupActions from 'redux/searchLmsGroup/actions';
import Highlighter from 'react-highlight-words';
import { bemlds, caseDateInSelect } from 'utils';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  isLoading: PropTypes.bool,
  isLoadingTotal: PropTypes.bool,
  getLmsGroups: PropTypes.func,
  setSearchValueLmsGroup: PropTypes.func,
  lmsGroups: PropTypes.arrayOf(PropTypes.shape({})),
  value: PropTypes.string,
  setSearchDate: PropTypes.func,
  setIsDeactivated: PropTypes.func,
  isDeactivated: PropTypes.bool,
  date: PropTypes.string,
  lmsGroupsTotal: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onClickResultItem: PropTypes.func,
  isShowResult: PropTypes.bool,
  onSearch: PropTypes.func,
  onSearchClickButton: PropTypes.func,
  classNameSearchBlock: PropTypes.func,
};

const defaultProps = {
  isLoading: false,
  isLoadingTotal: false,
  getLmsGroups: () => null,
  setSearchValueLmsGroup: () => null,
  lmsGroups: [],
  value: '',
  setSearchDate: () => null,
  setIsDeactivated: () => null,
  isDeactivated: false,
  date: '',
  lmsGroupsTotal: [],
  className: '',
  onClickResultItem: () => null,
  isShowResult: true,
  onSearch: () => null,
  onSearchClickButton: () => null,
  classNameSearchBlock: '',
};

const b = bemlds('search-lms-group');

const rerenderResult = value => ({ title }) => (
  <Highlighter
    highlightClassName={b('title-highlighter')}
    searchWords={[_.escapeRegExp(value)]}
    textToHighlight={title}
  />
);

const SearchGroup = ({
  isLoading,
  getLmsGroups,
  setSearchValueLmsGroup,
  lmsGroups,
  value,
  setSearchDate,
  setIsDeactivated,
  isDeactivated,
  date,
  className,
  onSearch,
  onSearchClickButton,
  classNameSearchBlock,
  withoutDeactivated,
}) => {
  const search = _.debounce((payload) => {
    getLmsGroups(payload);
  }, 500);

  const handleChangeSearch = (e, { value }) => {
    onSearch(e, { value });
    if (value) {
      search({
        name: value.trim() || undefined,
        onlyActive: !isDeactivated,
      });
    }
    setSearchValueLmsGroup(value);
  };

  const handleResultSelect = (e, { result }) => {
    search({ name: result.title });
    setSearchValueLmsGroup(result.title);
  };

  const searchTotalResults = () => {
    const createdAt = date ? caseDateInSelect(date) : undefined;
    getLmsGroups({
      createdAt,
      name: value.trim() || undefined,
      onlyActive: !isDeactivated,
    }, true);
  };

  return (
    <div className={b({ mix: className })}>
      <div className={b('search-block', { mix: classNameSearchBlock })}>
        <div className={b('title-input')}>
          <IntlMessages id="groupAdmin.findSearch" />
        </div>
        <p className={b('title-input')}>
          <IntlMessages id="students.searchAllLms" />
        </p>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleChangeSearch}
          value={value}
          results={lmsGroups}
          resultRenderer={rerenderResult(value)}
          className={b('search')}
          placeholder="LMS group name"
        />
        <div className={b('under-search')}>
          <SelectAnyTime
            handleDataSave={setSearchDate}
            status
          />
          {!withoutDeactivated && (
          <div className={b('checkbox')}>
            <Checkbox
              title={<IntlMessages id="lmsGroups.checkDeactivite" />}
              handleCheck={setIsDeactivated}
              value={isDeactivated}
            />
          </div>
          )}
        </div>
        <div className={b('button-wrapper')}>
          <button
            onClick={() => {
              searchTotalResults();
              onSearchClickButton();
            }}
            className={b('button')}
          >
            <IntlMessages id="lmsGroups.findBy" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ searchLmsGroup }) => ({ ...searchLmsGroup });

SearchGroup.propTypes = propTypes;
SearchGroup.defaultProps = defaultProps;
export default connect(mapStateToProps, { ...lmsGroupActions })(SearchGroup);
