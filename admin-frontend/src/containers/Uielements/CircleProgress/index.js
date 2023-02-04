import React, { Component } from 'react';
import { Progress } from 'antd';
import CircleProgressWrapper from './circleProgress.style';

const CircleProgressBar = props => (
  <CircleProgressWrapper>
    <Progress {...props}>{props.children}</Progress>
  </CircleProgressWrapper>
);

class CircleProgress extends Component {
  render() {
    const { percent } = this.props;
    return (
      <CircleProgressBar
        type="circle"
        showInfo={false}
        strokeWidth={25}
        percent={percent}
        width={24}
      />
    );
  }
}

export default CircleProgress;
