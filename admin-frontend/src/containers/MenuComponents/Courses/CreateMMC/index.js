import React, { Component } from 'react';
import { connect } from 'react-redux';
import coursesActions from 'redux/courses/actions';
import LayoutContent from 'components/utility/layoutContent';
import { Banner } from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import CoursesCreateMMCWrapper from './coursesCreateMMC.style';
import config from '../../../../config';

const page = bemlds('page');
const { MMC_SITE } = config;

class CoursesCreateMMC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LayoutContent>
        <CoursesCreateMMCWrapper>
          <Banner title={<IntlMessages id="courses.createMMCBanner" />} />
          <section className={page()}>
            <div className={page('article')}>
              <p><IntlMessages id="courses.createMMCArticlePart1" /></p>
              <p><IntlMessages id="courses.createMMCArticlePart2" /></p>
              <p><IntlMessages id="courses.createMMCArticlePart3" /></p>
            </div>
            <a
              type="button"
              className={page('button')}
              onClick={() => {}}
              href={MMC_SITE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IntlMessages id="courses.createMMCBtn" />
            </a>
          </section>
        </CoursesCreateMMCWrapper>
      </LayoutContent>
    );
  }
}
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { ...coursesActions })(CoursesCreateMMC);
