import React, { Component } from 'react';
import { connect } from 'react-redux';
import IntlMessages from 'components/utility/intlMessages';
import LayoutContent from 'components/utility/layoutContent';
import URLS from 'redux/urls';
import { bemlds } from 'utils';
import { COLORS } from 'constants/constants';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';

import LmsGroupsDeleteConfirmWrapper from './LmsGroupsDeleteConfirm.style';

const b = bemlds('confirm');

class LmsGroupsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { groupName, history } = this.props;
    if (!groupName)  { history.push(URLS.lmsGroupsEditUrl); }
  };

  clickSaveHandle = (value) => {
    this.setState({ clickSave: value });
  };

  render() {
    const { clickSave } = this.state;
    const { groupName } = this.props;

    return (
      <LayoutContent>
        <LmsGroupsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="lmsGroups.editBanner" />} />
          {clickSave && (
          <BannerNotification
            error={false}
            title={`The LMS group - ${groupName} is deleted!`}
            clickSaveHandle={this.clickSaveHandle}
          />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              <span><IntlMessages id="lmsGroups.lms" /></span>
              <span className={b('backspace')}>{groupName}</span>
              <span><IntlMessages id="lmsGroups.isDeleted" /></span>
            </div>
          </section>
        </LmsGroupsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { lmsGroups: { currentLmsGroup } } = state;
  const groupName = currentLmsGroup && currentLmsGroup.name;
  return { groupName };
};

export default connect(mapStateToProps, null)(LmsGroupsEdit);
