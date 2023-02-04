import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import {
  getCurrentAdminGroupAdminsFp,
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
import GroupAdminsDeleteConfirmWrapper from './GroupAdminsDeleteConfirm.style';

const b = bemlds('confirm');

class GroupAdministratorsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { currentGroupAdmin, history } = this.props;
    if (!currentGroupAdmin.firstName) { history.push(`${URLS.orgAdminEdit}`); }
  };

  clickSaveHandle = () => {
    this.setState({ clickSave: false });
  };

  render() {
    const { clickSave } = this.state;
    const {
      currentGroupAdmin: {
        firstName,
        lastName,
        firstEmail,
      } = {},
    } = this.props;

    return (
      <LayoutContent>
        <GroupAdminsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="groupAdmins.deleteBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="groupAdmins.deleteMessage" />}
              close={this.clickSaveHandle}
              isScrollMount
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The group administrator - ${firstName} ${lastName} ${firstEmail} is deleted!`}
            </div>
          </section>
        </GroupAdminsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentGroupAdmin = getCurrentAdminGroupAdminsFp(state);

  return {
    currentGroupAdmin,
  };
};

export default connect(
  mapStateToProps,
  {
    ...groupAdminsActions,
  })(GroupAdministratorsDeleteConfirm);
