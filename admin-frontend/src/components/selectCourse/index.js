import React, {useState} from 'react';
import { CustomSelect } from 'components';
import getCoursesGroupList from 'redux/courses/actions';
import selectCourseReportID from 'redux/courses/actions';
import { connect } from 'react-redux';
import { bemlds } from 'utils';
import { INPUTS_COURSE_TYPE } from '../../constants/inputs';
import './styles.scss';

const defaultProps = {
  groups: [],
  selectedCourseGroup: [],
};

const b = bemlds('search-group');

const SelectCourse = ({
  getCoursesGroupList,
  description,
  groups, selectedCourseGroup,
  selectCourseReportID
}) => {
  const [selectedCourse, setSelectedCourse] = useState();
  const handleSelectChanges = (value) => {
    setSelectedCourse(value);
    selectCourseReportID(value);
  };
  return (
    <div className="custom-select-wrapper">
      { selectedCourseGroup && ( 
      <div>
        <p className={b('description')}>
          {description}
        </p>
        <CustomSelect
          width="100%"
          options={INPUTS_COURSE_TYPE}
          handleChange={handleSelectChanges}
          value={selectedCourse}
        />
      </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedCourseGroup: state.courses.selectedCourseGroupList,
  };
};


SelectCourse.defaultProps = defaultProps;
export default connect(mapStateToProps, {
  ...getCoursesGroupList,
  ...selectCourseReportID,
})(SelectCourse);
