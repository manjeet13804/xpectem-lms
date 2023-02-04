import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import URLS from 'redux/urls';
import lmsGroupAdminsActions from 'redux/lmsGroupAdmins/actions';
import {
  getCurrentAdminFp,
  getSearchDataLmsGroupFp,
  getCurrentLmsGroupIdFp,
  getSearchAdminsDataLmsGroupFp,
  getCurrentAdminIdFp,
  getEditStatusFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import { bemlds } from 'utils';
import {
  Banner,
  AddInput,
  SelectAnyTime,
  Checkbox,
  UploadDragAndDropCrop,
  BannerNotification,
  CreatedAtAdminBlock,
} from 'components';
import AdministratorEditWrapper from './AdministratorsEdit.style';

const {
  firstNameTitle,
  lastNameTitle,
  emailTitle,
  telephoneTitle,
} = PLACEHOLDER;
const { getEditId } = REGEXP;

const page = bemlds('page');
const form = bemlds('form');
const profile = bemlds('profile-image');

const urlCurrentAdmin = id => `${URLS.lmsGroupAdminDeleteUrl}/${id}`;

class AdministratorsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
  }

  addFirstName = ({ target: { value } }) => {
    const { addInputFirstName } = this.props;
    addInputFirstName(value);
  };

  addLastName = ({ target: { value } }) => {
    const { addInputLastName } = this.props;
    addInputLastName(value);
  };

  handleCropFile = file => {
    const { addCropFile } = this.props;
    addCropFile(file);
  };

  handleCheck = (value, name) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name);
  };

  handleAddInput = (name, value1, value2) => {
    const { addInputEmail, addInputPhone } = this.props;
    const resultValue2 = value2 ? value2 : '';
    switch(name) {
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

  handleDrop = (files) => {
    this.setState({ imageSrc: files });
  };

  handleAddFile = (files) => {
    this.setState({ imageSrc: files });
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
    const { addInputLang } = this.props;
    addInputLang(this.returnNumberOfLang(value));
  };

  handleEditAdmin = () => {
    const {
      currentAdmin,
      editAdmin,
    } = this.props;

    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      notifyEmail,
      notifySms,
      language,
      file,
    } = currentAdmin;

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email[0]', email[0]);
    email[1] && formData.append('email[1]', email[1]);
    formData.append('phone[0]', phone[0]);
    phone[1] && formData.append('phone[1]', phone[1]);
    formData.append('language', language.id || language);
    formData.append('notifyEmail', notifyEmail);
    formData.append('notifySms', notifySms);
    file && formData.append('file', file);

    editAdmin(formData, id);
  };

  componentWillMount() {
    const { getCurrentAdminById, adminId } = this.props;
    getCurrentAdminById(adminId);
  }

  render() {

    const {
      currentAdmin,
      adminId,
      isEditAdmin,
    } = this.props;

    const {
      firstName,
      lastName,
      email,
      phone,
      notifyEmail,
      notifySms,
      avatar,
      language,
    } = currentAdmin;

    return (
      <LayoutContent>
        <AdministratorEditWrapper>
          <Banner title={<IntlMessages id="groupAdmin.editBanner" />} />
          {isEditAdmin && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="groupAdmin.editSaveTitle" />}
            />
          )}
          <section className={page()}>
            <section className={page('left')}>
              <section className={form()}>
                <div className={form('title')}>
                  {<IntlMessages id="groupAdmin.editTitle" />}
                </div>
                <div className={form('firstname')}>
                  <div className={form('firstname-title')}>
                    {<IntlMessages id="groupAdmin.firstName" />}
                  </div>
                  <input
                    className={form('firstname-input')}
                    type="text"
                    value={firstName}
                    name="firstName"
                    placeholder={firstNameTitle}
                    onChange={this.addFirstName}
                  />
                </div>
                <div className={form('lastname')}>
                  <div className={form('lastname-title')}>
                    {<IntlMessages id="groupAdmin.lastName" />}
                  </div>
                  <input
                    className={form('lastname-input')}
                    type="text"
                    value={lastName}
                    name="lastName"
                    placeholder={lastNameTitle}
                    onChange={this.addLastName}
                  />
                </div>
                <AddInput
                  title={<IntlMessages id="groupAdmin.eMail" />}
                  addTitle={<IntlMessages id="groupAdmin.eMailAdd" />}
                  placeholder={emailTitle}
                  addInput={this.handleAddInput}
                  email={email}
                  name="email"
                />
                <AddInput
                  title={<IntlMessages id="groupAdmin.telephone" />}
                  addTitle={<IntlMessages id="groupAdmin.telephoneAdd" />}
                  placeholder={telephoneTitle}
                  addInput={this.handleAddInput}
                  phone={phone}
                  name="phone"
                />
                <div className={form('select-title')}>
                  {<IntlMessages id="groupAdmin.lang" />}
                </div>
                <SelectAnyTime
                  language={language}
                  status={false}
                  className={form('select')}
                  handleDataSave={this.handleLangSave}
                />
                <div className={form('notification')}>
                  {<IntlMessages id="groupAdmin.userNotification" />}
                </div>
                <div className={form('checkbox-group')}>
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifyEmail"
                    checkStatus={notifyEmail}
                    title={<IntlMessages id="groupAdmin.checkEmail" />}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifySms"
                    checkStatus={notifySms}
                    title={<IntlMessages id="groupAdmin.checkSms" />}
                  />
                </div>
              </section>
            </section>
            <section className={page('right')}>
              <div className={profile()}>
                <CreatedAtAdminBlock
                  currentLmsGroup={currentAdmin}
                />
                <div className={page('drag-and-drop')}>
                  <UploadDragAndDropCrop
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    isUpload="false"
                    imageUrl={avatar}
                  />
                </div>
                <div className={profile('button')}>
                  <Link className={profile('link')} to={urlCurrentAdmin(adminId)}>
                    <button className={profile('button-delete')}>
                      {<IntlMessages id="groupAdmin.deleteBtn" />}
                    </button>
                  </Link>
                  <button
                    className={profile('button-save')}
                    onClick={this.handleEditAdmin}
                  >
                    {<IntlMessages id="groupAdmin.saveBtn" />}
                  </button>
                </div>
              </div>
            </section>
          </section>
        </AdministratorEditWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentAdmin = getCurrentAdminFp(state);
  const searchData = getSearchDataLmsGroupFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdFp(state);
  const searchAdminsData = getSearchAdminsDataLmsGroupFp(state);
  const currentAdminId = getCurrentAdminIdFp(state);
  const isEditAdmin = getEditStatusFp(state);

  const { pathname } = location;
  const res = pathname && pathname.match(getEditId);
  const adminId = currentAdminId || res[1];

  return {
    searchData,
    currentAdmin,
    currentLmsGroupId,
    searchAdminsData,
    adminId,
    isEditAdmin,
  };
};

export default connect(mapStateToProps, { ...lmsGroupAdminsActions })(AdministratorsEdit);
