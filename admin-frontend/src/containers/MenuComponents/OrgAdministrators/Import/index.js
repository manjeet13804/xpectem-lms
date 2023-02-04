import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getCurrentOrgAdminFp,
  getCurrentLmsGroupIdOrgAdminsFp,
  getCurrentNameLmsGroupOrgAdminsFp,
  getChosenOrgFp,
  getErrorOrgAdminsFp,
} from 'selectors';
import { bemlds } from 'utils';
import orgAdminsActions from 'redux/orgAdministrators/actions';
import organisationsActions from 'redux/searchOrganisations/actions';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import {
  Banner,
  DragAndDrop,
  ExampleCsv,
  PreviewCsv,
  DefaultButton,
} from 'components';
import { ROLES } from 'constants/constants';
import OrgAdminsImportWrapper from './OrgAdminsImport.style';

const b = bemlds('import-block');
const urlToStatusImport = id => `${URLS.orgAdminImport}/${id}/status`;

class OrgAdminsImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: [],
      statusPreview: false,
      arrayForBack: ['firstName', 'lastName', 'email', 'phone', 'language', 'notifyEmail', 'notifySms'],
    };
  }

  downloadTemplateFile = () => {
    const { getTemplateFile } = this.props;
    getTemplateFile();
  };

  importData = () => {
    const {
      importCsvFile,
      selectedOrganisations,
    } = this.props;
    const { file, arrayForBack } = this.state;

    const generateFormDataHead = (formData, arrayForBack) => {
      arrayForBack.forEach((item, index) => {
        formData.append(`headers[${index}]`, item);
      });
    };

    const generateFormDataOrg = (formData, organisations) => {
      organisations.forEach((item, index) => {
        formData.append(`organisations[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    generateFormDataHead(formData, arrayForBack);
    generateFormDataOrg(formData, selectedOrganisations);
    if (file) { formData.append('file', file); }


    importCsvFile(formData);
  };

  handleDrop = (files, dataParse) => {
    this.setState({ file: files });
    this.setState({ data: dataParse.data });
  };

  handleAddFile = (files, dataParser) => {
    this.setState({ file: files });
    this.setState({ data: dataParser.data });
  };

  clickPreview = () => {
    this.setState({ statusPreview: !this.state.statusPreview });
  };

  goBack = () => {
    this.setState({ statusPreview: false });
  }

  getArrayForBack = (array) => {
    this.setState({ arrayForBack: [...array] });
  };

  render() {
    const {
      data,
      statusPreview,
    } = this.state;
    const {
      user, 
      selectedOrganisations, 
      setOrganisationsFromOrgAdmin
    } = this.props;

    const isXpectrumAdmin = (user.roles || []).includes(ROLES.XPECTUM_ADMIN)
 
    if(!isXpectrumAdmin && selectedOrganisations.length === 0 && user.organisations){
      setOrganisationsFromOrgAdmin(user.organisations)
    }

    return (
      <LayoutContent>
        <OrgAdminsImportWrapper>
          <Banner title={<IntlMessages id="orgAdmins.importBanner" />} />
          <section className={b()}>
            <div className={b('title')}>
              <IntlMessages id="orgAdmins.importTitle" />
              {selectedOrganisations.map(({ lmsGroupName }) => lmsGroupName).join(', ')}
              {' '}
              -
              {selectedOrganisations.map(({ text, name }) => text || name).join(', ')}
            </div>
            {!statusPreview && (
              <div className={b('text')}>
                <div><IntlMessages id="orgAdmins.importTextFirst" /></div>
                <div><IntlMessages id="orgAdmins.importTextSecond" /></div>
                <div className={b('text-indent')}>
                  <IntlMessages id="orgAdmins.importTextThird" />
                </div>
              </div>
            )}
            {statusPreview && (
              <div className={b('preview-text')}>
                <div className={b('preview-text-title')}>
                  <IntlMessages id="orgAdmins.previewTitle" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextFirst" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextSecond" />
                </div>
                <div className={b('preview-text-describe')}>
                  <IntlMessages id="orgAdmins.previewTextThird" />
                </div>
                <div className={b('preview-text-field')}>
                  <IntlMessages id="orgAdmins.previewField" />
                </div>
              </div>
            )}
            {!statusPreview && (
              <div className={b('upload')}>
                <div className={b('upload-form')}>
                  <DragAndDrop
                    handleDrop={this.handleDrop}
                    handleAddFile={this.handleAddFile}
                  />
                </div>
                <div className={b('upload-btn')}>
                  <DefaultButton
                    textId="orgAdmins.importPreviewBtn"
                    onClick={this.clickPreview}
                    disabled={!data.length}
                  />
                </div>
              </div>
            )}
            {!statusPreview
              ? (<ExampleCsv type="OrgAdmins" />)
              : (
                <PreviewCsv
                  type="OrgAdmins"
                  getArray={this.getArrayForBack}
                  data={data}
                />
              )}

            {!statusPreview && (
              <div className={b('download-btn')}>
                <DefaultButton
                  textId="orgAdmins.importExampleFile"
                  onClick={this.downloadTemplateFile}
                />
              </div>
            )}
            {statusPreview && (
              <div>
                <Link
                  className={b('button-link')}
                  to={urlToStatusImport(selectedOrganisations[0].lmsGroupId)}
                >
                  <div className={b('import-btn')}>
                    <DefaultButton
                      textId="orgAdmins.previewImportBtn"
                      onClick={this.importData}
                    />
                  </div>
                </Link>
                <div className={b('import-btn')}>
                  <DefaultButton
                    textId="group.importGoBack"
                    onClick={this.goBack}
                  />
                </div>
              </div>
            )}
          </section>
        </OrgAdminsImportWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentOrgAdmin = getCurrentOrgAdminFp(state);
  const currentLmsGroupIdOrg = getCurrentLmsGroupIdOrgAdminsFp(state);
  const currentNameLmsGroupOrg = getCurrentNameLmsGroupOrgAdminsFp(state);
  const chosenOrg = getChosenOrgFp(state);
  const error = getErrorOrgAdminsFp(state);

  return {
    currentOrgAdmin,
    currentLmsGroupIdOrg,
    currentNameLmsGroupOrg,
    chosenOrg,
    error,
    ...state.orgAdmins,
    ...state.searchOrganisations,
    ...state.searchLmsGroup,
    ...state.user
  };
};

export default connect(mapStateToProps, { ...orgAdminsActions, ...organisationsActions })(OrgAdminsImport);
