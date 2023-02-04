import { ApiModelProperty } from '@nestjs/swagger';

export class SearchExamsByNameDto {
  @ApiModelProperty()
  public readonly name: string;
}

export class CreateExamDto {
  @ApiModelProperty()
  public readonly isManually: boolean;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;

  @ApiModelProperty()
  public readonly maxTries: number;

  @ApiModelProperty()
  public readonly gradeA: number;

  @ApiModelProperty()
  public readonly gradeC: number;

  @ApiModelProperty()
  public readonly topicId: number;

  @ApiModelProperty()
  public readonly maxPoints: number;
}

export class UpdateExamDto {
  @ApiModelProperty()
  public readonly isManually: boolean;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;

  @ApiModelProperty()
  public readonly maxTries: number;

  @ApiModelProperty()
  public readonly gradeA: number;

  @ApiModelProperty()
  public readonly gradeC: number;

  @ApiModelProperty()
  public readonly maxPoints: number;
}

export class ObjectExamOrderDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  order: string;
}

export class UpdateExamOrderDto {
  @ApiModelProperty()
  public readonly examsOrdersArray: ObjectExamOrderDto[];
}
