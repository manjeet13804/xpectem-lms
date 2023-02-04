import React, { useState, useEffect } from 'react';
import { Slider, Checkbox } from 'antd';
import PropTypes from 'prop-types';

import { CloseIcon, DefaultButton } from 'components';
import IntlMessages from 'components/utility/intlMessages';
import { bemlds } from 'utils';
import RelativeTimeWrapper from './relativeTime.style';

const rt = bemlds('relative-time');
const checkbox = bemlds('ant-checkbox-wrapper');
const rangebox = bemlds('ant-slider');

const RelativeTime = (props) => {
  const { handleRelativeTime, reset } = props;

  const marksPersents = {
    0: 1,
    100: 100,
  };
  const marksDays = {
    0: 1,
    100: 10,
  };

  const [isClose, setClose] = useState(false);
  const [isPersents, setPersents] = useState(false);
  const [isDays, setDays] = useState(false);
  const [rangePercents, setRangePercents] = useState(50);
  const [rangeDays, setRangeDays] = useState(5);

  useEffect(() => {
    handleRelativeTime(isPersents, isDays, rangePercents, rangeDays);
  }, [isPersents, isDays, rangePercents, rangeDays]);

  useEffect(() => {
    if (reset) {
      setPersents(false);
      setDays(false);
      setRangePercents(50);
      setRangeDays(5);
    }
  }, [reset]);

  return (
    <RelativeTimeWrapper>
      <section>
        {!isClose && (
          <DefaultButton
            onClick={(() => setClose(true))}
            textId="notifications.buttonSchedule"
          />
        )}
        <div className={rt('content', { close: isClose })}>
          <div className={rt('wrapper')}>
            <div
              role="button"
              className={rt('close-wrap')}
              onClick={() => setClose(false)}
              tabIndex="0"
            >
              <CloseIcon />
            </div>
            <div className={rt('title')}>
              <IntlMessages id="notifications.reletiveTime" />
            </div>
            <div className={rt('item-wrap')}>
              <div className={rt('item-wrap-setting')}>
                <Checkbox
                  className={checkbox()}
                  checked={isPersents}
                  onChange={() => {
                    setPersents(state => !state);
                    setDays(false);
                  }}
                >
                  <IntlMessages id="notifications.percent" />
                </Checkbox>
                <Slider
                  marks={marksPersents}
                  min={marksPersents[0]}
                  max={marksPersents[100]}
                  onChange={value => setRangePercents(value)}
                  value={rangePercents}
                  tooltipVisible
                  className={rangebox()}
                  disabled={!isPersents || isDays}
                />
              </div>
              <div className={rt('item-wrap-info')}>
                <IntlMessages id="notifications.maxValuePercent" />
                <div className={rt('item-wrap-numbers')}>
                  {String(marksPersents[100])}
                </div>
              </div>
            </div>
            <div className={rt('item-wrap')}>
              <div className={rt('item-wrap-setting')}>
                <Checkbox
                  className={checkbox()}
                  checked={isDays}
                  onChange={() => {
                    setDays(state => !state);
                    setPersents(false);
                  }}
                >
                  <IntlMessages id="notifications.day" />
                </Checkbox>
                <Slider
                  marks={marksDays}
                  min={marksDays[0]}
                  max={marksDays[100]}
                  onChange={value => setRangeDays(value)}
                  value={rangeDays}
                  tooltipVisible
                  className={rangebox()}
                  disabled={!isDays || isPersents}
                />
              </div>
              <div className={rt('item-wrap-info')}>
                <IntlMessages id="notifications.maxValueDay" />
                <div className={rt('item-wrap-numbers')}>
                  {String(marksDays[100])}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </RelativeTimeWrapper>
  );
};
RelativeTime.defaultProps = {
  reset: false,
};

RelativeTime.propTypes = {
  handleRelativeTime: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

export default RelativeTime;
