import React from 'react';
import { PropTypes } from 'prop-types';
import IntlMessages from 'components/utility/intlMessages';
import moment from 'moment';
import { bemlds } from 'utils';
import './styles.scss';
import {
  DATE_FORMATS,
} from 'constants/constants';

const { certificationDate } = DATE_FORMATS;

const defaultProps = {
  certifications: [],
  openEditModal: null,
  cancelReserve: () => null,
  reserve: () => null,
};

const propTypes = {
  certifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    zip: PropTypes.number,
    startAt: PropTypes.string,
  })),
  openEditModal: PropTypes.func,
  cancelReserve: PropTypes.func,
  reserve: PropTypes.func,
};

const b = bemlds('certifications-list');
const toBoolValue = val => Boolean(Number(val));
const dateToString = date => (date ? moment(date).format(certificationDate) : date);
const CertificationList = ({
  certifications,
  openEditModal,
  cancelReserve,
  reserve,
}) => (
  <section className={b()}>
    <div className={b('header')}>
      <p className={b('header-text')}>
        <IntlMessages id="certifications.headerText" />
      </p>
    </div>
    {certifications.map(item => (
      <div className={b('certification-row', { reserved: toBoolValue(item.reserved) })} key={item.id}>
        <p className={b('certification-row-text')}>
          {`${item.city}, ${dateToString(item.startAt)}, ${item.street}, ${item.zip}`}
        </p>
        {openEditModal && (
          <button className={b('control-btn')} type="button" onClick={() => openEditModal(item)}>
            <IntlMessages id="certifications.editText" />
          </button>
        )
        }
        {Boolean(!openEditModal) && (toBoolValue(item.reserved) ? (
          <button className={b('control-btn')} type="button" onClick={() => cancelReserve(item)}>
            <IntlMessages id="certifications.cancelCertification" />
          </button>
        ) : (
          <button className={b('control-btn')} type="button" onClick={() => reserve(item)}>
            <IntlMessages id="certifications.reserveCertification" />
          </button>
        ))}
      </div>
    ))}
  </section>
);

CertificationList.propTypes = propTypes;
CertificationList.defaultProps = defaultProps;

export default CertificationList;
