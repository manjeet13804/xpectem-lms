import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { PassportModule } from '@nestjs/passport';
import { LessonService } from './lesson.service';
import { AdminLessonController } from './admin-lesson.controller';

@Module({
  exports: [LessonService],
  controllers: [AdminLessonController],
  imports: [
    TypeOrmModule.forFeature([Lesson]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [LessonService],
})
export class LessonModule {
}
