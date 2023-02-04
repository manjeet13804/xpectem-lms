import React, {PureComponent, Fragment} from 'react';
import { OrganisationBtn, MiniFooter } from 'components';
import logoImg from 'assets/images/xpectum.png';
import IntlMessages from 'components/utility/intlMessages';
import OrgSwitchStyleWrapper from './organisationsSwitch.style';

class OrganisationsSwitch extends PureComponent {
  render() {
    return (
      <Fragment>
        <OrgSwitchStyleWrapper>
          <img src={logoImg} alt="xpectim-logo" className="logo" />
          <hr className="line" />
          <div className="text">
            <IntlMessages id="page.OrgSwitchText" />
          </div>
            <OrganisationBtn name="KolesnikovITCompany"/>
        </OrgSwitchStyleWrapper>
        <MiniFooter />
      </Fragment>
    );
  }
}
export default OrganisationsSwitch;
