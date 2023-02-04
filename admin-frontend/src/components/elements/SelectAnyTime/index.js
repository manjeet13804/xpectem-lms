import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import IntlMessages from 'components/utility/intlMessages';
import {
  ArrowUp,
  CheckSelectSvg,
  DateStartEnd,
} from 'components';
import { bemlds } from 'utils';
import SelectAnyTimeWrapper from './selectAnyTime.style';

const arrTime = [
  { title: 'Any time', value: 1 },
  { title: 'Past 24 hour', value: 2 },
  { title: 'Past week', value: 3 },
  { title: 'Past month', value: 4 },
  { title: 'Past year', value: 5 },
];
const arrLang = [
  { title: 'English', value: 1 },
  { title: 'Svenska', value: 2 },
  { title: 'Norsk', value: 3 },
];
const s = bemlds('select');

const SelectAnyTime = (props) => {
  const {
    status,
    name,
    handleDataSave,
    handleCustomRange,
    setFieldValue,
    currentValue,
    disabled,
  } = props;

  const [openSelect, setOpenSelect] = useState(false);
  const [valueOption, setValueOption] = useState(1);
  const [isCustomRange, setCustomRange] = useState(false);

  if (currentValue && currentValue !== valueOption) {
    setValueOption(currentValue);
  }
  const currentListOptions = status ? arrTime : arrLang;
  const { title } = currentListOptions.find(({ value }) => value === valueOption);

  useEffect(() => {
    handleDataSave(title, name, setFieldValue);
  }, []);


  const handleClick = () => {
    if (disabled) return;
    setOpenSelect(state => !state);
    setCustomRange(false);
  };


  const handleSaveDate = (id, date) => {
    setOpenSelect(false);
    handleCustomRange(date);
    setValueOption(1);
  };

  const generateOption = () => {
    const currentOptions = currentListOptions.map((item) => {
      const { title: titleOption, value } = item;
      return (
        <div
          role="button"
          tabIndex="0"
          key={titleOption}
          className={s('item')}
          onClick={() => {
            setValueOption(value);
            setOpenSelect(false);
            handleDataSave(
              titleOption,
              name,
              setFieldValue,
            );
          }}
        >
          <div className={s('item-icon')}>
            {(value === valueOption) ? <CheckSelectSvg /> : null}
          </div>
          <div className={s('item-title')}>{titleOption}</div>
        </div>
      );
    });
    return currentOptions;
  };

  return (
    <SelectAnyTimeWrapper>
      <section
        className={s()}
      >
        <div
          role="button"
          tabIndex="0"
          className={s('main')}
          onClick={handleClick}
        >
          <div className={s('title')}>
            {title}
          </div>
          <div className={s('icon')}>
            <ArrowUp className={s('icon', { down: openSelect })} />
          </div>
        </div>
        <div
          className={s('block', { closed: !openSelect })}
        >
          {openSelect && generateOption()}
          {openSelect && handleCustomRange && (
            <div
              role="button"
              tabIndex="0"
              className={s('custom-range')}
              onClick={() => setCustomRange(true)}
            >
              {isCustomRange
                ? (
                  <DateStartEnd
                    onlyBegin
                    isOpenTitle={false}
                    handleSaveDate={handleSaveDate}
                  />
                )
                : <IntlMessages id="selectAnyTime.customRange" />}
            </div>
          )}
        </div>
      </section>
    </SelectAnyTimeWrapper>
  );
};

SelectAnyTime.defaultProps = {
  name: '',
  status: false,
  setFieldValue: null,
  currentValue: null,
  handleCustomRange: null,
  disabled: false,
};

SelectAnyTime.propTypes = {
  name: PropTypes.string,
  status: PropTypes.bool,
  handleDataSave: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func,
  currentValue: PropTypes.number,
  handleCustomRange: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SelectAnyTime;
