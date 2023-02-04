import React, { useState, useEffect } from 'react';
import IntlMessages from 'components/utility/intlMessages';
import moment from 'moment';
import { bemlds } from 'utils';
import {
  CourseItem,
  SearchSvg,
  CloseIcon,
  SelectAllNone,
  DefaultButton,
} from 'components';
import _ from 'lodash';
import qs from 'qs';
import {
  PLACEHOLDER,
  SIMPLE_DICTIONARY,
  DATE_FORMATS,
} from 'constants/constants';
import studentsActions from 'redux/students/actions';
import { connect } from 'react-redux';
import {
  getSearchLmsGroupsStudentsFp,
  getSearchGroupStudentsFp,
  getCurrentOrgIdStudentsFp,
  getCurrentOrgNameStudentsFp,
  getSearchCoursesFp,
  getChosenCoursesStudentsFp,
  getCurrentStudentsFp,
  getAddedStatusStudentFp,
} from 'selectors';
import PropTypes from 'prop-types';
import SearchCourseWrapper from './SearchCourse.style';

const propTypes = {
  searchCoursesData: PropTypes.arr,
  searchCourseStudents: PropTypes.func,
  selectAllCourses: PropTypes.func,
  selectNoneCourses: PropTypes.func,
  selectedCoursesForStudents: PropTypes.arr,
  setCurrentCourseStudents: PropTypes.func,
  chosenGroup: PropTypes.arr,
  handleAddCourse: PropTypes.func,
};

const defaultProps = {
  searchCoursesData: [],
  searchCourseStudents: () => null,
  selectAllCourses: () => null,
  selectNoneCourses: () => null,
  selectedCoursesForStudents: [],
  setCurrentCourseStudents: () => null,
  chosenGroup: [],
  handleAddCourse: () => null,
};

const { startDate } = SIMPLE_DICTIONARY;
const { courseSearchTitle } = PLACEHOLDER;
const { yearMonthDay } = DATE_FORMATS;

const course = bemlds('course');

const SearchCourse = (props) => {
  const {
    searchCoursesData,
    searchCourseStudents,
    selectAllCourses,
    selectNoneCourses,
    selectedCoursesForStudents,
    setCurrentCourseStudents,
    chosenGroup,
    handleAddCourse,
  } = props;

  const [searchTimeout, setSearchTimeout] = useState();
  const [searchValue, setSearchValue] = useState();

  const handleChange = ({ target: { value } }) => {
    clearTimeout(searchTimeout);
    setSearchValue(value);

    const groupIds = chosenGroup.map(item => item.id);
    const query = _.pickBy({
      title: value.trim(),
      groupIds,
    }, _.identity);
    const searchDebounce = _.debounce(searchCourseStudents, 300);
    searchDebounce(qs.stringify(query));
  };

  const handleClickSearchCourse = () => {
    const query = _.pickBy({
      title: searchValue,
    }, _.identity);

    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        searchCourseStudents(qs.stringify(query));
      }, 500),
    );
  };

  useEffect(() => () => {
    selectNoneCourses();
  }, []);

  return (
    <SearchCourseWrapper>
      <section>
        <div className={course('header')}>
          <IntlMessages id="students.coursesTitle" />
        </div>
        <div className={course('title')}>
          <div className={course('title-select')}>
            <IntlMessages id="students.courseSelectTitle" />
          </div>
          <div className={course('title-search')}>
            <IntlMessages id="students.courseSearchTitle" />
          </div>
        </div>

        {Boolean(selectedCoursesForStudents.length) && (
        <div className={course('selected')}>
          <div className={course('selected-title')}>
            <IntlMessages id="course.selectedCourses" />
          </div>
          <div className={course('selected-text')}>
            <IntlMessages id="course.searchOtherCoures" />
          </div>
          <div className={course('selected-block')}>
            {selectedCoursesForStudents.map(({ id, title, dateBegin }) => (
              <div
                key={id}
                role="button"
                tabIndex="0"
                onClick={() => setCurrentCourseStudents(id)}
                className={course('selected-item')}
              >
                <div className={course('selected-item-text')}>
                  {`${title} - ${startDate}: ${moment(dateBegin).format(yearMonthDay)}`}
                </div>
                <CloseIcon className={course('selected-item-icon')} />
              </div>
            ))}
          </div>
        </div>
        )}

        <div className={course('search-title')}>
          <IntlMessages id="students.searchTitle" />
        </div>
        <div className={course('search')}>
          <SearchSvg />
          <input
            className={course('search-input')}
            type="text"
            value={searchValue}
            name="searchValue"
            placeholder={courseSearchTitle}
            onChange={handleChange}
            onClick={handleClickSearchCourse}
          />
        </div>
        <div className={course('select-all')}>
          {Boolean(searchCoursesData.length) && <SelectAllNone onSelectAll={selectAllCourses} onSelectNone={selectNoneCourses} />}
        </div>
        {searchCoursesData && searchCoursesData.map(item => (
          <CourseItem
            key={item.id}
            item={item}
            isHideDate
            onChangeCheckbox={() => setCurrentCourseStudents(item.id)}
          />
        ))}
        <div className={course('button')}>
          <DefaultButton
            disabled={!selectedCoursesForStudents.length}
            textId="students.addCourseButton"
            onClick={() => handleAddCourse(selectedCoursesForStudents)}
          />
        </div>
      </section>
    </SearchCourseWrapper>
  );
};

SearchCourse.propTypes = propTypes;
SearchCourse.defaultProps = defaultProps;

const mapStateToProps = state => ({
  searchLmsGroupsData: getSearchLmsGroupsStudentsFp(state),
  searchGroupData: getSearchGroupStudentsFp(state),
  currentOrgId: getCurrentOrgIdStudentsFp(state),
  currentOrgName: getCurrentOrgNameStudentsFp(state),
  searchCoursesData: getSearchCoursesFp(state),
  chosenCourses: getChosenCoursesStudentsFp(state),
  currentStudents: getCurrentStudentsFp(state),
  isAddedStudents: getAddedStatusStudentFp(state),
  chosenGroup: state.searchGroup.selectedGroups,
  currentLmsGroupId: state.searchLmsGroup.selectedLmsGroupId,
  searchOrgData: state.searchOrganisations.selectedOrganisations,
  selectedCoursesForStudents: state.students.selectedCourses,
  hasPhysical: state.students.hasPhysicalCourse,
});

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(SearchCourse);
