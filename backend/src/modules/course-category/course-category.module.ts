import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseCategory } from './course-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CourseCategory]),
  ],
})
export class CourseCategoryModule {}
