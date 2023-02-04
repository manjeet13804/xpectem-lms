import React from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
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
  getRegistrationLinksFp,
  getLoadingDeleteRegistrationLinks,
  getLoadingUpadateRegistrationLinks,
} from 'selectors';
import {
  DefaultButton,
  CloseIcon,
  Checkbox,
} from 'components';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import PropTypes from 'prop-types';
import ConfirmRegLinkWrapper from './ConfirmRegLink.style';

const propTypes = {
  handleSaveRegLink: PropTypes.func,
  selectedData: PropTypes.obj,
  handleRemoveSelectedGroup: PropTypes.func,
  handleRemoveSelectedCourse: PropTypes.func,
  handleChangeRegLinkStatus: PropTypes.func,
};

const defaultProps = {
  handleSaveRegLink: () => null,
  selectedData: {},
  handleRemoveSelectedGroup: () => null,
  handleRemoveSelectedCourse: () => null,
  handleChangeRegLinkStatus: () => null,
};

const confirm = bemlds('confirm');

const ConfirmCreateReglink = (props) => {
  const {
    handleSaveRegLink,
    selectedData,
    handleRemoveSelectedGroup,
    handleRemoveSelectedCourse,
    handleChangeRegLinkStatus,
  } = props;
  const {
    selectedGroups,
    selectedCourses,
    isActive,
  } = selectedData;

  return (
    <ConfirmRegLinkWrapper>
      <div className={confirm('title')}>
        <IntlMessages id="students.confirmCreateRegLinkTitle" />
      </div>
      <div className={confirm('description')}>
        <IntlMessages id="students.firstConfirmCreateRegLinkDescription" />
      </div>
      <div className={confirm('description')}>
        <IntlMessages id="students.secondConfirmCreateRegLinkDescription" />
      </div>
      <div className={confirm('selected_label')}>
        <IntlMessages id="students.selectedGroupsRegLink" />
      </div>
      <div className={confirm('selected-block')}>
        {selectedGroups.map(({ id, text }) => (
          <div
            key={id}
            role="button"
            tabIndex="0"
            className={confirm('selected-item')}
          >
            <div className={confirm('selected-item-text')}>
              {text}
            </div>
            <button
              className={confirm('selected-item-remove')}
              onClick={() => handleRemoveSelectedGroup(id)}
            >
              <CloseIcon className={confirm('selected-item-icon')} />
            </button>
          </div>
        ))}
      </div>
      <div className={confirm('selected_label')}>
        <IntlMessages id="students.selectedCoursesRegLink" />
      </div>
      <div className={confirm('selected-block')}>
        {selectedCourses.map(({ id, title }) => (
          <div
            key={id}
            role="button"
            tabIndex="0"
            className={confirm('selected-item')}
          >
            <div className={confirm('selected-item-text')}>
              {title}
            </div>
            <button
              className={confirm('selected-item-remove')}
              onClick={() => handleRemoveSelectedCourse(id)}
            >
              <CloseIcon className={confirm('selected-item-icon')} />
            </button>
          </div>
        ))}
      </div>
      <div className={
        confirm('check-box')}
      >
        <Checkbox
          name="mandatory"
          value={isActive}
          handleCheck={() => handleChangeRegLinkStatus()}
        />
        <div className={confirm('check-box-label')}>
          <IntlMessages id="students.activeCheckBoxLabel" />
        </div>
      </div>
      <div className={confirm('button')}>
        <DefaultButton
          disabled={!(selectedGroups.length && selectedCourses.length)}
          textId="students.saveRegLinkButton"
          onClick={() => handleSaveRegLink(selectedData)}
        />
      </div>
    </ConfirmRegLinkWrapper>
  );
};

ConfirmCreateReglink.propTypes = propTypes;
ConfirmCreateReglink.defaultProps = defaultProps;

const mapStateToProps = state => ({
  searchLmsGroupsData: getSearchLmsGroupsStudentsFp(state),
  searchOrgData: getSearchOrgStudentsFp(state),
  searchGroupData: getSearchGroupStudentsFp(state),
  currentLmsGroupId: getCurrentLmsGroupIdStudentsFp(state),
  currentNameLmsGroup: getCurrentNameLmsGroupStudentsFp(state),
  currentOrgId: getCurrentOrgIdStudentsFp(state),
  currentOrgName: getCurrentOrgNameStudentsFp(state),
  searchCoursesData: getSearchCoursesFp(state),
  chosenCourses: getChosenCoursesStudentsFp(state),
  currentStudents: getCurrentStudentsFp(state),
  registrationLinks: getRegistrationLinksFp(state),
  loadingDeleteRegistrationLinks: getLoadingDeleteRegistrationLinks(state),
  loadingUpadateRegistrationLinks: getLoadingUpadateRegistrationLinks(state),
});

export default connect(
  mapStateToProps,
  {
    ...studentsActions,
  },
)(ConfirmCreateReglink);
