import { Connection } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AdminNotificationsModule } from '../../../modules/admin-notification/admin-notification.module';
import { DEFAULT_STRATEGY } from '../../../common/enums/constants';
import { Assignment } from './assignment.entity';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { AssignmentRepository } from './assignment.repository';
import { AdminAssignmentController } from './admin-assignment.controller';

@Module({
  controllers: [
    AssignmentController,
    AdminAssignmentController,
  ],
  exports: [AssignmentService],
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    PassportModule.register({ defaultStrategy: DEFAULT_STRATEGY.jwt }),
    AdminNotificationsModule,
  ],
  providers: [
    AssignmentService,
    {
      provide: 'AssignmentRepository',
      useFactory: (connection: Connection) => connection.getCustomRepository(AssignmentRepository),
      inject: [Connection],
    },
  ],
})
export class AssignmentModule {
}
