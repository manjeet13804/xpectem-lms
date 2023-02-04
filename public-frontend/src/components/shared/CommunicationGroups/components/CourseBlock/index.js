// @flow
import React, {
  PureComponent,
  Node,
} from 'react';
import { bemlds } from 'utils';
import { COMMUNICATION_DICTIONARY } from 'localise';
import './styles.scss';

const b = bemlds('course-block');

type PropsType = {
  title: string,
  allMessage: number,
  newMessage: number,
  onClick: void
};

class CourseBlock extends PureComponent<PropsType> {
  render(): Node {
    const {
      title,
      allMessage,
      newMessage,
      onClick,
    } = this.props;
    return (
      <div className={b()} role="button" tabIndex="0" onClick={onClick}>
        <div className={b('navlink')}>
          <section className={b('title')}>{title}</section>
          <section className={b('stats')}>
            <section className={b('stats-message')}>
              <div className={b('stats-message-title')}>
                {COMMUNICATION_DICTIONARY.message}
              </div>
              <div className={b('stats-message-count')}>
                {allMessage}
              </div>
            </section>
            <section className={b('stats-new')}>
              <div className={b('stats-new-title')}>
                {COMMUNICATION_DICTIONARY.new}
              </div>
              <div className={b('stats-new-count')}>
                {newMessage}
              </div>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default CourseBlock;
