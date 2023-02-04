import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from '../../../entity/Exam';
import { ExamService } from './exam.service';
import { AdminExamController } from './admin-exam.controller';
import { PassportModule } from '@nestjs/passport';
import { AdminNotificationsModule } from '../../../modules/admin-notification/admin-notification.module';
import { DEFAULT_STRATEGY } from '../../../common/enums/constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    PassportModule.register({ defaultStrategy: DEFAULT_STRATEGY.jwt }),
    AdminNotificationsModule,
  ],
  providers: [ExamService],
  controllers: [AdminExamController],
})
export class ExamModule {
}
