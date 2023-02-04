import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import {
  getCurrentAdminGroupAdminsFp,
  getCurrentAdminIdGroupAdminsFp,
} from 'selectors';
import URLS from 'redux/urls';
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
import GroupAdminsDeleteWrapper from './GroupAdminsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = (string) => string.trim().toLowerCase() !== 'delete';

const urlToConfirmDelete = id => `${URLS.groupsAdminsDeleteUrl}/${id}/confirm`;

class GroupAdministratorsDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  inputChange = ({ target: { value } }) => {
    this.setState({ inputValue: value });
  };

  clickCancel = () => {
    const { history, adminId } = this.props;
    if (adminId)  { history.push(`${URLS.groupAdminsEditUrl}/${adminId}`); }
  };

  componentWillMount() {
    const { getCurrentAdminById, adminId } = this.props;
    getCurrentAdminById(adminId);
  }

  render() {
    const { inputValue } = this.state;

    const {
      currentGroupAdmin,
      deleteAdminGroupAdmins,
      adminId,
    } = this.props;

    const {
      firstName,
      lastName,
    } = currentGroupAdmin;

    return (
      <LayoutContent>
        <GroupAdminsDeleteWrapper>
          <Banner title={<IntlMessages id="groupAdmins.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="groupAdmins.deleteTitle" />
              </div>
              <div className={b('text-message')}>
                <IntlMessages id="groupAdmins.deleteAttention" />
                {firstName} {lastName}
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
                <Link
                  className={btn('link', {'disabled-link': deleteConfirm(inputValue)})}
                  to={urlToConfirmDelete(adminId)}
                >
                  <DefaultButton
                    textId="groups.deleteBtn"
                    disabled={deleteConfirm(inputValue)}
                    onClick={() => deleteAdminGroupAdmins(adminId)}
                    isDelete
                  />
                </Link>
                <DefaultButton
                  textId="groups.cancelBtn"
                  onClick={() => this.clickCancel()}
                />
              </section>
            </section>
          </section>
        </GroupAdminsDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentGroupAdmin = getCurrentAdminGroupAdminsFp(state);
  const currentGroupAdminId = getCurrentAdminIdGroupAdminsFp(state);


  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const adminId = currentGroupAdminId || res[1];

  return {
    currentGroupAdmin,
    adminId,
  };
};

export default connect(
  mapStateToProps,
  {
    ...groupAdminsActions,
  })(GroupAdministratorsDelete);
