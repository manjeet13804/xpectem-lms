import React, {Node} from 'react';
import { bemlds } from 'utils';
import './styles.scss';
import { Icon } from 'antd';
import { NotificationsTypes } from '../../../models';

const b = bemlds('notification-icon');

type PropsType = {
  notificationType: NotificationsTypes,
};

const NotificationTypeElement = (props: PropsType): Node => {
  const { notificationType } = props;

  const getTypeIcon = () => {
    switch (notificationType) {
      case NotificationsTypes.Event:
        return 'message';
      case NotificationsTypes.SystemNotification:
        return 'setting';
      case NotificationsTypes.News:
        return 'file-text';
      case NotificationsTypes.ImportInformation:
        return 'warning';
      case NotificationsTypes.Reminder:
        return 'bell';
      default: return 'exclamation-circle';
    }
  };

  return (
    <div className={b()}>
      <Icon type={getTypeIcon()} />
    </div>
  );
};

export default NotificationTypeElement;
