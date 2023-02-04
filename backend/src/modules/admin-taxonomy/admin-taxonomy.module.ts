import { forwardRef, Module, HttpModule } from '@nestjs/common';

import { AdminTaxonomyController } from './admin-taxonomy.controller';
import { TaxonomyService } from './admin-taxonomy.service';
import { User } from '../../entity/User';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';
import { ToolsModule } from '../../common/tools/tools.module';

@Module({
  controllers: [AdminTaxonomyController],
  exports: [
    TypeOrmModule.forFeature([User]),
  ],
  imports: [
    forwardRef(() => AdminNotificationsModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    HttpModule,
    ToolsModule,
    forwardRef(() => AuthModule)
  ],
  providers: [TaxonomyService],
})
export class AdminTaxonomyModule { }
