import React from 'react';
import { bemlds } from 'utils';
import { IntlMessages, Checkbox } from 'components';
import { PLACEHOLDER } from 'constants/constants';
import FindAdministratorsWrapper from './FindAdministrators.style';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
} = PLACEHOLDER;

const admin = bemlds('admin-search');

const SearchPersonForm = ({
  firstName,
  lastName,
  email,
  phone,
  isDeactivated,
  onChange,
  checkboxLabel,
  onSearch,
  findButtonTextId,
}) => (
  <FindAdministratorsWrapper>
    <div className={admin()}>
      <div className={admin('firstname')}>
        <div className={admin('firstname-title')}>
          <IntlMessages id="search.firstName" />
        </div>
        <input
          className={admin('firstname-input')}
          type="text"
          value={firstName}
          name="firstName"
          placeholder={firstNameTitle}
          onChange={onChange}
        />
      </div>
      <div className={admin('lastname')}>
        <div className={admin('lastname-title')}>
          <IntlMessages id="search.lastName" />
        </div>
        <input
          className={admin('lastname-input')}
          type="text"
          value={lastName}
          name="lastName"
          placeholder={lastNameTitle}
          onChange={onChange}
        />
      </div>
      <div className={admin('email')}>
        <div className={admin('email-title')}>
          <IntlMessages id="groupAdmin.findEMail" />
        </div>
        <input
          className={admin('email-input')}
          type="text"
          value={email}
          name="email"
          placeholder={emailTitle}
          onChange={onChange}
        />
      </div>
      <div className={admin('telephone')}>
        <div className={admin('telephone-title')}>
          <IntlMessages id="groupAdmin.findTelephone" />
        </div>
        <input
          className={admin('telephone-input')}
          type="text"
          value={phone}
          name="phone"
          placeholder={telephoneTitle}
          onChange={onChange}
        />
      </div>
    </div>
    {checkboxLabel && (
      <Checkbox
        handleCheck={(value, name) => onChange({ target: { value, name } })}
        value={isDeactivated}
        name="isDeactivated"
        title={checkboxLabel}
      />
    )}
    <div className={admin('button')}>
      <button
        className={admin('button-search')}
        onClick={onSearch}
      >
        <IntlMessages id={findButtonTextId} />
      </button>
    </div>
  </FindAdministratorsWrapper>
);

export default SearchPersonForm;
