import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
  CertificationList,
} from 'components';
import certificationActions from '../../../redux/certifications/actions';
import CertificationsWrapper from './certifications.style';
import CertificationsModal from './certificationsModal';

const defaultProps = {
  certifications: [],
  certificationData: {},
  fillCertificateData: () => null,
  clearCertificateData: () => null,
  changeCertificateData: () => null,
  getAllCertifications: () => null,
  createCertification: () => null,
  updateCertification: () => null,
  deleteCertification: () => null,
};

const propTypes = {
  certifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    zip: PropTypes.number,
    startAt: PropTypes.string,
  })),
  certificationData: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    zip: PropTypes.number,
    startAt: PropTypes.string,
  }),
  fillCertificateData: PropTypes.func,
  clearCertificateData: PropTypes.func,
  changeCertificateData: PropTypes.func,
  getAllCertifications: PropTypes.func,
  createCertification: PropTypes.func,
  updateCertification: PropTypes.func,
  deleteCertification: PropTypes.func,
};

const page = bemlds('page');

const Certifications = ({
  certifications,
  certificationData,
  deleteCertification,
  updateCertification,
  createCertification,
  getAllCertifications,
  changeCertificateData,
  clearCertificateData,
  fillCertificateData,
}) => {
  useEffect(() => {
    getAllCertifications();
  }, []);
  const [isOpenModal, toggle] = useState(false);

  const closeModal = () => {
    toggle(false);
    clearCertificateData();
  };

  const openModal = () => {
    toggle(true);
  };

  const openEditModal = (body) => {
    toggle(true);
    fillCertificateData(
      {
        ...body,
        startAt: new Date(body.startAt),
      },
    );
  };

  const handleSave = (body) => {
    createCertification(body);
    closeModal();
  };

  const handleEdit = (body) => {
    updateCertification(body);
    closeModal();
  };

  const handleDelete = (id) => {
    deleteCertification(id);
    closeModal();
  };

  return (
    <LayoutContent>
      <CertificationsWrapper>
        <Banner title={<IntlMessages id="certifications.bannerTitle" />} />
        <CertificationList certifications={certifications} openEditModal={openEditModal} />
        <div className={page('footer')}>
          <button
            className={page('button')}
            type="button"
            onClick={openModal}
          >
            <IntlMessages id="certifications.addCertificationDate" />
          </button>
        </div>
      </CertificationsWrapper>
      <CertificationsModal
        isOpen={isOpenModal}
        closePopUp={closeModal}
        onSave={handleSave}
        body={certificationData}
        onChange={changeCertificateData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </LayoutContent>
  );
};

const mapStateToProps = ({
  certificationsReducer: {
    certifications,
    certificationData,
  },
}) => ({
  certifications,
  certificationData,
});

Certifications.propTypes = propTypes;
Certifications.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  {
    ...certificationActions,
  },
)(Certifications);
