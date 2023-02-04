import React from 'react';
import { PropTypes } from 'prop-types';
import FileViewer from 'react-file-viewer';

const defaultProps = {
  extension: '',
  url: '',
};

const propTypes = {
  url: PropTypes.string,
  extension: PropTypes.string,
};

const FileViewerWrapper = ({
  extension,
  url,
 }) => {
  return (
    <FileViewer
    fileType={extension}
    filePath={url}
    />
  )
}

FileViewerWrapper.propTypes = propTypes;
FileViewerWrapper.defaultProps = defaultProps;
export default FileViewerWrapper;