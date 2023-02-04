// @flow
import React, { SynteticEvent } from 'react';
import { connect } from 'react-redux';
import { PopupContainer, AddingExistingAdminForm } from 'components';
import { getGroupsAsArray, getUsersList } from 'redux/selectors';
import {
  actionSearch,
  actionGetGroups,
  actionRequest,
  actionRequestDefault,
  actionSearchDefault,
}
  from 'redux/actions';
import {GroupType, UserType} from 'models';
import parseToOptionSelect from 'utils/parseToOptionSelect';

const DefaultProps = {
  hints: [],
  groups: [],
  requestGroups: () => {},
  searchUsers: () => {},
  searchDefault: () => {},
  loading: false,
  defaultForm: () => {},
};

type PropsType = {
    close: () => void,
    loading?: boolean,
    hints?: Array<UserType>,
    groups?: Array<GroupType>,
    requestGroups?: () => object,
    searchUsers?: (value: string) => void,
    searchDefault?: () => void,
    defaultForm?: () => object
};

class AddingExistingAdminPopup extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    const {requestGroups, defaultForm} = this.props;
    this.state = {
      showHint: false,
    };

    defaultForm();
    requestGroups();
  }

  handleChangeName = (e: SynteticEvent) => {
    const {searchUsers, searchDefault} = this.props;
    this.setState({showHint: true});
    const {target: {value}} = e;
    if (value.length > 2) {
      searchUsers(value);
    } else {
      searchDefault();
    }
  };

  handleSubmit = (e: SynteticEvent) => {
    e.preventDefault();
  };

  closeHint = () => {
    this.setState({showHint: false});
  };

  render(): Node {
    const {
      close,
      hints,
      groups,
      loading,
    } = this.props;
    const {showHint} = this.state;
    return (
      <React.Fragment>
        {groups
        && (
        <PopupContainer isRequestDefault close={close}>
          <AddingExistingAdminForm
            close={close}
            handleChangeField={this.handleChangeName}
            handleSubmit={this.handleSubmit}
            hints={hints}
            selectOptions={
              parseToOptionSelect(groups, {
                value: 'id',
                label: 'name',
              })
            }
            closeHint={this.closeHint}
            isLoading={loading}
            showHint={showHint}
          />
        </PopupContainer>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  hints: getUsersList(state),
  groups: getGroupsAsArray(state),
});

const mapDispatchToProps = {
  searchUsers: actionSearch,
  requestGroups: actionGetGroups,
  sendData: actionRequest,
  defaultForm: actionRequestDefault,
  searchDefault: actionSearchDefault,
};

AddingExistingAdminPopup.defaultProps = DefaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(AddingExistingAdminPopup);
