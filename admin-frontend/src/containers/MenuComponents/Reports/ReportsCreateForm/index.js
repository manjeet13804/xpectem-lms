import React, { useEffect } from 'react';
import { bemlds } from 'utils';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import courseCreatorActions from 'redux/courseCreator/actions';
import coursesAction from 'redux/courses/actions';
import { connect } from 'react-redux';
import { DATE_FORMATS, REPORT_TYPE } from 'constants/constants';
import _ from 'lodash';
import moment from 'moment';
import {
  Banner,
  DefaultButton,
} from 'components';
import {
  columnNameTotal,
  columnNameStudyResult,
  columnKeyNameTotal,
  columnKeyNameStudyResult,
} from './table';
import ReportsCreateFormWrapper from './ReportsCreateFormWrapper.style';

const b = bemlds('table-report');

const switchTemplate = (type, selectedCourseGroupList) => {
  switch (type) {
    case (REPORT_TYPE.totalReport):
      const taxonomy = selectedCourseGroupList && selectedCourseGroupList.taxonomy && selectedCourseGroupList.taxonomy.map(i => ` ${i.title}`);
      const columnWithTaxonomy = taxonomy && [...columnNameTotal, ...taxonomy];
      return columnWithTaxonomy || [];
    case (REPORT_TYPE.perCourse):
      return columnNameStudyResult;
    default:
      return [];
  }
};
const ReportsCreateForm = (props) => {
  const {
    getCoursesGroupList,
    selectedGroups,
    selectedCourseGroupList,
    selectedReportType,
    selectedReportStudent,
    selectCourseReportID,
    selectStudentReportID,
    selectedCourses,
    clearAllCourse,
  } = props;

  const getTableDataKey = ({ type, taxonomy, additionalData }) => {
    switch (type) {
      case (2):
        return taxonomy ? [...columnKeyNameTotal, ...Object.keys(taxonomy)] : columnKeyNameTotal;
      case (3):
        return columnKeyNameStudyResult;
      default:
        return [...Object.keys(additionalData)];
    }
  };

  useEffect(() => {
    const groupsIds = selectedGroups.map(i => i.id);
    const coursesIds = selectedCourses.map(i => i.id);
    getCoursesGroupList({
      groupId: `[${groupsIds}]`,
      type: selectedReportType,
      studentId: selectedReportStudent,
      courseId: `[${coursesIds}]`,
    });
    return () => {
      selectStudentReportID(null);
      selectCourseReportID(null);
      clearAllCourse();
    };
  }, [
    selectedGroups,
    selectedReportStudent,
    selectedReportType,
    selectedCourses,
    columnNameStudyResult,
  ]);

  const downloadTemplateFile = () => {
    const { getCoureseReportFile } = props;
    const groupsIds = selectedGroups.map(i => i.id);
    const coursesIds = selectedCourses.map(i => i.id);
    getCoureseReportFile({
      groupId: `[${groupsIds}]`,
      type: selectedReportType,
      studentId: selectedReportStudent,
      courseId: `[${coursesIds}]`,
    });
  };
  const isGroupList = selectedCourseGroupList && selectedCourseGroupList.resultCourse;
  return (
    <ReportsCreateFormWrapper>
      <LayoutContent>
        <Banner title={<IntlMessages id="reports.bannerCreate" />} />
        <div className={b('table')}>
          <div className={b('header')}>
            {selectedReportType && switchTemplate(selectedReportType, selectedCourseGroupList).map((item, index) => (<div key={index} className={b('column')}>{item}</div>))}
          </div>
          {isGroupList && selectedCourseGroupList.resultCourse.map((item, index) => {
            const startAt = moment(item.start_at).format(DATE_FORMATS.tableYearMonthDay);
            const doneAt = item.done_at ? moment(item.done_at).format(DATE_FORMATS.tableYearMonthDay) : '-';
            const taxonomy = selectedCourseGroupList && selectedCourseGroupList.taxonomy && selectedCourseGroupList.taxonomy.map((i, index) => [`+${index}`, `${i.format}`]);
            const newItem = taxonomy ? {
              ...item,
              start_at: startAt,
              done_at: doneAt,
              ...Object.fromEntries(taxonomy),
            } : item;
            const keys = getTableDataKey({ type: selectedReportType, taxonomy, additionalData: newItem });
            return (
              <div key={index} className={b('row')}>
                {keys.map((key, i) => <div key={i} className={b('column')}>{_.isNil(newItem[key]) ? '-' : newItem[key]}</div>)}
              </div>
            );
          })}
        </div>
        {selectedCourseGroupList && (
          <div className={b('import-status')}>
            <div className={b('download-btn')}>
              <DefaultButton
                className={b('download-btn-text')}
                textId="reports.downloadreport"
                onClick={downloadTemplateFile}
              />
            </div>
          </div>
        )}
      </LayoutContent>
    </ReportsCreateFormWrapper>
  );
};
const mapStateToProps = ({
  courses: {
    selectedReportType, selectedCourseGroupList, selectedReportStudent, selectedCourses,
  }, searchGroup: { selectedGroups },
}) => ({
  selectedGroups,
  selectedReportType,
  selectedCourseGroupList,
  selectedReportStudent,
  selectedCourses,
});
export default connect(mapStateToProps,
  {
    ...courseCreatorActions,
    ...coursesAction,

  })(ReportsCreateForm);
