import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import {
  getCurrentStudentsFp,
} from 'selectors';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import StudentDeleteConfirmWrapper from './deleteConfirm.style';

const b = bemlds('confirm');

class StudentDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { currentStudents, history } = this.props;
    const [currentStudent] = currentStudents || [];
    if (!currentStudent) { history.push(`${URLS.studentsInfoUrl}`); }
  }

  clickSaveHandle = (value = true) => {
    this.setState({ clickSave: value });
  };

  closeBanner = () => {
    this.setState({ clickSave: false });
  }

  render() {
    const { clickSave } = this.state;

    const { currentStudents } = this.props;

    if (!currentStudents.length) return null;

    const [currentStudent] = currentStudents || [];

    const {
      firstName,
      lastName,
      userEmail,
    } = currentStudent;

    const firstEmail = userEmail[0].email;
    return (
      <LayoutContent>
        <StudentDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="students.deleteBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.deleteMessage" />}
              clickSaveHandle={this.clickSaveHandle}
              close={this.closeBanner}
              isScrollMount
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The student - ${firstName} ${lastName} ${firstEmail} is deleted!`}
            </div>
          </section>
        </StudentDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentStudents = getCurrentStudentsFp(state);

  return {
    currentStudents,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(StudentDeleteConfirm);
