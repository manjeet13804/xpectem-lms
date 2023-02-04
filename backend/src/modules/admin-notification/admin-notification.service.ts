import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {Connection, Repository} from 'typeorm';
import { ContentState, convertToRaw } from "draft-js";
import { InjectRepository } from "@nestjs/typeorm";
import { UserNotification } from '../notification/user.notification.entity';
import { User, UserRole } from '../../entity/User';
import { LmsGroupService } from '../lms-group/lms-group.service';
import { NotificationGateway } from '../notification/notification.gateway';
import { CourseStudent } from '../course/course-student.entity';
import { OrganisationService } from '../organisation/organisation.service';
import { AdminNotificationListResponseDto } from './dto/admin-notification-list-response.dto';
import { NotificationSchedule } from './entity/notification-schedule.entity';
import {
  NotificationsCreateDto,
  AdminNotificationDateRangeDto,
  AdminNotificationDto, AllNotificationsDto,
} from './dto/admin-notification.dto';
import { AdminNotificationScheduleTypeEnum } from './enum/admin-notification-schedule-type.enum';
import { LmsGroup } from '../../entity/LmsGroup';
import { isNil } from "ramda";
import { NotificationTargetTypeEnum } from "./enum/notification-target-type.enum";
import { AutomaticReminderNotification } from "../../entity/AutomaticReminderNotifications";
import { Notification } from "../notification/notification.entity";
import { Language } from "../../entity/Language";

import moment = require('moment');
import { NotificationTranslation } from "../notification/NotificationTranslation.entity";
import {
  AutomaticReminderNotificationDto,
  AutomaticReminderNotificationEnableDto,
} from "./dto/automatic-reminder.dto";
import { Simulate } from "react-dom/test-utils";
import { differenceInCalendarDays } from "date-fns";
import { Course } from "../../entity/Course";

@Injectable()
export class AdminNotificationService {
  private readonly manager = this.connection.manager;

  constructor(
    private readonly connection: Connection,
    private readonly lmsGroupService: LmsGroupService,
    private readonly notificationGateway: NotificationGateway,
    private readonly organisationService: OrganisationService,
    @InjectRepository(Language) private languageRepository: Repository<Language>,
  ) { }

  public async getUser(params){
    const {selectedLmsGroup, selectedOrg, selectedGroup, person, isDeactivated} = params
    const {firstName, lastName, email, phone } = JSON.parse(person);
    const users = this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoin('user.lmsGroups', 'lmsGroup')
      .leftJoin('user.organisations', 'organisation')
      .leftJoin('user.groups', 'group')
      .leftJoinAndSelect('user.userEmail', 'userEmail')

    if (!isDeactivated) {
      users.andWhere('user.isDeactivated = :isDeactivated', { isDeactivated: false });
    }

    if (firstName) {
      users.andWhere('LOWER(user.firstName) like :firstName', { firstName: `%${firstName.toLowerCase()}%` });
    }

    if (lastName) {
      users.andWhere('LOWER(user.lastName) like :lastName', { lastName: `%${lastName.toLowerCase()}%` });
    }

    if (email) {
      users.andWhere('LOWER(userEmail.email) like :email', { email: `%${email.toLowerCase()}%` });
    }

    if (phone) {
      users.andWhere('userPhone.phone like :phone', { phone: `%${phone}%` });
    }

    if (selectedLmsGroup) {
      users.andWhere('lmsGroup.id = :lmsGroupId', { lmsGroupId: selectedLmsGroup });
    }

    if (selectedOrg) {
      users.andWhere('organisation.id = :organisationId', { organisationId: selectedOrg });
    }

    if (selectedGroup) {
      users.andWhere('group.id = :groupId', { groupId: selectedGroup });
    }

    return users.getMany();
  }

  public async getAutomaticRemindersNotifications(params): Promise<{total: number, notifications: AllNotificationsDto[]}> {
    const {
      createdStartDate,
      createdEndDate,
      limit,
      offset,
      lmsGroupId,
    } = params;

    const notifications = this.connection
      .getRepository(AutomaticReminderNotification)
      .createQueryBuilder('notification')
      .leftJoin('notification.lmsGroup', 'lmsGroup')
      .where('lmsGroup.id = :lmsGroupId', { lmsGroupId })

    const total = await notifications.getCount();

    if (createdStartDate) {
      notifications
        .andWhere('notification.createdAt >= :createdStartDate', { createdStartDate })
    }

    if (createdEndDate) {
      notifications
        .andWhere('notification.createdAt <= :createdEndDate', { createdEndDate })
    }

    if (limit) {
      notifications.limit(limit);
    }

    if (offset) {
      notifications.offset(offset);
    }

    const notificationsList = await notifications
      .groupBy('notification.id')
      .select([
        'notification.id as id',
        'notification.message as message',
        'notification.createdAt as createdAt',
      ])
      .getRawMany();

    return {
      total,
      notifications: notificationsList,
    };
  }

  public async getAllNotifications(params): Promise<{total: number, notifications: AllNotificationsDto[]}> {
    const {
      userId,
      createdStartDate,
      createdEndDate,
      limit,
      offset,
      lmsGroupId,
      organisationId,
      groupId,
    } = params;

    const notifications = this.connection
      .getRepository(Notification)
      .createQueryBuilder('notification')
      .leftJoin('notification.userNotification', 'userNotification')
      .leftJoin('userNotification.user', 'user')
      .leftJoin('user.lmsGroups', 'lmsGroup')
      .leftJoin('user.organisations', 'organisation')
      .leftJoin('user.groups', 'group')

    if (lmsGroupId) {
      notifications
        .andWhere('lmsGroup.id = :lmsGroupId', { lmsGroupId })
    }

    if (organisationId) {
      notifications
        .andWhere('organisation.id = :organisationId', { organisationId })
    }

    if (groupId) {
      notifications
        .andWhere('group.id = :groupId', { groupId })
    }

    if (userId) {
      notifications
        .andWhere('userNotification.user = :userId', { userId })
    }

    const total = await notifications.getCount();

    if (createdStartDate) {
      notifications
        .andWhere('userNotification.createdAt >= :createdStartDate', { createdStartDate })
    }

    if (createdEndDate) {
      notifications
        .andWhere('userNotification.createdAt <= :createdEndDate', { createdEndDate })
    }

    if (limit) {
      notifications.limit(limit);
    }

    if (offset) {
      notifications.offset(offset);
    }

    const notificationsList = await notifications
      .groupBy('notification.id')
      .select([
        'notification.id as id',
        'notification.heading as header',
        'userNotification.createdAt as createdAt',
        'userNotification.isRead as isRead',
      ])
      .getRawMany();

    return {
      total,
      notifications: notificationsList,
    };
  }

  public async getNotifications(params: AdminNotificationDto): Promise<{total: number, notifications: AllNotificationsDto[]}>{
    const { isAutomaticReminders } = params;

    if (isAutomaticReminders) {
      return this.getAutomaticRemindersNotifications(params);
    }

    return this.getAllNotifications(params);
  }

  public async getSendingNotification(
    adminId: number,
    {
      createdStartDate,
      createdEndDate,
      limit,
      offset,
    }: AdminNotificationDateRangeDto
  ): Promise<AdminNotificationListResponseDto> {
    const notifications = this.connection
      .getRepository(UserNotification)
      .createQueryBuilder('un')
      .leftJoin('un.notification', 'notification')
      .where('un.initializerAdmin = :adminId', { adminId })
      .select([
        'un.id as id',
        'notification.heading as header',
        'un.user as "recipientUserId"',
        'un.isRead as "isRead"',
        'un.createdAt as "createdAt"',
      ]);

    const total = await notifications.getCount();

    if (createdStartDate) {
      notifications
        .andWhere('un.createdAt >= :createdStartDate', { createdStartDate })
    }

    if (createdEndDate) {
      notifications
        .andWhere('un.createdAt <= :createdEndDate', { createdEndDate })
    }

    if (limit) {
      notifications.limit(limit);
    }

    if (offset) {
      notifications.offset(offset);
    }

    const userNotifications = await notifications.getRawMany();

    return {
      total,
      notifications: userNotifications,
    };
  }

  private getUserRole(data: string, targetType: NotificationTargetTypeEnum): UserRole | undefined {
    switch (targetType) {
      case NotificationTargetTypeEnum.STUDENTS: return UserRole.USER
      case NotificationTargetTypeEnum.TUTORS: return UserRole.TUTOR
      case NotificationTargetTypeEnum.COURSE_CREATORS: return UserRole.COURSE_CREATOR
      case NotificationTargetTypeEnum.ADMINISTRATORS: {
        switch (data) {
          case 'lmsGroup':
            return UserRole.ADMIN_LMS
          case 'group':
            return UserRole.ADMIN_GROUP
          case 'organisation':
            return UserRole.ADMIN_ORGANISATION
        }
      }
    }
  }

  public async createNotification(data: NotificationsCreateDto, user) {
    try {
      return await this.connection.transaction(async (transactionEntityManager) => {
        const users = transactionEntityManager
          .getRepository(User)
          .createQueryBuilder('users')
          .leftJoinAndSelect('users.language', 'language')

        let role = undefined;
        if (!isNil(data.lmsGroupId)) {
          users
            .leftJoin('users.lmsGroups', 'lmsGroups')
            .where('lmsGroups.id = :lmsGroupId', {lmsGroupId: data.lmsGroupId})

          role = this.getUserRole('lmsGroup' ,data.targetType);
        }
        if (!isNil(data.groupId)) {
          users
            .leftJoin('users.groups', 'groups')
            .where('groups.id = :groupId', {groupId: data.groupId})

          role = this.getUserRole('group' ,data.targetType);
        }
        if (!isNil(data.organisationId)) {
          users
            .leftJoin('users.organisations', 'organisations')
            .where('organisations.id = :organisationId', {organisationId: data.organisationId})

          role = this.getUserRole('organisation' ,data.targetType);
        }
        if (data.coursesIds) {
          users
            .leftJoin('users.courseStudent', 'courseStudent')
            .leftJoin('courseStudent.course', 'course')
            .where('course.id IN (:...coursesIds)', { coursesIds: data.coursesIds })
        }
        if (!isNil(role)) {
          users.andWhere('FIND_IN_SET(:role,users.roles)>0', { role })
        }

        const usersNotifications = await users
          .andWhere('users.isClose = false')
          .getMany();

        await this.notificationGateway.sendNotifications({
          transactionEntityManager,
          languageRepository: this.languageRepository,
          users: usersNotifications,
          notificationType: data.notificationType,
          header: data.header,
          translations: data.translations,
          initializerAdminId: user.id,
        });

        return usersNotifications;
      });
    }
    catch (e) {
      throw new HttpException({ error: 'Error saving notification' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getReminderNotification(lmsGroupId: number): Promise<AutomaticReminderNotification[]> {
    try {
      return await this.connection
        .getRepository(AutomaticReminderNotification)
        .createQueryBuilder('automaticReminder')
        .leftJoin('automaticReminder.lmsGroup', 'lmsGroup')
        .where('lmsGroup.id = :lmsGroupId', {lmsGroupId})
        .andWhere('automaticReminder.isDelete = false')
        .getMany()
    }
    catch (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAutomaticReminder(id: number): Promise<AutomaticReminderNotification> {
    try {
      return await this.connection
        .getRepository(AutomaticReminderNotification)
        .createQueryBuilder('automaticReminder')
        .leftJoinAndSelect('automaticReminder.translations', 'translations')
        .leftJoinAndSelect('translations.language', 'language')
        .where('automaticReminder.id = :id', {id})
        .andWhere('automaticReminder.isDelete = false')
        .getOne()
    }
    catch (error) {
      throw new HttpException({ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async sendReminderNotification(body: AutomaticReminderNotificationDto) {
    try {
      return await this.connection.transaction(async (transactionEntityManager) => {
        const {
          lmsGroupId,
          header,
          percent,
          translations,
          enable = false,
        }= body

        const newAutomaticReminder = new AutomaticReminderNotification({
          header,
          percent,
          enable,
          lmsGroup: new LmsGroup({id: lmsGroupId}),
        });

        await transactionEntityManager.save(newAutomaticReminder);

        await Promise.all(translations.map(async ({ language: languageId, message }) => {
          const automaticReminderTranslation = new NotificationTranslation({});
          automaticReminderTranslation.automaticReminders = newAutomaticReminder;
          automaticReminderTranslation.message = message;
          automaticReminderTranslation.language = await this.languageRepository.findOne(languageId);
          await transactionEntityManager.save(automaticReminderTranslation);
        }));

        return HttpStatus.OK;
      })
    }
    catch (e) {
      throw new HttpException({ error: 'Error saving automatic reminder' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async updateReminderNotification(body: any, id: number) {
    try {
      return await this.connection.transaction(async (transactionEntityManager) => {
        const {
          header,
          percent,
          translations,
          enable = false,
        }= body

        const automaticReminder = new AutomaticReminderNotification({ id });

        automaticReminder.header = header;
        automaticReminder.percent = percent;
        automaticReminder.enable = enable;

        await transactionEntityManager.save(automaticReminder);

        await Promise.all(translations.map(async ({ id: translationId , language: languageId, message }) => {
          const automaticReminderTranslation = new NotificationTranslation({ id: translationId });
          automaticReminderTranslation.automaticReminders = automaticReminder;
          automaticReminderTranslation.message = message;
          automaticReminderTranslation.language = await this.languageRepository.findOne(languageId);
          await transactionEntityManager.save(automaticReminderTranslation);
        }));

        return HttpStatus.OK;
      })
    }
    catch (e) {
      throw new HttpException({ error: 'Error saving automatic reminder' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async enableReminderNotification(body: AutomaticReminderNotificationEnableDto) {
    try {
      return await this.connection.transaction(async (transactionEntityManager) => {
        const { id, enable } = body;

        const automaticReminder = new AutomaticReminderNotification({ id });
        automaticReminder.enable = enable;

        await transactionEntityManager.save(automaticReminder);

        return HttpStatus.OK;
      })
    }
    catch (e) {
      throw new HttpException({ error: 'Error saving automatic reminder' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async deleteReminderNotification(id: number) {
    try {
      return await this.connection.transaction(async (transactionEntityManager) => {
        const newAutomaticReminderNotification = new AutomaticReminderNotification({ id });
        newAutomaticReminderNotification.isDelete = true;
        await transactionEntityManager.save(newAutomaticReminderNotification);

        return HttpStatus.OK;
      })
    }
    catch (e) {
      throw new HttpException({ error: 'Error saving automatic reminder' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async checkDaysBeforeReminderNotification(): Promise<void> {
    return this.connection.transaction(async (transactionEntityManager) => {
      const notification = await transactionEntityManager
        .getRepository(UserNotification)
        .createQueryBuilder('userNotification')
        .leftJoin('userNotification.automaticReminderNotification', 'reminder')
        .leftJoin('userNotification.user', 'users')
        .leftJoin('reminder.translations', 'translations')
        .where('reminder.enable = true')
        .andWhere('translations.language = users.language')
        .select([
          'userNotification.id as id',
          'users.id as userId',
          'reminder.header as heading',
          'translations.message as message',
        ])
        .getRawMany()

      if (notification && notification.length) {
        await this.notificationGateway.reminderNotification(notification);
      }
    });
  }

  public async checkReminderNotification() {
    await this.connection.transaction(async (transactionEntityManager) => {
      const notifications = await transactionEntityManager
        .getRepository(AutomaticReminderNotification)
        .createQueryBuilder('automaticReminder')
        .innerJoin('automaticReminder.lmsGroup', 'lmsGroup')
        .innerJoin('lmsGroup.organisations', 'organisations')
        .innerJoin('organisations.groups', 'groups')
        .innerJoin('groups.courses', 'courses')
        .innerJoin('courses.students', 'courseStudent')
        .innerJoin('courseStudent.user', 'user')
        .where('automaticReminder.enable IS TRUE')
        .andWhere('courseStudent.studyPlan.wishedDoneDate >= NOW()')
        .select([
          'automaticReminder.id as id',
          'courseStudent.startAt as startAt',
          'courseStudent.studyPlan.wishedDoneDate as wishedDoneDate',
          'courses.id as courseId',
          'user.id as userId',
          'automaticReminder.percent as percent'

        ])
        .getRawMany();

      const nawDate = new Date;
      await Promise.all(notifications.map(async (item) => {
        const daysReminder = differenceInCalendarDays(nawDate, item.startAt);
        const daysByStudyPlan = differenceInCalendarDays(item.wishedDoneDate, item.startAt);
        const percentCourse = (daysReminder / daysByStudyPlan * 100).toFixed(0);

        const notification = await transactionEntityManager
          .getRepository(AutomaticReminderNotification)
          .createQueryBuilder('automaticReminder')
          .innerJoin('automaticReminder.userAutomaticReminderNotification', 'userNotification')
          .innerJoin('userNotification.user', 'user')
          .innerJoin('userNotification.course', 'course')
          .where('automaticReminder.isDelete IS FALSE')
          .andWhere('user.id = :userId', {userId: item.userId})
          .andWhere('course.id = :courseId', {courseId: item.courseId})
          .andWhere('automaticReminder.percent <= :percent', {percent: percentCourse})
          .andWhere('automaticReminder.percent <= :percent', {percent: item.percent})
          .select([
            'automaticReminder.percent as percent',
          ])
          .getRawMany();

        notification.sort((a, b) => b.percent - a.percent);

        if (
          (!notification.length && item.percent <= percentCourse)
          || (notification.length && notification[0].percent < item.percent)
        ) {
          await transactionEntityManager.save(new UserNotification({
            user: new User({id: item.userId}),
            automaticReminderNotification: new AutomaticReminderNotification({id: item.id}),
            initializerAdmin: new User({id: 1}),
            course: new Course({id: item.courseId}),
          }))
        }

        return notification;
      }));
    });
  }

  public async checkSchedulePercent(userId: number, result: string): Promise<void> {
    const notifications = await this.connection
      .getRepository(NotificationSchedule)
      .createQueryBuilder('ns')
      .leftJoinAndSelect('ns.user', 'user')
      .leftJoinAndSelect('ns.admin', 'admin')
      .where('ns.user = :userId', { userId })
      .andWhere('ns.type = :type', { type: AdminNotificationScheduleTypeEnum.PERCENT })
      .andWhere('ns.percent <= :result', { result: parseInt(result, 10) })
      .getMany();
  }

  public async setDateSchedule(userId: number): Promise<void> {
    const notifications = await this.connection
      .getRepository(NotificationSchedule)
      .createQueryBuilder('ns')
      .leftJoinAndSelect('ns.user', 'user')
      .leftJoinAndSelect('ns.admin', 'admin')
      .where('ns.user = :userId', { userId })
      .andWhere('ns.type = :type', { type: AdminNotificationScheduleTypeEnum.DAYS })
      .andWhere('ns.sendTime is NULL')
      .getMany();

    const entities = notifications.map((item) => new NotificationSchedule({
      ...item,
      sendTime: moment().add(item.countDays, 'days').toDate(),
    }));

    if (notifications.length) {
      await this.manager.save(entities);
    }
  }

  public async getUsersDontStartCourse(): Promise<{id: number}[]> {
    return this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoin('courseStudent.user', 'user')
      .leftJoin('user.courseProgression', 'courseProgression', 'courseProgression.course = courseStudent.course')
      .select('DISTINCT user.id')
      .andWhere('courseProgression.progress is NULL')
      .getRawMany();
  }

  public async getUsersCompletedCourse(): Promise<{id: number}[]> {
    return this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoin('courseStudent.user', 'user')
      .select('DISTINCT user.id as id')
      .where('courseStudent.doneAt < NOW()')
      .getRawMany();
  }

  public async getUsersProgressCourse(): Promise<{id: number}[]> {
    return this.connection
      .getRepository(CourseStudent)
      .createQueryBuilder('courseStudent')
      .leftJoin('courseStudent.user', 'user')
      .leftJoin('user.courseProgression', 'courseProgression', 'courseProgression.course = courseStudent.course')
      .select('DISTINCT user.id')
      .andWhere('courseProgression.progress >= 2')
      .getRawMany();
  }
}
