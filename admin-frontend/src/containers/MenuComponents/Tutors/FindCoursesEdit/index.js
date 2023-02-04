import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import qs from 'qs';
import tutorsAction from 'redux/tutors/actions';
import {
  getChosenCoursesEditTutorsFp,
  getSearchCourseDataTutorsEditFp,
  getTutorId,
  getCurrentFindCourseTutorsFp,
} from 'selectors';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  PLACEHOLDER,
} from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  SearchSvg,
  CloseIcon,
  CourseItem,
} from 'components';
import FindCoursesTutorsWrapper from './findCoursesEdit.style';

const defaultProps = {
  searchCourseTutorsEdit: null,
  searchCourseDataEdit: [],
  setCurrentFindCourseTutorsEdit: null,
  currentFindCourse: {
    id: null,
    title: '',
  },
  addDateCourseTutors: null,
  chosenCoursesEdit: [],
  currentTutorId: false,
};

const propTypes = {
  searchCourseTutorsEdit: PropTypes.func,
  searchCourseDataEdit: PropTypes.arrayOf(PropTypes.object),
  setCurrentFindCourseTutorsEdit: PropTypes.func,
  currentFindCourse: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  addDateCourseTutors: PropTypes.func,
  chosenCoursesEdit: PropTypes.arrayOf(PropTypes.object),
  currentTutorId: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
};

const page = bemlds('page');
const group = bemlds('group');
const main = bemlds('main');

const { tutorsSearchCourses } = PLACEHOLDER;

const urlCurrentTutor = id => `${URLS.tutorsEdit}/${id}`;

class FindCoursesTutorsEdit extends PureComponent {
  constructor(props) {
    super(props);
    const {
      searchCourseTutorsEdit,
    } = props;

    this.state = {
      searchCourseValue: '',
    };
    this.searchCourseDebounce = _.debounce(searchCourseTutorsEdit, 350);
  }

  onChangeCourse = ({ target: { name, value } }) => {
    this.setState({
      [name]: value.trim(),
    });

    const query = _.pickBy({
      title: value.trim(),
    }, _.identity);

    this.searchCourseDebounce(qs.stringify(query));
  };

  getCourseByTitle = () => {
    const { searchCourseTutorsEdit } = this.props;
    const { searchCourseValue } = this.state;
    const query = _.pickBy({
      title: searchCourseValue,
    }, _.identity);

    searchCourseTutorsEdit(qs.stringify(query));
  };

  handleSaveDate = (id, date, name) => {
    const { addDateCourseTutors } = this.props;
    addDateCourseTutors(id, date, name);
  };

  render() {
    const { searchCourseValue } = this.state;

    const {
      searchCourseDataEdit,
      setCurrentFindCourseTutorsEdit,
      currentFindCourse: {
        id: currentFindCourseId,
      },
      chosenCoursesEdit,
      currentTutorId,
    } = this.props;

    return (
      <LayoutContent>
        <FindCoursesTutorsWrapper>
          <Banner title={<IntlMessages id="tutors.editBanner" />} />
          <section className={page()}>
            <section className={page('left')}>
              <div className={group()}>
                <div className={group('title')}>
                  <IntlMessages id="tutors.editCourses" />
                </div>
                <div className={group('search-title')}>
                  <IntlMessages id="courses.searchForCourse" />
                </div>
                <div className={group('search')}>
                  <SearchSvg />
                  <input
                    className={group('search-input')}
                    type="text"
                    value={searchCourseValue}
                    name="searchCourseValue"
                    placeholder={tutorsSearchCourses}
                    onChange={this.onChangeCourse}
                  />
                </div>
                {searchCourseDataEdit.length > 0 && (
                  <div className={group('search-block')}>
                    {(
                      searchCourseDataEdit.map(({ id, title }) => (
                        <div
                          role="button"
                          tabIndex="-1"
                          className={group('search-block-item', { active: id === currentFindCourseId })}
                          key={id}
                          onClick={() => setCurrentFindCourseTutorsEdit(id, title)}
                        >
                          {title}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </section>
            <section className={page('right')}>
              {searchCourseDataEdit.length > 0 && (
                <div className={main('course-title')}>
                  <IntlMessages id="students.searchTitle" />
                </div>
              )}
              {searchCourseDataEdit.map(item => (
                <CourseItem
                  key={item.id}
                  item={item}
                  handleSaveDate={this.handleSaveDate}
                  onChangeCheckbox={() => setCurrentFindCourseTutorsEdit(item.id, item.title)}
                />
              ))}
              {searchCourseDataEdit.length > 0 && (
                <div className={main('selected')}>
                  <div className={main('selected-title')}>
                    <IntlMessages id="course.selectedTitle" />
                  </div>
                  <div className={main('selected-block')}>
                    {chosenCoursesEdit.map(({ id, title }) => (
                      <div
                        key={id}
                        role="button"
                        tabIndex="-1"
                        onClick={() => setCurrentFindCourseTutorsEdit(id, title)}
                        className={main('selected-item')}
                      >
                        <div className={main('selected-item-text')}>
                          {title}
                        </div>
                        <CloseIcon className={main('selected-item-icon')} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {searchCourseDataEdit.length > 0 && (
                <div className={main('button')}>
                  <Link
                    className={main('button-link', { disabled: !(chosenCoursesEdit.length) })}
                    to={urlCurrentTutor(currentTutorId)}
                  >
                    <button
                      type="button"
                      className={main('button-next')}
                    >
                      <IntlMessages id="orgAdmins.nextBtn" />
                    </button>
                  </Link>
                </div>
              )}
            </section>
          </section>
        </FindCoursesTutorsWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const searchCourseDataEdit = getSearchCourseDataTutorsEditFp(state);
  const currentFindCourse = getCurrentFindCourseTutorsFp(state);
  const chosenCoursesEdit = getChosenCoursesEditTutorsFp(state);
  const currentTutorId = getTutorId(state);

  return {
    searchCourseDataEdit,
    currentFindCourse,
    chosenCoursesEdit,
    currentTutorId,
  };
};

FindCoursesTutorsEdit.propTypes = propTypes;
FindCoursesTutorsEdit.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...tutorsAction,
  },
)(FindCoursesTutorsEdit);
