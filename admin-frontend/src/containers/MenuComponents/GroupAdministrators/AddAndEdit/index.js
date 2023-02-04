import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds, validateForm } from 'utils';
import cropStateImageActions from 'redux/cropImageState/actions';
import searchGroupActions from 'redux/searchGroup/actions';
import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  UploadDragAndDropCrop,
  BannerNotification,
  CustomTextInput,
  CreatedAtAdminBlock,
  DefaultButton,
} from 'components';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import GroupAdministratorAddWrapper from './GroupAdminsAdd.style';
import schema from './schema';
import { MAIN_ROUTE } from '../../../../constants/routes';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
} = PLACEHOLDER;

const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');
const btn = bemlds('button');

const urlToDelete = id => `${MAIN_ROUTE.groupAdminDeleteShort}${id}`;


class OrgAdministratorAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      limitReached: false,
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

    const {
      match: { path },
    } = props;

    this.isEdit = path.includes('edit');
  }

  componentDidMount() {
    const {
      setInitStateCropImage,
      setInitialPropsFull,
      match: { params: { administratorId } },
      getCurrentAdminById,
    } = this.props;

    setInitStateCropImage();
    setInitialPropsFull();

    if (this.isEdit) {
      getCurrentAdminById(administratorId);
    }
  }

  urlAddRemoveGroup = (id) => {
    const {
      currentGroupAdmin,
      setSelectedGroups,
    } = this.props;

    const {
      groups,
    } = currentGroupAdmin;

    setSelectedGroups(groups);

    return `${URLS.groupAdminsEditUrl}/${id}/group`;
  };

  addFirstName = ({ target: { value, name } }) => {
    const { changeGroupAdminsState } = this.props;
    this.validateForm({ value, name });
    changeGroupAdminsState({ value, name });
  };

  addLastName = ({ target: { value, name } }) => {
    const { changeGroupAdminsState } = this.props;
    this.validateForm({ value, name });
    changeGroupAdminsState({ value, name });
  };

  handleCropFile = (file) => {
    const { addCropFile } = this.props;
    addCropFile(file);
  };

  handleDrop = files => this.setState({ imageSrc: files });

  handleAddFile = files => this.setState({ imageSrc: files });

  handleCheck = (value, name) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name);
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

  handleAddInput = (name, firstValue, secondValue) => {
    const { addInputEmail, addInputPhone } = this.props;
    const resultValue2 = secondValue || '';
    switch (name) {
      case 'email':
        addInputEmail(firstValue, resultValue2);
        break;
      case 'phone':
        addInputPhone(firstValue, resultValue2);
        break;

      default:
        return null;
    }
  };

  handleLangSave = (value) => {
    const { addInputLang } = this.props;
    addInputLang(this.returnNumberOfLang(value));
  };

  handleSubmit = () => {
    const {
      currentGroupAdmin,
      error,
      editGroupAdmin,
      match: { params: { administratorId } },
      addGroupAdmin,
      selectedGroups,
    } = this.props;

    const {
      firstName,
      lastName,
      language,
      notifyEmail,
      notifySms,
      file,
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
    } = currentGroupAdmin;

    const isValid = this.validateForm();
    this.setAllTouched();

    if (!isValid) {
      return;
    }

    const generateFormData = (formData, organisations, type) => {
      organisations.forEach((item, index) => {
        formData.append(`${type}[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', firstEmail);
    formData.append('phone[0]', firstTelephone);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);

    generateFormData(formData, selectedGroups, 'groups');

    if (file) {
      formData.append('file', file);
    }

    if (secondEmail) {
      formData.append('email[1]', secondEmail);
    }

    if (secondTelephone) {
      formData.append('phone[1]', secondTelephone);
    }

    const resultError = error => ((error === 'Limit reached' || (error && error.includes('email already exist')))
      ? (this.setState({ limitReached: true })) : '');

    if (error && error.length) { resultError(error); }

    if (this.isEdit) {
      editGroupAdmin(formData, administratorId);

      return;
    }

    addGroupAdmin(formData);
  };

  validateForm = (newValue) => {
    const { currentGroupAdmin } = this.props;

    return validateForm({
      values: {
        ...currentGroupAdmin,
        ...(newValue ? { [newValue.name]: newValue.value } : {}),
      },
      cbSuccess: () => this.setState({ errors: {} }),
      cbFail: errors => this.setState({ errors }),
      schema,
    });
  }

  getErrorInput = (name) => {
    const { touched, errors } = this.state;

    return touched[name] && errors[name];
  }

  handleChangeStateForm = ({ target }) => {
    const { changeGroupAdminsState } = this.props;
    this.validateForm(target);

    changeGroupAdminsState(target);
  }

  handleFocus = (e) => {
    const { target: { name } } = e;
    this.setState(({ touched }) => ({ touched: { ...touched, [name]: true } }));
  }

  setAllTouched = () => {
    const { touched } = this.state;
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
      ...acc,
      [item]: true,
    }), {});
    this.setState({ touched: allTouchedState });
  }

  render() {
    const { limitReached } = this.state;
    const {
      currentGroupAdmin,
      error,
      isLoadingAddAdmin,
      clearErrorGroupAdmins,
      removeDownloadLink,
      isLoadingEditAdmin,
      match: { params: { administratorId } },
      history,
      setInitStateWithoutSelectedGroups,
      selectedGroups,
      isSuccessGroupAdmin,
      clearSuccessResultGroupAdmins,
      generateNewPassword,
      closeResetPasswordGroupAdmin,
      isResetPasswordGroupAdmin,
    } = this.props;

    const {
      firstEmail,
      secondEmail,
      firstTelephone,
      secondTelephone,
      firstName,
      lastName,
      notifyEmail,
      notifySms,
      groups,
    } = currentGroupAdmin;

    const descriptionForm = this.isEdit
      ? (
        <div className={form('title')}>
          <IntlMessages id="groupAdmin.editTitleGroups" />
          {groups.map(({ name: groupName }) => groupName).join(', ')}
        </div>
      )
      : (
        <div className={form('title')}>
          <IntlMessages id="groupAdmin.addTitle" />
          {`${selectedGroups.map(({ id, text }) => text).join(', ')}`}
        </div>
      );

    const formTitleId = this.isEdit ? 'groupAdmins.editBanner' : 'groupAdmins.addBanner';
    const successBannerId = this.isEdit ? 'groupsAdmins.changesSaved' : 'groupAdmins.addBannerNotifications';

    return (
      <LayoutContent>
        <GroupAdministratorAddWrapper>
          <Banner title={<IntlMessages id={formTitleId} />} />
          {isSuccessGroupAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id={successBannerId} />}
              close={clearSuccessResultGroupAdmins}
              isScrollMount
            />
          )}
          {isResetPasswordGroupAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="courseCreators.resetPasswordSuccessBanner" />}
              close={closeResetPasswordGroupAdmin}
              isScrollMount
            />
          )}
          {error && (
            <BannerNotification
              error
              title={error}
              close={clearErrorGroupAdmins}
              isScrollMount
            />
          )}
          <section className={page({ transparent: limitReached })}>
            <section className={page('left')}>
              <section className={form()}>
                {descriptionForm}
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
                    onChange={this.addFirstName}
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
                    onChange={this.addLastName}
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
                  addInput={this.handleAddInput}
                  handleChange={this.handleChangeStateForm}
                  onFocus={this.handleFocus}
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                  handleChange={this.handleChangeStateForm}
                  valueFirstInput={firstTelephone}
                  nameFirstInput="firstTelephone"
                  errorFirstInput={this.getErrorInput('firstTelephone')}
                  valueSecondInput={secondTelephone}
                  nameSecondInput="secondTelephone"
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
                {this.isEdit && (
                  <div className={form('organisations')}>
                    <div className={form('organisations-title')}>
                      <IntlMessages id="groupAdmins.orgAddRemoveTitle" />
                    </div>
                    <div className={form('organisations-text')}>
                      <IntlMessages id="groupAdmins.addRemoveText" />
                      {groups.map(item => item.name).join(', ')}
                    </div>
                    <div
                      className={form('button')}
                    >
                      <DefaultButton
                        textId="groupAdmins.addRemoveBtn"
                        onClick={() => {
                          setInitStateWithoutSelectedGroups();
                          history.push(this.urlAddRemoveGroup(administratorId), { cache: true });
                        }}
                      />
                    </div>
                  </div>
                )}
                {this.isEdit && (
                  <div className={form('button-pass')}>
                    <DefaultButton
                      onClick={() => generateNewPassword(administratorId)}
                      textId="students.generateButton"
                    />
                  </div>
                )}
              </section>
            </section>
            <section className={page('right')}>
              <div className={profile()}>
                <CreatedAtAdminBlock
                  currentLmsGroup={currentGroupAdmin}
                />
                <div className={profile('title')}>
                  <IntlMessages id="groupAdmin.profileTitle" />
                </div>
                <div className={page('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    removeDownloadLink={removeDownloadLink}
                    imageUrl={currentGroupAdmin.avatar}
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    isUpload="false"
                  />
                </div>
              </div>
              <section className={btn()}>
                <Loader
                  active={isLoadingAddAdmin || isLoadingEditAdmin}
                  inline
                  className={btn('loader')}
                />
                {this.isEdit && (
                <Link className="link" to={urlToDelete(administratorId)}>
                  <DefaultButton
                    textId="orgAdmins.deleteBtn"
                    disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                    isDelete
                  />
                </Link>
                )}
                <DefaultButton
                  textId={this.isEdit
                    ? 'lmsGroups.saveBtn'
                    : 'groupAdmins.addBtn'}
                  onClick={this.handleSubmit}
                  disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                />
              </section>
            </section>
          </section>
        </GroupAdministratorAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = state => ({
  ...state.groupAdministrators,
  ...state.searchOrganisations,
  ...state.searchLmsGroup,
  ...state.searchGroup,
  ...state.cropImageState,
});

export default connect(mapStateToProps, {
  ...groupAdminsActions,
  ...cropStateImageActions,
  ...searchGroupActions,
})(OrgAdministratorAdd);
