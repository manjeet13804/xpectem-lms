import React from 'react';
import { FileIcon } from 'components';
import { bemlds } from 'utils';
import isURL from 'validator/lib/isURL';
import FileBlockWrapper from './fileBlock.style';

const defaultProps = {
  title: '',
  fileName: '',
  uploadedFileURL: '',
  translation: '',
  getWelcomeLetterUrl: () => null,
  getWelcomeLetterRichText: () => null,
  courseId: null,
};

const block = bemlds('block');

const FileBlock = ({
  title,
  fileName,
  uploadedFileURL,
  translation,
  getWelcomeLetterUrl,
  getWelcomeLetterRichText,
  courseId,
}) => {
  const handleClick = () => {
    isURL(uploadedFileURL)
      ? getWelcomeLetterUrl(courseId, uploadedFileURL, fileName)
      : getWelcomeLetterRichText(courseId, translation, fileName);
  };

  return (
    <FileBlockWrapper>
      <div className={block()}>
        <div className={block('title')}>
          {title}
        </div>
        <div className={block('file')}>
          <div className={block('file-logo')}>
            <FileIcon />
          </div>
          <div
            onClick={handleClick}
            className={block('file-title')}
          >
            {fileName}
          </div>
        </div>
      </div>
    </FileBlockWrapper>
  );
};

FileBlock.defaultProps = defaultProps;

export default FileBlock;
