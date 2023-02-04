import React, { Component } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import { ItemExam } from 'components';
import ExamBlockWrapper from './examBlock.style';

const b = bemlds('exam-block');

class ExamBlock extends Component {
  render() {
    const {
      exams,
      changeExamPoints,
      courseTopicId,
    } = this.props;
    if (!exams.length) { return null; }
    const isDisabled = exams.map(item => Boolean(item.studentLogs && item.studentLogs.length)).some(item => !item);

    return (
      <ExamBlockWrapper>
        <div className={b()}>
          <div className={b('chapter')}>
            <IntlMessages id="notes.chapter" />
          </div>
          {!isDisabled && (
          <div className={b('title')}>
            <IntlMessages id="notes.titleScore" />
          </div>
          )}
          <div className={b('exams')}>
            {exams && exams.map(exam => (
              <ItemExam
                key={exam.id}
                exam={exam}
                changeExamPoints={changeExamPoints}
                courseTopicId={courseTopicId}
              />
            ))}
          </div>
        </div>
      </ExamBlockWrapper>
    );
  }
}

export default ExamBlock;
