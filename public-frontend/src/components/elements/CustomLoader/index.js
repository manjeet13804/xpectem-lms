import React from 'react';
import './styles.scss';
import { Spin } from 'antd';
import { bemlds } from 'utils';

const b = bemlds('loader');

const Loader = (): React.FC => (
  <div className={b()}>
    <Spin size="large" />
  </div>
);

export default Loader;
