import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CourseStudent } from '../course/course-student.entity';

@Expose()
export class MyCourseDto {
  @ApiModelProperty()
  public readonly id: number;

  @ApiModelProperty()
  public readonly title: string;

  @Type(() => CourseStudent)
  @ApiModelProperty()
  public readonly student: CourseStudent;

  constructor(
    id: number,
    title: string,
    student: CourseStudent,
  ) {
    this.id = id;
    this.title = title;
    this.student = student;
  }
}
