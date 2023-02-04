import React, { Component } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import SupportContent from './SupportContent';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LayoutContent>
        <section>
          <SupportContent />
        </section>
      </LayoutContent>
    );
  }
}

export default Support;
