// @flow
import React, { Node, useState, SyntheticEvent } from 'react';
import { bemlds } from 'utils';
import { SearchIcon } from 'components';
import { TERM_SHARED } from 'localise';
import './styles.scss';

const b = bemlds('search-block');

const { searchKnowledgeDatabase } = TERM_SHARED;

const DefaultProps = {
  className: '',
  onSubmit: () => {},
};

type PropType = {
  className?: string,
  onSubmit?: () => void
};


const SearchBlock = ({className, onSubmit}: PropType): Node => {
  const [value, changeValue] = useState('');

  const onChange = (e: SyntheticEvent) => {
    const { value: newValue } = e.target;
    changeValue(newValue);
    if (!newValue) {
      onSubmit(newValue);
    }
  };

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <div className={b({mix: className})}>
      <form className={b('form')} onSubmit={submit}>
        <input
          className={b('input')}
          type="text"
          placeholder={searchKnowledgeDatabase}
          value={value}
          onChange={onChange}
        />
        <button className={b('btn')} type="submit">
          <SearchIcon className={b('icon')} />
        </button>
      </form>
    </div>
  );
};

SearchBlock.defaultProps = DefaultProps;

export default SearchBlock;
