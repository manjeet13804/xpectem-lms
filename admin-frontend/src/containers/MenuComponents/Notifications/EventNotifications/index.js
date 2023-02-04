import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import _ from 'lodash';
import {
  Banner,
  DefaultButton,
  CustomTextInput,
  TextFormat,
} from 'components';
import {
  PLACEHOLDER,
  EVENT_NOTIFICATION_TYPE,
} from 'constants/constants';
import { bemlds } from 'utils';
import LayoutContent from 'components/utility/layoutContent';
import IntlMessages from 'components/utility/intlMessages';
import actionsNotifications from 'redux/notifications/actions';
import EventNotificationsWrapper from './eventNotifications.style';

const { Option } = Select;
const page = bemlds('page');
const select = bemlds('ant-select');

const EventNotifications = (props) => {
  const {
    createTriggerNotification,
    getEventNotifications,
    eventNotifications,
    isLoading,
  } = props;

  useEffect(() => {
    getEventNotifications();
  }, []);

  const {
    typeHeader,
    selectNotificationType,
  } = PLACEHOLDER;

  const handleSubmitEvent = (values) => {
    const {
      header,
      translations,
      type,
    } = values;
    const body = _.pickBy({
      type,
      translations,
      header,
    }, _.identity);
    if (type) {
      createTriggerNotification(body);
    }
  };

  return (
    <LayoutContent>
      <EventNotificationsWrapper>
        <Banner title={<IntlMessages id="notifications.banner" />} />
        <div className={page('event-notification')}>
          <div className={page('title')}>
            <IntlMessages id="notifications.event" />
          </div>
          {isLoading ? <Loader />
            : (
              <Formik
                initialValues={{
                  type: '',
                  header: '',
                  translations: [],
                }}
                onSubmit={(values) => {
                  handleSubmitEvent(values);
                }}
                render={({
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  errors,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={page('select-wrap')}>
                      <div className={page('select-wrap-title')}>
                        <IntlMessages id="notifications.type" />
                      </div>
                      <Select
                        allowClear
                        showSearch
                        className={select({ error: errors.type })}
                        onChange={(value) => {
                          const thisEventNotifications = eventNotifications
                            .find(item => item.type === value);
                          if (thisEventNotifications) {
                            setFieldValue('header', thisEventNotifications.heading);
                            setFieldValue('translations', thisEventNotifications.translations);
                          }
                          if (!thisEventNotifications) {
                            setFieldValue('header', '');
                            setFieldValue('translations', []);
                          }

                          setFieldValue('type', value);
                        }}
                        placeholder={selectNotificationType}
                        optionFilterProp="children"
                        filterOption={(input, { props: { children } }) => children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {EVENT_NOTIFICATION_TYPE.map(({ title, value }) => (
                          <Option
                            key={value}
                            value={value}
                          >
                            {title}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className={page('header-wrap')}>
                      <IntlMessages id="notifications.header" />
                      <CustomTextInput
                        className={page('input')}
                        type="text"
                        value={values.header}
                        name="header"
                        placeholder={typeHeader}
                        onChange={handleChange}
                      />
                    </div>
                    <TextFormat
                      saveDescription={(json, name, languageId) => {
                        const language = languageId + 1;
                        const index = values.translations
                          .findIndex(item => item.language === language);
                        if (index !== -1) {
                          values.translations[index].message = json;
                          setFieldValue('translations', values.translations);
                          return;
                        }
                        setFieldValue(
                          'translations',
                          [...values.translations, { message: json, language }],
                        );
                      }}
                      translations={values.translations}
                      name="message"
                      error={errors.message}
                    />
                    <div className={page('button-wrap')}>
                      <DefaultButton
                        textId="notifications.button"
                        isSubmit
                      />
                    </div>
                  </form>
                )}
              />
            )}
        </div>
      </EventNotificationsWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = state => ({
  eventNotifications: state.notifications.eventNotifications,
  isLoading: state.notifications.isLoading,
});

EventNotifications.defaultProps = {
  createTriggerNotification: () => null,
  getEventNotifications: () => null,
  isLoading: true,
  eventNotifications: [],
};

EventNotifications.propTypes = {
  createTriggerNotification: PropTypes.func,
  getEventNotifications: PropTypes.func,
  isLoading: PropTypes.bool,
  eventNotifications: PropTypes.array,
};

export default connect(mapStateToProps, actionsNotifications)(EventNotifications);
