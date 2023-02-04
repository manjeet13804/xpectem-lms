// @flow
import React, { SynteticEvent, Node } from 'react';
import { bemlds } from 'utils';
import { CloseIcon, RangeSlider } from 'components';
import { STUDYPLAN, TERM_SHARED } from 'localise';
import './styles.scss';

const b = bemlds('study-plan-popup');


const { hoursPerWeek, FinalDateAccordingSyllabus, studyPlan } = STUDYPLAN;

const { save, abort } = TERM_SHARED;

type PropType = {
  close: () => void,
  saveData?: () => void,
  date: string,
  hourValue: number,
  className?: string
};

const DefaultProps = {
  className: '',
  saveData: () => {},
};

class StudyPlanPopup extends React.Component<PropType> {
  constructor(props: PropType) {
    super(props);
    const { hourValue } = props;
    this.block = React.createRef();
    this.state = {
      selectTimeValue: hourValue,
    };
  }

  closePopup = (e: SynteticEvent) => {
    const {close} = this.props;
    if (e.target === this.block.current) {
      close();
    }
  };

  handleChange = (value: number) => {
    this.setState({selectTimeValue: value});
  };

  saveValue = () => {
    const { saveData } = this.props;
    const { selectTimeValue } = this.state;
    saveData(selectTimeValue);
  };

  render(): Node {
    const { className, date, close } = this.props;
    const { selectTimeValue } = this.state;

    return (
      <div
        className={b({mix: className})}
        ref={this.veil}
        onClick={this.closePopup}
        role="button"
        tabIndex="0"
      >
        <div className={b('content-block')}>
          <div className={b('title-block')}>
            <span className={b('title')}>{studyPlan}</span>
            <button className={b('btn-close')} type="button" onClick={close}>
              <CloseIcon className={b('close-icon')} />
            </button>
          </div>
          <hr className={b('separator')} />
          <div className={b('date-block')}>
            <span className={b('date-block-text')}>{FinalDateAccordingSyllabus}</span>
            <span className={b('date-block-value')}>{date}</span>
          </div>
          <div className={b('hours-block')}>
            <RangeSlider className={b('slider')} value={selectTimeValue} onChange={this.handleChange} />
            <span className={b('hours-block-text')}>{hoursPerWeek}</span>
          </div>
          <hr className={b('separator')} />
          <div className={b('btn-block')}>
            <button className={b('btn-abort')} type="button" onClick={close}>{abort}</button>
            <button className={b('btn-save')} type="button" onClick={this.saveValue}>{save}</button>
          </div>
        </div>
      </div>
    );
  }
}

StudyPlanPopup.defaultProps = DefaultProps;


export default StudyPlanPopup;
