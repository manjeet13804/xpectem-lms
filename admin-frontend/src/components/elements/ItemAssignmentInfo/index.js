import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import moment from 'moment';
import { DATE_FORMATS } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import ItemAssignmentInfoWrapper from './itemAssignmentInfo.style';

const { yearMonthDay } = DATE_FORMATS;
const b = bemlds('item-assignment-info');

class ItemAssignmentInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  render() {
    const { assignment } = this.props;
    const {
      name,
      studentLogs,
    } = assignment;

    return (
      <ItemAssignmentInfoWrapper>
        <div className={b()}>
          {name && (
            <div className={b('title')}>
              {name}
            </div>
          )}
          {studentLogs && studentLogs.map((
            {
              id: studLogId,
              status,
              points,
              completedAt,
            }) => (
              <div key={studLogId} className={b('row')}>
                {(status === 'completed') ?
                  (
                    <div className={b('item', { 'passed': true })}>
                      <IntlMessages id="notes.passedCheck" />
                    </div>
                  )
                  :
                  (
                    <div className={b('item', { 'failed': true })}>
                      <IntlMessages id="notes.failedCheck" />
                    </div>
                  )
                }
                {(
                  <div className={
                    b('item',
                      { 'passed': status === 'completed' },
                      { 'failed': status !== 'completed' },
                    )
                  }>
                    {points}
                  </div>
                )}
                {completedAt && (
                  <input
                    className={b('date')}
                    type="text"
                    value={moment(completedAt).format(yearMonthDay)}
                    name="completedAt"
                    disabled
                  />
                )}
              </div>
            ))}
        </div>
      </ItemAssignmentInfoWrapper>
    );
  }
}

export default ItemAssignmentInfo;

