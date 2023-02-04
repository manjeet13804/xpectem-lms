import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import Button from 'components/uielements/button';
import { generateRequest } from 'helpers/utility';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import FilterTypeaheadWrapper from './filterTypeahead.style';

const { Option } = Select;

export default class FilterTypeahead extends Component {
  constructor(props) {
    super(props);

    this.fetchOptions = debounce(this.fetchOptions, 500);

    this.state = {
      options: null,
      isLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { elementsList } = nextProps;

    this.renderOptions(elementsList);
  }

  onSearch = () => {
    const { onSearch } = this.props;

    onSearch();
  }

  onChange = (value) => {
    const { setSelected } = this.props;

    setSelected(value);
  }

  renderOptions = (data) => {
    let options = null;

    if (data && data.length) {
      options = data.map(option => <Option key={option.id}>{option.title}</Option>);
    }

    this.setState({
      options,
      isLoading: false,
    });
  }

  fetchOptions = async (value) => {
    if (!value || /^\s+$/.test(value)) return;

    this.setState({
      isLoading: true,
      options: null,
    });
    const { fetchFunction, searchingProperty } = this.props;

    let querystring = null;

    const paginationInfo = {
      current: 1,
      pageSize: 50,
    };

    if (Array.isArray(searchingProperty)) {
      const searchTextOr = {};

      searchingProperty.forEach((prop) => {
        searchTextOr[prop] = value;
      });

      querystring = generateRequest({ searchTextOr, paginationInfo });
    } else {
      const searchText = {
        [searchingProperty]: value,
      };

      querystring = generateRequest({ searchText, paginationInfo });
    }

    fetchFunction(querystring, true);
  }

  render() {
    const { options, isLoading } = this.state;
    const { selected } = this.props;

    return (
      <FilterTypeaheadWrapper>
        <div className="filterTypeahead">
          <Select
            mode="multiple"
            placeholder="Search name"
            className="filterTypeahead-select"
            onChange={this.onChange}
            onSearch={this.fetchOptions}
            value={selected}
            filterOption={false}
            notFoundContent={isLoading ? <Spin size="small" /> : null}
          >
            {options}
          </Select>
          <Button className="filterTypeahead-button" onClick={this.onSearch}>
            Search
          </Button>
        </div>
      </FilterTypeaheadWrapper>
    );
  }
}

FilterTypeahead.defaultProps = {
  setSelected: null,
  onSearch: null,
  elementsList: null,
  selected: [],
};

FilterTypeahead.propTypes = {
  setSelected: PropTypes.func,
  onSearch: PropTypes.func,
  elementsList: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.arrayOf(PropTypes.any),
};
