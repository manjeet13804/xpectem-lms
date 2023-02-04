import React, { useMemo } from 'react';
import {
  Search,
} from 'semantic-ui-react';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  IntlMessages,
  Checkbox,
} from 'components';
import searchGroupActions from 'redux/searchGroup/actions';
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

const b = bemlds('search-group');

const rerenderResult = value => ({ title }) => (
  <Highlighter
    highlightClassName={b('title-highlighter')}
    searchWords={[_.escapeRegExp(value)]}
    textToHighlight={title}
  />
);

const SearchGroup = ({
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
  withoutDeactivated,
  user
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

  const organisationNameText = useMemo(()=>{
    if (organisationName) {
      return organisationName
    }
    if(user.groups && user.groups.length > 0) {
      return user.groups[0].organisation.name
    }
  },[organisationName, user])
  
  return (
    <div className={b({ mix: className })}>
      <div className={b('search-block', { mix: classNameSearchBlock })}>
        <div className={b('title-input')}>
          <IntlMessages id="groups.searchTitle" />
          <span className={b('organisation-name')}>{organisationNameText}</span>
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
          placeholder="Group name"
        />
        {!withoutDeactivated && (
        <div className={b('checkbox')}>
          <Checkbox
            title={<IntlMessages id="organisations.findCheckGroup" />}
            handleCheck={setIsDeactivated}
            value={isDeactivated}
          />
        </div>
        )}
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

const mapStateToProps = ({ searchGroup, user }) => ({ ...searchGroup, user:user.user });

SearchGroup.propTypes = propTypes;
SearchGroup.defaultProps = defaultProps;
export default connect(mapStateToProps, { ...searchGroupActions })(SearchGroup);
