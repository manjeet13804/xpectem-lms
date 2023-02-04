import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import LayoutWrapper from 'components/utility/layoutWrapper';
import Scrollbars from 'components/utility/customScrollBar';
import Button from 'components/uielements/button';
import TableWrapper from 'containers/Tables/antTables/antTable.style';
import Delete from '../Delete';
import CardWrapper, { Box } from './style';
import { columns, rowSelection } from '../Config';
import { NEWS_PATH } from '../../params';

const propTypes = {
  assets: PropTypes.array,
  news: PropTypes.array,
  selected: PropTypes.array,
  isNewsUpdate: PropTypes.bool,
  multipleCondition: PropTypes.bool,
  showDeleteModal: PropTypes.bool,
  onSetState: PropTypes.func,
  changeModalVisible: PropTypes.func,
  onActiveChangeMultiple: PropTypes.func,
  multipleEdit: PropTypes.func,
  onChange: PropTypes.func,
  setPagination: PropTypes.func,
  onCloseModal: PropTypes.func,
  filterIcon: PropTypes.func,
  filterAssetIcon: PropTypes.func,
  onInputChange: PropTypes.func,
  filterDropdown: PropTypes.func,
  filterTypeahead: PropTypes.func,
  checkStatus: PropTypes.func,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  total: PropTypes.number,
};

const defaultProps = {
  assets: [],
  news: [],
  selected: [],
  isNewsUpdate: false,
  multipleCondition: false,
  showDeleteModal: false,
  onSetState: null,
  changeModalVisible: null,
  onActiveChangeMultiple: null,
  multipleEdit: null,
  onChange: null,
  setPagination: null,
  onCloseModal: null,
  filterIcon: null,
  filterAssetIcon: null,
  onInputChange: null,
  filterDropdown: null,
  filterTypeahead: null,
  checkStatus: null,
  current: 0,
  pageSize: 0,
  total: 0,
};

const List = ({
  assets,
  news,
  isNewsUpdate,
  selected,
  onSetState,
  changeModalVisible,
  onActiveChangeMultiple,
  multipleEdit,
  onChange,
  setPagination,
  onCloseModal,
  filterIcon,
  filterAssetIcon,
  onInputChange,
  filterDropdown,
  filterTypeahead,
  checkStatus,
  current,
  pageSize,
  total,
  multipleCondition,
  showDeleteModal,
}) => (
  <LayoutWrapper className="isoLayoutWrapper" isNews>
    <Box className="isoBox newsWrap">
      <div className="isoNewsTableBtn">
        <Link to={`${NEWS_PATH}/create`}>
          <Button type="primary" className="mateAddNewsBtn">
            Add News
          </Button>
        </Link>
      </div>

      <CardWrapper title="News" className="isoCardWrapper" layout>
        <div className="isoNewsTable">
          <Scrollbars style={{ width: '100%' }}>
            <TableWrapper
              dataSource={news}
              rowKey="id"
              loading={isNewsUpdate}
              rowSelection={
                rowSelection({
                  selected,
                  onSetState,
                  changeModalVisible,
                  onActiveChangeMultiple,
                  multipleEdit,
                })}
              columns={
                columns({
                  path: NEWS_PATH,
                  filterIcon,
                  filterAssetIcon,
                  onInputChange,
                  filterDropdown,
                  filterTypeahead,
                  checkStatus,
                  assets,
                })}
              onChange={onChange}
              pagination={false}
              className="newsListTable"
            />
            <div className="paginationWrap">
              <Pagination
                onChange={setPagination}
                current={current}
                total={total}
                pageSize={pageSize}
              />
            </div>
          </Scrollbars>
        </div>
      </CardWrapper>
    </Box>
    <Delete
      multiple={multipleCondition}
      visible={showDeleteModal}
      onSubmit={() => onActiveChangeMultiple(false)}
      onCancel={onCloseModal}
    />
  </LayoutWrapper>
);

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
