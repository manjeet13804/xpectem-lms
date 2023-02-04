import { NotificationType } from './notification.entity';

export interface INotification {
  heading: string;
  message: string;
  type: NotificationType;
}

export interface IPayloadVerify {
  token: string;
}

export interface IPayloadDeleteNotification {
  token: string;
  notifyIds: number[];
}
