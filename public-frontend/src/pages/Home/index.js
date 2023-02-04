// @flow
import React, {Component} from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import block from 'utils/bem';
import classNames from 'classnames/bind';
import {
  Footer,
  Header,
  CourseCard,
  SearchField,
  Sort,
} from 'components';


import { getUserRoles } from 'redux/selectors';
import { HOME_DICTIONARY } from 'localise';
import { COURSE_LIST_DESIGNER } from 'constants/mock';
import { USER_ROLES_ENUM } from 'constants/enums';
import { Banner, DisplayToggle} from './components';
import { COURSE_LIST, DISPLAY_MODE, OPTIONS_SORT } from './constants';

import './home.scss';

const bem = block('home');

type StateType = {
  displayMode: string,
  showLoginPopup: boolean
};

type PropsType = {
  userRole: string
};

const defaultProps = {
};

class HomePage extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      displayMode: DISPLAY_MODE.grid,
    };
    this.isHome = true;
  }

  toggleDisplay = (displayMode: string) => {
    this.setState({displayMode});
  }

  render(): Node {
    const { displayMode } = this.state;
    const { userRole } = this.props;
    const isTableGrid = displayMode === DISPLAY_MODE.grid;
    const listClass = classNames([
      `${bem('course-list', {table: isTableGrid, list: !isTableGrid})}`,
    ]);
    const courseList = (userRole !== USER_ROLES_ENUM.none && userRole !== USER_ROLES_ENUM.student)
      ? COURSE_LIST_DESIGNER
      : COURSE_LIST;

    return (
      <div className={bem()}>
        <Header
          className={bem('header')}
          isHome={this.isHome}
          userRole={userRole}
        />
        <Banner />
        <main className={bem('content')}>
          <section className={bem('controls')}>
            <h1 className={bem('title')}>{HOME_DICTIONARY.coursePropspectus}</h1>
            <Sort
              options={OPTIONS_SORT}
              classNamePrefix={bem()}
            />
            <div className={bem('controls-wrap')}>
              <DisplayToggle
                classNamePrefix={bem()}
                toggler={this.toggleDisplay}
                displayMode={displayMode}
              />
              <SearchField
                classNamePrefix={bem()}
              />
            </div>
          </section>
          <section className={listClass}>
            {
              courseList.map((item: object): Node => (
                <CourseCard
                  key={item.id}
                  course={item}
                  role={userRole}
                />
              ))
            }
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
});

HomePage.defaultProps = defaultProps;
export default withRouter(connect(stateProps)(HomePage));
