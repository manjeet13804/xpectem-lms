import React, { Component } from 'react';
import { connect } from 'react-redux';
import studentsActions from 'redux/students/actions';
import { COLORS } from 'constants/constants';
import {
  getStatusImportFileStudentsFp,
  getErrorImportStudentsFp,
} from 'selectors';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { Loader } from 'semantic-ui-react';
import {
  Banner,
  BannerNotification,
  DeleteAttentionSvg,
  Table,
  AddExistingStudentsModal,
} from 'components';
import StudentsImportStatusWrapper from './ImnportStatus.style';

const b = bemlds('import-status');

class StudentsImportStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: true,
      showSuccess: true,
    };
  }

  closeSuccesImport = () => {
    this.setState({ showSuccess: false });
  }

  closeError = () => {
    this.setState({ showError: false });
  }

  componentWillUnmount = () => {
    const { setImportStatuses } = this.props;
    setImportStatuses({
      isImportFile: false,
      errorImport: '',
    });
  }

  render() {
    const {
      isImporting,
      isImportFile,
      errorImport,
      history,
    } = this.props;
    const { showError, showSuccess } = this.state;

    return (
      <LayoutContent>
        <StudentsImportStatusWrapper>
          <Banner title={<IntlMessages id="students.importBanner" />} />
          <section className={b()}>
            <Loader active={isImporting} />
            {isImportFile && showSuccess && (
              <BannerNotification
                isScrollMount
                error={false}
                title={<IntlMessages id="students.successImport" />}
                close={this.closeSuccesImport}
              />
            )}
            {errorImport && showError && (
              <BannerNotification
                error
                isScrollMount
                title={<IntlMessages id="Import error" />}
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
                    <IntlMessages id="students.importedSuccess" />
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
            {(errorImport) && (
              <button
                tabIndex={0}
                type="button"
                onClick={() => history.goBack()}
                className={b('back-btn')}
              >
                <IntlMessages id="students.importErrorGoBack" />
              </button>
            )}
          </section>
        </StudentsImportStatusWrapper>
        <AddExistingStudentsModal />
      </LayoutContent>
    );
  }
}

const mapStateToProps = (state) => {
  const isImportFile = getStatusImportFileStudentsFp(state);
  const errorImport = getErrorImportStudentsFp(state);
  const { isImporting } = state.students;

  return {
    isImportFile,
    errorImport,
    isImporting,
  };
};

export default connect(mapStateToProps, { ...studentsActions })(StudentsImportStatus);
