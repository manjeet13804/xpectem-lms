import { ContactUsAttachment } from './contact-us-attachment.entity';
import { ContactUsSendMessageDto } from './contact-us.dto';

export interface ISendMessageData {
  attachment: any;
  sendMessageData: ContactUsSendMessageDto;
  userId: number;
}

export interface IAttachmentData {
  path: string;
  filename: string;
}

export interface ICreateContactUsAttachment {
  attachmentData: IAttachmentData[];
  contactUsAttachments: ContactUsAttachment[];
}
