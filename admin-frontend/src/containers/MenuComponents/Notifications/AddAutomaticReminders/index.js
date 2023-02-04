import React, { useEffect } from 'react';
import { bemlds } from 'utils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import notificationActions from 'redux/notifications/actions';
import {
  LayoutContent,
  CustomTextInput,
  TextFormat,
  DefaultButton,
  Checkbox,
  Banner,
} from 'components';
import { PLACEHOLDER } from 'constants/constants';
import { Slider, InputNumber } from 'antd';
import { Formik } from 'formik';
import IntlMessages from 'components/utility/intlMessages';
import Loader from 'components/utility/loader';
import { NOTIFICATIONS } from 'constants/routes';
import AddAutomaticRemindersWrapper from './addAutomaticReminders.style';

const page = bemlds('page');

const { automaticReminders } = NOTIFICATIONS;

const { typeHeader } = PLACEHOLDER;

const AddAutomaticReminders = (props) => {
  const {
    clear,
    history,
    getAutomaticReminderById,
    updateAutomaticReminders,
    sendAutomaticReminders,
    isLoadingReminder,
    automaticReminder,
  } = props;

  useEffect(() => {
    clear();
    if (history.location.state.id) {
      getAutomaticReminderById(history.location.state.id);
    }
  }, []);

  return (
    <LayoutContent>
      <AddAutomaticRemindersWrapper>
        <Banner title={<IntlMessages id="notifications.automaticReminders" />} />
        <div className={page('description')}>
          <IntlMessages id="notifications.descriptionCreate" />
        </div>
        <div className={page('title')}>
          <IntlMessages id="notifications.message" />
        </div>
        {isLoadingReminder ? <Loader /> : (
          <Formik
            initialValues={{
              header: automaticReminder.header,
              percent: automaticReminder.percent,
              translations: automaticReminder.translations,
              enable: automaticReminder.enable,
            }}
            onSubmit={(values, actions) => {
              const { lmsGroupId, id } = history.location.state;
              if (!id) {
                sendAutomaticReminders({ ...values, lmsGroupId });
              }
              if (id) {
                updateAutomaticReminders({ ...values, lmsGroupId }, id);
              }
              actions.resetForm();
              history.push(automaticReminders);
            }}
            render={({
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              values,
            }) => (
              <form onSubmit={handleSubmit} className={page()}>
                <div className={page('percent')}>
                  <Slider
                    min={1}
                    max={100}
                    onChange={value => setFieldValue('percent', value)}
                    name="percent"
                    value={typeof values.percent === 'number' ? values.percent : 0}
                  />
                  <InputNumber
                    min={1}
                    max={100}
                    style={{ margin: '0 16px' }}
                    name="percent"
                    value={values.percent}
                    onChange={value => setFieldValue('percent', value)}
                  />
                  %
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
                    error={errors.header}
                  />
                </div>
                <TextFormat
                  saveDescription={(json, name, languageId) => {
                    const language = languageId + 1;
                    const index = values.translations.findIndex(item => item.language === language);
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
                <Checkbox
                  handleCheck={() => setFieldValue('enable', !values.enable)}
                  name="enable"
                  title={<IntlMessages id="lmsGroups.checkActive" />}
                  value={values.enable}
                />
                <DefaultButton
                  textId="notifications.saveButton"
                  isSubmit
                />
              </form>
            )}
          />
        )}
      </AddAutomaticRemindersWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const { automaticReminder, isLoadingReminder } = state.notifications;

  return {
    automaticReminder,
    isLoadingReminder,
  };
};

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(notificationActions.setInitStateNotifications()),
  getAutomaticReminderById: id => dispatch(notificationActions.getAutomaticReminderById(id)),
  updateAutomaticReminders:
      (params, id) => dispatch(notificationActions.updateAutomaticReminders(params, id)),
  sendAutomaticReminders: params => dispatch(notificationActions.sendAutomaticReminders(params)),
});

AddAutomaticReminders.defaultProps = {
  clear: () => null,
  getAutomaticReminderById: () => null,
  updateAutomaticReminders: () => null,
  sendAutomaticReminders: () => null,
  isLoadingReminder: false,
  automaticReminder: {},
  history: {
    push: null,
  },
};

AddAutomaticReminders.propTypes = {
  clear: PropTypes.func,
  getAutomaticReminderById: PropTypes.func,
  updateAutomaticReminders: PropTypes.func,
  sendAutomaticReminders: PropTypes.func,
  isLoadingReminder: PropTypes.bool,
  automaticReminder: PropTypes.object,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAutomaticReminders);
