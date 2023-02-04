import { ApiModelProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiModelProperty()
  public readonly isManually: boolean;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty({ required: false })
  public readonly url: string;

  @ApiModelProperty()
  public readonly topicId: number;

  @ApiModelProperty()
  public readonly maxTries: number;

  @ApiModelProperty()
  public readonly gradeA: number;

  @ApiModelProperty()
  public readonly gradeC: number;

  @ApiModelProperty()
  public readonly maxPoints: number;

}

export class SearchAssignmentByNameDto {
  @ApiModelProperty({ required: false })
  public readonly name: string;
}

export class UpdateAssignmentDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly url: string;
}

export class ObjectAssignmentOrderDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  order: string;
}

export class UpdateAssignmentOrderDto {
  @ApiModelProperty()
  public readonly assignmentsOrdersArray: ObjectAssignmentOrderDto[];
}
