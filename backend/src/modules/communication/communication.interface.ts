import { CommunicationDialog } from './communication-dialog.entity';
import { Course } from '../../entity/Course';
import { User } from '../../entity/User';

export interface ISendMessage {
  message: string;
  closeDialog: boolean;
}

export interface ISendMessageData {
  user: User;
  dialog: CommunicationDialog;
  sendMessage: ISendMessage;
  attachment: any;
  isAbortDialog?: boolean;
}

export interface ICreateCommunication {
  title: string;
  course: Course;
  user: User;
  tutor: User;
  createdAt: Date;
  updatedAt: Date;
  communicationDialog: CommunicationDialog[];
}
