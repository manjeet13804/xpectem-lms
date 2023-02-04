// @flow
import React from 'react';
import type { Node } from 'react';
import { connect } from 'react-redux';

import block from 'utils/bem';

import { getUserRoles } from 'redux/selectors';

import { Page } from 'pages';
import {
  StudentItemCard,
  AddUserBtn,
  TableContent,
  TableCheckControls,
  AddingStudentPopup,
} from 'components';

import { TERM_SHARED } from 'localise';
import { STUDENTS_CARD_LIST } from 'constants/mock';
import OPTIONS_SORT from './constants';

import './students.scss';

const bem = block('students');

type StateType = {
  isPopupOpen: boolean
};


class StudentsPage extends Page<null, StateType> {
  constructor() {
    super();
    this.bem = bem;
    this.renderList = STUDENTS_CARD_LIST;
    this.state = {
      isPopupOpen: false,
      checkedList: this.setListCheckbox(false),
    };
  }

  showFormStudent = () => {
    this.setState({
      isPopupOpen: true,
    });
  }

  closeFormStudent = () => {
    this.setState({
      isPopupOpen: false,
    });
  }

  renderControls = (props: object): Node => {
    const checked = this.checkList();
    return (
      <TableCheckControls
        idCheckbox={this.markAllId}
        checkAll={this.toggleAll}
        checked={checked}
        {...props}
      />
    );
  }

  renderStudent = (props: object): Node => {
    const { checkedList} = this.state;
    const { id } = props.data;
    return (
      <StudentItemCard
        toggleItem={this.toggleItem}
        {...props}
        checked={checkedList[id]}
      />
    );
  }

  renderContent = (): Node => {
    const {isPopupOpen, checkedList} = this.state;

    return (
      <React.Fragment>
        <div className={bem('wrap')}>
          <AddUserBtn
            text={TERM_SHARED.addStudent}
            clickHandler={this.showFormStudent}
          />
        </div>
        <TableContent
          row={this.renderStudent}
          controls={this.renderControls}
          renderList={this.renderList}
          optionsSort={OPTIONS_SORT}
          showCaption="true"
          showSwitchControl="true"
          checkedList={checkedList}
        />
        {
        isPopupOpen && <AddingStudentPopup close={this.closeFormStudent} />
        }
      </React.Fragment>
    );
  }
}

const stateProps = (state: object): object => ({
  userRole: getUserRoles(state),
});

export default connect(stateProps)(StudentsPage);
