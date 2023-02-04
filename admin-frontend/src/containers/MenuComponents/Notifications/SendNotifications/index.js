import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { Formik } from 'formik';
import _ from 'lodash';
import {
  DefaultButton,
  CustomTextInput,
  LayoutContent,
  IntlMessages,
  Banner,
  SearchSvg,
  TextFormat,
} from 'components';
import {
  PLACEHOLDER,
  SEND_NOTIFICATION_TYPE,
  SEND_NOTIFICATIONS,
  REMINDER_NOTIFICATIONS,
} from 'constants/constants';
import {
  SEND_NOTIFICATIONS_SCHEMA,
} from 'constants/validationShema/notifications';
import { bemlds } from 'utils';
import actionsNotifications from 'redux/notifications/actions';
import actionsStudents from 'redux/students/actions';
import qs from 'qs';
import SendNotificationWrapper from './sendNotifications.style';
import { CourseItem } from '../../../../components';
import { getSearchCoursesFp } from '../../../../selectors';

const { Option } = Select;
const page = bemlds('page');
const select = bemlds('ant-select');

const {
  typeHeader,
  selectNotificationType,
  courseSearchTitle,
} = PLACEHOLDER;

const SendNotification = (props) => {
  const {
    history,
    targetType,
    sendNotifications,
    selectedCourses,
    selectedLmsGroup,
    selectedOrg,
    selectedGroup,
    searchCourseStudents,
    searchCoursesData,
    setCurrentCourseStudents,
  } = props;

  useEffect(() => {
    !targetType && history.push('/notifications/select');
  }, []);

  const goBack = () => {
    history.push('/notifications/select');
  };

  const showFindCourses = useMemo(() => targetType === SEND_NOTIFICATIONS.COURSE_CREATORS
    || targetType === SEND_NOTIFICATIONS.STUDENTS
    || targetType === SEND_NOTIFICATIONS.TUTORS, [targetType]);

  const searchDebounce = _.debounce(searchCourseStudents, 350);

  const handleSearchCourse = ({ target: { value } }) => {
    const query = _.pickBy({
      title: value.trim(),
      isOnlyPublished: true,
    }, _.identity);
    searchDebounce(qs.stringify(query));
  };

  const selectRequiredParams = () => {
    if (selectedGroup) {
      return { groupId: selectedGroup };
    }
    if (selectedOrg) {
      return { organisationId: selectedOrg };
    }
    if (selectedLmsGroup) {
      return { lmsGroupId: selectedLmsGroup };
    }
  };

  const handleSubmitNotification = (values) => {
    const {
      notificationType,
      reminderType,
      header,
      translations,
    } = values;

    const body = _.pickBy({
      notificationType,
      reminderType,
      targetType,
      translations,
      header,
      coursesIds: selectedCourses.map(item => item.id),
      ...selectRequiredParams(),
    }, _.identity);
    sendNotifications(body);
  };

  return (
    <LayoutContent>
      <SendNotificationWrapper>
        <Banner title={<IntlMessages id="notifications.sendNotifications" />} />
        <div className={page('event-notification')}>
          <div className={page('title')}>
            <IntlMessages id="notifications.event" />
            {targetType}
          </div>
          <Formik
            initialValues={{
              notificationType: '',
              reminderType: '',
              header: '',
              translations: [],
            }}
            validationSchema={SEND_NOTIFICATIONS_SCHEMA}
            onSubmit={(values, actions) => {
              handleSubmitNotification(values);
              actions.resetForm({});
            }}
            render={({
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              values,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={page('select-wrap')}>
                  <div className={page('select-wrap-title')}>
                    <IntlMessages id="notifications.type" />
                  </div>
                  <Select
                    allowClear
                    showSearch
                    className={select({ error: errors.notificationType })}
                    onChange={(value) => {
                      setFieldValue('notificationType', value);
                    }}
                    placeholder={selectNotificationType}
                    optionFilterProp="children"
                    type="notificationType"
                    value={values.notificationType}
                    filterOption={(input, { props: { children } }) => children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {SEND_NOTIFICATION_TYPE.map(({ title, value }) => (
                      <Option
                        key={value}
                        value={value}
                      >
                        {title}
                      </Option>
                    ))}
                  </Select>
                  {errors.notificationType
                  && <p className={select('validErr')}>{errors.notificationType}</p>}
                </div>
                {values.notificationType === 'reminder'
                && (
                <div className={page('select-wrap')}>
                  <div className={page('select-wrap-title')}>
                    <IntlMessages id="notifications.sendTo" />
                  </div>
                  <Select
                    allowClear
                    showSearch
                    onChange={(value) => {
                      setFieldValue('reminderType', value);
                    }}
                    placeholder={selectNotificationType}
                    defaultValue={REMINDER_NOTIFICATIONS[0].title}
                    optionFilterProp="children"
                    filterOption={(input, { props: { children } }) => children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled={!!(values.sendToType)}
                  >
                    {REMINDER_NOTIFICATIONS.map(({ title, value }) => (
                      <Option
                        key={value}
                        value={value}
                      >
                        {title}
                      </Option>
                    ))}
                  </Select>
                </div>
                )
                }
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
                {showFindCourses
                  && (
                  <div>
                    <div className={page('search-title')}>
                      <IntlMessages id="students.searchTitle" />
                    </div>
                    <div className={page('search')}>
                      <SearchSvg />
                      <input
                        className={page('search-input')}
                        type="text"
                        name="searchValue"
                        placeholder={courseSearchTitle}
                        onChange={(e) => {
                          handleSearchCourse(e);
                          handleChange(e);
                        }}
                        value={values.LMSGroup}
                      />
                    </div>
                    {searchCoursesData && searchCoursesData.map(item => (
                      <CourseItem
                        key={item.id}
                        item={item}
                        isHideDate
                        onChangeCheckbox={() => setCurrentCourseStudents(item.id)}
                      />
                    ))}
                  </div>
                  )
                }
                <div className={page('button-wrap')}>
                  <DefaultButton
                    textId="notifications.button"
                    isSubmit
                    disabled={!isValid || !dirty}
                  />
                  <DefaultButton
                    textId="group.importGoBack"
                    onClick={goBack}
                  />
                </div>
              </form>
            )}
          />
        </div>
      </SendNotificationWrapper>
    </LayoutContent>
  );
};

const mapStateToProps = state => ({
  selectedLmsGroup: state.searchLmsGroup.selectedLmsGroupId,
  selectedOrg: state.searchOrganisations.selectedOrganisationId,
  selectedGroup: state.searchGroup.selectedGroupId,
  selectedCourses: state.students.selectedCourses,
  targetType: state.notifications.targetType,
  user: state.Auth,
  searchCoursesData: getSearchCoursesFp(state),
});

const mapDispatchToProps = dispatch => ({
  sendNotifications: body => dispatch(actionsNotifications.sendNotifications(body)),
  searchCourseStudents: query => dispatch(actionsStudents.searchCourseStudents(query)),
  setCurrentCourseStudents: id => dispatch(actionsStudents.setCurrentCourseStudents(id)),
});

SendNotification.defaultProps = {
  history: {},
  targetType: '',
  selectedLmsGroup: '',
  selectedOrg: '',
  selectedGroup: '',
  searchCoursesData: [],
  selectedCourses: [],
  searchCourseStudents: () => null,
  sendNotifications: () => null,
  setCurrentCourseStudents: () => null,
};

SendNotification.propTypes = {
  history: PropTypes.object,
  targetType: PropTypes.string,
  selectedLmsGroup: PropTypes.string,
  selectedOrg: PropTypes.string,
  selectedGroup: PropTypes.string,
  searchCoursesData: PropTypes.array,
  selectedCourses: PropTypes.array,
  searchCourseStudents: PropTypes.func,
  sendNotifications: PropTypes.func,
  setCurrentCourseStudents: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendNotification);
