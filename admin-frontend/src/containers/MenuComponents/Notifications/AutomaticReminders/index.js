import React, { useEffect } from 'react';
import { Icon } from 'antd';
import { bemlds } from 'utils';
import {
  AUTOMATIC_REMINDERS_SCHEMA,
} from 'constants/validationShema/notifications';
import {
  Banner,
  IntlMessages,
  LayoutContent,
  SearchSvg,
  CustomTextInput,
  CloseIcon,
  DefaultButton,
  Checkbox,
} from 'components';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import notificationActions from 'redux/notifications/actions';
import {
  getFoundListLMSGroupFp,
  getCurrentLMSGroupFp,
} from 'selectors';
import {
  PLACEHOLDER,
} from 'constants/constants';
import URLS from 'redux/urls';
import _ from 'lodash';
import qs from 'qs';
import { NOTIFICATIONS } from 'constants/routes';
import AutomaticRemindersWrapper from './automaticReminders.style';

const page = bemlds('page');

const { addAutomaticReminders } = NOTIFICATIONS;

const {
  LMSGroupPlaceholder,
} = PLACEHOLDER;

const b = bemlds('table-report');

const AutomaticReminders = (props) => {
  const {
    foundListLMSGroup,
    currentLMSGroup,
    setFoundListLMSGroup,
    setCurrentLMSGroup,
    clear,
    getAutomaticReminders,
    sendAutomaticReminders,
    automaticReminders,
    deleteAutomaticReminders,
    enableAutomaticReminders,
    history,
  } = props;

  const handleAddReminderNotification = (id) => {
    const query = {
      lmsGroupId: id,
    };
    getAutomaticReminders(qs.stringify(query));
  };

  useEffect(() => clear, []);

  const handleSearchLMSGroup = ({ target: { value } }) => {
    const query = _.pickBy({
      name: value.trim(),
    }, _.identity);
    const setFoundListDebounce = _.debounce(setFoundListLMSGroup, 400);
    setFoundListDebounce(qs.stringify(query));
  };

  const handleSubmitReminder = (values) => {
    const { message, enable } = values;
    const body = _.pickBy({
      lmsGroupId: currentLMSGroup ? currentLMSGroup.id : currentLMSGroup,
      message,
      enable,
    }, _.identity);
    sendAutomaticReminders(body);
    setCurrentLMSGroup(null);
  };

  const currentLMSGroupItem = () => {
    const { name = '' } = currentLMSGroup;
    return (
      <div className={page('current-item')}>
        <div className={page('current-item-title')}>
          <IntlMessages id="notifications.LMSGroup" />
        </div>
        {name}
        <div
          tabIndex="0"
          role="button"
          onClick={() => setCurrentLMSGroup(null)}
          className={page('current-item-close')}
        >
          <CloseIcon className={page('current-item-svg')} />
        </div>
      </div>
    );
  };

  return (
    <LayoutContent>
      <AutomaticRemindersWrapper>
        <Banner title={<IntlMessages id="notifications.automaticReminders" />} />
        <section className={page()}>
          <div className={page('description')}>
            <IntlMessages id="notifications.descriptionCreate" />
          </div>
          <div className={page('title')}>
            <IntlMessages id="notifications.message" />
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              LMSGroup: '',
              lmsGroupId: undefined,
            }}
            validationSchema={AUTOMATIC_REMINDERS_SCHEMA}
            onSubmit={(values, actions) => {
              handleSubmitReminder(values);
              actions.resetForm();
            }}
            render={({
              handleChange,
              handleSubmit,
              errors,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                {!currentLMSGroup ? (
                  <div className={page('search-wrap')}>
                    <div className={page('search-wrap-title')}>
                      <IntlMessages id="lmsGroups.searchTitle" />
                    </div>
                    <SearchSvg className={page('search-wrap-icon')} />
                    <CustomTextInput
                      className={page('search-wrap-input')}
                      type="text"
                      value={values.LMSGroup || ''}
                      name="LMSGroup"
                      placeholder={LMSGroupPlaceholder}
                      onChange={(e) => {
                        handleSearchLMSGroup(e);
                        handleChange(e);
                      }}
                    />
                    {!!(foundListLMSGroup.length) && !errors.LMSGroup && (
                      <div className={page('search-wrap-data')}>
                        {foundListLMSGroup.map(({ id, name }) => (
                          <div
                            role="button"
                            tabIndex="0"
                            key={id}
                            className={page('search-wrap-item')}
                            onClick={() => {
                              setCurrentLMSGroup({ id, name });
                              handleAddReminderNotification(id);
                            }}
                          >
                            {name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {currentLMSGroupItem()}
                    <DefaultButton
                      textId="notifications.newAutomaticReminder"
                      onClick={() => history.push(
                        addAutomaticReminders,
                        { lmsGroupId: currentLMSGroup.id },
                      )}
                    />
                  </div>
                )}
              </form>
            )}
          />
          {Boolean(automaticReminders.length && currentLMSGroup) && (
            <div className={b('table')}>
              <div className={b('header')}>
                <div className={b('column')}>
                  percent for course time
                </div>
                <div className={b('columnActions')}>
                  edit
                </div>
                <div className={b('columnActions')}>
                  Ative
                </div>
                <div className={b('columnActions')}>
                  delete
                </div>
              </div>
              {automaticReminders.length && automaticReminders.map(automaticReminder => (
                <div className={b('row')}>
                  <div className={b('column')}>
                    {automaticReminder.percent}
                    %
                  </div>
                  <div className={b('columnActions')}>
                    <Icon
                      type="edit"
                      className="isoActionsIcon"
                      onClick={() => history.push(
                        URLS.editAutomaticReminders(automaticReminder.id),
                        {
                          id: automaticReminder.id,
                          lmsGroupId: currentLMSGroup.id,
                        },
                      )}
                    />
                  </div>
                  <div className={b('columnActions')}>
                    <Checkbox
                      handleCheck={() => enableAutomaticReminders({
                        id: automaticReminder.id,
                        enable: !automaticReminder.enable,
                      })}
                      name="enable"
                      title={<IntlMessages id="lmsGroups.checkActive" />}
                      value={automaticReminder.enable}
                    />
                  </div>
                  <div className={b('columnActions')}>
                    <Icon
                      type="delete"
                      className="isoActionsIcon"
                      onClick={() => deleteAutomaticReminders(automaticReminder.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </AutomaticRemindersWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = (state) => {
  const foundListLMSGroup = getFoundListLMSGroupFp(state);
  const currentLMSGroup = getCurrentLMSGroupFp(state);
  const isEnable = state.notifications.enable;
  const automaticRemindersMessage = state.notifications.message;
  const { automaticReminders } = state.notifications;
  const { isLoading } = state.notifications.isLoading;

  return {
    foundListLMSGroup,
    currentLMSGroup,
    isEnable,
    isLoading,
    automaticRemindersMessage,
    automaticReminders,
  };
};

const mapDispatchToProps = dispatch => ({
  clear: () => dispatch(notificationActions.setInitStateNotifications()),
  setFoundListLMSGroup: text => dispatch(notificationActions.setFoundListLMSGroup(text)),
  setCurrentLMSGroup: (name, id) => dispatch(notificationActions.setCurrentLMSGroup(name, id)),
  createMessageNotification: () => dispatch(notificationActions.createMessageNotification()),
  getAutomaticReminders: id => dispatch(notificationActions.getAutomaticReminders(id)),
  sendAutomaticReminders: body => dispatch(notificationActions.sendAutomaticReminders(body)),
  deleteAutomaticReminders: id => dispatch(notificationActions.deleteAutomaticReminders(id)),
  enableAutomaticReminders: id => dispatch(notificationActions.enableAutomaticReminders(id)),
});

AutomaticReminders.defaultProps = {
  foundListLMSGroup: [],
  setFoundListLMSGroup: null,
  setCurrentLMSGroup: null,
  currentLMSGroup: null,
  clear: () => null,
  getAutomaticReminders: () => null,
  deleteAutomaticReminders: () => null,
  isLoading: false,
  automaticReminders: [],
  sendAutomaticReminders: () => null,
  enableAutomaticReminders: () => null,
  history: {
    push: null,
  },
};

AutomaticReminders.propTypes = {
  foundListLMSGroup: PropTypes.arrayOf(PropTypes.object),
  setFoundListLMSGroup: PropTypes.func,
  setCurrentLMSGroup: PropTypes.func,
  currentLMSGroup: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.objectOf(PropTypes.any),
  ]),
  clear: PropTypes.func,
  getAutomaticReminders: PropTypes.func,
  isLoading: PropTypes.bool,
  sendAutomaticReminders: PropTypes.func,
  deleteAutomaticReminders: PropTypes.func,
  enableAutomaticReminders: PropTypes.func,
  automaticReminders: PropTypes.array,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AutomaticReminders);
