import React from 'react';
import { store, history } from 'redux/store';
import logoImg from 'assets/images/xpectum_menu.png';
import appActions from 'redux/app/actions';
import IntlMessages from 'components/utility/intlMessages';
import { MAIN_ROUTE } from 'constants/routes';

const { changeCurrent } = appActions;
const { dispatch } = store;

const onLink = () => {
  dispatch(changeCurrent(['users']));
  history.push(MAIN_ROUTE.home);
};

export default () => (
  <div onClick={() => onLink()} role="button" className="isoLogoWrapper">
    <div className="collapsedLogoContainer">
      <IntlMessages classname="xpectumLogo__collapsed" id="sidebar.menu" />
    </div>
    <div onClick={() => onLink()} role="button" className="logoContainer">
      <img className="xpectumLogo" src={logoImg} alt="#" />
    </div>
  </div>
);
