import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import {
  getCurrentAdminFp,
  getCurrentAdminIdFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DeleteAttentionSvg,
} from 'components';
import { bemlds } from 'utils';
import AdministratorsDeleteWrapper from './AdministratorsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = string => string.trim().toLowerCase() !== 'delete';
const deleteConfirmUrl = id => `${URLS.lmsGroupAdminDeleteUrl}/${id}/confirm`;

class AdministratorsDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  clickCancel = () => {
    const { history } = this.props;
    history.goBack();
  };

  componentWillMount() {
    const { getCurrentAdminById, adminId } = this.props;
    getCurrentAdminById(adminId);
  }

  render() {
    const { inputValue } = this.state;
    const {
      adminId,
      deleteAdminLmsGroup,
      currentAdmin,
    } = this.props;

    const {
      firstName,
      lastName,
      lmsGroups,
    } = currentAdmin;

    return (
      <LayoutContent>
        <AdministratorsDeleteWrapper>
          <Banner title={<IntlMessages id="groupAdmin.bannerDelete" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                {<IntlMessages id="groupAdmin.deleteTitleAdmin" />}
                {`${firstName} ${lastName} ?`}
              </div>
              <div className={b('text-message')}>
                {<IntlMessages id="groupAdmin.deleteAttentionAdmin" />}
                {lmsGroups && lmsGroups[0] && lmsGroups[0].name}
              </div>
              <div className={b('text-confirm')}>
                <IntlMessages id="groupAdmin.deleteConfirm" />
              </div>
              <input
                className={b('text-input')}
                type="text"
                value={inputValue}
                name="inputValue"
                placeholder={confirmDelete}
                onChange={this.inputChange}
              />
              <section className={btn()}>
                <Link
                  className={btn('link')} 
                  disabled={deleteConfirm(inputValue)}
                  to={deleteConfirmUrl(adminId)}
                >
                  <button
                    className={btn('delete')}
                    disabled={deleteConfirm(inputValue)}
                    onClick={() => deleteAdminLmsGroup(adminId)}
                  >
                    <IntlMessages id="groupAdmin.deleteBtn" />
                  </button>
                </Link>
                <button
                  className={btn('cancel')}
                  onClick={this.clickCancel}
                >
                  <IntlMessages id="groupAdmin.cancelBtn" />
                </button>
              </section>
            </section>
          </section>
        </AdministratorsDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentAdmin = getCurrentAdminFp(state);
  const currentAdminId = getCurrentAdminIdFp(state);

  const { pathname } = location;
  const res = pathname && pathname.match(getDeleteId);
  const adminId = currentAdminId || res[1];


  return { currentAdmin, adminId };
};

export default connect(mapStateToProps, { ...lmsGroupAdminsActions })(AdministratorsDelete);
