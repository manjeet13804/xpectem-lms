import React from 'react';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { IntlMessages } from 'components';
import URLS from 'redux/urls';

const AddSearchOrganisation = ({
  history,
}) => (
  <GlobalSearch
    titleForm={<IntlMessages id="organisations.findGroupsTitle" />}
    title={<IntlMessages id="organisations.addBanner" />}
    onClickResultLmsGroup={(id) => history.push(`${URLS.orgAddUrl}/${id}`)}
  />
);


export default AddSearchOrganisation;
