import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import { connect } from 'react-redux';
import orgActions from 'redux/organisations/actions';
import {
  getCurrentOrgFp,
  getCurrentLmsGroupOrgFp,
  getCurrentOrgIdFp,
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
import OrganisationsDeleteWrapper from './OrganisationsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = string => string.trim().toLowerCase() !== 'delete';
const deleteConfirmUrl = id => `${URLS.orgDeleteUrl}/${id}/confirm`;

class OrganisationsDelete extends Component {
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
    const { history, idCurrentOrg } = this.props;
    if (idCurrentOrg >= 0) { history.push(`${URLS.orgEditUrl}/${idCurrentOrg}`); }
  };

  componentWillMount() {
    const { getCurrentOrg, idCurrentOrg } = this.props;
    getCurrentOrg(idCurrentOrg);
  }

  render() {
    const { inputValue } = this.state;
    const { currentOrg, deleteOrg, idCurrentOrg } = this.props;
    const { name } = currentOrg;

    return (
      <LayoutContent>
        <OrganisationsDeleteWrapper>
          <Banner title={<IntlMessages id="organisations.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="groupAdmin.deleteTitle" />
                {name}
              </div>
              <div className={b('text-message')}>
                <IntlMessages id="organisations.attentionMessage" />
                {`${name}.`}
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
                  className={btn('link', { 'disabled-link': deleteConfirm(inputValue) })}
                  to={deleteConfirmUrl(idCurrentOrg)}
                >
                  <button
                    className={btn('delete')}
                    disabled={deleteConfirm(inputValue)}
                    onClick={() => deleteOrg(idCurrentOrg)}
                  >
                    <IntlMessages id="organisations.deleteBtn" />
                  </button>
                </Link>
                <button
                  className={btn('cancel')}
                  onClick={this.clickCancel}
                >
                  <IntlMessages id="organisations.cancelBtn" />
                </button>
              </section>
            </section>
          </section>
        </OrganisationsDeleteWrapper>
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

export default connect(mapStateToProps, { ...orgActions })(OrganisationsDelete);
