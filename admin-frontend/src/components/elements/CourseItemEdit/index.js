import {
  CheckSvg,
  CourseCard,
  DateStartEnd,
  DeleteAttentionSvg,
} from 'components';
import Modal from 'components/feedback/modal';
import IntlMessages from 'components/utility/intlMessages';
import { COLORS } from 'constants/constants';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import { bemlds } from 'utils';

import CourseItemEditWrapper from './courseItemEdit.style';

const b = bemlds('course-item');
const modal = bemlds('modal');
const block = bemlds('block');
const checkbox = bemlds('checkbox');

const defaultProps = {
  handleCheck: () => null,
  handleClickCourse: () => null,
  item: {},
  handleSaveDate: () => null,
  isCourseCreator: false,
  handleDelete: null,
};

const propTypes = {
  handleCheck: PropTypes.func,
  handleClickCourse: PropTypes.func,
  item: PropTypes.shape({}),
  handleSaveDate: PropTypes.func,
  isCourseCreator: PropTypes.bool,
  handleDelete: PropTypes.func,
};

class CourseItemEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      isShowModal: false,
    };
  }

  openModal = () => {
    this.setState({
      isShowModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      isShowModal: false,
    });
  };

  toggleCheckbox = (id) => {
    const { handleCheck } = this.props;
    handleCheck(id);
  };

  clickCourseTitle = (id) => {
    const { handleClickCourse } = this.props;
    handleClickCourse(id);
  };

  getDifferenceDate = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const daysLag = Math.ceil(Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    return daysLag;
  };


  render() {
    const { isShowModal } = this.state;

    const {
      item = {},
      handleSaveDate,
      isCourseCreator,
      handleDelete,
    } = this.props;

    const {
      course: { title, id: idCourse },
      id,
      dateBegin,
      dateEnd,
      coursePassed,
    } = item;

    return (
      <CourseItemEditWrapper>
        <div
          className={b({ passed: coursePassed })}
        >
          <div className={b('text')}>
            {title && (
              <div className={b('title-wrapper')}>
                <div className={b('title')}>
                  <DeleteAttentionSvg
                    onClick={this.openModal}
                    fill={COLORS.black}
                    className={b('title-icon')}
                  />
                  <div
                    tabIndex="-1"
                    role="button"
                    onClick={() => this.clickCourseTitle(idCourse)}
                    className={b('title-text')}
                  >
                    {title}
                  </div>
                </div>
                {handleDelete && (
                  <button onClick={() => handleDelete(idCourse)} className={b('close-icon')} type="button">
                    <Icon name="close" />
                  </button>
                )}
              </div>
            )}
            <Modal
              className={modal()}
              visible={isShowModal}
              onCancel={this.closeModal}
              footer={null}
            >
              <CourseCard item={item} />
            </Modal>
            {!isCourseCreator && (
            <section className={block()}>
              <DateStartEnd
                id={id}
                dateBegin={dateBegin}
                dateEnd={dateEnd}
                handleSaveDate={handleSaveDate}
                minDate={moment(new Date()).add(1, 'day').toDate()}
              />
              <div className={block('day')}>
                <div className={block('day-title')}>
                  <IntlMessages id="students.daysLeftTitle" />
                </div>
                <div className={block('day-number')}>
                  {this.getDifferenceDate(dateBegin, dateEnd)}
                </div>
              </div>
              <div className={checkbox()}>
                <div
                  className={checkbox('block')}
                  role="button"
                  tabIndex="0"
                  onClick={() => this.toggleCheckbox(id)}
                >
                  {coursePassed ? (
                    <CheckSvg className={checkbox('icon')} id={title} />
                  )
                    : (
                      <div
                        id={title}
                        className={checkbox('clear')}
                      />
                    )
                  }
                  <label
                    className={checkbox('title')}
                    htmlFor={title}
                  >
                    <IntlMessages id="students.finishedTitle" />
                  </label>
                </div>
              </div>
            </section>
            )}
          </div>
        </div>
      </CourseItemEditWrapper>
    );
  }
}

CourseItemEdit.defaultProps = defaultProps;
CourseItemEdit.propTypes = propTypes;

export default CourseItemEdit;
