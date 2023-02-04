import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../../entity/Topics';
import { LessonModule } from './lesson/lesson.module';
import { AssignmentModule } from './assignment/assignment.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    LessonModule,
    AssignmentModule,
    ExamModule,
    TypeOrmModule.forFeature([Topic]),
  ],
})
export class TopicModule {
}
