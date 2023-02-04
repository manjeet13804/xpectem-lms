import { User } from "../../entity/User";

export interface IRequest extends Request {
  user: User
}

export interface IImportUser {
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
  note?: string;
  user: User;
}

export interface ICourseInfo {
  id: number, 
  dateBegin: Date
}
