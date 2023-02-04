import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentTutorFp } from 'selectors';
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
import TutorsDeleteConfirmWrapper from './TutorsDeleteConfirm.style';

const b = bemlds('confirm');

class TutorsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { currentTutor, history } = this.props;

    if (!currentTutor.firstName) { history.push(`${URLS.tutorsEdit}`); }
  }

  clickSaveHandle = () => {
    this.setState({ clickSave: false });
  };

  render() {
    const { clickSave } = this.state;
    const { currentTutor } = this.props;
    const { firstName, lastName } = currentTutor;

    return (
      <LayoutContent>
        <TutorsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="tutors.deleteBanner" />} />
          {clickSave && (
          <BannerNotification
            error={false}
            title={`Tutor - ${firstName} ${lastName} is deleted!`}
            close={this.clickSaveHandle}
            isScrollMount
          />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`Tutor - ${firstName} ${lastName} is deleted!`}
            </div>
          </section>
        </TutorsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentTutor = getCurrentTutorFp(state);
  return {
    currentTutor,
  };
};


export default connect(mapStateToProps)(TutorsDeleteConfirm);
