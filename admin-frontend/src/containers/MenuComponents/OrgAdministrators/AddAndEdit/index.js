import React, { Component } from 'react';
import { connect } from 'react-redux';
import orgAdminsActions from 'redux/orgAdministrators/actions';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { ROLES } from 'constants/constants';
import { bemlds, validateForm } from 'utils';
import cropStateImageActions from 'redux/cropImageState/actions';
import searchOrgActions from 'redux/searchOrganisations/actions';
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
import organisationsActions from 'redux/searchOrganisations/actions';
import schema from './schema';
import OrgAdministratorAddWrapper from './OrgAdministratorsAdd.style';

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

const urlToDelete = id => `${URLS.orgAdminDelete}/${id}`;
const urlAddRemoveOrg = id => `${URLS.orgAdminEdit}/${id}/organisations`;

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

  addFirstName = ({ target: { value, name } }) => {
    const { addInputFirstName } = this.props;
    this.validateForm({ value, name });
    addInputFirstName(value);
  };

  addLastName = ({ target: { value, name } }) => {
    const { addInputLastName } = this.props;
    this.validateForm({ value, name });
    addInputLastName(value);
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

  handleAddInput = (name, value1, value2) => {
    const { addInputEmail, addInputPhone } = this.props;
    const resultValue2 = value2 || '';
    switch (name) {
      case 'email':
        addInputEmail(value1, resultValue2);
        break;
      case 'phone':
        addInputPhone(value1, resultValue2);
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
      currentOrgAdmin,
      addOrgAdmin,
      error,
      selectedOrganisations,
      editOrgAdmin,
      match: { params: { administratorId } },
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
      avatar,
    } = currentOrgAdmin;

    const isValid = this.validateForm();
    this.setAllTouched();

    if (!isValid) {
      return;
    }

    const generateFormData = (formData, organisations) => {
      organisations.forEach((item, index) => {
        formData.append(`organisations[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', firstEmail);
    generateFormData(formData, selectedOrganisations);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);

    if (file) {
      formData.append('file', file);
    }

    if (secondEmail) {
      formData.append('email[1]', secondEmail);
    }

    if (firstTelephone) {
      formData.append('phone[0]', firstTelephone);
    }

    if (secondTelephone) {
      formData.append('phone[1]', secondTelephone);
    }

    const resultError = error => ((error === 'Limit reached' || (error && error.includes('email already exist')))
      ? (this.setState({ limitReached: true })) : '');

    if (error && error.length) { resultError(error); }

    if (this.isEdit) {
      formData.append('avatar', avatar);
      editOrgAdmin(formData, administratorId);

      return;
    }

    addOrgAdmin(formData);
  };

  validateForm = (newValue) => {
    const { currentOrgAdmin } = this.props;
    const valueForValidate = {
      ...currentOrgAdmin,
      ...(newValue ? { [newValue.name]: newValue.value } : {}),
    };
    return validateForm({
      values: valueForValidate,
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
    const { changeOrgAdminsState } = this.props;
    this.validateForm(target);

    changeOrgAdminsState(target);
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

  componentDidUpdate() {
    const {user,selectedOrganisations, setOrganisationsFromOrgAdmin } = this.props
    const isXpectrumAdmin = (user.roles || []).includes(ROLES.XPECTUM_ADMIN)
    if(!isXpectrumAdmin && selectedOrganisations.length === 0 && user.organisations){
      setOrganisationsFromOrgAdmin(user.organisations)
    }
  }

  render() {
    const { limitReached } = this.state;
    const {
      currentOrgAdmin,
      error,
      currentNameLmsGroupOrg,
      selectedOrganisations,
      isLoadingAddAdmin,
      isSuccessOrgAdmin,
      clearSuccessResultOrgAdmins,
      clearErrorOrgAdmins,
      removeDownloadLink,
      isLoadingEditAdmin,
      match: { params: { administratorId } },
      history,
      setInitStateOrg,
      generateNewPassword,
      closeResetPasswordOrgAdmin,
      isResetPasswordOrgAdmin,
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
      organisations,
    } = currentOrgAdmin;

    const descriptionForm = this.isEdit
    ? (
      <div className={form('title')}>
        <IntlMessages id="orgAdmins.editTitleOrganisations" />
        {organisations.map(({ name: org }) => org).join(', ')}
      </div>
    )
    : (
      <div className={form('title')}>
        <IntlMessages id="orgAdmins.titleOrganisations" />
        {currentNameLmsGroupOrg}
        {selectedOrganisations.map(({ text, name }) => text || name).join(', ')}
      </div>
    );

    const formTitleId = this.isEdit ? 'orgAdmins.editBanner' : 'orgAdmins.addBanner';
    const successBannerId = this.isEdit ? 'orgAdmins.changesSaved' : 'orgAdmins.addBannerNotifications';
    return (
      <LayoutContent>
        <OrgAdministratorAddWrapper>
          <Banner title={<IntlMessages id={formTitleId} />} />
          {isResetPasswordOrgAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="courseCreators.resetPasswordSuccessBanner" />}
              close={closeResetPasswordOrgAdmin}
              isScrollMount
            />
          )}
          {isSuccessOrgAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id={successBannerId} />}
              close={clearSuccessResultOrgAdmins}
              isScrollMount
            />
          )}
          {error && (
            <BannerNotification
              error
              title={error}
              close={clearErrorOrgAdmins}
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
                  isSingleInputChange
                  handleChange={this.handleChangeStateForm}
                  onFocus={this.handleFocus}
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                  isSingleInputChange
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
                      <IntlMessages id="orgAdmins.orgAddRemoveTitle" />
                    </div>
                    <div className={form('organisations-text')}>
                      <IntlMessages id="orgAdmins.orgAddRemoveText" />
                      {organisations.map(item => item.name).join(', ')}
                    </div>
                    <div
                      className={form('button')}
                      onClick={() => {
                        setInitStateOrg();
                        history.push(urlAddRemoveOrg(administratorId), { cache: true });
                      }}
                    >
                      <DefaultButton
                        textId="orgAdmins.addRemoveBtn"
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
                  currentLmsGroup={currentOrgAdmin}
                />
                <div className={profile('title')}>
                  <IntlMessages id="groupAdmin.profileTitle" />
                </div>
                <div className={page('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    removeDownloadLink={removeDownloadLink}
                    imageUrl={currentOrgAdmin.avatar}
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
                    : 'orgAdmins.addBtn'}
                  disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                  onClick={this.handleSubmit}
                />
              </section>
            </section>
          </section>
        </OrgAdministratorAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = state => ({
  ...state.orgAdmins,
  ...state.searchOrganisations,
  ...state.searchLmsGroup,
  ...state.cropImageState,
  ...state.user
});

export default connect(mapStateToProps, {
  ...orgAdminsActions,
  ...cropStateImageActions,
  ...searchOrgActions,
  ...organisationsActions
})(OrgAdministratorAdd);
