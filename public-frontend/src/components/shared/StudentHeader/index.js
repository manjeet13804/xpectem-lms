// @flow
import React, { Node } from 'react';
import { NavLink } from 'react-router-dom';

import { MenuNotice, MobileMenu } from 'components';
import { HEADER_DICTIONARY } from 'localise';
import { PATHS } from 'constants/paths';
import { bemlds } from 'utils';
import logo from 'assets/images/xpectum_logo.png';
import MenuAccount from './MenuAccount';
import './styles.scss';

const {
  links: {
    myCourses,
    communication,
    support,
    certificates,
  },
} = HEADER_DICTIONARY;

const b = bemlds('students-header');

const buttons = [
  {
    text: myCourses,
    link: '/student-courses',
  },
  {
    text: communication,
    link: '/student-communication',
  },
  {
    text: support,
    link: '/support',
  },
  {
    text: certificates,
    link: PATHS.certificates,
  },
];


const StudentHeader = (): Node => (
  <header className={b()}>
    <MobileMenu buttons={buttons} className={b('mobile-menu')} />
    <div className={b('logo-link')}>
      <img className={b('link')} src={logo} alt="logo" />
    </div>
    <nav className={b('nav')}>
      {
        buttons.map(({ text, link }: object): Node => (
          <NavLink className={b('link')} activeClassName={b('active-link')} key={text} to={link}>{text}</NavLink>
        ))
      }
    </nav>
    <MenuNotice className={b('notification')} />
    <MenuAccount className={b('user-menu-button')} />
  </header>
);

export default StudentHeader;
