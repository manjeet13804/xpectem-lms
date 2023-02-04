// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from 'assets/images/logo.png';
import logoWhite from 'assets/images/logo-white.png';
import { Avatar, NoticeIcon } from 'components';

import { getUserAvatar } from 'redux/selectors';

import block from 'utils/bem';
import { linkClass, sharedClass } from 'utils/className';
import classNames from 'classnames/bind';

import { USER_ROLES_ENUM, POPUPS_ENUM } from 'constants/enums';
import { PATHS } from 'constants/paths';
import {
  ALT_IMG,
  TITLE_IMG,
  TERM_SHARED,
} from 'localise';
import { renderList, type LinkType } from './utils';

import './header.scss';

const bem = block('header');

const DefaultProps = {
  isHome: false,
  className: '',
  openLoginPopup: null,
  avatar: {},
};

type PropType = {
  isHome?: boolean,
  className?: string,
  openLoginPopup?: () => void,
  avatar?: object | string,
  userRole: string
};

class Header extends PureComponent<PropType> {
  getRenderList = (): Array<LinkType> => {
    const { userRole } = this.props;
    return renderList(userRole);
  }

  openPopup = (popupName: string) => {
    console.log('OPEN', popupName);
  }

  render(): Node {
    const {
      className,
      openLoginPopup,
      avatar,
      isHome,
      userRole,
    } = this.props;

    const isLogin = userRole !== USER_ROLES_ENUM.none;
    const RENDER_LIST = this.getRenderList();
    const logoSrc = isHome ? logoWhite : logo;
    const mainClass = sharedClass(bem, className);
    const logoClass = classNames([
      `${bem('logo')}`,
      'logo',
    ]);
    const navClass = classNames([
      `${bem('nav')}`,
      'nav',
    ]);
    const btnLoginClass = classNames([
      `${bem('btn', {login: true})}`,
      'btn',
    ]);
    const btnProfileClass = classNames([
      `${bem('btn', {profile: true})}`,
      'btn',
      'btn--icon',
    ]);
    const btnNoticeClass = classNames([
      `${bem('btn', {notice: true})}`,
      'btn',
      'btn--icon',
    ]);

    return (
      <header className={mainClass}>
        <NavLink className={logoClass} to={PATHS.home}>
          <img src={logoSrc} alt={ALT_IMG.logo} title={TITLE_IMG.logo} />
        </NavLink>
        <nav className={navClass}>
          {
            RENDER_LIST.map((link: LinkType): Node => (
              <NavLink className={linkClass(bem)} to={link.path} key={link.text}>
                <span className={bem('text')}>{link.text}</span>
              </NavLink>
            ))
          }
        </nav>
        {
          !isLogin && (
            <NavLink to={PATHS.signin}>
              <button
                className={btnLoginClass}
                type="button"
                onClick={openLoginPopup}
              >
                {TERM_SHARED.login}
              </button>
            </NavLink>
          )
        }
        {
          isLogin && (
            <div className={bem('btn-container')}>
              {
                userRole !== USER_ROLES_ENUM.xpectrum
                && (
                  <button
                    className={btnNoticeClass}
                    type="button"
                    onClick={() => { this.openPopup(POPUPS_ENUM.notice); }}
                  >
                    <NoticeIcon />
                  </button>
                )
              }
              <button
                className={btnProfileClass}
                type="button"
                onClick={() => { this.openPopup(POPUPS_ENUM.profile); }}
              >
                <Avatar
                  img={avatar.img}
                  firstName={avatar.firstName}
                  lastName={avatar.lastName}
                />
              </button>
            </div>
          )
        }
      </header>
    );
  }
}

const stateProps = (state: object): object => ({
  avatar: getUserAvatar(state),
});

Header.defaultProps = DefaultProps;

export default connect(stateProps)(Header);
