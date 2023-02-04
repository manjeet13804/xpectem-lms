// @flow
import React, {Component} from 'react';
import type { Node } from 'react';

import classNames from 'classnames/bind';
import block from 'utils/bem';
import {
  CopyRighting,
  Header,
} from 'components';
import { USER_ROLES_ENUM } from 'constants/enums';

import './page.scss';

const bemPage = block('page');

type StateType = {
  checkedList: object
};

type PropsType = {
  userRole: string
};

class Page extends Component<PropsType, StateType> {
  constructor() {
    super();
    this.bem = () => {};
    this.users = USER_ROLES_ENUM;
    this.markAllId = 'all';
    this.renderList = [];
    this.state = {
      checkedList: this.setListCheckbox(false),
    };
  }

  setListCheckbox = (value: boolean): StateType => {
    const checkedList = this.renderList.reduce((acc: object, item: object): StateType => {
      acc[`${item.id}`] = value;
      return acc;
    }, {});
    checkedList[this.markAllId] = value;
    return checkedList;
  }

  toggleItem = (id: string | number) => {
    const { checkedList } = this.state;
    this.setState({
      checkedList: {
        ...checkedList,
        [id]: !checkedList[id],
      },
    });
  }

  checkList = (): boolean => {
    const { checkedList } = this.state;
    let confurm = true;
    /* eslint-disable-next-line */
    for (const key in checkedList) {
      confurm = confurm && checkedList[key];
    }
    return confurm;
  }

  toggleAll = (id: string | number) => {
    let { checkedList } = this.state;
    checkedList = this.setListCheckbox(!checkedList[id]);
    this.setState({
      checkedList,
    });
  }

  renderContent = (): Node => null;

  render(): Node {
    const { userRole } = this.props;
    const mainClass = classNames([
      `${bemPage()}`,
      `${this.bem()}`,
    ]);
    const headerClass = classNames([
      `${bemPage('header')}`,
      `${this.bem('header')}`,
    ]);
    const contentClass = classNames([
      `${bemPage('content')}`,
      `${this.bem('content')}`,
    ]);
    const copyrightClass = classNames([
      `${bemPage('copyright')}`,
      `${this.bem('copyright')}`,
    ]);

    return (
      <div className={mainClass}>
        <Header
          isLogin="true"
          className={headerClass}
          userRole={userRole}
        />
        <main className={contentClass}>
          {this.renderContent()}
        </main>
        <CopyRighting className={copyrightClass} />
      </div>
    );
  }
}

export default Page;
