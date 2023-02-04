import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCurrentOrgAdminFp } from 'selectors';
import orgAdminsActions from 'redux/orgAdministrators/actions';
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
import OrgAdminsDeleteConfirmWrapper from './OrgAdminsDeleteConfirm.style';

const b = bemlds('confirm');

class OrgAdminsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { currentOrgAdmin, history } = this.props;

    if (!currentOrgAdmin.firstName) { history.push(`${URLS.orgAdminEdit}`); }
  };

  clickSaveHandle = () => {
    this.setState({ clickSave: false });
  };

  render() {
    const { clickSave } = this.state;
    const { currentOrgAdmin } = this.props;
    const { firstName, lastName, firstEmail } = currentOrgAdmin;

    return (
      <LayoutContent>
        <OrgAdminsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="orgAdmins.deleteBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={`The organisation administrator - ${firstName} ${lastName} ${firstEmail} is deleted!`}
              close={this.clickSaveHandle}
              isScrollMount
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The organisation administrator - ${firstName} ${lastName} ${firstEmail} is deleted!`}
            </div>
          </section>
        </OrgAdminsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentOrgAdmin = getCurrentOrgAdminFp(state);

  return {
    currentOrgAdmin,
  };
};

export default connect(mapStateToProps, { ...orgAdminsActions })(OrgAdminsDeleteConfirm);
