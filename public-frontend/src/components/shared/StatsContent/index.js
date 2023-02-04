// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import classNames from 'classnames/bind';
import { sharedClass } from 'utils/className';

import './stats-content.scss';

const bemMain = block('stats-content');

const DefaultProps = {
  bem: null,
};

type StatsType = {
  name: string,
  value: number,
  prefix?: string
};

type PropType = {
  statsData: Array<StatsType>,
  bem?: (string | null) => string
};

const StatsContent = (props: PropType): Node => {
  const { statsData, bem } = props;
  const mainClass = sharedClass(bemMain('stats-values'), bem('stats-values'));
  const nameClass = sharedClass(bemMain('stats-name'), bem('stats-name'));
  const subnameClass = sharedClass(bemMain('stats-subname'), bem('stats-subname'));
  const itemClass = sharedClass(bemMain('stats-item'), bem('stats-item'));
  const infoClass = sharedClass(bemMain('stats-info'), bem('stats-info'));

  const countClass = (prefix: string): string => classNames([
    `${bem('stats-count', prefix && {[prefix]: true})}`,
    `${bemMain('stats-count')}`,
  ]);

  return (
    <section className={mainClass}>
      {
        statsData.map((item: StatsType): Node => (
          <section className={itemClass} key={item.name}>
            <p className={nameClass}>{item.name}</p>
            <p className={infoClass}>
              {
                item.subname && <span className={subnameClass}>{item.subname}</span>
              }
              <span className={countClass(item.prefix)}>{item.value}</span>
            </p>
          </section>
        ))
      }
    </section>
  );
};

StatsContent.defaultProps = DefaultProps;

export default StatsContent;
