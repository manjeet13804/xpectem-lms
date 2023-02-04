// @flow
import React, {Node, useEffect} from 'react';
import {
  StudentHeader,
  AboutCompany,
  StudentCoursesList,
  SimpleLayout,
} from 'components';
import { connect } from 'react-redux';
import { getLoadingMyOrganisations, getMyCoursesIsLoading } from 'redux/selectors';
import Loader from 'components/elements/CustomLoader';
import {
  getInformationAboutMyOrganization,
  getMyCourses as fetchMyCourses,
} from 'redux/actions';
import jwt from 'jsonwebtoken';

const DefaultProps = {
  organisationLoading: true,
  isLoadingCourses: true,
};

type PropType = {
  organisationLoading: boolean,
  isLoadingCourses: boolean
};

const StudentCoursesPage = (props: PropType): Node => {
  const {
    isLoadingCourses,
    isLoadingOrganisation,
    getOrganisationInfo,
    getCourses,
  } = props;
  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const decoded = jwt.decode(token);
    const { organisationId } = decoded;
    getOrganisationInfo(organisationId);
    getCourses();
  }, []);

  return (
    <SimpleLayout>
      <StudentHeader />
      {isLoadingCourses || isLoadingOrganisation ? (
        <Loader />
      ) : (
        <>
          <AboutCompany />
          <StudentCoursesList />
        </>
      )}
    </SimpleLayout>
  );
};

const mapStateToProps = (state: object): string => ({
  isLoadingOrganisation: getLoadingMyOrganisations(state),
  isLoadingCourses: getMyCoursesIsLoading(state),
});

const mapDispatchToProps = {
  getOrganisationInfo: getInformationAboutMyOrganization,
  getCourses: fetchMyCourses,
};

StudentCoursesPage.defaultProps = DefaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(StudentCoursesPage);
