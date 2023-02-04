import React from 'react';
import { SearchSvg, DefaultButton } from 'components';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import SearchInputWrapper from './searchInput.style';


const b = bemlds('search-input');

const SearchInput = (props) => {
  const {
    name,
    value,
    placeholder,
    onSearch,
    onChange,
    searchTitle,
    searchTitleValue,
    title,
  } = props;

  const handleChange = ({ target }) => onChange(target.value);

  return (
    <SearchInputWrapper>
      <div className={b('title')}>
        <p>
          {searchTitleValue ? (
            <div>
              <IntlMessages id={searchTitle} />
              {' '}
              within
              {' '}
              <span className={b('selected')}>{searchTitleValue}</span>
            </div>
          ) : (
            <IntlMessages id={searchTitle} />)}
        </p>
        <p>
          <IntlMessages id={title} />
        </p>
      </div>
      <div className={b()}>
        <SearchSvg />
        <input
          className={b('input')}
          type="text"
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
        />
      </div>
      <DefaultButton
        onClick={onSearch}
        textId="notifications.search"
      />
    </SearchInputWrapper>
  );
};

export default SearchInput;
