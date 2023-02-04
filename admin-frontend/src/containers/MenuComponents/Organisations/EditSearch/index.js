import React from 'react';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { IntlMessages } from 'components';
import URLS from 'redux/urls';

const EditSearchOrganisation = ({
   history,
 }) => (
  <GlobalSearch
    titleForm={<IntlMessages id="organisations.findToEdit" />}
    title={<IntlMessages id="organisations.editBanner" />}
    onClickResultOrganisation={(id) => history.push(`${URLS.orgEditUrl}/${id}`)}
    isOrganisation
  />
);


export default EditSearchOrganisation;
