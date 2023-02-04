// @flow

const NotificationsTypes = {
  SystemNotification: 'system_information',
  News: 'news',
  Event: 'event',
  Information: 'information',
  ImportInformation: 'important_information',
  Reminder: 'reminder',
};

type NotificationType = {
  id: number,
  heading: string,
  message: string,
  type: $Values<NotificationsTypes>
};

export {
  NotificationsTypes,
  NotificationType,
};
