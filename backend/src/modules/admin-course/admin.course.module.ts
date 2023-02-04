import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseStudent } from '../course/course-student.entity';
import { CourseTopic } from '../course/course-topic.entity';
import { Course } from '../../entity/Course';
import { PassportModule } from '@nestjs/passport';
import { AdminCourseService } from './admin.course.service';
import { AdminCourseController } from './admin.course.controller';
import { UploadModule } from '../upload/upload.module';
import { UserModule } from '../user/user.module';
import { AdminLessonModule } from './lesson/admin.lesson.module';
import { AdminExamModule } from './exam/admin.exam.module';
import { AdminAssignmentModule } from './assignment/admin.assignment.module';
import { CourseTranslation } from '../../entity/CourseTranslation';
import { ToolsModule } from '../../common/tools/tools.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([
      Course,
      CourseTopic,
      CourseStudent,
      CourseTranslation
    ]),
    UploadModule,
    UserModule,
    AdminLessonModule,
    AdminExamModule,
    AdminAssignmentModule,
    ToolsModule
  ],
  providers: [
    AdminCourseService,
  ],
  controllers: [
    AdminCourseController,
  ],
})
export class AdminCourseModule {}
