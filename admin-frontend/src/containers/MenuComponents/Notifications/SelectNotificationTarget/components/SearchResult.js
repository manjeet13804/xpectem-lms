import React, { memo, useCallback } from 'react';
import { IntlMessages } from 'components';
import { DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import { bemlds } from 'utils';
import { Loader, Dimmer, Segment } from 'semantic-ui-react';
import _ from 'lodash';
import SearchResultWrapper from './searchResult.style';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('result-search-block');

const ListElement = memo((props) => {
  const {
    id,
    name,
    createdAt,
    onClick,
  } = props;
  const handleClick = useCallback(
    () => {
      onClick(name, id);
    },
    [name, id, onClick],
  );

  return (
    <div
      key={id}
      className={b('item')}
      role="button"
      onClick={handleClick}
      tabIndex={-1}
    >
      <div className={b('text-wrapper')}>
        <p className={b('name')}>{name}</p>
        <p>{`- Created ${moment(createdAt).format(yearMonthDay)}`}</p>
      </div>
    </div>
  );
});

const SearchResult = (props) => {
  const {
    isLoading,
    searchList,
    onClick,
    clearSearch,
    title,
  } = props;

  const handleClick = (name, id) => {
    onClick(name, id);
    clearSearch();
  };

  if (isLoading) {
    return (
      <SearchResultWrapper>
        <div className={b()}>
          {title && <p className={b('title')}>{title}</p>}
          <div className={b('result')}>
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          </div>
        </div>
      </SearchResultWrapper>
    );
  }

  if (_.isEmpty(searchList)) {
    return (
      <SearchResultWrapper>
        <div className={b()}>
          <div className={b('not-found')}>
            <IntlMessages id="lmsGroups.noResultsFound" />
          </div>
        </div>
      </SearchResultWrapper>
    );
  }

  return (
    <SearchResultWrapper>
      <div className={b()}>
        {title && <p className={b('title')}>{title}</p>}
        <div className={b('result')}>
          {searchList.map(({ id, name, createdAt }) => <ListElement id={id} name={name} createdAt={createdAt} onClick={handleClick} />)}
        </div>
      </div>
    </SearchResultWrapper>
  );
};

export default SearchResult;
