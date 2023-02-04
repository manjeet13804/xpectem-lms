import { Connection } from 'typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MyCourseController } from './my-course.controller';
import { MyCourseService } from './my-course.service';
import { GroupModule } from '../group/group.module';
import { CourseModule } from '../course/course.module';
import { MyCourseRepository } from './my-course.repository';

const MY_COURSE_REPOSITORY_PROVIDER = {
  provide: 'MyCourseRepository',
  useFactory: (connection: Connection) => connection.getCustomRepository(MyCourseRepository),
  inject: [Connection],
};

@Module({
  controllers: [MyCourseController],
  exports: [
    MyCourseService,
    MY_COURSE_REPOSITORY_PROVIDER,
  ],
  imports: [
    forwardRef(() => CourseModule),
    GroupModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    MyCourseService,
    MY_COURSE_REPOSITORY_PROVIDER,
  ],
})
export class MyCourseModule {
}
