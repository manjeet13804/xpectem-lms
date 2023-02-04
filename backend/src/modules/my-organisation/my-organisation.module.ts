import * as config from 'config';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { GroupModule } from '../group/group.module';
import { MyOrganisationController } from './my-organisation.controller';
import { MyOrganisationService } from './my-organisation.service';
import { OrganisationModule } from '../organisation/organisation.module';

const {
  jwtSecret,
} = config.get('jwt');

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => GroupModule),
    forwardRef(() => OrganisationModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // TODO: Create token service in auth module
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [MyOrganisationController],
  exports: [MyOrganisationService],
  providers: [MyOrganisationService],
})
export class MyOrganisationModule {}
