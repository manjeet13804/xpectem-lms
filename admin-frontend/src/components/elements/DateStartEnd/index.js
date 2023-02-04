import { DateSvg, ReactDatePicker } from 'components';
import ModalWrapper from 'components/feedback/modal.style';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS, PLACEHOLDER, INPUT_MASKS } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import moment from 'moment';
import React, { Component } from 'react';
import { bemlds } from 'utils';
import InputMask from 'react-input-mask';

import DateStartEndWrapper from './dateStartEnd.style';

const { datePlaceholder } = PLACEHOLDER;
const { yearMonthDay } = DATE_FORMATS;
const { patternDateInput } = REGEXP;
const { courseDate } = INPUT_MASKS;

const block = bemlds('block');
const b = bemlds('date');
const modal = bemlds('modal');

class DateStartEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenDateBeginPicker: false,
      isOpenDateEndPicker: false,
      inputDateBegin: '',
      inputDateEnd: '',
    };
  }

  componentWillMount() {
    const { dateBegin, dateEnd } = this.props;
    if (dateBegin) {
      this.setState({ inputDateBegin: moment(dateBegin).format(yearMonthDay) });
    }
    if (dateEnd) {
      this.setState({ inputDateEnd: moment(dateEnd).format(yearMonthDay) });
    }
  }

  openDateBeginPicker = () => {
    this.setState({ isOpenDateBeginPicker: true });
  };

  closeDateEndPicker = () => {
    this.setState({ isOpenDateEndPicker: false });
  };

  openDateEndPicker = () => {
    this.setState({ isOpenDateEndPicker: true });
  };

  textareaBeginChange = ({ target: { value } }) => {
    this.setState({ inputDateBegin: value });
  };

  handleBlurDateBegin = ({ target: { value } }) => {
    const {
      handleSaveDate,
      id,
      dateEnd,
      noLimit,
      fromThisDay
    } = this.props;
    const endDate = dateEnd ? new Date(dateEnd) : '';
    const isValidDate = patternDateInput.test(value);
    const isDateLaterThenNow = moment(value).isAfter(new Date());
    const isEarlyThenDateEnd = endDate ? moment(endDate).isAfter(moment(value)) : true;

    if (isValidDate && noLimit) {
      handleSaveDate(id, moment(value).toISOString(), 'dateBegin');
      return;
    }

    if (isValidDate && isDateLaterThenNow && isEarlyThenDateEnd) {
      handleSaveDate(id, moment(value).toISOString(), 'dateBegin');
      return;
    }

    if (fromThisDay) {
      const dateBegin = moment().format(yearMonthDay);
      this.setState({ inputDateBegin: dateBegin });
      handleSaveDate(id, moment().toISOString(), 'dateBegin');
      return;
    }
    const dateBegin = moment().add(1, 'day').format(yearMonthDay);
    this.setState({ inputDateBegin: dateBegin });
    handleSaveDate(id, moment().add(1, 'day').toISOString(), 'dateBegin');
  };

  handleBlurDateEnd = ({ target: { value } }) => {
    const { handleSaveDate, id, dateBegin } = this.props;
    const beginDate = dateBegin ? new Date(dateBegin) : '';
    const isValidDate = patternDateInput.test(value);
    const isDateLaterThenNow = moment(value).isAfter(moment().add(1, 'day'));
    const isLaterThenStartDate = beginDate ? moment(value).isAfter(moment(beginDate)) : true;
    if (isValidDate && isDateLaterThenNow && isLaterThenStartDate) {
      handleSaveDate(id, moment(value).toISOString(), 'dateEnd');
      return;
    }

    const startDate = moment().isAfter(moment(dateBegin)) ? moment().add(2, 'day') : moment(dateBegin).add(1, 'day');
    const dateEnd = startDate.format(yearMonthDay);
    this.setState({ inputDateEnd: dateEnd });
    handleSaveDate(id, startDate.toISOString(), 'dateEnd');
  }

  textareaEndChange = ({ target: { value } }) => {
    this.setState({ inputDateEnd: value });
  };

  clickClearBeginInput = () => {
    this.setState({ inputDateBegin: '' });
  };

  clickClearEndInput = () => {
    this.setState({ inputDateEnd: '' });
  };

  saveDateBegin = (value) => {
    const { handleSaveDate, id } = this.props;

    this.setState({ dateBegin: moment(value).toISOString() });
    handleSaveDate(id, moment(value).toISOString(), 'dateBegin');
    this.setState({ inputDateBegin: moment(value).format(yearMonthDay) });
  };

  saveDateEnd = (value) => {
    const { handleSaveDate, id } = this.props;

    this.setState({ dateEnd: moment(value).toISOString() });
    handleSaveDate(id, moment(value).toISOString(), 'dateEnd');
    this.setState({ inputDateEnd: moment(value).format(yearMonthDay) });
  };

  closeDateBeginPicker = () => {
    this.setState({ isOpenDateBeginPicker: false });
  };

  render() {
    const {
      isOpenDateBeginPicker,
      isOpenDateEndPicker,
      inputDateBegin,
      inputDateEnd,
    } = this.state;

    const {
      dateBegin,
      dateEnd,
      placeholder,
      date,
    } = this.props;

    const { onlyBegin, isOpenTitle, minDate } = this.props;
    const startDate = date ? new Date(date) : ( dateBegin ? new Date(dateBegin) : '' );
    const endDate = dateEnd ? new Date(dateEnd) : '';
    const maxDate = dateEnd ? moment(dateEnd).subtract(1, 'day').toDate() : null;
    const dateEndMinDate = startDate || minDate;
    return (
      <DateStartEndWrapper>
        <section className={block()}>
          <div className={b()}>
            {isOpenTitle && (
              <div className={b('title')}>
                <IntlMessages id="students.startDateTitle" />
              </div>
            )}
            <div className={b('block')}>
              <div className={b('block-input')}>
                <InputMask
                  mask={courseDate}
                  maskChar=" "
                  placeholder={placeholder || datePlaceholder}
                  value={inputDateBegin}
                  onChange={this.textareaBeginChange}
                  onBlur={this.handleBlurDateBegin}
                />
              </div>
              <div className={b('block-add')}>
                <DateSvg type="button" onClick={this.openDateBeginPicker} />
                {isOpenDateBeginPicker && (
                  <ModalWrapper
                    className={modal()}
                    visible={isOpenDateBeginPicker}
                    onCancel={this.closeDateBeginPicker}
                    footer={null}
                    style={{ padding: '0' }}
                    bodyStyle={{ padding: '0' }}
                    width={260}
                  >
                    <ReactDatePicker
                      className={b('date-picker')}
                      close={this.closeDateBeginPicker}
                      value={startDate}
                      saveDate={this.saveDateBegin}
                      minDate={minDate}
                      maxDate={maxDate}
                      headerType="start"
                    />
                  </ModalWrapper>
                )}
              </div>
            </div>
          </div>
          {!onlyBegin && (
            <div className={b()}>
              <div className={b('title')}>
                <IntlMessages id="students.endDateTitle" />
              </div>
              <div className={b('block')}>
                <div className={b('block-input')}>
                  <InputMask
                    mask={courseDate}
                    maskChar=" "
                    placeholder={datePlaceholder}
                    value={inputDateEnd}
                    onChange={this.textareaEndChange}
                    onBlur={this.handleBlurDateEnd}
                  />
                </div>
                <div className={b('block-add')}>
                  <DateSvg type="button" onClick={this.openDateEndPicker} />
                  {isOpenDateEndPicker && (
                    <ModalWrapper
                      className={modal()}
                      visible={isOpenDateEndPicker}
                      onCancel={this.closeDateEndPicker}
                      footer={null}
                      style={{ padding: '0' }}
                      bodyStyle={{ padding: '0' }}
                      width={260}
                    >
                      <ReactDatePicker
                        className={b('date-picker')}
                        close={this.closeDateEndPicker}
                        value={endDate}
                        saveDate={this.saveDateEnd}
                        minDate={moment(dateEndMinDate).add(1, 'day').toDate()}
                        headerType="end"
                      />
                    </ModalWrapper>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>
      </DateStartEndWrapper>
    );
  }
}

DateStartEnd.defaultProps = {
  isOpenTitle: true,
};

export default DateStartEnd;
