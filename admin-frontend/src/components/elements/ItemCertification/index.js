import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import moment from 'moment';
import Modal from 'components/feedback/modal';
import { ReserveCard } from 'components';
import { DATE_FORMATS } from 'constants/constants';
import IntlMessages from 'components/utility/intlMessages';
import ItemCertificationWrapper from './itemCertification.style';

const { dayMonthYearTime } = DATE_FORMATS;
const b = bemlds('item-certification');

class ItemCertification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
    };
  }

  openModal = () => {
    this.setState({
      isShowModal: true,
    })
  };

  closeModal = () => {
    this.setState({
      isShowModal: false,
    })
  };

  render() {
    const { isShowModal } = this.state;
    const {
      item,
      idStudent,
      idCourse,
      reserveCertificate,
      cancelReserveCertificate,
      isAllCertificateNotReserve,
    } = this.props;

    const {
      id: idCertificate,
      isBooked,
      startAt,
      city,
    } = item;

    const parseDate = startAt => moment(startAt).format(dayMonthYearTime);

    return (
      <ItemCertificationWrapper>
          <div
            role="button"
            tabIndex="-1"
            onClick={this.openModal}
            className={b({ 'reserve': isBooked })}
          >
            <div className={b('text')}>
              <div className={b('text-city')}>
                {city}
              </div>
              <div className={b('text-date')}>
                {parseDate(startAt)}
              </div>
              <div className={b('text-reserve')}>
                {isBooked ? <IntlMessages id="students.certReserved" /> : null }
              </div>
            </div>
            <div className={b('button')}>
              {isBooked ?
                <IntlMessages id="students.certCancel"/>
                :
                <IntlMessages id="students.certReserve"/>
              }
            </div>
          </div>
          <Modal
            className={b('modal')}
            visible={isShowModal}
            onCancel={this.closeModal}
            footer={null}
            style={{display: 'flex', alignContent: 'center'}}
          >
            <ReserveCard
              item={item}
              idStudent={idStudent}
              idCourse={idCourse}
              idCertificate={idCertificate}
              reserveCertificate={reserveCertificate}
              cancelReserveCertificate={cancelReserveCertificate}
              isAllCertificateNotReserve={isAllCertificateNotReserve}
              closeModal={this.closeModal}
            />
          </Modal>
      </ItemCertificationWrapper>
    );
  }
}

export default ItemCertification;

