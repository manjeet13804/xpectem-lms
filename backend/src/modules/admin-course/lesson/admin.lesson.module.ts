import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../../../entity/Course';
import { CourseTopic } from '../../course/course-topic.entity';
import { CourseStudent } from '../../course/course-student.entity';
import { UploadModule } from '../../upload/upload.module';
import { UserModule } from '../../user/user.module';
import { AdminLessonController } from './admin.lesson.controller';
import { AdminLessonService } from './admin.lesson.service';

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
  ],
  providers: [
    AdminLessonService,
  ],
  controllers: [
    AdminLessonController,
  ],
})
export class AdminLessonModule {
}
