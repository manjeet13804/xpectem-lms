import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import qs from 'qs';
import coursesActions from 'redux/courses/actions';
import {
  getSearchLmsGroupCoursesFp,
  getSearchOrgCoursesFp,
  getSearchGroupCoursesFp,
  getCurrentLmsGroupCoursesFp,
  getCurrentOrgCoursesFp,
  getCurrentGroupCoursesFp,
  getSearchCourseDataFp,
  getCurrentFindCourseFp,
} from 'selectors';
import moment from 'moment';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER, DATE_FORMATS } from 'constants/constants';
import { bemlds, caseDateInSelect } from 'utils';
import {
  Banner,
  SelectAnyTime,
  SearchSvg,
  Checkbox,
  SearchOrganisations,
  CloseIcon,
  SelectAllNone,
  CourseItem,
} from 'components';
import FindCoursesWrapper from './findCourse.style';

const defaultProps = {
  clearSearchDataCourses: () => null,
  clearOrgCourse: () => null,
  clearLmsGroupCourse: () => null,
  searchLmsGroupsCourses: null,
  searchOrgsCourses: null,
  searchGroupsCourses: null,
  searchCourseCourses: null,
  searchLmsGroupData: [],
  searchOrgData: [],
  searchGroupData: [],
  searchCourseData: [],
  setCurrentLmsGroupCourses: null,
  setCurrentOrgCourses: null,
  setCurrentGroupCourses: null,
  currentLmsGroup: {
    id: null,
    name: '',
  },
  currentOrg: {
    id: null,
    name: '',
  },
  currentGroup: {
    id: null,
    name: '',
  },
  setCurrentFindCourseCourses: null,
  currentFindCourse: {
    id: null,
    title: '',
  },
  addDate: null,
  withoutBanner: false,
  handleCourseClick: null,
};

const propTypes = {
  clearSearchDataCourses: PropTypes.func,
  clearOrgCourse: PropTypes.func,
  clearLmsGroupCourse: PropTypes.func,
  searchLmsGroupsCourses: PropTypes.func,
  searchOrgsCourses: PropTypes.func,
  searchGroupsCourses: PropTypes.func,
  searchCourseCourses: PropTypes.func,
  searchLmsGroupData: PropTypes.arrayOf(PropTypes.object),
  searchOrgData: PropTypes.arrayOf(PropTypes.object),
  searchGroupData: PropTypes.arrayOf(PropTypes.object),
  searchCourseData: PropTypes.arrayOf(PropTypes.object),
  setCurrentLmsGroupCourses: PropTypes.func,
  setCurrentOrgCourses: PropTypes.func,
  setCurrentGroupCourses: PropTypes.func,
  currentLmsGroup: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  currentOrg: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  currentGroup: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  setCurrentFindCourseCourses: PropTypes.func,
  currentFindCourse: {
    id: PropTypes.number,
    title: PropTypes.string,
  },
  addDate: PropTypes.func,
  withoutBanner: PropTypes.boolean,
  handleCourseClick: PropTypes.func,
};

const page = bemlds('page');
const group = bemlds('group');
const btn = bemlds('button');
const main = bemlds('main');

const {
  searchLms,
  organisationsName,
  groupName,
  searchCoursePlaceholder,
} = PLACEHOLDER;
const { yearMonthDay } = DATE_FORMATS;

const urlEditCourse = id => `${URLS.coursesEdit}/${id}`;

class FindCourses extends PureComponent {
  constructor(props) {
    super(props);
    const {
      searchLmsGroupsCourses,
      searchOrgsCourses,
      searchGroupsCourses,
      searchCourseCourses,
    } = props;

    this.state = {
      searchValue: '',
      searchOrgValue: '',
      searchGroupValue: '',
      searchCourseValue: '',
      createdAt: null,
      createdAtCourse: null,
      onlyActive: false,
      checkGroupStatus: false,
      checkOrgStatus: false,
      checkLmsGroupStatus: false,
      checkDetailSearch: false,
    };
    this.searchCourseDebounce = _.debounce(searchCourseCourses, 350);
    this.searchLmsGroupsDebounce = _.debounce(searchLmsGroupsCourses, 350);
    this.searchOrgsDebounce = _.debounce(searchOrgsCourses, 350);
    this.searchGroupsDebounce = _.debounce(searchGroupsCourses, 350);
  }

  componentWillUnmount() {
    const { clearLmsGroupCourse } = this.props;

    clearLmsGroupCourse();
  }

  onChangeCourse = ({ target: { name, value } }) => {
    const { currentGroup } = this.props;

    this.setState({
      [name]: value,
    });

    const query = _.pickBy({
      title: value.trim(),
      groupId: currentGroup.id,
      isEdit: true,
    }, _.identity);

    this.searchCourseDebounce(query);
  };

  getCourseByGroupAndTitle = (id) => {
    const { searchCourseCourses } = this.props;
    const query = _.pickBy({
      groupId: id,
    }, _.identity);
    searchCourseCourses(query);
  };

  onChangeLmsGroup = ({ target: { name, value } }) => {
    const { checkLmsGroupStatus, createdAt } = this.state;
    const { clearLmsGroupCourse } = this.props;

    clearLmsGroupCourse();

    this.setState({
      [name]: value,
      searchOrgValue: '',
      searchGroupValue: '',
    });

    const query = _.pickBy({
      createdAt,
      name: value.trim(),
    }, _.identity);
    query.onlyActive = !checkLmsGroupStatus;

    this.searchLmsGroupsDebounce(qs.stringify(query));
  };

  onChangeOrg = ({ target: { name, value } }) => {
    const {
      currentLmsGroup: { id },
      clearOrgCourse,
    } = this.props;
    const { checkOrgStatus } = this.state;

    clearOrgCourse();

    this.setState({
      [name]: value,
      searchGroupValue: '',
    });

    const query = _.pickBy({
      lmsGroup: id,
      name: value.trim(),
    }, _.identity);
    query.onlyActive = !checkOrgStatus;

    this.searchOrgsDebounce(qs.stringify(query));
  };

  onChangeGroup = ({ target: { name, value } }) => {
    const {
      currentLmsGroup: { id: lmsGroupId },
      currentOrg: { id: orgId },
      clearSearchDataCourses,
    } = this.props;
    const { checkGroupStatus } = this.state;

    clearSearchDataCourses();

    this.setState({
      [name]: value,
    });

    const query = _.pickBy({
      lmsGroup: lmsGroupId,
      organisation: orgId,
      name: value.trim(),
    }, _.identity);
    query.onlyActive = !checkGroupStatus;

    this.searchGroupsDebounce(qs.stringify(query));
  };

  clickSearchGroup = () => {
    const { searchGroupValue } = this.state;
    const {
      currentLmsGroup: { id: lmsGroupId },
      currentOrg: { id: orgId },
      searchGroupsCourses,
    } = this.props;

    const query = _.pickBy({
      lmsGroup: lmsGroupId,
      organisation: orgId,
      name: searchGroupValue,
    }, _.identity);

    searchGroupsCourses(qs.stringify(query));
  };

  handleCourseDataSave = (value) => {
    this.setState({
      createdAtCourse: caseDateInSelect(value),
    });
  };

  handleSaveDate = (id, date, name) => {
    const { addDate } = this.props;
    addDate(id, date, name);
  };

  handleDateSave = (value) => {
    this.setState({
      createdAt: caseDateInSelect(value),
    });
  };

  handleCheck = (value, name) => this.setState({ [name]: value });

  handleAdvancedCheck = (value, name) => {
    const { clearLmsGroupCourse } = this.props;

    this.setState({
      [name]: value,
    })
    if (!value) {
        this.setState({
          searchValue: '',
          searchOrgValue: '',
          searchGroupValue: '',
          checkLmsGroupStatus: false,
          checkOrgStatus: false,
          checkGroupStatus: false,
        })
        clearLmsGroupCourse();
    }
  }

  handleClickCourse = (id) => {
    const { handleCourseClick, history } = this.props;
    if (handleCourseClick) {
      handleCourseClick(id);
      return;
    }
    history.push(urlEditCourse(id));
  }

  render() {
    const {
      searchValue,
      searchOrgValue,
      searchGroupValue,
      searchCourseValue,
      checkDetailSearch,
      checkLmsGroupStatus,
      checkOrgStatus,
      checkGroupStatus,
    } = this.state;

    const {
      searchLmsGroupData,
      searchOrgData,
      searchGroupData,
      searchCourseData,
      setCurrentLmsGroupCourses,
      setCurrentOrgCourses,
      setCurrentGroupCourses,
      currentLmsGroup: {
        id: lmsGroupId,
        name: lmsGroupName,
      },
      currentOrg: {
        id: orgId,
        name: orgName,
      },
      setCurrentFindCourseCourses,
      withoutBanner,
    } = this.props;

    return (
      <LayoutContent>
        <FindCoursesWrapper>
          {!withoutBanner && <Banner title={<IntlMessages id="courses.edit" />} />}
          <section className={page()}>
            <section className={page('left')}>
              <div className={group()}>
                <div className={group('title')}>
                  <IntlMessages id="courses.findGroups" />
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
                    placeholder={searchCoursePlaceholder}
                    onChange={this.onChangeCourse}
                  />
                </div>
                <div className={group('form-select')}>
                  <SelectAnyTime
                    handleDataSave={this.handleCourseDataSave}
                    status
                  />
                </div>
                <div className={group('form-checkbox-advanced')}>
                  <Checkbox
                    handleCheck={this.handleAdvancedCheck}
                    value={checkDetailSearch}
                    name="checkDetailSearch"
                    title={<IntlMessages id="courses.advancedSearch" />}
                  />
                </div>
                {checkDetailSearch && (
                  <Fragment>
                    <div className={group('search-title')}>
                      <IntlMessages id="organisations.findSearch" />
                    </div>
                    <div className={group('search')}>
                      <SearchSvg />
                      <input
                        className={group('search-input')}
                        type="text"
                        value={searchValue}
                        name="searchValue"
                        placeholder={searchLms}
                        onChange={this.onChangeLmsGroup}
                      />
                    </div>
                    {searchLmsGroupData.length > 0 && !lmsGroupId && (
                      <div className={group('search-block')}>
                        {(
                          searchLmsGroupData.map(({ id, name }) => (
                            <div
                              role="button"
                              tabIndex="-1"
                              className={group('search-block-item', { active: id === lmsGroupId })}
                              key={id}
                              onClick={() => {
                                setCurrentLmsGroupCourses(id, name);
                                this.setState({
                                  searchValue: name,
                                });
                              }
                            }
                            >
                              {name}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className={group('form')}>
                      <div className={group('form-select')}>
                        <SelectAnyTime
                          handleDataSave={this.handleDateSave}
                          status
                        />
                      </div>
                      <div className={group('form-checkbox')}>
                        <Checkbox
                          handleCheck={this.handleCheck}
                          value={checkLmsGroupStatus}
                          name="checkLmsGroupStatus"
                          title={<IntlMessages id="organisations.findCheck" />}
                        />
                      </div>
                    </div>
                    {lmsGroupName && (
                      <div className={group('search-title')}>
                        <IntlMessages id="organisations.searchInput" />
                        {lmsGroupName}
                      </div>
                    )}
                    <div className={group('search')}>
                      <SearchSvg />
                      <input
                        className={group('search-input')}
                        type="text"
                        value={searchOrgValue}
                        name="searchOrgValue"
                        placeholder={organisationsName}
                        onChange={this.onChangeOrg}
                      />
                    </div>
                    {searchOrgData.length > 0 && !orgId && (
                      <div className={group('search-block')}>
                        {(
                          searchOrgData.map(({ name, id }) => (
                            <div
                              role="button"
                              tabIndex="-1"
                              className={group('search-block-item', { active: id === orgId })}
                              key={id}
                              onClick={() => {
                                setCurrentOrgCourses(id, name);
                                this.setState({
                                  searchOrgValue: name,
                                });
                              }
                            }
                            >
                              {name}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className={group('form')}>
                      <div className={group('form-select')}>
                        <SelectAnyTime
                          handleDataSave={this.handleDateSave}
                          status
                        />
                      </div>
                      <div className={group('form-checkbox')}>
                        <Checkbox
                          name="checkOrgStatus"
                          value={checkOrgStatus}
                          handleCheck={this.handleCheck}
                          title={<IntlMessages id="organisations.findCheckOrg" />}
                        />
                      </div>
                    </div>
                    {orgName && (
                      <div className={group('search-title')}>
                        <IntlMessages id="groups.searchInput" />
                        {orgName}
                      </div>
                    )}
                    <div className={group('search')}>
                      <SearchSvg />
                      <input
                        className={group('search-input')}
                        type="text"
                        value={searchGroupValue}
                        name="searchGroupValue"
                        placeholder={groupName}
                        onChange={this.onChangeGroup}
                      />
                    </div>
                    <div className={group('form')}>
                      <div className={group('form-select')}>
                        <SelectAnyTime
                          handleDataSave={this.handleDateSave}
                          status
                        />
                      </div>
                      <div className={group('form-checkbox')}>
                        <Checkbox
                          handleCheck={this.handleCheck}
                          value={checkGroupStatus}
                          name="checkGroupStatus"
                          title={<IntlMessages id="organisations.findCheckGroup" />}
                        />
                      </div>
                    </div>
                    <div className={btn()}>
                      <button
                        type="button"
                        onClick={this.clickSearchGroup}
                        className={btn('search')}
                      >
                        <IntlMessages id="organisations.searchBtn" />
                      </button>
                    </div>
                  </Fragment>
                )}
              </div>
            </section>
            <section className={page('right')}>
              {checkDetailSearch && (
                <Fragment>
                  {searchGroupData.length > 0 ? (
                    <div className={main('select')}>
                      <div className={main('title')}>
                        <IntlMessages id="groupAdmins.found" />
                        {searchGroupData.length}
                        <IntlMessages id="groupAdmins.foundGrp" />
                      </div>
                      <div className={main('select-switch')}>
                        <SelectAllNone />
                      </div>
                    </div>
                  ) : (
                    <div className={main('not-found')}>
                      <IntlMessages id="lmsGroups.noResultsFound" />
                    </div>
                  )
                }
                  <div className={main('search-groups')}>
                    {searchGroupData.map(({
                      id,
                      name,
                      createdAt,
                      check,
                    }) => (
                      <SearchOrganisations
                        key={id}
                        title={name}
                        belong={orgName}
                        check={check}
                        date={moment(createdAt).format(yearMonthDay)}
                        onChangeCheckbox={() => {
                          setCurrentGroupCourses(id, name);
                          this.getCourseByGroupAndTitle(id);
                          this.setState({
                            searchGroupValue: name
                          })
                        }}
                      />
                    ))}
                  </div>
                  {(searchGroupData.filter(({ check }) => check).length > 0) && (
                    <div className={main('selected')}>
                      <div className={main('selected-title')}>
                        <IntlMessages id="groupAdmins.selectedTitle" />
                      </div>
                      <div className={main('selected-text')}>
                        <IntlMessages id="groupAdmins.selectedText" />
                      </div>
                      <div className={main('selected-block')}>
                        {searchGroupData.filter(({ check }) => check).map(({ id, name }) => (
                          <div
                            key={id}
                            role="button"
                            tabIndex="-1"
                            onClick={() => setCurrentGroupCourses(id, name)}
                            className={main('selected-item')}
                          >
                            <div className={main('selected-item-text')}>
                              {name}
                            </div>
                            <CloseIcon className={main('selected-item-icon')} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              )}
              {searchCourseData.length > 0 && (
                <div className={main('course-title')}>
                  <IntlMessages id="students.searchTitle" />
                </div>
              )}
              {searchCourseData.map((item, i) => (
                <CourseItem
                  key={item.id}
                  item={item}
                  handleSaveDate={this.handleSaveDate}
                  isClickable
                  isWhite={i % 2 === 0}
                  onClick={() => this.handleClickCourse(item.id)}
                  onChangeCheckbox={() => setCurrentFindCourseCourses(item.id, item.title)}
                />
              ))}
            </section>
          </section>
        </FindCoursesWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const searchLmsGroupData = getSearchLmsGroupCoursesFp(state);
  const searchOrgData = getSearchOrgCoursesFp(state);
  const searchGroupData = getSearchGroupCoursesFp(state);
  const currentLmsGroup = getCurrentLmsGroupCoursesFp(state);
  const currentOrg = getCurrentOrgCoursesFp(state);
  const currentGroup = getCurrentGroupCoursesFp(state);
  const searchCourseData = getSearchCourseDataFp(state);
  const currentFindCourse = getCurrentFindCourseFp(state);

  return {
    searchLmsGroupData,
    searchOrgData,
    searchGroupData,
    currentLmsGroup,
    currentOrg,
    currentGroup,
    searchCourseData,
    currentFindCourse,
  };
};

FindCourses.propTypes = propTypes;
FindCourses.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...coursesActions,
  },
)(FindCourses);
