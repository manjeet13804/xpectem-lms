import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import studentsActions from 'redux/students/actions';
import TaxonomyActions from 'redux/taxonomy/actions';
import {
  getSearchLmsGroupsStudentsFp,
  getSearchGroupStudentsFp,
  getCurrentOrgIdStudentsFp,
  getCurrentOrgNameStudentsFp,
  getSearchCoursesFp,
  getChosenCoursesStudentsFp,
  getCurrentStudentsFp,
} from 'selectors';
import _ from 'lodash';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
  DragAndDrop,
  ExampleCsv,
  PreviewCsv,
  SearchSvg,
  CloseIcon,
  CourseItem,
  BannerNotification,
  DefaultButton,
} from 'components';
import qs from 'qs';
import StudentsImportWrapper from './Import.style';
import { DATE_FORMATS, SIMPLE_DICTIONARY, PLACEHOLDER } from '../../../../constants/constants';

const { yearMonthDay } = DATE_FORMATS;
const { startDate } = SIMPLE_DICTIONARY;
const { courseSearchTitle } = PLACEHOLDER;

const b = bemlds('import-block');
const course = bemlds('course');
const urlToStatusImport = id => `${URLS.studentsImportUrl}/${id}/status`;

class GroupsImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: [],
      searchValue: '',
      statusPreview: false,
      isEmptyCourses: false,
      arrayForBack: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'language',
        'notifyEmail',
        'notifySms',
        'note',
      ],
    };
    this.searchDebounce = _.debounce(this.props.searchCourseStudents, 350);
  }

  componentDidMount() {
    const { fetchTaxonomy, selectedGroups } = this.props;
    const [group] = selectedGroups;
    if (group) { fetchTaxonomy({ groupId: group.id }); }
  }

  componentDidUpdate(prevProps) {
    const {
      fetchTaxonomy, selectedGroups,
    } = this.props;
    const [group] = selectedGroups;
    const [prevGroup] = prevProps.selectedGroups;
    const prevGroupId = prevGroup && prevGroup.id;
    const groupId = group && group.id;

    if (prevGroupId !== groupId) {
      fetchTaxonomy({ groupId });
    }
  }

  downloadTemplateFile = () => {
    const {
      selectedGroups, getTemplateFile,
    } = this.props;
    const [group] = selectedGroups;
    const groupId = group && group.id;

    getTemplateFile({ groupId });
  };

  onClickSearchCourse = () => {
    const { searchValue } = this.state;
    const { selectedGroups } = this.props;

    const groupIds = selectedGroups.map(item => item.id);
    const query = _.pickBy({
      title: searchValue,
      groupIds,
      isOnlyPublished: true,
    }, _.identity);

    this.searchDebounce(qs.stringify(query));
  }

  onChange = ({ target: { name, value } }) => {
    const { selectedGroups } = this.props;
    this.setState({
      [name]: value,
    });

    const groupIds = selectedGroups.map(item => item.id);
    const query = _.pickBy({
      title: value.trim(),
      groupIds,
      isOnlyPublished: true,
    }, _.identity);

    this.searchDebounce(qs.stringify(query));
  };

  importData = () => {
    const {
      importCsvFile,
      selectedGroups,
      selectedCoursesForStudents,
      taxonomies,
      history,
      currentLmsGroupId,
    } = this.props;

    const {
      file,
      arrayForBack,
    } = this.state;
    const pathToImport = urlToStatusImport(currentLmsGroupId);
    history.push(pathToImport);
    const taxonomiesTitle = taxonomies.map(item => item.title);
    const newArrayForBack = [...arrayForBack, ...taxonomiesTitle];

    const currentGroupsId = selectedGroups && selectedGroups.map(({ id }) => id);

    const generateFormDataHead = (formData, arrayForBack) => {
      arrayForBack.forEach((item, index) => {
        formData.append(`headers[${index}]`, item);
      });
    };

    const generateFormDataGroups = (formData, currentGroupsId) => {
      currentGroupsId.forEach((item, index) => {
        formData.append(`groups[${index}]`, item);
      });
    };

    const generateFormDataCourses = (formData, courses) => {
      courses.forEach((item, index) => {
        formData.append(`courses[${index}]`, JSON.stringify(item));
      });
    };

    const newChosenCourses = selectedCoursesForStudents.reduce(
      (acc, item) => [...acc, { id: item.id, dateBegin: item.dateBegin }],
      [],
    );

    const formData = new FormData();
    generateFormDataHead(formData, newArrayForBack);
    generateFormDataGroups(formData, currentGroupsId);
    generateFormDataCourses(formData, newChosenCourses);
    if (file) { formData.append('file', file); }

    importCsvFile(formData);
  };

  handleCheckFile = (file) => {
    const {
      selectedGroups,
      checkImportFile,
      taxonomies,
    } = this.props;

    const {
      arrayForBack,
    } = this.state;

    const taxonomiesTitle = taxonomies.map(item => item.title);
    const newArrayForBack = [...arrayForBack, ...taxonomiesTitle];

    const currentGroupsId = selectedGroups && selectedGroups.map(({ id }) => id);

    const generateFormDataHead = (formData, arrayForBack) => {
      arrayForBack.forEach((item, index) => {
        formData.append(`headers[${index}]`, item);
      });
    };

    const generateFormDataGroups = (formData, currentGroupsId) => {
      currentGroupsId.forEach((item, index) => {
        formData.append(`groups[${index}]`, item);
      });
    };

    const formData = new FormData();
    generateFormDataHead(formData, newArrayForBack);
    generateFormDataGroups(formData, currentGroupsId);
    if (file) { formData.append('file', file); }
    checkImportFile(formData);
  }

  handleDrop = (file, dataParse) => {
    this.setState({ file });
    this.setState({ data: dataParse.data });
    this.handleCheckFile(file);
  };

  handleAddFile = (file, dataParser) => {
    this.setState({ file });
    this.setState({ data: dataParser.data });
    this.handleCheckFile(file);
  };

  handleDeleteFile = () => {
    const { clearImportFile } = this.props;
    clearImportFile();
    this.setState({ file: null, data: [] });
  }

  clickPreview = () => {
    const { statusPreview } = this.state;
    const { selectedCoursesForStudents } = this.props;
    const newChosenCourses = selectedCoursesForStudents.reduce((acc, item) => [...acc, item.id], []);
    if (!newChosenCourses.length) {
      this.setState({ isEmptyCourses: true });
      return null;
    }
    this.setState({ statusPreview: !statusPreview });
  };

  goBack = () => {
    this.setState({ statusPreview: false });
  }

  getArrayForBack = (array) => {
    this.setState({ arrayForBack: [...array] });
  };

  handleSaveDate = (id, date, name) => {
    const { addDate } = this.props;
    addDate(id, date, name);
  };

  closeEmptyCoursesEror = () => {
    this.setState({ isEmptyCourses: false });
  };

  render() {
    const {
      data,
      statusPreview,
      searchValue,
      isEmptyCourses,
      file,
    } = this.state;

    const {
      currentNameLmsGroup,
      searchOrgData,
      selectedGroups,
      selectedCoursesForStudents,
      setCurrentCourseStudents,
      searchCoursesData,
    } = this.props;

    const rebuildedSearchedOrgs = searchOrgData.map(item => item.text).join('');
    const rebuildedSelectedGroups = selectedGroups.map(item => item.text).join(', ');
    const affilationsArray = [currentNameLmsGroup, rebuildedSearchedOrgs, rebuildedSelectedGroups].filter(Boolean);
    const affilationName = affilationsArray.join(' - ');
    return (
      <LayoutContent>
        <StudentsImportWrapper>
          <Banner title={<IntlMessages id="students.importBanner" />} />
          {isEmptyCourses && (
            <BannerNotification
              error
              isScrollMount
              title={<IntlMessages id="students.noCourses" />}
              close={this.closeEmptyCoursesEror}
            />
          )}
          <section className={b()}>
            <div className={b('title')}>
              <IntlMessages id="students.importCsvTitle" />
              {' '}
              {affilationName}
            </div>
            {!statusPreview && (
              <div className={b('text')}>
                <div><IntlMessages id="orgAdmins.importTextFirst" /></div>
                <div><IntlMessages id="orgAdmins.importTextSecond" /></div>
                <div className={b('text-indent')}>
                  <IntlMessages id="orgAdmins.importTextThird" />
                </div>
              </div>
            )}
            {statusPreview && (
              <div className={b('preview-text')}>
                <div className={b('preview-text-title')}>
                  <IntlMessages id="orgAdmins.previewTitle" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextFirst" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextSecond" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextThird" />
                </div>
                <div className={b('preview-text-field')}>
                  <IntlMessages id="orgAdmins.previewField" />
                </div>
              </div>
            )}
            {!statusPreview && (
              <div className={b('upload')}>
                <div className={b('upload-form')}>
                  <DragAndDrop
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    fileFormats=".csv"
                    handleDelete={this.handleDeleteFile}
                  />
                </div>
                <div className={b('upload-btn')}>
                  <DefaultButton
                    textId="orgAdmins.importPreviewBtn"
                    disabled={!file}
                    onClick={this.clickPreview}
                  />
                </div>
              </div>
            )}
            {!statusPreview
              ? (<ExampleCsv type="OrgAdmins" />)
              : (
                <PreviewCsv
                  type="Students"
                  getArray={this.getArrayForBack}
                  data={data}
                />
              )}
            {!statusPreview && (
              <div className={course('courses-wrapper')}>
                {Boolean(selectedCoursesForStudents.length) && (
                  <div className={course('selected')}>
                    <div className={course('selected-title')}>
                      <IntlMessages id="course.selectedTitle" />
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
                {searchCoursesData && searchCoursesData.map(item => (
                  <CourseItem
                    key={item.id}
                    item={item}
                    handleSaveDate={this.handleSaveDate}
                    onChangeCheckbox={() => setCurrentCourseStudents(item.id)}
                  />
                ))}
              </div>
            )}
            {!statusPreview && (
              <div className={b('download-btn')}>
                <button
                  onClick={this.downloadTemplateFile}
                  className={b('download-btn-file')}
                >
                  <IntlMessages id="orgAdmins.importExampleFile" />
                </button>
              </div>
            )}
            {statusPreview && (
              <div>
                <div className={b('import-btn')}>
                  <button
                    className={b('upload-btn-preview')}
                    onClick={this.importData}
                  >
                    <IntlMessages id="orgAdmins.previewImportBtn" />
                  </button>
                </div>
                <div className={b('import-btn')}>
                  <button className={b('upload-btn-preview')} onClick={this.goBack}>
                    <IntlMessages id="group.importGoBack" />
                  </button>
                </div>
              </div>
            )}
          </section>
        </StudentsImportWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const searchLmsGroupsData = getSearchLmsGroupsStudentsFp(state);
  const searchOrgData = state.searchOrganisations.selectedOrganisations;
  const searchGroupData = getSearchGroupStudentsFp(state);
  const currentLmsGroupId = state.searchLmsGroup.selectedLmsGroupId;
  const currentNameLmsGroup = state.searchLmsGroup.selectedLmsGroupName;
  const currentOrgId = getCurrentOrgIdStudentsFp(state);
  const currentOrgName = getCurrentOrgNameStudentsFp(state);
  const searchCoursesData = getSearchCoursesFp(state);
  const chosenCourses = getChosenCoursesStudentsFp(state);
  const currentStudents = getCurrentStudentsFp(state);
  const { isBlockPreviewButton } = state.students;
  const { selectedGroups } = state.searchGroup;
  const selectedCoursesForStudents = state.students.selectedCourses;
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
    selectedGroups,
    isBlockPreviewButton,
    selectedCoursesForStudents,
    user,
    taxonomies,
  };
};

export default connect(mapStateToProps, { ...studentsActions, ...TaxonomyActions })(GroupsImport);
