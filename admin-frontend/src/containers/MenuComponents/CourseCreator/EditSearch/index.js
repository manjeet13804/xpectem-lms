import React from 'react';
import { IntlMessages } from 'components';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { MAIN_ROUTE } from '../../../../constants/routes';

const { editCourseCreators } = MAIN_ROUTE;

const EditSearchCourseCreator = ({
  history,
}) => {
  return (
    <GlobalSearch
      title={<IntlMessages id="courseCreators.editCourseCreator" />}
      titleForm={<IntlMessages id="courseCreators.findStudentsTitle" />}
      isOrganisation
      isGroup
      isCourseCreator
      onClickResultCourseCreator={(id) => history.push(`${editCourseCreators}/${id}`)}
    />
  );
};

export default EditSearchCourseCreator;
