import { MailerModule } from '@nest-modules/mailer';
import { forwardRef, Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';

@Module({
  exports: [
    CronService,
  ],
  imports: [
    MailerModule,
    forwardRef(() => AdminNotificationsModule)
  ],
  providers: [CronService],
})
export class CronModule { }
