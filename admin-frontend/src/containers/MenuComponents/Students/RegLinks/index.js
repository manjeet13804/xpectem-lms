import React, { Component } from 'react';
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
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
} from 'components';
import { STUDENTS } from 'constants/routes';
import RegLinkElementsTable from './components/RegLinkTable';
import RegLinksWrapper from './RegLinks.style';

const course = bemlds('course');
const titleBem = bemlds('title');

class RegLinks extends Component {
  componentDidMount() {
    const { getRegistrationLinks } = this.props;
    getRegistrationLinks();
  }

  handlePushToCreateNewRegLInk = () => {
    const { history } = this.props;
    history.push(STUDENTS.studentAddRegistrationLinks);
  }

  render() {
    const {
      registrationLinks,
      loadingUpadateRegistrationLinks,
      loadingDeleteRegistrationLinks,
      updateStatusRegistrationLink,
      deleteRegistrationLink,
    } = this.props;
    return (
      <LayoutContent>
        <RegLinksWrapper>
          <Banner title={<IntlMessages id="students.createLinksBanner" />} />
          <section className={titleBem()}>
            <div className={titleBem('title')}>
              <IntlMessages id="students.createLinkTitle" />
            </div>
            <div className={titleBem('item')}>
              <IntlMessages id="students.createLinkDescription" />
            </div>
            <div className={titleBem('item')}>
              <b>Note</b>
              <IntlMessages id="students.createLinkNote" />
            </div>
            <div className={titleBem('item')}>
              <IntlMessages id="students.createLinkDisabled" />
            </div>
            <div className={titleBem('item')}>
              <IntlMessages id="students.createLinkCreate" />
            </div>
            <div className={course('button')}>
              <button
                type="button"
                onClick={this.handlePushToCreateNewRegLInk}
                className={course('button-add')}
              >
                <IntlMessages id="students.createLinksButton" />
              </button>
            </div>
          </section>
          <section>
            <RegLinkElementsTable
              data={registrationLinks}
              loadingUpadateRegistrationLinks={loadingUpadateRegistrationLinks}
              loadingDeleteRegistrationLinks={loadingDeleteRegistrationLinks}
              handleUpdateRegLinkStatus={updateStatusRegistrationLink}
              handleDeleteRegistrationLink={deleteRegistrationLink}
            />
          </section>
        </RegLinksWrapper>
      </LayoutContent>
    );
  }
}

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
)(RegLinks);
