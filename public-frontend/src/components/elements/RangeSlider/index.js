// @flow
import React, { Node } from 'react';
import Slider from 'react-rangeslider';
import { bemlds } from 'utils';
import { STUDY_PLAN } from 'constants/constants';
import 'react-rangeslider/lib/index.css';
import './styles.scss';

const b = bemlds('range-slider');

const {
  labels,
  min,
  max,
  step,
} = STUDY_PLAN;


const DefaultProps = {
  className: '',
  value: 8,
  onChange: () => {},
};

type PropType = {
  className?: string,
  onChange?: () => void,
  value?: number
};

const RangeSlider = ({onChange, className, value}: PropType): Node => {
  const handleChange = (e: number) => {
    onChange(e);
  };

  return (
    <div className={b({mix: className})}>
      <div className={b('labels')}>
        {
          labels.map((item: number): Node => (
            <span className={b('label-item', {active: item === value})} key={`label${item}`}>{item}</span>
          ))
        }
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

RangeSlider.defaultProps = DefaultProps;

export default RangeSlider;
