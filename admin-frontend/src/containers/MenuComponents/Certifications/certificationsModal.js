import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CustomTextInput } from 'components';
import moment from 'moment';

import IntlMessages from 'components/utility/intlMessages';
import { bemlds, validateForm } from 'utils';
import { Modal } from 'antd';
import DatePicker from 'react-datepicker';
import CertificationsWrapper from './certifications.style';
import schema from './schema';
import { SIMPLE_DICTIONARY, DATE_FORMATS } from '../../../constants/constants';

import 'react-datepicker/dist/react-datepicker.css';

const page = bemlds('page');
const certificationPage = bemlds('page-certification');

const { certificationDateForModal, certificationTimeForModal } = DATE_FORMATS;

const { startDate, enterDate, enterWord } = SIMPLE_DICTIONARY;

const minDate = moment(new Date()).add(1, 'days').toDate();

const CertificationsModal = (props) => {
  const {
    isOpen,
    closePopUp,
    onSave,
    body,
    onChange,
    onEdit,
    onDelete,
  } = props;

  const [touched, setTouched] = useState({
    city: false,
    street: false,
    zip: false,
    startAt: false,
  });
  const [errors, setErrors] = useState({});
  const handleClosePopup = () => {
    closePopUp();
    setErrors({});
    setTouched({
      city: false,
      street: false,
      zip: false,
      startAt: false,
    });
  };

  const validateFields = (newValue) => {
    const currentBody = _.omit(body, 'id');
    const values = {
      ...currentBody,
      ...(newValue ? { [newValue.name]: newValue.value } : {}),
    };
    return validateForm({
      values,
      cbSuccess: () => setErrors({}),
      cbFail: (newErrors) => {
        setErrors(newErrors);
      },
      schema,
    });
  };

  const handleChange = ({ target: { name, value } }) => {
    validateFields({ name, value });
    onChange(name, value);
  };

  const setAllTouched = () => {
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
      ...acc,
      [item]: true,
    }), {});
    setTouched(allTouchedState);
  };

  const handleSave = () => {
    const bodyForSave = {
      ...body,
      startAt: moment(body.startAt).utc().format(),
    };

    const { id } = bodyForSave;

    setAllTouched();
    const isValid = validateFields();

    if (!isValid) {
      return;
    }

    if (id) {
      onEdit(bodyForSave);
    } else {
      onSave(bodyForSave);
    }
    handleClosePopup();
  };

  const title = body.id ? 'certifications.editCertification' : 'certifications.createCertification';
  const inputFields = Object.entries(_.omit(body, ['id', 'startAt'])).reduce((acc, item) => [...acc, {
    name: item[0],
    value: item[1],
    title: _.upperFirst(item[0]),
  }], []);

  const getErrorInput = name => touched[name] && errors[name];

  const handleFocus = (e) => {
    const { target: { name } } = e;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  return (
    <Modal
      visible={isOpen}
      onCancel={handleClosePopup}
      footer={null}
      centered
      className={certificationPage('modal')}
      style={{ minWidth: '751px' }}
    >
      <CertificationsWrapper>
        <div className={page('create-folder')}>
          <p className={page('create-folder-title')}>
            <IntlMessages id={title} />
          </p>
          <div className={page('create-folder-content')}>
            {inputFields.map(item => (
              <div key={item.name}>
                <p className={page('create-folder-input-title')}>{item.title}</p>
                <CustomTextInput
                  className={page('create-folder-input')}
                  type="text"
                  value={item.value}
                  name={item.name}
                  placeholder={`${enterWord} ${item.title}`}
                  onChange={handleChange}
                  error={getErrorInput(item.name)}
                  onFocus={handleFocus}
                />
              </div>
            ))}
            <p className={page('create-folder-input-title')}>{startDate}</p>
            <DatePicker
              selected={body.startAt}
              minDate={minDate}
              onChange={date => handleChange({ target: { name: 'startAt', value: date } })}
              placeholderText={enterDate}
              showTimeSelect
              timeFormat={certificationTimeForModal}
              wrapperClassName={page('date-picker')}
              onChangeRaw={e => e.preventDefault()}
              calendarClassName={page('calendar')}
              dateFormat={certificationDateForModal}
              customInput={(
                <CustomTextInput
                  className={page('create-folder-input')}
                  type="text"
                  error={getErrorInput('startAt')}
                  onFocus={handleFocus}
                />
              )}
            />
          </div>
          <div className={page('create-folder-footer')}>
            {body.id && (
              <button
                className={page('button', { error: true })}
                type="button"
                onClick={() => onDelete(body.id)}
              >
                <IntlMessages id="groupAdmin.deleteBtn" />
              </button>
            )}
            <button
              className={page('button')}
              type="button"
              onClick={handleSave}
            >
              <IntlMessages id="tutors.saveBtn" />
            </button>
          </div>
        </div>
      </CertificationsWrapper>
    </Modal>
  );
};

CertificationsModal.defaultProps = {
  isOpen: false,
  closePopUp: () => null,
  onSave: () => null,
  body: {},
  onChange: () => null,
  onEdit: () => null,
  onDelete: () => null,
};

CertificationsModal.propTypes = {
  closePopUp: PropTypes.func,
  isOpen: PropTypes.bool,
  onSave: PropTypes.func,
  body: PropTypes.shape({
    id: PropTypes.number,
    city: PropTypes.string,
    zip: PropTypes.number,
    startAt: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default CertificationsModal;
