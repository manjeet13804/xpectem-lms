import React, { Component } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import _ from 'lodash';
import FilterDropdown from 'components/tables/filterDropdown';
import FilterTypeahead from 'components/tables/filterTypeahead';
import constants from 'helpers/constants';
import { generateRequest, checkEmptyString } from 'helpers/utility';
import { Box } from './style';

const defaultProps = {
  total: 0,
  news: [],
  assets: [],
  filterAssets: [],
  updateNews: null,
  fetchNews: null,
  fetchAssets: null,
  deleteNewsOrRestore: null,
  component: null,
  isNewsUpdate: false,
};

const propTypes = {
  total: PropTypes.number,
  news: PropTypes.arrayOf(PropTypes.object),
  assets: PropTypes.arrayOf(PropTypes.object),
  filterAssets: PropTypes.arrayOf(PropTypes.object),
  updateNews: PropTypes.func,
  fetchNews: PropTypes.func,
  fetchAssets: PropTypes.func,
  deleteNewsOrRestore: PropTypes.func,
  component: PropTypes.func,
  isNewsUpdate: PropTypes.bool,
};

class ListLogic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      editableNews: [],
      filteredInfo: {},
      sortedInfo: {
        order: 'descend',
      },
      defaultSort: 'addedAt',
      searchValues: {},
      showDeleteModal: false,
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };
  }

  componentWillMount() {
    this.getNews();
  }

  componentWillReceiveProps = async (nextProps) => {
    const { removeNewsIsUpdatedStatus } = this.props;
    const { isUpdated } = nextProps;

    if (isUpdated) {
      removeNewsIsUpdatedStatus();
    }
  };

  getNews = async () => {
    const { fetchNews } = this.props;
    const {
      pagination,
      sortedInfo,
      filteredInfo,
      searchValues,
      defaultSort,
      selectedAsset,
    } = this.state;

    const filter = {
      ...filteredInfo,
      ...(selectedAsset && { asset: { $inArr: selectedAsset } }),
    };

    const request = generateRequest({
      paginationInfo: pagination,
      sortedInfo,
      defaultSort,
      filteredInfo: filter,
      searchText: searchValues,
    });

    await fetchNews(request);
  };

  setPagination = async (page) => {
    const { pagination: { pageSize } } = this.state;

    await this.setState({
      pagination: {
        current: page,
        pageSize,
      },
    });
    this.getNews();
  };

  onChange = async (pagination, filteredInfo, sortedInfo) => {
    const { filteredInfo: currentFilteredInfo } = this.state;
    const isFilterEqual = _.isEqual(filteredInfo, currentFilteredInfo);
    const sort = _.size(sortedInfo) ? sortedInfo : { order: 'descend' };

    if (!isFilterEqual) {
      this.setPagination(1);
    }

    await this.setState({
      filteredInfo,
      sortedInfo: sort,
    });
    this.getNews();
  };

  searchAssets = async (page) => {
    const { fetchAssets } = this.props;
    const { pagination: { current }, searchValues, filteredInfo } = this.state;
    const text = searchValues.assets;

    this.setPagination(page);

    if (!text) {
      delete filteredInfo.assets;
      await this.setState({
        filteredInfo,
      });

      return this.getNews();
    }

    const searchTextOr = {
      title: text,
      tickerSymbol: text,
    };
    const paginationInfo = {
      current,
      pageSize: 50,
    };

    const querystring = generateRequest({
      paginationInfo,
      ...(text && { searchTextOr }),
    });

    return fetchAssets(querystring, true);
  };

  inputChange = async (event) => {
    const { searchValues } = this.state;
    const { value, name } = event.target;
    const text = { [name]: checkEmptyString(value) };

    await this.setState({
      searchValues: { ...searchValues, ...text },
    });

    if (value.length === 0) {
      this.getNews();
    }
  };

  onInputChange = async (value, propKey, index) => {
    const { news, updateNews } = this.props;
    const { filteredInfo } = this.state;
    const { id } = news[index];

    if (id) {
      const props = [{ id, [propKey]: value }];
      const withoutFilter = _.isEmpty(_.get(filteredInfo, propKey));

      await updateNews(props, withoutFilter, true);
      this.fetchIfNeed(propKey);
    }
  };

  filterDropdown = (name) => {
    const { searchValues } = this.state;
    const action = name === 'assets' ? this.searchAssets : this.setPagination;

    return (
      <Box>
        <FilterDropdown
          searchText={searchValues[name]}
          onInputChange={this.inputChange}
          onSearch={() => action(1)}
          name={name}
        />
      </Box>
    );
  };

  filterIcon = (type) => {
    const { searchValues } = this.state;
    const { colors: { filterActive, filterNotActive } } = constants;

    return (
      <Icon
        type="search"
        style={{
          color: searchValues[type] && searchValues[type].length ? filterActive : filterNotActive,
        }}
      />
    );
  };

  filterAssetIcon = () => {
    const { selectedAsset } = this.state;
    const { colors: { filterActive, filterNotActive } } = constants;

    return (
      <Icon
        type="search"
        style={{ color: selectedAsset && selectedAsset.length ? filterActive : filterNotActive }}
      />
    );
  };

  onSetState = (props) => {
    this.setState(props);
  };

  filterTypeahead = () => {
    const { fetchAssets, filterAssets } = this.props;
    const { selectedAsset } = this.state;

    return (
      <FilterTypeahead
        elementsList={filterAssets}
        fetchFunction={fetchAssets}
        searchingProperty={['title', 'tickerSymbol']}
        onSearch={() => this.setPagination(1)}
        setSelected={this.setSelectedAsset}
        selected={selectedAsset}
      />
    );
  };

  setSelectedAsset = async (assetsId) => {
    await this.setState({
      selectedAsset: assetsId,
    });
    const { selectedAsset } = this.state;

    if (selectedAsset && selectedAsset.length === 0) {
      this.setPagination(1);
    }
  };

  changeModalVisible = (value) => {
    this.setState({ showDeleteModal: value });
  };

  checkStatus = async (value, propKey, index) => {
    const { news } = this.props;
    const { id } = news[index];

    if (value) {
      this.onActiveChange(value, propKey, index);
    } else {
      await this.setState({ editableNews: [id] });
      this.changeModalVisible(true);
    }
  };

  onActiveChange = async (value, propKey, index) => {
    const { news, deleteNewsOrRestore } = this.props;
    const { filteredInfo } = this.state;
    const { id } = news[index];

    if (id) {
      const props = [{ id, action: value ? 'restore' : 'soft_delete' }];
      const { filterParams: { isDeleted } } = constants;
      const withoutFilter = _.isEmpty(_.get(filteredInfo, isDeleted));

      await deleteNewsOrRestore(props, value, withoutFilter);
      this.fetchIfNeed(isDeleted);
    }
  };

  onActiveChangeMultiple = async (value) => {
    const { deleteNewsOrRestore } = this.props;
    const { selected, editableNews, filteredInfo } = this.state;
    const news = editableNews.length > 0 ? editableNews : selected;
    const props = news.map(id => ({ id, action: value ? 'restore' : 'soft_delete' }));
    const { filterParams: { isDeleted } } = constants;
    const withoutFilter = _.isEmpty(_.get(filteredInfo, isDeleted));

    await deleteNewsOrRestore(props, value, withoutFilter);
    this.setState({ selected: [], editableNews: [] });
    this.fetchIfNeed(isDeleted);

    if (!value) {
      this.changeModalVisible(false);
    }
  };

  onCloseModal = () => {
    this.setState({ editableNews: [] });
    this.changeModalVisible(false);
  };

  multipleEdit = (status, itemName) => {
    const { updateNews } = this.props;
    const { selected, filteredInfo } = this.state;
    const props = selected.map(id => ({ id, [itemName]: status }));
    const withoutFilter = _.isEmpty(_.get(filteredInfo, itemName));

    if (props.length) {
      updateNews(props, withoutFilter, true);
      this.setState({ selected: [] });
      this.fetchIfNeed(itemName);
    }
  };

  fetchIfNeed = (checkingItem) => {
    const { filteredInfo } = this.state;

    if (!_.isEmpty(_.get(filteredInfo, checkingItem))) {
      this.getNews();
    }
  };

  render() {
    const {
      selected,
      pagination: { current, pageSize },
      editableNews,
      showDeleteModal,
    } = this.state;

    const {
      component,
      assets,
      news,
      isNewsUpdate,
      total,
    } = this.props;

    const multipleCondition = selected.length > 1 && !editableNews.length;

    return (
      component({
        ...this.props,
        ...this.state,
        assets,
        news,
        isNewsUpdate,
        selected,
        onSetState: this.onSetState,
        changeModalVisible: this.changeModalVisible,
        onActiveChangeMultiple: this.onActiveChangeMultiple,
        multipleEdit: this.multipleEdit,
        onChange: this.onChange,
        setPagination: this.setPagination,
        onCloseModal: this.onCloseModal,
        filterIcon: this.filterIcon,
        filterAssetIcon: this.filterAssetIcon,
        onInputChange: this.onInputChange,
        filterDropdown: this.filterDropdown,
        filterTypeahead: this.filterTypeahead,
        checkStatus: this.checkStatus,
        current,
        pageSize,
        total,
        multipleCondition,
        showDeleteModal,
      })
    );
  }
}

ListLogic.propTypes = propTypes;
ListLogic.defaultProps = defaultProps;

export default ListLogic;
