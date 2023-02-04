import React from 'react';
import URLS from 'redux/urls';
import { connect } from 'react-redux';
import IntlMessages from 'components/utility/intlMessages';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import GlobalSearch from '../../../_search/GlobalSearch';

const AddRemoveGroup = ({
  history,
  currentGroupAdmin,
  editGroupAdmin,
  selectedGroups,
  match: { params: { administratorId } },
}) => {
  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      file,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
    } = currentGroupAdmin;

    const generateFormData = (formData, organisations, type) => {
      organisations.forEach((item, index) => {
        formData.append(`${type}[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', firstEmail);
    formData.append('phone[0]', firstTelephone);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);

    generateFormData(formData, selectedGroups, 'groups');

    if (file) {
      formData.append('file', file);
    }

    if (secondEmail) {
      formData.append('email[1]', secondEmail);
    }

    if (secondTelephone) {
      formData.append('phone[1]', secondTelephone);
    }

    const callBackForUpdate = () => history.push(`${URLS.groupAdminsEditUrl}/${administratorId}`);
    editGroupAdmin(formData, administratorId, callBackForUpdate);
  };

  return (
    <GlobalSearch
      titleForm={<IntlMessages id="groupAdmins.descriptionOrgToAdmin" />}
      title={<IntlMessages id="groupAdmins.addOrgBanner" />}
      isShowLmsGroup={false}
      isGroup
      isSelectedGroupsBlock
      onClickNextSelectedGroups={handleSubmit}
      history={history}
    />
  );
};

const mapStateToProps = state => ({
  ...state.groupAdministrators,
  ...state.searchGroup,
});

export default connect(mapStateToProps, {
  ...groupAdminsActions,
  ...searchGroupActions,
})(AddRemoveGroup);
