import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Pagination } from 'antd';
import Scrollbars from 'components/utility/customScrollBar';
import Button from 'components/uielements/button';
import TableWrapper from 'containers/Tables/antTables/antTable.style';
import FilterDropdown from 'components/tables/filterDropdown';
import constants from 'helpers/constants';
import { generateRequest, checkEmptyString } from 'helpers/utility';
import CardWrapper, { Box } from './linkList.style';
import propTypes from './propTypes';
import defaultProps from './defaultProps';
import { columns } from './config';
import DeleteModal from './deleteModal';

class LinksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deletedLink: null,
      showDeleteWarning: false,
      selected: [],
      filteredInfo: {},
      sortedInfo: {},
      searchText: {},
      pagination: {
        current: 1,
        pageSize: 10,
      },
    };

    this.getInitial();
  }

  componentDidUpdate(prevProps, prevState) {
    const { pagination: prevPagination } = prevState;
    const { pagination } = this.state;

    if (prevPagination.currentPage !== pagination.currentPage) {
      this.getLinks();
    }

    this.fetchLinksIfNeed(prevProps);
  }

  getInitial = () => {
    const { actions } = this.props;
    const { fetchLinkGroups } = actions;

    const querystring = generateRequest({
      paginationInfo: {
        current: 1,
        pageSize: 20,
      },
    });

    fetchLinkGroups(querystring);
    this.getLinks();
  };

  getLinks = () => {
    const { actions: { fetchLinks, fetchLinksNew }, match, isNewOwner } = this.props;
    const { id } = match.params;

    if (!isNewOwner) {
      const {
        pagination,
        sortedInfo,
        filteredInfo,
        searchText,
        defaultSort,
      } = this.state;

      const request = generateRequest({
        sortedInfo,
        defaultSort,
        searchText,
        paginationInfo: pagination,
        filteredInfo: { ...filteredInfo, ownerId: id },
      });

      fetchLinks(request);
    } else {
      fetchLinksNew();
    }
  };

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

  onSearch = () => {
    this.getLinks();
  };

  onSetState = (props) => {
    this.setState(props);
  };

  renderOptions = () => {
    const { linkGroups } = this.props;
    const groups = linkGroups || linkGroups.length ? linkGroups : [];

    return groups.map(group => ({ text: group.name, value: group.id }));
  };

  inputChange = async (event) => {
    const { searchText } = this.state;
    const { value, name } = event.target;
    const text = {};

    text[name] = checkEmptyString(value);

    await this.setState({
      searchText: { ...searchText, ...text },
    });

    if (value.length === 0) {
      this.getLinks();
    }
  };

  filterDropdown = (name) => {
    const { searchText } = this.state;

    return (
      <Box>
        <FilterDropdown
          searchText={searchText[name]}
          onInputChange={this.inputChange}
          onSearch={() => this.setPagination(1)}
          name={name}
        />
      </Box>
    );
  };

  onChange = async (pagination, filteredInfo, sortedInfo) => {
    const { filteredInfo: currentFilteredInfo } = this.state;
    const filterIsEqual = _.isEqual(filteredInfo, currentFilteredInfo);

    if (!filterIsEqual) {
      this.setPagination(1);
    }

    await this.setState({
      sortedInfo,
      filteredInfo,
    });
    this.getLinks();
  };

  onDelete = (id) => {
    this.setState({
      ...(id && { deletedLink: id }),
      showDeleteWarning: true,
    });
  };

  onEdit = (id) => {
    const { actions: { setEditableLink } } = this.props;
    setEditableLink(id);
  };

  onDestroy = async () => {
    const { actions: { deleteLink, deleteLinkNew }, isNewOwner } = this.props;
    const { deletedLink } = this.state;
    const action = isNewOwner ? deleteLinkNew : deleteLink;

    const newState = {
      showDeleteWarning: false,
    };

    if (deletedLink) {
      await action(deletedLink);
      newState.deletedLink = null;
    }

    await this.setState(newState);
    this.getLinks();
  };

  setPagination = async (page) => {
    const { pagination: { pageSize } } = this.state;
    await this.setState({
      pagination: {
        current: page,
        pageSize,
      },
    });
    this.getLinks();
  };

  fetchLinksIfNeed(prevProps) {
    const { links: { isDoing: prevIsDoing } } = prevProps;
    const { links: { isDoing, error } } = this.props;
    const { searchText } = this.state;

    if (prevIsDoing && !isDoing && !error.length) {
      this.getLinks(searchText);
    }
  }

  render() {
    const {
      linkGroups,
      links,
      isLoading,
      isNewOwner,
      total,
      actions: { setNewLinkStatus },
    } = this.props;

    const {
      pagination: { current, pageSize },
      selected,
      showDeleteWarning,
      deletedLink,
    } = this.state;

    return (
      <Box>
        <div className="isoLinkTableBtn">
          <Button onClick={() => setNewLinkStatus()} type="primary" className="addLinkBtn">
            Add Link
          </Button>
        </div>

        <CardWrapper>
          <Scrollbars style={{ width: '100%', minHeight: '50vh' }}>
            <TableWrapper
              dataSource={links}
              loading={isLoading}
              rowKey="id"
              columns={
                columns({
                  filterIcon: this.filterIcon,
                  filterDropdown: this.filterDropdown,
                  onDelete: this.onDelete,
                  onEdit: this.onEdit,
                  groupOptions: this.renderOptions,
                  linkGroups,
                })}
              onChange={this.onChange}
              pagination={false}
              className="linkListTable"
            />
            {
              !isNewOwner && (
                <div className="paginationWrap">
                  <Pagination
                    onChange={this.setPagination}
                    current={current}
                    total={total}
                    pageSize={pageSize}
                  />
                </div>
              )
            }
          </Scrollbars>
          <DeleteModal
            visible={showDeleteWarning}
            onSubmit={this.onDestroy}
            multiple={selected.length > 1 && !deletedLink}
            onCancel={() => {
              this.setState({ showDeleteWarning: false });
            }}
          />
        </CardWrapper>
      </Box>
    );
  }
}

LinksList.defaultProps = defaultProps;
LinksList.propTypes = propTypes;

export default LinksList;
