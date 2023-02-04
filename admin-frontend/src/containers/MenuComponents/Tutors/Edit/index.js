import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import tutorsActions from 'redux/tutors/actions';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import URLS from 'redux/urls';

import {
  getCurrentTutorFp,
  getChosenCoursesEditTutorsFp,
  getTutorId,
  getTutorEdit,
  getErrorTutorEdit,
} from 'selectors';

import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  DragAndDropImages,
  TutorsInfo,
  DefaultButton,
} from 'components';

import { bemlds, returnNumberOfLang } from 'utils';
import { PLACEHOLDER } from 'constants/constants';
import { TUTOR_EDIT_SHEMA } from 'constants/validationShema';
import TutorsEditWrapper from './tutorsEdit.style';

const {
  firstNameTitle,
  lastNameTitle,
  telephoneTitle,
  emailTitle,
} = PLACEHOLDER;

const urlToDelete = id => `${URLS.tutorsDelete}/${id}`;
const urlFindCourses = tutorsId => URLS.tutorsEditTutorFindCourses(tutorsId);
const page = bemlds('page');
const form = bemlds('form');

const TutorEdit = (props) => {
  const {
    changeCurrentTutor,
    currentTutor,
    setValuesOfCurrentTutor,
    currentTutorId,
    deleteCurrentTutor,
    history,
    isTutorEdit,
    errorTutorEdit,
    setInitialPropsTutorEdit,
  } = props;

  useEffect(() => {
    const { tutorsEdit } = URLS;

    if (isTutorEdit || errorTutorEdit) {
      history.push(tutorsEdit);
      setInitialPropsTutorEdit();
    }
  });

  const handleAddInputEmail = (name, value1, value2, setFieldValue) => {
    setFieldValue('firstEmail', value1);
    setFieldValue('secondEmail', value2);
    setValuesOfCurrentTutor({ name: 'firstEmail', value: value1 });
    setValuesOfCurrentTutor({ name: 'secondEmail', value: value2 });
  };

  const handleAddInputPhone = (name, value1, value2, setFieldValue) => {
    setFieldValue('firstPhoneNumber', value1);
    setFieldValue('secondPhoneNumber', value2);
    setValuesOfCurrentTutor({ name: 'firstPhoneNumber', value: value1 });
    setValuesOfCurrentTutor({ name: 'secondPhoneNumber', value: value2 });
  };

  const handleLangSave = (value, name, setFieldValue) => {
    const currentNumberOfLang = returnNumberOfLang(value);
    setFieldValue(name, currentNumberOfLang);
    setValuesOfCurrentTutor({ name, value: currentNumberOfLang });
  };

  const handleAddFile = (file, setFieldValue, name) => {
    setFieldValue(name, file);
    setValuesOfCurrentTutor({ name, value: file });
  };

  const handleDrop = (file, setFieldValue, name) => {
    setFieldValue(name, file);
    setValuesOfCurrentTutor({ name, value: file });
  };

  const handleCheck = (isCheck, name, setFieldValue) => {
    setFieldValue(name, isCheck);
    setValuesOfCurrentTutor({ name, value: isCheck });
  };

  const handlePopup = () => {
    deleteCurrentTutor(currentTutorId);
  };

  const handleCreateTutor = (values) => {
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
    } = values;
    const { chosenCoursesEdit } = props;
    const coursesIds = chosenCoursesEdit.map(({ id }) => id);
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
    if (typeof file !== 'string') {
      formData.append('file', file);
    }
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('language', language);
    formData.append('email', JSON.stringify(email));
    formData.append('phone', JSON.stringify(phone));
    formData.append('coursesIds', JSON.stringify(coursesIds));
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    formData.append('isDeactivated', isDeactivated);
    changeCurrentTutor(currentTutorId, formData);
  };

  return (
    <LayoutContent>
      <TutorsEditWrapper>
        <section className={page()}>
          <Banner title={<IntlMessages id="tutors.editBanner" />} />
          <div className={page('title')}>
            <IntlMessages id="tutors.editLabel" />
            {` ${currentTutor.firstName} ${currentTutor.lastName}`}
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: currentTutor.firstName,
              lastName: currentTutor.lastName,
              firstEmail: currentTutor.firstEmail,
              secondEmail: currentTutor.secondEmail,
              firstPhoneNumber: currentTutor.firstPhoneNumber,
              secondPhoneNumber: currentTutor.secondPhoneNumber,
              coursesIds: currentTutor.coursesIds,
              language: currentTutor.language,
              notifyEmail: currentTutor.notifyEmail,
              notifySms: currentTutor.notifySms,
              isDeactivated: currentTutor.isDeactivated,
              file: currentTutor.file,
            }}
            validationSchema={TUTOR_EDIT_SHEMA}
            onSubmit={(values) => {
              handleCreateTutor(values);
            }}
            render={({
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
              errors,
              setFieldValue,
              values,
            }) => (
              <form className={form()}>
                <div className={form('left')}>
                  <div className={form('label')}>
                    <div className={form('title')}>
                      <IntlMessages id="groupAdmin.firstName" />
                    </div>
                    <input
                      name="firstName"
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        setValuesOfCurrentTutor({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      placeholder={firstNameTitle}
                      className={form('input', { error: errors.firstName })}
                      value={values.firstName}
                    />
                  </div>
                  <div className={form('label')}>
                    <div className={form('title')}>
                      <IntlMessages id="groupAdmin.lastName" />
                    </div>
                    <input
                      name="lastName"
                      type="text"
                      onChange={(e) => {
                        handleChange(e);
                        setValuesOfCurrentTutor({
                          name: e.target.name,
                          value: e.target.value,
                        });
                      }}
                      onBlur={handleBlur}
                      placeholder={lastNameTitle}
                      className={form('input', { error: errors.lastName })}
                      value={values.lastName}
                    />
                  </div>
                  <AddInput
                    name="email"
                    title={<IntlMessages id="groupAdmin.eMail" />}
                    addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                    placeholder={emailTitle}
                    setFieldValue={setFieldValue}
                    addInput={handleAddInputEmail}
                    onBlur={handleBlur}
                    email={[values.firstEmail, values.secondEmail]}
                    errors={[errors.firstEmail, errors.secondEmail]}
                  />
                  <AddInput
                    name="phone"
                    title={<IntlMessages id="groupAdmin.telephone" />}
                    addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                    placeholder={telephoneTitle}
                    setFieldValue={setFieldValue}
                    addInput={handleAddInputPhone}
                    phone={[values.firstPhoneNumber, values.secondPhoneNumber]}
                    errors={[errors.firstPhoneNumber, errors.secondPhoneNumber]}
                  />
                  <div className={form('title')}>
                    <IntlMessages id="groupAdmin.lang" />
                  </div>
                  <SelectAnyTime
                    status={false}
                    name="language"
                    handleDataSave={handleLangSave}
                    setFieldValue={setFieldValue}
                    currentValue={values.language}
                  />
                  <div className={form('notification')}>
                    <div className={form('title', { notification: true })}>
                      <IntlMessages id="sidebar.notification" />
                    </div>
                    <IntlMessages id="groupAdmin.userNotification" />
                  </div>
                  <div className={form('checkbox-group')}>
                    <Checkbox
                      name="notifyEmail"
                      handleCheck={handleCheck}
                      checkStatus={values.notifyEmail}
                      setFieldValue={setFieldValue}
                      title={<IntlMessages id="groupAdmin.checkEmail" />}
                    />
                    <Checkbox
                      handleCheck={handleCheck}
                      name="notifySms"
                      checkStatus={values.notifySms}
                      setFieldValue={setFieldValue}
                      title={<IntlMessages id="groupAdmin.checkSms" />}
                    />
                  </div>
                  <Checkbox
                    handleCheck={handleCheck}
                    name="isDeactivated"
                    checkStatus={values.isDeactivated}
                    setFieldValue={setFieldValue}
                    title="User Active"
                  />
                  <div className={form('courses')}>
                    <div className={form('title', { courses: true })}>
                      <IntlMessages id="tutors.courses" />
                    </div>
                    <div className={form('courses-info')}>
                      <IntlMessages id="tutors.coursesInfo" />
                    </div>
                    <Link to={urlFindCourses(currentTutorId)}>
                      <button
                        type="button"
                        className={form('button')}
                      >
                        <IntlMessages id="tutors.coursesBtn" />
                      </button>
                    </Link>
                  </div>
                </div>
                <div className={form('right')}>
                  <TutorsInfo />
                  <DragAndDropImages
                    name="file"
                    handleDrop={handleDrop}
                    handleAddFile={handleAddFile}
                    setFieldValue={setFieldValue}
                    error={errors.file}
                    img={values.file}
                  />
                  <div className={form('btn-wrap', { save: true })}>
                    <Link className="link" to={urlToDelete(currentTutorId)}>
                      <DefaultButton
                        textId="orgAdmins.deleteBtn"
                        isDelete
                      />
                    </Link>
                    <button
                      type="button"
                      className={form('button', { save: true })}
                      onClick={() => {
                        handleSubmit();
                        handleReset();
                      }}
                    >
                      <IntlMessages id="groupAdmin.saveBtn" />
                    </button>
                  </div>

                </div>
              </form>
            )}
          />
        </section>
      </TutorsEditWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const currentTutorId = getTutorId(state);
  const currentTutor = getCurrentTutorFp(state);
  const chosenCoursesEdit = getChosenCoursesEditTutorsFp(state);
  const isTutorEdit = getTutorEdit(state);
  const errorTutorEdit = getErrorTutorEdit(state);

  return {
    currentTutorId,
    currentTutor,
    chosenCoursesEdit,
    isTutorEdit,
    errorTutorEdit,
  };
};

TutorEdit.defaultProps = {
  errorTutorEdit: null,
  changeCurrentTutor: null,
  currentTutor: null,
  setValuesOfCurrentTutor: null,
  chosenCoursesEdit: [],
  currentTutorId: null,
  deleteCurrentTutor: null,
  isTutorEdit: false,
  history: null,
  setInitialPropsTutorEdit: null,
};

TutorEdit.propTypes = {
  errorTutorEdit: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
  ]),
  changeCurrentTutor: PropTypes.func,
  currentTutor: PropTypes.objectOf(PropTypes.any),
  setValuesOfCurrentTutor: PropTypes.func,
  chosenCoursesEdit: PropTypes.arrayOf(PropTypes.object),
  currentTutorId: PropTypes.number,
  deleteCurrentTutor: PropTypes.func,
  isTutorEdit: PropTypes.bool,
  history: PropTypes.objectOf(PropTypes.any),
  setInitialPropsTutorEdit: PropTypes.func,
};

export default connect(mapStateToProps, { ...tutorsActions })(TutorEdit);
