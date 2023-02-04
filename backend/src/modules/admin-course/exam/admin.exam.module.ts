import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../../entity/Course';
import { CourseTopic } from '../../course/course-topic.entity';
import { CourseStudent } from '../../course/course-student.entity';
import { UploadModule } from '../../upload/upload.module';
import { UserModule } from '../../user/user.module';
import { AdminExamController } from './admin.exam.controller';
import { AdminExamService } from './admin.exam.service';
import { AdminNotificationsModule } from '../../admin-notification/admin-notification.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      Course,
      CourseTopic,
      CourseStudent,
    ]),
    UploadModule,
    UserModule,
    forwardRef(() => AdminNotificationsModule)
  ],
  providers: [
    AdminExamService,
  ],
  controllers: [
    AdminExamController,
  ],
})
export class AdminExamModule {}
