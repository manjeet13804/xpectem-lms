import React, { Component } from 'react';
import { bemlds } from 'utils';
import RegLinkWrapper from './RegLink.style';

const b = bemlds('reg-link');

class RegLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayForBack: [],
    };
  }

  render() {
    const { regLink } = this.props;

    return (
      <RegLinkWrapper>
        <section className={b()}>
          <div className={b('box')}>
            <div className={b('text')}>
              {regLink}
            </div>
          </div>
        </section>
      </RegLinkWrapper>
    );
  }
}

export default RegLink;
