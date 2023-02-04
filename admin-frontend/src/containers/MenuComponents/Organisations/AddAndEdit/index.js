import React, { Component } from 'react';
import { connect } from 'react-redux';
import orgActions from 'redux/organisations/actions';
import {
  getSearchLmsGroupDataFp,
  getCurrentOrgFp,
  getCurrentLmsGroupIdFp,
  getCurrentLmsGroupOrgFp,
  getAddedStatusOrgFp,
  getErrorInAddOrgFp,
  getCurrentOrgIdFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { PLACEHOLDER } from 'constants/constants';
import { REGEXP } from 'constants/regexp';
import {
  bemlds,
  getErrorsFromValidationError,
  generateFormDataWithTranslations,
} from 'utils';
import {
  Banner,
  BannerNotification,
  Checkbox,
  UploadDragAndDropCrop,
  TextFormat,
  CustomTextInput,
  LoaderFullSize,
  CreatedAtBlock,
} from 'components';
import cropStateImageActions from 'redux/cropImageState/actions';
import { Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import Schema from '../schema';
import OrganisationsAddWrapper from './OrganisationsAdd.style';

const { organisationsName } = PLACEHOLDER;
const { getAddId, getEditId } = REGEXP;

const page = bemlds('page');
const group = bemlds('group');
const main = bemlds('main-title');
const welcome = bemlds('welcome-text');
const btn = bemlds('button');

const urlToDeleteOrg = id => `${URLS.orgDeleteUrl}/${id}`;

class OrganisationsAddAndEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
      limitReached: false,
      touched: {
        name: false,
      },
      errors: {},
      translations: props.currentOrg.translations,
    };

    const { location } = props;
    this.isEdit = Boolean(location.pathname.match(getEditId));
  }

  textFormatInstances = {};

  componentDidMount() {
    const {
      setInitStateOrganisations,
      setInitStateCropImage,
      getCurrentOrg,
      idCurrentOrg,
      getCurrentLmsGroupById,
      idCurrentLmsGroup,
      setInitialProps,
    } = this.props;
    setInitStateOrganisations();
    setInitStateCropImage();

    if (this.isEdit) {
      getCurrentOrg(idCurrentOrg);
    } else {
      setInitStateOrganisations();
      getCurrentLmsGroupById(idCurrentLmsGroup);
      setInitialProps();
    }
  }

  componentDidUpdate() {
    if (this.props.currentOrg.translations !== this.state.translations) {
      this.setState((state, props) => ({
        translations: props.currentOrg.translations,
      }));
    }
  }

  componentWillUnmount() {
    const { setInitialProps } = this.props;
    setInitialProps();
  }

  validateForm = (value) => {
    try {
      const { currentOrg } = this.props;
      const valuesForValidation = {
        ...currentOrg,
        ...(value ? { [value.name]: value.value } : {}),
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

  handleSubmit = () => {
    const {
      addOrganisation,
      currentOrg,
      idCurrentLmsGroup,
      setInitStateOrganisationsAfterAdd,
      setInitStateCropImage,
      editOrg,
      idCurrentOrg,
    } = this.props;

    const {
      name,
      adminFullAccess,
      file,
      isActive,
      logoImageUri,
    } = currentOrg;

    const { translations } = this.state;

    const isValid = this.validateForm();
    this.setAllTouched();
    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    generateFormDataWithTranslations(formData, translations);
    formData.append('adminFullAccess', adminFullAccess);
    formData.append('isActive', isActive);

    if (file) {
      formData.append('file', file);
    }

    if (logoImageUri) {
      formData.append('logoImageUri', logoImageUri);
    }

    if (!this.isEdit) {
      formData.append('lmsGroup', idCurrentLmsGroup);

      addOrganisation(formData, () => {
        setInitStateOrganisationsAfterAdd();
        this.hardResetTextFormat();
        this.setState({ file: null });
        setInitStateCropImage();
      });

      return;
    }

    editOrg(formData, idCurrentOrg);
  };

  addNameOrg = ({ target: { value } }) => {
    const { addInputOrgName } = this.props;
    this.validateForm({ value, name: 'name' });
    addInputOrgName(value);
  };

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

  handleCropFile = (file) => {
    const { addCropFile } = this.props;
    addCropFile(file);
  };

  handleDrop = (file) => {
    this.setState({ imageSrc: null });
  };

  handleAddFile = (file) => {
    this.setState({ imageSrc: file });
  };

  handleCheck = (value, name) => {
    const { changeCheckbox } = this.props;
    changeCheckbox(value, name);
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

  hardResetTextFormat = () => {
    // Never use this.state to store data. Do you hear? NEVER!!!

    this.textFormatInstances.description.hardReset();
    this.textFormatInstances.adminWelcomeText.hardReset();
    this.textFormatInstances.studentWelcomeText.hardReset();
  }

  render() {
    const { limitReached, errors } = this.state;
    const {
      currentOrg,
      currentLmsGroup,
      removeDownloadLink,
      createdOrganisation,
      isSuccessResult,
      clearSuccessResultOrganisations,
      isLoading,
      idCurrentOrg,
      isLoadingInitData,
      isLoadingEdit,
    } = this.props;

    const {
      name,
      logoImageUri,
      adminFullAccess,
      lmsGroup,
      isActive,
    } = currentOrg;

    const { translations } = this.state;

    const { name: lmsGroupName } = currentLmsGroup;
    const successMessage = this.isEdit
      ? <IntlMessages id="organisations.changesSaved" />
      : `The organisation - ${createdOrganisation} is added!`;

    return (
      <LayoutContent>
        <OrganisationsAddWrapper>
          <Banner title={
            <IntlMessages id={this.isEdit ? 'organisations.editBanner' : 'organisations.addBanner'} />
          }
          />
          {isSuccessResult && (
            <BannerNotification
              error={false}
              title={successMessage}
              isScrollMount
              close={clearSuccessResultOrganisations}
            />
          )}
          {isLoadingInitData
            ? <LoaderFullSize isLoading={isLoadingInitData} />
            : (
              <React.Fragment>
                <section className={page({ transparent: limitReached })}>
                  <section className={page('left')}>
                    <div className={group()}>
                      <div className={group('title')}>
                        {this.isEdit
                          ? <IntlMessages id="organisations.editTitle" />
                          : <IntlMessages id="organisations.addTitle" />}
                        {lmsGroupName || (lmsGroup && lmsGroup.name)}
                      </div>
                      <div className={group('name')}>
                        <IntlMessages id="organisations.addInput" />
                      </div>
                      <CustomTextInput
                        className={group('name')}
                        value={name}
                        placeholder={organisationsName}
                        name="name"
                        onChange={this.addNameOrg}
                        onFocus={this.setTouched}
                        error={errors.name}
                      />
                      <div className={group('optional')}>
                        <IntlMessages id="organisations.optional" />
                      </div>
                      <TextFormat
                        saveDescription={this.handleSaveDescription}
                        translations={translations}
                        name="description"
                        link={this.textFormatInstances}
                      />
                      <div className={group('checkbox')}>
                        <Checkbox
                          handleCheck={this.handleCheck}
                          name="adminFullAccess"
                          title={<IntlMessages id="organisations.check" />}
                          value={adminFullAccess}
                        />
                      </div>
                      <div className={group('checkbox')}>
                        <Checkbox
                          handleCheck={this.handleCheck}
                          name="isActive"
                          title={<IntlMessages id="organisations.activeCheck" />}
                          value={isActive}
                        />
                      </div>
                    </div>
                  </section>
                  <section className={page('right')}>
                    <section className={main()}>
                      {this.isEdit && (
                      <CreatedAtBlock
                        data={currentOrg}
                      />
                      )}
                      <div className={main('welcome')}>
                        <IntlMessages id="organisations.welcome" />
                      </div>
                      <div className={main('override')}>
                        <IntlMessages id="organisations.overridesText" />
                      </div>
                      <div className={main('logotype')}>
                        <IntlMessages id="organisations.logoTextOptional" />
                      </div>
                      <div className={main('shown')}>
                        <IntlMessages id="organisations.shownText" />
                      </div>
                    </section>
                    <div className={page('drag-and-drop')}>
                      <UploadDragAndDropCrop
                        handleDrop={this.handleDrop}
                        handleAddFile={this.handleAddFile}
                        handleCropFile={this.handleCropFile}
                        isUpload="false"
                        imageUrl={logoImageUri}
                        removeDownloadLink={removeDownloadLink}
                      />
                    </div>
                    <div className={welcome('admin')}><IntlMessages id="organisations.welcomeAdminOptional" /></div>
                    <TextFormat
                      saveDescription={this.handleSaveDescription}
                      translations={translations}
                      name="adminWelcomeText"
                      link={this.textFormatInstances}
                    />
                    <div className={welcome('student')}><IntlMessages id="organisations.welcomeStudentOptional" /></div>
                    <TextFormat
                      saveDescription={this.handleSaveDescription}
                      translations={translations}
                      name="studentWelcomeText"
                      link={this.textFormatInstances}
                    />
                    <section className={btn()}>
                      <Loader
                        active={isLoading || isLoadingEdit}
                        inline
                        className={btn('loader')}
                      />
                      {this.isEdit && (
                      <Link className="link" to={urlToDeleteOrg(idCurrentOrg)}>
                        <button
                          className={btn('delete')}
                          disabled={isLoading}
                        >
                          <IntlMessages id="lmsGroups.deleteBtn" />
                        </button>
                      </Link>
                      )}
                      <button
                        onClick={this.handleSubmit}
                        className={btn('add')}
                        disabled={isLoading || isLoadingEdit}
                      >
                        {this.isEdit
                          ? <IntlMessages id="lmsGroups.saveBtn" />
                          : <IntlMessages id="organisation.addBtn" /> }
                      </button>
                    </section>
                  </section>
                </section>
              </React.Fragment>
            )}
        </OrganisationsAddWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentOrg = getCurrentOrgFp(state);
  const searchLmsGroupsData = getSearchLmsGroupDataFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdFp(state);
  const currentLmsGroup = getCurrentLmsGroupOrgFp(state);
  const isAdded = getAddedStatusOrgFp(state);
  const currentOrgId = getCurrentOrgIdFp(state);
  const error = getErrorInAddOrgFp(state);
  const { pathname } = location;

  const resLmsGroup = pathname && pathname.match(getAddId);
  const idCurrentLmsGroup = currentLmsGroupId || (resLmsGroup && resLmsGroup[1]);

  const resOrg = pathname && pathname.match(getEditId);

  const idCurrentOrg = currentOrgId || (resOrg && resOrg[1]);

  return {
    ...state.organisations,
    location,
    currentOrg,
    searchLmsGroupsData,
    idCurrentLmsGroup,
    currentLmsGroup,
    isAdded,
    error,
    idCurrentOrg,
  };
};

export default connect(mapStateToProps, {
  ...orgActions,
  ...cropStateImageActions,
})(OrganisationsAddAndEdit);
