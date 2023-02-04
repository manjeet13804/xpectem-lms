// @flow
import React, { Node } from 'react';
import block from 'utils/bem';
import {
  ArrowIcon,
  Avatar,
  StatsContent,
} from 'components';
import getRenderData from './utils';

import './statistic.scss';

const bem = block('statistic');

const DefaultProps = {
  active: null,
  total: null,
  newCount: null,
  admins: [],
  isAdminStatistic: false,
};

type PropType = {
  onClick: object,
  title: string,
  active?: number,
  total?: number,
  newCount?: number,
  admins?: Array,
  isAdminStatistic?: boolean
};

const StatisticBlock = (props: PropType): Node => {
  const {
    title,
    active,
    total,
    newCount,
    admins,
    onClick,
    isAdminStatistic,
  } = props;

  const statsData = getRenderData(active, total, newCount);
  return (
    <section className={bem()}>
      <h2 className={bem('title')}>{title}</h2>
      <div
        onClick={onClick}
        className={bem('container')}
        role="button"
        tabIndex={0}
      >
        {
          !isAdminStatistic && (
            <StatsContent
              statsData={statsData}
              bem={bem}
            />
          )
        }
        {
          isAdminStatistic && (
            <div className={bem('admins')}>
              {
                admins.map((item: object): Node => (
                  <Avatar
                    key={item.id}
                    img={item.img}
                    firstName={item.firstName}
                    lastName={item.lastName}
                  />
                ))
            }
            </div>
          )
        }
        <ArrowIcon
          className={bem('svg')}
        />
      </div>
    </section>
  );
};

StatisticBlock.defaultProps = DefaultProps;

export default StatisticBlock;
