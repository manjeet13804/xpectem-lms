// @flow
import React from 'react';
import { connect } from 'react-redux';
import { PopupContainer, AddingAdminForm } from 'components';
import { getGroupsAsArray, getUsersList, getRequestStatus } from 'redux/selectors';
import {
  actionGetAllUsers,
  actionGetGroups,
  actionRequest,
  actionRequestDefault,
}
  from 'redux/actions';
import {GroupType, UserType} from 'models';
import parseToOptionSelect from 'utils/parseToOptionSelect';
import {ADMIN_USER} from 'constants/apiUrls';

const DefaultProps = {
  hints: [],
  groups: [],
  requestGroups: () => {},
  loading: false,
  defaultForm: () => {},
  request: () => {},
  requestUserList: () => {},
};

type PropsType = {
    close: () => void,
    loading?: boolean,
    hints?: Array<UserType>,
    groups?: Array<GroupType>,
    requestGroups?: () => object,
    defaultForm?: () => object,
    request?: () => void,
    requestUserList?: () => void,
    requestStatus: boolean
};

class AddingAdminPopup extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    const {requestGroups, defaultForm} = this.props;
    defaultForm();
    requestGroups();
  }

  handleSubmit = (body: object) => {
    const {request, requestUserList} = this.props;
    const {
      groups,
      telephone,
      firstName,
      lastName,
      email,
      roles,
    } = body;
    const groupsData = groups.map((group: Array<GroupType>): string | null => group.value);

    request({
      method: 'POST',
      url: ADMIN_USER,
      body: {
        phone: telephone,
        firstName,
        lastName,
        email,
        groups: groupsData,
        roles,
      },
      callback: () => {
        requestUserList();
      },
      isToken: true,
      phone: body.telephone,
    });
  };

  render(): Node {
    const {
      close,
      hints,
      groups,
      loading,
      requestStatus,
    } = this.props;
    return (
      <React.Fragment>
        {requestStatus && close()}
        <PopupContainer isRequestDefault close={close}>
          <AddingAdminForm
            close={close}
            handleSubmit={this.handleSubmit}
            hints={hints}
            selectOptions={
              parseToOptionSelect(groups, {
                value: 'id',
                label: 'name',
              })
            }
            isLoading={loading}
          />
        </PopupContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  hints: getUsersList(state),
  groups: getGroupsAsArray(state),
  requestStatus: getRequestStatus(state),
});

const mapDispatchToProps = {
  requestGroups: actionGetGroups,
  request: actionRequest,
  defaultForm: actionRequestDefault,
  requestUserList: actionGetAllUsers,
};

AddingAdminPopup.defaultProps = DefaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddingAdminPopup);
