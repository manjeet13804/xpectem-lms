import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import TaxonomyActions from 'redux/taxonomy/actions';
import {
  getSearchLmsGroupsStudentsFp,
  getSearchOrgStudentsFp,
  getSearchGroupStudentsFp,
  getCurrentLmsGroupIdStudentsFp,
  getCurrentNameLmsGroupStudentsFp,
  getCurrentOrgIdStudentsFp,
  getCurrentOrgNameStudentsFp,
  getSearchCoursesFp,
  getChosenCoursesStudentsFp,
  getCurrentStudentsFp,
  getCurrentStudentIdFp,
  getEditStatusStudentFp,
  getResetPasswordStatusStudentFp,
} from 'selectors';
import URLS from 'redux/urls';
import { Modal } from 'antd';
import LayoutContent from 'components/utility/layoutContent';
import _ from 'lodash';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import { bemlds, returnNumberOfLang } from 'utils';
import {
  Banner,
  Checkbox,
  AddInput,
  SelectAnyTime,
  CreatedAtAdminBlock,
  UploadDragAndDropCrop,
  CourseItemEdit,
  BannerNotification,
  CustomTextInput,
  SearchSvg,
  CloseIcon,
  SelectAllNone,
  CourseItem,
  DefaultButton,
} from 'components';
import { STUDENT_SCHEMA } from 'constants/validationShema/index';
import moment from 'moment';
import qs from 'qs';
import StudentsEditWrapper from './Info.style';
import { DATE_FORMATS, SIMPLE_DICTIONARY } from '../../../../constants/constants';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
  streetAddressPlaceholder,
  courseSearchTitle,
  enterNote,
} = PLACEHOLDER;

const { getInfoId } = REGEXP;
const { startDate } = SIMPLE_DICTIONARY;
const { yearMonthDay } = DATE_FORMATS;

const titleBem = bemlds('title');
const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile');
const course = bemlds('course');

const urlToDelete = id => `${URLS.studentsInfoDeleteUrl}/${id}`;

class StudentsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      imageSrc: null,
      firstName: '',
      lastName: '',
      firstEmail: '',
      secondEmail: '',
      firstPhone: '',
      secondPhone: '',
      notifyEmail: false,
      notifySms: false,
      language: '',
      studentTaxonomies: [],
      courseId: '',
      isOpenDeleteModal: '',
      errors: {
        firstName: '',
        lastName: '',
        firstEmail: '',
        secondEmail: '',
        firstPhone: '',
        secondPhone: '',
        personNumber: '',
        employeeNumber: '',
      },
    };

    this.searchDebounce = _.debounce(this.props.searchCourseStudents, 350);
  }

  componentWillMount() {
    const {
      getCurrentStudentById, studentId,
    } = this.props;
    getCurrentStudentById(studentId);
  }

  componentDidMount() {
    const { fetchTaxonomy, currentStudents } = this.props;
    const [student] = currentStudents;
    const lmsGroupId = student && student.lmsGroup && student.lmsGroup.id;
    if (lmsGroupId) {
      fetchTaxonomy({ lmsGroupId });
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchTaxonomy, currentStudents } = this.props;
    const [student] = currentStudents;
    const [prevStudents] = prevProps.currentStudents;

    const prevLmsGroupId = prevStudents && prevStudents.lmsGroup && prevStudents.lmsGroup.id;
    const lmsGroupId = student && student.lmsGroup && student.lmsGroup.id;
    if (prevLmsGroupId !== lmsGroupId) {
      fetchTaxonomy({ lmsGroupId });
    }
  }

  handleCheckCoursePassed = (id) => {
    const { changeCoursePassed } = this.props;

    changeCoursePassed(id);
  };

  handleCheck = (value, name) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name, 0);
  };

  handleChange = ({
    target: {
      value,
      name,
    },
  }) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name, 0);
  };

  addFirstName = ({ target: { value } }) => {
    const { addInputFirstName } = this.props;
    this.unsetUnfilledField('firstName');
    addInputFirstName(value, 0);
  };

  addLastName = ({ target: { value } }) => {
    const { addInputLastName } = this.props;
    this.unsetUnfilledField('lastName');
    addInputLastName(value, 0);
  };

  addPersonNumber = ({ target: { value } }) => {
    const { addInputPersonNumber } = this.props;
    this.unsetUnfilledField('personNumber');
    addInputPersonNumber(value, 0);
  };

  addEmployeeNumber = ({ target: { value } }) => {
    const { addInputEmployeeNumber } = this.props;
    addInputEmployeeNumber(value, 0);
  };

  handleAddInput = (name, value1, value2) => {
    const { addInputEmail, addInputPhone } = this.props;
    const resultValue2 = value2 || '';
    switch (name) {
      case 'email':
        addInputEmail(value1, resultValue2, 0);
        break;
      case 'phone':
        addInputPhone(value1, resultValue2, 0);
        break;

      default:
        return null;
    }
  };

  handleLangSave = (value) => {
    const { addInputLang } = this.props;

    addInputLang(returnNumberOfLang(value), 0);
  };

  handleEditStudent = () => {
    const {
      currentStudents,
      studentId,
      editStudent,
      selectedCoursesForStudents,
    } = this.props;

    if (!currentStudents.length) { return null; }

    const [currentStudent] = currentStudents || [];

    const {
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      emails,
      phones,
      file,
      language,
      userCourseRelation,
      isError,
      avatar,
      studentTaxonomy,
      lmsGroup: { id: lmsGroupId },
      note,
    } = currentStudent;

    if (isError) {
      return;
    }

    const coursesArray = userCourseRelation.map(
      ({
        dateBegin,
        dateEnd,
        coursePassed,
        course,
      }) => ({
        courseId: course.id, dateBegin, dateEnd, coursePassed,
      }),
    );


    const student = {
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      emails: emails.filter(Boolean),
      phones: phones.filter(Boolean),
      language: _.get(language, 'id', '1'),
      avatar,
      studentTaxonomy,
      lmsGroupId,
      note: note || '',
    };

    const courses = [
      ...coursesArray,
    ];

    const formData = new FormData();

    const newChosenCourses = selectedCoursesForStudents
      .map(({ id, dateBegin }) => {
        if (!dateBegin) { return { courseId: id }; }
        return {
          courseId: id,
          dateBegin,
        };
      });

    formData.append('student', JSON.stringify(student));
    formData.append('courses', JSON.stringify(courses));
    if (newChosenCourses.length) {
      formData.append('newCourses', JSON.stringify(newChosenCourses));
    }
    file && formData.append('file', file);

    editStudent(formData, studentId);

    this.setState({
      searchValue: '',
    })
  };

  handleCropFile = (file) => {
    const { addCropFile } = this.props;
    addCropFile(file);
  };

  handleDrop = files => this.setState({ imageSrc: files });

  handleAddFile = files => this.setState({ imageSrc: files });

  handleSaveDate = (id, date, name) => {
    const { changeDate } = this.props;
    changeDate(id, date, name);
  };

  handleClickCourse = (courseId) => {
    const { history, studentId, setCurrentDetailCourseStudents } = this.props;
    setCurrentDetailCourseStudents(courseId);
    if (studentId) { history.push(`${URLS.studentsToCourseDetailUrl}/${studentId}`); }
  };


  unSetError = (errorsStatement) => {
    const { errors } = this.state;
    const { addErrorStatus } = this.props;
    const newErrors = {
      ...errors,
      ...errorsStatement,
    };
    this.setState({
      errors: newErrors,
    });
    const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
    addErrorStatus(isErrors, 0);
  }

  validationAction = (name, value) => {
    const { errors } = this.state;
    const { addErrorStatus } = this.props;
    STUDENT_SCHEMA.validateAt(name, { [name]: value })
      .then(() => {
        const newErrors = {
          ...errors,
          [name]: '',
        };
        this.setState({
          errors: newErrors,
        });
        const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
        addErrorStatus(isErrors, 0);
      })
      .catch((e) => {
        const newErrors = {
          ...errors,
          [name]: e.message,
        };
        this.setState({
          errors: newErrors,
        });
        const isErrors = Boolean(Object.values(newErrors).filter(item => item).length);
        addErrorStatus(isErrors, 0);
      });
  }

  onBlurValidation = ({ target: { name, value } }) => {
    const { errors } = this.state;
    if ((name === 'firstPhone'
      || name === 'secondPhone'
      || name === 'employeeNumber') && !value) {
      const newErrors = {
        ...errors,
        [name]: '',
      };
      this.setState({
        errors: newErrors,
      });
    } else {
      this.validationAction(name, value);
    }
  }

  checkForUnfilledField = (field) => {
    const { currentStudents } = this.props;
    const [currentStudent] = currentStudents || [];
    const { unfilledFields } = currentStudent;
    const arrayForCheck = unfilledFields || [];
    return arrayForCheck.find(item => item === field) ? 'This field is required' : '';
  }

  unsetUnfilledField = (name) => {
    const { addUnfilledFields, currentStudents } = this.props;
    const [currentStudent] = currentStudents || [];
    const { unfilledFields } = currentStudent;
    const arrayForCheck = unfilledFields || [];
    const removeField = arrayForCheck.filter(field => field !== name);
    const newUnfilledFields = [{
      studentIndex: 0,
      unfilledFields: removeField,
    }];
    addUnfilledFields(newUnfilledFields);
  }

  handleChangeEmails = ({ target: { name, value } }) => {
    const { addInputEmail } = this.props;
    this.unsetUnfilledField('firstEmail');
    addInputEmail(name, value, 0);
  }

  handleChangePhones = ({ target: { name, value } }) => {
    const { addInputPhone } = this.props;
    addInputPhone(name, value, 0);
  }

  handleRemoveAvatar = () => {
    const { removeUserAvatar } = this.props;
    removeUserAvatar();
  }

  handleChangeAddressStreet = ({ target: { value } }) => {
    const { addStudentStreet } = this.props;
    addStudentStreet(value, 0);
  }

  handleChangeTaxonomy = (value, id) => {
    const { updateTaxonomyData, currentStudents } = this.props;
    const [currentStudent] = currentStudents || [];
    const { studentTaxonomy: studentTaxonomies } = currentStudent;
    const taxonomyExist = studentTaxonomies.some(item => item.taxonomy.id === id);
    if (taxonomyExist) {
      if (value === '') {
        const changedTaxonomy = studentTaxonomies.filter(item => item.taxonomy.id.toString() !== id.toString());
        updateTaxonomyData(changedTaxonomy, 0);
        return;
      }
      const changedTaxonomy = studentTaxonomies.map((item) => {
        if (item.taxonomy.id.toString() === id.toString()) return { ...item, value };
        return item;
      });
      updateTaxonomyData(changedTaxonomy, 0);
      return;
    }
    const changedTaxonomy = [...studentTaxonomies, { taxonomy: { id }, value }];
    updateTaxonomyData(changedTaxonomy, 0);
  };


  handleDeleteCourse = (courseId) => {
    this.setState({
      courseId,
      isOpenDeleteModal: true,
    });
  }

  handleCloseModal = () => {
    this.setState({
      courseId: '',
      isOpenDeleteModal: false,
    });
  }

  handleDeleteStudentFromCourse = () => {
    const { deleteStudentFromCourse, studentId } = this.props;
    const { courseId } = this.state;
    deleteStudentFromCourse(studentId, courseId);
    this.setState({
      courseId: '',
      isOpenDeleteModal: false,
    });
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });

    const query = _.pickBy({
      title: value.trim(),
      isOnlyPublished: true,
    }, _.identity);

    this.searchDebounce(qs.stringify(query));
  };

  render() {
    const {
      currentStudents,
      studentId,
      isEditStudent,
      isPasswordResetStudent,
      generateNewPassword,
      hasPhysical,
      closeEditStudent,
      taxonomies,
      selectedCoursesForStudents,
      searchCoursesData,
      setCurrentCourseStudents,
      selectNoneCourses,
      selectAllCourses,
      closeResetPasswordStudent,
    } = this.props;
    const {
      isOpenDeleteModal,
      searchValue,
    } = this.state;
    if (!currentStudents.length) { return null; }

    const [currentStudent] = currentStudents || [];

    const {
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      emails,
      phones,
      avatar,
      userCourseRelation,
      language,
      lmsGroup,
      streetAddress,
      userGroupsInfo,
      studentTaxonomy: studentTaxonomies,
      note,
    } = currentStudent;

    const studentIds = userCourseRelation ? userCourseRelation.map(({ course }) => course.id) : [];
    const coursesList = searchCoursesData.filter(item => !studentIds.includes(item.id));
    const { errors } = this.state;
    const [firstEmail, secondEmail] = emails || [];
    const [firstPhone, secondPhone] = phones || [];
    const { groups } = userGroupsInfo;
    const lmsGroupName = lmsGroup.name;
    return (
      <LayoutContent>
        <StudentsEditWrapper>
          <Banner title={<IntlMessages id="students.infoEditBanner" />} />
          {isEditStudent && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.editSuccess" />}
              isScrollMount
              close={closeEditStudent}
            />
          )}
          {isPasswordResetStudent && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="students.resetPasswordSuccess" />}
              isScrollMount
              close={closeResetPasswordStudent}
            />
          )}
          <section className={page()}>
            <section className={page('left')}>
              <div className={form()}>
                <div className={form('title')}>
                  <IntlMessages id="students.editTitle" />
                  <span className={titleBem('lms-group')}>{`${lmsGroupName} -`}</span>
                  <span className={titleBem('lms-group')}>{groups}</span>
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
                    onChange={this.addFirstName}
                    error={errors.firstName || this.checkForUnfilledField('firstName')}
                    onBlur={this.onBlurValidation}
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
                    onChange={this.addLastName}
                    error={errors.lastName || this.checkForUnfilledField('lastName')}
                    onBlur={this.onBlurValidation}
                  />
                </div>
                {hasPhysical && (
                  <div className={form('lastname')}>
                    <div className={form('lastname-title')}>
                      <IntlMessages id="courses.streetAddress" />
                    </div>
                    <CustomTextInput
                      className={form('lastname-input')}
                      type="text"
                      value={streetAddress}
                      name="streetAddress"
                      placeholder={streetAddressPlaceholder}
                      onChange={this.handleChangeAddressStreet}
                    />
                  </div>
                )}
                <AddInput
                  title={<IntlMessages id="groupAdmin.eMail" />}
                  addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                  placeholder={emailTitle}
                  valueFirstInput={firstEmail}
                  valueSecondInput={secondEmail}
                  errorFirstInput={errors.firstEmail || this.checkForUnfilledField('firstEmail')}
                  nameFirstInput="firstEmail"
                  errorSecondInput={errors.secondEmail}
                  nameSecondInput="secondEmail"
                  handleChange={this.handleChangeEmails}
                  name="email"
                  onBlur={this.onBlurValidation}
                  unSetError={this.unSetError}
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                  valueFirstInput={firstPhone}
                  valueSecondInput={secondPhone}
                  errorFirstInput={errors.firstPhone}
                  nameFirstInput="firstPhone"
                  errorSecondInput={errors.secondPhone}
                  nameSecondInput="secondPhone"
                  handleChange={this.handleChangePhones}
                  name="phone"
                  onBlur={this.onBlurValidation}
                  unSetError={this.unSetError}
                />
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    <IntlMessages id="note.word" />
                  </div>
                  <CustomTextInput
                    className={form('lastname-input')}
                    type="text"
                    value={note}
                    name="note"
                    placeholder={enterNote}
                    onChange={this.handleChange}
                  />
                </div>
                <div className={form('select-title')}>
                  <IntlMessages id="groupAdmin.lang" />
                </div>
                <SelectAnyTime
                  currentValue={language ? language.id : 1}
                  status={false}
                  className={form('select')}
                  handleDataSave={this.handleLangSave}
                />
                <div className={form('notification-title')}>
                  <IntlMessages id="students.notificationTitle" />
                </div>
                <div className={form('notification')}>
                  <IntlMessages id="groupAdmin.userNotification" />
                </div>
                <div className={form('checkbox-group')}>
                  <Checkbox
                    name="notifyEmail"
                    handleCheck={this.handleCheck}
                    value={notifyEmail}
                    title={<IntlMessages id="groupAdmin.checkEmail" />}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifySms"
                    value={notifySms}
                    title={<IntlMessages id="groupAdmin.checkSms" />}
                  />
                </div>
                <div className={form('button')}>
                  <DefaultButton
                    onClick={() => generateNewPassword(studentId)}
                    textId="students.generateButton"
                  />
                </div>
                {taxonomies && taxonomies.length > 0 && (
                  <div className={form('taxonomy')}>
                    <div className={form('taxonomy-title')}>
                      <IntlMessages id="students.taxonomyTitle" />
                    </div>
                    {taxonomies.map((item) => {
                      const taxonomyValue = studentTaxonomies.length > 0 && studentTaxonomies.find(taxonomy => taxonomy.taxonomy.id === item.id);
                      return (
                        <div key={item.id}>
                          <div className={form('taxonomy-title-input')}>
                            {item.title}
                          </div>
                          <CustomTextInput
                            className={form('taxonomy-input')}
                            type="text"
                            value={(taxonomyValue && taxonomyValue.value) ? taxonomyValue.value : ''}
                            name={item.title}
                            placeholder={item.format}
                            onChange={e => this.handleChangeTaxonomy(e.target.value, item.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
            <section className={page('right')}>
              <section className={profile()}>
                <CreatedAtAdminBlock
                  currentLmsGroup={currentStudents[0]}
                />
                <div className={profile('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    isUpload="false"
                    imageUrl={avatar}
                    removeDownloadLink={this.handleRemoveAvatar}
                  />
                </div>
                <div className={form('courses-word')}>
                  <IntlMessages id="courses.coursesWord" />
                </div>
                <div className={form('courses-info')}>
                  <IntlMessages id="courses.clickInfo" />
                </div>
                {userCourseRelation && userCourseRelation.map(item => (
                  <CourseItemEdit
                    key={item.id}
                    item={item}
                    handleSaveDate={this.handleSaveDate}
                    handleCheck={this.handleCheckCoursePassed}
                    handleClickCourse={this.handleClickCourse}
                    handleDelete={this.handleDeleteCourse}
                  />
                ))}
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
                  />
                </div>
                <div className={course('select-all')}>
                  {Boolean(coursesList.length)
                  && (
                  <SelectAllNone
                    onSelectAll={selectAllCourses}
                    onSelectNone={selectNoneCourses}
                  />
                  )
                  }
                </div>
                {coursesList && coursesList.map(item => (
                  <CourseItem
                    key={item.id}
                    item={item}
                    handleSaveDate={this.handleSaveDate}
                    onChangeCheckbox={() => setCurrentCourseStudents(item.id)}
                  />
                ))}
                <div className={profile('button')}>
                  <Link
                    className={profile('link')}
                    to={urlToDelete(studentId)}
                  >
                    <DefaultButton
                      textId="groupAdmin.deleteBtn"
                      isDelete
                    />
                  </Link>
                  <DefaultButton
                    textId="groupAdmin.saveBtn"
                    onClick={() => this.handleEditStudent()}
                  />
                </div>
              </section>
            </section>
          </section>
          <Modal
            visible={isOpenDeleteModal}
            onCancel={this.handleCloseModal}
            footer={null}
            centered
          >
            <StudentsEditWrapper>
              <p className={profile('delete-attend')}>
                <IntlMessages id="student.deleteCourse" />
              </p>
              <div className={profile('button', { isCentered: true })}>
                <DefaultButton
                  textId="courses.yesWord"
                  onClick={this.handleDeleteStudentFromCourse}
                  isDelete
                />
                <DefaultButton
                  textId="courses.noWord"
                  onClick={this.handleCloseModal}
                />
              </div>
            </StudentsEditWrapper>
          </Modal>
        </StudentsEditWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const searchLmsGroupsData = getSearchLmsGroupsStudentsFp(state);
  const searchOrgData = getSearchOrgStudentsFp(state);
  const searchGroupData = getSearchGroupStudentsFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdStudentsFp(state);
  const currentNameLmsGroup = getCurrentNameLmsGroupStudentsFp(state);
  const currentOrgId = getCurrentOrgIdStudentsFp(state);
  const currentOrgName = getCurrentOrgNameStudentsFp(state);
  const searchCoursesData = getSearchCoursesFp(state);
  const chosenCourses = getChosenCoursesStudentsFp(state);
  const currentStudents = getCurrentStudentsFp(state);
  const currentStudentId = getCurrentStudentIdFp(state);
  const isEditStudent = getEditStatusStudentFp(state);
  const isPasswordResetStudent = getResetPasswordStatusStudentFp(state);
  const hasPhysical = state.students.hasPhysicalCourse;
  const selectedCoursesForStudents = state.students.selectedCourses;

  const { user } = state.Auth;
  const { taxonomies } = state.taxonomy;
  const { pathname } = location;
  const res = pathname && pathname.match(getInfoId);
  const studentId = currentStudentId || res[1];

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
    studentId,
    isEditStudent,
    isPasswordResetStudent,
    hasPhysical,
    user,
    taxonomies,
    selectedCoursesForStudents,
  };
};

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
    ...TaxonomyActions,
  },
)(StudentsEdit);
