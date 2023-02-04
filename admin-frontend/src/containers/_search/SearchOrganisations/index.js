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
import organisationsActions from 'redux/searchOrganisations/actions';
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
};

const b = bemlds('search-organisations');

const rerenderResult = value => ({ title }) => (
  <Highlighter
    highlightClassName={b('title-highlighter')}
    searchWords={[_.escapeRegExp(value)]}
    textToHighlight={title}
  />
);

const SearchOrganisations = (props) => {
  const {
  isLoading,
  getOrganisations,
  setSearchValueOrganisations,
  organisations,
  value,
  setSearchDate,
  date,
  className,
  titleInput,
  lmsGroupId,
  onSearch,
  setIsDeactivated,
  isDeactivated,
  withoutDeactivated,
  } = props;
  const search = _.debounce((payload) => {
    getOrganisations(payload);
  }, 500);

  const handleChangeSearch = (e, { value }) => {
    if (value) {
      search({
        name: value,
        lmsGroup: lmsGroupId,
        onlyActive: !isDeactivated,
      });
    }
    setSearchValueOrganisations(value);
  };

  const handleResultSelect = (e, { result }) => {
    search({ name: result.title });
    setSearchValueOrganisations(result.title);
  };

  const searchTotalResults = () => {
    const createdAt = date ? caseDateInSelect(date) : undefined;
    getOrganisations({
      lmsGroup: lmsGroupId,
      createdAt,
      name: value || undefined,
      onlyActive: !isDeactivated,
    }, true);
    onSearch();
  };

  return (
    <div className={b({ mix: className })}>
      <div className={b('search-block')}>
        <div className={b('title-input')}>
          {titleInput}
        </div>
        <p className={b('title-input')}>
          <IntlMessages id="students.searchAllOrganisations" />
        </p>
        <Search
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={handleChangeSearch}
          value={value}
          results={organisations}
          resultRenderer={rerenderResult(value)}
          className={b('search')}
          placeholder="Organisation name"
        />
        <div className={b('under-search')}>
          <SelectAnyTime
            handleDataSave={setSearchDate}
            status
          />
          {!withoutDeactivated && (
          <div className={b('checkbox')}>
            <Checkbox
              title={<IntlMessages id="organisations.findCheckOrg" />}
              handleCheck={setIsDeactivated}
              value={isDeactivated}
            />
          </div>
          )}
        </div>
        <div className={b('button-wrapper')}>
          <button
            onClick={searchTotalResults}
            className={b('button')}
          >
            <IntlMessages id="organisations.findBy" />
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ searchOrganisations }) => ({ ...searchOrganisations });

SearchOrganisations.propTypes = propTypes;
SearchOrganisations.defaultProps = defaultProps;
export default connect(mapStateToProps, { ...organisationsActions })(SearchOrganisations);
