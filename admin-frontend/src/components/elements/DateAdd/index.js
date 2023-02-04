import React, { Component } from 'react';
import {
  DateSvg,
  ReactDatePicker,
} from 'components';
import moment from 'moment';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS, PLACEHOLDER, LMS_GROUPS } from 'constants/constants';
import { bemlds } from 'utils';
import DateAddWrapper from './dateAdd.style';

const { days } = PLACEHOLDER;
const { yearMonthDay } = DATE_FORMATS;
const { currentEndDate } = LMS_GROUPS;

const b = bemlds('date');

class DateAdd extends Component {
  constructor(props) {
    super(props);
    const isAfter = moment().isAfter(props.date, 'days');

    const value = !props.date || isAfter ? '' : this.getDifDateNow(props.date);

    this.state = {
      isOpenDatePicker: false,
      countDays: value,
      date: props.date ? moment(props.date).toDate() : null,
      isAfter,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { date } = props;
    const { date: dateState } = state;

    if (!moment(date).isSame(dateState)) {
      return ({
        countDays: date
          ? moment().startOf('day').diff(moment(date).startOf('day'), 'days')
          : '',
        date: props.date ? moment(props.date).toDate() : null,
      });
    }

    return state;
  }

  closeDatePicker = () => {
    this.setState({ isOpenDatePicker: false });
  };

  openDatePicker = () => {
    this.setState({ isOpenDatePicker: true });
  };

  textareaChange = ({ target: { value } }) => {
    const { handleSaveDate } = this.props;
    const maxDays = 10000000;
    if (value <= maxDays) {
      const dateDiff = moment().add(value, 'days');
      this.setState({
        countDays: value.replace(/\D/g, ''),
        date: dateDiff.toDate(),
        isAfter: false,
      });
      handleSaveDate(dateDiff.toISOString());
    }
  };

  getDifDateNow = value => moment(value).startOf('day').diff(moment().startOf('day'), 'days')

  saveDate = (value) => {
    const { handleSaveDate } = this.props;
    this.setState({
      date: moment(value).toDate(),
      countDays: this.getDifDateNow(value),
      isAfter: false,
    });
    handleSaveDate(moment(value).toISOString());
  };

  render() {
    const {
      isOpenDatePicker,
      date,
      countDays,
      isAfter,
    } = this.state;
    const { status, error, disabled } = this.props;

    return (
      <DateAddWrapper>
        <div className={b()}>
          {status ? (
            <div className={b('title')}>
              <IntlMessages id="students.courseDateTitle" />
            </div>
          )
            : (
              <div className={b('title')}>
                <div><IntlMessages id="date.titleAccess" /></div>
                <div><IntlMessages id="date.titleSetDate" /></div>
              </div>
            )}
          <div className={b('block')}>
            <input
              className={b('block-input', { error: Boolean(error) })}
              value={countDays}
              type="text"
              name="input"
              placeholder={days}
              onChange={this.textareaChange}
              disabled={disabled}
            />
            <div className={b('block-add')}>
              <DateSvg type="button" onClick={this.openDatePicker} />
              {isOpenDatePicker && !disabled && (
              <ReactDatePicker
                className={b('date-picker')}
                close={this.closeDatePicker}
                value={date}
                saveDate={this.saveDate}
                minDate={moment().add(1, 'days').toDate()}
                placeho
              />
              )}
            </div>
            <div className={b('block-current-title')}>
              {moment(date).isValid() && (countDays || isAfter) && (
                <div className={b('access-expire-at')}>
                  <p>{currentEndDate}</p>
                  <p>{moment(date).format(yearMonthDay)}</p>
                </div>
              )}
            </div>
          </div>
          {error && <p className={b('error')}>{error}</p>}
        </div>
      </DateAddWrapper>
    );
  }
}

export default DateAdd;
