import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { User } from '../../entity/User';
import { MyOrganisationModule } from '../my-organisation/my-organisation.module';
import { UserService } from '../user/user.service';
import { UserProfileService } from './../user/user-profile.service';
import { AdminAuthController } from './admin.auth.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

const {
  jwtSecret,
} = config.get('jwt');

@Module({
  controllers: [
    AdminAuthController,
    AuthController,
  ],
  exports: [AuthService],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtSecret,
    }),
    forwardRef(() => MyOrganisationModule),
    UserModule
  ],
  providers: [AuthService, JwtStrategy, UserProfileService],
})
export class AuthModule { }
