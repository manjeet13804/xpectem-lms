import { ApiModelProperty } from '@nestjs/swagger';
import { Assignment } from '../../../entity/Assignment';
import { Exam } from '../../../entity/Exam';

export class CreateLessonDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly description: string;

  @ApiModelProperty()
  public readonly url: string;

  @ApiModelProperty()
  public readonly topicId: number;

  @ApiModelProperty({
    type: Exam,
    isArray: true,
  })
  exams: Exam[];

  @ApiModelProperty({
    type: Assignment,
    isArray: true,
  })
  assignments: Assignment[];

  @ApiModelProperty({
    isArray: true,
    type: 'number'
  })
  files: number[];
}

export class UpdateLessonDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly description: string;

  @ApiModelProperty()
  public readonly url: string;

  @ApiModelProperty({
    type: Exam,
    isArray: true,
  })
  exams: Exam[];

  @ApiModelProperty({
    type: Assignment,
    isArray: true,
  })
  assignments: Assignment[];

  @ApiModelProperty({
    isArray: true,
    type: 'number'
  })
  files: number[];
}

export class ObjectLessonOrderDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  order: string;
}

export class UpdateLessonOrderDto {
  @ApiModelProperty()
  public readonly lessonsOrdersArray: ObjectLessonOrderDto[];
}
