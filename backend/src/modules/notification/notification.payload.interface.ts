import {User} from "../../entity/User";
import {AdminNotificationNormalTypeEnum} from "../admin-notification/enum/admin-notification-normal-type.enum";
import {EntityManager, Repository} from "typeorm";
import { Language } from "../../entity/Language";

export interface NotificationPayloadInterface {
  header: string;
  translations: {
    message: string,
    language: number,
  }[];
  users: User[];
  notificationType: AdminNotificationNormalTypeEnum;
  transactionEntityManager: EntityManager;
  languageRepository: Repository<Language>;
  initializerAdminId: number;
}

export interface ReminderNotificationPayloadInterface {
  message: string;
  heading: string;
  userId: number;
  id: number;
}
