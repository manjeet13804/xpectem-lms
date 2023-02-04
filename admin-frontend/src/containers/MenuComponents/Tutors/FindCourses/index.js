import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import qs from 'qs';
import tutorsAction from 'redux/tutors/actions';
import {
  getSearchCourseDataTutorsFp,
  getCurrentFindCourseTutorsFp,
  getChosenCoursesTutorsFp,
  getTutorId,
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
  DefaultButton,
} from 'components';
import cropStateImageActions from 'redux/cropImageState/actions';
import FindCoursesTutorsWrapper from './findCourses.style';

const defaultProps = {
  clearSearchDataCourses: () => null,
  searchCourseTutors: null,
  searchCourseData: [],
  setCurrentFindCourseTutors: null,
  currentFindCourse: {
    id: null,
    title: '',
  },
  addDateCourseTutors: null,
  chosenCourses: [],
  setInitialProps: () => null,
  setInitStateCropImage: () => null,
};

const propTypes = {
  clearSearchDataCourses: PropTypes.func,
  searchCourseTutors: PropTypes.func,
  searchCourseData: PropTypes.arrayOf(PropTypes.object),
  setCurrentFindCourseTutors: PropTypes.func,
  currentFindCourse: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  addDateCourseTutors: PropTypes.func,
  chosenCourses: PropTypes.arrayOf(PropTypes.object),
  setInitialProps: PropTypes.func,
  setInitStateCropImage: PropTypes.func,
};

const page = bemlds('page');
const group = bemlds('group');
const main = bemlds('main');

const { tutorsSearchCourses } = PLACEHOLDER;

const urlAddTutor = URLS.tutorsAdd;
const urlCurrentTutor = id => `${URLS.tutorsEdit}/${id}`;

class FindCoursesTutors extends PureComponent {
  constructor(props) {
    super(props);
    const {
      searchCourseTutors,
    } = props;

    this.state = {
      searchCourseValue: '',
    };
    this.searchCourseDebounce = _.debounce(searchCourseTutors, 350);
  }

  componentDidMount() {
    const {
      history: {
        location: {
          state,
        },
      },
      setInitialProps,
      setInitStateCropImage,
    } = this.props;
    if (!state || !state.save) {
      setInitialProps();
      setInitStateCropImage();
    }
  }

  componentWillUnmount() {
    const { clearSearchDataCourses } = this.props;

    clearSearchDataCourses();
  }

  onChangeCourse = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    const query = _.pickBy({
      title: value.trim(),
    }, _.identity);

    this.searchCourseDebounce(qs.stringify(query));
  };

  getCourseByTitle = () => {
    const { searchCourseTutors } = this.props;
    const { searchCourseValue } = this.state;
    const query = _.pickBy({
      title: searchCourseValue,
    }, _.identity);

    searchCourseTutors(qs.stringify(query));
  };

  handleSaveDate = (id, date, name) => {
    const { addDateCourseTutors } = this.props;
    addDateCourseTutors(id, date, name);
  };

  render() {
    const { searchCourseValue } = this.state;

    const {
      searchCourseData,
      setCurrentFindCourseTutors,
      currentFindCourse: {
        id: currentFindCourseId,
      },
      chosenCourses,
      history: {
        location: {
          state,
        },
      },
    } = this.props;

    const tutorUrl = state && state.id ? urlCurrentTutor(state.id) : urlAddTutor;
    return (
      <LayoutContent>
        <FindCoursesTutorsWrapper>
          <Banner title={<IntlMessages id="tutors.addBannerSimplee" />} />
          <section className={page()}>
            <section className={page('left')}>
              <div className={group()}>
                <div className={group('title')}>
                  <IntlMessages id="tutors.addLabel" />
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
                {searchCourseData.length > 0 && (
                  <div className={group('search-block')}>
                    {(
                      searchCourseData.map(({ id, title }) => (
                        <div
                          role="button"
                          tabIndex="-1"
                          className={group('search-block-item', { active: id === currentFindCourseId })}
                          key={id}
                          onClick={() => setCurrentFindCourseTutors(id, title)}
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
              {searchCourseData.length > 0 && (
                <div className={main('course-title')}>
                  <IntlMessages id="students.searchTitle" />
                </div>
              )}
              {searchCourseData.map(item => (
                <CourseItem
                  key={item.id}
                  item={item}
                  isHideDate
                  handleSaveDate={this.handleSaveDate}
                  onChangeCheckbox={() => setCurrentFindCourseTutors(item.id, item.title)}
                />
              ))}
              {Boolean(chosenCourses.length) && (
                <div className={main('selected')}>
                  <div className={main('selected-title')}>
                    <IntlMessages id="course.selectedTitle"/>
                  </div>
                  <div className={main('selected-block')}>
                    {chosenCourses.map(({
                      id,
                      title,
                    }) => (
                      <div
                        key={id}
                        role="button"
                        tabIndex="-1"
                        onClick={() => setCurrentFindCourseTutors(id, title)}
                        className={main('selected-item')}
                      >
                        <div className={main('selected-item-text')}>
                          {title}
                        </div>
                        <CloseIcon className={main('selected-item-icon')}/>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {Boolean(chosenCourses.length) && (
                <div className={main('button')}>
                  <Link
                    className={main('button-link', { disabled: !(chosenCourses.length) })}
                    to={tutorUrl}
                  >
                    <DefaultButton
                      textId="orgAdmins.nextBtn"
                    />
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
  const searchCourseData = getSearchCourseDataTutorsFp(state);
  const currentFindCourse = getCurrentFindCourseTutorsFp(state);
  const chosenCourses = getChosenCoursesTutorsFp(state);
  const currentTutorId = getTutorId(state);

  return {
    searchCourseData,
    currentFindCourse,
    chosenCourses,
    currentTutorId,
  };
};

FindCoursesTutors.propTypes = propTypes;
FindCoursesTutors.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...tutorsAction,
    ...cropStateImageActions,
  },
)(FindCoursesTutors);
