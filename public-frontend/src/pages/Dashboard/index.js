// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';

import { getUserRoles } from 'redux/selectors';

import block from 'utils/bem';

import { Page } from 'pages';
import { DASHBOARD_DICTIONARY } from 'localise';
import './dashboard.scss';

const bem = block('dashboard');

const contentList: Array<string> = [
  DASHBOARD_DICTIONARY.latestPublishedCourses,
  DASHBOARD_DICTIONARY.topCourses,
  DASHBOARD_DICTIONARY.newCourseAdministrators,
  DASHBOARD_DICTIONARY.topCourseDesigners,
];

class DashboardPage extends Page {
  constructor() {
    super();
    this.bem = bem;
  }

  renderItem = (title: string): Node => (
    <section className={bem('content-block')} key={title}>
      <h2 className={bem('title')}>{title}</h2>
      <div className={bem('wrap')} />
    </section>
  )

  renderContent = (): Node => contentList.map((item: string): Node => (
    this.renderItem(item)
  ))
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
});

export default connect(stateProps)(DashboardPage);
