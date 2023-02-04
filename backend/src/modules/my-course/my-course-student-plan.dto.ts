import { Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';
import { CourseStudyPlan } from '../course/course-study-plan.embedded';
import { CourseStudent } from '../course/course-student.entity';
import { MyCourseDto } from './my-course.dto';

@Expose()
export class MyCourseStudentPlanDto extends MyCourseDto {
  @Type(() => CourseStudyPlan)
  @ApiModelProperty()
  public readonly studyPlan: CourseStudyPlan;

  constructor(
    id: number,
    title: string,
    studyPlan: CourseStudyPlan,
    student: CourseStudent,
  ) {
    super(id, title, student);

    this.studyPlan = studyPlan;
  }
}
