import React, { Component } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import moment from 'moment';
import { DATE_FORMATS } from 'constants/constants';
import ItemExamInfoWrapper from './itemExamInfo.style';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('item-exam-info');

const getTypePassed = (gradeA, gradeC, points) => {
  if (points >= gradeA) {
    return 'PD';
  } else if (points < gradeC) {
    return 'F';
  } else {
    return 'P';
  }
};

class ItemExamInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { exam } = this.props;
    const {
      maxPoints,
      gradeA,
      gradeC,
      name,
      studentLogs,
    } = exam;

    return (
      <ItemExamInfoWrapper>
        <div className={b()}>
          {name && (
            <div className={b('title')}>
              {name}
            </div>
          )}
          <div className={b('column')}>
            <div className={b('input')}>
              <div className={b('input-title')}>
                <IntlMessages id="notes.examScore" />
              </div>
              <input
                className={b('input-number')}
                type="text"
                value={maxPoints}
                name="maxPoints"
                disabled
              />
            </div>
            <div className={b('input')}>
              <div className={b('input-title')}>
                <IntlMessages id="notes.passScore" />
              </div>
              <input
                className={b('input-number')}
                type="text"
                value={gradeC}
                name="gradeC"
                disabled
              />
            </div>
            <div className={b('input')}>
              <div className={b('input-title')}>
                <IntlMessages id="notes.passDestinction" />
              </div>
              <input
                className={b('input-number')}
                type="text"
                value={gradeA}
                name="gradeA"
                disabled
              />
            </div>
          </div>
          <div className={b('student-logs')}>
            {studentLogs && studentLogs.map(({ id: studLogId, points, completedAt }) => (
              <div key={studLogId} className={b('row')}>
                <div
                  className={
                    b('input-text',
                      {
                        'failed' : (getTypePassed(gradeA, gradeC, points) === 'F'),
                        'passed-distinction' : (getTypePassed(gradeA, gradeC, points) === 'PD')
                      },
                    )
                  }
                >
                  {(points < gradeC) ? 'Failed' : 'Passed' }
                </div>
                <input
                  className={
                    b('input-number',
                      {
                        'failed' : (getTypePassed(gradeA, gradeC, points) === 'F'),
                        'passed-distinction' : (getTypePassed(gradeA, gradeC, points) === 'PD')
                      },
                    )
                  }
                  type="text"
                  value={points}
                  name="points"
                  disabled
                />
                <input
                  className={b('input-date')}
                  type="text"
                  value={moment(completedAt).format(yearMonthDay)}
                  name="passScore"
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
      </ItemExamInfoWrapper>
    );
  }
}

export default ItemExamInfo;

