// @flow
import React, { PureComponent } from 'react';
import type { Node } from 'react';
import { btnIcon } from 'utils/className';
import {
  TERM_SHARED,
} from 'localise';
import { USER_ROLES_ENUM } from 'constants/enums';
import { COURSE_PATHS } from 'constants/paths';
import CARD_COMPONENTS_ENUM from '../../constants';

import {
  MoreIcon,
} from 'components';
import {
  PublishedStatus,
  StatisticBlock,
  ImgCard,
} from '..';

const DefaultProps = {
  course: {},
  goToPage: null,
};

type PropType = {
  role: string,
  course?: object,
  goToPage?: (string) => object,
  bem: (string | null) => string
};

class CourseAdminsCard extends PureComponent <PropType> {
  checkRightRender = (nameComponent: string): boolean => {
    const { course, role } = this.props;
    const {
      communicationStatistic: communicationData,
      studentsStatistic: studentsData,
      publishedStatus: publishedData,
    } = course;

    const {
      communication,
      students,
      publishedStatus,
    } = CARD_COMPONENTS_ENUM;

    const {
      xpectrum,
      designer,
      editor,
      superAdmin,
      admin,
    } = USER_ROLES_ENUM;

    switch (nameComponent) {
      case (communication):
        return role !== editor
                && role !== superAdmin
                && communicationData
                && publishedData;
      case (students):
        return role !== admin
                && role !== editor
                && studentsData
                && publishedData;
      case (publishedStatus):
        return role === designer
                || role === editor
                || role === xpectrum;
      default: return false;
    }
  }

  renderStatistick = (): Node => {
    const { course, goToPage } = this.props;
    const {
      communicationStatistic: communicationData,
      studentsStatistic: studentsData,
      courseAdmins: adminsData,
      id,
    } = course;
    const {
      communication,
      students,
    } = CARD_COMPONENTS_ENUM;

    return (
      <React.Fragment>
        { this.checkRightRender(communication)
        && (
          <StatisticBlock
            onClick={() => { goToPage(COURSE_PATHS.communication(id)); }}
            title={TERM_SHARED.communication}
            active={communicationData.active}
            total={communicationData.total}
            newCount={communicationData.new}
          />
        )
        }
        { this.checkRightRender(students)
          && (
            <StatisticBlock
              onClick={() => { goToPage(COURSE_PATHS.students(id)); }}
              title={TERM_SHARED.students}
              active={studentsData.active}
              total={studentsData.total}
              newCount={studentsData.new}
            />
          )
        }
        {
          adminsData && (
            <StatisticBlock
              onClick={() => { goToPage(COURSE_PATHS.administrators(id)); }}
              title={TERM_SHARED.courseAdmin}
              isAdminStatistic="true"
              admins={adminsData}
            />
          )
        }
      </React.Fragment>
    );
  }

  renderControls = (): Node => {
    const { course, bem } = this.props;
    return (
      <div className={bem('controls')}>
        { this.checkRightRender(CARD_COMPONENTS_ENUM.publishedStatus)
          && (
          <PublishedStatus
            className={bem('status')}
            isPublished={course.publishedStatus}
          />
          )
        }
        <button
          className={btnIcon(bem)}
          type="button"
        >
          <MoreIcon />
        </button>
      </div>
    );
  }

  renderInfo = (): Node => {
    const { course, bem } = this.props;
    return (
      <div className={bem('info', {short: true})}>
        <h1 className={bem('title')}>{course.title && course.title}</h1>
        {
          course.version && <p className={bem('version')}>{`${TERM_SHARED.version} ${course.version}`}</p>
        }
        {this.renderControls()}
      </div>
    );
  }

  render(): Node {
    const { course, bem } = this.props;
    return (
      <article className={bem()}>
        <section className={bem('main-info')}>
          {
            course.img && (
              <ImgCard
                mod="small"
                img={course.img}
                title={course.title}
                bem={bem}
              />
            )
          }
          {this.renderInfo()}
        </section>
        { this.renderStatistick() }
      </article>
    );
  }
}
CourseAdminsCard.defaultProps = DefaultProps;

export default CourseAdminsCard;
