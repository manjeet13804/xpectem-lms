import { UserPhone } from '../../../entity/UserPhone';

export interface IPhoneToSave {
  readonly phoneToAdd: UserPhone[];
  readonly phoneToDelete: number[];
}

export interface IExportTemplate {
  First_name: string;
  Last_name: string;
  Email: string[];
  Phone: string[];
  Street_address: string;
  ZIP_Code: string;
  City: string;
  Identifier_ID: string;
  Language: string;
  Notification_email: boolean;
  Notification_sms: boolean;
  Avatar_uri: string;
  Background_uri: string;
}
