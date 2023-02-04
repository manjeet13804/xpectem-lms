import { MailerModule, MailerService } from '@nest-modules/mailer';
import { Module, forwardRef, HttpModule } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http/http.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tools } from '../../common/tools/tools';

import { Language } from '../../entity/Language';
import { LmsGroup } from '../../entity/LmsGroup';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { OrganisationModule } from '../organisation/organisation.module';
import { UploadModule } from '../upload/upload.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { LmsGroupTranslation } from './../../entity/LmsGroupTranslation';
import { User } from './../../entity/User';
import { LmsGroupController } from './lms-group.controller';
import { LmsGroupService } from './lms-group.service';
import * as config from 'config';

const {
  jwtSecret,
} = config.get('jwt');

@Module({
  controllers: [LmsGroupController],
  exports: [
    LmsGroupService,
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([LmsGroup]),
    TypeOrmModule.forFeature([LmsGroupTranslation]),
  ],
  imports: [
    OrganisationModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([Language]),
    TypeOrmModule.forFeature([LmsGroup]),
    TypeOrmModule.forFeature([LmsGroupTranslation]),
    forwardRef(() => UploadModule),
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    HttpModule,
    JwtModule.register({
      secret: jwtSecret,
    }),
  ],
  providers: [LmsGroupService, Tools],
})
export class LmsGroupModule { }
