import React, { Component } from 'react';
import { TITLE } from 'constants/constants';
import { bemlds } from 'utils';
import SearchGroupBlockWrapper from './searchGroupBlock.style';

const defaultProps = {
  title: 'MyLMSGroup',
  date: '2019-05-27',
  belong: '',
  url: '',
};
const { createdTitle, belongTitle } = TITLE;

const b = bemlds('search-block');

class SearchGroupBlock extends Component {

  render() {
    const {
      title,
      belong,
      date,
      onClick,
      } = this.props;
    return (
      <SearchGroupBlockWrapper>
        <div
          className={b({'belong-height': belong, 'search-height': !belong})}
          onClick={onClick}
        >
          <div className={b('text')}>
            {title && (
              <div className={b('title')}>
                {title}
              </div>
            )}
            {belong && (
              <div className={b('belong')}>
                {`${belongTitle} ${belong}`}
              </div>
            )}
            {date && (
              <div className={b('date')}>
                {`${createdTitle} ${date}`}
              </div>
            )}
          </div>
        </div>
     </SearchGroupBlockWrapper>
    );
  }
}
SearchGroupBlock.defaultProps = defaultProps;

export default SearchGroupBlock;