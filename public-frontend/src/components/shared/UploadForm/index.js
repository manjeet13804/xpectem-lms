// @flow
import React from 'react';
import { bemlds } from 'utils';
import { COMMUNICATION_DICTIONARY } from 'localise';
import './styles.scss';
import {
  Upload,
  Icon,
} from 'antd';

const b = bemlds('upload-form');

const UploadForm = ({
  handleChangeFile,
  isMultiple = false,
}) => (
  <div className={b()}>
    <Upload
      multiple={isMultiple}
      onChange={handleChangeFile}
      beforeUpload={() => false}
    >
      <div className={b('button-upload')}>
        <Icon
          type="file"
          theme="twoTone"
          style={{ marginRight: '5px' }}
        />
        {COMMUNICATION_DICTIONARY.attachFiles}
      </div>
    </Upload>
  </div>
);

export default UploadForm;
