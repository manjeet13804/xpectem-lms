import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicModule } from '../topic/topic.module';
import { CertificationModule } from './certification/certification.module';
import { CourseCommunicationModule } from './communication/course-communication.module';
import { CourseStudent } from './course-student.entity';
import { CourseTopic } from './course-topic.entity';
import { Course } from '../../entity/Course';
import { CourseFaqModule } from './faq/course-faq.module';

@Module({
  imports: [
    TopicModule,
    CertificationModule,
    CourseFaqModule,
    CourseCommunicationModule,
    TypeOrmModule.forFeature([
      Course,
      CourseTopic,
      CourseStudent,
    ]),
  ],
})
export class CourseModule {
}
