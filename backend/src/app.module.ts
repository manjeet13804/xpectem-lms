import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { AccessControlModule } from 'nest-access-control';
import { RouterModule } from 'nest-router';
import * as ses from 'nodemailer-ses-transport';
import { Connection } from 'typeorm';

import { SES } from '../lib/aws/ses';
import { roles } from './app.roles';
import { routes } from './app.routes';
import { AddEmailModule } from './modules/add-email/add-email.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { ContactUsModule } from './modules/contact-us/contact-us.module';
import { CourseCategoryModule } from './modules/course-category/course-category.module';
import { CourseModule } from './modules/course/course.module';
import { CronModule } from './modules/cron/cron.module';
import { FaqModule } from './modules/faq/faq.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { GroupModule } from './modules/group/group.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { LmsGroupModule } from './modules/lms-group/lms-group.module';
import { MyCertificateModule } from './modules/my-certificate/my-certificate.module';
import { MyCourseModule } from './modules/my-course/my-course.module';
import { MyOrganisationModule } from './modules/my-organisation/my-organisation.module';
import { NotificationModule } from './modules/notification/notification.module';
import { OrganisationModule } from './modules/organisation/organisation.module';
import { TopicModule } from './modules/topic/topic.module';
import { UploadModule } from './modules/upload/upload.module';
import { UserModule } from './modules/user/user.module';
import { RemoteModule } from './modules/remote/remote.module';
import { AdminCourseModule } from './modules/admin-course/admin.course.module';
import { AdminNotificationsModule } from './modules/admin-notification/admin-notification.module';
import { ToolsModule } from './common/tools/tools.module';
import { AdminTaxonomyModule } from './modules/admin-taxonomy/admin-taxonomy.module';
import { CertificationExamLogModule } from './modules/certification-exam-log/certification-exam-log.module';

const ORM_CONFIG: TypeOrmModuleOptions = config.get('typeorm');
const {
  fromEmail,
} = config.get('aws.ses');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ORM_CONFIG,
      entities: [
        `${__dirname}/entity/*{.ts,.js}`,
        `${__dirname}/**/*.entity{.ts,.js}`,
      ],
      migrations: [`${__dirname}/database/@migrations/*{.ts,.js}`],
    }),
    AccessControlModule.forRoles(roles),
    RouterModule.forRoutes(routes),
    forwardRef(() => AuthModule),
    ForgotPasswordModule,
    GroupModule,
    HealthCheckModule,
    LmsGroupModule,
    MailerModule.forRoot({
      defaults: {
        from: fromEmail,
      },
      template: {
        adapter: new HandlebarsAdapter(),
        dir: `${__dirname}/email-templates`,
        options: {
          doctype: 'html',
        },
      },
      transport: ses({ SES }),
    }),
    OrganisationModule,
    MyOrganisationModule,
    CourseModule,
    MyCourseModule,
    MyCertificateModule,
    CourseCategoryModule,
    TopicModule,
    FaqModule,
    UploadModule,
    AddEmailModule,
    CronModule,
    AddEmailModule,
    UserModule,
    NotificationModule,
    CommunicationModule,
    ContactUsModule,
    RemoteModule,
    CourseModule,
    AdminCourseModule,
    AdminNotificationsModule,
    ToolsModule,
    AdminTaxonomyModule,
    CertificationExamLogModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
