// @flow
import React, { Node } from 'react';
import { connect } from 'react-redux';
import block from 'utils/bem';

import { getUserRoles, getMyOrganisations } from 'redux/selectors';

import {
  actionGetAllMyOrganisation,
} from 'redux/actions';
import './organisationsswitch.scss';
import { Page } from 'pages';
import { SimpleLayout, OrganisationBtn } from 'components';
import LogoXpectum from 'assets/images/xpectum_logo_big.png';
import { PATHS } from 'constants/paths';
import { Redirect } from 'react-router-dom';

const bem = block('organisations-switch');

type StateType = {
  displayMode: string,
  showLoginPopup: boolean
};

type PropsType = {};

const defaultProps = {};

class OrganisationsSwitchPage extends Page<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getAllMyOrganisation } = this.props;
    getAllMyOrganisation();
  }

  render(): Node {
    const { myOrganisations } = this.props;
    if(myOrganisations.length && myOrganisations.length == 1) {
      return (
        <Redirect
          to={{
            pathname: PATHS.studentCourses,
          }}
        />
      );
    } else {
      return (
        <SimpleLayout contentClassName={bem()}>
          <img src={LogoXpectum} alt="xpectim-logo" className={bem('logo')} />
          <hr className="line" />
          <div className={bem('text')}>
            You have access to several different organisations. Choose which one you want to access.
          </div>
          {
              myOrganisations.map(({id, name}: object): Node => (
                <OrganisationBtn key={id} name={name} />
              ))
          }
        </SimpleLayout>
      );
    }
  }
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
  myOrganisations: getMyOrganisations(state),
});

const dispatchProps = {
  getAllMyOrganisation: actionGetAllMyOrganisation,
};

OrganisationsSwitchPage.defaultProps = defaultProps;
export default connect(stateProps, dispatchProps)(OrganisationsSwitchPage);
