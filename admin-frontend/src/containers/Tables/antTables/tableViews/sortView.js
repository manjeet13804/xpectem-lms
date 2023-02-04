import React, { Component } from 'react';
import TableWrapper from '../antTable.style';

export default class extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      dataList: this.props.dataList.getAll(),
      pagination: {
        pageSize: 5,
        total: 20,
      },
    };
  }
  onChange(pagination, filters, sorter) {
    const { dataList } = this.props;
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey);
      } else {
        dataList.getSortDesc(sorter.columnKey);
      }
    }
    this.setState({ dataList: dataList.getAll(), pagination: {...pagination}  });
  }

  render() {
    return (
      <TableWrapper
        columns={this.props.tableInfo.columns}
        onChange={this.onChange}
        dataSource={this.state.dataList}
        className="isoSortingTable"
        pagination={this.state.pagination}
      />
    );
  }
}
