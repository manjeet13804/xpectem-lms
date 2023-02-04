import React, { Component } from 'react';
import { connect } from 'react-redux';
import groupAdminsActions from 'redux/groupAdministrators/actions';
import { COLORS } from 'constants/constants';
import {
  getStatusImportFileGroupAdminsFp,
  getErrorImportGroupAdminsFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
  Table,
  DefaultButton,
} from 'components';
import { Loader } from 'semantic-ui-react';
import GroupAdminsImportStatusWrapper from './GroupAdminsImportStatus.style';

const b = bemlds('import-status');

class GroupAdminsImportStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPreview: false,
    };
  }

  render() {
    const {
      isLoading,
      isImportFile,
      errorImport,
      history,
    } = this.props;

    return (
      <LayoutContent>
        <GroupAdminsImportStatusWrapper>
          <Banner title={<IntlMessages id="groups.importBanner" />} />
          <section className={b()}>
            <Loader
              active={isLoading}
            />
            {isImportFile && (
              <BannerNotification
                error={false}
                title={<IntlMessages id="groupAdmins.importedSuccess" />}
                clickSaveHandle={this.clickSaveHandle}
              />
            )}
            {errorImport && (
              <BannerNotification
                error
                title={<IntlMessages id="groups.importedFailure" />}
                close={this.closeError}
              />
            )}
            <section className={b('text')}>
              <div className={b('text-attention', { 'is-error': Boolean(errorImport && errorImport.length) })}>
                {isImportFile && (
                  <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
                )}
                {isImportFile && (
                  <div className={b('text-attention-title')}>
                    <IntlMessages id="groupAdmins.importedSuccess" />
                  </div>
                )}
                {errorImport && (
                  <div>
                    {errorImport.map(item => <p className={b('error-text')} key={item}>{item}</p>)}
                  </div>
                )}
              </div>
              {errorImport && (
              <div className={b('text-title')}>
                <div className={b('text-title-describe')}>
                  <IntlMessages id="groups.importedSuccessText" />
                </div>
                <div className={b('text-title-example')}>
                  <IntlMessages id="orgAdmins.importedSuccessTextExample" />
                </div>
              </div>
              )}
            </section>
            {errorImport && (
            <section>
              <Table type="GroupAdminsImport" />
            </section>
            )}
            {errorImport
              && (
              <div className={b('download-btn')}>
                <DefaultButton
                  textId="group.tryAgain"
                  onClick={() => history.goBack()}
                />
              </div>
              )
            }
          </section>
        </GroupAdminsImportStatusWrapper>
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isImportFile = getStatusImportFileGroupAdminsFp(state);
  const errorImport = getErrorImportGroupAdminsFp(state);
  const { isLoading } = state.groupAdministrators;
  return {
    isImportFile,
    errorImport,
    isLoading,
  };
};

export default connect(mapStateToProps, { ...groupAdminsActions })(GroupAdminsImportStatus);
