import React, { PureComponent } from 'react';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import { PropTypes } from 'prop-types';
import Modal from 'components/feedback/modal';
import { EditFileDialog } from 'components';
import AttachedFileWrapper from './attachedFile.style';
import PreviewModal from './PreviewModal';

const defaultProps = {
  onDownload: null,
  onDelete: null,
  header: '',
  file: {
    id: null,
    url: '',
    name: '',
  },
  deleteFileOfCourse: null,
  changeFileOfCourse: null,
  hideFile: false,
  hideHeader: false,
  tutorFile: false,
  headerInputType: '',
  autoCompleteOptions: [],
};

const propTypes = {
  hideFile: PropTypes.bool,
  onDownload: PropTypes.func,
  onDelete: PropTypes.func,
  header: PropTypes.string,
  file: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    name: PropTypes.string,
  }),
  deleteFileOfCourse: PropTypes.func,
  changeFileOfCourse: PropTypes.func,
  hideHeader: PropTypes.bool,
  tutorFile: PropTypes.bool,
  headerInputType: PropTypes.string,
  autoCompleteOptions: PropTypes.arrayOf(PropTypes.string),
};


const b = bemlds('file');

class AttachedFile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowModalEdit: false,
      isShowModalPreview: false,
    };
  }

  openModalEdit = () => (this.setState({ isShowModalEdit: true }));

  closeModalEdit = () => (this.setState({ isShowModalEdit: false }));

  toggleModalPreview = () => {
    const { isShowModalPreview } = this.state;
    this.setState({
      isShowModalPreview: !isShowModalPreview,
    });
  }

  render() {
    const { isShowModalEdit, isShowModalPreview } = this.state;
    const {
      onDownload,
      onDelete,
      header,
      file: { id, url, name },
      file,
      deleteFileOfCourse,
      changeFileOfCourse,
      hideFile,
      hideHeader,
      tutorFile,
      headerInputType,
      autoCompleteOptions,
    } = this.props;

    return (
      <AttachedFileWrapper>
        <div className={b({ 'tutor-file': tutorFile })}>
          <div className={b('name')}>{name}</div>
          <div className={b('controls')}>
            <div
              role="button"
              tabIndex="0"
              className={b('icon-wrapper')}
              onClick={this.toggleModalPreview}
            >
              <Icon type="eye" />
            </div>
            <div
              role="button"
              tabIndex="0"
              className={b('icon-wrapper')}
              onClick={() => onDownload(url, name)}
            >
              <Icon type="download" />
            </div>
            <div
              role="button"
              tabIndex="0"
              className={b('icon-wrapper')}
              onClick={this.openModalEdit}
            >
              <Icon type="form" />
            </div>
            <div
              role="button"
              tabIndex="0"
              className={b('icon-wrapper_delete')}
              onClick={() => onDelete(id)}
            >
              <Icon type="close" />
            </div>
          </div>
        </div>
        <Modal
          visible={isShowModalEdit}
          onCancel={this.closeModalEdit}
          footer={null}
        >
          {isShowModalEdit && (
          <EditFileDialog
            currentHeader={header}
            currentName={name}
            file={file}
            closeModal={this.closeModalEdit}
            deleteFileOfCourse={deleteFileOfCourse}
            changeFileOfCourse={changeFileOfCourse}
            hideFile={hideFile}
            hideHeader={hideHeader}
            tutorFile={tutorFile}
            headerInputType={headerInputType}
            autoCompleteOptions={autoCompleteOptions}
          />
          )}
        </Modal>
        <Modal
          visible={isShowModalPreview}
          onCancel={this.toggleModalPreview}
          footer={null}
          style={{ minWidth: '800px', minHeight: '500px' }}
        >
          {isShowModalPreview && (
            <PreviewModal
              url={url}
              fileName={name}
              toggleModalPreview={this.toggleModalPreview}
            />
          )}
        </Modal>
      </AttachedFileWrapper>
    );
  }
}

AttachedFile.propTypes = propTypes;
AttachedFile.defaultProps = defaultProps;

export default AttachedFile;
