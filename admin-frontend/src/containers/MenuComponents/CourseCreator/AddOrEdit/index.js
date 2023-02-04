import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import courseCreatorActions from 'redux/courseCreator/actions';
import LayoutContent from 'components/utility/layoutContent';
import cropStateImageActions from 'redux/cropImageState/actions';
import IntlMessages from 'components/utility/intlMessages';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { PLACEHOLDER, LANGUAGES } from 'constants/constants';
import { bemlds, validateForm as validateUtil } from 'utils';
import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  UploadDragAndDropCrop,
  BannerNotification,
  CustomTextInput,
  CreatedAtAdminBlock,
  CourseItemEdit,
  DefaultButton,
} from 'components';
import CourseCreatorWrapper from './CourseCreatorWrapper.style';
import { MAIN_ROUTE } from '../../../../constants/routes';
import schema from './schema';

const { courseCreatorsFindGroups, deleteCourseCreator } = MAIN_ROUTE;
const {
  english,
  sve,
  norsk,
} = LANGUAGES;

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
  personNumberTitle,
  employeeNumberTitle,
} = PLACEHOLDER;

const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');
const btn = bemlds('button');

const urlToDelete = id => `${deleteCourseCreator}/${id}`;

const defaultProps = {
  match: {
    path: '',
  },
  setInitStateCropImage: () => null,
  setInitialState: () => null,
  selectedGroups: [],
  history: {},
  getCurrentCourseCreator: () => null,
  currentCourseCreator: {},
  changeInfo: () => null,
  addCropFile: () => null,
  saveCourseCreator: () => null,
  updateCourseCreator: () => null,
  clearSuccessResultCourseCreator: () => null,
  closeResetPasswordCourseCreator: () => null,
  isSuccessCourseCreator: false,
  isResetPasswordCourseCreator: false,
  error: '',
  clearErrorCourseCreator: () => null,
  removeDownloadLinkCourseCreator: () => null,
  isLoadingAddCourseCreator: false,
  isLoadingEdiCourseCreator: false,
  generateNewPassword: () => null,
  deleteCourseFromCreator: () => null,
};

const propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      creatorId: PropTypes.number,
    }),
  }),
  setInitStateCropImage: PropTypes.func,
  setInitialState: PropTypes.func,
  selectedGroups: PropTypes.arrayOf(PropTypes.shape({})),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  getCurrentCourseCreator: PropTypes.func,
  currentCourseCreator: PropTypes.shape({}),
  changeInfo: PropTypes.func,
  addCropFile: PropTypes.func,
  saveCourseCreator: PropTypes.func,
  updateCourseCreator: PropTypes.func,
  clearSuccessResultCourseCreator: PropTypes.func,
  closeResetPasswordCourseCreator: PropTypes.func,
  isSuccessCourseCreator: PropTypes.bool,
  isResetPasswordCourseCreator: PropTypes.bool,
  error: PropTypes.string,
  clearErrorCourseCreator: PropTypes.func,
  removeDownloadLinkCourseCreator: PropTypes.func,
  isLoadingAddCourseCreator: PropTypes.bool,
  isLoadingEdiCourseCreator: PropTypes.bool,
  generateNewPassword: PropTypes.func,
  deleteCourseFromCreator: PropTypes.func,
};

const CourseCreatorAddOrEdit = ({
  match: {
    path,
    params: {
      creatorId,
    },
  },
  setInitStateCropImage,
  setInitialState,
  selectedGroups,
  history,
  getCurrentCourseCreator,
  currentCourseCreator,
  changeInfo,
  addCropFile,
  saveCourseCreator,
  updateCourseCreator,
  clearSuccessResultCourseCreator,
  closeResetPasswordCourseCreator,
  isSuccessCourseCreator,
  isResetPasswordCourseCreator,
  error,
  clearErrorCourseCreator,
  removeDownloadLinkCourseCreator,
  isLoadingAddCourseCreator,
  isLoadingEdiCourseCreator,
  generateNewPassword,
  deleteCourseFromCreator,
}) => {
  const [errors, setError] = useState({});
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    firstTelephone: false,
    secondTelephone: false,
    firstEmail: false,
    secondEmail: false,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const isEditPage = path.includes('edit');
    setIsEdit(isEditPage);
    setInitStateCropImage();
    setInitialState();
    if (!isEditPage && !selectedGroups.length) {
      history.push(courseCreatorsFindGroups);
    }
    if (isEditPage && creatorId) {
      getCurrentCourseCreator(creatorId);
    }
  }, []);

  const validateForm = (newValue) => {
    const values = {
      ...currentCourseCreator,
      ...(newValue ? { [newValue.name]: newValue.value } : {}),
    };
    return validateUtil({
      values,
      cbSuccess: () => setError({}),
      cbFail: (newErrors) => {
        setError(newErrors);
      },
      schema,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    changeInfo(name, value);
    validateForm({ name, value });
  };

  const handleCropFile = (file) => {
    addCropFile(file);
  };

  const handleAddFile = file => null;

  const handleCheck = (value, name) => {
    changeInfo(name, value);
  };

  const handleCheckActive = (value, name) => {
    handleCheck(!value, name);
  };

  const returnNumberOfLang = (lang) => {
    switch (lang) {
      case english:
        return 1;
      case sve:
        return 2;
      case norsk:
        return 3;

      default:
        return null;
    }
  };

  const handleLangSave = (value) => {
    changeInfo('language', returnNumberOfLang(value));
  };

  const setAllTouched = () => {
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
      ...acc,
      [item]: true,
    }), {});
    setTouched(allTouchedState);
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    setAllTouched();

    if (!isValid) {
      return;
    }

    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      file,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
      avatar,
      personNumber,
      employeeNumber,
      isDeactivated,
    } = currentCourseCreator;

    const groups = selectedGroups.map(item => item.id);
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('emails[0]', firstEmail);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    formData.append('isDeactivated', isDeactivated);
    if (!isEdit) {
      groups.forEach((item, i) => {
        formData.append(`groups[${i}]`, item);
      });
    }

    if (file) {
      formData.append('file', file);
    }

    if (secondEmail) {
      formData.append('emails[1]', secondEmail);
    }

    if (firstTelephone) {
      formData.append('phones[0]', firstTelephone);
    }

    if (secondTelephone) {
      formData.append('phones[1]', secondTelephone);
    }

    if (personNumber) {
      formData.append('personNumber', personNumber);
    }
    if (employeeNumber) {
      formData.append('employeeNumber', employeeNumber);
    }

    if (isEdit) {
      formData.append('avatar', avatar);
      updateCourseCreator(formData, creatorId);

      return;
    }

    saveCourseCreator(formData);
  };

  const getErrorInput = name => touched[name] && errors[name];

  const handleFocus = (e) => {
    const { target: { name } } = e;
    setTouched(prevState => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleDeleteCourse = (courseId) => {
    deleteCourseFromCreator(currentCourseCreator.id, courseId);
  };

  const formTitleId = isEdit ? 'courseCreators.editBanner' : 'courseCreators.addBanner';
  const successBannerId = isEdit ? 'courseCreators.editSuccessBanner' : 'courseCreators.successBanner';
  const {
    firstName,
    lastName,
    notifyEmail,
    notifySms,
    firstEmail,
    secondEmail,
    firstTelephone,
    secondTelephone,
    avatar,
    personNumber,
    employeeNumber,
    courses,
    groupsList,
    isDeactivated,
  } = currentCourseCreator;

  const groupsInfo = isEdit ? groupsList : selectedGroups.map(item => item.text).join(', ');
  const bannerInfo = isEdit ? 'courseCreators.editCourseCreator' : 'courseCreators.addCourseCreator';

  return (
    <LayoutContent>
      <CourseCreatorWrapper>
        <Banner title={<IntlMessages id={bannerInfo} />} />
        {isSuccessCourseCreator && (
          <BannerNotification
            error={false}
            title={<IntlMessages id={successBannerId} />}
            close={clearSuccessResultCourseCreator}
            isScrollMount
          />
        )}
        {isResetPasswordCourseCreator && (
          <BannerNotification
            error={false}
            title={<IntlMessages id="courseCreators.resetPasswordSuccessBanner" />}
            close={closeResetPasswordCourseCreator}
            isScrollMount
          />
        )}
        {error && (
          <BannerNotification
            error
            title={error}
            close={clearErrorCourseCreator}
            isScrollMount
          />
        )}
        <section className={page()}>
          <section className={page('left')}>
            <section className={form()}>
              <div className={form('title')}>
                <IntlMessages id={formTitleId} />
                {` ${groupsInfo}.`}
              </div>
              <div className={form('firstname')}>
                <div className={form('firstname-title')}>
                  <IntlMessages id="groupAdmin.firstName" />
                </div>
                <CustomTextInput
                  className={form('firstname-input')}
                  type="text"
                  value={firstName}
                  name="firstName"
                  placeholder={firstNameTitle}
                  onChange={handleChange}
                  error={getErrorInput('firstName')}
                  onFocus={handleFocus}
                />
              </div>
              <div className={form('lastname')}>
                <div className={form('lastname-title')}>
                  <IntlMessages id="groupAdmin.lastName" />
                </div>
                <CustomTextInput
                  className={form('lastname-input')}
                  type="text"
                  value={lastName}
                  name="lastName"
                  placeholder={lastNameTitle}
                  onChange={handleChange}
                  error={getErrorInput('lastName')}
                  onFocus={handleFocus}
                />
              </div>
              <AddInput
                title={<IntlMessages id="groupAdmin.eMail" />}
                addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                placeholder={emailTitle}
                valueFirstInput={firstEmail}
                errorFirstInput={getErrorInput('firstEmail')}
                nameFirstInput="firstEmail"
                valueSecondInput={secondEmail}
                nameSecondInput="secondEmail"
                errorSecondInput={getErrorInput('secondEmail')}
                isSingleInputChange
                handleChange={handleChange}
                onFocus={handleFocus}
              />
              <AddInput
                title={<IntlMessages id="groupAdmin.telephone" />}
                addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                placeholder={telephoneTitle}
                handleChange={handleChange}
                valueFirstInput={firstTelephone}
                nameFirstInput="firstTelephone"
                errorFirstInput={getErrorInput('firstTelephone')}
                valueSecondInput={secondTelephone}
                nameSecondInput="secondTelephone"
                isSingleInputChange
                onFocus={handleFocus}
                errorSecondInput={getErrorInput('secondTelephone')}
              />
              <div className={form('select-title')}>
                <IntlMessages id="groupAdmin.lang" />
              </div>
              <SelectAnyTime
                status={false}
                className={form('select')}
                handleDataSave={handleLangSave}
              />
              <div className={form('notification')}>
                <IntlMessages id="groupAdmin.userNotification" />
              </div>
              <div className={form('checkbox-group')}>
                <Checkbox
                  handleCheck={handleCheck}
                  name="notifyEmail"
                  value={notifyEmail}
                  title={<IntlMessages id="groupAdmin.checkEmail" />}
                />
                <Checkbox
                  handleCheck={handleCheck}
                  name="notifySms"
                  value={notifySms}
                  title={<IntlMessages id="groupAdmin.checkSms" />}
                />
                <Checkbox
                  handleCheck={handleCheckActive}
                  name="isDeactivated"
                  value={!isDeactivated}
                  title={<IntlMessages id="groupAdmin.isActive" />}
                />
              </div>
              {isEdit && (
              <div className={form('button')}>
                <DefaultButton
                  textId="students.generateButton"
                  onClick={() => generateNewPassword(creatorId)}
                />
              </div>
              )}
              <div className={form('lastname-title')}>
                <IntlMessages id="students.personNumber" />
              </div>
              <CustomTextInput
                type="text"
                className={form('lastname-input')}
                value={personNumber}
                name="personNumber"
                placeholder={personNumberTitle}
                onChange={handleChange}
              />
              <div className={form('lastname-title')}>
                <IntlMessages id="students.employeeNumber" />
              </div>
              <CustomTextInput
                type="text"
                value={employeeNumber}
                className={form('lastname-input')}
                name="employeeNumber"
                placeholder={employeeNumberTitle}
                onChange={handleChange}
                error={getErrorInput('employeeNumber')}
                onFocus={handleFocus}
              />
            </section>
          </section>
          <section className={page('right')}>
            <div className={profile()}>
              <CreatedAtAdminBlock
                currentLmsGroup={currentCourseCreator}
              />
              <div className={profile('title')}>
                <IntlMessages id="groupAdmin.profileTitle" />
              </div>
              <div className={page('drag-and-drop')}>
                <UploadDragAndDropCrop
                  removeDownloadLink={removeDownloadLinkCourseCreator}
                  imageUrl={avatar}
                  handleDrop={handleAddFile}
                  handleAddFile={handleAddFile}
                  handleCropFile={handleCropFile}
                  isUpload="false"
                />
              </div>
            </div>
            {Boolean(courses && courses.length) && (
            <div>
              <div className={form('courses-word')}>
                <IntlMessages id="courses.creatorCourses" />
              </div>
              {courses.map(item => (
                <CourseItemEdit
                  key={item.id}
                  item={item}
                  isCourseCreator
                  handleDelete={handleDeleteCourse}
                />
              ))}
            </div>
            )
            }
            <section className={btn()}>
              <Loader
                active={isLoadingAddCourseCreator || isLoadingEdiCourseCreator}
                inline
                className={btn('loader')}
              />
              {isEdit && (
              <Link className="link" to={urlToDelete(creatorId)}>
                <DefaultButton
                  textId="orgAdmins.deleteBtn"
                  onClick={handleSubmit}
                  disabled={isLoadingAddCourseCreator || isLoadingEdiCourseCreator}
                  isDelete
                />
              </Link>
              )}
              <DefaultButton
                textId={isEdit
                  ? 'courseCreators.saveBtn'
                  : 'courseCreators.addButton'}
                onClick={handleSubmit}
                disabled={isLoadingAddCourseCreator || isLoadingEdiCourseCreator}
              />
            </section>
          </section>
        </section>
      </CourseCreatorWrapper>
    </LayoutContent>
  );
};

CourseCreatorAddOrEdit.defaultProps = defaultProps;
CourseCreatorAddOrEdit.propTypes = propTypes;

const mapStateToProps = ({
  courseCreator: {
    currentCourseCreator,
    isSuccessCourseCreator,
    isResetPasswordCourseCreator,
    error,
    isLoadingAddCourseCreator,
    isLoadingEdiCourseCreator,
  },
  searchGroup: {
    selectedGroups,
  },
}) => ({
  currentCourseCreator,
  isSuccessCourseCreator,
  isResetPasswordCourseCreator,
  error,
  isLoadingAddCourseCreator,
  isLoadingEdiCourseCreator,
  selectedGroups,
});

export default connect(mapStateToProps,
  {
    ...courseCreatorActions,
    ...cropStateImageActions,
  })(CourseCreatorAddOrEdit);
