import React from 'react';
import { RenderInput, RenderSelect, RenderDate } from 'components/formElements';
import constants from 'helpers/constants';

const { icoCurrency: { btc, usd, eth } } = constants;

const onChangeCurrency = async (event, onChange, validateFieldsAndScroll) => {
  await onChange(event);
  validateFieldsAndScroll();
};

const IcoBlock = (editProps, { getFieldsValue, validateFieldsAndScroll }, dateError) => {
  const { icoCurrency } = getFieldsValue();
  const { onChange } = editProps;

  return (
    <React.Fragment>
      <RenderDate
        title="ICO Start"
        itemName="icoStartDate"
        error={dateError}
        {...editProps}
      />
      <RenderDate title="ICO End" itemName="icoEndDate" {...editProps} />
      <RenderSelect
        title="ICO currency"
        itemName="icoCurrency"
        optionName="icoValues"
        required={false}
        {...editProps}
        defaultValue={1}
        onChange={event => onChangeCurrency(event, onChange, validateFieldsAndScroll)}
      />

      <div className="currencyWrap">
        <RenderInput
          title="ICO BTC Price"
          disabled={icoCurrency && icoCurrency !== btc}
          required={!icoCurrency || icoCurrency === btc}
          itemName="icoBtcPrice"
          isNumber
          {...editProps}
        />
        <RenderInput
          title="ICO USD Price"
          disabled={icoCurrency !== usd}
          required={!icoCurrency || icoCurrency === usd}
          itemName="icoUsdPrice"
          isNumber
          {...editProps}
        />
        <RenderInput
          title="ICO ETH Price"
          disabled={icoCurrency !== eth}
          required={!icoCurrency || icoCurrency === eth}
          itemName="icoEthPrice"
          isNumber
          {...editProps}
        />
      </div>
    </React.Fragment>
  );
};

export default IcoBlock;
