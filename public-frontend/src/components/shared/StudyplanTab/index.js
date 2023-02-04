// @flow
import React, { Node, Component } from 'react';
import { STUDYPLAN } from 'localise';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { DATE_FORMATS } from 'constants/constants';
import { actionGetStudyPlan, actionSetStudyPlanParam } from 'redux/actions';
import { getDataSrudyPlan, getLoadingSrudyPlan } from 'redux/selectors';
import { bemlds } from 'utils';
import {
  CustomDatePicker,
  RangeSlider,
  HorizontalProgressBar,
  StudyPlanPopup,
  WorkTimeSelect,
} from 'components';
import { parseISO, differenceInCalendarDays } from 'date-fns';
import './styles.scss';
import Loader from 'components/elements/CustomLoader';

const b = bemlds('studyplan-tab');

const {
  title,
  startDate,
  finalDate,
  numberDaysLeft,
  accordingDaysLeft,
  needMoreTime,
  studyplanToolTitle,
  studyplanToolDescription,
  studyplanToolInfo,
  hoursPerWeek,
  leftToStudy,
  selectPaceStudy,
  selectFinalDate,
} = STUDYPLAN;

const { dayMonthYear } = DATE_FORMATS;

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  studyPlanData: object,
  setStudyPlanParam: () => void,
  getStudyPlan: () => void,
  match: object
};

class StudyplanTab extends Component<PropType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      isOpenPlanPopup: false,
      isOpenDatePicker: false,
    };
  }

  componentDidMount() {
    const {getStudyPlan, match: {params: {id}}} = this.props;
    getStudyPlan({id});
  }

  closeDatePicker = () => {
    this.setState({isOpenDatePicker: false});
  };

  openDatePicker = () => {
    this.setState({isOpenDatePicker: true});
  };

  closePlanPopup = () => {
    this.setState({isOpenPlanPopup: false});
  };

  openPlanPopup = () => {
    this.setState({isOpenPlanPopup: true});
  };

  saveDate = (value: date) => {
    const { setStudyPlanParam, match: {params: {id}} } = this.props;
    setStudyPlanParam({id, body: {wishedDoneDate: value}});
    this.closeDatePicker();
  };

  saveTime = (value: number) => {
    const { setStudyPlanParam, match: {params: {id}} } = this.props;
    setStudyPlanParam({id, body: {hoursPerWeek: value}});
    this.closePlanPopup();
  };

  render(): Node {
    const { isOpenPlanPopup, isOpenDatePicker } = this.state;
    const { className, studyPlanData, isLoadingSrudyPlan } = this.props;

    if (!Object.keys(studyPlanData).length) {
      return null;
    }

    const {
      student: {
        leftDays,
        studyPlan,
        accessUntil,
        startAt,
      },
    } = studyPlanData;

    const {
      hoursPerWeek: hoursPerWeekValue,
      leftDays: calculatedLeftDays,
      wishedDoneDate,
    } = studyPlan;

    const planItems = [
      {
        name: startDate,
        value: moment(startAt).format(dayMonthYear),
      },
      {
        name: finalDate,
        value: moment(accessUntil).format(dayMonthYear),
      },
      {
        name: numberDaysLeft,
        value: leftDays,
      },
      {
        name: accordingDaysLeft,
        value: calculatedLeftDays,
      },
    ];

    const daysByStudyPlan = differenceInCalendarDays(
      parseISO(accessUntil),
      parseISO(startAt),
    );

    const progress = leftDays / daysByStudyPlan * 100;
    const finalDateValue = moment(wishedDoneDate).format(dayMonthYear);

    return (
      <section className={b({ mix: className })} ref={this.saveRoot}>
        {isLoadingSrudyPlan ? (
          <Loader />
        ) : (
          <>
            <span className={b('title')}>{title}</span>
            <hr className={b('separator')} />
            <div className={b('plan-block')}>
              {
                planItems.map(({name, value}: object): Node => (
                  <div className={b('plan-item')} key={name}>
                    <span className={b('plan-item-name')}>{name}</span>
                    <span className={b('plan-item-value')}>{value}</span>
                  </div>
                ))
              }
            </div>
            <span className={b('more-time-text')}>{needMoreTime}</span>
            <span className={b('sub-title')}>{studyplanToolTitle}</span>
            <hr className={b('separator')} />
            <span className={b('description-text')}>{studyplanToolDescription}</span>
            <div className={b('date-block')}>
              <span className={b('date-block-text')}>{finalDate}</span>
              <div className={b('date-wrap')}>
                <span className={b('date-block-value')}>{finalDateValue}</span>
                <button className={b('btn')} type="button" onClick={this.openDatePicker}>{selectFinalDate}</button>
                {isOpenDatePicker && (
                  <CustomDatePicker
                    className={b('date-picker')}
                    close={this.closeDatePicker}
                    value={wishedDoneDate}
                    saveSettings={this.saveDate}
                  />
                )
                }
              </div>
            </div>
            <div className={b('hours-block')}>
              <RangeSlider className={b('slider')} disable value={hoursPerWeekValue} />
              <div className={b('hours-block-wrap')}>
                <span className={b('hours-block-text')}>{hoursPerWeek}</span>
                <button className={b('btn')} type="button" onClick={this.openPlanPopup}>{selectPaceStudy}</button>
              </div>
            </div>
            <div className={b('work-select-wrap')}>
              <WorkTimeSelect className={b('work-select')} value={hoursPerWeekValue} saveData={this.saveTime} />
            </div>
            <div className={b('progress-block')}>
              <span className={b('progress-value')}>{`${progress.toFixed(0)}%`}</span>
              <HorizontalProgressBar progress={`${progress}%`} className={b('progress-bar')} />
              <span className={b('progress-text')}>{leftToStudy}</span>
            </div>
            <span className={b('text-info')}>{studyplanToolInfo}</span>
            {isOpenPlanPopup && (
              <StudyPlanPopup
                className={b('popup')}
                saveData={this.saveTime}
                hourValue={hoursPerWeekValue}
                date={finalDateValue}
                close={this.closePlanPopup}
              />
            )}
          </>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  studyPlanData: getDataSrudyPlan(state),
  isLoadingSrudyPlan: getLoadingSrudyPlan(state),
});

const mapDispatchToProps = {
  setStudyPlanParam: actionSetStudyPlanParam,
  getStudyPlan: actionGetStudyPlan,
};

StudyplanTab.defaultProps = DefaultProps;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudyplanTab),
);
