import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group } from '../../entity/Group';
import { OrganisationModule } from '../organisation/organisation.module';
import { GroupTranslation } from './../../entity/GroupTranslation';
import { User } from './../../entity/User';
import { AdminGroupController } from './admin.group.controller';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Language } from '../../entity/Language';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Tools } from '../../common/tools/tools';
import { Organisation } from '../../entity/Organisation';
import { ToolsModule } from '../../common/tools/tools.module'

@Module({
  controllers: [
    AdminGroupController,
    GroupController,
  ],
  exports: [
    GroupService,
    TypeOrmModule.forFeature([Group, GroupTranslation]),
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Group, GroupTranslation, User, Language, Organisation]),
    forwardRef(() => ToolsModule),
  ],
  providers: [GroupService],
})
export class GroupModule {}
