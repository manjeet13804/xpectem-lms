import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Course } from '../../entity/Course';
import { MyCourseView } from '../my-course/my-course.view';

@Expose()
export class MyCertificateDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly url: string;

  @Type(() => MyCourseView)
  @ApiModelProperty()
  public readonly course: Course;

  constructor(
    id: number,
    url: string,
    course: Course,
  ) {
    this.id = id;
    this.url = url;
    this.course = course;
  }
}
