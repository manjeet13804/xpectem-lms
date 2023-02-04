import React, { Component } from 'react';
import { CheckSvg } from 'components';
import { bemlds } from 'utils';
import CheckOrganisationsWrapper from './checkOrganisations.style';

const b = bemlds('check-organisations');

class CheckOrganisations extends Component {

  render() {
    const { title, value } = this.props;
    return (
      <CheckOrganisationsWrapper>
        <div
          className={b()}
          role="button"
          tabIndex="0"
        >
          {value ?
            (
              <CheckSvg className={b('icon')} id={title}/>
            )
            : (
              <div
                id={title}
                className={b('clear')}
              />
            )
          }
          <label
            className={b('title')}
            htmlFor={title}
          >
            {title}
          </label>
        </div>
      </CheckOrganisationsWrapper>
    );
  }
}

export default CheckOrganisations;

