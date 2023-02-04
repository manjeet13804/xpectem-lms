import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS } from 'constants/constants';
import moment from 'moment';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { bemlds } from 'utils';

const b = bemlds('custom-date-picker');

const { year: yearFormat, dayMonth } = DATE_FORMATS;

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: props.value || new Date(),
    };
  }

  handleChange = (date) => {
    this.setState({ dateValue: date });
  };

  saveDate = () => {
    const { dateValue } = this.state;
    const { saveDate, close } = this.props;
    saveDate(dateValue);
    close();
  };

  closePopup = () => {
    const { close } = this.props;
    close();
  };

  getHeaderText = () => {
    const { headerType } = this.props;
    switch (headerType) {
      case 'start': {
        return <IntlMessages id="date.start" />;
      }

      case 'end': {
        return <IntlMessages id="date.final" />;
      }

      default: {
        return <IntlMessages id="date.select" />;
      }
    }
  }

  render() {
    const { dateValue } = this.state;
    const { className, minDate } = this.props;

    const day = moment(dateValue).format(dayMonth);
    const year = moment(dateValue).format(yearFormat);

    return (
      <section className={b({ mix: className })}>
        <div className={b('header')}>
          <span className={b('text')}>{this.getHeaderText()}</span>
          <span className={b('year')}>{year}</span>
          <span className={b('day')}>{day}</span>
        </div>
        <DatePicker
          inline
          selected={dateValue}
          onChange={this.handleChange}
          calendarClassName={b('calendar')}
          minDate={minDate || undefined}
          {...this.props}
        />
        <div className={b('button-block')}>
          <button
            className={b('btn')}
            type="button"
            onClick={this.closePopup}
          >
            <IntlMessages id="datePicker.abort" />
          </button>
          <button
            className={b('btn')}
            type="button"
            onClick={this.saveDate}
          >
            <IntlMessages id="datePicker.save" />
          </button>
        </div>
      </section>
    );
  }
}

export default CustomDatePicker;
