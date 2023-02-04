import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import courseCreatorActions from 'redux/courseCreator/actions';
import courseActions from 'redux/courses/actions';
import studentActions from 'redux/students/actions';
import URLS from 'redux/urls';
import GlobalSearch from 'containers/_search/GlobalSearch';
import { REPORT_TYPE } from 'constants/constants';
import ReportCreateWrapper from './createReport.style';

const CreateReport = ({
  selectCourseReportID,
  selectStudentReportID,
  clearStudentsStore,
  history,
}) => {
  const [currStudent, setCurrStudent] = useState();
  const handleSelectUser = ({ id }) => {
    selectStudentReportID(id);
    selectCourseReportID(REPORT_TYPE.totalReport);
    history.push(URLS.report);
  };
  useEffect(() => {
    clearStudentsStore();
  }, []);

  return (
    <LayoutContent>
      <ReportCreateWrapper>
        <GlobalSearch
          titleForm={<IntlMessages id='report.title' />}
          title={<IntlMessages id='reports.bannerCreate' />}
          report
          searchCourses
          isShowLmsGroup
          setCurrStudent={setCurrStudent}
          isOrganisation
          isStudent
          isStudentGroup
          isSelectedGroupsBlock
          onClickResultStudent={handleSelectUser}
          currStudent={currStudent}
          onClickNextSelectedGroups={() => {
            history.push(URLS.report);
          }}
          history={history}
        />
      </ReportCreateWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = ({ searchGroup: { selectedGroups } }) => ({
  selectedGroups,
});

export default connect(mapStateToProps, {
  ...courseCreatorActions,
  ...courseActions,
  ...studentActions,
})(CreateReport);
