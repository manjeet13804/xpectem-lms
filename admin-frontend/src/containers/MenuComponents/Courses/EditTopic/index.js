import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import * as Yup from 'yup';
import coursesActions from 'redux/courses/actions';
import {
  getSearchLessonsFp,
  getCurrentLessonFp,
  getSearchExamsFp,
  getCurrentSelectedExamFp,
  getSelectedExamsFp,
  getSearchAssignmentFp,
  getSelectedAssignmentsFp,
  getCurrentAssignmentFp,
  getSelectedLessonsFp,
  getCurrentTopicObjectFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  SimpleTextFormat,
  DefaultButton,
} from 'components';
import { bemlds } from 'utils';
import { Spin } from 'antd';
import { REGEXP } from 'constants/regexp';
import { PLACEHOLDER } from 'constants/constants';
import EditTopicWrapper from './editTopic.style';
import ListComponent from './listComponent';
import AddOrEdiFilesPopup from './addOrEdiFilesPopup';

const {
  courseTopicPlaceholder,
} = PLACEHOLDER;
const { getCurrentTopicId, getUrlBeforeEditTopic } = REGEXP;

const page = bemlds('page');
const title = bemlds('title-topic');
const chunk = bemlds('topic-chunk');

const topicCreateSchema = Yup.object().shape({
  newLessonValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
  linkLessonValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
  examValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
  numberPassed: Yup.number()
    .integer()
    .min(0)
    .required('SHOULD_BE_FILLED'),
  numberPassedHonour: Yup.number()
    .integer()
    .nullable()
    .min(0),
  numberTries: Yup.number()
    .integer()
    .nullable()
    .min(0),
  maxPoints: Yup.number()
    .integer()
    .min(0)
    .required('SHOULD_BE_FILLED'),
  linkExamValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
  assignmentValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
  linkAssignmentValue: Yup.string()
    .required('SHOULD_BE_FILLED'),
});

const defaultProps = {
  currentTopic: {
    id: null,
    name: '',
  },
  searchLessonData: [],
  searchExamData: [],
  setCurrentLesson: null,
  searchLessonCourses: null,
  currentLesson: {
    id: null,
    name: '',
  },
  createNewLesson: null,
  searchExamCourse: null,
  currentTopicId: null,
  currentExam: {
    id: null,
  },
  setCurrentExam: null,
  createNewExam: null,
  searchAssignmentCourse: null,
  searchAssignmentData: [],
  currentAssignment: {
    id: null,
  },
  setCurrentAssignment: null,
  createNewAssignment: null,
  changeOrder: null,
  selectedLessons: [],
  selectedExams: [],
  selectedAssignments: [],
  getTopicByIdCourse: null,
  currentTopicObject: {
    id: null,
    name: '',
  },
  deleteItemFromSelected: null,
  changeLessonsOrder: null,
  changeExamsOrder: null,
  changeAssignmentsOrder: null,
  toggleStatusSetInitialProps: null,
  currentResetUrl: '',
  history: {
    push: null,
  },
  updateTopicInfo: () => null,
};

const propTypes = {
  currentTopic: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  searchLessonData: PropTypes.arrayOf(PropTypes.object),
  searchExamData: PropTypes.arrayOf(PropTypes.object),
  setCurrentLesson: PropTypes.func,
  searchLessonCourses: PropTypes.func,
  currentLesson: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  createNewLesson: PropTypes.func,
  searchExamCourse: PropTypes.func,
  currentTopicId: PropTypes.number,
  currentExam: PropTypes.shape({
    id: PropTypes.number,
  }),
  setCurrentExam: PropTypes.func,
  createNewExam: PropTypes.func,
  searchAssignmentCourse: PropTypes.func,
  searchAssignmentData: PropTypes.arrayOf(PropTypes.object),
  currentAssignment: PropTypes.shape({
    id: PropTypes.number,
  }),
  setCurrentAssignment: PropTypes.func,
  createNewAssignment: PropTypes.func,
  changeOrder: PropTypes.func,
  selectedLessons: PropTypes.arrayOf(PropTypes.object),
  selectedExams: PropTypes.arrayOf(PropTypes.object),
  selectedAssignments: PropTypes.arrayOf(PropTypes.object),
  getTopicByIdCourse: PropTypes.func,
  currentTopicObject: {
    id: PropTypes.number,
    name: PropTypes.string,
  },
  deleteItemFromSelected: PropTypes.func,
  changeLessonsOrder: PropTypes.func,
  changeExamsOrder: PropTypes.func,
  changeAssignmentsOrder: PropTypes.func,
  toggleStatusSetInitialProps: PropTypes.func,
  currentResetUrl: PropTypes.string,
  history: {
    push: PropTypes.func,
    goBack: PropTypes.func,
  },
  updateTopicInfo: PropTypes.func,
};

const defaultState = {
  topicValue: '',
  topicDescription: '',
  searchLessonValue: '',
  searchExamValue: '',
  searchAssignmentValue: '',
};

class EditTopic extends PureComponent {
  constructor(props) {
    super(props);

    const {
      searchLessonCourses,
      searchExamCourse,
      searchAssignmentCourse,
    } = props;

    this.state = { ...defaultState };
    this.searchLessonsDebounce = _.debounce(searchLessonCourses, 350);
    this.searchExamsDebounce = _.debounce(searchExamCourse, 350);
    this.searchAssignmentsDebounce = _.debounce(searchAssignmentCourse, 350);
  }

  componentDidMount() {
    const {
      getTopicByIdCourse,
      currentTopicId,
      toggleStatusSetInitialProps,
    } = this.props;
    getTopicByIdCourse(currentTopicId);
    toggleStatusSetInitialProps(false);
  }

  componentWillUnmount() {
    const { clearCurrentTopicObject } = this.props;
    clearCurrentTopicObject();
  }

  onChangeLessonSearch = ({ target: { value } }) => {
    if (value) {
      const trimValue = value.trim('');
      if (trimValue) {
        const queryString = `name=${trimValue}`;
        this.searchLessonsDebounce(queryString);
      }
    }
  };

  onChangeExamSearch = ({ target: { value } }) => {
    if (value) {
      const trimValue = value.trim('');
      if (trimValue) {
        const queryString = trimValue ? `name=${trimValue}` : '';
        this.searchExamsDebounce(queryString);
      }
    }
  };

  onChangeAssignmentSearch = ({ target: { value } }) => {
    if (value) {
      const trimValue = value.trim('');
      if (trimValue) {
        const queryString = trimValue ? `name=${trimValue}` : '';
        this.searchAssignmentsDebounce(queryString);
      }
    }
  };

  handleInputChange = ({ target: { value, name } }) => {
    const { changeField } = this.props;
    changeField(name, value);
  };

  handleChange = ({ target: { value, name } }) => {
    const { changeField } = this.props;
    changeField(name, value);
  }

  handleClearInput = () => {
    this.setState(defaultState);
  }

  handleAddLesson = (values) => {
    const { createNewLesson, currentTopicId } = this.props;
    const {
      newLessonValue,
      linkLessonValue,
      id,
    } = values;


    const body = {
      name: newLessonValue,
      url: linkLessonValue,
      topicId: currentTopicId,
      id,
    };

    createNewLesson(body);
  };

  handleAddExam = (values) => {
    const { createNewExam, currentTopicId } = this.props;
    const {
      examValue,
      numberPassed,
      numberPassedHonour,
      numberTries,
      linkExamValue,
      id,
      isManually,
      maxPoints,
    } = values;

    const body = {
      name: examValue,
      gradeC: numberPassed,
      gradeA: numberPassedHonour,
      maxTries: numberTries,
      url: linkExamValue,
      topicId: currentTopicId,
      id,
      isManually,
      maxPoints,
    };

    createNewExam(body);
  };

  handleAddAssignment = (values) => {
    const { createNewAssignment, currentTopicId } = this.props;
    const {
      assignmentValue,
      linkAssignmentValue,
      id,
      numberPassed,
      maxPoints,
      numberPassedHonour,
      numberTries,
      isManually,
    } = values;

    const body = {
      name: assignmentValue,
      url: linkAssignmentValue,
      topicId: currentTopicId,
      gradeC: numberPassed,
      gradeA: numberPassedHonour,
      maxTries: numberTries,
      maxPoints,
      isManually,
      id,
    };

    createNewAssignment(body);
  };

  changeOrder = (result, type) => {
    const { changeOrder } = this.props;
    changeOrder(result, type);
  };

  handleBack = () => {
    const { history, currentResetUrl } = this.props;
    const { state } = history.location;
    if (state.lastAddress) {
      history.push(state.lastAddress, { notClear: true });
      return;
    }
    if (currentResetUrl) {
      history.push(currentResetUrl, { notClear: true });
    } else {
      history.goBack();
    }
  }

  handleSaveTopic = () => {
    const {
      currentTopicId,
      selectedLessons,
      selectedExams,
      selectedAssignments,
      changeLessonsOrder,
      changeExamsOrder,
      changeAssignmentsOrder,
      currentResetUrl,
      history,
      updateTopicInfo,
      currentTopicObject: {
        id, name, description,
      },
    } = this.props;

    const { state } = history.location;

    const collectArray = array => array.map(({ id, order }) => ({ id, order }));
    if (selectedLessons.length) {
      changeLessonsOrder({
        lessonsOrdersArray: collectArray(selectedLessons),
      },
      currentTopicId);
    }

    if (selectedExams.length) {
      changeExamsOrder({
        examsOrdersArray: collectArray(selectedExams),
      }, currentTopicId);
    }

    if (selectedAssignments.length) {
      changeAssignmentsOrder({
        assignmentsOrdersArray: collectArray(selectedAssignments),
      }, currentTopicId);
    }

    updateTopicInfo(id, name, description);

    if (state && state.lastAddress) {
      history.push(state.lastAddress, { notClear: true });
      return;
    }

    if (currentResetUrl) { history.push(currentResetUrl, { notClear: true }); }
  };

  render() {
    const {
      currentTopicObject: {
        id, name, description, files,
      },
      searchLessonData,
      searchExamData,
      setCurrentLesson,
      currentLesson,
      currentExam,
      setCurrentExam,
      searchAssignmentData,
      currentAssignment,
      setCurrentAssignment,
      selectedLessons,
      selectedExams,
      selectedAssignments,
      deleteItemFromSelected,
      currentTopicId,
      createNewLesson,
      createNewExam,
      createNewAssignment,
      isLoadingCurrentTopicObject,
    } = this.props;

    const {
      searchLessonValue,
      searchExamValue,
      searchAssignmentValue,
    } = this.state;

    return (
      <LayoutContent>
        <EditTopicWrapper>
          <Banner title={<IntlMessages id="courses.editTopicBanner" />} />
          {isLoadingCurrentTopicObject ? (
            <Spin size="small" />
          ) : (
            <section className={page({ column: true })}>
              <div className={title()}>
                <div className={title('title')}>
                  <IntlMessages id="courses.titleEditTopic" />
                  {name}
                </div>
                <div className={title('label')}>
                  <IntlMessages id="courses.labelTopic" />
                </div>
                <input
                  className={title('input')}
                  value={name}
                  placeholder={courseTopicPlaceholder}
                  onChange={this.handleInputChange}
                  name="name"
                />
                <SimpleTextFormat
                  value={description}
                  handleChange={
                    (inputName, value) => this.handleInputChange(
                      { target: { name: inputName, value } },
                    )
                  }
                  name="description"
                  title="courses.topicDescription"
                />
                <div className={chunk('create-add-button')}>
                  <DefaultButton
                    onClick={this.handleSaveTopic}
                    textId="courses.saveBtn"
                  />
                </div>
                <div className={chunk('create-add-button')}>
                  <DefaultButton
                    onClick={this.handleBack}
                    textId="common.backWord"
                  />
                </div>
              </div>
              <section className={page('right')}>
                <ListComponent
                  title="selectedLessonsTitle"
                  type="lessons"
                  changeOrder={this.changeOrder}
                  list={selectedLessons}
                  deleteAction={deleteItemFromSelected}
                  searchLessonData={searchLessonData}
                  searchLessonValue={searchLessonValue}
                  setCurrentLesson={setCurrentLesson}
                  handleInputChange={this.handleInputChange}
                  handleChangeLessonSearch={this.onChangeLessonSearch}
                  currentLesson={currentLesson}
                  topicCreateSchema={topicCreateSchema}
                  createNewLesson={createNewLesson}
                  currentTopicId={currentTopicId}
                  handleAddLesson={this.handleAddLesson}
                  searchAssignmentValue={searchAssignmentValue}
                  handleChangeAssignmentSearch={this.onChangeAssignmentSearch}
                  searchAssignmentData={searchAssignmentData}
                  setCurrentAssignment={setCurrentAssignment}
                  createNewAssignment={createNewAssignment}
                  currentAssignment={currentAssignment}
                  handleAddAssignment={this.handleAddAssignment}
                  searchExamValue={searchExamValue}
                  handleChangeExamSearch={this.onChangeExamSearch}
                  searchExamData={searchExamData}
                  setCurrentExam={setCurrentExam}
                  createNewExam={createNewExam}
                  currentExam={currentExam}
                  handleAddExam={this.handleAddExam}
                  handleClearInput={this.handleClearInput}
                />
                <ListComponent
                  title="selectedExamsTitle"
                  type="exams"
                  changeOrder={this.changeOrder}
                  list={selectedExams}
                  deleteAction={deleteItemFromSelected}
                  topicCreateSchema={topicCreateSchema}
                  currentTopicId={currentTopicId}
                  handleInputChange={this.handleInputChange}
                  searchExamValue={searchExamValue}
                  handleChangeExamSearch={this.onChangeExamSearch}
                  searchExamData={searchExamData}
                  setCurrentExam={setCurrentExam}
                  createNewExam={createNewExam}
                  currentExam={currentExam}
                  handleAddExam={this.handleAddExam}
                  handleClearInput={this.handleClearInput}
                />
                <ListComponent
                  title="selectedAssignmentsTitle"
                  type="assignments"
                  changeOrder={this.changeOrder}
                  list={selectedAssignments}
                  deleteAction={deleteItemFromSelected}
                  topicCreateSchema={topicCreateSchema}
                  currentTopicId={currentTopicId}
                  handleInputChange={this.handleInputChange}
                  searchAssignmentValue={searchAssignmentValue}
                  handleChangeAssignmentSearch={this.onChangeAssignmentSearch}
                  searchAssignmentData={searchAssignmentData}
                  currentAssignment={currentAssignment}
                  setCurrentAssignment={setCurrentAssignment}
                  createNewAssignment={createNewAssignment}
                  handleAddAssignment={this.handleAddAssignment}
                  handleClearInput={this.handleClearInput}
                />
                <AddOrEdiFilesPopup topicId={id} currentLessonFiles={files} />
              </section>
            </section>
          )}
        </EditTopicWrapper>
      </LayoutContent>
    );
  }
}

EditTopic.propTypes = propTypes;
EditTopic.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const searchLessonData = getSearchLessonsFp(state);
  const currentLesson = getCurrentLessonFp(state);
  const searchExamData = getSearchExamsFp(state);
  const currentExam = getCurrentSelectedExamFp(state);
  const selectedExams = getSelectedExamsFp(state);
  const searchAssignmentData = getSearchAssignmentFp(state);
  const selectedAssignments = getSelectedAssignmentsFp(state);
  const currentAssignment = getCurrentAssignmentFp(state);
  const selectedLessons = getSelectedLessonsFp(state);
  const currentTopicObject = getCurrentTopicObjectFp(state);
  const { currentLessonFiles, isLessonUpdated, isLoadingCurrentTopicObject } = state.courses;

  const { pathname } = location;
  const res = pathname && pathname.match(getCurrentTopicId);
  const currentResetUrl = pathname && pathname.replace(getUrlBeforeEditTopic, '');
  const currentTopicId = res[1];

  return {
    searchLessonData,
    currentLesson,
    currentTopicId,
    searchExamData,
    currentExam,
    selectedExams,
    searchAssignmentData,
    selectedAssignments,
    currentAssignment,
    selectedLessons,
    currentTopicObject,
    currentResetUrl,
    currentLessonFiles,
    isLessonUpdated,
    isLoadingCurrentTopicObject,
  };
};

export default connect(mapStateToProps, { ...coursesActions })(EditTopic);
