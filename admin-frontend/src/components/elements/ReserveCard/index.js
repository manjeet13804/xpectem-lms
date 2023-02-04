import React, { Component } from 'react';
import { bemlds } from 'utils';
import moment from 'moment';
import IntlMessages from 'components/utility/intlMessages';
import { DATE_FORMATS } from 'constants/constants';
import ReserveCardWrapper from './reserveCard.style';

const b = bemlds('reserve-card');

const { dayMonthYearTime } = DATE_FORMATS;

class ReserveCard extends Component {

  toggleReserveCertificate = () => {
    const {
      item: { isBooked, startAt },
      idStudent,
      idCourse,
      idCertificate,
      reserveCertificate,
      cancelReserveCertificate,
      isAllCertificateNotReserve,
      closeModal,
    } = this.props;
    const notCanceledReserve = moment.duration(moment(startAt).diff(moment(new Date()))).asHours() <= 12;


    if (isBooked) {
      !notCanceledReserve
      && cancelReserveCertificate(idStudent, idCourse, idCertificate);
      closeModal();
    } else {
      isAllCertificateNotReserve
      && reserveCertificate(idStudent, idCourse, idCertificate);
      closeModal();
    }

    return null;
  };

  render() {
    const {
      item = {},
      closeModal,
    } = this.props;

    const {
      isBooked,
      startAt,
      city,
    } = item;

    const notCanceledReserve = moment.duration(moment(startAt).diff(moment(new Date()))).asHours() <= 12;
    const parseDate = startAt => moment(startAt).format(dayMonthYearTime);

    return (
      <ReserveCardWrapper>
        <div className={b()}>
          {!notCanceledReserve && (
            <div className={b('text')}>
              <div className={b('text-attention')}>
                {isBooked ?
                  <IntlMessages id="students.certSureCancel" />
                  : <IntlMessages id="students.certSureReserve" />
                }
              </div>
              <div className={b('text-certificate')}>
                <div className={b('text-certificate-city')}>
                  {city}
                </div>
                <div>
                  {parseDate(startAt)}
                </div>
              </div>
            </div>
          )}
          {notCanceledReserve && (
            <div className={b('text')}>
              <div className={b('text-attention')}>
                <IntlMessages id="students.certNotCanceled" />
              </div>
            </div>
          )}
          {!notCanceledReserve && (
            <div className={b('button')}>
              <button
                onClick={this.toggleReserveCertificate}
                className={b('button-yes')}
              >
                <IntlMessages id="students.certModalYes" />
              </button>
              <button
                onClick={closeModal}
                className={b('button-no')}
              >
                <IntlMessages id="students.certModalNo" />
              </button>
            </div>
          )}
          {notCanceledReserve && (
            <div className={b('button')}>
              <button
                onClick={closeModal}
                className={b('button-yes-ok')}
              >
                <IntlMessages id="students.certModalOk" />
              </button>
            </div>
          )}
        </div>
      </ReserveCardWrapper>
    );
  }
}

export default ReserveCard;

