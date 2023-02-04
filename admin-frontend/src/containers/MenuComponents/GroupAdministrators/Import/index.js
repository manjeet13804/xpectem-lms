import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import {
  getCurrentAdminGroupAdminsFp,
  getSearchLmsGroupsGroupAdminsFp,
  getSearchOrgGroupAdminsFp,
  getSearchGroupGroupAdminsFp,
  getCurrentLmsGroupIdGroupAdminsFp,
  getCurrentNameLmsGroupGroupAdminsFp,
  getCurrentOrgIdGroupAdminsFp,
  getCurrentOrgNameGroupAdminsFp,
  getChosenGroupGroupAdminsFp,
} from 'selectors';
import { Link } from 'react-router-dom';
import URLS from 'redux/urls';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
  DragAndDrop,
  ExampleCsv,
  PreviewCsv,
  DefaultButton,
} from 'components';
import searchGroupActions from 'redux/searchGroup/actions';
import GroupAdminsImportWrapper from './GroupsAdminsImport.style';

const b = bemlds('import-block');
const urlToStatusImport = () => `${URLS.groupsAdminsImportUrl}/form/status`;

class GroupAdminsImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data: [],
      statusPreview: false,
      arrayForBack: [
        'firstName',
        'lastName',
        'email',
        'phone',
        'language',
        'notifyEmail',
        'notifySms',
      ],
    };
  }

  setStatusPreview = (value) => {
    this.setState({
      statusPreview: value,
    });
  }

  downloadTemplateFile = () => {
    const { getTemplateFile } = this.props;
    getTemplateFile();
  };

  importData = () => {
    const { file, arrayForBack } = this.state;

    const {
      importCsvFile,
      selectedGroups,
    } = this.props;

    const generateFormDataHead = (formData, arrayForBack) => {
      arrayForBack.forEach((item, index) => {
        formData.append(`headers[${index}]`, item);
      });
    };

    const generateFormDataGroup = (formData, groups) => {
      groups && groups.forEach((item, index) => {
        formData.append(`groups[${index}]`, item.id);
      });
    };

    const formData = new FormData();
    generateFormDataHead(formData, arrayForBack);
    generateFormDataGroup(formData, selectedGroups);
    if (file) { formData.append('file', file); }

    importCsvFile(formData);
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

  getArrayForBack = (array) => {
    this.setState({ arrayForBack: [...array] });
  };

  componentWillMount() {
    const { history, selectedGroups, clearErrorImport } = this.props;
    clearErrorImport();

    if (!selectedGroups.length) {
      history.push(`${URLS.groupsAdminsImportUrl}`);
    }
  }

  render() {
    const {
      data,
      statusPreview,
      arrayForBack,
      file,
    } = this.state;
    const { currentLmsGroupId, selectedGroups } = this.props;
    return (
      <LayoutContent>
        <GroupAdminsImportWrapper>
          <Banner title={<IntlMessages id="groupAdmins.importBanner" />} />
          <section className={b()}>
            <div className={b('title')}>
              <IntlMessages id="groupAdmins.importTitle" />
              {selectedGroups && selectedGroups.map(({ text }) => text).join(', ')}
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
                    fileFormats=".csv"
                  />
                </div>
                <div className={b('upload-btn')}>
                  <DefaultButton
                    textId="orgAdmins.importPreviewBtn"
                    disabled={!data.length}
                    onClick={this.clickPreview}
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
              <Link
                className={b('button-link')}
                to={urlToStatusImport(currentLmsGroupId)}
              >
                <div className={b('import-btn')}>
                  <DefaultButton
                    textId="orgAdmins.previewImportBtn"
                    onClick={() => this.importData(arrayForBack, file)}
                  />
                </div>
              </Link>
            )}
            {statusPreview && (
            <div className={b('import-btn')}>
              <DefaultButton
                textId="group.importGoBack"
                onClick={() => this.setStatusPreview(false)}
              />
            </div>
            )}
          </section>
        </GroupAdminsImportWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const currentAdmin = getCurrentAdminGroupAdminsFp(state);
  const searchLmsGroupsData = getSearchLmsGroupsGroupAdminsFp(state);
  const searchOrgData = getSearchOrgGroupAdminsFp(state);
  const searchGroupData = getSearchGroupGroupAdminsFp(state);
  const currentLmsGroupId = getCurrentLmsGroupIdGroupAdminsFp(state);
  const currentNameLmsGroup = getCurrentNameLmsGroupGroupAdminsFp(state);
  const currentOrgId = getCurrentOrgIdGroupAdminsFp(state);
  const currentOrgName = getCurrentOrgNameGroupAdminsFp(state);
  const chosenGroups = getChosenGroupGroupAdminsFp(state);

  return {
    currentAdmin,
    searchLmsGroupsData,
    searchOrgData,
    searchGroupData,
    currentLmsGroupId,
    currentNameLmsGroup,
    currentOrgId,
    currentOrgName,
    chosenGroups,
    ...state.searchGroup,
  };
};

export default connect(
  mapStateToProps,
  { ...groupAdminsActions, ...searchGroupActions },
)(GroupAdminsImport);
