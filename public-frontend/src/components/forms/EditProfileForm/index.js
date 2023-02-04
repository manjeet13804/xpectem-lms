// @flow
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';

import { bemlds } from 'utils';
import { TERM_SHARED, EDIT_PROFILE } from 'localise';
import { CustomSelect, CustomCheckbox, CloseIcon } from 'components';
import { actionPutCurrentProfile } from 'redux/actions';
import { getUserProfile } from 'redux/selectors';
import { LANGUAGES } from 'constants/constants';
import validationSchema from './validationSchema';
import './styles.scss';

const { save } = TERM_SHARED;
const {
  name,
  nameInfo,
  emails,
  addEmail,
  phone,
  addPhone,
  address,
  postCode,
  city,
  identifierId,
  identifierIdInfo,
  languageText,
  notifications,
  notificationsInfo,
  email,
  sms,
} = EDIT_PROFILE;

const b = bemlds('edit-profile-form');

const DefaultProps = {
  className: '',
};

type PropType = {
  className?: string,
  putProfileData: () => void,
  profileData: object
};

class EditProfileForm extends Component<PropsType> {
  constructor(props: PropType) {
    super(props);

    const defaultLanguage = LANGUAGES[0];
    const {
      profileData: { userEmail, userPhone },
    } = props;

    this.state = {
      language: defaultLanguage,
      showPhoneInput: userPhone.length || 1,
      showEmailInput: userEmail.length || 1,
    };
  }

  componentDidMount() {
    const { profileData } = this.props;
    const { language: defaultLanguage } = this.state;
    const language = LANGUAGES.find(
      (item: object): boolean => item.value === profileData.language,
    ) || defaultLanguage;

    this.setState({ language });
  }

  addPhone = (phone1: string, phone2: string) => {
    const { showPhoneInput } = this.state;

    if ((showPhoneInput === 1 && phone1) || (showPhoneInput === 2 && phone2)) {
      this.setState({ showPhoneInput: showPhoneInput + 1 });
    }
  };

  deletePhone = (valueName: string, handleChange: any) => {
    this.setState(({ showPhoneInput }) => ({showPhoneInput: showPhoneInput - 1}));
    handleChange({ target: { name: valueName, value: ''}});
  }

  addEmail = (email2: string) => {
    const { showEmailInput } = this.state;

    if (showEmailInput === 1 || (showEmailInput === 2 && email2)) {
      this.setState({ showEmailInput: showEmailInput + 1 });
    }
  };

  deleteEmail = (valueName: string, handleChange: any) => {
    this.setState(({ showEmailInput }) => ({showEmailInput: showEmailInput - 1}));
    handleChange({ target: { name: valueName, value: ''}});
  }

  selectLanguage = (value: object) => {
    this.setState({ language: value });
  };

  buildArray = (values: []): [] => values.filter((item: string): boolean => item);

  onSubmit = (values: object) => {
    const { putProfileData } = this.props;
    const {
      language: { id: languageID },
    } = this.state;

    const {
      email1,
      email2,
      email3,
      phone1,
      phone2,
      phone3,
      notifyEmail,
      notifySms,
      identifierId: identifierIdValue,
    } = values;

    const userEmail = this.buildArray([email1, email2, email3]);
    const userPhone = this.buildArray([phone1, phone2, phone3]);

    const data = {
      email: userEmail,
      phone: userPhone,
      notifyEmail,
      notifySms,
      language: languageID,
    };

    const profileData = identifierIdValue ? { ...data, personNumber: identifierIdValue } : data;

    putProfileData(profileData);
  };

  render(): Node {
    const { showPhoneInput, showEmailInput, language: selectedLanguage } = this.state;
    const { className, profileData } = this.props;

    if (!profileData) {
      return null;
    }

    const {
      firstName,
      lastName,
      postalCode,
      postalAddress,
      streetAddress,
      personNumber: identifierIdValue,
      notifyEmail,
      notifySms,
      userEmail,
      userPhone,
    } = profileData;

    const [email1, email2, email3] = userEmail;
    const [phone1, phone2, phone3] = userPhone;

    const emailsArray = new Array(showEmailInput).fill(1);
    const phonesArray = new Array(showPhoneInput).fill(1);

    return (
      <Formik
        initialValues={{
          email1: email1 && email1.email ? email1.email : '',
          email2: email2 && email2.email ? email2.email : '',
          email3: email3 && email3.email ? email3.email : '',
          phone1: phone1 && phone1.phone ? phone1.phone : '',
          phone2: phone2 && phone2.phone ? phone2.phone : '',
          phone3: phone3 && phone3.phone ? phone3.phone : '',
          streetAddress: streetAddress || '',
          postalCode: postalCode || '',
          postalAddress: postalAddress || '',
          identifierId: identifierIdValue || '',
          notifyEmail,
          notifySms,
        }}
        onSubmit={this.onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
        }: object): Node => (
          <Form
            className={b({ mix: className })}
            onSubmit={handleSubmit}
          >
            <span className={b('name-label')}>{name}</span>
            <span className={b('name-info')}>{nameInfo}</span>
            <span className={b('name-field-value')}>{`${firstName} ${lastName}`}</span>
            <div className={b('input-wrap')}>
              <span className={b('label')}>{emails}</span>
              {emailsArray.map((item, i): Node => {
                const numberOfEmail = i + 1;
                return (
                  <div className={b('input-wrapper')} key={numberOfEmail}>
                    <input
                      className={b('input', { 'is-error': errors[`email${numberOfEmail}`] })}
                      type="email"
                      onChange={handleChange}
                      placeholder={email}
                      name={`email${numberOfEmail}`}
                      value={values[`email${numberOfEmail}`]}
                    />
                    {errors[`email${numberOfEmail}`] ? (<p className={b('error')}>{errors[`email${numberOfEmail}`]}</p>) : null}
                    {numberOfEmail !== 1 && (
                    <button className={b('close-btn')} type="button" onClick={(): void => this.deleteEmail(`email${numberOfEmail}`, handleChange)}>
                      <CloseIcon />
                    </button>
                    )}
                  </div>
                );
              })}
            </div>
            {showEmailInput < 3 && (
              <button className={b('add-btn')} type="button" onClick={(): void => this.addEmail(values.email2)}>
                {addEmail}
              </button>
            )}
            <div className={b('input-wrap')}>
              <span className={b('label')}>{phone}</span>
              {phonesArray.map((item, i): Node => {
                const numberOfPhone = i + 1;
                return (
                  <div className={b('input-wrapper')} key={numberOfPhone}>
                    <input
                      className={b('input', { 'is-error': errors[`phone${numberOfPhone}`] })}
                      type="tel"
                      onChange={handleChange}
                      placeholder="Phone"
                      name={`phone${numberOfPhone}`}
                      value={values[`phone${numberOfPhone}`]}
                    />
                    {errors[`phone${numberOfPhone}`] ? (<p className={b('error')}>{errors[`phone${numberOfPhone}`]}</p>) : null}
                    {numberOfPhone !== 1 && (
                    <button className={b('close-btn')} type="button" onClick={(): void => this.deletePhone(`phone${numberOfPhone}`, handleChange)}>
                      <CloseIcon />
                    </button>
                    )}
                  </div>
                );
              })}
            </div>
            {showPhoneInput < 3 && (
              <button className={b('add-btn')} type="button" onClick={(): void => this.addPhone(values.phone1, values.phone2)}>
                {addPhone}
              </button>
            )}
            {streetAddress && (
              <div className={b('input-wrap')}>
                <span className={b('label')}>{address}</span>
                <input
                  className={b('input')}
                  type="text"
                  onChange={handleChange}
                  placeholder={address}
                  name="streetAddress"
                  value={values.streetAddress}
                />
              </div>
            )}
            <div className={b('wrap-strung')}>
              {postalCode && (
                <div className={b('input-wrap')}>
                  <span className={b('label')}>{postCode}</span>
                  <input
                    className={b('input')}
                    type="text"
                    onChange={handleChange}
                    name="postalCode"
                    value={values.postalCode}
                  />
                </div>
              )}
              {postalAddress && (
                <div className={b('input-wrap')}>
                  <span className={b('label')}>{city}</span>
                  <input
                    className={b('input')}
                    type="text"
                    onChange={handleChange}
                    placeholder={city}
                    name="postalAddress"
                    value={values.postalAddress}
                  />
                </div>
              )}
            </div>
            <span className={b('label', { 'with-info': true })}>{identifierId}</span>
            <span className={b('info')}>{identifierIdInfo}</span>
            <input
              className={b('input')}
              type="text"
              onChange={handleChange}
              name="identifierId"
              placeholder="Identifier ID"
              value={values.identifierId}
            />
            <hr className={b('separator')} />
            <span className={b('label')}>{languageText}</span>
            <CustomSelect
              className={b('language-select')}
              options={LANGUAGES}
              value={selectedLanguage}
              onChange={this.selectLanguage}
            />
            <span className={b('label')}>{notifications}</span>
            <span className={b('info', { 'with-info': true })}>{notificationsInfo}</span>
            <CustomCheckbox
              className={b('checkbox')}
              text={sms}
              handleChange={handleChange}
              id="notifySms"
              checked={values.notifySms}
            />
            <CustomCheckbox
              text={email}
              checked={values.notifyEmail}
              handleChange={handleChange}
              id="notifyEmail"
            />
            <button
              className={b('save-btn btn btn-save')}
              type="submit"
            >
              {save}
            </button>
          </Form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  profileData: getUserProfile(state),
});

const mapDispatchToProps = {
  putProfileData: actionPutCurrentProfile,
};

EditProfileForm.defaultProps = DefaultProps;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditProfileForm),
);
