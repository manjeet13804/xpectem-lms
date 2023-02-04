import React, { Component } from 'react';
import { bemlds } from 'utils';
import IntlMessages from 'components/utility/intlMessages';
import CreatedAtBlockWrapper from './createdAtBlock.style';
import moment from 'moment';
import { DATE_FORMATS } from 'constants/constants';

const created = bemlds('created');
const changed = bemlds('changed');

const { yearMonthDayHoursMinutesSeconds } = DATE_FORMATS;

class CreatedAtBlock extends Component {
  render() {
    const { data } = this.props;
    const{
      changedBy,
      createdBy,
      createdAt,
      updatedAt,
    } = data;

    if (!createdBy)  { return null; }

    const dateParse = date => (date ? moment(date).format(yearMonthDayHoursMinutesSeconds) : date);

    return (
      <CreatedAtBlockWrapper>
        <section className={created()}>
          <section className={created('date')}>
          <div className={created('date-title')}>
           <IntlMessages id="lmsGroups.createdTitle" />
          </div>
          <div className={created('date-date')}>
            {dateParse(createdAt)}
          </div>
          </section>
          <section className={created('name')}>
            <div className={created('name-title')}>
              <IntlMessages id="lmsGroups.createdTitleBy" />
            </div>
            <div className={created('name-text')}>
              <div>{createdBy.firstName}</div>
              <div>{createdBy.userEmail[0].email}</div>
              <div>{createdBy.roles}</div>
            </div>
          </section>
        </section>
        {changedBy && (
          <section className={changed()}>
            <section className={changed('date')}>
              <div className={changed('date-title')}>
                <IntlMessages id="lmsGroups.changedTitle" />
              </div>
              <div className={changed('date-date')}>
                {dateParse(updatedAt)}
              </div>
            </section>
            <section className={changed('name')}>
              <div className={changed('name-title')}>
                <IntlMessages id="lmsGroups.changedTitleBy" />
              </div>
              <div className={changed('name-text')}>
                <div>{changedBy.firstName}</div>
                <div>{changedBy.userEmail[0].email}</div>
                <div>{changedBy.roles}</div>
              </div>
            </section>
          </section>
        )}
      </CreatedAtBlockWrapper>
    );
  }
}

export default CreatedAtBlock;
