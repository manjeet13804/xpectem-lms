import React, { Component } from 'react';
import { connect } from 'react-redux';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import LayoutContent from 'components/utility/layoutContent';
import cropStateImageActions from 'redux/cropImageState/actions';
import IntlMessages from 'components/utility/intlMessages';
import Modal from 'components/feedback/modal';
import URLS from 'redux/urls';
import {
  getCurrentAdminFp,
  getAddedStatusFp,
  getCurrentLmsGroupIdFp,
  getErrorInAddAdminLmsGroupFp,
} from 'selectors';
import { Link } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { PLACEHOLDER } from 'constants/constants';
import { bemlds, validateForm } from 'utils';
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
import AdministratorAddWrapper from './CourseCreatorWrapper.style';
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
const btn = bemlds('button');
const b = bemlds('existing-students-modal');

const urlToDelete = (id) => `${URLS.lmsGroupAdminDeleteUrl}/${id}`;

class AdministratorsAdd extends Component {
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
      showModalExistEmail: false,
    };

    const {
      match: { path },
    } = props;

    this.isEdit = path.includes('edit');
  }

  componentDidMount() {
    const {
      setInitStateCropImage,
      setInitialPropsFullLmsAdmins,
      match: {
        params: { administratorId },
      },
      getCurrentAdminById,
    } = this.props;

    setInitStateCropImage();
    setInitialPropsFullLmsAdmins();

    if (this.isEdit) {
      getCurrentAdminById(administratorId);
    }
  }

  validateForm = (newValue) => {
    const { currentAdmin } = this.props;
    const values = {
      ...currentAdmin,
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
  };

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

  handleDrop = (files) => this.setState({ imageSrc: files });

  handleAddFile = (files) => this.setState({ imageSrc: files });

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
      currentAdmin,
      idLmsGroup,
      addAdministrator,
      editAdmin,
      match: {
        params: { administratorId },
      },
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
      error,
      avatar,
      isActive,
    } = currentAdmin;

    const isValid = this.validateForm();
    this.setAllTouched();

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', firstEmail);
    formData.append('language', language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    formData.append('isDeactivated', !isActive);
    if (!this.isEdit) {
      formData.append('lmsGroup', idLmsGroup);
    }

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

    const resultErrorLmsAdmin = (error) =>
      error === 'Limit reached' || (error && error.includes('email already exist'))
        ? this.setState({ limitReached: true })
        : '';

    if (error && error.length) {
      resultErrorLmsAdmin(error);
    }

    if (avatar && this.isEdit) {
      formData.append('avatar', avatar);
    }

    if (this.isEdit) {
      editAdmin(formData, administratorId);
      return;
    }
    addAdministrator(formData);
  };

  getErrorInput = (name) => {
    const { touched, errors } = this.state;

    return touched[name] && errors[name];
  };

  handleChangeStateForm = ({ target }) => {
    const { changeLmsAdminsState } = this.props;
    this.validateForm(target);

    changeLmsAdminsState(target);
  };

  handleFocus = (e) => {
    const {
      target: { name },
    } = e;
    this.setState(({ touched }) => ({ touched: { ...touched, [name]: true } }));
  };

  setAllTouched = () => {
    const { touched } = this.state;
    const allTouchedState = Object.keys(touched).reduce(
      (acc, item) => ({
        ...acc,
        [item]: true,
      }),
      {}
    );
    this.setState({ touched: allTouchedState });
  };

  setShowModalExistEmail = (value) => {
    const { clearErrorLmsAdmins } = this.props
    clearErrorLmsAdmins()
    this.setState({ showModalExistEmail: value });
  };

  addExistingAdmin = () => {
    const {
      currentAdmin,
      idLmsGroup,
      addAdministratorExist,
    } = this.props;
    const { firstEmail, secondEmail } = currentAdmin;

    const formData = new FormData();
    formData.append('email[0]', firstEmail);
    formData.append('idLmsGroup', idLmsGroup)

    if (secondEmail) {
      formData.append('email[1]', secondEmail);
    }

    addAdministratorExist(formData)
    this.setShowModalExistEmail(false)
  };

  render() {
    const {
      currentAdmin,
      error,
      clearSuccessResultLmsAdmin,
      isSuccessLmsGroupsAdmin,
      clearErrorLmsAdmins,
      removeDownloadLinkLmsAdmin,
      isLoadingAddAdmin,
      isLoadingEditAdmin,
      generateNewPassword,
      isResetPasswordLMSAdmin,
      closeResetPasswordLmsGroupAdmin,
      match: {
        params: { administratorId },
      },
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
      isActive,
    } = currentAdmin;

    const { limitReached, showModalExistEmail } = this.state;

    const formTitleId = this.isEdit ? 'groupAdmin.editBanner' : 'groupAdmin.addBanner';
    const successBannerId = this.isEdit ? 'organisations.changesSaved' : 'lmsGroups.admin.added';
    const isEmailExist = (error || '').includes('email already exist');
    if (isEmailExist && !showModalExistEmail) {
      this.setShowModalExistEmail(true);
    }

    return (
      <LayoutContent>
        <AdministratorAddWrapper>
          <Banner title={<IntlMessages id={formTitleId} />} />
          {isResetPasswordLMSAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id='courseCreators.resetPasswordSuccessBanner' />}
              close={closeResetPasswordLmsGroupAdmin}
              isScrollMount
            />
          )}
          {isSuccessLmsGroupsAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id={successBannerId} />}
              close={clearSuccessResultLmsAdmin}
              isScrollMount
            />
          )}
          {( error && 
            !isEmailExist ) && 
            <BannerNotification 
            error 
            title={error} 
            close={clearErrorLmsAdmins} 
            isScrollMount 
            />}
          <Modal visible={showModalExistEmail} 
          onCancel={() => this.setShowModalExistEmail(false)} footer={null}>
            <div>
              <p className={b('emails-title')}>
                <IntlMessages
                  id='Administrator with this emails already exist:'
                />
              </p>
              <div className={b('emails-list')}>{firstEmail}</div>
              <p className={b('emails-title')}>
                <IntlMessages
                  id='Do you want to add a lms Group?'
                />
              </p>
              <div className={b('footer')}>
                <DefaultButton textId='students.certModalYes' onClick={this.addExistingAdmin} />
                <DefaultButton
                  textId='students.certModalNo'
                  onClick={() => this.setShowModalExistEmail(false)}
                  isDelete
                />
              </div>
            </div>
          </Modal>
          <section className={page({ transparent: limitReached })}>
            <section className={page('left')}>
              <section className={form()}>
                <div className={form('title')}>
                  <IntlMessages id={formTitleId} />
                </div>
                <div className={form('firstname')}>
                  <div className={form('firstname-title')}>
                    <IntlMessages id='groupAdmin.firstName' />
                  </div>
                  <CustomTextInput
                    className={form('firstname-input')}
                    type='text'
                    value={firstName}
                    name='firstName'
                    placeholder={firstNameTitle}
                    onChange={this.addFirstName}
                    error={this.getErrorInput('firstName')}
                    onFocus={this.handleFocus}
                  />
                </div>
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    <IntlMessages id='groupAdmin.lastName' />
                  </div>
                  <CustomTextInput
                    className={form('lastname-input')}
                    type='text'
                    value={lastName}
                    name='lastName'
                    placeholder={lastNameTitle}
                    onChange={this.addLastName}
                    error={this.getErrorInput('lastName')}
                    onFocus={this.handleFocus}
                  />
                </div>
                <AddInput
                  title={<IntlMessages id='groupAdmin.eMail' />}
                  addTitle={<IntlMessages id='groupAdmin.eMailAdd' />}
                  placeholder={emailTitle}
                  valueFirstInput={firstEmail}
                  errorFirstInput={this.getErrorInput('firstEmail')}
                  nameFirstInput='firstEmail'
                  valueSecondInput={secondEmail}
                  nameSecondInput='secondEmail'
                  errorSecondInput={this.getErrorInput('secondEmail')}
                  addInput={this.handleAddInput}
                  isSingleInputChange
                  handleChange={this.handleChangeStateForm}
                  onFocus={this.handleFocus}
                />
                <AddInput
                  title={<IntlMessages id='groupAdmin.telephone' />}
                  addTitle={<IntlMessages id='groupAdmin.telephoneAdd' />}
                  placeholder={telephoneTitle}
                  handleChange={this.handleChangeStateForm}
                  valueFirstInput={firstTelephone}
                  nameFirstInput='firstTelephone'
                  errorFirstInput={this.getErrorInput('firstTelephone')}
                  valueSecondInput={secondTelephone}
                  nameSecondInput='secondTelephone'
                  isSingleInputChange
                  onFocus={this.handleFocus}
                  errorSecondInput={this.getErrorInput('secondTelephone')}
                />
                <div className={form('select-title')}>
                  <IntlMessages id='groupAdmin.lang' />
                </div>
                <SelectAnyTime
                  status={false}
                  className={form('select')}
                  handleDataSave={this.handleLangSave}
                />
                <div className={form('notification')}>
                  <IntlMessages id='groupAdmin.userNotification' />
                </div>
                <div className={form('checkbox-group')}>
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name='notifyEmail'
                    value={notifyEmail}
                    title={<IntlMessages id='groupAdmin.checkEmail' />}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name='notifySms'
                    value={notifySms}
                    title={<IntlMessages id='groupAdmin.checkSms' />}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name='isActive'
                    value={isActive}
                    title={<IntlMessages id='groupAdmin.isActive' />}
                  />
                  {this.isEdit && (
                    <div className={form('button')}>
                      <DefaultButton
                        onClick={() => generateNewPassword(administratorId)}
                        textId='students.generateButton'
                      />
                    </div>
                  )}
                </div>
              </section>
            </section>
            <section className={page('right')}>
              <div className={profile()}>
                <CreatedAtAdminBlock currentLmsGroup={currentAdmin} />
                <div className={profile('title')}>
                  <IntlMessages id='groupAdmin.profileTitle' />
                </div>
                <div className={page('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    removeDownloadLink={removeDownloadLinkLmsAdmin}
                    imageUrl={currentAdmin.avatar}
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    isUpload='false'
                  />
                </div>
              </div>
              <section className={btn()}>
                <Loader active={isLoadingAddAdmin || isLoadingEditAdmin} inline className={btn('loader')} />
                {this.isEdit && (
                  <Link className='link' to={urlToDelete(administratorId)}>
                    <DefaultButton
                      textId='orgAdmins.deleteBtn'
                      disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                      isDelete
                    />
                  </Link>
                )}
                <DefaultButton
                  textId={this.isEdit ? 'groupAdmin.saveBtn' : 'groupAdmin.addButton'}
                  disabled={isLoadingAddAdmin || isLoadingEditAdmin}
                  onClick={this.handleSubmit}
                />
              </section>
            </section>
          </section>
        </AdministratorAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentAdmin = getCurrentAdminFp(state);
  const isAddedAdmin = getAddedStatusFp(state);
  const currentId = getCurrentLmsGroupIdFp(state);
  const error = getErrorInAddAdminLmsGroupFp(state);
  const idLmsGroup = currentId;

  return {
    idLmsGroup,
    isAddedAdmin,
    currentAdmin,
    error,
    ...state.lmsGroupAdmins,
  };
};

export default connect(mapStateToProps, {
  ...lmsGroupAdminsActions,
  ...cropStateImageActions,
})(AdministratorsAdd);
