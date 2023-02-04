// @flow
import React, {Node, Component, SyntheticEvent} from 'react';
import moment from 'moment';
import { bemlds } from 'utils';
import DatePicker from 'react-datepicker';
import { STUDYPLAN, TERM_SHARED } from 'localise';
import { DATE_FORMATS } from 'constants/constants';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const b = bemlds('custom-date-picker');

const { year: yearFormat, dayMonth } = DATE_FORMATS;

const DefaultProps = {
  className: '',
  close: () => {},
  saveSettings: () => {},
};

type PropType = {
  className?: string,
  close?: () => void,
  saveSettings?: () => void,
  value: Date
};

const { save, abort } = TERM_SHARED;
const { selectFinalDate } = STUDYPLAN;


class CustomDatePicker extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      dateValue: new Date(props.value),
    };
  }

  handleChange = (date: SyntheticEvent) => {
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

  render(): Node {
    const {dateValue} = this.state;
    const { className } = this.props;

    const day = moment(dateValue).format(dayMonth);
    const year = moment(dateValue).format(yearFormat);
    return (
      <section className={b({ mix: className })} ref={this.saveRoot}>
        <div className={b('header')}>
          <span className={b('text')}>{selectFinalDate}</span>
          <span className={b('year')}>{year}</span>
          <span className={b('day')}>{day}</span>
        </div>
        <DatePicker
          inline
          selected={dateValue}
          onChange={this.handleChange}
          calendarClassName={b('calendar')}
        />
        <div className={b('button-block')}>
          <button className={b('btn')} type="button" onClick={this.closePopup}>{abort}</button>
          <button className={b('btn')} type="button" onClick={this.saveDate}>{save}</button>
        </div>
      </section>
    );
  }
}

CustomDatePicker.defaultProps = DefaultProps;

export default CustomDatePicker;
