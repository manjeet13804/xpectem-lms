// @flow
import React, {
  PureComponent,
  Node,
} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { COMMUNICATION_DICTIONARY } from 'localise';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import { actionSetCourseCommunicationId } from 'redux/actions';
import { bemlds } from 'utils';
import { MyCourseFullType } from 'models';
import { CourseBlock } from './components';
import './styles.scss';

const b = bemlds('communication-groups');

type PropsType = {
  setCurrentCommunicationId: void,
  allCommunications: object[]
};

class CommunicationGroups extends PureComponent<PropsType> {
  render(): Node {
    const {
      setCurrentCommunicationId,
      allCommunications,
    } = this.props;
    return (
      <section className={b()}>
        <div className={b('title')}>Communication - All the courses</div>
        <hr className={b('line')} />
        <div className={b('text')}>
          {COMMUNICATION_DICTIONARY.communicationGroupText}
        </div>
        {Boolean(allCommunications.length)
        && allCommunications.map((
          {
            id,
            title,
            allMessageCount,
            newMessageCount,
            courseId,
          }: MyCourseFullType,
        ): Node => (
          <Link
            key={id}
            to={{
              pathname: STUDENT_COURSE_PATHS.communication(courseId),
              state: { id },
            }}
            className={b('link')}
          >
            <CourseBlock
              id={id}
              title={title}
              onClick={() => setCurrentCommunicationId(id)}
              allMessage={allMessageCount}
              newMessage={newMessageCount}
            />
          </Link>
        ))}
      </section>
    );
  }
}

const dispatchProps = {
  setCurrentCommunicationId: actionSetCourseCommunicationId,
};

export default connect(null, dispatchProps)(CommunicationGroups);
