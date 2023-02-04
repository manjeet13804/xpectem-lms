// @flow
import React, {
  PureComponent,
  Fragment,
  Node,
} from 'react';
import { Link } from 'react-router-dom';
import { COURSE_HEADER_DICTIONARY } from 'localise';
import {
  CourseContent,
  StudyplanTab,
  CourseInformation,
  CommunicationTab,
  ArrowDownFill,
  Faq,
} from 'components';
import { CourseCertifications } from 'containers';
import { MyCourseType, FaqSections } from 'models';
import { STUDENT_COURSE_PATHS } from 'constants/paths';
import { COURSE_TABS_ENUM } from 'constants/enums';
import { bemlds } from 'utils';
import './styles.scss';

const {
  links: {
    courseContent,
    studyPlan,
    communication,
    information,
    certification,
    questionsAndAnswers,
  },
} = COURSE_HEADER_DICTIONARY;

type PropsType = {
  tab: string,
  currentMyCourse: MyCourseType,
  id: string
};

const DefaultTab = (): object => null;

const b = bemlds('course-header');

class CourseHeader extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentTab: props.tab,
      isMenuOpen: false,
    };
  }

  componentDidUpdate() {
    if (this.props.tab !== this.state.currentTab) {
      this.setState({currentTab: this.props.tab});
    }
  }

  onTab = (currentTab: string): Node => {
    this.setState({currentTab});
  };

  openMenu = () => {
    const { isMenuOpen } = this.state;
    this.setState({isMenuOpen: !isMenuOpen});
  };

  closeMenu = () => {
    this.setState({isMenuOpen: false});
  };

  getTabs = (): Node => {
    const {
      id,
      currentMyCourse: {
        isLinear,
        isCertified,
        student: {
          doneAt,
          leftDays,
        } = {},
      } = {},
    } = this.props;

    const isNotSimple = !isLinear;
    const isTimeAccess = Boolean(leftDays);

    return [
      {
        id: COURSE_TABS_ENUM.topics,
        title: courseContent,
        component: CourseContent,
        link: STUDENT_COURSE_PATHS.topics(id),
      },
      isNotSimple && isTimeAccess && {
        id: COURSE_TABS_ENUM.studyPlan,
        title: studyPlan,
        component: StudyplanTab,
        link: STUDENT_COURSE_PATHS.studyPlan(id),
      },
      isNotSimple && {
        id: COURSE_TABS_ENUM.communication,
        title: communication,
        component: CommunicationTab,
        link: STUDENT_COURSE_PATHS.communication(id),
      },
      {
        id: COURSE_TABS_ENUM.information,
        title: information,
        component: CourseInformation,
        link: STUDENT_COURSE_PATHS.information(id),
      },
      isCertified && isNotSimple && !!doneAt && isTimeAccess && {
        id: COURSE_TABS_ENUM.certification,
        title: certification,
        component: CourseCertifications,
        link: STUDENT_COURSE_PATHS.certification(id),
      },
      isNotSimple && isTimeAccess && {
        id: COURSE_TABS_ENUM.faq,
        title: questionsAndAnswers,
        component: (): void => <Faq section={FaqSections.course} />,
        link: STUDENT_COURSE_PATHS.faq(id),
      },
    ].filter(Boolean);
  }

  render(): Node {
    const { currentTab, isMenuOpen } = this.state;
    const { currentMyCourse } = this.props;
    const {
      title: currentTitle,
      component: CurrentTab = DefaultTab,
    } = this.getTabs().find(
      ({id}: { id: string }): Node => id === currentTab,
    ) || {};

    const {
      title,
    } = currentMyCourse;

    const [firstTab, ...othersTabs] = this.getTabs();
    return (
      <Fragment>
        <section className={b()}>
          <div className={b('title')}>
            {title}
          </div>
          <nav className={b('nav', { short: currentMyCourse.isLinear })}>
            {
              this.getTabs().map(({id, title, link}: object): Node => (
                <Link
                  key={id}
                  className={b('link', {active: (id === currentTab)})}
                  to={link}
                >
                  {title}
                </Link>
              ))
            }
          </nav>
          <nav className={b('adaptive-nav')}>
            <div className={b('adaptive-block')} role="button" tabIndex={0} onClick={(): SyntheticEvent => this.openMenu()}>
              <div className={b('adaptive-title')}>
                {currentTitle}
              </div>
              <ArrowDownFill className={b('adaptive-arrow')} />
            </div>
            {isMenuOpen && (
              <div className={b('adaptive-menu')}>
                {
                  <div className={b('adaptive-first-menu')}>
                    <Link
                      key={firstTab.id}
                      className={b('adaptive-link')}
                      to={firstTab.link}
                      onClick={(): SyntheticEvent => {
                        this.onTab(firstTab.id);
                        this.openMenu();
                      }}
                    >
                      {firstTab.title}
                    </Link>
                    <ArrowDownFill fill="#737373" className={b('adaptive-arrow-up')} />
                  </div>
                }
                {
                  othersTabs.map(({id, title, link}: object): Node => (
                    <div className={b('adaptive-item')}>
                      <Link
                        key={id}
                        className={b('adaptive-link')}
                        to={link}
                        onClick={(): SyntheticEvent => {
                          this.openMenu();
                        }}
                      >
                        {title}
                      </Link>
                    </div>
                  ))
                }
              </div>
            )}
          </nav>
        </section>
        <CurrentTab currentMyCourse={currentMyCourse} onTab={this.onTab} topicIds={currentMyCourse.topics} />
      </Fragment>
    );
  }
}

export default CourseHeader;
