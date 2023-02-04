import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import {
  DraggableList,
} from 'components';
import { bemlds } from 'utils';
import AddOrEditPopup from './addOrEditPopup';

const block = bemlds('drag-n-drop-block');

const defaultProps = {
  title: '',
  type: '',
  list: [],
  deleteAction: () => null,
  changeOrder: () => null,
  searchLessonData: [],
  searchLessonValue: '',
  setCurrentLesson: () => null,
  handleInputChange: () => null,
  handleChangeLessonSearch: () => null,
  currentLesson: () => null,
  topicCreateSchema: {},
  createNewLesson: () => null,
  currentTopicId: 0,
  handleAddLesson: () => null,
  searchExamValue: '',
  handleChangeExamSearch: () => null,
  searchExamData: [],
  setCurrentExam: () => null,
  createNewExam: () => null,
  currentExam: {},
  handleAddExam: () => null,
  searchAssignmentValue: '',
  handleChangeAssignmentSearch: () => null,
  searchAssignmentData: [],
  currentAssignment: {},
  setCurrentAssignment: () => null,
  createNewAssignment: () => null,
  handleAddAssignment: () => null,
  notSave: false,
  handleClearInput: () => null,
};

const propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})),
  changeOrder: PropTypes.func,
  deleteAction: PropTypes.func,
  searchLessonData: PropTypes.arrayOf(PropTypes.shape({})),
  searchLessonValue: PropTypes.string,
  setCurrentLesson: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleChangeLessonSearch: PropTypes.func,
  currentLesson: PropTypes.shape,
  topicCreateSchema: PropTypes.shape({}),
  createNewLesson: PropTypes.func,
  currentTopicId: PropTypes.number,
  handleAddLesson: PropTypes.func,
  searchExamValue: PropTypes.string,
  handleChangeExamSearch: PropTypes.func,
  searchExamData: PropTypes.arrayOf(PropTypes.shape({})),
  setCurrentExam: PropTypes.func,
  createNewExam: PropTypes.func,
  currentExam: PropTypes.shape({}),
  handleAddExam: PropTypes.func,
  searchAssignmentValue: PropTypes.string,
  handleChangeAssignmentSearch: PropTypes.func,
  searchAssignmentData: PropTypes.arrayOf(PropTypes.shape({})),
  currentAssignment: PropTypes.shape({}),
  setCurrentAssignment: PropTypes.func,
  createNewAssignment: PropTypes.func,
  handleAddAssignment: PropTypes.func,
  notSave: PropTypes.bool,
  handleClearInput: PropTypes.func,
};

const INITIAL_LESSON = {
  newLessonValue: '',
  linkLessonValue: '',
};

const INITIAL_EXAM = {
  examValue: '',
  numberPassed: '',
  linkExamValue: '',
  maxPoints: '',
  isManually: false,
};

const INITIAL_ASSIGNMENT = {
  assignmentValue: '',
  linkAssignmentValue: '',
  numberPassed: '',
  maxPoints: '',
  isManually: false,
};

const ListComponent = ({
  title,
  type,
  changeOrder,
  list,
  deleteAction,
  searchLessonData,
  searchLessonValue,
  setCurrentLesson,
  handleInputChange,
  handleChangeLessonSearch,
  currentLesson,
  topicCreateSchema,
  createNewLesson,
  currentTopicId,
  handleAddLesson,
  searchExamValue,
  handleChangeExamSearch,
  searchExamData,
  setCurrentExam,
  createNewExam,
  currentExam,
  handleAddExam,
  searchAssignmentValue,
  handleChangeAssignmentSearch,
  searchAssignmentData,
  currentAssignment,
  setCurrentAssignment,
  createNewAssignment,
  handleAddAssignment,
  notSave,
  handleClearInput,
}) => {
  const [popupIsOpen, togglePopup] = useState(false);
  const [lessonState, setLessonState] = useState(INITIAL_LESSON);
  const [examState, setExamState] = useState(INITIAL_EXAM);
  const [assignmentState, setAssignmentState] = useState(INITIAL_ASSIGNMENT);

  const clearStore = () => {
    setLessonState(INITIAL_LESSON);
    setExamState(INITIAL_EXAM);
    setAssignmentState(INITIAL_ASSIGNMENT);
  };

  const handleEditAssignments = (id) => {
    const foundedObject = list.find(item => item.id === id);
    const {
      name,
      url,
      gradeA,
      gradeC,
      maxTries,
      isManually,
      maxPoints,
    } = foundedObject;
    setAssignmentState({
      id,
      assignmentValue: name,
      linkAssignmentValue: url,
      numberPassed: gradeC,
      numberPassedHonour: gradeA,
      numberTries: maxTries,
      isManually,
      maxPoints,
    });
    togglePopup(true);
  };

  const handleEditLessons = (id) => {
    const foundedObject = list.find(item => item.id === id);
    const {
      name,
      url,
    } = foundedObject;
    setLessonState({
      id,
      newLessonValue: name,
      linkLessonValue: url,
    });
    togglePopup(true);
  };

  const handleEditExam = (id) => {
    const foundedObject = list.find(item => item.id === id);
    const {
      name,
      gradeA,
      gradeC,
      url,
      maxTries,
      isManually,
      maxPoints,
    } = foundedObject;
    setExamState({
      examValue: name,
      numberPassed: gradeC,
      numberPassedHonour: gradeA,
      numberTries: maxTries,
      linkExamValue: url,
      id,
      isManually,
      maxPoints,
    });
    togglePopup(true);
  };

  const handleEdit = (id) => {
    if (type === 'assignments') {
      handleEditAssignments(id);
    }
    if (type === 'lessons') {
      handleEditLessons(id);
    }
    if (type === 'exams') {
      handleEditExam(id);
    }
  };

  return (
    <section className={block()}>
      <div className={block('title')}>
        <IntlMessages id={`courses.${title}`} />
      </div>
      <DraggableList
        type={type}
        changeOrder={changeOrder}
        draggableList={list}
        deleteItemFromSelected={deleteAction}
        onEdit={handleEdit}
      />
      <AddOrEditPopup
        title={type}
        togglePopUp={togglePopup}
        isOpen={popupIsOpen}
        searchLessonData={searchLessonData}
        searchLessonValue={searchLessonValue}
        setCurrentLesson={setCurrentLesson}
        handleInputChange={handleInputChange}
        onChangeLessonSearch={handleChangeLessonSearch}
        currentLesson={currentLesson}
        topicCreateSchema={topicCreateSchema}
        createNewLesson={createNewLesson}
        currentTopicId={currentTopicId}
        handleAddLesson={handleAddLesson}
        clearLessonState={clearStore}
        lessonState={lessonState}
        searchExamValue={searchExamValue}
        onChangeExamSearch={handleChangeExamSearch}
        searchExamData={searchExamData}
        setCurrentExam={setCurrentExam}
        createNewExam={createNewExam}
        currentExam={currentExam}
        handleAddExam={handleAddExam}
        examState={examState}
        searchAssignmentValue={searchAssignmentValue}
        onChangeAssignmentSearch={handleChangeAssignmentSearch}
        searchAssignmentData={searchAssignmentData}
        currentAssignment={currentAssignment}
        setCurrentAssignment={setCurrentAssignment}
        createNewAssignment={createNewAssignment}
        handleAddAssignment={handleAddAssignment}
        assignmentState={assignmentState}
        notSave={notSave}
        handleClearInput={handleClearInput}
      />
    </section>
  );
};


ListComponent.propTypes = propTypes;
ListComponent.defaultProps = defaultProps;

export default ListComponent;
