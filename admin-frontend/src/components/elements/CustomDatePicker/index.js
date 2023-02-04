import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { DATE_FORMATS, TITLE } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePickerWrapper from './customDatePicker.style';

const { year: yearFormat, dayMonth } = DATE_FORMATS;
const { selectFinalDate } = TITLE;

const defaultProps = {
  className: '',
  close: () => {},
  saveSettings: () => {},
};

class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: new Date(),
    };
  }
  handleChange = (date) => {
    this.setState({dateValue: date});
  };

  saveDate = () => {
    const { dateValue } = this.state;
    const { saveSettings } = this.props;
    saveSettings(dateValue);
  };

  closePopup = () => {
    const { close } = this.props;
    close();
  };
  render() {
    const { dateValue } = this.state;

    const day = moment(dateValue).format(dayMonth);
    const year = moment(dateValue).format(yearFormat);
    return (
      <CustomDatePickerWrapper>
        <section className="custom-date"  ref={this.saveRoot}>
          <div className="header">
            <span className="text">{selectFinalDate}</span>
            <span className="year">{year}</span>
            <span className="day">{day}</span>
          </div>
          <DatePicker
            inline
            selected={dateValue}
            onChange={this.handleChange}
            calendarClassName="calendar"
          />
          <div className="button-block">
            <button className="btn" type="button" onClick={this.closePopup}><IntlMessages id="datePicker.abort" /></button>
            <button className="btn" type="button" onClick={this.saveDate}><IntlMessages id="datePicker.save" /></button>
          </div>
        </section>
      </CustomDatePickerWrapper>
    );
  }
}

CustomDatePicker.defaultProps = defaultProps;
export default CustomDatePicker;