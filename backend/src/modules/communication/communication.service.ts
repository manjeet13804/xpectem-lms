import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as config from 'config';
import * as _ from 'lodash';
import {isEmpty} from 'ramda';
import {Brackets, Connection} from 'typeorm';

import {UploadService} from '../upload/upload.service';
import {UserService} from '../user/user.service';
import {User, UserRole} from './../../entity/User';
import {CommunicationAttachment} from './communication-attachment.entity';
import {CommunicationDialog} from './communication-dialog.entity';
import {CommunicationMessage} from './communication-message.entity';
import {Communication} from './communication.entity';
import {ISendMessageData} from './communication.interface';
import {CourseStudent} from '../course/course-student.entity';
import {Course} from '../../entity/Course';
import {generate} from 'randomstring';
import {CommunicationDataDto, EditHeaderDto, ReassignHeaderDto} from './communication.dto';
import {AdminNotificationTriggersService} from '../admin-notification/admin-notification-triggers.service';
import {NotificationTriggerType} from '../admin-notification/entity/notification-triggers.entity';

const ATTACHMENT_MAX_SIZE: number = config.get('communication.attachmentMaxSize');
const ATTACHMENT_MIMETYPE: string[] = config.get('communication.attachmentMimetype');

@Injectable()
export class CommunicationService {
  private entityManager = this.connection.createEntityManager();

  public constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
  ) { }

  public async setMessageReadedInDialog(dialogId: number, user: User): Promise<HttpStatus.OK> {
    try {

      await this.connection
        .getRepository(CommunicationMessage)
        .createQueryBuilder('message')
        .update()
        .set({ isChecked: true })
        .where('author != :userId', { userId: user.id })
        .andWhere('communicationDialog = :dialogId', { dialogId })
        .execute()

      return HttpStatus.OK
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error set message as readed' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAllUserCommunication(user: User) {
    try {
      const {
        id,
      } = user;

      const getNewMessageCount = (subQuery) => {
        return subQuery
          .select('COUNT (message.id) as "newMessageCount", dialog.id')
          .from(CommunicationDialog, 'dialog')
          .leftJoin('dialog.author', 'dialogAuthor')
          .leftJoin('dialog.communicationMessage', 'message', 'message.isChecked = 0 and message.author != :studentInd', { studentInd: id })
          .where('dialogAuthor.id = :userId', { userId: id })
          .groupBy('dialog.id')
      };

      const query = await this.connection
        .getRepository(CommunicationDialog)
        .createQueryBuilder('dialog')
        .select('dialog.id', 'id')
        .leftJoin('dialog.communicationMessage', 'message')
        .leftJoin('dialog.course', 'course')
        .leftJoin('dialog.author', 'author')
        .innerJoin('course.students', 'students', 'students.user_id = :studentId', { studentId: id })
        .leftJoin(getNewMessageCount, 'newMessageCount', 'dialog.id = newMessageCount.id')
        .addSelect('dialog.heading', 'title')
        .addSelect('COUNT (message.id)', 'allMessageCount')
        .addSelect(`newMessageCount.newMessageCount`, 'newMessageCount')
        .addSelect('course.id', 'courseId')
        .addSelect('dialog.isClosed', 'isClosed')
        .addSelect('dialog.createdAt', 'createdAt')
        .where('author.id = :userId', { userId: id })

      return query
        .groupBy('dialog.id')
        .orderBy('dialog.createdAt', 'DESC')
        .getRawMany();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error searching course communication list' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUserDialogs(userId: number, courseId: number) {
    try {
      const newMessageCount = (subQuery) => {
        return subQuery
          .select('COUNT (DISTINCT (message.id))', 'message')
          .from(CommunicationMessage, 'message')
          .leftJoin('message.author', 'author')
          .where('message.isChecked = false')
          .andWhere('message.communicationDialog = dialog.id')
          .andWhere('author.id != :userId', { userId });
      };

      const allMesages = (subQuery) => {
        return subQuery
          .select('COUNT (DISTINCT (message.id))', 'message')
          .from(CommunicationMessage, 'message')
          .leftJoin('message.author', 'author')
          .andWhere('message.communicationDialog = dialog.id')
      };

      return await this.connection
          .getRepository(CommunicationDialog)
          .createQueryBuilder('dialog')
          .leftJoin('dialog.author', 'author')
          .select('dialog.id', 'id')
          .addSelect('dialog.heading', 'title')
          .addSelect('dialog.createdAt', 'createdAt')
          .addSelect(newMessageCount, 'newMessageCount')
          .addSelect('author.firstName', 'firstName')
          .addSelect('author.lastName', 'lastName')
          .addSelect('dialog.updatedAt', 'updatedAt')
          .addSelect(allMesages, 'messages')
          .addSelect('dialog.isClosed', 'isClosed')
          .where('dialog.course = :courseId', {courseId})
          .andWhere('dialog.author = :userId', {userId})
          .orderBy('dialog.updatedAt', 'ASC')
          .getRawMany();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error searching the list of course dialogs' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUserDialogMessage(courseId: number, dialogId: number): Promise<CommunicationMessage[]> {
    try {
      return this.connection
        .getRepository(CommunicationMessage)
        .createQueryBuilder('message')
        .leftJoinAndSelect('message.author', 'author')
        .leftJoinAndSelect('message.communicationAttachment', 'attachment')
        .leftJoin('message.communicationDialog', 'dialog')
        .where('dialog.id = :dialogId', { dialogId })
        .andWhere('dialog.course = :courseId', { courseId })
        .orderBy('message.createdAt', 'ASC')
        .getMany();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Dialog message search error' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async abortDialogFromAdmin(dialog: CommunicationDialog, userId: number): Promise<HttpStatus.OK> {
    try {
      const newDialog = new CommunicationDialog({ ...dialog })
      const user = await this.userService.getOneById(userId);
      const isAccepter = dialog.course.tutors.some(item => item.id === user.id)
      if (!user.roles.includes(UserRole.USER) && isAccepter) {
        newDialog.accepter = null

        await this.connection.manager.save(newDialog)

        return HttpStatus.OK
      }

      throw new HttpException({ error: 'Error aborting dialog' }, HttpStatus.BAD_REQUEST);
    } catch (e) {
      Logger.error(e)
      throw new HttpException({ error: 'Error aborting dialog' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async sendMessage({
    sendMessage,
    dialog,
    attachment,
    user,
  }: ISendMessageData) {
    try {

      const {
        message,
        closeDialog
      } = sendMessage;

      const {
        isClosed
      } = dialog

      if (isClosed) {
        throw new HttpException({ error: `You can't send message to this dialog` }, HttpStatus.BAD_REQUEST);
      }
      if (!dialog) {
        throw new HttpException({ error: 'The dialogue does not belong to the chosen course' }, HttpStatus.BAD_REQUEST);
      }

      const { id } = dialog;

      if (!user) {
        throw new NotFoundException('The user was not found');
      }

      const communicationMessage = new CommunicationMessage({
        message,
        author: user,
        communicationDialog: dialog,
        isChecked: false,
        isAdminChecked: false,
      });

      const isAccepter = dialog.course.tutors.some(item => item.id === user.id)
      const senderIsTutor = !user.roles.includes(UserRole.USER);

      if (senderIsTutor) {
        dialog.lastAnswerAdmin = user;
      }

      if (!user.roles.includes(UserRole.USER) && !dialog.accepter) {
        dialog.accepter = user
      }

      const messageSenderIsTutorAndAccepterOrNoAccepter = !user.roles.includes(UserRole.USER) && (isAccepter || !dialog.accepter);
      if (messageSenderIsTutorAndAccepterOrNoAccepter) {
        dialog.isClosed = closeDialog

        if (closeDialog) {
          dialog.accepter = null
        }
      }

      if (user.roles.includes(UserRole.TUTOR)) {
        await this.adminNotificationTriggersService.checkEvent({
          user,
          student: dialog.author,
          event: NotificationTriggerType.NEW_MESSAGE_TUTOR,
        });
      }

      const messageAttachment = await this.createCommunicationAttachment(attachment, communicationMessage);
      dialog.updatedAt = new Date();

      await this.entityManager.save([
        dialog,
        communicationMessage,
        ...messageAttachment,
      ]);

      return {
        ...communicationMessage, communicationAttachment: messageAttachment
      };
    } catch (e) {
      Logger.error(e);
      const error = _.get(e, 'message.error', null)
      throw new HttpException({ error: error || 'Error sending message' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async createDialog(courseId: number, heading: string, userId: number, message: string, attachment): Promise<CommunicationDialog> {
    try {
      const user = await this.userService.getOneById(userId);

      const dialog = new CommunicationDialog({
        heading,
        message,
        author: user,
        course: new Course({ id: courseId })
      });

      await this.connection.transaction(async (transactionEntityManager) => {
        const firstMessage = new CommunicationMessage({
          message,
          communicationDialog: dialog,
          author: user,
          isChecked: true,
        })
        await transactionEntityManager.save([dialog, firstMessage])
        if (!isEmpty(attachment)) {
          this.uploadService.isFileValid({
            file: attachment.attachment,
            maxSize: ATTACHMENT_MAX_SIZE,
            availableMimetype: ATTACHMENT_MIMETYPE,
          });

          const attachmentData: any = await Promise.all(attachment.attachment.map((item) => this.uploadService.upload(item)));

          const attachmentToSave = attachmentData.map(({ url, originalName }) => new CommunicationAttachment({
            originalName,
            uri: url,
            communicationDialog: dialog
          })
          );

          await transactionEntityManager.save(attachmentToSave)
        }
      })

      return dialog;
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error creating new dialog' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteDialog(dialogId: number, user: User): Promise<HttpStatus> {

    await this.entityManager.transaction(async (entityManager) => {
      const query = await entityManager.getRepository(CommunicationDialog)
        .createQueryBuilder('dialog')
        .leftJoinAndSelect('dialog.communicationMessage', 'message')
        .where('dialog.id = :dialogId', { dialogId });

      if (user.roles.includes(UserRole.USER)) {
        query.andWhere('dialog.author.id = :authorId', { authorId: user.id });
      }

      const dialog = await query.getOne();

      this.checkIsDialogExist(dialog);

      const communicationMessage = await entityManager.getRepository(CommunicationMessage)
        .createQueryBuilder('messages')
        .where('messages.communicationDialog = :dialogId', { dialogId })
        .getMany();

        await Promise.all(
          communicationMessage.map( async ({id}) => {
            await this.connection.manager.delete(CommunicationMessage, id);
          })
        );

        this.connection.manager.delete(CommunicationDialog, dialogId);
    });

    return HttpStatus.OK;
  }

  public async deleteAttachments(attachments: CommunicationAttachment[]) {
    await Promise.all(attachments.map(async (item) => {
      await this.connection.manager.delete(CommunicationAttachment, item.id);
    }));
  }

  public async deleteLastMessage(dialogId: number, messageId: number, user: User): Promise<HttpStatus> {
    const messages = await this.connection
      .getRepository(CommunicationMessage)
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.communicationDialog', 'dialog')
      .leftJoinAndSelect('message.communicationAttachment', 'attachment')
      .where('message.communicationDialog.id = :dialogId', { dialogId })
      .andWhere('message.author.id = :authorId', { authorId: user.id })
      .getMany();

    const lastMessage = messages.length ? messages.reduce((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
    }) : null;

    await this.deleteAttachments(lastMessage.communicationAttachment);

    this.checkIsMessageCanBeDeleted(lastMessage, messageId);

    await this.connection.manager.delete(CommunicationMessage, messageId);

    return HttpStatus.OK;
  }

  public async searchByAllMesage(search: string, courseId: number, user: User) {
    try {
      const searchParam = `%${search.toLowerCase()}%`;
      const { id } = user;

      return this.connection
        .getRepository(CommunicationDialog)
        .createQueryBuilder('dialog')
        .leftJoin('dialog.communicationMessage', 'message')
        .select([
          'dialog.id',
          'message.id',
          'dialog.heading',
          'message.message',
        ])
        .where('dialog.course = :courseId', { courseId })
        .andWhere('dialog.author = :id', { id })
        .andWhere(new Brackets((subQb) => {
          subQb
            .andWhere('LOWER(dialog.heading) like :searchParam', { searchParam })
            .orWhere('LOWER(message.message) like :searchParam', { searchParam });
        }))
        .getRawMany();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error searching messages' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCurrentDialog(courseId: number, dialogId: number): Promise<CommunicationDialog> {
    try {
      return this.connection
        .getRepository(CommunicationDialog)
        .createQueryBuilder('dialog')
        .leftJoinAndSelect('dialog.course', 'course')
        .leftJoinAndSelect('dialog.accepter', 'accepter')
        .leftJoinAndSelect('course.tutors', 'tutors')
        .leftJoinAndSelect('dialog.author', 'author')
        .leftJoinAndSelect('author.language', 'language')
        .where('dialog.id = :dialogId', { dialogId })
        .andWhere('dialog.course = :courseId', { courseId })
        .getOne();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Dialog searching error' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async getCommunicationByCourseId(courseId: number, userId: number): Promise<Communication> {
    try {
      return this.connection
        .getRepository(Communication)
        .createQueryBuilder('communication')
        .where('communication.course = :courseId', { courseId })
        .andWhere('communication.user = :userId', { userId })
        .getOne();
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error searching course communication' }, HttpStatus.BAD_REQUEST);
    }
  }

  public async createCommunicationAttachment(attachment: any, communicationMessage: CommunicationMessage): Promise<CommunicationAttachment[]> {

    if (isEmpty(attachment)) { return []; }

    await this.uploadService.isFileValid({
      file: attachment.attachment,
      maxSize: ATTACHMENT_MAX_SIZE,
      availableMimetype: ATTACHMENT_MIMETYPE,
    });

    const attachmentData: any = await Promise.all(attachment.attachment.map(async (item) => {
      const uploadResult = await this.uploadService.upload(item);

      return uploadResult;
    }));

    return attachmentData.map(({ url, originalName }) => {
      const communicationAttachment = new CommunicationAttachment({
        communicationMessage,
        originalName,
        uri: url,
      });

      return communicationAttachment;
    });

  }

  public async getCommunicationMessageById(messageId: number): Promise<CommunicationMessage> {
    return this.connection
      .getRepository(CommunicationMessage)
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.communicationAttachment', 'attachment')
      .andWhere('message.id = :messageId', { messageId })
      .getOne();
  }

  public async getCommunicationDialogById(userId: number, dialogId: number) {
    try {

      const newMessageCount = (subQuery) => {
        return subQuery
          .select('COUNT (DISTINCT (message.id))', 'message')
          .from(CommunicationMessage, 'message')
          .leftJoin('message.author', 'author')
          .where('message.isChecked = false')
          .andWhere('message.communicationDialog = dialog.id')
          .andWhere('author.id != :userId', { userId });
      };

      const query = await this.connection
        .getRepository(CommunicationDialog)
        .createQueryBuilder('dialog')
        .select('dialog.id', 'id')
        .addSelect('dialog.heading', 'title')
        .addSelect(this.firstMessageDate, 'createdAt')
        .addSelect(newMessageCount, 'newMessageCount')
        .addSelect(this.authorFirstName, 'firstName')
        .addSelect(this.authorLastName, 'lastName')
        .where('dialog.id = :dialogId', { dialogId })
        .getRawOne();

      return query;
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException({ error: 'Error searching the list of course dialogs' });
    }
  }

  public firstMessageDate(subQuery) {
    return subQuery
      .select('message.createdAt')
      .from(CommunicationMessage, 'message')
      .where('message.communicationDialog = dialog.id')
      .orderBy('message.createdAt', 'ASC')
      .limit(1);
  }

  public authorFirstName(subQuery) {
    return subQuery
      .select('author.firstName', 'firstName')
      .from(CommunicationMessage, 'message')
      .leftJoin('message.author', 'author')
      .where('message.communicationDialog = dialog.id')
      .orderBy('message.createdAt', 'ASC')
      .limit(1);
  }

  public authorLastName(subQuery) {
    return subQuery
      .select('author.firstName', 'firstName')
      .from(CommunicationMessage, 'message')
      .leftJoin('message.author', 'author')
      .where('message.communicationDialog = dialog.id')
      .orderBy('message.createdAt', 'ASC')
      .limit(1);
  }

  public async addDialogForStudentCourse(
    sendMessage: {
      heading: string,
      message: string,
    },
    attachments: [],
    communicationData: CommunicationDataDto,
  ): Promise<CommunicationDialog> {
    const {
      heading,
      message,
    } = sendMessage;

    const {
      courseId,
      studentId,
      user,
    } = communicationData;

    const courseExists = await this.getStudentCourse(studentId, courseId)
      .catch((error) => {
        throw new BadRequestException(error);
      });

    if (!courseExists) {
      throw new BadRequestException({ error: 'User haven\'t course.' });
    }

    const communication = await this.getCommunicationForStudentCourse(studentId, courseId, user);

    const dialogExists = await this.connection.getRepository(CommunicationDialog)
      .createQueryBuilder('communicationDialog')
      .where('communicationDialog.heading = :heading', { heading })
      .andWhere('communicationDialog.communication = :id', { id: communication.id })
      .getOne();

    if (dialogExists) {
      throw new BadRequestException({ error: 'Dialog already exists' });
    }

    await this.uploadService.isFileValid({
      file: attachments,
      maxSize: ATTACHMENT_MAX_SIZE,
      availableMimetype: ATTACHMENT_MIMETYPE,
    });

    const newDialog = new CommunicationDialog({
      heading,
      message,
      author: user,
    });

    const attachmentsEntities = await this.uploadAttachments(attachments);

    const dialog = await this.entityManager.transaction(async (transactionEntityManager) => {
      const savedAttachment = await transactionEntityManager.save(attachmentsEntities);
      newDialog.communicationAttachment = savedAttachment;
      await transactionEntityManager.save(newDialog);

      const communicationMessage = new CommunicationMessage({
        message,
        author: user,
        communicationDialog: newDialog,
      });

      await transactionEntityManager.save(communicationMessage);

      return newDialog;
    });

    return this.connection.getRepository(CommunicationDialog)
      .createQueryBuilder('communicationDialog')
      .leftJoinAndSelect('communicationDialog.communicationAttachment', 'communicationAttachment')
      .leftJoinAndSelect('communicationDialog.author', 'authorDialog')
      .where('communicationDialog.heading = :heading', { heading: dialog.heading })
      .getOne();
  }

  async getStudentCourse(studentId: number, courseId: number): Promise<CourseStudent> {
    const foundStudent = await this.entityManager.findOne(User, {
      id: studentId,
      roles: [UserRole.USER],
    });

    if (!foundStudent) {
      throw new BadRequestException({ message: "A student isn't found" });
    }

    return this.connection.getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .where('courseStudent.user = :studentId', { studentId })
      .andWhere('courseStudent.course = :courseId', { courseId })
      .getOne();
  }

  public async getCommunicationForStudentCourse(studentId: number, courseId: number, user: User): Promise<Communication> {
    const communication = await this.connection.getRepository(Communication)
      .createQueryBuilder('communication')
      .where('communication.user = :studentId', { studentId })
      .andWhere('communication.course = :courseId', { courseId })
      .andWhere('communication.tutor = :tutorId', { tutorId: user.id })
      .getOne();

    if (!communication) {
      const studentEntity = await this.entityManager.findOne(User, { id: studentId });
      const courseEntity = await this.entityManager.findOne(Course, { id: courseId });
      const communication = new Communication({
        createdAt: new Date(),
        updatedAt: new Date(),
        user: studentEntity,
        tutor: user,
        course: courseEntity,
        title: `Course dialog ## ${generate()}`,
      });// TODO понять как юзеру первому начинать диалог

      return this.entityManager.save(communication);
    }

    return communication;
  }

  public async editHeading(editHeaderDto: EditHeaderDto, communicationData: CommunicationDataDto): Promise<HttpStatus> {
    const { heading } = editHeaderDto;
    const {
      dialogId,
    } = communicationData;

    const dialogExists = await this.connection.getRepository(CommunicationDialog)
      .createQueryBuilder('communicationDialog')
      .where('communicationDialog.id = :dialogId', { dialogId })
      .andWhere('communicationDialog.heading = :heading', { heading })
      .getOne();

    if (dialogExists) {
      throw new BadRequestException({ error: 'Dialog already exists' });
    }

    const dialog = await this.getDialog(dialogId, editHeaderDto.heading);

    dialog.heading = editHeaderDto.heading;
    await this.entityManager.save(dialog);

    return HttpStatus.OK;
  }

  public async reassignHeader(reassignHeaderDto: ReassignHeaderDto, dialogId: number, user: User): Promise<HttpStatus> {
    const {
      tutorId,
    } = reassignHeaderDto;

    const tutor = await this.entityManager.findOne(User, { id: tutorId });

    if (tutor.roles.includes(UserRole.USER)) {
      throw new BadRequestException({ error: 'User isn\'t tutor' });
    }

    const dialog = await this.getDialog(dialogId);
    const isAdminAuthor = await this.entityManager.getRepository(CommunicationDialog).findOne(dialog.id, { where: { author: user.id } })
    if (isAdminAuthor) {
      throw new BadRequestException({ error: 'This dialog can\'t be reassigned' });
    }
    await this.entityManager.transaction(async (entityManager) => {
      dialog.accepter = tutor;
      await entityManager.save(dialog);
    });

    return HttpStatus.OK;
  }

  public async searchHeadingStudentCourse(courseId: number, studentId: number, user: User, search: string): Promise<CommunicationDialog[]> {
    const searchString = search ? search.toLowerCase().trim() : '';

    const results = await this.connection.getRepository(CommunicationDialog)
      .createQueryBuilder('communicationDialog')
      .leftJoinAndSelect('communicationDialog.communicationMessage', 'communicationMessage')
      .leftJoinAndSelect('communicationDialog.communicationAttachment', 'communicationAttachmentDialog')
      .leftJoinAndSelect('communicationDialog.author', 'authorDialog')
      .leftJoinAndSelect('communicationDialog.lastAnswerAdmin', 'lastAnswerAdmin')
      .leftJoinAndSelect('communicationDialog.accepter', 'accepter')
      .leftJoinAndSelect('communicationMessage.communicationAttachment', 'communicationAttachmentMessage')
      .leftJoinAndSelect('communicationMessage.author', 'authorMessage')
      .leftJoin('communicationDialog.course', 'course')
      .innerJoin('course.tutors', 'tutors', 'tutors.id = :tutorId', { tutorId: user.id })
      .where('communicationDialog.course = :courseId', { courseId })
      .andWhere('communicationDialog.author = :studentId', { studentId })
      .orderBy('communicationDialog.createdAt', 'DESC')
      .addOrderBy('communicationMessage.createdAt', 'ASC')
      .getMany();

    if (searchString) {
      const filteredProducts = results.filter(dialog => {
        const { heading, message, communicationMessage } = dialog;
        const dialogHeaderCondition = heading.includes(searchString);
        const parsedMessage = message ? JSON.parse(message) : {};
        const textBlocks = _.get(parsedMessage, 'blocks', []);
        const text = textBlocks.map(textBlock => textBlock.text).join(' ');
        const dialogTextCondition = text ? text.includes(searchString) : false;
        const subMessageCondition = communicationMessage.some(comMessage => {
          const { message: subMessage } = comMessage;
          const parsedSubMessage = subMessage ? JSON.parse(subMessage) : {};
          const subTextBlocks = _.get(parsedSubMessage, 'blocks', []);
          const subMessageText = subTextBlocks.map(textBlock => textBlock.text).join(' ');

          return subMessageText ? subMessageText.includes(searchString) : false;
        })

        return dialogHeaderCondition || dialogTextCondition || subMessageCondition;
      })

      return filteredProducts;
    }

    return results;
  }

  public async readMessagesAdmin(dialogId: number): Promise<HttpStatus.OK> {
    try {

      await this.connection
        .getRepository(CommunicationMessage)
        .createQueryBuilder('message')
        .update()
        .set({ isAdminChecked: true })
        .andWhere('communicationDialog = :dialogId', { dialogId })
        .execute()

      return HttpStatus.OK
    } catch (e) {
      Logger.error(e);
      throw new HttpException({ error: 'Error set message as readed' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async searchAdminMessages(user: User, search: string): Promise<CommunicationDialog[]> {
    const fixedSearch = search && search.toLowerCase() || '';

    const coursesDialogs = await this.connection
      .getRepository(Course)
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.communicationDialog', 'dialog')
      .innerJoin('course.tutors', 'tutors', 'tutors.id = :tutorId')
      .leftJoinAndSelect('dialog.communicationMessage', 'message')
      .leftJoinAndSelect('dialog.author', 'authorMessage')
      .leftJoinAndSelect('dialog.accepter', 'accepter')
      .leftJoinAndSelect('dialog.lastAnswerAdmin', 'lastAnswerAdmin')
      .where(`
        dialog.heading LIKE :fixedSearch OR
        dialog.message LIKE :fixedSearch OR
        authorMessage.firstName LIKE :fixedSearch OR
        authorMessage.lastName LIKE :fixedSearch
      `)
      .setParameters({
        tutorId: user.id,
        fixedSearch: `%${fixedSearch}%`,
      })
      .getMany()

    const rebuildedDialogs = coursesDialogs.map(item => ({
      ...item,
      communicationDialog: item.communicationDialog.map(dialog => ({
        ...dialog,
        course: {
          id: item.id,
          title: item.title,
        }
      }))
    })
    )
    const dialogs = rebuildedDialogs.reduce((acc, item) => [...acc, ...item.communicationDialog], [])

    return dialogs
  }

  public async searchTutors(search: string): Promise<User[]> {
    const searchText = search
      ? search.toLowerCase()
      : '';

    return this.connection.getRepository(User)
      .createQueryBuilder('user')
      .where('user.firstName LIKE :searchText AND FIND_IN_SET(:roles,user.roles)>0')
      .orWhere('user.lastName LIKE :searchText AND FIND_IN_SET(:roles,user.roles)>0')
      .setParameters({
        searchText: `%${searchText}%`,
        roles: UserRole.TUTOR,
      })
      .getMany();
  }

  public async getDialog(
    dialogId: number,
    heading: string = undefined,
  ): Promise<CommunicationDialog> {
    const query = this.connection.getRepository(CommunicationDialog)
      .createQueryBuilder('communicationDialog')
      .where('communicationDialog.id = :dialogId', { dialogId })

    if (heading) {
      await query.andWhere('communicationDialog.heading <> :heading', { heading });
    }

    const dialog = await query.getOne();

    if (!dialog) {
      throw new BadRequestException({ error: 'Dialog already exists' });
    }

    return dialog;
  }

  public async uploadAttachments(attachments): Promise<CommunicationAttachment[]> {
    return attachments.length
      ? Promise.all(attachments.map(async (attachment) => {
        const { url } = await this.uploadService.upload(attachment);

        return new CommunicationAttachment({
          uri: url,
          originalName: attachment.originalname,
        });
      }))
      : [];
  }

  public async markDialogCompleted(dialogId: number): Promise<HttpStatus.OK> {
    await this.connection
      .getRepository(CommunicationDialog)
      .createQueryBuilder('dialog')
      .update()
      .set({
        isClosed: true,
      })
      .where('id = :dialogId', { dialogId })
      .execute();

    return HttpStatus.OK;
  }
  
  private checkIsDialogExist(dialog: CommunicationDialog): void {
    if (!dialog) {
      throw new HttpException({ error: 'Can`t delete dialog!' }, HttpStatus.BAD_REQUEST);
    }
  }

  private checkIsMessageCanBeDeleted(lastMessage: CommunicationMessage, messageId: number): void {
    if (lastMessage?.id !== messageId || lastMessage?.isChecked) {
      throw new HttpException({ error: 'Can`t delete message!' }, HttpStatus.BAD_REQUEST);
    }
  }
}
