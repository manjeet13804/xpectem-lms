import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import {
  SearchSvg,
  ArrowUp,
  AddNewTopicPopup,
} from 'components';
import { bemlds } from 'utils';
import SearchBlockWrapper from './searchBlock.style';

const sb = bemlds('search-block');

const SearchBlock = (props) => {
  const {
    placeholder,
    handleSearchBlock,
    handleTopic,
    onClick,
    blockList,
    title,
  } = props;

  const handleClick = ({ target: { value } }) => {
    const currentHandleSearchBlock = _.debounce(handleSearchBlock, 500);
    currentHandleSearchBlock(value);
  };

  return (
    <SearchBlockWrapper>
      <section className={sb()}>
        <div className={sb('title')}>
          {title}
        </div>
        <div className={sb('input-wrapper')}>
          <SearchSvg />
          <input
            className={sb('input')}
            type="text"
            placeholder={placeholder}
            onChange={handleClick}
          />
          <ArrowUp className={sb('arrow', { down: !!(blockList.length) })} />
        </div>
        <div className={sb('block-list')}>
          {blockList.map(({ id, description }) => (
            <div
              key={id}
              className={sb('item')}
              role="button"
              tabIndex="-1"
              onClick={() => onClick(id)}
            >
              {description}
            </div>
          ))}
          {!!(blockList.length) && handleTopic && (
            <AddNewTopicPopup handlePopup={handleTopic} />
          )}
        </div>
      </section>
    </SearchBlockWrapper>
  );
};

SearchBlock.defaultProps = {
  title: '',
  placeholder: '',
  blockList: [],
  handleTopic: null,
  onClick: null,
};

SearchBlock.propTypes = {
  title: PropTypes.node,
  placeholder: PropTypes.string,
  blockList: PropTypes.arrayOf(PropTypes.object),
  handleSearchBlock: PropTypes.func.isRequired,
  handleTopic: PropTypes.func,
  onClick: PropTypes.func,
};
export default SearchBlock;
