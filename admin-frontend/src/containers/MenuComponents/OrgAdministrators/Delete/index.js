import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getCurrentOrgAdminFp,
  getCurrentAdminIdOrgAdminsFp,
} from 'selectors';
import URLS from 'redux/urls';
import orgAdminsActions from 'redux/orgAdministrators/actions';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import OrgAdminsDeleteWrapper from './OrgAdminsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = (string) => string.trim().toLowerCase() !== 'delete';

const urlDeleteConfirm = id => `${URLS.orgAdminDelete}/${id}/confirm`;

class OrgAdminsDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  clickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  inputChange = (event) => {
    this.setState({inputValue: event.target.value});
  };

  componentWillMount() {
    const { getCurrentAdminById, adminId } = this.props;
    getCurrentAdminById(adminId);
  };

  render() {
    const { inputValue } = this.state;

    const {
      adminId,
      deleteAdminOrgAdmins,
      currentOrgAdmin,
      searchOrgData,
    } = this.props;

    const {
      firstName,
      lastName,
    } = currentOrgAdmin;

    const rebuildedSearchedOrgs = searchOrgData.map(item => item.text).join('');

    return (
      <LayoutContent>
        <OrgAdminsDeleteWrapper>
          <Banner title={<IntlMessages id="orgAdmins.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="groupAdmin.deleteTitle" />
                {firstName} {lastName}
              </div>
              <div className={b('text-message')}>
                {`This will delete organisation admin ${firstName} ${lastName} belonging to ${rebuildedSearchedOrgs}`}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="groupAdmin.deleteConfirm" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <Link className={btn('link')} to={urlDeleteConfirm(adminId)}>
                  <DefaultButton
                    textId="groupAdmin.deleteBtn"
                    disabled={deleteConfirm(inputValue)}
                    onClick={() => deleteAdminOrgAdmins(adminId)}
                    isDelete
                  />
                </Link>
                <DefaultButton
                  textId="groupAdmin.cancelBtn"
                  onClick={this.clickCancel}
                />
              </section>
            </section>
          </section>
        </OrgAdminsDeleteWrapper>
      </LayoutContent>
    );
  }
}


const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentOrgAdmin = getCurrentOrgAdminFp(state);
  const currentOrgAdminId = getCurrentAdminIdOrgAdminsFp(state);
  const searchOrgData = state.searchOrganisations.selectedOrganisations;

  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const adminId = currentOrgAdminId || res[1];

  return {
    currentOrgAdmin,
    adminId,
    searchOrgData,
  };
};

export default connect(mapStateToProps, { ...orgAdminsActions })(OrgAdminsDelete);
