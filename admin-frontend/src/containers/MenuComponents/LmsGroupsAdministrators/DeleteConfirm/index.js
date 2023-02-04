import React, { Component } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import { getCurrentAdminFp, getDeletedStatusFp } from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import AdministratorDeleteConfirmWrapper from './AdministratorsDeleteConfirm.style';

const b = bemlds('confirm');

class AdministratorsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  componentWillMount() {
    const { currentAdmin, history } = this.props;

    if (!currentAdmin.firstName) { history.push(`${URLS.lmsGroupAdminEditUrl}`); }
  };

  clickSaveHandle = () => {
    this.setState({ clickSave: false });
  };

  render() {
    const { clickSave } = this.state;
    const { currentAdmin } = this.props;
    const { firstName, lastName} = currentAdmin;

    return (
      <LayoutContent>
        <AdministratorDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="groupAdmin.bannerDelete" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={`The LMS group administrator - ${firstName} ${lastName} is deleted!`}
              close={this.clickSaveHandle}
              isScrollMount
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The LMS group administrator - ${firstName} ${lastName} is deleted!`}
            </div>
          </section>
        </AdministratorDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentAdmin = getCurrentAdminFp(state);
  const isDeleteAdmin = getDeletedStatusFp(state);

  return { currentAdmin, isDeleteAdmin };
};

export default connect(mapStateToProps, null)(AdministratorsDeleteConfirm);
