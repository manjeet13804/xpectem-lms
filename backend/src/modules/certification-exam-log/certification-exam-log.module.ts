import { Module } from '@nestjs/common';
import { AdminNotificationsModule } from '../admin-notification/admin-notification.module';
import { CertificationExamLogController } from './certification-exam-log.controller';
import { CertificationExamLogService } from './certification-exam-log.service';

@Module({
  controllers: [CertificationExamLogController],
  exports: [],
  imports: [
    AdminNotificationsModule,
  ],
  providers: [CertificationExamLogService],
})
export class CertificationExamLogModule { }
