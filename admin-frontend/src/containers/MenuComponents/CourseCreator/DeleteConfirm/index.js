import React, { Component } from 'react';
import { connect } from 'react-redux';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS, SIMPLE_DICTIONARY } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import AdministratorDeleteConfirmWrapper from './Wrapper.style';

const b = bemlds('confirm');

class CourseCreatorConfirmDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  clickSaveHandle = () => {
    this.setState({ clickSave: false });
  };

  render() {
    const { clickSave } = this.state;
    const { currentCourseCreator } = this.props;
    const { firstName, lastName} = currentCourseCreator;

    return (
      <LayoutContent>
        <AdministratorDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="courseCreators.bannerDelete" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={SIMPLE_DICTIONARY.deleteTitle(firstName, lastName)}
              close={this.clickSaveHandle}
              isScrollMount
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {SIMPLE_DICTIONARY.deleteTitle(firstName, lastName)}
            </div>
          </section>
        </AdministratorDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = ({
  courseCreator: {
    currentCourseCreator,
  }
}) => ({
  currentCourseCreator,
});

export default connect(mapStateToProps, null)(CourseCreatorConfirmDelete);
