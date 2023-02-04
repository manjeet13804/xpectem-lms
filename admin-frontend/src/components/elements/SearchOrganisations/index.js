import React, { Component } from 'react';
import { TITLE } from 'constants/constants';
import {
  CheckOrganisations,
} from 'components';
import { bemlds } from 'utils';
import SearchOrganisationsWrapper from './searchOrganisations.style';

const { createdTitle, belongTitle } = TITLE;

const b = bemlds('search-block');


// TODO don't use this component. It needs to be removed
class SearchGroupBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
    };
  }

  render() {
    const {
      title,
      belong,
      check,
      date,
      onChangeCheckbox,
    } = this.props;

    return (
      <SearchOrganisationsWrapper>
        <div
          onClick={onChangeCheckbox}
          className={b()}
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
          <CheckOrganisations
            value={check}
            className={b('checkbox')}
          />
        </div>
      </SearchOrganisationsWrapper>
    );
  }
}

export default SearchGroupBlock;
