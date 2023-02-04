import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import cropStateImageActions from 'redux/cropImageState/actions';
import tutorsActions from 'redux/tutors/actions';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import URLS from 'redux/urls';

import {
  getCurrentTutorFp,
  getTutorCreatedFp,
  getChosenCoursesTutorsFp,
  getTutorId,
} from 'selectors';

import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  BannerNotification,
  CustomTextInput,
  CreatedAtAdminBlock,
  UploadDragAndDropCrop,
  DefaultButton,
} from 'components';

import { bemlds, validateForm } from 'utils';
import { PLACEHOLDER } from 'constants/constants';
import { Link } from 'react-router-dom';
import schema from './schema';
import TutorsAddWrapper from './TutorsAdd.style';

const {
  firstNameTitle,
  lastNameTitle,
  telephoneTitle,
  emailTitle,
} = PLACEHOLDER;

const urlToDelete = id => `${URLS.tutorsDelete}/${id}`;
const urlFindCourses = URLS.tutorsFindCourses;
const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');
const btn = bemlds('button');

const TutorsAdd = (props) => {
  const {
    createTutor,
    currentTutor,
    history,
    isSuccessBanner,
    clearSuccessResultTutor,
    error,
    clearErrorTutor,
    changeTutorInfo,
    removeDownloadLinkTutor,
    currentTutorId,
    match: {
      path,
    },
    isLoadingAddTutor,
    changeCurrentTutor,
    chosenCourses,
    location,
    setCurrentTutor,
    generateNewPassword,
    closeResetPasswordOrgAdmin,
    isResetPasswordTutor,
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [initialName, setInitialName] = useState('');
  const [isUpdateName, setIsUpdateName] = useState(false);
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    firstPhoneNumber: false,
    secondPhoneNumber: false,
    firstEmail: false,
    secondEmail: false,
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setIsEdit(path.includes('edit'));
  }, [path]);

  useEffect(() => {
    const isEditForm = path.includes('edit');
    if (!chosenCourses.length && !isEditForm) {
      history.push(urlFindCourses);
    }
  }, []);

  useEffect(() => {
    if (isEdit || isUpdateName) {
      setInitialName(`${currentTutor.firstName} ${currentTutor.lastName}`);
    }
  }, [isEdit, isUpdateName]);

  useEffect(() => {
    const paths = location.pathname.split('/');
    const tutorId = Number(paths[paths.length - 1]);

    if (!currentTutorId && tutorId) {
      setCurrentTutor(tutorId);
    }
  }, []);

  const validateTutor = (newValue) => {
    const values = {
      ...currentTutor,
      ...(newValue ? { [newValue.name]: newValue.value } : {}),
    };
    return validateForm({
      values,
      cbSuccess: () => setErrors({}),
      cbFail: (newErrors) => {
        setErrors(newErrors);
      },
      schema,
    });
  };

  const handleAddFile = (file) => {
    changeTutorInfo('file', file);
  };

  const handleDrop = (file) => {
    changeTutorInfo('file', file);
  };

  const handleChange = ({ target: { name, value } }) => {
    validateTutor({ name, value });
    changeTutorInfo(name, value);
  };

  const setAllTouched = () => {
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
      ...acc,
      [item]: true,
    }), {});
    setTouched(allTouchedState);
  };

  const handleCreateTutor = () => {
    const {
      firstName,
      lastName,
      firstEmail,
      secondEmail,
      firstPhoneNumber,
      secondPhoneNumber,
      language,
      notifyEmail,
      notifySms,
      isDeactivated,
      file,
    } = currentTutor;

    setAllTouched();
    const isValid = validateTutor();

    if (!isValid) {
      return;
    }
    const coursesIds = chosenCourses.map(({ id }) => id);
    const email = [firstEmail];
    const phone = [];
    const formData = new FormData();

    if (secondEmail !== '') {
      email.push(secondEmail);
    }
    if (firstPhoneNumber !== '') {
      phone.push(firstPhoneNumber);
    }
    if (secondPhoneNumber !== '') {
      phone.push(secondPhoneNumber);
    }
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('language', language);
    formData.append('email', JSON.stringify(email));
    formData.append('phone', JSON.stringify(phone));
    formData.append('coursesIds', JSON.stringify(coursesIds));
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    formData.append('isDeactivated', !isDeactivated);
    if (file) {
      formData.append('file', file);
    }
    if (isEdit) {
      changeCurrentTutor(currentTutorId, formData);
      setIsUpdateName(true);
      return;
    }
    createTutor(formData);
  };

  const handleFocus = (e) => {
    const { target: { name } } = e;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getErrorInput = name => touched[name] && errors[name];

  const formTitleId = isEdit ? 'tutors.editBanner' : 'tutors.addBanner';
  const banerTitleId = isEdit ? 'tutors.editBannerSimplee' : 'tutors.addBannerSimplee';
  const successBannerId = isEdit ? 'tutors.changeSave' : 'tutors.successfullyAdded';

  const handleChangeStateForm = ({ target }) => {
    const { name, value } = target;
    validateTutor(target);

    changeTutorInfo(name, value);
  };

  const returnNumberOfLang = (lang) => {
    switch (lang) {
      case 'English':
        return 1;
      case 'Svenska':
        return 2;
      case 'Norsk':
        return 3;

      default:
        return null;
    }
  };

  const handleLangSave = (value) => {
    changeTutorInfo('language', returnNumberOfLang(value));
  };

  const handleCheck = (value, name) => {
    changeTutorInfo(name, value);
  };

  const handleCropFile = (file) => {
    changeTutorInfo('file', file);
  };

  const handleChangeCourses = () => {
    history.push(urlFindCourses, { save: true, id: currentTutorId });
  };
  const {
    firstName,
    lastName,
    firstEmail,
    secondEmail,
    firstPhoneNumber,
    secondPhoneNumber,
    notifyEmail,
    notifySms,
    isDeactivated,
  } = currentTutor;

  const coursesTitles = chosenCourses.map(item => item.title).join(', ');
  return (
    <LayoutContent>
      <TutorsAddWrapper>
        <Banner title={<IntlMessages id={banerTitleId} />} />
        {isResetPasswordTutor && (
          <BannerNotification
            error={false}
            title={<IntlMessages id="courseCreators.resetPasswordSuccessBanner" />}
            close={closeResetPasswordOrgAdmin}
            isScrollMount
          />
        )}
        {isSuccessBanner && (
        <BannerNotification
          error={false}
          title={<IntlMessages id={successBannerId} />}
          close={clearSuccessResultTutor}
          isScrollMount
        />
        )}
        {error && (
        <BannerNotification
          error
          title={error}
          close={clearErrorTutor}
          isScrollMount
        />
        )}
        <section className={page()}>
          <section className={page('left')}>
            <section className={form()}>
              <div className={form('title')}>
                <IntlMessages id={formTitleId} />
                {isEdit && <p className={form('course-name')}>{initialName}</p>}
                {!isEdit && <p className={form('course-name')}>{coursesTitles}</p>}
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
                handleChange={handleChangeStateForm}
                onFocus={handleFocus}
              />
              <AddInput
                title={<IntlMessages id="groupAdmin.telephone" />}
                addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                placeholder={telephoneTitle}
                handleChange={handleChangeStateForm}
                valueFirstInput={firstPhoneNumber}
                nameFirstInput="firstPhoneNumber"
                errorFirstInput={getErrorInput('firstPhoneNumber')}
                valueSecondInput={secondPhoneNumber}
                nameSecondInput="secondPhoneNumber"
                isSingleInputChange
                onFocus={handleFocus}
                errorSecondInput={getErrorInput('secondPhoneNumber')}
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
                  handleCheck={handleCheck}
                  name="isDeactivated"
                  value={isDeactivated}
                  title={<IntlMessages id="groupAdmin.isActive" />}
                />
                <div className={form('courses')}>
                  <div className={form('title', { courses: true })}>
                    <IntlMessages id="tutors.courses" />
                  </div>
                  <IntlMessages id="tutors.coursesInfo" />
                  <div className={form('courses-info')}>
                    <p className={form('course-name')}>{coursesTitles}</p>
                  </div>
                  <DefaultButton
                    textId="tutors.coursesBtn"
                    onClick={handleChangeCourses}
                  />
                </div>
              </div>
              {isEdit && (
                <div className={form('button-pass')}>
                  <DefaultButton
                    onClick={() => generateNewPassword(currentTutorId)}
                    textId="students.generateButton"
                  />
                </div>
              )}
            </section>
          </section>
          <section className={page('right')}>
            <div className={profile()}>
              <CreatedAtAdminBlock
                currentLmsGroup={currentTutor}
              />
              <div className={profile('title')}>
                <IntlMessages id="groupAdmin.profileTitle" />
              </div>
              <div className={page('drag-and-drop')}>
                <UploadDragAndDropCrop
                  removeDownloadLink={removeDownloadLinkTutor}
                  imageUrl={currentTutor.avatar}
                  handleDrop={handleDrop}
                  handleAddFile={handleAddFile}
                  handleCropFile={handleCropFile}
                  isUpload="false"
                  isManualInitial
                />
              </div>
            </div>
            <section className={btn()}>
              <Loader
                active={isLoadingAddTutor}
                inline
                className={btn('loader')}
              />
              {isEdit && (
                <Link className="link" to={urlToDelete(currentTutorId)}>
                  <DefaultButton
                    textId="orgAdmins.deleteBtn"
                    isDelete
                  />
                </Link>
              )}
              <DefaultButton
                textId={isEdit
                  ? 'tutors.saveBtn'
                  : 'tutors.addBtn'}
                onClick={handleCreateTutor}
                disabled={isLoadingAddTutor}
              />
            </section>
          </section>
        </section>
      </TutorsAddWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const currentTutor = getCurrentTutorFp(state);
  const isTutorCreated = getTutorCreatedFp(state);
  const chosenCourses = getChosenCoursesTutorsFp(state);
  const currentTutorId = getTutorId(state);

  return {
    currentTutor,
    isTutorCreated,
    chosenCourses,
    currentTutorId,
    ...state.tutors,
  };
};

TutorsAdd.defaultProps = {
  createTutor: null,
  currentTutor: null,
  setValuesOfCurrentTutor: null,
  history: null,
  isTutorCreated: false,
  chosenCourses: [],
  match: {
    path: '',
  },
  isSuccessBanner: false,
  clearSuccessResultTutor: () => null,
  error: '',
  clearErrorTutor: () => null,
  changeTutorInfo: () => null,
  removeDownloadLinkTutor: () => null,
  isLoadingAddTutor: false,
  addCropFile: () => null,
  changeCurrentTutor: () => null,
  deleteCurrentTutor: () => null,
  currentTutorId: 0,
  setCurrentTutor: null,
  location: null,
  generateNewPassword: () => null,
};

TutorsAdd.propTypes = {
  createTutor: PropTypes.func,
  setCurrentTutor: PropTypes.func,
  location: PropTypes.object,
  currentTutor: PropTypes.objectOf(PropTypes.any),
  setValuesOfCurrentTutor: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.any),
  isTutorCreated: PropTypes.bool,
  chosenCourses: PropTypes.arrayOf(PropTypes.object),
  isSuccessBanner: PropTypes.bool,
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      tutorId: PropTypes.number,
    }),
  }),
  clearSuccessResultTutor: PropTypes.func,
  error: PropTypes.string,
  clearErrorTutor: PropTypes.func,
  changeTutorInfo: PropTypes.func,
  removeDownloadLinkTutor: PropTypes.func,
  isLoadingAddTutor: PropTypes.bool,
  addCropFile: PropTypes.func,
  changeCurrentTutor: PropTypes.func,
  deleteCurrentTutor: PropTypes.func,
  currentTutorId: PropTypes.number,
  generateNewPassword: PropTypes.func,
};

export default connect(mapStateToProps, { ...tutorsActions, ...cropStateImageActions })(TutorsAdd);
