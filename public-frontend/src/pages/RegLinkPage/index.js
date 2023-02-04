// @flow
import React, { useEffect, useState } from 'react';
import block from 'utils/bem';
import './Reglink.scss';
import {
  Select,
  InputField,
  Checkbox,
  CustomLoader,
} from 'components';
import {
  REGISTRATION_LINK_DICTIOANARY,
  ERRORS,
} from 'localise';
import { STUDENTS_DATA_PARAMS_ID_ENUM } from 'constants/enums';
import {
  postRegistrationStudent,
  getRegistrationData,
  getLmsGroupLogo,
  changeStudentName,
  changeContactData,
  changeNotifyData,
  changeTaxonomyData,
  addContactData,
  deleteContactData,
} from 'redux/actions';
import { connect } from 'react-redux';
import {
  getRegLinkData,
  getTaxonomiesData,
  getLmsLogoData,
  getStudentData,
  getStudentDataLoading,
  getRegisterStudentLoading,
  getRegLinkError,
} from 'redux/selectors';
import { notification } from 'antd';
import { LANGUAGES } from '../../constants/constants';
import MultipleInput from './components/MultipleInput';
import { emailRegExp } from '../../constants/regExp';

const bem = block('reg-link');

const {
  selectLanguageTitle,
  header,
  firstDescription,
  secondDescription,
  userInformation,
  mandatoryInputs,
  firstName,
  lastName,
  email,
  telephone,
  firstNamePlaceholder,
  lastNamePlaceholder,
  emailPlaceholder,
  telephonePlaceholder,
  registerButton,
  courses,
  addNewEmail,
  addNewTelephone,
  notifyHeader,
  notifyDescription,
  notifyEmail,
  notifySms,
  registerSuccessful,
  emailValidError,
} = REGISTRATION_LINK_DICTIOANARY;


type PropType = {
  postRegistration: () => void,
  fetchRegistrationData: () => void,
  getLogo: () => void,
  changeName: () => void,
  changeContact: () => void,
  changeNotify: () => void,
  changeTaxonomy: () => void,
  addContactInput: () => void,
  deleteContactInput: () => void,
  logo: string,
  regLinkData: object,
  taxonomies: object,
  studentData: object,
  match: object,
  getRegLinkDataLoading: boolean,
  registerStudentDataLoading: boolean,
  error: string
};

const RegLink = (props: PropType): React.FC => {
  const {
    postRegistration,
    fetchRegistrationData,
    changeName,
    changeContact,
    changeNotify,
    changeTaxonomy,
    addContactInput,
    deleteContactInput,
    getLogo,
    regLinkData,
    taxonomies,
    logo,
    studentData,
    match: {
      params: {
        uid,
      },
    },
    getRegLinkDataLoading,
    registerStudentDataLoading,
  } = props;

  const [errorMessage, setErrorMessage] = useState<string>();
  const languages = [LANGUAGES[0]];
  const [defaultLang] = languages;
  const groupId = regLinkData && regLinkData.groups && regLinkData.groups[0].id;

  useEffect(() => {
    if (groupId) {
      getLogo(groupId);
    }
  }, [groupId]);

  const openNotification = (error) => {
    if (error) {
      notification.error({
        message: error,
      });
      return;
    }
    notification.success({
      message: registerSuccessful,
    });
  };

  useEffect(() => {
    fetchRegistrationData(uid);
  }, [uid]);

  const handleChangeData = ({target: { id, value }}: React.SyntheticEvent) => {
    changeName(id, value);
  };

  const handleChangeContactData = ({target: { id, value }}: React.SyntheticEvent, index: number) => {
    if (id === STUDENTS_DATA_PARAMS_ID_ENUM.emails && !emailRegExp.test(value)) {
      setErrorMessage(emailValidError);
      changeContact(id, value, index);
      return;
    }
    setErrorMessage('');
    changeContact(id, value, index);
  };

  const handleChangeNotify = (id: string) => {
    changeNotify(id);
  };

  const handleChangeTaxonomy = ({target: { id, value }}: React.SyntheticEvent) => {
    changeTaxonomy(id, value);
  };

  const checkIsRegisterDisabled = () => {
    if (!studentData.firstName
      || !studentData.lastName
      || !studentData.emails.length
      || registerStudentDataLoading) {
      return true;
    }

    return studentData.emails.some((item) => !emailRegExp.test(item));
  };

  if (getRegLinkDataLoading) {
    return (
      <div className={bem('loader')}>
        <CustomLoader />
      </div>
    );
  }

  if (regLinkData && regLinkData.active) {
    return (
      <div className={bem()}>
        <div className={bem('content')}>
          <div className={bem('content-logo')}>
            {logo && (
            <div>
              <object
                data={logo.logoImageUrl}
                type="image/jpg"
                alt="logo"
                className={bem('content-logo-img')}
              >
                <img style={{ display: 'none' }} alt="default logo" />
                <div />
              </object>
            </div>
            )}
          </div>
          <div className={bem('content-language')}>
            <div>{selectLanguageTitle}</div>
            <Select
              options={languages}
              selectedOption={defaultLang}
              styles={bem('language-select')}
            />
          </div>
          <div className={bem('content-description')}>
            <div className={bem('content-description-header')}>
              {header}
            </div>
            <div className={bem('content-description-text')}>
              {firstDescription}
              <br />
              {secondDescription}
            </div>
          </div>
          <div className={bem('content-groups')}>
            {regLinkData.groups.map((item: object): React.FC => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
          <div className={bem('content-courses-header')}>
            {courses}
          </div>
          <div className={bem('content-courses')}>
            {regLinkData.courses.map((item: object): React.FC => (
              <div className={bem('content-courses-item')} key={item.id}>{` - ${item.title}`}</div>
            ))}
          </div>
          <div className={bem('content-inputs')}>
            <div className={bem('content-inputs-header')}>{userInformation}</div>
            <div className={bem('content-inputs-mandatory')}>
              {mandatoryInputs}
            </div>
            <div>
              <InputField
                type="text"
                id="firstName"
                inputClassName={bem('input')}
                className={block('input-wrapper')}
                title={firstName}
                placeholder={firstNamePlaceholder}
                onChange={handleChangeData}
                value={studentData.firstName}
                required
              />
            </div>
            <div>
              <InputField
                type="input"
                id="lastName"
                inputClassName={bem('input')}
                className={block('input-wrapper')}
                title={lastName}
                placeholder={lastNamePlaceholder}
                onChange={handleChangeData}
                value={studentData.lastName}
                required
              />
            </div>
            <MultipleInput
              items={studentData.emails}
              title={email}
              id="emails"
              placeholder={emailPlaceholder}
              handleChange={handleChangeContactData}
              handleDelete={deleteContactInput}
              handleAdd={addContactInput}
              addTitle={addNewEmail}
              errorMessage={errorMessage}
              required
            />
            <MultipleInput
              items={studentData.phones}
              title={telephone}
              id="phones"
              placeholder={telephonePlaceholder}
              handleChange={handleChangeContactData}
              handleDelete={deleteContactInput}
              handleAdd={addContactInput}
              addTitle={addNewTelephone}
            />
            <div className={bem('content-notify')}>
              <div className={bem('content-notify-header')}>
                {notifyHeader}
              </div>
              <div className={bem('content-notify-description')}>
                {notifyDescription}
              </div>
              <div className={bem('content-checkBox')}>
                <Checkbox
                  id="notifyEmail"
                  handleChange={handleChangeNotify}
                  checked={studentData.notifyEmail}
                  bem={bem}
                  text={notifyEmail}
                />
              </div>
              <div className={bem('content-checkBox')}>
                <Checkbox
                  id="notifySms"
                  handleChange={handleChangeNotify}
                  checked={studentData.notifySms}
                  bem={bem}
                  text={notifySms}
                />
              </div>
            </div>
            {taxonomies && taxonomies.map((item: object): React.FC => {
              const {
                format,
                id,
                mandatory,
                title,
              } = item;
              return (
                <div key={id}>
                  <InputField
                    id={id}
                    type="input"
                    inputClassName={bem('input')}
                    placeholder={format}
                    title={title}
                    required={mandatory}
                    onChange={handleChangeTaxonomy}
                  />
                </div>
              );
            })}
          </div>
          <div className={bem('content-footer')}>
            <div>
              <button
                onClick={(): void => postRegistration(studentData, uid, openNotification)}
                className={bem('content-footer-button', {disabled: checkIsRegisterDisabled()})}
                type="button"
                disabled={checkIsRegisterDisabled()}
              >
                {registerButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={bem('not-found')}>
      {ERRORS.pageNotFound}
    </div>
  );
};

const mapStateToProps = (state: object): object => ({
  regLinkData: getRegLinkData(state),
  taxonomies: getTaxonomiesData(state),
  logo: getLmsLogoData(state),
  studentData: getStudentData(state),
  getRegLinkDataLoading: getStudentDataLoading(state),
  registerStudentDataLoading: getRegisterStudentLoading(state),
  error: getRegLinkError(state),
});

const mapDispatchToProps = {
  postRegistration: postRegistrationStudent,
  fetchRegistrationData: getRegistrationData,
  getLogo: getLmsGroupLogo,
  changeName: changeStudentName,
  changeContact: changeContactData,
  changeNotify: changeNotifyData,
  changeTaxonomy: changeTaxonomyData,
  addContactInput: addContactData,
  deleteContactInput: deleteContactData,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegLink);
