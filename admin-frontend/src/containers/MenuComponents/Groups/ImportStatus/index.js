import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupsActions from 'redux/groups/actions';
import { COLORS } from 'constants/constants';
import {
  getStatusImportFileGroupsFp,
  getErrorImportGroupsFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DefaultButton,
  DeleteAttentionSvg,
  Table,
} from 'components';
import { MAIN_ROUTE } from 'constants/routes';
import { Loader } from 'semantic-ui-react';
import GroupsImportStatusWrapper from './GroupsImportStatus.style';

const b = bemlds('import-status');
const { groupsImportFindOrganisations } = MAIN_ROUTE;

class GroupsImportStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPreview: false,
    };
  }

  goBack = () => {
    const { history, selectedOrganisationId } = this.props;
    history.push(`${groupsImportFindOrganisations}/${selectedOrganisationId}`);
  }

  render() {
    const {
      isLoading,
      isImportFile,
      errorImport,
      clearResults,
      errors,
    } = this.props;

    const isSuccess = !isLoading && isImportFile;
    const isFeild = !isLoading && !isImportFile;

    return (
      <LayoutContent>
        <GroupsImportStatusWrapper>
          <Banner title={<IntlMessages id="groups.importBanner" />} />
          <section className={b()}>
            <Loader
              active={isLoading}
            />
            {isSuccess && (
              <BannerNotification
                title={<IntlMessages id="groups.importedSuccess" />}
                close={clearResults}
              />
            )}
            {errorImport && (
              <BannerNotification
                error
                title={errorImport}
                isScrollMount
                close={clearResults}
                noAutoClose
              />
            )}
            <section className={b('text')}>
              <div className={b('text-attention', { 'is-error': Boolean(errors && errors.length) })}>
                {isSuccess && (
                  <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
                )}
                {isSuccess && (
                  <div className={b('text-attention-title')}>
                    <IntlMessages id="groups.importedSuccess" />
                  </div>
                )}
                {errors && (
                  <div>
                    {errors.map(item => <p className={b('error-text')} key={item}>{item}</p>)}
                  </div>
                )}
              </div>
              {isFeild && (
              <div className={b('text-title')}>
                <div className={b('text-title-describe')}>
                  <IntlMessages id="groups.importedSuccessText" />
                </div>
                <div className={b('text-title-example')}>
                  <IntlMessages id="groups.importedSuccessTextExample" />
                </div>
              </div>
              )}
            </section>
            {isFeild && (
            <section>
              <Table type="GroupsImport" />
            </section>
            )}
            {(isFeild) && (
            <div className={b('import-btn')}>
              <DefaultButton
                textId="group.tryAgain"
                onClick={this.goBack}
              />
            </div>
            )}
          </section>
        </GroupsImportStatusWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isImportFile = getStatusImportFileGroupsFp(state);
  const errorImport = getErrorImportGroupsFp(state);
  const { errors, isLoading } = state.groups;
  const { selectedOrganisationId } = state.searchOrganisations;

  return {
    isLoading,
    isImportFile,
    errorImport,
    errors,
    selectedOrganisationId,
  };
};

export default connect(mapStateToProps, { ...groupsActions })(GroupsImportStatus);
