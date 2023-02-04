// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import block from 'utils/bem';
import { Page } from 'pages';
import {
  AddUserBtn,
  AdminItemCard,
  TableContent,
  AddingAdminPopup,
} from 'components';
import {
  actionGetAllUsers,
  actionGetAllOrganisation,
} from 'redux/actions';
import {getUsersList, getUserRoles, getOrganisations} from 'redux/selectors';
import { TERM_SHARED } from 'localise';

import './administrators.scss';

const bem = block('administrators');

type StateType = {
  isFormAdminShow: boolean
};

class AdministratorsPage extends Page <null, StateType> {
  constructor() {
    super();
    this.bem = bem;
    this.state = {
      isFormAdminShow: false,
    };
  }

  componentDidMount() {
    const {getAllOrganisation, getUserList} = this.props;

    getAllOrganisation();
    getUserList();
  }

  showFormAdministrator = () => {
    this.setState({
      isFormAdminShow: true,
    });
  }

  closeFormAdministartor = () => {
    this.setState({
      isFormAdminShow: false,
    });
  }

  renderContent = (): Node => {
    const { isFormAdminShow } = this.state;
    const { adminList, organisations } = this.props;
    return (
      <React.Fragment>
        <div className={bem('wrap')}>
          <AddUserBtn
            text={TERM_SHARED.addAdministrator}
            clickHandler={this.showFormAdministrator}
          />
        </div>
        <TableContent
          row={AdminItemCard}
          renderList={adminList}
          organisationList={organisations}
          showSwitchControl="true"
        />
        {
          isFormAdminShow
          && (
          <AddingAdminPopup
            close={this.closeFormAdministartor}
          />
          )
        }
      </React.Fragment>
    );
  }
}

const stateProps = (state: object): object => ({
  adminList: getUsersList(state),
  userRole: getUserRoles(state),
  organisations: getOrganisations(state),
});

const dispatchProps = {
  getAllOrganisation: actionGetAllOrganisation,
  getUserList: actionGetAllUsers,
};

export default connect(stateProps, dispatchProps)(AdministratorsPage);
