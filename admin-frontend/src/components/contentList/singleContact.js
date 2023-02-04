import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class SingleContact extends Component {
  render() {
    const { selectedId, selectContent, item: { title, value } } = this.props;
    const activeClass = selectedId === value ? 'active' : '';

    return (
      <div
        className={`${activeClass} isoSingleContact`}
        onClick={() => selectContent(value)}
      >
        <div className="isoContactName">
          <h3>{ title }</h3>
        </div>
      </div>
    );
  }
}

SingleContact.defaultProps = {
  item: {},
  selectContent: null,
  selectedId: null,
};

SingleContact.propTypes = {
  item: PropTypes.object,
  selectContent: PropTypes.func,
  selectedId: PropTypes.string || PropTypes.number,
};
