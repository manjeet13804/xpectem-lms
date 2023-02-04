// @flow
import React, { Node, PureComponent } from 'react';

import 'react-vis/dist/style.css';
import {
  XYPlot,
  ArcSeries,
} from 'react-vis';
import './styles.scss';

const DefaultProps = {
  allThemes: null,
  completeThemes: null,
};

type PropType = {
  allThemes?: number,
  completeThemes?: number
};

class CircleProgressBar extends PureComponent<PropType> {
  constructor(props: PropType) {
    super(props);
    this.state = {};
  }

  render(): Node {
    const { completeThemes, allThemes } = this.props;
    const percentage = allThemes / completeThemes;
    const myData = [
      {
        angle0: 0,
        angle: 2 * Math.PI,
        opacity: 0.8,
        radius: 5,
        radius0: 8,
        color: '#e0e0e0',
      },
      {
        angle0: 0,
        angle: 2 * Math.PI / percentage,
        opacity: 1,
        radius: 5,
        radius0: 12,
        color: '#8bc34a',
      },
    ];

    return (
      <XYPlot
        xDomain={[-30, -10]}
        yDomain={[-30, -15]}
        width={40}
        height={40}
      >
        <ArcSeries
          animation
          radiusType="literal"
          center={{ x: 0, y: 0 }}
          data={myData}
          colorType="literal"
        />
      </XYPlot>
    );
  }
}

CircleProgressBar.defaultProps = DefaultProps;

export default CircleProgressBar;
