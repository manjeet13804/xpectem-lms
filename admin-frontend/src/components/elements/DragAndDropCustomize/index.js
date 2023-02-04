import React, { useState } from 'react';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds, mbConventer } from 'utils';
import PropTypes from 'prop-types';

import { acceptedFileTypes } from 'constants/constants';
import DragAndDropCustomizeWrapper from './dragAndDropCustomize.style';

const dc = bemlds('drag-and-drop');
const defaultAccept = acceptedFileTypes.map(item => `.${item}`).join();
const defaultFormat = acceptedFileTypes.join(' ,');

const DragAndDropCustomize = (props) => {
  const {
    sizeInfo,
    format,
    accept,
    handleDragAndDropCustomize,
    files,
  } = props;

  const [fileList, setFiles] = useState([]);
  const [dashed, setDashed] = useState(false);
  const [err, setErr] = useState(false);

  if (files && files.length !== fileList.length) {
    setFiles(files);
    if (!files.length) { setDashed(false); }
  }

  const uploadFile = (file) => {
    const { lastModified } = file;
    const isFilesRange = fileList.length < sizeInfo;
    const isFileOriginal = fileList.find(item => item.lastModified === lastModified);
    if (isFilesRange && !isFileOriginal) {
      setFiles((state) => {
        handleDragAndDropCustomize([...state, file]);
        return [...state, file];
      });
      setDashed(true);
    } else {
      setDashed(false);
      setErr(true);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDashed(true);
  };

  const handleDrop = (e) => {
    const { dataTransfer, dataTransfer: { files: elements } } = e;
    e.preventDefault();
    e.stopPropagation();
    uploadFile(elements[0]);
    dataTransfer.clearData();
  };

  return (
    <DragAndDropCustomizeWrapper>
      <section className={dc()}>
        <div className={dc()}>
          <div className={dc('param')}>
            <IntlMessages id="dragAndDrop.sizeCustomize" />
            {sizeInfo}
          </div>
          <div className={dc('param')}>
            <IntlMessages id="dragAndDrop.maxSize" />
          </div>
          <div className={dc('param')}>
            <IntlMessages id="dragAndDrop.format" />
            {format}
          </div>
          <div
            className={dc('main', { error: err, dashed })}
            onDrag={handleDrag}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className={dc('text')}>
              <IntlMessages id="dragAndDrop.dragText" />
            </div>
            <div className={dc('or')}>
              <IntlMessages id="dragAndDrop.dragOrText" />
            </div>
            <div className={dc('select')}>
              <label htmlFor="files" className={dc('title-btn')}>
                <IntlMessages id="dragAndDrop.selectBtn" />
              </label>
              <input
                id="files"
                name="files"
                type="file"
                accept={accept}
                onChange={({ target: { files: elements } }) => uploadFile(elements[0])}
                className={dc('input')}
              />
            </div>
          </div>
          <div className={dc('file-list')}>
            {fileList.map(({
              name,
              lastModifiedDate,
              size,
            }) => (
              <div key={lastModifiedDate} className={dc('item-file')}>
                <div className={dc('item-file-name')}>
                  {name}
                </div>
                <div className={dc('item-file-size')}>
                  {mbConventer(size)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DragAndDropCustomizeWrapper>
  );
};

DragAndDropCustomize.defaultProps = {
  sizeInfo: 1,
  format: defaultFormat,
  handleDragAndDropCustomize: null,
  accept: defaultAccept,
  files: null,
};

DragAndDropCustomize.propTypes = {
  sizeInfo: PropTypes.number,
  format: PropTypes.string,
  accept: PropTypes.string,
  handleDragAndDropCustomize: PropTypes.func,
  files: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.any),
  ]),
};

export default DragAndDropCustomize;
