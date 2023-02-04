import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CommunicationModule } from './../../communication/communication.module';
import { CourseCommunicationController } from './course-communication.controller';
import { AdminNotificationsModule } from '../../admin-notification/admin-notification.module';

@Module({
  imports: [
    CommunicationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => AdminNotificationsModule)
  ],
  controllers: [CourseCommunicationController],
})
export class CourseCommunicationModule {
}
