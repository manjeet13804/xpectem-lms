import React from 'react';
import { Select } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';

const { Option } = Select;
const elements = bemlds('elements');

const SelectorsTextFormat = ({
  handleLangChange,
  valueLang,
  isDisableLanguage,
}) => (
  <div className={elements('selects', { lang: true })}>
    {!isDisableLanguage && (
      <div className={elements('wrap-select')}>
        <div className={elements('language')}><IntlMessages id="textFormat.language" /></div>
        <Select
          className={elements('select-language')}
          style={{ width: 160 }}
          placeholder="Select a language"
          defaultValue="English"
          value={valueLang}
          onChange={handleLangChange}
        >
          <Option value="English"><IntlMessages id="textFormat.langEn" /></Option>
          <Option value="Svenska"><IntlMessages id="textFormat.langSwe" /></Option>
          <Option value="Norsk"><IntlMessages id="textFormat.langNor" /></Option>
        </Select>
      </div>
    )}
  </div>
);

export default SelectorsTextFormat;
