import React from 'react';
import { Select } from 'antd';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';

const { Option } = Select;
const elements = bemlds('elements');

const HeaderSelector = ({
  onChange,
  currentState: { blockType },
}) => (
  <div className={elements('selects')}>
    <div className={elements('wrap-select')}>
      <div className={elements('text')}><IntlMessages id="textFormat.textFormat" /></div>
      <Select
        className={elements('select-paragraph')}
        placeholder="Paragraph"
        onChange={e => onChange(e)}
        value={blockType}
        defaultValue="Normal"
      >
        <Option value="Normal"><IntlMessages id="textFormat.normal" /></Option>
        <Option value="H1"><IntlMessages id="textFormat.headerOne" /></Option>
        <Option value="H2"><IntlMessages id="textFormat.headerTwo" /></Option>
      </Select>
    </div>
  </div>
);

export default HeaderSelector;
