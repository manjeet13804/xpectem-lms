import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { Course } from '../../entity/Course';
import { MyCourseView } from './my-course.view';
import { User } from '../../entity/User';

@Expose()
export class MyGroupedCourseDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly name: string;

  @Type(() => MyCourseView)
  @Transform(
    (courses = [], { user }) => courses.map(
      course => new MyCourseView(course, user),
    ),
    { toPlainOnly: true },
  )
  @ApiModelProperty({ type: [MyCourseView] })
  public readonly courses: Course[];

  @Exclude()
  public readonly user: User;

  constructor(
    id: number,
    name: string,
    courses: Course[],
    user: User,
  ) {
    this.id = id;
    this.name = name;
    this.courses = courses;
    this.user = user;
  }
}
