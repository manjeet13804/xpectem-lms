import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import { v4 as uuid } from 'uuid';
import studentsActions from 'redux/students/actions';
import taxonomyActions from 'redux/taxonomy/actions';
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
import _ from 'lodash';
import qs from 'qs';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  SelectOfNumber,
  StudentProfile,
  CourseItem,
  SearchSvg,
  CloseIcon,
  BannerNotification,
  SelectAllNone,
  DefaultButton,
  AddExistingStudentsModal,
} from 'components';
import StudentsAddWrapper from './StudentsAdd.style';
import { DATE_FORMATS, SIMPLE_DICTIONARY } from '../../../../constants/constants';

const { startDate } = SIMPLE_DICTIONARY;
const { yearMonthDay } = DATE_FORMATS;
const { courseSearchTitle } = PLACEHOLDER;

const titleBem = bemlds('title');
const page = bemlds('page');
const main = bemlds('main');
const course = bemlds('course');

class StudentsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      countStudents: 1,
      searchValue: '',
      isEmptyCourses: false,
      students: [uuid()],
      searchTimeout: null,
    };
    this.searchDebounce = _.debounce(this.props.searchCourseStudents, 300);
  }

  closeEmptyCoursesEror = () => {
    this.setState({ isEmptyCourses: false });
  };


  onClickSearchCourse = () => {
    const { searchValue, searchTimeout } = this.state;
    const { searchCourseStudents } = this.props;
    const query = _.pickBy({
      title: searchValue,
      isOnlyOrderable: true,
      isOnlyPublished: true,
    }, _.identity);

    clearTimeout(searchTimeout);
    this.setState({
      searchTimeout: setTimeout(() => {
        searchCourseStudents(qs.stringify(query));
      }, 500),
    });
  }

  onChange = ({ target: { name, value } }) => {
    const { chosenGroup } = this.props;
    const { searchTimeout } = this.state;
    clearTimeout(searchTimeout);
    this.setState({
      [name]: value,
    });

    const groupIds = chosenGroup.map(item => item.id);
    const query = _.pickBy({
      title: value.trim(),
      groupIds,
      isOnlyOrderable: true,
      isOnlyPublished: true,
    }, _.identity);

    this.searchDebounce(qs.stringify(query));
  };

  // This function changes the number of students when changing the value of the student select
  handleNumberSave = (value) => {
    const { students } = this.state;
    const numbersOfNewStudents = value - students.length;
    if (numbersOfNewStudents >= 0) {
      const newStudents = new Array(numbersOfNewStudents).fill(0).map(() => uuid());
      this.setState({
        countStudents: value,
        students: [...students, ...newStudents],
      });
      return;
    }
    const newStudents = students.slice(0, value);
    this.setState({
      countStudents: value,
      students: newStudents,
    });
  };

  changeCheckbox = (value, name, indexStudent) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name, indexStudent);
  };

  addInputFirstName = (value, indexStudent) => {
    const { addInputFirstName } = this.props;
    addInputFirstName(value, indexStudent);
  };

  addInputLastName = (value, indexStudent) => {
    const { addInputLastName } = this.props;
    addInputLastName(value, indexStudent);
  };

  changeTaxonomyData = (value, indexStudent) => {
    const { updateTaxonomyData } = this.props;
    updateTaxonomyData(value, indexStudent);
  }

  addInputEmail = (firstEmail, secondEmail, indexStudent) => {
    const { addInputEmail } = this.props;
    addInputEmail(firstEmail, secondEmail, indexStudent);
  };

  addInputPhone = (name, value, indexStudent) => {
    const { addInputPhone } = this.props;
    addInputPhone(name, value, indexStudent);
  };

  addInputLang = (value, indexStudent) => {
    const { addInputLang } = this.props;
    addInputLang(value, indexStudent);
  };

  addErrorStatusToStudent = (isError, indexStudent) => {
    const { addErrorStatus } = this.props;
    addErrorStatus(isError, indexStudent);
  }

  handleSaveDate = (id, date, name) => {
    const { addDate } = this.props;
    addDate(id, date, name);
  };

  handleChangeAddress = (value, indexStudent) => {
    const { addStudentStreet } = this.props;
    addStudentStreet(value, indexStudent);
  }

  handleAddStudents = () => {
    const {
      currentStudents,
      chosenGroup,
      addStudents,
      addUnfilledFields,
      selectedCoursesForStudents,
      hasPhysical,
    } = this.props;

    const findUnfilledFields = currentStudents.map((item, i) => {
      const {
        firstName,
        lastName,
        emails,
        streetAddress,
      } = item;
      const unfilledFields = Object.entries({
        firstName,
        lastName,
        firstEmail: _.get(emails, '0', ''),
        ...(hasPhysical ? { streetAddress } : {}),
      }).map(field => (!field[1] ? field[0] : null)).filter(Boolean);

      if (unfilledFields.length) {
        return {
          studentIndex: i,
          unfilledFields,
        };
      }
      return null;
    }).filter(Boolean);

    if (findUnfilledFields.length) {
      addUnfilledFields(findUnfilledFields);

      return null;
    }

    const findErrors = currentStudents.find(student => student.isError);
    if (findErrors) {
      return null;
    }
    const newCurrentStudents = currentStudents
      .map((item) => {
        if (!item.notifyEmail) { return { ...item, notifyEmail: false }; }
        return item;
      })
      .map((item) => {
        if (!item.notifySms) { return { ...item, notifySms: false }; }
        return item;
      })
      .map(item => Object.entries(item).reduce((acc, fields) => {
        if (fields[0] === 'isError' || fields[0] === 'unfilledFields') {
          return acc;
        }

        if (fields[0] === 'phones') {
          const nonEmptyPhones = fields[1].filter(Boolean);
          if (!nonEmptyPhones.length) {
            return acc;
          }
        }

        if ((fields[0] === 'employeeNumber' || fields[0] === 'personNumber') && !fields[1]) {
          return acc;
        }

        return {
          ...acc,
          [fields[0]]: fields[1],
        };
      }, {}));

    const newChosenCourses = selectedCoursesForStudents
      .map(({ id, dateBegin }) => {
        if (!dateBegin) { return { courseId: id }; }
        return {
          courseId: id,
          dateBegin,
        };
      });
    if (!newChosenCourses.length) {
      this.setState({ isEmptyCourses: true });
      return null;
    }

    const newChosenGroup = chosenGroup.map(({ id }) => id);

    const body = {
      students: [...newCurrentStudents],
      courses: [...newChosenCourses],
      groups: [...newChosenGroup],
    };

    addStudents(body);
  };

  componentDidMount = () => {
    const {
      chosenGroup,
      history,
      fetchTaxonomy,
    } = this.props;

    const [group] = chosenGroup;
    if (!chosenGroup.length) { history.push(`${URLS.studentsAddUrl}`); }
    if (group) { fetchTaxonomy({ groupId: group.id }); }
  }

  componentWillUnmount = () => {
    const { clearStudentsStore } = this.props;
    clearStudentsStore();
  }

  clearStudents = () => {
    this.setState(() => ({
      countStudents: 1,
      searchValue: '',
      isEmptyCourses: false,
      students: [uuid()],
      searchTimeout: null,
    }));
  }

  clearFunc = () => {
    const { closeSuccessAddStudents } = this.props;
    closeSuccessAddStudents();
    this.clearStudents();
  }

  deleteStudent = (index) => {
    const { students } = this.state;
    const { deleteStudentFromList } = this.props;
    const rebuildedStudents = students
      .filter((item, i) => i !== index);
    this.setState({
      students: rebuildedStudents,
      countStudents: rebuildedStudents.length,
    });
    deleteStudentFromList(index);
  }

  render() {
    const {
      searchValue,
      isEmptyCourses,
      students,
      countStudents,
    } = this.state;

    const {
      searchCoursesData,
      setCurrentCourseStudents,
      chosenGroup,
      isAddedStudents,
      currentStudents,
      addUnfilledFields,
      selectedCoursesForStudents,
      hasPhysical,
      currentNameLmsGroup,
      searchOrgData,
      selectNoneCourses,
      selectAllCourses,
      taxonomies,
    } = this.props;

    const rebuildedSearchedOrgs = searchOrgData.map(item => item.text).join('');
    const rebuildedSelectedGroups = chosenGroup.map(item => item.text).join(', ');
    const affilationsArray = [currentNameLmsGroup, rebuildedSearchedOrgs, rebuildedSelectedGroups].filter(Boolean);
    const affilationName = affilationsArray.join(' - ');
    const isOneStudent = students.length === 1;
    return (
      <LayoutContent>
        <StudentsAddWrapper>
          <Banner title={<IntlMessages id="students.addBannerToCourse" />} />
          {isEmptyCourses && (
            <BannerNotification
              error
              isScrollMount
              title={<IntlMessages id="students.noCourses" />}
              close={this.closeEmptyCoursesEror}
            />
          )}
          {isAddedStudents && (
            <BannerNotification
              error={false}
              isScrollMount
              title={<IntlMessages id="students.addedSuccess" />}
              close={this.clearFunc}
            />
          )}
          <section className={titleBem()}>
            <div className={titleBem('item')}>
              <IntlMessages id="students.addTitle" />
              {affilationName}
            </div>
            <div className={titleBem('item')}>
              <IntlMessages id="students.chooseNumberTitle" />
            </div>
            <div className={titleBem('item')}>
              <IntlMessages id="students.chooseCourseTitle" />
            </div>
          </section>
          <section className={page()}>
            <section className={page('left')}>
              <div className={main('title')}>
                <IntlMessages id="students.studentsTitle" />
              </div>
              <SelectOfNumber
                handleDataSave={this.handleNumberSave}
                value={countStudents}
              />
              <div className={main('students')}>
                {students.map((id, index) => (
                  <StudentProfile
                    hasPhysical={hasPhysical}
                    key={id}
                    indexStudent={index}
                    ref={this.myRef}
                    currentStudents={currentStudents}
                    taxonomies={taxonomies}
                    addInputFirstName={this.addInputFirstName}
                    addInputLastName={this.addInputLastName}
                    addInputEmployeeNumber={this.addInputEmployeeNumber}
                    addInputPersonNumber={this.addInputPersonNumber}
                    addInputEmail={this.addInputEmail}
                    addInputPhone={this.addInputPhone}
                    addInputLang={this.addInputLang}
                    changeTaxonomyData={this.changeTaxonomyData}
                    changeCheckbox={this.changeCheckbox}
                    addUnfilledFields={addUnfilledFields}
                    handleChangeAddress={this.handleChangeAddress}
                    addErrorStatusToStudent={this.addErrorStatusToStudent}
                    deleteStudent={this.deleteStudent}
                    isOneStudent={isOneStudent}
                  />
                ))}
              </div>
            </section>
            <section className={page('right')}>
              <div className={main('title')}>
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
                  onChange={this.onChange}
                  onClick={this.onClickSearchCourse}
                />
              </div>
              <div className={course('select-all')}>
                {Boolean(searchCoursesData.length) && <SelectAllNone onSelectAll={selectAllCourses} onSelectNone={selectNoneCourses} />}
              </div>
              {searchCoursesData && searchCoursesData.map(item => (
                <CourseItem
                  key={item.id}
                  item={item}
                  handleSaveDate={this.handleSaveDate}
                  onChangeCheckbox={() => setCurrentCourseStudents(item.id)}
                />
              ))}
              <div className={course('button')}>
                <DefaultButton
                  textId="students.addButton"
                  onClick={this.handleAddStudents}
                />
              </div>
            </section>
          </section>
        </StudentsAddWrapper>
        <AddExistingStudentsModal />
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const searchLmsGroupsData = getSearchLmsGroupsStudentsFp(state);
  const searchGroupData = getSearchGroupStudentsFp(state);
  const currentLmsGroupId = state.searchLmsGroup.selectedLmsGroupId;
  const currentOrgId = getCurrentOrgIdStudentsFp(state);
  const currentOrgName = getCurrentOrgNameStudentsFp(state);
  const searchCoursesData = getSearchCoursesFp(state);
  const chosenCourses = getChosenCoursesStudentsFp(state);
  const currentStudents = getCurrentStudentsFp(state);
  const chosenGroup = state.searchGroup.selectedGroups;
  const isAddedStudents = getAddedStatusStudentFp(state);
  const selectedCoursesForStudents = state.students.selectedCourses;
  const hasPhysical = state.students.hasPhysicalCourse;
  const searchOrgData = state.searchOrganisations.selectedOrganisations;
  const currentNameLmsGroup = state.searchLmsGroup.selectedLmsGroupName;
  const { user } = state.Auth;
  const { taxonomies } = state.taxonomy;

  return {
    searchLmsGroupsData,
    searchOrgData,
    searchGroupData,
    currentLmsGroupId,
    currentNameLmsGroup,
    currentOrgId,
    currentOrgName,
    searchCoursesData,
    chosenCourses,
    currentStudents,
    chosenGroup,
    isAddedStudents,
    selectedCoursesForStudents,
    hasPhysical,
    user,
    taxonomies,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
    ...taxonomyActions,
  },
)(StudentsAdd);
