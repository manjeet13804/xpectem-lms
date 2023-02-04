import React, { Component } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import ProfileDeleteConfirmWrapper from './ProfileDeleteConfirm.style';

const b = bemlds('confirm');

class ProfileDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  clickSaveHandle = (value) => {
    this.setState({clickSave: value});
  };

  render() {
    const { clickSave } = this.state;
    return (
      <LayoutContent>
        <ProfileDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="groupAdmin.bannerDelete" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="groupAdmin.deleteMessage"/>}
              clickSaveHandle={this.clickSaveHandle}
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {<IntlMessages id="groupAdmin.deleteMessage" />}
            </div>
          </section>
        </ProfileDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

export default ProfileDeleteConfirm;