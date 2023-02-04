// @flow
import React, { Node } from 'react';
import { connect } from 'react-redux';
import { MyCourseFullType } from 'models';
import { getCommunications, getLoadingCommunications } from 'redux/selectors';
import { Page } from 'pages';
import Loader from 'components/elements/CustomLoader';

import { actionGetAllCommunication } from 'redux/actions';

import {
  StudentHeader,
  CommunicationGroups,
  SimpleLayout,
} from 'components';

type StateType = {
  courses: MyCourseFullType,
  getCourses: () => void,
  getAllCommunication: () => void,
  isLoadingCommunications: boolean
};

class StudentCommunicationPage extends Page<PropsType, StateType> {
  componentDidMount() {
    const { getAllCommunication } = this.props;
    getAllCommunication();
  }

  render(): Node {
    const { allCommunications, isLoadingCommunications } = this.props;
    return (
      <SimpleLayout>
        <StudentHeader />
        {isLoadingCommunications ? (
          <Loader />
        ) : (
          <CommunicationGroups
            allCommunications={allCommunications}
          />
        )}
      </SimpleLayout>
    );
  }
}


const stateProps = (state: object): object => ({
  allCommunications: getCommunications(state),
  isLoadingCommunications: getLoadingCommunications(state),
});

const dispatchProps = {
  getAllCommunication: actionGetAllCommunication,
};

export default connect(stateProps, dispatchProps)(StudentCommunicationPage);
