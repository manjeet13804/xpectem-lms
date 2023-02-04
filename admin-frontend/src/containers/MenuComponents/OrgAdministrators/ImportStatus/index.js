import React from 'react';
import { connect } from 'react-redux';
import orgAdminsActions from 'redux/orgAdministrators/actions';
import { COLORS } from 'constants/constants';
import {
  getStatusImportFileOrgAdminsFp,
  getErrorImportOrgAdminsFp,
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
import { MAIN_ROUTE } from 'constants/routes';
import { Loader } from 'semantic-ui-react';
import OrgAdminsImportStatusWrapper from './OrgAdminsImportStatus.style';

const b = bemlds('import-status');

const GroupsImportStatus = ({
  isLoading,
  isImportFile,
  errorImport,
  clearImportStatuses,
  errors,
  history,
}) => {
  const goBack = () => {
    history.push(MAIN_ROUTE.orgAdminsImport);
  };

  const isSuccess = !isLoading && isImportFile;
  const isFeild = !isLoading && !isImportFile;

  return (
    <LayoutContent>
      <OrgAdminsImportStatusWrapper>
        <Banner title={<IntlMessages id="orgAdmins.importBanner" />} />
        <section className={b()}>
          <Loader
            active={isLoading}
          />
          {isSuccess && (
            <BannerNotification
              error={false}
              title={<IntlMessages id="orgAdmins.importedSuccess" />}
              isScrollMount
              close={clearImportStatuses}
              noAutoClose
            />
          )}
          {errorImport && (
          <div>
            <BannerNotification
              error
              isScrollMount
              title={errorImport}
              close={clearImportStatuses}
            />
          </div>
          )}
          <section className={b('text')}>
            <div className={b('text-attention', { 'is-error': Boolean(errors && errors.length) })}>
              {isSuccess && (
                <DeleteAttentionSvg fill={COLORS.black} className={b('icon')} />
              )}
              {isSuccess && (
                <div className={b('text-attention-title')}>
                  <IntlMessages id="orgAdmins.importedSuccess" />
                </div>
              )}
              {errors && (
                <div className={b('errors-wrapper')}>
                  {errors.map(item => <p className={b('error-text')} key={item}>{item}</p>)}
                </div>
              )}
            </div>
            <div className={b('text-title-describe')} />
            {isFeild && (
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
          {isFeild && (
            <section>
              <Table type="OrgAdminsImport" />
            </section>
          )}
          {isFeild && (
            <div className={b('import-btn')}>
              <DefaultButton
                textId="group.tryAgain"
                onClick={goBack}
              />
            </div>
          )}
        </section>
      </OrgAdminsImportStatusWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const isImportFile = getStatusImportFileOrgAdminsFp(state);
  const errorImport = getErrorImportOrgAdminsFp(state);
  const { errors, isLoading } = state.orgAdmins;

  return {
    isImportFile,
    errorImport,
    errors,
    isLoading,
  };
};

export default connect(mapStateToProps, { ...orgAdminsActions })(GroupsImportStatus);
