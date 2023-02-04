import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import coursesActions from 'redux/courses/actions';
import {
  getSearchHeaderDataFp,
  getCurrentHeaderFp,
  getSearchFilesByNameDataFp,
  getCurrentFileIdFp,
  getAttachedFilesFp,
  getHeaderNameFp,
  getFileNameFp,
  getUploadedFilesFp,
  getAttachedUploadFilesFp,
} from 'selectors';
import { REGEXP } from 'constants/regexp';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  SelectAnyTime,
  SearchSvg,
  AttachedFile,
  DragAndDropAllTypes,
  CustomTextInput,
  DefaultButton,
} from 'components';
import {
  bemlds,
  caseDateInSelect,
  filesByHeader,
} from 'utils';
import { PLACEHOLDER, acceptedFileTypes } from 'constants/constants';
import CoursesAddFilesWrapper from './coursesAddFiles.style';

const { getUrlBeforeAddFile } = REGEXP;

const {
  searchDocPlaceholder,
  fileNamePlaceholder,
} = PLACEHOLDER;

const page = bemlds('page');
const filesPage = bemlds('files-page');
const form = bemlds('form');
const courseFields = bemlds('course-fields');

const defaultProps = {
  currentHeader: {},
  setCurrentHeaderIdCourses: null,
  searchFilesByNameData: [],
  currentFileId: null,
  attachedFiles: null,
  removeAttachedFileCourses: [],
  fileName: null,
  removeUploadedFileCourses: null,
  searchHeaderData: [],
  searchHeaderCourses: null,
  searchFilesByHeaderCourses: null,
  setInitialPropsAddFiles: null,
  setCurrentFileIdCourses: null,
  attachFileCourses: null,
  uploadFileToCourse: null,
  attachedUploadFiles: [],
  downloadCurrentFile: null,
  deleteFileOfCourse: null,
  changeFileOfCourse: null,
  currentResetUrl: '',
  toggleStatusSetInitialProps: null,
  history: {},
  isLessonFiles: false,
  handleClosePopup: () => null,
};

const propTypes = {
  currentHeader: PropTypes.shape({
    id: PropTypes.number,
    header: PropTypes.string,
  }),
  setCurrentHeaderIdCourses: PropTypes.func,
  searchFilesByNameData: PropTypes.arrayOf(PropTypes.object),
  currentFileId: PropTypes.number,
  attachedFiles: PropTypes.arrayOf(PropTypes.object),
  removeAttachedFileCourses: PropTypes.func,
  fileName: PropTypes.shape({}),
  removeUploadedFileCourses: PropTypes.func,
  searchHeaderData: PropTypes.arrayOf(PropTypes.shape({})),
  searchHeaderCourses: PropTypes.func,
  searchFilesByHeaderCourses: PropTypes.func,
  setInitialPropsAddFiles: PropTypes.func,
  setCurrentFileIdCourses: PropTypes.func,
  attachFileCourses: PropTypes.func,
  uploadFileToCourse: PropTypes.func,
  attachedUploadFiles: PropTypes.arrayOf(PropTypes.object),
  downloadCurrentFile: PropTypes.func,
  deleteFileOfCourse: PropTypes.func,
  changeFileOfCourse: PropTypes.func,
  currentResetUrl: PropTypes.string,
  toggleStatusSetInitialProps: PropTypes.func,
  history: PropTypes.shape({}),
  isLessonFiles: PropTypes.bool,
  handleClosePopup: PropTypes.func,
};

class CoursesAddFiles extends PureComponent {
  constructor(props) {
    super(props);

    const {
      searchHeaderCourses,
      searchFilesByHeaderCourses,
    } = props;

    this.state = {
      searchHeaderValue: '',
      headerChangeDaterange: '',
      searchFileValue: '',
      fileChangeDaterange: '',
      file: null,
      headerNameOfFile: '',
      headerFileNameOfFile: '',
      errors: {
        headerNameOfFile: '',
        headerFileNameOfFile: '',
        file: '',
      },
    };
    this.searchHeaderDebounce = _.debounce(searchHeaderCourses, 350);
    this.searchFileDebounce = _.debounce(searchFilesByHeaderCourses, 350);
  }

  componentDidMount() {
    const {
      setInitialPropsAddFiles,
      toggleStatusSetInitialProps,
      currentResetUrl,
    } = this.props;
    const isSetInitialProps = currentResetUrl.indexOf('edit') !== '-1';
    if (!isSetInitialProps) { setInitialPropsAddFiles(); }
    toggleStatusSetInitialProps(false);
  }

  onChangeHeaderSearch = ({ target: { name, value } }) => {
    const { headerChangeDaterange } = this.state;
    const { setCurrentHeaderIdCourses, currentHeader: { id: currentHeaderId } } = this.props;

    this.setState({ [name]: value });
    const header = value.trim() ? `header=${value.trim()}` : '';
    const createdAt = caseDateInSelect(headerChangeDaterange) ? `&createdAt=${caseDateInSelect(headerChangeDaterange)}` : '';
    const queryString = `${header}${createdAt}`;
    this.searchHeaderDebounce(queryString);
    if (currentHeaderId) {
      setCurrentHeaderIdCourses({});
      this.setState({ searchFileValue: '' });
    }
  };

  handleHeaderRangeSave = (value) => {
    const { searchHeaderValue } = this.state;
    this.setState({ headerChangeDaterange: value });
    const header = searchHeaderValue.trim() ? `header=${searchHeaderValue.trim()}` : '';
    const createdAt = caseDateInSelect(value) ? `&createdAt=${caseDateInSelect(value)}` : '';
    const queryString = `${header}${createdAt}`;
    if (queryString) {
      this.searchHeaderDebounce(queryString);
    }
  };

  clickSearchHeader = () => {
    const { searchHeaderCourses } = this.props;

    const {
      searchHeaderValue,
      headerChangeDaterange,
    } = this.state;

    const header = searchHeaderValue.trim() ? `header=${searchHeaderValue.trim()}` : '';
    const createdAt = caseDateInSelect(headerChangeDaterange) ? `&createdAt=${caseDateInSelect(headerChangeDaterange)}` : '';
    const queryString = `${header}${createdAt}`;

    searchHeaderCourses(queryString);
  };

  onChangeFileSearch = ({ target: { name, value } }) => {
    const { fileChangeDaterange } = this.state;
    const {
      searchFilesByHeaderCourses,
      currentHeader: { header },
    } = this.props;
    this.setState({ [name]: value });
    const params = {
      header,
      createdAt: caseDateInSelect(fileChangeDaterange),
      name: value || undefined,
    };
    searchFilesByHeaderCourses(params);
  };

  handleSearchFileByClickHeader = (header) => {
    const { fileChangeDaterange } = this.state;
    const {
      searchFilesByHeaderCourses,
    } = this.props;
    const params = {
      header,
      createdAt: caseDateInSelect(fileChangeDaterange),
    };
    searchFilesByHeaderCourses(params);
  }

  handleFileDaterangeSave = (value) => {
    const { searchFileValue } = this.state;
    const {
      searchFilesByHeaderCourses,
      currentHeader: { header },
    } = this.props;
    this.setState({ fileChangeDaterange: value });

    const fileName = searchFileValue;
    const createdAt = caseDateInSelect(value);
    const params = {
      header,
      createdAt,
      name: fileName || undefined,
    };
    searchFilesByHeaderCourses(params);
  };

  handleClickFoundFiles = (id) => {
    const {
      setCurrentFileIdCourses,
    } = this.props;
    setCurrentFileIdCourses(id);
  };

  handleSaveCurrentFile = () => {
    const {
      setCurrentHeaderIdCourses,
      uploadFileToCourse,
      currentFileId: id,
      isLessonFiles,
      handleClosePopup,
      topicId,
    } = this.props;
    const formData = new FormData();
    formData.append('header', 'selected');
    formData.append('name', 'selected');
    formData.append('id', id);

    if (topicId) {
      formData.append('topicId', topicId);
    }

    setCurrentHeaderIdCourses({});
    uploadFileToCourse(formData, isLessonFiles);
    this.setState({ searchHeaderValue: '' });
    if (isLessonFiles) {
      handleClosePopup();
    }
  }

  handleDeleteFileOfCourse = (fileId) => {
    const { deleteFile } = this.props;
    deleteFile(fileId);
  };

  handleEditFileOfCourse = (header, name, file, fileId) => {
    const { changeFileOfCourse } = this.props;

    const body = new FormData();
    if (header) {
      body.append('header', header);
    }
    if (name) {
      body.append('name', name);
    }
    if (file) {
      body.append('file', file);
    }

    changeFileOfCourse(fileId, body);
  };

  changeInputName = ({ target: { name, value } }) => {
    const { errors } = this.state;
    this.setState({
      [name]: value,
      errors: {
        ...errors,
        [name]: '',
      },
    });
  };

  handleAddFile = (file) => {
    const { errors } = this.state;
    const newErros = {
      ...errors,
      file: '',
    };
    this.setState({ file, errors: newErros });
  };

  clickSaveFile = () => {
    const {
      file,
      headerNameOfFile,
      headerFileNameOfFile,
    } = this.state;
    const {
      uploadFileToCourse,
      isLessonFiles,
      handleClosePopup,
      topicId,
    } = this.props;

    const newErrors = {
      headerNameOfFile: headerNameOfFile ? '' : 'This field is required',
      headerFileNameOfFile: headerFileNameOfFile ? '' : 'This field is required',
      file: file ? '' : 'Upload file',
    };

    const isErrors = Object.values(newErrors).some(item => item);
    if (isErrors) {
      this.setState({
        errors: newErrors,
      });

      return;
    }
    const formData = new FormData();
    formData.append('header', headerNameOfFile);
    formData.append('name', headerFileNameOfFile);
    formData.append('file', file);

    if (topicId) {
      formData.append('topicId', topicId);
    }

    if (file) {
      uploadFileToCourse(formData, isLessonFiles);
    }

    this.setState({ headerNameOfFile: '' });
    this.setState({ headerFileNameOfFile: '' });
    this.setState({ file: null });

    if (isLessonFiles) {
      handleClosePopup();
    }
  };

  handleDownloadCurrentFile = (url, name) => {
    const { downloadCurrentFile } = this.props;
    downloadCurrentFile(url, name);
  };

  handleSave = () => {
    const { addFilesForCourse, currentResetUrl, history } = this.props;
    addFilesForCourse();
    history.push(currentResetUrl, { notClear: true });
  }

  handleCancel = () => {
    const { currentResetUrl, history, clearFiles } = this.props;
    clearFiles();
    history.push(currentResetUrl, { notClear: true });
  }

  render() {
    const {
      searchHeaderValue,
      searchFileValue,
      headerNameOfFile,
      headerFileNameOfFile,
      errors,
    } = this.state;

    const {
      currentHeader: { id: currentHeaderId },
      setCurrentHeaderIdCourses,
      searchFilesByNameData,
      currentFileId,
      attachedFiles,
      removeAttachedFileCourses,
      searchHeaderData,
      isLessonFiles,
      selectedFiles,
    } = this.props;

    const attachedFindFilesByHeader = filesByHeader(attachedFiles) || [];
    const uploadedFilesByHeader = filesByHeader(selectedFiles) || [];

    const rebuildedFoundedFiles = searchFilesByNameData.reduce((acc, item) => {
      const { fileTopics } = item;
      if (fileTopics && fileTopics.header) {
        const { header } = fileTopics;
        const arrayForSearch = uploadedFilesByHeader[header];
        if (arrayForSearch) {
          const isExistedFile = arrayForSearch.some(file => file.id === item.id);
          if (isExistedFile) {
            return acc;
          }
        }
      }
      return [...acc, item];
    }, []);

    if (isLessonFiles) {
      return (
        <CoursesAddFilesWrapper>
          <section className={filesPage()}>
            <section className={form()}>
              <section className={page('left')}>
                <div className={form('title')}>
                  <IntlMessages id="courses.selectFile" />
                  <div className={courseFields()}>
                    <div className={courseFields('label')}>
                      <IntlMessages id="courses.searchHeaderLabel" />
                    </div>
                    <div className={courseFields('search')}>
                      <SearchSvg />
                      <input
                        className={courseFields('search-input')}
                        type="text"
                        value={searchHeaderValue}
                        name="searchHeaderValue"
                        placeholder={searchDocPlaceholder}
                        onChange={this.onChangeHeaderSearch}
                      />
                    </div>
                    {searchHeaderData.length > 0 && (
                      <div className={courseFields('search-block')}>
                        {(
                          searchHeaderData.map(({ header, id }) => (
                            <div
                              role="presentation"
                              className={
                                courseFields('search-block-item',
                                  { active: id === currentHeaderId })
                              }
                              key={id}
                              onClick={() => {
                                this.handleSearchFileByClickHeader(header);
                                setCurrentHeaderIdCourses({ id, header });
                              }}
                            >
                              {header}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <div className={courseFields()}>
                    <SelectAnyTime
                      status
                      className={courseFields('select')}
                      handleDataSave={this.handleHeaderRangeSave}
                    />
                  </div>
                  <div className={courseFields({ 'align-right': true })}>
                    <DefaultButton
                      textId="courses.searchBtn"
                      onClick={this.clickSearchHeader}
                    />
                  </div>
                  {currentHeaderId
                && (
                <div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.searchFilesLabel" />
                  </div>
                  <div className={courseFields('search')}>
                    <SearchSvg />
                    <input
                      className={courseFields('search-input')}
                      type="text"
                      value={searchFileValue}
                      name="searchFileValue"
                      placeholder={searchDocPlaceholder}
                      onChange={this.onChangeFileSearch}
                    />
                  </div>
                  {Boolean(rebuildedFoundedFiles.length) && (
                    <div className={courseFields('search-block')}>
                      {(
                        rebuildedFoundedFiles.map(({ name, id }) => (
                          <div
                            role="presentation"
                            className={
                              courseFields('search-block-item',
                                { active: id === currentFileId })
                            }
                            key={id}
                            onClick={() => this.handleClickFoundFiles(id)}
                          >
                            {name}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  <div className={courseFields()}>
                    <SelectAnyTime
                      status
                      className={courseFields('select')}
                      handleDataSave={this.handleFileDaterangeSave}
                    />
                  </div>
                  {currentFileId && (
                  <div className={courseFields({ 'align-right': true })}>
                    <DefaultButton
                      textId="courses.saveBtn"
                      onClick={this.handleSaveCurrentFile}
                    />
                  </div>
                  )}
                </div>
                )
                  }
                </div>
              </section>
              <section className={page('right')}>
                <div className={form('title')}>
                  <IntlMessages id="courses.uploadFile" />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.headerLabel" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={headerNameOfFile}
                    name="headerNameOfFile"
                    placeholder={searchDocPlaceholder}
                    onChange={this.changeInputName}
                    error={errors.headerNameOfFile}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.fileNameLabel" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={headerFileNameOfFile}
                    name="headerFileNameOfFile"
                    placeholder={fileNamePlaceholder}
                    onChange={this.changeInputName}
                    error={errors.headerFileNameOfFile}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.uploadFileLabel" />
                  </div>
                  <p className={courseFields('input-error')}>{errors.file}</p>
                  <DragAndDropAllTypes
                    numberUpload="1"
                    fileTypes={acceptedFileTypes}
                    handleDrop={this.handleAddFile}
                    handleAddFile={this.handleAddFile}
                  />
                </div>
                <div className={courseFields({ 'align-right': true })}>
                  <DefaultButton
                    onClick={this.clickSaveFile}
                    textId="courses.saveAttachedFileBtn"
                  />
                </div>
              </section>
            </section>
          </section>
        </CoursesAddFilesWrapper>
      );
    }
    return (
      <LayoutContent>
        <CoursesAddFilesWrapper>
          <Banner title={<IntlMessages id="courses.addFilesBanner" />} />
          <section className={page()}>
            <section className={form()}>
              <section className={page('left')}>
                <div className={form('title')}>
                  <IntlMessages id="courses.selectFile" />
                </div>
                <div className={courseFields()}>
                    <div className={courseFields('label')}>
                      <IntlMessages id="courses.searchHeaderLabel" />
                    </div>
                    <div className={courseFields('search')}>
                      <SearchSvg />
                      <input
                        className={courseFields('search-input')}
                        type="text"
                        value={searchHeaderValue}
                        name="searchHeaderValue"
                        placeholder={searchDocPlaceholder}
                        onChange={this.onChangeHeaderSearch}
                      />
                    </div>
                    {searchHeaderData.length > 0 && (
                      <div className={courseFields('search-block')}>
                        {(
                          searchHeaderData.map(({ header, id }) => (
                            <div
                              role="presentation"
                              className={
                                courseFields('search-block-item',
                                  { active: id === currentHeaderId })
                              }
                              key={id}
                              onClick={() => {
                                this.handleSearchFileByClickHeader(header);
                                setCurrentHeaderIdCourses({ id, header });
                              }}
                            >
                              {header}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                  <div className={courseFields()}>
                    <SelectAnyTime
                      status
                      className={courseFields('select')}
                      handleDataSave={this.handleHeaderRangeSave}
                    />
                  </div>
                  <div className={courseFields({ 'align-right': true })}>
                    <DefaultButton
                      onClick={this.clickSearchHeader}
                      textId="courses.searchBtn"
                    />
                  </div>
                  {currentHeaderId
                && (
                <div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.searchFilesLabel" />
                  </div>
                  <div className={courseFields('search')}>
                    <SearchSvg />
                    <input
                      className={courseFields('search-input')}
                      type="text"
                      value={searchFileValue}
                      name="searchFileValue"
                      placeholder={searchDocPlaceholder}
                      onChange={this.onChangeFileSearch}
                    />
                  </div>
                  {Boolean(rebuildedFoundedFiles.length) && (
                    <div className={courseFields('search-block')}>
                      {(
                        rebuildedFoundedFiles.map(({ name, id }) => (
                          <div
                            role="presentation"
                            className={
                              courseFields('search-block-item',
                                { active: id === currentFileId })
                            }
                            key={id}
                            onClick={() => this.handleClickFoundFiles(id)}
                          >
                            {name}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                  <div className={courseFields()}>
                    <SelectAnyTime
                      status
                      className={courseFields('select')}
                      handleDataSave={this.handleFileDaterangeSave}
                    />
                  </div>
                  {currentFileId && (
                  <div className={courseFields({ 'align-right': true })}>
                    <DefaultButton
                      onClick={this.handleSaveCurrentFile}
                      textId="courses.saveBtn"
                    />
                  </div>
                  )}
                </div>
                )
                  }
                  {attachedFindFilesByHeader && (
                    <div className={courseFields()}>
                      {Object.keys(attachedFindFilesByHeader).map(key => (
                        <div className={courseFields()} key={key}>
                          <div className={courseFields('label')}>
                            {`Header: ${key}`}
                          </div>
                          {attachedFindFilesByHeader[key].map(file => (
                            <div className={courseFields('attached-file')} key={file.id}>
                              <AttachedFile
                                file={file}
                                header={key}
                                onDownload={this.handleDownloadCurrentFile}
                                onDelete={removeAttachedFileCourses}
                                deleteFileOfCourse={this.handleDeleteFileOfCourse}
                                changeFileOfCourse={this.handleEditFileOfCourse}
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
              </section>
              <section className={page('right')}>
                <div className={form('title')}>
                  <IntlMessages id="courses.uploadFile" />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.headerLabel" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={headerNameOfFile}
                    name="headerNameOfFile"
                    placeholder={searchDocPlaceholder}
                    onChange={this.changeInputName}
                    error={errors.headerNameOfFile}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.fileNameLabel" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={headerFileNameOfFile}
                    name="headerFileNameOfFile"
                    placeholder={fileNamePlaceholder}
                    onChange={this.changeInputName}
                    error={errors.headerFileNameOfFile}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.uploadFileLabel" />
                  </div>
                  <p className={courseFields('input-error')}>{errors.file}</p>
                  <DragAndDropAllTypes
                    numberUpload="1"
                    fileTypes={acceptedFileTypes}
                    handleDrop={this.handleAddFile}
                    handleAddFile={this.handleAddFile}
                  />
                </div>
                <div className={courseFields({ 'align-right': true })}>
                  <DefaultButton
                    onClick={this.clickSaveFile}
                    textId="courses.saveAttachedFileBtn"
                  />
                </div>
                {Object.keys(uploadedFilesByHeader).length > 0 && (
                  <div className={courseFields('label', { blue: true })}>
                    <IntlMessages id="courses.uploadedFilesLabel" />
                  </div>
                )}
                {Object.keys(uploadedFilesByHeader).map(key => (
                  <div className={courseFields()} key={key}>
                    <div className={courseFields('label')}>
                      {`Header: ${key}`}
                    </div>
                    {uploadedFilesByHeader[key].map(file => (
                      <div className={courseFields('attached-file')} key={file.id}>
                        <AttachedFile
                          file={file}
                          header={key}
                          onDownload={this.handleDownloadCurrentFile}
                          onDelete={id => this.handleDeleteFileOfCourse(id)}
                          deleteFileOfCourse={this.handleDeleteFileOfCourse}
                          changeFileOfCourse={this.handleEditFileOfCourse}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            </section>
            <div className={form('submit')}>
              <div className={form('submit-button')}>
                <DefaultButton
                  onClick={this.handleSave}
                  textId="courses.saveBtn"
                />
              </div>
              <DefaultButton
                onClick={this.handleCancel}
                textId="courses.cancelBtn"
              />
            </div>
          </section>
        </CoursesAddFilesWrapper>
      </LayoutContent>
    );
  }
}

CoursesAddFiles.propTypes = propTypes;
CoursesAddFiles.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const searchHeaderData = getSearchHeaderDataFp(state);
  const currentHeader = getCurrentHeaderFp(state);
  const searchFilesByNameData = getSearchFilesByNameDataFp(state);
  const currentFileId = getCurrentFileIdFp(state);
  const attachedFiles = getAttachedFilesFp(state);
  const headerName = getHeaderNameFp(state);
  const fileName = getFileNameFp(state);
  const uploadedFiles = getUploadedFilesFp(state);
  const attachedUploadFiles = getAttachedUploadFilesFp(state);
  const { selectedFiles } = state.courses;
  const { pathname } = location;
  const currentResetUrl = pathname && pathname.replace(getUrlBeforeAddFile, '');

  return {
    searchHeaderData,
    currentHeader,
    searchFilesByNameData,
    currentFileId,
    attachedFiles,
    headerName,
    fileName,
    uploadedFiles,
    attachedUploadFiles,
    currentResetUrl,
    selectedFiles,
  };
};

export default connect(mapStateToProps, { ...coursesActions })(CoursesAddFiles);
