import { User } from './../../../entity/User';

export interface ICreateAdmin {
  firstName: string;
  lastName: string;
  email: string[];
  phone?: string[];
  language: number;
  notifyEmail: boolean;
  notifySms: boolean;
  groups?: number[];
  organisations?: number[];
  lmsGroup?: number;
  avatar?: string;
  user: User;
}

export interface IUpdateAdmin {
  firstName?: string;
  lastName?: string;
  email?: string[];
  phone?: string[];
  language?: number;
  notifyEmail?: boolean;
  notifySms?: boolean;
  avatar?: string;
  organisations?: number[];
  groups?: number[];
  user: User;
}
