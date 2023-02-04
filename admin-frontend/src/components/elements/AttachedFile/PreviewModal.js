import React, { Suspense } from 'react';
import { bemlds } from 'utils';
import { PropTypes } from 'prop-types';
import AttachedFileWrapper from './attachedFile.style';

const FileViewer = React.lazy(() => import('./fileViewerWrapper'));

const defaultProps = {
  url: '',
  fileName: '',
  toggleModalPreview: () => null,
};

const propTypes = {
  url: PropTypes.string,
  fileName: PropTypes.string,
  toggleModalPreview: PropTypes.func,
};

const IMAGES_EXTENSIONS = ['png', 'jpeg', 'jpg'];
const EXTENSIONS_TO_VIEW = ['pdf', 'csv', 'xlsx', 'docx', 'doc', 'xls'];
const b = bemlds('file');

const PreviewModal = ({
  url,
  fileName,
  toggleModalPreview,
}) => {
  const extension = fileName
    .split('.')
    .reverse()[0];
  const isImage = IMAGES_EXTENSIONS.includes(extension);
  const isView = EXTENSIONS_TO_VIEW.includes(extension);

  const getPreview = () => {
    switch (true) {
      case isImage: {
        return <img alt="uploadedImg" src={url} className={b('img')} />;
      }

      case isView: {
        return (
          <Suspense fallback={<div />}>
            <FileViewer
              extension={extension}
              url={url}
            />
          </Suspense>
        );
      }

      default: {
        const a = document.createElement('a');
        a.href = url;
        a.setAttribute('target', '_blank');
        a.click();

        toggleModalPreview();
        return (
          <div />
        );
      }
    }
  };

  return (
    <AttachedFileWrapper>
      <div className={b('preview')}>
        {getPreview()}
      </div>
    </AttachedFileWrapper>
  );
};

PreviewModal.propTypes = propTypes;
PreviewModal.defaultProps = defaultProps;

export default PreviewModal;
