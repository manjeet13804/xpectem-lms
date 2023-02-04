import React from 'react';
import URLS from 'redux/urls';
import { connect } from 'react-redux';
import IntlMessages from 'components/utility/intlMessages';
import orgAdminsActions from 'redux/orgAdministrators/actions';
import searchOrgActions from 'redux/searchOrganisations/actions';
import GlobalSearch from '../../../_search/GlobalSearch';

const AddOrganisations = ({
  history,
  currentOrgAdmin,
  selectedOrganisations,
  editOrgAdmin,
  match: { params: { administratorId } },
}) => {
  const handleSubmit = () => {
    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
    } = currentOrgAdmin;

    const generateFormData = (formData, organisations) => {
      organisations.forEach((item, index) => {
        formData.append(`organisations[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', firstEmail);
    formData.append('phone[0]', firstTelephone);
    generateFormData(formData, selectedOrganisations);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);


    if (secondEmail) {
      formData.append('email[1]', secondEmail);
    }

    if (secondTelephone) {
      formData.append('phone[1]', secondTelephone);
    }

    editOrgAdmin(formData, administratorId);
    history.push(`${URLS.orgAdminEdit}/${administratorId}`);
  };

  return (
    <GlobalSearch
      titleForm={<IntlMessages id="orgAdmins.descriptionOrgToAdmin" />}
      title={<IntlMessages id="organisationsAdd.addOrgBanner" />}
      isShowLmsGroup={false}
      isOrganisation
      isSelectedOrganisationsBlock
      onClickNextSelectedOrganisations={handleSubmit}
      history={history}
    />
  );
};

const mapStateToProps = state => ({
  ...state.orgAdmins,
  ...state.searchOrganisations,
  ...state.searchLmsGroup,
});

export default connect(mapStateToProps, {
  ...orgAdminsActions,
  ...searchOrgActions,
})(AddOrganisations);
