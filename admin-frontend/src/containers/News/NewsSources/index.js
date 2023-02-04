import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/uielements/button';
import Scrollbars from 'components/utility/customScrollBar';
import FilterDropdown from 'components/tables/filterDropdown';
import TableWrapper from 'containers/Tables/antTables/antTable.style';
import { Pagination, Icon } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import newsSourceActions from 'redux/newsSources/actions';
import {
  generateRequest,
  checkEmptyString,
  parseBool,
  stringToBool,
} from 'helpers/utility';
import constants from 'helpers/constants';
import _ from 'lodash';
import CardWrapper, { Box } from './newsSourcesList.style';
import { columns, rowSelection } from './config';
import DeleteModal from './DeleteModal';
import { SOURCES_PATH } from '../params';

const propTypes = {
  fetchNewsSources: PropTypes.func.isRequired,
  newsSources: PropTypes.arrayOf(PropTypes.object),
  total: PropTypes.number.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  updateNewsSource: PropTypes.func.isRequired,
  deleteSourceOrRestore: PropTypes.func.isRequired,
  isNewSourcesLoading: PropTypes.bool,
};

const defaultProps = {
  isNewSourcesLoading: false,
  newsSources: [],
};

class NewsSources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10,
      },
      selected: [],
      changedSource: null,
      searchText: {},
      filteredInfo: {},
      sortedInfo: {},
      defaultSort: 'name',
      showDeleteWarning: false,
    };
  }

  componentWillMount() {
    this.getNewsSources();
  }

  getNewsSources = () => {
    const { fetchNewsSources } = this.props;

    const {
      pagination, sortedInfo, defaultSort, filteredInfo, searchText,
    } = this.state;

    const request = generateRequest({
      paginationInfo: pagination,
      sortedInfo,
      defaultSort,
      filteredInfoEq: filteredInfo,
      searchText,
    });

    fetchNewsSources(request);
  }

  filterDropdown = (name) => {
    const { searchText } = this.state;

    return (
      <Box>
        <FilterDropdown
          searchText={searchText[name]}
          onInputChange={this.inputChange}
          onSearch={this.onSearch}
          name={name}
        />
      </Box>
    );
  };

  inputChange = async (event) => {
    const { searchText } = this.state;
    const { value, name } = event.target;
    const text = { [name]: checkEmptyString(value) };

    await this.setState({
      searchText: { ...searchText, ...text },
    });

    if (value.length === 0) {
      this.getNewsSources();
    }
  }

  onSearch = async () => {
    const { pagination } = this.state;

    const newPagination = {
      ...pagination,
      current: 1,
    };

    await this.setState({
      pagination: newPagination,
    });

    this.getNewsSources();
  }

  filterIcon = (type) => {
    const { searchText } = this.state;
    const { colors: { filterActive, filterNotActive } } = constants;

    return (
      <Icon
        type="search"
        style={{
          color: searchText[type] && searchText[type].length
            ? filterActive : filterNotActive,
        }}
      />
    );
  };

  onCellChange = async (value, propKey, index) => {
    const { newsSources, updateNewsSource, deleteSourceOrRestore } = this.props;

    if (!newsSources.length) {
      return;
    }

    const { id } = newsSources[index];
    const parsedValue = parseBool(value);

    const data = [
      {
        id,
        [propKey]: parsedValue,
      },
    ];

    if (propKey === 'isDeleted') {
      if (parsedValue) {
        await deleteSourceOrRestore([id], 'restore');
        this.fetchIfNeed(propKey);
      } else {
        this.setState(prevState => ({ ...prevState, changedSource: id, showDeleteWarning: true }));
      }
    } else {
      await updateNewsSource(data);
      this.fetchIfNeed(propKey);
    }
  }

  onChange = async (pagination, filteredInfo, sortedInfo) => {
    const { filteredInfo: currentFilteredInfo } = this.state;
    const filterIsEqual = _.isEqual(filteredInfo, currentFilteredInfo);

    if (!filterIsEqual) {
      this.onPaginate(1);
    }
    await this.setState({
      filteredInfo,
      sortedInfo,
    });

    this.getNewsSources();
  }

  onPaginate = async (page) => {
    const { pagination } = this.state;
    const { pageSize } = pagination;

    await this.setState({
      pagination: {
        current: page,
        pageSize,
      },
      selected: [],
    });
    this.getNewsSources();
  };

  onDestroy = async () => {
    const { changedSource, selected } = this.state;
    const { deleteSourceOrRestore } = this.props;

    if (changedSource) {
      await deleteSourceOrRestore([changedSource], 'soft_delete');
      this.setState(prevState => ({ ...prevState, changedSource: null, showDeleteWarning: false }));
      this.fetchIfNeed('isDeleted');
    } else {
      if (!selected.length) return;

      await deleteSourceOrRestore(selected, 'soft_delete');
      this.setState({
        selected: [],
        showDeleteWarning: false,
      });
      this.fetchIfNeed('isDeleted');
    }
  }

  onSetState = (state) => {
    this.setState(state);
  }

  toggleUpdateSource = async ({ update }) => {
    const { updateNewsSource } = this.props;
    const { selected } = this.state;

    const data = selected.map(id => ({ id, isActive: stringToBool(update) }));

    await updateNewsSource(data);

    this.fetchIfNeed('isActive');
  }

  toggleDeleteSource = async ({ isDeleted }) => {
    const { deleteSourceOrRestore } = this.props;
    const { selected } = this.state;

    if (!isDeleted) {
      await deleteSourceOrRestore(selected, 'restore');
      this.fetchIfNeed('isDeleted');
    } else {
      this.setState({
        showDeleteWarning: true,
      });
    }
  }

  fetchIfNeed = async (key) => {
    const { filteredInfo, pagination } = this.state;

    if (filteredInfo[key] !== undefined) {
      await this.setState({
        pagination: {
          ...pagination,
          current: 1,
        },
      });

      this.getNewsSources();
    }
  }

  render() {
    const {
      newsSources,
      total,
      isNewSourcesLoading,
    } = this.props;
    const { selected, pagination, showDeleteWarning } = this.state;

    return (
      <div>
        <div className="isoAssetTableBtn">
          <Link to={`${SOURCES_PATH}/create`}>
            <Button type="primary" className="mateAddAssetBtn">
              Add Source
            </Button>
          </Link>
        </div>
        <CardWrapper title="News Sources">
          <Scrollbars style={{ width: '100%', minHeight: '50vh' }}>
            <TableWrapper
              loading={isNewSourcesLoading}
              rowKey="id"
              rowSelection={
                rowSelection({
                  selected,
                  onSetState: this.onSetState,
                  toggleUpdateSource: this.toggleUpdateSource,
                  toggleDeleteSource: this.toggleDeleteSource,
                })}
              dataSource={newsSources}
              columns={
                columns({
                  path: SOURCES_PATH,
                  filterIcon: this.filterIcon,
                  onCellChange: this.onCellChange,
                  filterDropdown: this.filterDropdown,
                })}
              onChange={this.onChange}
              pagination={false}
              className="sourceListTable"
            />
            <Pagination
              style={{ marginTop: '20px', float: 'right' }}
              pageSize={pagination.pageSize}
              currentPage={pagination.current}
              current={pagination.current}
              total={total}
              onChange={this.onPaginate}
            />
          </Scrollbars>

          <DeleteModal
            show={showDeleteWarning}
            onOk={this.onDestroy}
            type={selected.length > 1 ? 'many' : 'single'}
            onCancel={() => {
              this.setState(prevProps => ({ ...prevProps, showDeleteWarning: false }));
            }}
          />
        </CardWrapper>
      </div>
    );
  }
}

NewsSources.propTypes = propTypes;
NewsSources.defaultProps = defaultProps;

function mapStateToProps({ newsSources }) {
  return { ...newsSources };
}

export default connect(mapStateToProps, { ...newsSourceActions })(NewsSources);
