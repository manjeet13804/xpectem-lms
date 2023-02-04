import React, { Component } from 'react';
import Input from 'components/uielements/input';
import Button from 'components/uielements/button';

export default class extends Component {
  state = {};

  render() {
    const {
      searchText,
      onInputChange,
      onSearch,
      name,
    } = this.props;

    return (
      <div className="isoTableSearchBox">
        <Input
          id="tableFilterInput"
          placeholder="Search name"
          value={searchText}
          onChange={onInputChange}
          onPressEnter={onSearch}
          name={name}
        />
        <Button type="primary" onClick={onSearch}>
          Search
        </Button>
      </div>
    );
  }
}
