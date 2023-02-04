import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import coursesActions from 'redux/courses/actions';
import URLS from 'redux/urls';
import {
  getCurrentCourseFp,
  getFilteredCertificatesFp,
  getSearchTutorsDataFp,
  getCurrentCertIdFp,
  getCurrentTutorIdFp,
  getAttachedTutorsFp,
  getCertificateTemplateFp,
  getWelcomeEmailTemplateFp,
  getWelcomeLetterTemplateFp,
  getAttachedFilesFp,
  getAttachedUploadFilesFp,
  getStatusCourseCreatedFp,
  getErrorCourseCreatedFp,
  getSearchTopicsFp,
  getTopicErrorFp,
  getselectedExistsTopicFp,
  getselectedNewTopicFp,
  getCurrentTopicFp,
  getStatusSetInitialPropsFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { Switch, Radio } from 'antd';
import {
  Banner,
  SelectAnyTime,
  DragAndDropAllTypes,
  SearchSvg,
  ListItem,
  BannerNotification,
  AttachedTopic,
  TextFormat,
  CustomTextInput,
  CustomSelect,
  Checkbox,
  UploadDragAndDropCrop,
} from 'components';
import {
  bemlds,
  returnNumberOfLang,
  generateFormDataWithTranslationsCourses,
  getLanguage,
} from 'utils';
import { PLACEHOLDER } from 'constants/constants';
import { COURSE_FORM_SCHEMA } from '../../../../constants/validationShema/index';
import CoursesCreateWrapper from './coursesCreate.style';
import { INPUTS_TIME_OPTIONS } from '../../../../constants/inputs';
import { COURSE_STATUSES } from '../../../../constants/constants';

const maxSymbolsLengthShortDesc = 150;

const {
  courseNamePlaceholder,
  searchCertPlaceholder,
  searchTutorPlaceholder,
  searchLessonPlaceholder,
  addNewLessonPlaceholder,
  coursePricePlaceholder,
  senerEmailPlaceholder,
  senderNamePlaceholder,
} = PLACEHOLDER;

const defaultProps = {
  currentCourse: {
    status: '',
    title: '',
    language: null,
    id: 0,
    translations: [],
    accessTime: '',
    timeToComplete: '',
    certificateTemplate: null,
    certificateTemplateURL: '',
    welcomeEmailTemplate: null,
    welcomeEmailTemplateURL: '',
    welcomeLetterTemplate: null,
    welcomeLetterTemplateURL: '',
    courseTopics: [],
    time: {
      complete: '',
      access: '',
    },
  },
  filteredCertificates: [],
  searchTutorsData: [],
  attachedTutors: [],
  currentCertId: null,
  currentTutorId: null,
  searchCertCourses: null,
  createCourse: null,
  searchTutorCourses: null,
  saveInputValueCourse: null,
  createInputLang: null,
  createDescriptionCourses: null,
  createWelcomeEmailCourses: null,
  createWelcomeLetterCourses: null,
  filterCertificatesCourses: null,
  setCurrentTutorIdCourses: null,
  attachTutorCourses: null,
  setCurrentCertIdCourses: null,
  removeAttachedTutorCourses: null,
  uploadTemplateFileToCourse: null,
  attachedFiles: [],
  attachedUploadFiles: [],
  removeAttachedFileToCourse: null,
  isCourseCreated: false,
  errorCourseCreated: '',
  searchTopicData: [],
  searchTopicCourses: null,
  setCurrentExistTopic: null,
  setCurrentNewTopic: null,
  topicError: '',
  selectedExistsTopics: [],
  selectedNewTopics: [],
  deleteTopicFromSelected: null,
  history: {
    push: null,
  },
  currentTopic: {
    id: null,
    name: '',
  },
  isSetInitialProps: true,
  setInitialPropsCourses: null,
  toggleStatusSetInitialProps: null,
  clearTranslationInputByName: null,
  createTopic: null,
  courseStage: 1,
  updateCourse: () => null,
  deleteFileOfCourse: () => null,
  isPublished: false,
  isUpdated: false,
  clearNotificationsStatus: () => null,
  publishCourse: () => null,
  searchCertData: [],
  changeInfoCourse: () => null,
  getCategoriesList: () => null,
  categories: [],
  selectCategory: () => null,
  clearSearchTopicData: () => null,
};

const propTypes = {
  currentCourse: PropTypes.shape({
    status: PropTypes.string,
    id: PropTypes.number,
    title: PropTypes.string,
    language: PropTypes.number,
    description: PropTypes.string,
    welcomeEmail: PropTypes.string,
    accessTime: PropTypes.string,
    timeToComplete: PropTypes.string,
    welcomeLetter: PropTypes.string,
    certificateTemplate: PropTypes.shape({}),
    certificateTemplateURL: PropTypes.string,
    welcomeEmailTemplate: PropTypes.shape({}),
    welcomeEmailTemplateURL: PropTypes.string,
    welcomeLetterTemplate: PropTypes.shape({}),
    welcomeLetterTemplateURL: PropTypes.string,
    courseTopics: PropTypes.arrayOf(PropTypes.object),
    time: PropTypes.shape({
      complete: PropTypes.string,
      access: PropTypes.string,
    }),
    translations: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  filteredCertificates: PropTypes.arrayOf(PropTypes.object),
  searchTutorsData: PropTypes.arrayOf(PropTypes.object),
  attachedTutors: PropTypes.arrayOf(PropTypes.object),
  currentCertId: PropTypes.number,
  currentTutorId: PropTypes.number,
  searchCertCourses: PropTypes.func,
  createCourse: PropTypes.func,
  searchTutorCourses: PropTypes.func,
  saveInputValueCourse: PropTypes.func,
  createInputLang: PropTypes.func,
  createDescriptionCourses: PropTypes.func,
  createWelcomeEmailCourses: PropTypes.func,
  createWelcomeLetterCourses: PropTypes.func,
  filterCertificatesCourses: PropTypes.func,
  setCurrentTutorIdCourses: PropTypes.func,
  attachTutorCourses: PropTypes.func,
  setCurrentCertIdCourses: PropTypes.func,
  removeAttachedTutorCourses: PropTypes.func,
  uploadTemplateFileToCourse: PropTypes.func,
  attachedFiles: PropTypes.arrayOf(PropTypes.object),
  attachedUploadFiles: PropTypes.arrayOf(PropTypes.object),
  removeAttachedFileToCourse: PropTypes.func,
  isCourseCreated: PropTypes.bool,
  errorCourseCreated: PropTypes.string,
  searchTopicData: PropTypes.arrayOf(PropTypes.object),
  searchTopicCourses: PropTypes.func,
  setCurrentExistTopic: PropTypes.func,
  setCurrentNewTopic: PropTypes.func,
  topicError: PropTypes.string,
  selectedExistsTopics: PropTypes.arrayOf(PropTypes.object),
  selectedNewTopics: PropTypes.arrayOf(PropTypes.object),
  deleteTopicFromSelected: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  currentTopic: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  isSetInitialProps: PropTypes.bool,
  setInitialPropsCourses: PropTypes.func,
  toggleStatusSetInitialProps: PropTypes.func,
  clearTranslationInputByName: PropTypes.func,
  createTopic: PropTypes.func,
  courseStage: PropTypes.number,
  updateCourse: PropTypes.func,
  deleteFileOfCourse: PropTypes.func,
  isPublished: PropTypes.bool,
  isUpdated: PropTypes.bool,
  clearNotificationsStatus: PropTypes.func,
  publishCourse: PropTypes.func,
  searchCertData: PropTypes.arrayOf(PropTypes.shape({})),
  changeInfoCourse: PropTypes.func,
  getCategoriesList: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    selected: PropTypes.bool,
  })),
  selectCategory: PropTypes.func,
  clearSearchTopicData: PropTypes.func,
};

const page = bemlds('page');
const form = bemlds('form');
const topic = bemlds('topic');
const courseFields = bemlds('course-fields');
const profile = bemlds('profile-image');

const acceptedFileTypes = [
  'hbs',
];

const onlyNumbers = val => val.replace(/[^0-9.]/g, '');

class CoursesCreate extends Component {
  textFormatInstances = {};

  constructor(props) {
    const {
      searchTutorCourses,
      searchTopicCourses,
    } = props;
    super(props);
    this.state = {
      searchCertValue: '',
      searchTutorsValue: '',
      searchTopicValue: '',
      addTopicValue: '',
      isTutor: true,
      welcomeLetter: 'template',
      welcomeEmail: 'template',
      certificate: 'search',
      errors: {
        title: '',
        accessTime: '',
        timeToComplete: '',
        senderName: '',
        senderEmail: '',
      },
      isErrors: false,
      translations: props.currentCourse.translations,
    };

    this.searchTutorDebounce = _.debounce(searchTutorCourses, 350);
    this.searchTopicDebounce = _.debounce(searchTopicCourses, 350);
  }

  componentDidMount() {
    const {
      searchCertCourses,
      setInitialPropsCourses,
      match: {
        params: {
          courseId,
        },
      },
      history: {
        location: {
          state,
        },
      },
      getCourseById,
      getCategoriesList,
    } = this.props;
    searchCertCourses();
    const { notClear } = state || {};
    if (!courseId) {
      getCategoriesList();
    }
    if (courseId) {
      getCourseById(courseId);
    }
    if (!notClear && !courseId) {
      setInitialPropsCourses();
    }
  }

  componentDidUpdate(prevProps) {
    const { currentCourse: prevCurrentCourse } = prevProps;
    const { currentCourse } = this.props;

    if (currentCourse.id !== prevCurrentCourse.id) {
      if (currentCourse.welcomeEmailTemplateURL) this.setState({ welcomeEmail: 'template' });
      if (currentCourse.welcomeLetterTemplateURL) this.setState({ welcomeLetter: 'template' });
      if (this.props.currentCourse.translations !== this.state.translations) {
        this.setState((state, props) => ({
          translations: props.currentCourse.translations,
        }));
      }
    }
  }

  componentWillUnmount() {
    const { setInitialPropsCourses, history } = this.props;
    const { state } = history.location;
    if (!state || !state.lastAddress) {
      setInitialPropsCourses();
    }
  }

  validationAction = (name, value) => {
    const { errors } = this.state;
    COURSE_FORM_SCHEMA.validateAt(name, { [name]: value })
      .then(() => {
        const newErrors = {
          ...errors,
          [name]: '',
        };
        const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
        this.setState({
          errors: newErrors,
          isErrors,
        });
      })
      .catch((e) => {
        const newErrors = {
          ...errors,
          [name]: e.message,
        };
        const isErrors = Object.values(newErrors).some(item => item);
        this.setState({
          errors: newErrors,
          isErrors,
        });
      });
  }

  onBlurValidation = ({ target: { name, value } }) => {
    this.validationAction(name, value);
  }

  handleSaveCreatedCourse = () => {
    const {
      currentCourse,
      createCourse,
      currentCertId,
      attachedTutors,
      attachedFiles,
      attachedUploadFiles,
      courseStage,
      updateCourse,
      selectedExistsTopics,
      categories,
    } = this.props;

    const {
      isErrors,
      errors,
      welcomeLetter,
      certificate,
      welcomeEmail,
    } = this.state;

    const {
      title,
      language,
      accessTime,
      timeToComplete,
      certificateTemplate,
      certificateTemplateURL,
      welcomeEmailTemplate,
      welcomeEmailTemplateURL,
      welcomeLetterTemplateURL,
      welcomeLetterTemplate,
      translations,
      id: courseId,
      hasPhysical,
      isStepByStepTopics,
      price,
      senderEmail,
      senderName,
      isCertified,
      isOrderable,
      imageUri,
      file,
    } = currentCourse;

    const isSecondStage = courseStage === 2;
    if (isErrors) {
      return;
    }

    const requiredFields = [{
      name: 'title',
      value: title,
    }, {
      name: 'accessTime',
      value: accessTime,
    }, {
      name: 'timeToComplete',
      value: timeToComplete,
    }];

    const emptyFields = requiredFields.map((item) => {
      if (!item.value) {
        return item.name;
      }

      return '';
    }).filter(Boolean);

    if (emptyFields.length) {
      const errorsState = emptyFields.reduce((acc, item) => ({
        ...acc,
        [item]: 'This field is required',
      }), {});
      const newErrors = {
        ...errors,
        ...errorsState,
      };
      this.setState({
        errors: newErrors,
      });
      return;
    }

    const attachedAllFiles = _.concat(attachedFiles, attachedUploadFiles);
    const attachedFilesId = attachedAllFiles.map(({ id }) => id);
    const tutorsId = attachedTutors.map(({ id }) => id);
    const formData = new FormData();
    const selectedCategories = categories.reduce((acc, item) => {
      if (item.selected) {
        return [...acc, item.id];
      }

      return acc;
    }, []);
    formData.append('title', title);
    formData.append('language', language.id || language);
    if (certificate === 'template') {
      if (certificateTemplate) {
        formData.append('certificateTemplate', certificateTemplate);
      }
      if (certificateTemplateURL) {
        formData.append('certificateTemplateURL', certificateTemplateURL);
      }
    } else if (currentCertId) {
      formData.append('certificate', currentCertId);
    }
    if (imageUri) {
      formData.append('imageUri', imageUri);
    } else if (file) {
      formData.append('imageFile', file);
    }
    generateFormDataWithTranslationsCourses(
      formData,
      translations,
      welcomeEmail,
      welcomeLetter,
      welcomeEmailTemplate,
      welcomeEmailTemplateURL,
      welcomeLetterTemplate,
      welcomeLetterTemplateURL,
    );
    formData.append('isCertified', isCertified);
    formData.append('isOrderable', isOrderable);
    formData.append('accessTime', accessTime || accessTime);
    formData.append('timeToComplete', timeToComplete || timeToComplete);
    formData.append('tutorIds', JSON.stringify(tutorsId));
    formData.append('categoriesIds', JSON.stringify(selectedCategories));
    formData.append('fileIds', JSON.stringify(attachedFilesId));
    formData.append('isStepByStepTopics', isStepByStepTopics);
    if (senderName) {
      formData.append('senderName', senderName);
    }
    if (senderEmail) {
      formData.append('senderEmail', senderEmail);
    }
    if (price) {
      formData.append('price', price);
    }
    formData.append('hasPhysical', hasPhysical);

    if (isSecondStage || courseId) {
      const topics = selectedExistsTopics.map(item => item.id);
      topics.forEach((item, i) => {
        formData.append(`topics[${i}]`, item);
      });
      formData.append('id', courseId);
      updateCourse(formData);
      return;
    }
    createCourse(formData);
  };

  handleChangeAccessTime = (value) => {
    const { saveInputValueCourse } = this.props;
    saveInputValueCourse({ name: 'accessTime', value });
  };

  handleChangeTimeToComplete = (value) => {
    const { saveInputValueCourse } = this.props;
    saveInputValueCourse({ name: 'timeToComplete', value });
  };

  changeInput = ({ target }) => {
    const { saveInputValueCourse } = this.props;
    saveInputValueCourse(target);
  };

  handleChangeCheckBox = (value, name) => {
    const { saveInputValueCourse } = this.props;
    saveInputValueCourse({ value, name });
  }

  handleChangePriceInput = ({ target }) => {
    const { name, value } = target;
    const { saveInputValueCourse } = this.props;
    const numbersValue = onlyNumbers(value);
    saveInputValueCourse({ name, value: numbersValue });
  };

  handleLangSave = (value) => {
    const { createInputLang } = this.props;
    createInputLang(returnNumberOfLang(value));
  };

  handleChangeDescription = (value, name, lang) => {
    const { createDescriptionCourses } = this.props;
    createDescriptionCourses(value, name, lang);
  };

  handleChangeWelcomeEmail = (value) => {
    const { createWelcomeEmailCourses } = this.props;
    createWelcomeEmailCourses(value);
  };

  handleChangeWelcomeLetter = (value) => {
    const { createWelcomeLetterCourses } = this.props;
    createWelcomeLetterCourses(value);
  };

  onChangeCertSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    const { filterCertificatesCourses } = this.props;
    filterCertificatesCourses(value);
  };

  onChangeTopicSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    if (!value.trim()) return;
    const queryString = `name=${value.trim()}`;
    this.searchTopicDebounce(queryString);
  };

  onChangeTopicAdd = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  onChangeTutorSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
    if (!value.trim()) return;
    const queryString = `search=${value.trim()}`;
    this.searchTutorDebounce(queryString);
  };

  handleAddCertFile = (certificateTemplate) => {
    const { uploadTemplateFileToCourse } = this.props;
    uploadTemplateFileToCourse({
      name: 'certificateTemplate',
      file: certificateTemplate,
    });
  };

  handleAddEmailFile = (welcomeEmailTemplate) => {
    const { uploadTemplateFileToCourse } = this.props;
    uploadTemplateFileToCourse({
      name: 'welcomeEmailTemplate',
      file: welcomeEmailTemplate,
    });
  };

  handleAddWelcomeLetterFile = (welcomeLetterTemplate) => {
    const { uploadTemplateFileToCourse } = this.props;
    uploadTemplateFileToCourse({
      name: 'welcomeLetterTemplate',
      file: welcomeLetterTemplate,
    });
  };

  onChangeTutorSwitch = (isChecked) => {
    this.setState({ isTutor: isChecked });
  };

  handleChangePhysicalMaterials = (isChecked) => {
    const { toggleCoursePhysicalMaterials } = this.props;
    toggleCoursePhysicalMaterials(isChecked);
  }

  handleChangeIsTutors = (isChecked) => {
    const { toggleTutors } = this.props;
    toggleTutors(isChecked);
  }

  selectTutorCourses = (id) => {
    const {
      setCurrentTutorIdCourses,
      attachTutorCourses,
    } = this.props;
    setCurrentTutorIdCourses(id);
    attachTutorCourses(id);
    const queryString = `search=${null}`;
    this.searchTutorDebounce(queryString);
  };

  handleDeleteSelectedTopic = (id) => {
    const { deleteTopicFromSelected } = this.props;
    deleteTopicFromSelected(id);
  };

  handleEditCurrentTopic = (id) => {
    const { history, location } = this.props;
    history.push(URLS.coursesEditTopic(id), { lastAddress: location.pathname });
  };

  handleChangeViewType = ({ target: { value } }, name) => {
    const { uploadTemplateFileToCourse } = this.props;
    this.setState({
      [name]: value,
    });

    if (name === 'certificate') {
      uploadTemplateFileToCourse({
        name: `${name}Template`,
        file: null,
      });
      this.handleDeleteCurrentCertificate();
    }
  }

  clearSearchTopic = () => {
    this.setState({ searchTopicValue: '' });
    const queryString = `name=${null}`;
    this.searchTopicDebounce(queryString);
  }

  handleClickOnFoundedTopic = (id, name, rowId) => {
    const {
      setCurrentExistTopic, createTopic, currentCourse, clearSearchTopicData,
    } = this.props;
    const { id: courseId } = currentCourse;

    setCurrentExistTopic(id, name, rowId);
    const body = {
      name,
      courseId,
      id,
    };

    createTopic(body);
    this.clearSearchTopic();
    clearSearchTopicData();
  }

  handleSaveNewTopic = () => {
    const { currentCourse, createTopic } = this.props;
    const { addTopicValue } = this.state;
    const { id } = currentCourse;
    const body = {
      name: addTopicValue,
      courseId: id,
    };
    createTopic(body);
    this.setState({ addTopicValue: '' });
  }

  handleAddFiles = (e, disalbed) => {
    if (disalbed) {
      e.preventDefault();
    }
  }

  handlePublishCourse = () => {
    const { publishCourse, currentCourse: { id, status } } = this.props;
    const courseStatus = status !== COURSE_STATUSES.published
      ? COURSE_STATUSES.published
      : COURSE_STATUSES.unpublished;

    publishCourse(courseStatus, id);
  }

  handleCloseNotification = (type) => {
    const { clearNotificationsStatus } = this.props;
    clearNotificationsStatus(type);
  }

  handleDeleteCurrentCertificate = () => {
    const { setCurrentCertIdCourses } = this.props;
    setCurrentCertIdCourses(null);
  }

  handleClickOnCertificate = (id) => {
    const { setCurrentCertIdCourses, filterCertificatesCourses } = this.props;
    setCurrentCertIdCourses(id);
    filterCertificatesCourses(null);
  }

  handleChangeStepByStepTopics = (isCheked) => {
    const { changeInfoCourse } = this.props;
    changeInfoCourse('isStepByStepTopics', isCheked);
  }

  handleChangeCheckboxCategories = (value, name) => {
    const { selectCategory } = this.props;
    selectCategory(name);
  }

  handleDrop = files => null;

  handleAddFile = files => null;

  handleCropFile = (file) => {
    const { saveInputValueCourse } = this.props;
    saveInputValueCourse({ name: 'file', value: file });
    saveInputValueCourse({ name: 'imageUri', value: null });
  };

  render() {
    const {
      searchCertValue,
      searchTutorsValue,
      searchTopicValue,
      addTopicValue,
      welcomeLetter,
      welcomeEmail,
      certificate,
      errors,
    } = this.state;

    const {
      currentCourse,
      currentCertId,
      currentTutorId,
      filteredCertificates,
      searchTutorsData,
      attachedTutors,
      removeAttachedTutorCourses,
      deleteFileOfCourse,
      attachedFiles,
      attachedUploadFiles,
      isCourseCreated,
      errorCourseCreated,
      searchTopicData,
      topicError,
      selectedExistsTopics,
      selectedNewTopics,
      courseStage,
      currentTopic,
      isPublished,
      isUpdated,
      isLessonUpdate,
      searchCertData,
      categories,
      history,
    } = this.props;

    const {
      title,
      language,
      accessTime,
      timeToComplete,
      id: courseId,
      status,
      hasPhysical,
      isStepByStepTopics,
      price,
      senderName,
      senderEmail,
      isTutor,
      welcomeEmailTemplateURL,
      welcomeLetterTemplateURL,
      certificateTemplateURL,
      welcomeEmailTemplate,
      welcomeLetterTemplate,
      certificateTemplate,
      isCertified,
      isOrderable,
      imageUri,
    } = currentCourse;

    const { translations } = this.state;

    const attachedAllFiles = _.concat(attachedFiles, attachedUploadFiles);
    const selectedTopics = _.concat(selectedExistsTopics, selectedNewTopics);
    const isWelcomeLetterTemplate = welcomeLetter === 'template';
    const isWelcomeEmailTemplate = welcomeEmail === 'template';
    const isCertificateTemplate = certificate === 'template';
    const isSecondStage = courseStage === 2;
    const isCoursePublished = status === 'published';
    const btnName = currentCourse.status === COURSE_STATUSES.published ? 'courses.unpublishBtn' : 'courses.publishBtn';

    const currentCertificate = searchCertData.find(item => item.id === currentCertId);
    const showFilteredCertificates = !isSecondStage
      && !isCertificateTemplate
      && filteredCertificates
      && filteredCertificates.length > 0;
    const bannerName = `courses.${history.location.pathname === '/courses/create' ? 'createBanner' : 'editBanner'}`;

    return (
      <LayoutContent>
        <CoursesCreateWrapper>
          <Banner title={<IntlMessages id={bannerName} />} />
          {isPublished && (
            <BannerNotification
              error={false}
              isScrollMount={isPublished}
              title={(
                <IntlMessages
                  id={isCoursePublished ? 'courses.successPublished' : 'courses.successUnpublished'}
                />
              )}
              close={() => this.handleCloseNotification('isCoursePublished')}
            />
          )}
          {isUpdated && (
            <BannerNotification
              error={false}
              isScrollMount={isUpdated}
              title={<IntlMessages id="courses.successUpdated" />}
              close={() => this.handleCloseNotification('isCourseUpdated')}
            />
          )}
          {isCourseCreated && (
            <BannerNotification
              error={false}
              isScrollMount={isCourseCreated}
              title={<IntlMessages id="courses.successSave" />}
              close={() => this.handleCloseNotification('isCourseCreated')}
            />
          )}
          {errorCourseCreated && (
            <BannerNotification
              error
              title={errorCourseCreated}
              isScrollMount={Boolean(errorCourseCreated)}
              close={() => this.handleCloseNotification('errorCourseCreated')}
            />
          )}
          {isLessonUpdate && (
            <BannerNotification
              error={false}
              isScrollMount={isLessonUpdate}
              title={<IntlMessages id="lessons.addLesson" />}
              close={() => this.handleCloseNotification('isLessonUpdated')}
            />
          )}
          <section className={page()}>
            <section className={form()}>
              <section className={page('left')}>
                <div className={form('title')}>
                  <IntlMessages id={bannerName} />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.titleLabel" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={title}
                    name="title"
                    placeholder={courseNamePlaceholder}
                    onChange={this.changeInput}
                    error={errors.title}
                    onBlur={this.onBlurValidation}
                    disabled={isSecondStage}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="course.price" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={price}
                    name="price"
                    placeholder={coursePricePlaceholder}
                    onChange={this.handleChangePriceInput}
                    disabled={isSecondStage}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.languageLabel" />
                  </div>
                  <SelectAnyTime
                    language={language}
                    status={false}
                    className={courseFields('select')}
                    handleDataSave={this.handleLangSave}
                    disabled={isSecondStage}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.descriptionLabel" />
                  </div>
                  <TextFormat
                    saveDescription={this.handleChangeDescription}
                    translations={translations}
                    name="description"
                    link={this.textFormatInstances}
                    disabled={isSecondStage}
                    isShow
                    isDisableLanguage
                    languageProvider={getLanguage(language)}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.shortdescriptionLabel" />
                  </div>
                  <TextFormat
                    saveDescription={this.handleChangeDescription}
                    translations={translations}
                    name="descriptionShort"
                    link={this.textFormatInstances}
                    disabled={isSecondStage}
                    isDisableLanguage
                    maxLength={maxSymbolsLengthShortDesc}
                    languageProvider={getLanguage(language)}
                    isShow
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.systemRequirements" />
                  </div>
                  <TextFormat
                    saveDescription={this.handleChangeDescription}
                    translations={translations}
                    name="systemRequirements"
                    link={this.textFormatInstances}
                    disabled={isSecondStage}
                    isShow
                    isDisableLanguage
                    languageProvider={getLanguage(language)}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.certificateLabel" />
                  </div>
                  <Radio.Group
                    onChange={e => this.handleChangeViewType(e, 'certificate')}
                    value={certificate}
                    disabled={isSecondStage}
                  >
                    <Radio value="template"><IntlMessages id="courses.certificateAddTemplae" /></Radio>
                    <Radio value="search"><IntlMessages id="courses.certificateSearch" /></Radio>
                  </Radio.Group>
                  {!isCertificateTemplate && (
                  <div className={courseFields('search')}>
                    <SearchSvg />
                    <input
                      className={courseFields('search-input')}
                      type="text"
                      value={searchCertValue}
                      name="searchCertValue"
                      placeholder={searchCertPlaceholder}
                      onChange={this.onChangeCertSearch}
                    />
                  </div>
                  )}
                  {showFilteredCertificates && (
                  <div>
                    <div className={courseFields('search-block')}>
                      {(
                            filteredCertificates.map(({ originalName, id }) => (
                              <div
                                role="presentation"
                                className={courseFields('search-block-item', { active: id === currentCertId })}
                                key={id}
                                onClick={() => this.handleClickOnCertificate(id)}
                              >
                                {originalName}
                              </div>
                            ))
                          )}
                    </div>
                  </div>
                  )}
                  {!isCertificateTemplate && currentCertificate && (
                  <div className={courseFields('selected-certificate')}>
                    <ListItem
                      onDelete={this.handleDeleteCurrentCertificate}
                      name={currentCertificate.originalName}
                      id={currentCertificate.id}
                      disabled={isSecondStage}
                    />
                  </div>
                  )}
                </div>
                {isCertificateTemplate && (
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.uploadCertificateLabel" />
                  </div>
                  <DragAndDropAllTypes
                    files={certificateTemplate}
                    numberUpload="1"
                    fileTypes={acceptedFileTypes}
                    handleDrop={this.handleAddCertFile}
                    handleAddFile={this.handleAddCertFile}
                    isClosePreview
                    disabled={isSecondStage}
                    uploadedFileURL={certificateTemplateURL}
                    isCourseCreating
                  />
                </div>
                )}
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.senderName" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={senderName}
                    name="senderName"
                    placeholder={senderNamePlaceholder}
                    onChange={this.changeInput}
                    disabled={isSecondStage}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.senderEmail" />
                  </div>
                  <CustomTextInput
                    className={courseFields('input')}
                    type="text"
                    value={senderEmail}
                    name="senderEmail"
                    placeholder={senerEmailPlaceholder}
                    onChange={this.changeInput}
                    disabled={isSecondStage}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.welcomeEmailLabel" />
                  </div>
                  <div className={courseFields('radio-buttons')}>
                    <Radio.Group
                      onChange={e => this.handleChangeViewType(e, 'welcomeEmail')}
                      value={welcomeEmail}
                      disabled={isSecondStage}
                    >
                      <Radio value="template"><IntlMessages id="courses.welcomeEmailTemplate" /></Radio>
                      <Radio value="text"><IntlMessages id="courses.welcomeEmailText" /></Radio>
                    </Radio.Group>
                  </div>
                  <TextFormat
                    saveDescription={this.handleChangeDescription}
                    translations={translations}
                    name="welcomeEmail"
                    link={this.textFormatInstances}
                    disabled={isSecondStage}
                    setRadio={this.handleChangeViewType}
                    isShow={!isWelcomeEmailTemplate}
                    withDeleteFunction
                    isDisableLanguage
                    languageProvider={getLanguage(language)}
                  />
                </div>
                {isWelcomeEmailTemplate && (
                  <div className={courseFields()}>
                    <div className={courseFields('label', { show: isWelcomeEmailTemplate })}>
                      <IntlMessages id="courses.uploadEmailLabel" />
                    </div>
                    <DragAndDropAllTypes
                      files={welcomeEmailTemplate}
                      numberUpload="2"
                      fileTypes={acceptedFileTypes}
                      handleDrop={this.handleAddEmailFile}
                      handleAddFile={this.handleAddEmailFile}
                      disabled={isSecondStage}
                      uploadedFileURL={welcomeEmailTemplateURL}
                      isCourseCreating
                      isClosePreview
                    />
                  </div>
                )}
              </section>
              <section className={page('right')}>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.accessTimeLabel" />
                    <p className={courseFields('hint')}>
                      <IntlMessages id="courses.accessTimeHint" />
                    </p>
                  </div>
                  <CustomSelect
                    options={INPUTS_TIME_OPTIONS}
                    handleChange={this.handleChangeAccessTime}
                    value={accessTime}
                  />
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.timeToCompleteLabel" />
                    <p className={courseFields('hint')}>
                      <IntlMessages id="courses.timeToCompleteHint" />
                    </p>
                  </div>
                  <CustomSelect
                    options={INPUTS_TIME_OPTIONS}
                    handleChange={this.handleChangeTimeToComplete}
                    value={timeToComplete}
                  />
                </div>
                <div className={profile()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.courseImage" />
                  </div>
                  <div className={page('drag-and-drop')}>
                    <UploadDragAndDropCrop
                      removeDownloadLink={() => null}
                      imageUrl={imageUri}
                      handleDrop={this.handleDrop}
                      handleAddFile={this.handleAddFile}
                      handleCropFile={this.handleCropFile}
                      isUpload="false"
                    />
                  </div>
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.welcomeLetterLabel" />
                  </div>
                  <div className={courseFields('radio-buttons')}>
                    <Radio.Group
                      onChange={e => this.handleChangeViewType(e, 'welcomeLetter')}
                      value={welcomeLetter}
                      disabled={isSecondStage}
                    >
                      <Radio value="template"><IntlMessages id="courses.welcomeLetterTemplate" /></Radio>
                      <Radio value="text"><IntlMessages id="courses.welcomeLetterText" /></Radio>
                    </Radio.Group>
                  </div>
                  <TextFormat
                    saveDescription={this.handleChangeDescription}
                    translations={translations}
                    name="welcomeLetter"
                    link={this.textFormatInstances}
                    disabled={isSecondStage}
                    setRadio={this.handleChangeViewType}
                    isShow={!isWelcomeLetterTemplate}
                    withDeleteFunction
                    isDisableLanguage
                    languageProvider={getLanguage(language)}
                  />
                </div>
                {isWelcomeLetterTemplate && (
                  <div className={courseFields()}>
                    <div className={courseFields('label', { show: isWelcomeLetterTemplate })}>
                      <IntlMessages id="courses.uploadWelcomeLetterLabel" />
                    </div>
                    <DragAndDropAllTypes
                      files={welcomeLetterTemplate}
                      numberUpload="3"
                      fileTypes={acceptedFileTypes}
                      handleDrop={this.handleAddWelcomeLetterFile}
                      handleAddFile={this.handleAddWelcomeLetterFile}
                      disabled={isSecondStage}
                      uploadedFileURL={welcomeLetterTemplateURL}
                      isCourseCreating
                      isClosePreview
                    />
                  </div>
                )}
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.certified" />
                  </div>
                  <div className={courseFields('switch')}>
                    <Checkbox
                      handleCheck={this.handleChangeCheckBox}
                      name="isCertified"
                      value={isCertified}
                      title={<IntlMessages id="courses.certified" />}
                    />
                  </div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.orderable" />
                  </div>
                  <div className={courseFields('switch')}>
                    <Checkbox
                      handleCheck={this.handleChangeCheckBox}
                      name="isOrderable"
                      value={isOrderable}
                      title={<IntlMessages id="courses.orderable" />}
                    />
                  </div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.stepByStepTopicsLabel" />
                  </div>
                  <div className={courseFields('switch')}>
                    <Switch
                      disabled={isSecondStage}
                      checked={isStepByStepTopics}
                      onChange={this.handleChangeStepByStepTopics}
                    />
                    <div className={courseFields('switch-label')}>
                      {isStepByStepTopics
                        ? <IntlMessages id="courses.yesWord" />
                        : <IntlMessages id="courses.noWord" />
                      }
                    </div>
                  </div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.physical" />
                  </div>
                  <div className={courseFields('switch')}>
                    <Switch
                      disabled={isSecondStage}
                      checked={hasPhysical}
                      onChange={this.handleChangePhysicalMaterials}
                    />
                    <div className={courseFields('switch-label')}>
                      {hasPhysical ? <IntlMessages id="courses.yesWord" />
                        : <IntlMessages id="courses.noWord" />}
                    </div>
                  </div>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.tutorLabel" />
                  </div>
                  <div className={courseFields('switch')}>
                    <Switch
                      disabled={isSecondStage}
                      checked={isTutor}
                      onChange={this.handleChangeIsTutors}
                    />
                    <div className={courseFields('switch-label')}>
                      {isTutor ? <IntlMessages id="courses.yesWord" />
                        : <IntlMessages id="courses.noWord" />}
                    </div>
                  </div>
                </div>
                {isTutor && (
                  <div className={courseFields()}>
                    <div className={courseFields('label')}>
                      <IntlMessages id="courses.tutorListLabel" />
                    </div>
                    <div className={courseFields('search')}>
                      <SearchSvg />
                      <input
                        className={courseFields('search-input')}
                        type="text"
                        value={searchTutorsValue}
                        name="searchTutorsValue"
                        placeholder={searchTutorPlaceholder}
                        onChange={this.onChangeTutorSearch}
                        disabled={isSecondStage}
                      />
                    </div>
                    {!isSecondStage && searchTutorsData && searchTutorsData.length > 0 && (
                      <div className={courseFields('search-block')}>
                        {(
                          searchTutorsData.map(({ firstName, lastName, id }) => (
                            <div
                              role="button"
                              tabIndex="-1"
                              className={courseFields('search-block-item', { active: id === currentTutorId })}
                              key={id}
                              onClick={() => this.selectTutorCourses(id)}
                            >
                              {`${firstName} ${lastName}`}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                    <div className={courseFields()}>
                      {attachedTutors.map(({ firstName, lastName, id }) => (
                        <div key={id} className={courseFields('list-item')}>
                          <ListItem
                            onDelete={removeAttachedTutorCourses}
                            name={`${firstName} ${lastName}`}
                            id={id}
                            disabled={isSecondStage}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.filesLabel" />
                  </div>
                  <Link
                    className={form('button')}
                    to={{
                      pathname: URLS.coursesCreateAddFiles,
                      state: { lastAddress: history.location.pathname },
                    }}
                    onClick={e => this.handleAddFiles(e, isSecondStage)}
                  >
                    <IntlMessages id="courses.addFilesBtn" />
                  </Link>
                </div>
                <div className={courseFields()}>
                  {attachedAllFiles.map(({ name, id }) => (
                    <div key={id} className={courseFields('list-item')}>
                      <ListItem
                        onDelete={deleteFileOfCourse}
                        name={name}
                        id={id}
                        disabled={isSecondStage}
                      />
                    </div>
                  ))}
                </div>
                <div className={courseFields()}>
                  <div className={courseFields('label')}>
                    <IntlMessages id="courses.categories" />
                  </div>
                  {
                    categories.map(item => (
                      <div className={courseFields('category-row')} key={item.id}>
                        <Checkbox
                          handleCheck={this.handleChangeCheckboxCategories}
                          name={item.id}
                          value={item.selected}
                          title={item.name}
                        />
                      </div>
                    ))
                  }
                </div>
              </section>
            </section>
            {(isSecondStage || courseId) && (
              <section className={topic()}>
                <section className={topic('left')}>
                  <div className={courseFields()}>
                    <div className={courseFields('label')}>
                      <IntlMessages id="courses.lessonToAdd" />
                    </div>
                    <div className={courseFields('search')}>
                      <SearchSvg />
                      <input
                        className={courseFields('topic-search-input', { search: true })}
                        type="text"
                        value={searchTopicValue}
                        name="searchTopicValue"
                        placeholder={searchLessonPlaceholder}
                        onChange={this.onChangeTopicSearch}
                      />
                    </div>
                    <div className={courseFields('search-block')}>
                      {(
                        searchTopicData.map(({
                          topic: { name, id },
                          course: { title: courseName },
                          id: rowId,
                        }) => (
                          <div
                            role="presentation"
                            className={courseFields('search-block-topic', { active: rowId === currentTopic.id })}
                            key={rowId}
                            onClick={() => this.handleClickOnFoundedTopic(id, name, rowId)}
                          >
                            <div className={courseFields('search-block-label')}>{name}</div>
                            <div className={courseFields('search-block-label')}>{courseName}</div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className={courseFields()}>
                      <div className={courseFields('label')}>
                        <IntlMessages id="courses.addNewLesson" />
                      </div>
                      <div className={courseFields('search')}>
                        <input
                          className={courseFields('topic-search-input', { error: Boolean(topicError) })}
                          type="text"
                          value={addTopicValue}
                          name="addTopicValue"
                          placeholder={addNewLessonPlaceholder}
                          onChange={this.onChangeTopicAdd}
                        />
                      </div>
                      <div className={form('save')}>
                        <button
                          type="button"
                          className={form('save-button')}
                          onClick={this.handleSaveNewTopic}
                          disabled={!addTopicValue}
                        >
                          <IntlMessages id="courses.saveTopicBtn" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
                <section className={topic('right')}>
                  {Boolean(selectedTopics.length) && (
                    <Fragment>
                      <div className={topic('attached')}>
                        <IntlMessages id="courses.topicsLabel" />
                      </div>
                      <div className={topic('attached')}>
                        {selectedTopics.map(({ id, name }) => (
                          <AttachedTopic
                            key={name}
                            id={id}
                            name={name}
                            isEdit
                            onDelete={() => this.handleDeleteSelectedTopic(id)}
                            onEdit={this.handleEditCurrentTopic}
                          />
                        ))}
                      </div>
                    </Fragment>
                  )}
                </section>
              </section>
            )}
            <div className={form('submit')}>
              <button
                type="button"
                className={form('button')}
                onClick={this.handleSaveCreatedCourse}
              >
                <IntlMessages id="courses.saveBtn" />
              </button>
              <button
                className={form('button', { disabled: isCoursePublished || !courseId })}
                type="button"
                onClick={this.handlePublishCourse}
                disabled={!courseId}
              >
                <IntlMessages id={btnName} />
              </button>
            </div>
          </section>
        </CoursesCreateWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentCourse = getCurrentCourseFp(state);
  const filteredCertificates = getFilteredCertificatesFp(state);
  const searchTutorsData = getSearchTutorsDataFp(state);
  const attachedTutors = getAttachedTutorsFp(state);
  const currentCertId = getCurrentCertIdFp(state);
  const currentTutorId = getCurrentTutorIdFp(state);
  const certificateTemplate = getCertificateTemplateFp(state);
  const welcomeEmailTemplate = getWelcomeEmailTemplateFp(state);
  const welcomeLetterTemplate = getWelcomeLetterTemplateFp(state);
  const attachedFiles = getAttachedFilesFp(state);
  const attachedUploadFiles = getAttachedUploadFilesFp(state);
  const isCourseCreated = getStatusCourseCreatedFp(state);
  const errorCourseCreated = getErrorCourseCreatedFp(state);
  const searchTopicData = getSearchTopicsFp(state);
  const topicError = getTopicErrorFp(state);
  const selectedExistsTopics = getselectedExistsTopicFp(state);
  const selectedNewTopics = getselectedNewTopicFp(state);
  const currentTopic = getCurrentTopicFp(state);
  const isSetInitialProps = getStatusSetInitialPropsFp(state);
  const courseStage = state.courses.formStage;
  const isPublished = state.courses.isCoursePublished;
  const isUpdated = state.courses.isCourseUpdated;
  const isLessonUpdate  = state.courses.isLessonUpdated;
  const { categories } = state.courses;
  const { searchCertData } = state.courses;

  return {
    currentCourse,
    filteredCertificates,
    searchTutorsData,
    attachedTutors,
    currentCertId,
    currentTutorId,
    certificateTemplate,
    welcomeEmailTemplate,
    welcomeLetterTemplate,
    attachedFiles,
    attachedUploadFiles,
    isCourseCreated,
    errorCourseCreated,
    searchTopicData,
    topicError,
    selectedExistsTopics,
    selectedNewTopics,
    currentTopic,
    isSetInitialProps,
    courseStage,
    isPublished,
    isUpdated,
    isLessonUpdate,
    searchCertData,
    categories,
  };
};

CoursesCreate.propTypes = propTypes;
CoursesCreate.defaultProps = defaultProps;

export default connect(mapStateToProps, { ...coursesActions })(CoursesCreate);
