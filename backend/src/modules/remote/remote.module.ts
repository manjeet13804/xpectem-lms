import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from '../../entity/Group';
import { OrganisationModule } from '../organisation/organisation.module';
import { GroupTranslation } from './../../entity/GroupTranslation';
import { User } from './../../entity/User';
import { RemoteController } from './remote.controller';
import { RemoteService } from './remote.service';
import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';

@Module({
  controllers: [
    RemoteController,
  ],
  exports: [
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([GroupTranslation]),
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([GroupTranslation]),
    OrganisationModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AdminNotificationsModule)
  ],
  providers: [RemoteService],
})
export class RemoteModule {}
