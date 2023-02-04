import React, { Component } from 'react';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds, validateForm } from 'utils';
import { connect } from 'react-redux';
import cropStateImageActions from 'redux/cropImageState/actions';
import userActions from 'redux/user/actions';
import authActions from 'redux/auth/actions';
import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  UploadDragAndDropCrop,
  BannerNotification,
  CustomTextInput
} from 'components';
import ProfileEditWrapper from './ProfileEdit.style';
import schema from '../../OrgAdministrators/AddAndEdit/schema';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
} = PLACEHOLDER;

const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      eMail: '',
      telephone: '',
      clickSave: false,
      errors: {},
      touched: {
        firstName: false,
        lastName: false,
        firstTelephone: false,
        secondTelephone: false,
        firstEmail: false,
        secondEmail: false,
      },
    };
  }

  componentWillUnmount() {
    const { getFullInfoUser } = this.props;
    getFullInfoUser();
  }

  setAllTouched = () => {
    const { touched } = this.state;
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
        ...acc,
        [item]: true,
      }), {});
    this.setState({ touched: allTouchedState });
  }

  validateForm = (newValue) => {
    const { user } = this.props;
    const values = {
      ...user,
      ...(newValue ? { [newValue.name]: newValue.value } : {}),
    };
    return validateForm({
      values,
      cbSuccess: () => this.setState({ errors: {} }),
      cbFail: (errors) => {
        this.setState({ errors });
      },
      schema,
    });
  }

  getErrorInput = (name) => {
    const { touched, errors } = this.state;

    return touched[name] && errors[name];
  }

  handleFocus = (e) => {
    const { target: { name } } = e;
    this.setState(({ touched }) => ({ touched: { ...touched, [name]: true } }));
  }

  handleChange = (e) => {
    const { changeUserInfo } = this.props;
    const { value, name } = e.target;
    this.validateForm({ value, name });
    changeUserInfo(name, value);
  };

  handleCheck = (value, name) => {
    const { changeUserInfo } = this.props;
    changeUserInfo(name, value);
  };

  clickSaveHandle = (value) => {
    this.setState({ clickSave: value });
  };

  handleCropFile = (file) => {
    const { changeUserInfo } = this.props;
    changeUserInfo('file', file);
  };

  returnNumberOfLang = (lang) => {
    switch (lang) {
      case 'English':
        return 1;
      case 'Svenska':
        return 2;
      case 'Norsk':
        return 3;

      default:
        return null;
    }
  };

  handleLangSave = (value) => {
    const { changeUserInfo } = this.props;
    changeUserInfo('language', this.returnNumberOfLang(value));
  };

  handleDrop = files => this.setState({ file: files });

  handleAddFile = files => this.setState({ file: files });

  handleSubmit = () => {
    const {
      user,
      editProfile,
    } = this.props;

    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
      avatar,
      file,
    } = user;

    const isValid = this.validateForm();
    this.setAllTouched();

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('emails[0]', firstEmail);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    formData.append('avatar', avatar);

    if (file) {
      formData.append('file', file);
    }

    if (secondEmail) {
      formData.append('emails[1]', secondEmail);
    }

    if (firstTelephone) {
      formData.append('phones[0]', firstTelephone);
    }

    if (secondTelephone) {
      formData.append('phones[1]', secondTelephone);
    }

    editProfile(formData);
  };

  render() {
    const {
      isSuccesUpdate,
      error,
      clearNotification,
      user,
      removeDownloadLinkLmsAdmin,
    } = this.props;

    const {
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
      avatar,
    } = user;

    const profileImage = avatar !== 'null' ? avatar : null;

    return (
      <LayoutContent>
        <ProfileEditWrapper>
          <Banner title={<IntlMessages id="groupAdmin.profileEditBanner" />} />
          {isSuccesUpdate && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="groupAdmin.profileUpdated" />}
              close={clearNotification}
              isScrollMount
            />
          )}
          {error && (
            <BannerNotification
              error
              title={error}
              close={clearNotification}
              isScrollMount
            />
          )}
          <section className={page()}>
            <section className={page('left')}>
              <section className={form()}>
                <div className={form('firstname')}>
                  <div className={form('firstname-title')}>
                    <IntlMessages id="groupAdmin.firstName" />
                  </div>
                  <CustomTextInput
                    className={form('firstname-input')}
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder={firstNameTitle}
                    onChange={this.handleChange}
                    error={this.getErrorInput('firstName')}
                    onFocus={this.handleFocus}
                  />
                </div>
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    <IntlMessages id="groupAdmin.lastName" />
                  </div>
                  <CustomTextInput
                    className={form('lastname-input')}
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder={lastNameTitle}
                    onChange={this.handleChange}
                    error={this.getErrorInput('lastName')}
                    onFocus={this.handleFocus}
                  />
                </div>
                <AddInput
                  title={<IntlMessages id="groupAdmin.eMail" />}
                  addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                  placeholder={emailTitle}
                  valueFirstInput={firstEmail}
                  errorFirstInput={this.getErrorInput('firstEmail')}
                  nameFirstInput="firstEmail"
                  valueSecondInput={secondEmail}
                  nameSecondInput="secondEmail"
                  errorSecondInput={this.getErrorInput('secondEmail')}
                  isSingleInputChange
                  handleChange={this.handleChange}
                  onFocus={this.handleFocus}
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                  handleChange={this.handleChange}
                  valueFirstInput={firstTelephone}
                  nameFirstInput="firstTelephone"
                  errorFirstInput={this.getErrorInput('firstTelephone')}
                  valueSecondInput={secondTelephone}
                  nameSecondInput="secondTelephone"
                  isSingleInputChange
                  onFocus={this.handleFocus}
                  errorSecondInput={this.getErrorInput('secondTelephone')}
                />
                <div className={form('select-title')}>
                  <IntlMessages id="groupAdmin.lang" />
                </div>
                <SelectAnyTime
                  status={false}
                  className={form('select')}
                  handleDataSave={this.handleLangSave}
                />
                <div className={form('notification')}>
                  <IntlMessages id="groupAdmin.userNotification" />
                </div>
                <div className={form('checkbox-group')}>
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifyEmail"
                    value={notifyEmail}
                    title={<IntlMessages id="groupAdmin.checkEmail" />}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifySms"
                    value={notifySms}
                    title={<IntlMessages id="groupAdmin.checkSms" />}
                  />
                </div>
              </section>
            </section>
            <section className={page('right')}>
              <div className={profile()}>
                <div className={profile('title')}>
                  <IntlMessages id="groupAdmin.profileTitle" />
                </div>
                <div className={page('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    removeDownloadLink={removeDownloadLinkLmsAdmin}
                    imageUrl={profileImage}
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    isUpload="false"
                  />
                </div>
              </div>
              <section className={profile('button')}>
                {/* {this.isEdit && (
                  <Link className="link" to={urlToDelete(administratorId)}>
                    <button
                      className={btn('delete')}
                      type="button"
                      disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                    >
                      <IntlMessages id="orgAdmins.deleteBtn" />
                    </button>
                  </Link>
                )} */}
                <button
                  onClick={this.handleSubmit}
                  className={profile('button-save')}
                  type="button"
                >
                  <IntlMessages id="groupAdmin.saveBtn" />
                </button>
              </section>
            </section>
          </section>
        </ProfileEditWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = state => ({
  ...state.user,
});

export default connect(mapStateToProps, {
  ...userActions,
  ...cropStateImageActions,
  ...authActions,
})(ProfileEdit);
