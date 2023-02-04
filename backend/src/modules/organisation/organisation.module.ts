import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolsModule } from '../../common/tools/tools.module';

import { LmsGroup } from '../../entity/LmsGroup';
import { Organisation } from '../../entity/Organisation';
import { OrganisationTranslation } from '../../entity/OrganisationTranslation';
import { UploadModule } from '../upload/upload.module';
import { User } from './../../entity/User';
import { AdminOrganisationController } from './admin.organisation.controller';
import { OrganisationController } from './organisation.controller';
import { OrganisationService } from './organisation.service';

@Module({
  controllers: [
    AdminOrganisationController,
    OrganisationController,
  ],
  exports: [
    OrganisationService,
    TypeOrmModule.forFeature([LmsGroup]),
    TypeOrmModule.forFeature([Organisation]),
    TypeOrmModule.forFeature([OrganisationTranslation]),
  ],
  imports: [
    TypeOrmModule.forFeature([LmsGroup]),
    TypeOrmModule.forFeature([Organisation]),
    TypeOrmModule.forFeature([OrganisationTranslation]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    UploadModule,
    forwardRef(() => ToolsModule),
  ],
  providers: [OrganisationService],
})
export class OrganisationModule {}
