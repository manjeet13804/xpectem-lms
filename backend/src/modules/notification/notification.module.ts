import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';
import { NotificationService } from './notification.service';
import { SNSService } from './sns.service';

@Module({
  providers: [NotificationGateway, NotificationService, SNSService],
  controllers: [NotificationController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [NotificationGateway, NotificationService, SNSService],
})
export class NotificationModule { }
