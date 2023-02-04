import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupsActions from 'redux/groups/actions';
import {
  getCurrentGroupFp,
  getSearchOrgDataGroupsFp,
  getStatusEditGroupFp,
  getCurrentNameLmsGroupGroupsFp,
  getCurrentOrgNameGroupsFp,
  getCurrentLmsGroupIdGroupsFp,
  getCurrentOrgIdGroupsFp,
  getStatusImportFileGroupsFp,
} from 'selectors';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { REGEXP } from 'constants/regexp';
import { ROLES } from 'constants/constants';
import { bemlds } from 'utils';
import {
  Banner,
  DragAndDrop,
  ExampleCsv,
  PreviewCsv,
  DefaultButton,
} from 'components';
import GroupsImportWrapper from './GroupsImport.style';

const { getImport } = REGEXP;

const b = bemlds('import-block');
const urlToStatusImport = id => `${URLS.groupsImport}/${id}/status`;

class GroupsImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: [],
      statusPreview: false,
      arrayForBack: ['name', 'description_swe', 'description_nor', 'description_eng'],
    };
  }

  componentDidMount() {
    const { 
      selectedOrganisationId, 
      history, 
      clearResults, 
      user,
    } = this.props;
    
    clearResults();

    const isXpectrumAdmin = (user.roles || []).includes(ROLES.XPECTUM_ADMIN)

    if (!selectedOrganisationId && isXpectrumAdmin) {
      history.push(URLS.groupsImport);
    }
  }

  downloadTemplateFile = () => {
    const { getTemplateFile } = this.props;
    getTemplateFile();
  };

  importData = () => {
    const {
      importCsvFileGroups,
      selectedOrganisationId,
    } = this.props;

    const {
      file,
      arrayForBack,
    } = this.state;

    const generateFormDataHead = (formData, arrayForBack) => {
      arrayForBack.forEach((item, index) => {
        formData.append(`headers[${index}]`, item);
      });
    };

    const formData = new FormData();
    generateFormDataHead(formData, arrayForBack);
    formData.append('organisation', selectedOrganisationId);
    if (file) { formData.append('file', file); }

    importCsvFileGroups(formData);
  };

  handleDrop = (file, dataParse) => {
    this.setState({ file });
    this.setState({ data: dataParse.data });
  };

  handleAddFile = (file, dataParser) => {
    this.setState({ file });
    this.setState({ data: dataParser.data });
  };

  clickPreview = () => {
    const { statusPreview } = this.state;
    this.setState({ statusPreview: !statusPreview });
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
    const { currentLmsGroupId } = this.props;

    return (
      <LayoutContent>
        <GroupsImportWrapper>
          <Banner title={<IntlMessages id="groups.importBanner" />} />
          <section className={b()}>
            <div className={b('title')}>
              <IntlMessages id="groups.importTitle" />
            </div>
            {!statusPreview && (
              <div className={b('text')}>
                <div><IntlMessages id="groups.importTextFirst" /></div>
                <div><IntlMessages id="groups.importExampleText" /></div>
                <div className={b('text-indent')}>
                  <IntlMessages id="groups.importTextThird" />
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
              ? (<ExampleCsv type="Groups" />)
              : (
                <PreviewCsv
                  type="Groups"
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
                  to={urlToStatusImport(currentLmsGroupId)}
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
        </GroupsImportWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { router: { location } } = state;

  const currentGroup = getCurrentGroupFp(state);
  const searchOrgData = getSearchOrgDataGroupsFp(state);
  const currentNameLmsGroup = getCurrentNameLmsGroupGroupsFp(state);
  const currentOrgName = getCurrentOrgNameGroupsFp(state);
  const currentOrgId = getCurrentOrgIdGroupsFp(state);
  const isEditGroup = getStatusEditGroupFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdGroupsFp(state);
  const isImportFile = getStatusImportFileGroupsFp(state);

  const { pathname } = location;

  const res = pathname && pathname.match(getImport);
  const idCurrentOrg = currentOrgId || res[1];

  return {
    currentGroup,
    searchOrgData,
    idCurrentOrg,
    currentNameLmsGroup,
    currentOrgName,
    isEditGroup,
    currentLmsGroupId,
    isImportFile,
    ...state.searchOrganisations,
    ...state.user,
  };
};

export default connect(mapStateToProps, {
  ...groupsActions,
})(GroupsImport);
