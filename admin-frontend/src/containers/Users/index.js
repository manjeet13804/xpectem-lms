import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';
import LayoutWrapper from 'components/utility/layoutWrapper';
import PageHeader from 'components/utility/pageHeader';
import Scrollbars from 'components/utility/customScrollBar';
import Button from 'components/uielements/button';
import userActions from 'redux/users/actions';
import TableWrapper from 'containers/Tables/antTables/antTable.style';
import CardWrapper, { Box } from './userList.style';
import { columns } from './config';
import UserModal from './modal';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      pageSize: 10,
      isVisible: false,
      currentUser: null,
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers = () => {
    const { getUsers } = this.props;
    const { pageSize, current } = this.state;
    const offset = current ? (current - 1) * pageSize : 0;
    getUsers({limit: pageSize, offset});
  };

  changeRole = async (value, propKey, index) => {
    const { users, updateUser } = this.props;
    const { id } = users[index];
    if (id) {
      await updateUser({
        id,
        [propKey]: value,
      });
    }
    this.getUsers();
  };

  setPagination = async (count) => {
    const { pageSize } = this.state;
    await this.setState({ pageSize, current: count });
    this.getUsers();
  }

  onDeleteUser = (id) => {
    const { deleteUser } = this.props;
    deleteUser(id);
    this.getUsers();
  }

  onClickEditUser = (userId) => async () => {
    const { users } = this.props;
    const currentUser = users.find(({ id }) => Number(id) === Number(userId));
    await this.setState({
      currentUser
    })
    this.openModal()
  }

  userCreate = async user => {
    const { userCreate } = this.props;
    await userCreate(user);
    this.closeModal();
    this.getUsers();
  }

  updateUser = async props => {
    const { updateUser } = this.props;
    await updateUser(props);
    this.closeModal();
    this.getUsers();
  }

  openModal = () => {
    this.setState({
      isVisible: true,
    })
  }

  closeModal = () => {
    this.setState({
      isVisible: false,
      currentUser: null,
    })
  }

  render() {
    const {
      users,
      isLoading,
      resetPassword,
      total,
    } = this.props;

    const {
      current,
      pageSize,
      isVisible,
      currentUser
    } = this.state;

    return (
      <LayoutWrapper>
        <PageHeader>
          User list
        </PageHeader>
        <Box>
          <div className="isoUserTableBtn">
            <Button
              type="primary"
              className="mateAddUserBtn"
              onClick={this.openModal}
            >
              Add User
            </Button>
          </div>

          <CardWrapper title="Users">
            <div className="isoUserTable">
              <Scrollbars style={{ width: '100%' }}>
                <TableWrapper
                  dataSource={users}
                  rowKey="id"
                  loading={isLoading}
                  columns={
                    columns({
                      changeRole: this.changeRole,
                      onDelete: this.onDeleteUser,
                      onReset: resetPassword,
                      getUsers: this.getUsers,
                      editUser: this.onClickEditUser,
                    })}
                  pagination={false}
                  className="userListTable"
                />
                <div className="paginationWrap">
                  <Pagination
                    onChange={this.setPagination}
                    current={current}
                    total={Number(total)}
                    pageSize={pageSize}
                  />

                </div>
              </Scrollbars>
            </div>
          </CardWrapper>
        </Box>
        <UserModal
          visible={isVisible}
          onCancel={this.closeModal}
          currentUser={currentUser}
          userCreate={this.userCreate}
          updateUser={this.updateUser}
        />
      </LayoutWrapper>
    );
  }
}

function mapStateToProps({ users }) {
  return { ...users };
}

UserList.defaultProps = {
  match: {},
  users: [],
  total: null,
  getUsers: () => {},
  updateUser: () => {},
  userCreate: () => {},
  deleteUser: () => {},
  resetPassword: () => {},
  isLoading: false,
};

UserList.propTypes = {
  match: PropTypes.shape({}),
  users: PropTypes.arrayOf(PropTypes.shape({})),
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  getUsers: PropTypes.func,
  updateUser: PropTypes.func,
  userCreate: PropTypes.func,
  deleteUser: PropTypes.func,
  resetPassword: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(
  mapStateToProps,
  userActions,
)(UserList);
