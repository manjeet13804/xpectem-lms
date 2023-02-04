import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTaxonomyDto {
  @ApiModelProperty({ required: false })
  public readonly id: number;

  @ApiModelProperty()
  public readonly title: string;

  @ApiModelProperty()
  public readonly format: string;

  @ApiModelProperty()
  public readonly mandatory: boolean;
}

export class AddTaxonomyDto {
  @ApiModelProperty({
    isArray: true,
    type: CreateTaxonomyDto,
  })
  public metaData: [CreateTaxonomyDto];

  @ApiModelProperty()
  public currentLmsGroupId: number;
}

export class FetchTaxonomyDto {
  @ApiModelProperty()
  public readonly lmsGroupId: number;

  @ApiModelProperty()
  public readonly groupId: number;
}