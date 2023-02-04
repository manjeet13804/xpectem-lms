import React from 'react';
import { bemlds } from 'utils';
import { Icon } from 'antd';
import { NOTIFICATION_TYPES } from 'constants/constants';
import NotificationTypeItemWrapper from "./notificationTyprElement.styles";

const b = bemlds('notification-icon');

type PropsType = {
  notificationType: NOTIFICATION_TYPES,
};

const NotificationTypeElement = (props: PropsType) => {
  const { notificationType } = props;

  const getTypeIcon = () => {
    switch (notificationType) {
      case NOTIFICATION_TYPES.Event:
        return 'message';
      case NOTIFICATION_TYPES.SystemNotification:
        return 'setting';
      case NOTIFICATION_TYPES.News:
        return 'file-text';
      case NOTIFICATION_TYPES.ImportInformation:
        return 'warning';
      case NOTIFICATION_TYPES.Reminder:
        return 'bell';
      default: return 'exclamation-circle';
    }
  };

  return (
    <NotificationTypeItemWrapper>
      <div className={b()}>
        <Icon type={getTypeIcon()} />
      </div>
    </NotificationTypeItemWrapper>
  );
};

export default NotificationTypeElement;
