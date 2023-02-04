import {
  Banner,
  BannerNotification,
  Checkbox,
  CreatedAtBlock,
  CustomInputRangeMaxValueSet,
  CustomTextInput,
  DateAdd,
  IntlMessages,
  LayoutContent,
  LoaderFullSize,
  TextFormat,
  UploadDragAndDropCrop,
  DefaultButton,
} from 'components';
import { PLACEHOLDER } from 'constants/constants';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cropStateImageActions from 'redux/cropImageState/actions';
import lmsGroupsActions from 'redux/lmsGroups/actions';
import URLS from 'redux/urls';
import { getAddedStatusFp, getCurrentLmsGroupFp, getLoadingLmsGroupFp } from 'selectors';
import { Loader } from 'semantic-ui-react';
import { bemlds, getErrorsFromValidationError } from 'utils';

import { ROLES, SIMPLE_DICTIONARY } from '../../../../constants/constants';
import Schema from '../schema';
import LmsGroupsAddWrapper from './LmsGroupsAdd.style';

const MAX_ITEM_SETTING = 1000000;

const { ADMIN_LMS } = ROLES;

const { lmsGroupCreated } = SIMPLE_DICTIONARY;

const {
  lmsGroupName,
  lmsGroupDescription,
  lmsGroupWelcomeMessageForAdmin,
  lmsGroupWelcomeMessageForStudents,
} = PLACEHOLDER;

const page = bemlds('page');
const group = bemlds('group');
const main = bemlds('main-title');
const welcome = bemlds('welcome-text');
const btn = bemlds('button');
const checkbox = bemlds('checkbox-group');
const urlCurrentGroup = id => `${URLS.lmsGroupsDeleteUrl}/${id}`;

class LmsGroupsAdd extends Component {
  constructor(props) {
    super(props);
    this.initTouched = {
      name: false,
      accessExpireAt: false,
      maxLmsGroupAdmins: false,
      maxOrganisations: false,
      maxOrganisationAdmins: false,
      maxCourses: false,
      maxStudents: false,
      orderEmails: false,
    };

    this.state = {
      imageSrc: null,
      errors: {},
      touched: { ...this.initTouched },
      translations: props.currentLmsGroup.translations,
    };

    this.textFormatInstances = {};

    const { match: { params: { groupId } } } = props;
    this.isEdit = Boolean(groupId);
  }

  componentDidUpdate() {
    if (this.props.currentLmsGroup.translations !== this.state.translations) {
      this.setState((state, props) => ({
        translations: props.currentLmsGroup.translations,
      }));
    }
  }

  componentDidMount() {
    const {
      setInitialProps,
      match: { params: { groupId } },
      getCurrentLmsGroup,
      setInitStateCropImage,
    } = this.props;

    if (this.isEdit) {
      getCurrentLmsGroup(groupId);
    } else {
      setInitStateCropImage();
      setInitialProps();
    }
  }

  componentWillUnmount() {
    const { setResult, setInitialProps } = this.props;
    setResult(false);
    setInitialProps();
  }

  setAllTouched = () => {
    const { touched } = this.state;
    const allTouchedState = Object.keys(touched).reduce((acc, item) => ({
      ...acc,
      [item]: true,
    }), {});
    this.setState({ touched: allTouchedState });
  }

  setTouched = (e) => {
    const { target: { name } } = e;
    this.setState(({ touched }) => ({ touched: { ...touched, [name]: true } }));
  }

  getErrorInput = (name) => {
    const { touched, errors } = this.state;

    return touched[name] && errors[name];
  }

  addNameLmsGroup = ({ target: { value } }) => {
    const { addInputLmsGroupName } = this.props;
    addInputLmsGroupName(value);
    this.validateForm({ value, name: 'name' });
  };

  handleChange = ({ target: { value, name } }) => {
    const { changeField } = this.props;
    changeField(name, value);
    this.validateForm({ value, name });
  }

  hardResetTextFormat = () => {
    // Never use this.state to store data. Do you hear? NEVER!!!

    this.textFormatInstances.description.hardReset();
    this.textFormatInstances.adminWelcomeText.hardReset();
    this.textFormatInstances.studentWelcomeText.hardReset();
  }

  handleSubmit = () => {
    const {
      addLmsGroup,
      currentLmsGroup,
      editLmsGroup,
      match: { params: { groupId } },
      setInitialPropsLmsGroup,
      user,
    } = this.props;

    const {
      name,
      accessExpireAt,
      maxLmsGroupAdminsSetting,
      maxOrganisationsSetting,
      maxOrganisationAdminsSetting,
      maxCoursesSetting,
      maxStudentsSetting,
      isActive,
      notifySms,
      hasAccessToMmc,
      file,
      isSendOrderEmail,
      orderEmails,
      logoImageUri,
    } = currentLmsGroup;

    const { translations } = this.state;


    this.setAllTouched();
    const isValid = this.validateForm();

    if (!isValid) {
      return;
    }

    const generateFormData = (formData, translations) => {
      translations.forEach((item, index) => {
        let isExist = false;
        if (item.description) {
          formData.append(`translations[${index}][description]`, item.description);
          isExist = true;
        }
        if (item.adminWelcomeText) {
          formData.append(`translations[${index}][adminWelcomeText]`, item.adminWelcomeText);
          isExist = true;
        }
        if (item.studentWelcomeText) {
          formData.append(`translations[${index}][studentWelcomeText]`, item.studentWelcomeText);
          isExist = true;
        }

        if (isExist) {
          formData.append(`translations[${index}][language]`, item.language);
        }
      });
    };

    const roles = _.get(user, 'roles', []);
    const isAdminLms = roles.includes(ADMIN_LMS);

    const formData = new FormData();
    formData.append('name', name);
    generateFormData(formData, translations);
    formData.append('notifySms', notifySms);

    if (logoImageUri) {
      formData.append('logoImageUri', logoImageUri);
    }

    if (file) {
      formData.append('file', file);
    }

    if (isSendOrderEmail && orderEmails) {
      const splitEmails = orderEmails.split(',');
      splitEmails.forEach((item, index) => {
        formData.append(`orderEmails[${index}]`, item);
      });
    }

    if (!isAdminLms) {
      formData.append('accessExpireAt', accessExpireAt);
      formData.append('maxLmsGroupAdmins', maxLmsGroupAdminsSetting);
      formData.append('maxOrganisations', maxOrganisationsSetting);
      formData.append('maxOrganisationAdmins', maxOrganisationAdminsSetting);
      formData.append('maxCourses', maxCoursesSetting);
      formData.append('maxStudents', maxStudentsSetting);
      formData.append('isActive', isActive);
      formData.append('hasAccessToMmc', hasAccessToMmc);
    }

    if (!this.isEdit) {
      formData.append('maxLmsGroupAdminsSetting', maxLmsGroupAdminsSetting);
      formData.append('maxOrganisationsSetting', maxOrganisationsSetting);
      formData.append('maxOrganisationAdminsSetting', maxOrganisationAdminsSetting);
      formData.append('maxCoursesSetting', maxCoursesSetting);
      formData.append('maxStudentsSetting', maxStudentsSetting);

      addLmsGroup(formData, () => {
        this.setState({
          touched: { ...this.initTouched },
          errors: {},
        });
        this.hardResetTextFormat();
        setInitialPropsLmsGroup();
      });

      return;
    }

    editLmsGroup(formData, groupId);
  };

  handleCropFile = (file) => {
    const { addCropFile } = this.props;
    addCropFile(file);
  };

  handleDrop = file => this.setState({ imageSrc: file });

  handleAddFile = file => this.setState({ imageSrc: file });

  handleAddMaxValue = (value, name) => {
    const mainValueName = name.replace('Setting', '');
    const {
      addInputMaxValues,
      currentLmsGroup: {
        [mainValueName]: mainValue,
      },
    } = this.props;
    const onlyNumbersValue = Number(value.replace(/[\D]/g, ''));
    const corValueTotal = Math.min(onlyNumbersValue, MAX_ITEM_SETTING);
    const corValueMain = Math.min(mainValue, corValueTotal);
    addInputMaxValues(corValueTotal || '', name);
    addInputMaxValues(Math.max(1, corValueMain), mainValueName);
    this.validateForm({ name, value: corValueTotal });
  };

  handleCheck = (value, name) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name);
  };

  handleCheckOrderEmail = (value, name) => {
    const { changeField } = this.props;
    const { errors } = this.state;
    changeField('orderEmails', '');
    this.setState({
      errors: {
        ...errors,
        orderEmails: '',
      },
    });
    this.handleCheck(value, name);
  }

  handleSaveDate = (value) => {
    const { addDate } = this.props;
    this.validateForm({ value, name: 'accessExpireAt' });
    addDate(value);
  };

  handleSaveDescription = (value, name, lang) => {
    const { translations } = this.state;

    const language = lang + 1;
    const index = translations.findIndex(item => item.language === language);
    this.setState(() => {
      const newTranslations = translations;
      newTranslations[index] = {
        ...newTranslations[index],
        [name]: value,
      };
      return {
        translations: newTranslations,
      };
    });
  };

  validateForm = (newValue) => {
    try {
      const { currentLmsGroup } = this.props;
      const valuesForValidation = {
        ...currentLmsGroup,
        ...(newValue ? { [newValue.name]: newValue.value } : {}),
      };

      Schema.validateSync(valuesForValidation, { abortEarly: false });

      this.setState({ errors: {} });
      return true;
    } catch (error) {
      const errors = getErrorsFromValidationError(error);
      this.setState({ errors });
      return false;
    }
  };

  handleChangeRangeInput = ({ target: { value, name } }) => {
    const { addInputMaxValues } = this.props;
    addInputMaxValues(value, name);
  }

  handleOnBlurInputRange = ({ target: { value, name } }) => {
    const { addInputMaxValues } = this.props;
    if (value < 1) {
      addInputMaxValues(1, name);
    }
  }

  handleFocusInputRange = ({ target }) => {
    setTimeout(() => {
      target.focus();
      target.selectionStart = target.value.length;
    });
  }

  getPropsInputRange = (name) => {
    const {
      currentLmsGroup: {
        [name]: main,
        [`${name}Setting`]: setting,
      },
    } = this.props;

    return {
      onChangeInput: this.handleAddMaxValue,
      onChangeRangeInput: this.handleChangeRangeInput,
      onBlurInput: this.handleOnBlurInputRange,
      onFocusInput: this.handleFocusInputRange,
      nameInput: `${name}Setting`,
      nameRangeInput: name,
      valueInput: setting,
      valueRangeInput: main,
      className: group('range-input'),
    };
  }

  render() {
    const {
      currentLmsGroup,
      match: { params: { groupId } },
      removeDownloadLink,
      setResult,
      isLoadingLmsGroup,
      user,
    } = this.props;

    const {
      name,
      accessExpireAt,
      isLoadingData,
      isSuccessResult,
      createdLmsGroup,
      isActive,
      notifySms,
      hasAccessToMmc,
      isSendOrderEmail,
      orderEmails,
    } = currentLmsGroup;

    const { translations } = this.state;

    const bannerText = this.isEdit ? 'lmsGroups.editBanner' : 'lmsGroups.addBanner';
    const notificationText = this.isEdit
      ? <IntlMessages id="lmsGroups.changesSaved" />
      : lmsGroupCreated(createdLmsGroup);

    const roles = _.get(user, 'roles', []);
    const disableFields = roles.includes(ADMIN_LMS);

    return (
      <LayoutContent>
        <LmsGroupsAddWrapper>
          <Banner
            title={<IntlMessages id={bannerText} />}
          />
          {isSuccessResult && (
            <BannerNotification
              error={false}
              title={notificationText}
              close={() => setResult(false)}
              isScrollMount
              isCloseOnTime
            />
          )}
          {isLoadingData ? (
            <LoaderFullSize isLoading={isLoadingData} />
          ) : (
            <section className={page()}>
              <section className={page('left')}>
                <div className={group()}>
                  <CustomTextInput
                    placeholder={lmsGroupName}
                    value={name}
                    name="name"
                    onChange={this.addNameLmsGroup}
                    className={group('name-input')}
                    idLabel="lmsGroups.groupName"
                    onFocus={this.setTouched}
                    error={this.getErrorInput('name')}
                  />
                  <div className={group('optional')}>
                    <IntlMessages id="lmsGroups.groupOptional" />
                  </div>
                  <TextFormat
                    saveDescription={this.handleSaveDescription}
                    translations={translations}
                    placeholder={lmsGroupDescription}
                    name="description"
                    link={this.textFormatInstances}
                  />
                </div>
                <DateAdd
                  handleSaveDate={this.handleSaveDate}
                  error={this.getErrorInput('accessExpireAt')}
                  date={accessExpireAt}
                  disabled={disableFields}
                  isAutoSetDateByCountDays
                />
                <CustomInputRangeMaxValueSet
                  disabled={disableFields}
                  title={<IntlMessages id="lmsGroups.maxAdmins" />}
                  {...this.getPropsInputRange('maxLmsGroupAdmins')}
                />
                <CustomInputRangeMaxValueSet
                  disabled={disableFields}
                  title={<IntlMessages id="lmsGroups.maxOrg" />}
                  {...this.getPropsInputRange('maxOrganisations')}
                />
                <CustomInputRangeMaxValueSet
                  disabled={disableFields}
                  title={<IntlMessages id="lmsGroups.maxOrgAdmins" />}
                  {...this.getPropsInputRange('maxOrganisationAdmins')}
                />
                <CustomInputRangeMaxValueSet
                  disabled={disableFields}
                  title={<IntlMessages id="lmsGroup.maxCourses" />}
                  {...this.getPropsInputRange('maxCourses')}
                />
                <CustomInputRangeMaxValueSet
                  disabled={disableFields}
                  title={<IntlMessages id="lmsGroups.maxStudents" />}
                  {...this.getPropsInputRange('maxStudents')}
                />
                <section className={checkbox()}>
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="isActive"
                    title={<IntlMessages id="lmsGroups.checkActive" />}
                    value={isActive}
                    disabled={disableFields}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="notifySms"
                    title={<IntlMessages id="lmsGroups.checkSms" />}
                    value={notifySms}
                    disabled={disableFields}
                  />
                  <Checkbox
                    handleCheck={this.handleCheck}
                    name="hasAccessToMmc"
                    title={<IntlMessages id="lmsGroups.checkAccessCourse" />}
                    value={hasAccessToMmc}
                    disabled={disableFields}
                  />
                  <Checkbox
                    handleCheck={this.handleCheckOrderEmail}
                    name="isSendOrderEmail"
                    title={<IntlMessages id="lmsGroups.isSendOrderEmail" />}
                    value={isSendOrderEmail}
                  />
                  {isSendOrderEmail && (
                  <CustomTextInput
                    placeholder="Emails for send order"
                    value={orderEmails}
                    name="orderEmails"
                    onChange={this.handleChange}
                    className={group('name-input')}
                    idLabel="lmsGroups.orderEmailsInputTitle"
                    onFocus={this.setTouched}
                    error={this.getErrorInput('orderEmails')}
                  />
                  )}
                </section>
              </section>
              <section className={page('right')}>
                {this.isEdit && (
                  <CreatedAtBlock
                    data={currentLmsGroup}
                  />
                )}
                <section className={main()}>
                  <div className={main('welcome')}>
                    <IntlMessages id="lmsGroups.welcomeTitle" />
                  </div>
                  <div className={main('logotype')}>
                    <IntlMessages id="lmsGroups.logotypeTitleOptional" />
                  </div>
                </section>
                <div className={page('drag-and-drop')}>
                  <div className={page('drag-and-drop-description')}>
                    <IntlMessages id="lmsGroups.descriptionLogo" />
                  </div>
                  <UploadDragAndDropCrop
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                    handleCropFile={this.handleCropFile}
                    imageUrl={currentLmsGroup.logoImageUri}
                    removeDownloadLink={removeDownloadLink}
                    isUpload="false"
                  />
                </div>
                <div className={welcome('admin')}>
                  <IntlMessages id="lmsGroups.welcomeForAdminsOptional" />
                </div>
                <TextFormat
                  saveDescription={this.handleSaveDescription}
                  translations={translations}
                  name="adminWelcomeText"
                  placeholder={lmsGroupWelcomeMessageForAdmin}
                  link={this.textFormatInstances}
                />
                <div className={welcome('student')}>
                  <IntlMessages id="lmsGroups.welcomeForStudentsOptional" />
                </div>
                <TextFormat
                  saveDescription={this.handleSaveDescription}
                  translations={translations}
                  name="studentWelcomeText"
                  placeholder={lmsGroupWelcomeMessageForStudents}
                  link={this.textFormatInstances}
                  ref={el => this.testRef = el}
                />
                <section className={btn()}>
                  <Loader active={isLoadingLmsGroup} inline className={btn('loader')} />
                  {this.isEdit && !disableFields && (
                  <Link className="link" to={urlCurrentGroup(groupId)}>
                    <DefaultButton
                      textId="lmsGroups.deleteBtn"
                      disabled={isLoadingLmsGroup}
                      isDelete
                    />
                  </Link>
                  )}
                  <DefaultButton
                    textId={this.isEdit ? 'lmsGroups.saveBtn' : 'lmsGroups.addBtn'}
                    onClick={this.handleSubmit}
                    disabled={isLoadingLmsGroup}
                  />
                </section>
              </section>
            </section>
          )}
        </LmsGroupsAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentLmsGroup = getCurrentLmsGroupFp(state);
  const isAddedLmsGroup = getAddedStatusFp(state);
  const isLoadingLmsGroup = getLoadingLmsGroupFp(state);
  const { user } = state.Auth;

  return {
    currentLmsGroup,
    isAddedLmsGroup,
    isLoadingLmsGroup,
    user,
  };
};

export default connect(mapStateToProps, {
  ...lmsGroupsActions,
  ...cropStateImageActions,
})(LmsGroupsAdd);
