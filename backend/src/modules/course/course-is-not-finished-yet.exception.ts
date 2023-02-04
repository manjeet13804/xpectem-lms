import { BadRequestException } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { HasProblemInterface } from '../../common/exceptions/has-problem.interface';
import { Course } from '../../entity/Course';

export class CourseIsNotFinishedYetException
  extends BadRequestException
  implements HasProblemInterface {

  @Expose()
  @ApiModelProperty()
  public readonly message: string;

  @Expose()
  @ApiModelProperty({ example: 'COURSE_IS_NOT_FINISHED_YET' })
  public readonly problem: string = 'COURSE_IS_NOT_FINISHED_YET';

  public static for = (
    course: Course,
  ): CourseIsNotFinishedYetException => {
    return new CourseIsNotFinishedYetException(
      `Course#${course.id} [${course.title}] isnt finished yet.`,
    );
  }

  constructor(message: string = 'Course isnt finished yet.') {
    super(message);
  }
}
