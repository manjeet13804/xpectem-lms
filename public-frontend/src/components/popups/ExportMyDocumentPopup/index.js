// @flow
import React, { Node } from 'react';
import { bemlds } from 'utils';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionExportData } from 'redux/actions';
import { getUserProfile } from 'redux/selectors';
import { CloseIcon, DocumentIcon } from 'components';
import { EDIT_PROFILE } from 'localise';
import './styles.scss';


const b = bemlds('export-my-document-popup');

const { exportMyDocumentText } = EDIT_PROFILE;

type PropType = {
  className?: string,
  close: () => void,
  userData: object,
  exportData: () => void
};

const DefaultProps = {
  className: '',
};

const ExportMyDocumentPopup = (props: PropType): Node => {
  const {
    className,
    close,
    userData,
    exportData,
  } = props;

  const { firstName, lastName } = userData;

  const exportUserData = () => {
    exportData(`${firstName} ${lastName}`);
  };

  return (
    <div className={b({mix: className})}>
      <div className={b('content-block')}>
        <span className={b('text')}>{exportMyDocumentText}</span>
        <button className={b('file-button')} type="button" onClick={exportUserData}>
          <DocumentIcon />
          <span className={b('btn-text')}>{`${firstName} ${lastName}`}</span>
        </button>
        <button className={b('btn-close')} type="button" onClick={close}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

ExportMyDocumentPopup.defaultProps = DefaultProps;

const mapDispatchToProps = {
  exportData: actionExportData,
};

const mapStateToProps = (state: object): object => ({
  userData: getUserProfile(state),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ExportMyDocumentPopup),
);
