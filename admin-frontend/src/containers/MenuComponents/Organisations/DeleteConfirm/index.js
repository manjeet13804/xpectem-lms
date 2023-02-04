import React, { Component } from 'react';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import orgActions from 'redux/organisations/actions';
import {
  getCurrentOrgFp,
  getCurrentLmsGroupOrgFp,
  getCurrentOrgIdFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
} from 'components';
import OrganisationsDeleteConfirmWrapper from './OrganisationsDeleteConfirm.style';

const b = bemlds('confirm');

const { getDeleteId } = REGEXP;

class OrganisationsDeleteConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickSave: true,
    };
  }

  clickSaveHandle = (value = true) => {
    this.setState({ clickSave: value });
  };

  componentWillMount() {
    const { currentOrg, history } = this.props;

    if (!currentOrg.name) { history.push(`${URLS.orgEditUrl}`); }
  };

  render() {
    const { clickSave } = this.state;
    const { currentOrg: { name } = {} } = this.props;

    return (
      <LayoutContent>
        <OrganisationsDeleteConfirmWrapper>
          <Banner title={<IntlMessages id="organisations.deleteBanner" />} />
          {clickSave && (
            <BannerNotification
              error={false}
              title={`The organisation - ${name} is deleted!`}
              clickSaveHandle={this.clickSaveHandle}
            />
          )}
          <section className={b()}>
            <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
            <div className={b('title')}>
              {`The organisation - ${name} is deleted!`}
            </div>
          </section>
        </OrganisationsDeleteConfirmWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentOrg = getCurrentOrgFp(state);
  const currentLmsGroup = getCurrentLmsGroupOrgFp(state);
  const currentOrgId = getCurrentOrgIdFp(state);
  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);

  const idCurrentOrg = currentOrgId || res[1];

  return {
    currentOrg,
    idCurrentOrg,
    currentLmsGroup,
  };
};

export default connect(mapStateToProps, { ...orgActions })(OrganisationsDeleteConfirm);
