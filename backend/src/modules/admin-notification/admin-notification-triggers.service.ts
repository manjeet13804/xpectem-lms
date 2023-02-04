import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { NotificationTriggers, NotificationTriggerType } from './entity/notification-triggers.entity';
import { User, UserRole } from '../../entity/User';
import { NotificationGateway } from '../notification/notification.gateway';
import { CourseStudent } from '../course/course-student.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "../../entity/Language";
import { NotificationTranslation } from "../notification/NotificationTranslation.entity";
import { AdminNotificationTriggerDto } from "./dto/trigger-notification.dto";
import { UserNotification } from "../notification/user.notification.entity";

@Injectable()
export class AdminNotificationTriggersService {
  constructor(
    private readonly connection: Connection,
    private readonly notificationGateway: NotificationGateway,
    @InjectRepository(Language) private languageRepository: Repository<Language>,
  ) { }

  public async get(): Promise<NotificationTriggers[]>  {
    return this.connection
      .getRepository(NotificationTriggers)
      .createQueryBuilder('notificationTriggers')
      .leftJoinAndSelect('notificationTriggers.translations', 'translations')
      .leftJoinAndSelect('translations.language', 'language')
      .getMany()
  }

  public async createTrigger(admin, data: AdminNotificationTriggerDto): Promise<NotificationTriggers> {
    return this.connection.transaction(async (transactionEntityManager) => {
      const {
        header,
        type,
        translations,
      } = data;
      const notificationTriggers = await transactionEntityManager
        .findOne(NotificationTriggers, { type });
      const newNotificationTriggers = notificationTriggers || new NotificationTriggers({
        type,
      });

      newNotificationTriggers.heading = header;
      newNotificationTriggers.admin = new User({id: admin.id});

      const notificationTriggersTranslations = await Promise.all(translations.map(async ({ language: languageId, message, id}) => {
        const notificationTriggersTranslation = id ? new NotificationTranslation({id}) : new NotificationTranslation({id});
        notificationTriggersTranslation.notificationTriggers = newNotificationTriggers;
        notificationTriggersTranslation.message = message;
        notificationTriggersTranslation.language = await this.languageRepository.findOne(languageId);

        return notificationTriggersTranslation;
      }));

      await transactionEntityManager.save([newNotificationTriggers, ...notificationTriggersTranslations]);

      return {
        ...newNotificationTriggers,
        translations: notificationTriggersTranslations,
      };
    });
  }

  public async checkEvent({
    student,
    user,
    event,
  }: {
    student: User;
    user: User;
    event: NotificationTriggerType;
  }): Promise<void> {
    const notification = await this.getNotificationByTrigger(student, event);
    if (notification) {
      await this.sendNotifications({student, user, notification});
    }
  }

  // TODO fix checkEventByTopic
  public async checkEventByTopic(topicId: number, event: string): Promise<void> {
    const triggerAdminXpectum = await this.connection
      .getRepository(NotificationTriggers)
      .createQueryBuilder('nt')
      .leftJoin('nt.admin', 'admin')
      .where('FIND_IN_SET(:xpectumRole,admin.roles)>0', { xpectumRole: UserRole.XPECTUM_ADMIN })
      .andWhere('nt.type = :event', { event })
      .select([
        'nt.id',
        'nt.heading as heading',
        'nt.message as message',
        'nt.admin as admin',
      ])
      .getRawMany();

    if (triggerAdminXpectum.length) {
      const users = await this.connection
        .getRepository(User)
        .createQueryBuilder('user')
        .select('user.id as id')
        .getRawMany();

      const userIds = users.map(item => item.id);
    }

    const triggers = await this.connection
      .getRepository(NotificationTriggers)
      .createQueryBuilder('nt')
      .leftJoin('nt.admin', 'admin')
      .leftJoin('admin.lmsGroups', 'lmsGroups')
      .leftJoin('admin.organisations', 'organisations')
      .leftJoin(subQuery => {
        return subQuery
          .from(User, 'user')
          .leftJoin('user.lmsGroups', 'lmsGroups')
          .leftJoin('user.organisations', 'organisations')
          .leftJoin('lmsGroups.users', 'usersLmsGroups')
          .leftJoin('organisations.users', 'usersOrganisations')
          .select(`
            CASE
            WHEN FIND_IN_SET(${UserRole.ADMIN_GROUP},user.roles)>0 THEN usersLmsGroups.id
            WHEN FIND_IN_SET(${UserRole.ADMIN_ORGANISATION},user.roles)>0 THEN usersOrganisations.id
            END as id,
            user.id as aid
          `)
      }, 'users', 'aid = admin.id')
      .leftJoin(CourseStudent, 'courseStudent', 'courseStudent.user = users.id')
      .leftJoin('courseStudent.course', 'course')
      .leftJoin('course.courseTopics', 'courseTopics')
      .leftJoin('courseTopics.topic', 'topic')
      .where('topic.id = :topicId', { topicId })
      .andWhere('nt.type = :event', { event })
      .groupBy('nt.id, users.id')
      .select([
        'nt.heading as heading',
        'nt.message as message',
        'users.id as "userId"',
        'admin.id as "adminId"',
      ])
      .getRawMany();
  }

  public async getNotificationByTrigger(user: User, event: NotificationTriggerType): Promise<NotificationTriggers> {
    return this.connection
      .getRepository(NotificationTriggers)
      .createQueryBuilder('notificationTriggers')
      .leftJoinAndSelect('notificationTriggers.translations', 'translations')
      .leftJoin('translations.language', 'language')
      .where('notificationTriggers.type = :type', { type: event })
      .andWhere('language.id = :id', { id: user.language?.id || 1 })
      .getOne();
  }


  private async sendNotifications({
    student,
    user,
    notification,
  }: {
    student: User;
    user: User;
    notification: NotificationTriggers;
  }): Promise<void> {
    await this.connection.transaction(async transactionEntityManager => {
      const newUserNotification = await transactionEntityManager.save(
        new UserNotification({
          user: student,
          notificationTrigger: new NotificationTriggers({ id: notification.id }),
          initializerAdmin: user,
        }),
      );

      await this.notificationGateway.triggerNotification([
        {
          message: notification.translations[0].message,
          heading: notification.heading,
          userId: student.id,
          id: newUserNotification.id,
        },
      ]);
    });
  }
}
