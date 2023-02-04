// @flow
import React, { Node, Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { bemlds } from 'utils';
import { TERM_SHARED, HEADER_DICTIONARY } from 'localise';
import { StudentCourseCard, StudentCourseCardString } from 'components';
import {
  MyCoursesFullByGroupType,
  MyCourseFullType,
} from 'models';
import {
  getMyCoursesByGroup,
} from 'redux/selectors';
import './styles.scss';


const b = bemlds('student-courses-list');

const { links: { myCourses } } = HEADER_DICTIONARY;
const { viewAsList, viewAsGrid } = TERM_SHARED;

const DefaultProps = {
  className: '',
  coursesByGroup: [],
};

type PropType = {
  className?: string,
  coursesByGroup?: MyCourseFullType[]
};

class StudentCoursesList extends Component<PropType> {
  state = {
    viewGrid: true,
  };

  changeViewType = () => {
    const { viewGrid } = this.state;
    this.setState({viewGrid: !viewGrid});
  };

  render(): Node {
    const { className, coursesByGroup } = this.props;
    const { viewGrid } = this.state;

    return (
      <section className={b({mix: className})}>
        <div className={b('header')}>
          <span className={b('title')}>{myCourses}</span>
          <button
            className={b('view-btn')}
            type="button"
            onClick={this.changeViewType}
          >
            {viewGrid ? viewAsList : viewAsGrid}
          </button>
        </div>
        <hr className={b('header-separator')} />
        {coursesByGroup
         && coursesByGroup.map((group: MyCoursesFullByGroupType): Node => (
           <div className={b('course-type-block')} key={group.name}>
             <span className={b('course-type-title')}>{group.name}</span>
             <hr className={b('course-separator')} />
             <div className={b('course-list', {string: !viewGrid})}>
               {group.courses
                 && group.courses.map((course: MyCourseFullType): Node => (
                   viewGrid
                     ? (
                       <div className={b('card-wrap')} key={course.id}>
                         <StudentCourseCard className={b('card')} data={course} />
                       </div>
                     )
                     : (
                       <div className={b('card-string-wrap')} key={course.id}>
                         <StudentCourseCardString className={b('card-string')} data={course} />
                       </div>
                     )
                 ))
                }
             </div>
           </div>
         ))
        }
      </section>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  coursesByGroup: getMyCoursesByGroup(state),
});

StudentCoursesList.defaultProps = DefaultProps;

export default withRouter(
  connect(mapStateToProps)(StudentCoursesList),
);
