import React from 'react';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import IntlMessages from 'components/utility/intlMessages';
import { MAIN_ROUTE } from '../../../../constants/routes';

const { createCourseCreators } = MAIN_ROUTE;
const FindGroups = ({ history, ...rest }) => (
  <GlobalSearch
    titleForm={<IntlMessages id="courseCreators.findToAdd" />}
    title={<IntlMessages id="courseCreators.addCourseCreator" />}
    isOrganisation
    isGroup
    isSelectedGroupsBlock
    onClickNextSelectedGroups={() => {
      history.push(createCourseCreators);
    }}
    history={history}
    {...rest}
  />
);

export default connect(
  () => {},
  {
    ...studentsActions,
  },
)(FindGroups);
