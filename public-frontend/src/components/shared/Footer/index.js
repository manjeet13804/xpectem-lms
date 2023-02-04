// @flow
import React, { Node } from 'react';
import { NavLink } from 'react-router-dom';
import block from 'utils/bem';
import { linkClass } from 'utils/className';

import { PATHS, SUPPORT_PATHS } from 'constants/paths';
import { CONTACTS } from 'constants/constants';
import {
  FOOTER_DICTIONARY,
  TERM_SHARED,
} from 'localise';

import { CopyRighting } from 'components';
import './footer.scss';

const bem = block('footer');

const DefaultProps = {
  isContactsShow: false,
};

type PropType = {
  isContactsShow?: boolean
};

const Footer = (props: PropType): Node => {
  const { titles, links } = FOOTER_DICTIONARY;
  const { isContactsShow } = props;
  return (
    <footer className={bem()}>
      <div className={bem('content')}>
        <section className={bem('wrap')}>
          <h1 className={bem('title')}>{titles.moreCourse}</h1>
          <NavLink className={linkClass(bem)} to={PATHS.home}>{links.course_prospectus}</NavLink>
          <NavLink className={linkClass(bem)} to={PATHS.home}>{links.joinMyCourse}</NavLink>
        </section>
        <section className={bem('wrap')}>
          <h1 className={bem('title')}>{titles.support}</h1>
          <NavLink className={linkClass(bem)} to={SUPPORT_PATHS.support('faq')}>{links.faq}</NavLink>
          <NavLink className={linkClass(bem)} to={SUPPORT_PATHS.support('contact-us')}>{links.support}</NavLink>
          <NavLink className={linkClass(bem)} to={PATHS.home}>{links.contactTutor}</NavLink>
        </section>
        {
          isContactsShow
          && (
            <section className={bem('wrap')}>
              <h1 className={bem('title')}>{titles.contact}</h1>
              <a className={linkClass(bem)} href={CONTACTS.email} type="email">
                <span className={bem('link-name')}>{`${TERM_SHARED.email} `}</span>
                {CONTACTS.email}
              </a>
              <a className={linkClass(bem)} href={CONTACTS.tel} type="tel">
                <span className={bem('link-name')}>{`${TERM_SHARED.tel} `}</span>
                {CONTACTS.tel}
              </a>
            </section>
          )
        }
      </div>
      <CopyRighting />
    </footer>
  );
};

Footer.defaultProps = DefaultProps;

export default Footer;
