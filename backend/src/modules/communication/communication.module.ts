import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UploadModule } from '../upload/upload.module';
import { UserService } from '../user/user.service';
import { User } from './../../entity/User';
import { CommunicationService } from './communication.service';
import { AdminCommunicationController } from './admin-communication.controller';
import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    UploadModule,
    forwardRef(() => AdminNotificationsModule),
    UserModule
  ],
  providers: [CommunicationService],
  exports: [CommunicationService],
  controllers: [AdminCommunicationController],
})
export class CommunicationModule { }
