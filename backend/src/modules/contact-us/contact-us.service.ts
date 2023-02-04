import { MailerService } from '@nest-modules/mailer';
import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as config from 'config';
import { isEmpty } from 'ramda';
import { Course } from '../../entity/Course';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

import { UploadService } from '../upload/upload.service';
import { UserService } from '../user/user.service';
import { MyCourseService } from './../my-course/my-course.service';
import { ContactUsAttachment } from './contact-us-attachment.entity';
import { ContactUs } from './contact-us.entity';
import { IAttachmentData, ICreateContactUsAttachment, ISendMessageData } from './contact-us.interface';

const ATTACHMENT_MAX_SIZE: number = config.get('communication.attachmentMaxSize');
const ATTACHMENT_MIMETYPE: string[] = config.get('communication.attachmentMimetype');
const SUPPORTING_EMAIL: string = config.get('contactUs.supportingEmail');

@Injectable()
export class ContactUsService {

  private entityManager = this.connection.createEntityManager();

  public constructor(
    private readonly connection: Connection,
    private readonly mailerService: MailerService,
    private readonly uploadService: UploadService,
    private readonly userService: UserService,
    private readonly myCourseService: MyCourseService,
  ) { }

  public async sendMessage({
    attachment,
    sendMessageData,
    userId,
  }: ISendMessageData): Promise<HttpStatus> {

    try {
      const {
        message,
        courseId,
      } = sendMessageData;

      const user = await this.userService.getOneById(userId);

      if (!user) {
        throw new NotFoundException('The user was not found');
      }

      const fixedIdOfCourse = courseId === 'general' ? 0 : Number(courseId);
      const course = await this.connection.getRepository(Course).findOne(fixedIdOfCourse);
      if (!course && courseId !== 'general') {
        throw new NotFoundException('The course was not found');
      }

      const contactUs = new ContactUs({
        message,
        user,
        course,
      });
      const contactUsAttachmentData = await this.createContactUsAttachment(attachment, contactUs);
      const {
        attachmentData,
        contactUsAttachments,
      } = contactUsAttachmentData;

      await this.entityManager.save([
        contactUs,
        ...contactUsAttachments,
      ]);

      const {
        firstName,
        lastName,
      } = user;

      const title = _.get(course, 'title', '');

      try {
        await this.mailerService.sendMail({
          template: 'contact-us',
          subject: 'Contact us',
          to: SUPPORTING_EMAIL,
          context: {
            message,
            firstName,
            lastName,
            title,
          },
          attachments: attachmentData,
        });
      } catch (e) {
        Logger.error(e);
      }

      return (HttpStatus.OK);
    } catch (e) {
      Logger.error(e);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async createContactUsAttachment(attachment: any, contactUs: ContactUs): Promise<ICreateContactUsAttachment> {

    if (isEmpty(attachment)) {
      return {
        attachmentData: [],
        contactUsAttachments: [],
      };
    }

    await this.uploadService.isFileValid({
      file: attachment.attachment,
      maxSize: ATTACHMENT_MAX_SIZE,
      availableMimetype: ATTACHMENT_MIMETYPE,
    });

    const attachmentData: IAttachmentData[] = await Promise.all(attachment.attachment.map(async (item) => {
      const uploadResult = await this.uploadService.upload(item);

      return {
        path: uploadResult.url,
        filename: item.originalname,
      };
    }));

    const contactUsAttachments = attachmentData.map(({ path }) => {
      return new ContactUsAttachment({
        contactUs,
        uri: path,
      });
    });

    return {
      attachmentData,
      contactUsAttachments,
    };

  }

}
