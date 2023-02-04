import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import groupsActions from 'redux/groups/actions';
import {
  getCurrentGroupFp,
  getCurrentGroupIdGroupsFp,
  getSearchOrgDataGroupsFp,
  getStatusEditGroupFp,
  getCurrentNameLmsGroupGroupsFp,
  getCurrentOrgNameGroupsFp,
  getCurrentLmsGroupIdGroupsFp,
} from 'selectors';

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
import GroupsDeleteWrapper from './GroupsDelete.style';

const { confirmDelete } = PLACEHOLDER;
const { getDeleteId } = REGEXP;

const b = bemlds('delete-block');
const btn = bemlds('button');

const deleteConfirm = string => string.trim().toLowerCase() !== 'delete';
const deleteConfirmUrl = id => `${URLS.groupsDelete}/${id}/confirm`;

class GroupsDelete extends Component {
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
    const { history, idCurrentGroup } = this.props;
    if (idCurrentGroup >= 0) {
      history.push(`${URLS.groupsEdit}/${idCurrentGroup}`);
    }
  };

  componentWillMount() {
    const { getCurrentGroup, idCurrentGroup } = this.props;
    getCurrentGroup(idCurrentGroup);
  }

  render() {
    const { inputValue } = this.state;
    const {
      currentGroup: { name } = {},
      idCurrentGroup,
      deleteGroup,
    } = this.props;


    return (
      <LayoutContent>
        <GroupsDeleteWrapper>
          <Banner title={<IntlMessages id="groups.deleteBanner" />} />
          <section className={b()}>
            <DeleteAttentionSvg />
            <section className={b('text')}>
              <div className={b('text-title')}>
                <IntlMessages id="groups.deleteTitle" />
                {` ${name && name}`}
              </div>
              <div className={b('text-message')}>
                <IntlMessages
                  values={{
                    groupName: name,
                  }}
                  id="groups.deleteAttention"
                />
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
                  className={btn('link', { 'disabled-link': deleteConfirm(inputValue) })}
                  to={deleteConfirmUrl(idCurrentGroup)}
                >
                  <div className={btn('cancel')}>
                    <DefaultButton
                      textId="groups.deleteBtn"
                      isDelete
                      disabled={deleteConfirm(inputValue)}
                      onClick={() => deleteGroup(idCurrentGroup)}
                    />
                  </div>
                </Link>
                <DefaultButton
                  textId="groups.cancelBtn"
                  onClick={this.clickCancel}
                />
              </section>
            </section>
          </section>
        </GroupsDeleteWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentGroup = getCurrentGroupFp(state);
  const searchOrgData = getSearchOrgDataGroupsFp(state);
  const currentNameLmsGroup = getCurrentNameLmsGroupGroupsFp(state);
  const currentOrgName = getCurrentOrgNameGroupsFp(state);
  const currentGroupId = getCurrentGroupIdGroupsFp(state);
  const isEditGroup = getStatusEditGroupFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdGroupsFp(state);
  const { pathname } = location;
  const lmsGroupName = state.searchLmsGroup.selectedLmsGroupName;

  const res = pathname && pathname.match(getDeleteId);
  const idCurrentGroup = currentGroupId || res[1];

  return {
    currentGroup,
    searchOrgData,
    idCurrentGroup,
    currentNameLmsGroup,
    currentOrgName,
    isEditGroup,
    currentLmsGroupId,
    lmsGroupName,
  };
};

export default connect(mapStateToProps, { ...groupsActions })(GroupsDelete);
