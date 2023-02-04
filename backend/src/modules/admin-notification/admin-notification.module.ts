import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AdminNotificationController } from './admin-notification.controller';
import { NotificationModule } from '../notification/notification.module';
import { AdminNotificationService } from './admin-notification.service';
import { LmsGroupModule } from '../lms-group/lms-group.module';
import { AdminNotificationTriggersService } from './admin-notification-triggers.service';
import { OrganisationModule } from '../organisation/organisation.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => NotificationModule),
    forwardRef(() => LmsGroupModule),
    forwardRef(() => OrganisationModule)
  ],
  controllers: [AdminNotificationController],
  providers: [
    AdminNotificationService,
    AdminNotificationTriggersService,
  ],
  exports: [
    AdminNotificationTriggersService,
    AdminNotificationService,
  ]
})
export class AdminNotificationsModule { }
