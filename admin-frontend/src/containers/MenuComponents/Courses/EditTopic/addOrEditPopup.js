import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  PLACEHOLDER,
  MAX_THREE_DIGIT_NUMBER
} from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { SearchSvg, Checkbox, DefaultButton } from 'components';
import { Radio, Modal } from 'antd';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import coursesActions from 'redux/courses/actions';
import PopupWrapper from './popUp.style';

const p = bemlds('popup');
const chunk = bemlds('topic-chunk');
const {
  coursesLessonLinkPlaceholder,
  coursesLessonNamePlaceholder,
  coursesExamNamePlaceholder,
  coursesValuePlaceholder,
  coursesAssignmentNamePlaceholder,
} = PLACEHOLDER;

const VIEW_TYPES = {
  search: 'search',
  form: 'form',
};
const AddOrEditPopup = (props) => {
  const [viewType, toggleViewType] = useState(VIEW_TYPES.search);
  const [isHideRadio, toggleHideRadio] = useState(false);
  const {
    isOpen,
    togglePopUp,
    title,
    searchLessonData,
    searchLessonValue,
    setCurrentLesson,
    handleInputChange,
    onChangeLessonSearch,
    currentLesson,
    topicCreateSchema,
    createNewLesson,
    currentTopicId,
    handleAddLesson,
    clearLessonState,
    lessonState,
    searchExamValue,
    onChangeExamSearch,
    searchExamData,
    setCurrentExam,
    createNewExam,
    currentExam,
    handleAddExam,
    examState,
    searchAssignmentValue,
    onChangeAssignmentSearch,
    searchAssignmentData,
    currentAssignment,
    setCurrentAssignment,
    createNewAssignment,
    handleAddAssignment,
    assignmentState,
    notSave,
    clearCurrentLessonFiles,
    clearLessonSearch,
    handleClearInput,
  } = props;

  useEffect(() => {
    if (lessonState.id
      || examState.id
      || assignmentState.id) {
      toggleViewType(VIEW_TYPES.form);
      toggleHideRadio(true);
    }
  }, [lessonState.id, examState.id, assignmentState.id]);

  const handleClosePopup = () => {
    toggleViewType(VIEW_TYPES.search);
    togglePopUp(false);
    clearLessonState();
    clearLessonSearch();
    handleClearInput();
    toggleHideRadio(false);
    if (title === 'lessons') {
      clearCurrentLessonFiles();
    }
  };

  const handleSaveAssigments = (type, values) => {
    if (type === 'selected') {
      handleClosePopup();
      const assignmentForSave = {
        name: currentAssignment.name,
        url: currentAssignment.url,
        id: currentAssignment.id,
        maxTries: currentAssignment.maxTries,
        maxPoints: currentAssignment.maxPoints,
        gradeA: currentAssignment.gradeA,
        gradeC: currentAssignment.gradeC,
        isManually: currentAssignment.isManually,
      };
      if (notSave) {
        handleAddAssignment(assignmentForSave);
      } else {
        createNewAssignment({
          name: currentAssignment.name,
          url: currentAssignment.url,
          topicId: currentTopicId,
          maxTries: currentAssignment.maxTries,
          maxPoints: currentAssignment.maxPoints,
          gradeA: currentAssignment.gradeA,
          gradeC: currentAssignment.gradeC,
          isManually: currentAssignment.isManually,
        });
      }
      handleInputChange({
        target: {
          name: 'searchAssignmentValue',
          value: '',
        },
      });
      onChangeAssignmentSearch({
        target: {
          value: null,
        },
      });
      setCurrentAssignment({});

      return;
    }

    handleAddAssignment(values);
    handleClosePopup();
  };

  const handleSaveExam = (type, values) => {
    if (type === 'selected') {
      handleClosePopup();
      const examForSave = {
        name: currentExam.name,
        url: currentExam.url,
        maxTries: currentExam.maxTries,
        maxPoints: currentExam.maxPoints,
        gradeA: currentExam.gradeA,
        gradeC: currentExam.gradeC,
        id: currentExam.id,
        isManually: currentExam.isManually,
      };
      if (notSave) {
        handleAddExam(examForSave);
      } else {
        createNewExam({
          name: currentExam.name,
          url: currentExam.url,
          maxTries: currentExam.maxTries,
          maxPoints: currentExam.maxPoints,
          gradeA: currentExam.gradeA,
          gradeC: currentExam.gradeC,
          topicId: currentTopicId,
          isManually: currentExam.isManually,
        });
      }
      handleInputChange({
        target: {
          name: 'searchExamValue',
          value: '',
        },
      });
      onChangeExamSearch({
        target: {
          value: null,
        },
      });
      setCurrentExam({});
      return;
    }
    handleAddExam(values);
    handleClosePopup();
  };

  const isDisabled = errors => errors.assignmentValue
    || errors.linkAssignmentValue
    || errors.numberPassed
    || errors.numberPassedHonour
    || errors.numberTries
    || errors.maxPoints;

  const handleSaveLesson = (type, values) => {
    if (type === 'selected') {
      handleClosePopup();
      createNewLesson({
        name: currentLesson.name,
        url: currentLesson.url,
        topicId: currentTopicId,
      });
      handleInputChange({
        target: {
          name: 'searchLessonValue',
          value: '',
        },
      });
      onChangeLessonSearch({
        target: {
          value: null,
        },
      });
      setCurrentLesson({});

      return;
    }
    const isUnFilled = Object.entries(values).some(item => !item[1]);
    if (isUnFilled) {
      return;
    }
    handleAddLesson({ ...values });
    handleClosePopup();
  };

  const handleChangeNumberInput = (e, callback)=>{
    const { target: { value } } = e
    const valueNumber = Number(value);
    const isValidValue = !isNaN(valueNumber) && valueNumber <= MAX_THREE_DIGIT_NUMBER;

    if (isValidValue) {
      callback(e);
    }
  }

  const getContent = () => {
    const isSearch = viewType === VIEW_TYPES.search;
    switch (title) {
      case 'lessons': {
        return (
          <div>
            {isSearch ? (
              <div className={chunk('block')}>
                <div className={chunk('block-label')}>
                  <IntlMessages id="courses.lessonSelectTitle" />
                </div>
                <div className={chunk('block-search')}>
                  <SearchSvg />
                  <input
                    className={chunk('block-search-input')}
                    type="text"
                    value={searchLessonValue}
                    name="searchLessonValue"
                    placeholder={coursesLessonNamePlaceholder}
                    onChange={(e) => {
                      handleInputChange(e);
                      onChangeLessonSearch(e);
                    }}
                  />
                </div>
                {searchLessonData.length > 0 && (
                <div className={chunk('block-search-list')}>
                  {(
                      searchLessonData.map(lesson => (
                        <div
                          role="presentation"
                          className={chunk('block-search-list-item', { active: lesson.id === currentLesson.id })}
                          key={lesson.id}
                          onClick={() => {
                            setCurrentLesson(lesson);
                          }}
                        >
                          {lesson.name}
                        </div>
                      ))
                    )}
                </div>
                )}
                <div className={chunk('create-add')}>
                  <DefaultButton
                    textId="courses.addBtn"
                    disabled={!currentLesson.id}
                    onClick={() => handleSaveLesson('selected')}
                  />
                </div>
              </div>
            ) : (
              <Formik
                enableReinitialize
                initialValues={lessonState}
                validationSchema={topicCreateSchema}
                render={({
                  errors,
                  handleSubmit,
                  touched,
                  handleChange,
                  values,
                  resetForm,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    className={chunk()}
                  >
                    <div className={chunk('create')}>
                      <div className={chunk('create-label')}>
                        <IntlMessages id="courses.lessonName" />
                      </div>
                      <input
                        className={chunk('create-input', { error: Boolean(errors.newLessonValue) })}
                        type="text"
                        value={values.newLessonValue}
                        name="newLessonValue"
                        placeholder={coursesLessonNamePlaceholder}
                        onChange={handleChange}
                        isTouched={touched.newLessonValue}
                        error={errors.newLessonValue}
                        isValid={!errors.newLessonValue}
                      />
                      <div className={chunk('create-description')}>
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.lessonLinkLabel" />
                        </div>
                        <input
                          className={chunk('create-input', { error: Boolean(errors.linkLessonValue) })}
                          type="text"
                          value={values.linkLessonValue}
                          name="linkLessonValue"
                          placeholder={coursesLessonLinkPlaceholder}
                          onChange={handleChange}
                          isTouched={touched.linkLessonValue}
                          error={errors.linkLessonValue}
                          isValid={!errors.linkLessonValue}
                        />
                      </div>
                      <div className={chunk('create-add')}>
                        <DefaultButton
                          textId={
                            lessonState.id
                              ? 'courses.saveBtn'
                              : 'courses.addBtn'
                          }
                          disabled={errors.newLessonValue || errors.linkLessonValue}
                          onClick={() => {
                            handleSaveLesson('', values);
                            resetForm();
                          }}
                        />
                      </div>
                    </div>
                  </form>
                )}
              />
            )}
          </div>
        );
      }

      case 'exams': {
        return (
          <div>
            {isSearch ? (
              <div className={chunk('block')}>
                <div className={chunk('block-label')}>
                  <IntlMessages id="courses.examSelectTitle" />
                </div>
                <div className={chunk('block-search')}>
                  <SearchSvg />
                  <input
                    className={chunk('block-search-input')}
                    type="text"
                    value={searchExamValue}
                    name="searchExamValue"
                    placeholder={coursesExamNamePlaceholder}
                    onChange={(e) => {
                      handleInputChange(e);
                      onChangeExamSearch(e);
                    }}
                  />
                </div>
                {searchExamData.length > 0 && (
                <div className={chunk('block-search-list')}>
                  {(
                searchExamData.map(exam => (
                  <div
                    role="presentation"
                    className={chunk('block-search-list-item', { active: exam.id === currentExam.id })}
                    key={exam.id}
                    onClick={() => {
                      setCurrentExam(exam);
                    }}
                  >
                    {exam.name}
                  </div>
                ))
              )}
                </div>
                )}
                <div className={chunk('create-add')}>
                  <DefaultButton
                    textId="courses.addBtn"
                    disabled={!currentExam.id}
                    onClick={() => handleSaveExam('selected')}
                  />
                </div>
              </div>
            )
              : (
                <Formik
                  enableReinitialize
                  initialValues={examState}
                  validationSchema={topicCreateSchema}
                  validateOnMount
                  render={({
                    errors,
                    handleSubmit,
                    touched,
                    handleChange,
                    values,
                    resetForm,
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className={chunk()}
                    >
                      <div className={chunk('create')}>
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.examName" />
                        </div>
                        <input
                          className={chunk('create-input', { error: Boolean(errors.examValue) })}
                          type="text"
                          value={values.examValue}
                          name="examValue"
                          placeholder={coursesExamNamePlaceholder}
                          onChange={handleChange}
                          isTouched={touched.examValue}
                          error={errors.examValue}
                          isValid={!errors.examValue}
                        />
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.numberPassed" />
                        </div>
                        <input
                          className={chunk('create-input', { error: Boolean(errors.numberPassed) })}
                          type="text"
                          value={values.numberPassed}
                          name="numberPassed"
                          placeholder={coursesValuePlaceholder}
                          onChange={(e) => handleChangeNumberInput(e, handleChange)}
                          isTouched={touched.numberPassed}
                          error={errors.numberPassed}
                          isValid={!errors.numberPassed}
                        />
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.numberPassedHonour" />
                        </div>
                        <input
                          className={chunk('create-input')}
                          type="text"
                          value={values.numberPassedHonour}
                          name="numberPassedHonour"
                          placeholder={coursesValuePlaceholder}
                          onChange={(e) => handleChangeNumberInput(e, handleChange)}
                          isTouched={touched.numberPassedHonour}
                          error={errors.numberPassedHonour}
                          isValid={!errors.numberPassedHonour}
                        />
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.numberTries" />
                        </div>
                        <input
                          className={chunk('create-input')}
                          type="text"
                          value={values.numberTries}
                          name="numberTries"
                          placeholder={coursesValuePlaceholder}
                          onChange={(e) => handleChangeNumberInput(e, handleChange)}
                          isTouched={touched.numberTries}
                          error={errors.numberTries}
                          isValid={!errors.numberTries}
                        />
                        <div className={chunk('create-label')}>
                          <IntlMessages id="exam.maxPoints" />
                        </div>
                        <input
                          className={chunk('create-input', { error: Boolean(errors.maxPoints) })}
                          type="text"
                          value={values.maxPoints}
                          name="maxPoints"
                          placeholder={coursesValuePlaceholder}
                          onChange={(e) => handleChangeNumberInput(e, handleChange)}
                          isTouched={touched.maxPoints}
                          error={errors.maxPoints}
                          isValid={!errors.maxPoints}
                        />
                        <div className={chunk('create-label')}>
                          <IntlMessages id="courses.link" />
                        </div>
                        <input
                          className={chunk('create-input', { error: Boolean(errors.linkExamValue) })}
                          type="text"
                          value={values.linkExamValue}
                          name="linkExamValue"
                          placeholder={coursesLessonLinkPlaceholder}
                          onChange={handleChange}
                          isTouched={touched.linkExamValue}
                          error={errors.linkExamValue}
                          isValid={!errors.linkExamValue}
                        />
                        <Checkbox
                          handleCheck={(value, name) => handleChange({
                            target: {
                              value,
                              name,
                            },
                          })}
                          name="isManually"
                          value={values.isManually}
                          title={<IntlMessages id="courses.ExamIsManually" />}
                        />
                        <div className={chunk('create-add')}>
                          <DefaultButton
                            textId={
                              examState.id
                                ? 'courses.saveBtn'
                                : 'courses.addBtn'
                            }
                            disabled={
                              errors.examValue
                              || errors.numberPassed
                              || errors.numberPassedHonour
                              || errors.numberTries
                              || errors.linkExamValue
                              || errors.maxPoints
                            }
                            onClick={() => {
                              handleSaveExam('', values);
                              resetForm();
                            }}
                          />
                        </div>
                      </div>
                    </form>
                  )}
                />
              )
            }
          </div>
        );
      }

      case 'assignments': {
        return (
          <div>
            {
              isSearch ? (
                <div className={chunk('block')}>
                  <div className={chunk('block-label')}>
                    <IntlMessages id="courses.assignmentSelect" />
                  </div>
                  <div className={chunk('block-search')}>
                    <SearchSvg />
                    <input
                      className={chunk('block-search-input')}
                      type="text"
                      value={searchAssignmentValue}
                      name="searchAssignmentValue"
                      placeholder={coursesAssignmentNamePlaceholder}
                      onChange={(e) => {
                        handleInputChange(e);
                        onChangeAssignmentSearch(e);
                      }}
                    />
                  </div>
                  {searchAssignmentData.length > 0 && (
                  <div className={chunk('block-search-list')}>
                    {(
                    searchAssignmentData.map(assignment => (
                      <div
                        role="presentation"
                        className={chunk('block-search-list-item', { active: assignment.id === currentAssignment.id })}
                        key={assignment.id}
                        onClick={() => {
                          setCurrentAssignment(assignment);
                        }}
                      >
                        {assignment.name}
                      </div>
                    ))
                  )}
                  </div>
                  )}
                  <div className={chunk('create-add')}>
                    <DefaultButton
                      textId="courses.addBtn"
                      disabled={!currentAssignment.id}
                      onClick={() => handleSaveAssigments('selected')}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <Formik
                    enableReinitialize
                    initialValues={assignmentState}
                    validationSchema={topicCreateSchema}
                    validateOnMount
                    render={({
                      errors,
                      handleSubmit,
                      touched,
                      handleChange,
                      values,
                      resetForm,
                    }) => (
                      <form
                        onSubmit={handleSubmit}
                        className={chunk()}
                      >
                        <div className={chunk('create')}>
                          <div className={chunk('create-label')}>
                            <IntlMessages id="courses.assignment" />
                          </div>
                          <input
                            className={chunk('create-input', { error: Boolean(errors.assignmentValue) })}
                            type="text"
                            value={values.assignmentValue}
                            name="assignmentValue"
                            placeholder={coursesAssignmentNamePlaceholder}
                            onChange={handleChange}
                            isTouched={touched.assignmentValue}
                            error={errors.assignmentValue}
                            isValid={!errors.assignmentValue}
                          />
                          <div className={chunk('create-label')}>
                            <IntlMessages id="courses.numberPassed" />
                          </div>
                          <input
                            className={chunk('create-input', { error: Boolean(errors.numberPassed) })}
                            type="text"
                            value={values.numberPassed}
                            name="numberPassed"
                            placeholder={coursesValuePlaceholder}
                            onChange={handleChange}
                            isTouched={touched.numberPassed}
                            error={errors.numberPassed}
                            isValid={!errors.numberPassed}
                          />
                          <div className={chunk('create-label')}>
                            <IntlMessages id="courses.numberPassedHonour" />
                          </div>
                          <input
                            className={chunk('create-input')}
                            type="text"
                            value={values.numberPassedHonour}
                            name="numberPassedHonour"
                            placeholder={coursesValuePlaceholder}
                            onChange={handleChange}
                            isTouched={touched.numberPassedHonour}
                            error={errors.numberPassedHonour}
                            isValid={!errors.numberPassedHonour}
                          />
                          <div className={chunk('create-label')}>
                            <IntlMessages id="courses.numberTries" />
                          </div>
                          <input
                            className={chunk('create-input')}
                            type="text"
                            value={values.numberTries}
                            name="numberTries"
                            placeholder={coursesValuePlaceholder}
                            onChange={handleChange}
                            isTouched={touched.numberTries}
                            error={errors.numberTries}
                            isValid={!errors.numberTries}
                          />
                          <div className={chunk('create-label')}>
                            <IntlMessages id="assignment.maxPoints" />
                          </div>
                          <input
                            className={chunk('create-input', { error: Boolean(errors.maxPoints) })}
                            type="text"
                            value={values.maxPoints}
                            name="maxPoints"
                            placeholder={coursesValuePlaceholder}
                            onChange={handleChange}
                            isTouched={touched.maxPoints}
                            error={errors.maxPoints}
                            isValid={!errors.maxPoints}
                          />
                          <div className={chunk('create-description')}>
                            <div className={chunk('create-label')}>
                              <IntlMessages id="courses.link" />
                            </div>
                            <input
                              className={chunk('create-input', { error: Boolean(errors.linkAssignmentValue) })}
                              type="text"
                              value={values.linkAssignmentValue}
                              name="linkAssignmentValue"
                              placeholder={coursesLessonLinkPlaceholder}
                              onChange={handleChange}
                              isTouched={touched.linkAssignmentValue}
                              error={errors.linkAssignmentValue}
                              isValid={!errors.linkAssignmentValue}
                            />
                          </div>
                          <Checkbox
                            handleCheck={(value, name) => handleChange({
                              target: {
                                value,
                                name,
                              },
                            })}
                            name="isManually"
                            value={values.isManually}
                            title={<IntlMessages id="courses.assignmentIsManually" />}
                          />
                          <div className={chunk('create-add')}>
                            <DefaultButton
                              textId={
                                assignmentState.id
                                  ? 'courses.saveBtn'
                                  : 'courses.addBtn'
                              }
                              disabled={isDisabled(errors)}
                              onClick={() => {
                                handleSaveAssigments('', values);
                                resetForm();
                              }}
                            />
                          </div>
                        </div>
                      </form>
                    )}
                  />
                </div>
              )
            }
          </div>
        );
      }
      default:
        return <div />;
    }
  };


  return (
    <PopupWrapper>
      {!isOpen && (/* переделать позиционирование попАпа */
      <div
        className={p('new-topic')}
        role="button"
        tabIndex="-1"
        onClick={() => togglePopUp(true)}
      >
        <IntlMessages id={`courses.add${title}`} />
      </div>
      )}
      <Modal
        visible={isOpen}
        onCancel={handleClosePopup}
        footer={null}
        centered
        className={p('modal')}
      >
        <PopupWrapper>
          {!isHideRadio && (
          <Radio.Group
            onChange={({ target: { value } }) => toggleViewType(value)}
            value={viewType}
          >
            <Radio value={VIEW_TYPES.search}><IntlMessages id={`courses.search${title}`} /></Radio>
            <Radio value={VIEW_TYPES.form}><IntlMessages id={`courses.form${title}`} /></Radio>
          </Radio.Group>
          )}
          {getContent()}
        </PopupWrapper>
      </Modal>
    </PopupWrapper>
  );
};

AddOrEditPopup.defaultProps = {
  isOpen: false,
  togglePopUp: () => null,
  title: '',
  searchLessonData: [],
  searchLessonValue: '',
  setCurrentLesson: () => null,
  handleInputChange: () => null,
  onChangeLessonSearch: () => null,
  currentLesson: {},
  topicCreateSchema: {},
  createNewLesson: () => null,
  currentTopicId: 0,
  handleAddLesson: () => null,
  clearLessonState: () => null,
  lessonState: {},
  searchExamData: [],
  searchExamValue: '',
  onChangeExamSearch: () => null,
  setCurrentExam: () => null,
  createNewExam: () => null,
  currentExam: {},
  handleAddExam: () => null,
  examState: {},
  searchAssignmentValue: '',
  onChangeAssignmentSearch: () => null,
  searchAssignmentData: [],
  currentAssignment: {},
  setCurrentAssignment: () => null,
  createNewAssignment: () => null,
  handleAddAssignment: () => null,
  assignmentState: {},
  notSave: false,
  clearCurrentLessonFiles: () => null,
  currentLessonFiles: [],
  setCurrentLessonFiles: () => null,
  clearLessonSearch: () => null,
  handleClearInput: () => null,
};

AddOrEditPopup.propTypes = {
  isOpen: PropTypes.bool,
  togglePopUp: PropTypes.func,
  title: PropTypes.string,
  searchLessonData: PropTypes.arrayOf(PropTypes.shape({})),
  searchLessonValue: PropTypes.string,
  setCurrentLesson: PropTypes.func,
  handleInputChange: PropTypes.func,
  onChangeLessonSearch: PropTypes.func,
  currentLesson: PropTypes.shape({
    exams: PropTypes.arrayOf(PropTypes.shape({})),
    assignments: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  topicCreateSchema: PropTypes.shape({}),
  createNewLesson: PropTypes.func,
  currentTopicId: PropTypes.number,
  handleAddLesson: PropTypes.func,
  clearLessonState: PropTypes.func,
  lessonState: PropTypes.shape({}),
  searchExamData: PropTypes.arrayOf(PropTypes.shape({})),
  searchExamValue: PropTypes.string,
  onChangeExamSearch: PropTypes.func,
  setCurrentExam: PropTypes.func,
  createNewExam: PropTypes.func,
  currentExam: PropTypes.shape({}),
  handleAddExam: PropTypes.func,
  examState: PropTypes.shape({}),
  searchAssignmentValue: PropTypes.string,
  onChangeAssignmentSearch: PropTypes.func,
  searchAssignmentData: PropTypes.arrayOf(PropTypes.shape({})),
  currentAssignment: PropTypes.shape({}),
  setCurrentAssignment: PropTypes.func,
  createNewAssignment: PropTypes.func,
  handleAddAssignment: PropTypes.func,
  assignmentState: PropTypes.shape({}),
  notSave: PropTypes.bool,
  clearCurrentLessonFiles: PropTypes.func,
  currentLessonFiles: PropTypes.arrayOf(PropTypes.shape({})),
  setCurrentLessonFiles: PropTypes.func,
  clearLessonSearch: PropTypes.func,
  handleClearInput: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { currentLessonFiles } = state.courses;

  return {
    currentLessonFiles,
  };
};

export default connect(mapStateToProps, { ...coursesActions })(AddOrEditPopup);
