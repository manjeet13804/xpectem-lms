import { Group } from '../../../entity/Group';
import { Language } from '../../../entity/Language';
import { LmsGroup } from '../../../entity/LmsGroup';
import { Organisation } from '../../../entity/Organisation';
import { UserRole } from '../../../entity/User';
import { UserEmail } from '../../../entity/UserEmail';
import { UserPhone } from '../../../entity/UserPhone';
import { UserLog } from './../../../entity/UserLog';

export interface IUser {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password?: string;
  readonly phone?: string;
  readonly postalCode?: string;
  readonly postalAddress?: string;
  readonly streetAddress?: string;
  readonly roles: UserRole[];
  readonly groups?: number[];
}

export interface ICreateUser {
  readonly email?: UserEmail[];
  readonly phone?: UserPhone[];
  readonly password?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar?: string;
  readonly background?: string;
  readonly language?: Language;
  readonly postalCode?: string;
  readonly postalAddress?: string;
  readonly streetAddress?: string;
  readonly roles: UserRole[];
  readonly identifierId?: string;
  readonly notifyEmail?: boolean;
  readonly notifySms?: boolean;
  readonly groups?: Group[];
  readonly organisations?: Organisation[];
  readonly lmsGroups?: LmsGroup[];
  readonly userLog: UserLog;
}
