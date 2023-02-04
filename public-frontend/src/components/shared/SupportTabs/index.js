// @flow
import React, {Node} from 'react';
import {bemlds} from 'utils';
import SupportTab from './SupportTab';
import './styles.scss';

const block = bemlds('support-tabs');

type TabType = {
  id: string,
  icon: string,
  title: string,
  link: string
};

type PropsType = {
  tabs: TabType[],
  activeTabId: number
};

const SupportTabs = ({ tabs, activeTabId }: PropsType): Node => (
  <div className={block()}>
    {
        tabs.map((tab: TabType): Node => (
          <SupportTab
            key={tab.id}
            {...tab}
            active={tab.id === activeTabId}
          />
        ))
    }
  </div>
);

export default SupportTabs;
