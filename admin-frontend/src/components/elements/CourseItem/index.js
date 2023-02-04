import React, { Component } from 'react';
import {
  CheckOrganisations,
  DateStartEnd,
  DeleteAttentionSvg,
  CourseCard,
} from 'components';
import { COLORS, TITLE, DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import { bemlds } from 'utils';
import Modal from 'components/feedback/modal';
import CourseItemWrapper from './courseItem.style';

const {
  languageTitle,
  categoriesTitle,
  createdAtTitle,
} = TITLE;
const { yearMonthDay } = DATE_FORMATS;

const b = bemlds('course-item');
const modal = bemlds('modal');

class CourseItem extends Component {
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

  returnLangOfNumber = (id) => {
    switch (id) {
      case 1:
        return 'English';
      case 2:
        return 'Svenska';
      case 3:
        return 'Norsk';

      default:
        return null;
    }
  };

  render() {
    const { isShowModal } = this.state;

    const {
      item = {},
      onChangeCheckbox,
      handleSaveDate,
      isClickable,
      onClick,
      isWhite,
      isHideDate,
    } = this.props;

    const {
      id,
      title,
      language,
      categories,
      check,
      dateBegin,
      createdAt,
      isOrderable,
    } = item;
    const dateCreateCourse = moment(createdAt).format(yearMonthDay);

    return (
      <CourseItemWrapper>
        <div
          className={b({ 'is-white': isWhite })}
        >
          <div className={b('text')}>
            {title && (
              <div className={b('title')}>
                <DeleteAttentionSvg
                  onClick={() => this.openModal()}
                  fill={COLORS.black}
                  className={b('title-icon')}
                />
                <div
                  className={b('title-text')}
                  onClick={onClick}
                  tabIndex={-1}
                  role="button"
                >
                  {title}
                </div>
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
            {language && language.id && (
              <div className={b('option')}>
                {`${languageTitle} ${this.returnLangOfNumber(language.id)}`}
              </div>
            )}
            {categories && categories.length > 0 && (
              <div className={b('option')}>
                {`${categoriesTitle}`}
                {categories.map(({ id, name }) => (
                  <span key={id}>
                    {name}
                    {' '}
                  </span>
                ))}
              </div>
            )}
            <div className={b('option')}>
              {`${createdAtTitle} ${dateCreateCourse}`}
            </div>
            {check && !isClickable && !isHideDate && (
              <DateStartEnd
                onlyBegin
                id={id}
                dateBegin={dateBegin}
                handleSaveDate={handleSaveDate}
                minDate={moment(new Date()).add(1, 'day').toDate()}
              />
            )}
            {!isOrderable && (
              <div>
                This course is not orderable
              </div>
            )}
          </div>
          {!isClickable && isOrderable && (
          <div
            role="button"
            tabIndex="-1"
            onClick={onChangeCheckbox}
            className={b('check')}
          >
            <CheckOrganisations
              value={check}
              className={b('checkbox')}
            />
          </div>
          )}
        </div>
      </CourseItemWrapper>
    );
  }
}

export default CourseItem;
