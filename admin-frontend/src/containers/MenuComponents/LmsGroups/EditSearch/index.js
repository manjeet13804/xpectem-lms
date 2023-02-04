import React from 'react';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { IntlMessages } from 'components';
import URLS from 'redux/urls';

const EditSearchLmsGroup = ({
  history,
}) => (
  <GlobalSearch
    titleForm={<IntlMessages id="lmsGroups.findTitle" />}
    title={<IntlMessages id="lmsGroups.editBanner" />}
    onClickResultLmsGroup={(id) => history.push(`${URLS.lmsGroupsEditUrl}/${id}`)}
  />
)

export default EditSearchLmsGroup;
