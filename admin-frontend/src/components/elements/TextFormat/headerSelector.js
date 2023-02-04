import React, { useState } from 'react';
import { Select } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import { LANGUAGES } from '../../../constants/constants';
import SelectorsTextFormat from './selectors';

const { Option } = Select;
const elements = bemlds('elements');

const HeaderSelector = ({
  onChange,
  currentState: { blockType },
  handleChangeLang,
  isDisableLanguage,
}) => {
  const [state, setState] = useState(
    {
      langSelect: LANGUAGES.english,
    },
  );
  const { langSelect } = state;
  const handleLangChange = (value) => {
    setState({
      langSelect: value,
    });
    handleChangeLang(value);
  };

  return (
    <div className={elements('selects')}>
      <div className={elements('wrap-select')}>
        <div className={elements('text')}><IntlMessages id="textFormat.textFormat" /></div>
        <Select
          className={elements('select-paragraph')}
          placeholder="Paragraph"
          onChange={onChange}
          value={blockType}
          defaultValue="Normal"
        >
          <Option value="Normal"><IntlMessages id="textFormat.normal" /></Option>
          <Option value="H1"><IntlMessages id="textFormat.headerOne" /></Option>
          <Option value="H2"><IntlMessages id="textFormat.headerTwo" /></Option>
        </Select>
      </div>
      <SelectorsTextFormat
        handleLangChange={handleLangChange}
        valueLang={langSelect}
        isDisableLanguage={isDisableLanguage}
      />
    </div>
  );
};

export default HeaderSelector;
