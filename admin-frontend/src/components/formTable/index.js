import React, { Component } from 'react';

class formTable extends Component {
  renderTh = (labels) => {
    const options = [];

    for (const label in labels) {
      options.push(
        <th>{ label }</th>,
      );
    }
    return options;
  };

  render() {
    const { labels } = this.props;

    return (
      <table className="TradingPairForm">
        <tbody>
          <tr>
            { this.renderTh(labels) }
          </tr>
        </tbody>
      </table>
    );
  }
}

export default formTable;
